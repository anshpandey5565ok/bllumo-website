-- Apply once to a dedicated Supabase project with the migration owner (postgres).
-- No destructive changes to legacy public.waitlist; inventory/import it separately.
begin;
create schema bllumo_private;
revoke all on schema bllumo_private from public, anon, authenticated, service_role;

create table bllumo_private.registrations (
  id uuid primary key,
  email text not null unique check (email = lower(btrim(email)) and length(email) between 3 and 254),
  email_hash text not null unique check (email_hash ~ '^[a-f0-9]{64}$'),
  first_name text not null default '' check (length(first_name) <= 80),
  interest text not null check (length(interest) <= 160),
  consent boolean not null check (consent),
  age_confirmed boolean not null check (age_confirmed),
  consent_timestamp timestamptz not null,
  consent_version text not null,
  created_at timestamptz not null,
  source text not null check (length(source) <= 80)
);
create table bllumo_private.suppressions (
  email_hash text primary key check (email_hash ~ '^[a-f0-9]{64}$'),
  created_at timestamptz not null default now()
);
create table bllumo_private.admin_sessions (
  token_hash text primary key check (token_hash ~ '^[a-f0-9]{64}$'),
  expires_at timestamptz not null
);
create table bllumo_private.rate_limits (
  key text primary key,
  hits integer not null,
  expires_at timestamptz not null
);
create index on bllumo_private.admin_sessions (expires_at);
create index on bllumo_private.rate_limits (expires_at);
alter table bllumo_private.registrations enable row level security;
alter table bllumo_private.suppressions enable row level security;
alter table bllumo_private.admin_sessions enable row level security;
alter table bllumo_private.rate_limits enable row level security;
revoke all on all tables in schema bllumo_private from public, anon, authenticated, service_role;

create function public.bllumo_register(p_entry jsonb, p_email_hash text) returns text
language plpgsql security definer set search_path = '' as $$
begin
  -- Serialize registration and deletion of the same address, across app instances.
  perform pg_advisory_xact_lock(hashtextextended(p_email_hash, 0));
  if exists (select 1 from bllumo_private.suppressions where email_hash = p_email_hash) then return 'suppressed'; end if;
  insert into bllumo_private.registrations
    (id, email, email_hash, first_name, interest, consent, age_confirmed, consent_timestamp, consent_version, created_at, source)
  values ((p_entry->>'id')::uuid, lower(btrim(p_entry->>'email')), p_email_hash,
    coalesce(p_entry->>'first_name', ''), p_entry->>'interest', (p_entry->>'consent')::boolean,
    (p_entry->>'age_confirmed')::boolean, (p_entry->>'consent_timestamp')::timestamptz,
    p_entry->>'consent_version', (p_entry->>'created_at')::timestamptz, p_entry->>'source')
  on conflict (email) do nothing;
  if found then return 'registered'; else return 'duplicate'; end if;
end;
$$;

create function public.bllumo_list(p_after uuid default null) returns jsonb
language sql security definer set search_path = '' as $$
  select coalesce(jsonb_agg(to_jsonb(r) - 'email_hash' order by r.id), '[]'::jsonb) from (
    select e.* from bllumo_private.registrations e
    where (p_after is null or e.id > p_after)
      and not exists (select 1 from bllumo_private.suppressions s where s.email_hash = e.email_hash)
    order by e.id limit 500
  ) r;
$$;

create function public.bllumo_delete(p_email_hash text) returns boolean
language plpgsql security definer set search_path = '' as $$
begin
  perform pg_advisory_xact_lock(hashtextextended(p_email_hash, 0));
  insert into bllumo_private.suppressions(email_hash) values (p_email_hash) on conflict do nothing;
  delete from bllumo_private.registrations where email_hash = p_email_hash;
  return true;
end;
$$;

create function public.bllumo_session_create(p_token_hash text, p_expires timestamptz) returns boolean
language plpgsql security definer set search_path = '' as $$
begin
  if p_expires <= now() or p_expires > now() + interval '2 hours' then raise exception 'Invalid expiry'; end if;
  delete from bllumo_private.admin_sessions where expires_at <= now();
  insert into bllumo_private.admin_sessions(token_hash, expires_at) values (p_token_hash, p_expires);
  return true;
end;
$$;
create function public.bllumo_session_check(p_token_hash text) returns boolean
language sql security definer set search_path = '' as $$
  select exists (select 1 from bllumo_private.admin_sessions where token_hash = p_token_hash and expires_at > now());
$$;
create function public.bllumo_session_delete(p_token_hash text) returns boolean
language plpgsql security definer set search_path = '' as $$
begin
  delete from bllumo_private.admin_sessions where token_hash = p_token_hash;
  return true;
end;
$$;

create function public.bllumo_rate_limit(p_key text, p_limit integer, p_window integer) returns integer
language plpgsql security definer set search_path = '' as $$
declare v_hits integer; v_expires timestamptz;
begin
  if p_limit < 1 or p_window < 1 or p_window > 900 or length(p_key) > 100 then raise exception 'Invalid rate limit'; end if;
  delete from bllumo_private.rate_limits where expires_at <= now();
  insert into bllumo_private.rate_limits as limits(key, hits, expires_at)
  values (p_key, 1, now() + make_interval(secs => p_window))
  on conflict (key) do update set hits = limits.hits + 1
  returning hits, expires_at into v_hits, v_expires;
  if v_hits <= p_limit then return 0; end if;
  return greatest(1, ceil(extract(epoch from (v_expires - now())))::integer);
end;
$$;

-- Functions otherwise default to PUBLIC execution. Grant only these signatures.
revoke all on function public.bllumo_register(jsonb,text), public.bllumo_list(uuid),
  public.bllumo_delete(text), public.bllumo_session_create(text,timestamptz),
  public.bllumo_session_check(text), public.bllumo_session_delete(text),
  public.bllumo_rate_limit(text,integer,integer) from public, anon, authenticated;
grant execute on function public.bllumo_register(jsonb,text), public.bllumo_list(uuid),
  public.bllumo_delete(text), public.bllumo_session_create(text,timestamptz),
  public.bllumo_session_check(text), public.bllumo_session_delete(text),
  public.bllumo_rate_limit(text,integer,integer) to service_role;
notify pgrst, 'reload schema';
commit;

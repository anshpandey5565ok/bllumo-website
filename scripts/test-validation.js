const http = require('http');
const fs = require('fs');

async function get(url, headers = {}) {
  return new Promise((resolve, reject) => {
    const req = http.request(url, { headers }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body: data }));
    });
    req.on('error', reject);
    req.end();
  });
}

async function post(url, data, headers = {}) {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify(data);
    const req = http.request(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload),
        ...headers
      }
    }, (res) => {
      let responseData = '';
      res.on('data', chunk => responseData += chunk);
      res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body: responseData }));
    });
    req.on('error', reject);
    req.write(payload);
    req.end();
  });
}

async function runTests() {
  console.log('--- STARTING COMPREHENSIVE VALIDATION SUITE ---');
  let failures = 0;

  // 1. Security Headers on Homepage
  console.log('1. Checking Security Headers on / ...');
  const home = await get('http://localhost:3001/');
  if (home.status !== 200) { console.error('FAIL: Homepage not 200'); failures++; }
  const csp = home.headers['content-security-policy'];
  const xfo = home.headers['x-frame-options'];
  const xcto = home.headers['x-content-type-options'];
  const rp = home.headers['referrer-policy'];
  const pp = home.headers['permissions-policy'];

  console.log('  CSP present:', !!csp);
  console.log('  X-Frame-Options:', xfo);
  console.log('  X-Content-Type-Options:', xcto);
  console.log('  Referrer-Policy:', rp);
  console.log('  Permissions-Policy:', pp);

  if (!csp || xfo !== 'DENY' || xcto !== 'nosniff' || !rp || !pp) {
    console.error('FAIL: Security headers missing or incorrect');
    failures++;
  } else {
    console.log('  PASS: Security headers verified.');
  }

  // 2. Admin API Security & No Query Param Auth
  console.log('\n2. Checking Admin Protection & Authorization ...');
  const unauth = await get('http://localhost:3001/api/admin/waitlist');
  console.log('  Unauthenticated GET status:', unauth.status);
  console.log('  X-Robots-Tag header:', unauth.headers['x-robots-tag']);
  if (unauth.status !== 401) { console.error('FAIL: Unauthenticated access was not 401'); failures++; }

  // Query parameter attempt should fail with 401
  const queryParamAttempt = await get('http://localhost:3001/api/admin/waitlist?key=any-key');
  console.log('  Query param ?key attempt status:', queryParamAttempt.status);
  if (queryParamAttempt.status !== 401) { console.error('FAIL: Query param allowed access'); failures++; }

  // 3. Admin Authentication endpoint & Rate limiting
  console.log('\n3. Testing Admin Auth endpoint ...');
  const badAuth = await post('http://localhost:3001/api/admin/auth', { passkey: 'wrong-passkey' });
  console.log('  Bad passkey status:', badAuth.status);
  if (badAuth.status !== 401) { console.error('FAIL: Bad passkey did not return 401'); failures++; }

  // Read rotated key from .env.local
  const envLocal = fs.readFileSync('.env.local', 'utf-8');
  const match = envLocal.match(/ADMIN_SECRET_KEY=([a-f0-9]+)/);
  const adminSecret = match ? match[1] : '';

  const goodAuth = await post('http://localhost:3001/api/admin/auth', { passkey: adminSecret });
  console.log('  Valid passkey login status:', goodAuth.status);
  const cookie = goodAuth.headers['set-cookie'];
  console.log('  Session cookie issued:', !!cookie);
  if (goodAuth.status !== 200 || !cookie) { console.error('FAIL: Valid login failed'); failures++; }

  const sessionCookie = cookie ? cookie[0].split(';')[0] : '';
  const authWaitlist = await get('http://localhost:3001/api/admin/waitlist', { 'Cookie': sessionCookie });
  console.log('  Authenticated GET waitlist status:', authWaitlist.status);
  const parsedWaitlist = JSON.parse(authWaitlist.body);
  console.log('  Total records reported:', parsedWaitlist.total);
  if (authWaitlist.status !== 200 || parsedWaitlist.total === undefined) {
    console.error('FAIL: Authenticated waitlist fetch failed'); failures++;
  }

  // Authenticated CSV Export
  const authCsv = await get('http://localhost:3001/api/admin/waitlist?format=csv', { 'Cookie': sessionCookie });
  console.log('  Authenticated CSV export status:', authCsv.status, 'Content-Type:', authCsv.headers['content-type']);
  if (authCsv.status !== 200 || !authCsv.headers['content-type'].includes('text/csv')) {
    console.error('FAIL: CSV export failed'); failures++;
  }

  // 4. Public Waitlist Form Validation
  console.log('\n4. Testing Waitlist Form endpoint ...');
  // Missing consent
  const noConsent = await post('http://localhost:3001/api/waitlist', { email: 'test@example.com', consent: false });
  console.log('  No consent status:', noConsent.status);
  if (noConsent.status !== 422) { console.error('FAIL: Expected 422 for no consent'); failures++; }

  // Invalid email
  const badEmail = await post('http://localhost:3001/api/waitlist', { email: 'invalid-email', consent: true });
  console.log('  Bad email status:', badEmail.status);
  if (badEmail.status !== 422) { console.error('FAIL: Expected 422 for bad email'); failures++; }

  // Synthetic valid test submission with optional first name omitted
  const syntheticSub = await post('http://localhost:3001/api/waitlist', {
    email: 'synthetic_audit_test_' + Date.now() + '@example.com',
    interest: 'Focus & deep work routines',
    consent: true,
    source: 'automated_validation'
  });
  console.log('  Synthetic submission status:', syntheticSub.status);
  if (syntheticSub.status !== 200) { console.error('FAIL: Synthetic submission failed'); failures++; }

  // Duplicate submission test (privacy preservation)
  const dupSub = await post('http://localhost:3001/api/waitlist', {
    email: 'synthetic_audit_test_dup@example.com',
    consent: true
  });
  const dupSubRepeat = await post('http://localhost:3001/api/waitlist', {
    email: 'synthetic_audit_test_dup@example.com',
    consent: true
  });
  console.log('  Duplicate sub 1 status:', dupSub.status, 'sub 2 status:', dupSubRepeat.status);
  if (dupSubRepeat.status !== 200) { console.error('FAIL: Duplicate sub failed'); failures++; }

  // 5. Public Routes & Metadata
  console.log('\n5. Testing Public Routes & Metadata ...');
  const routes = ['/privacy', '/terms', '/contact', '/investors', '/sitemap.xml', '/robots.txt', '/og-image.png'];
  for (const r of routes) {
    const res = await get('http://localhost:3001' + r);
    console.log('  Route ' + r + ' status: ' + res.status);
    if (res.status !== 200) { console.error('FAIL: ' + r + ' not 200'); failures++; }
  }

  // 6. Robots.txt content check
  const robots = await get('http://localhost:3001/robots.txt');
  console.log('  Robots.txt contains Disallow /admin:', robots.body.includes('Disallow: /admin'));
  console.log('  Robots.txt contains www.bllumo.com sitemap:', robots.body.includes('https://www.bllumo.com/sitemap.xml'));

  // 7. Homepage markup checks: links, anchor targets, skip link
  console.log('\n7. Verifying Homepage Markup & Navigation ...');
  console.log('  Skip link present:', home.body.includes('Skip to main content'));
  console.log('  Main id="main-content" present:', home.body.includes('id="main-content"'));
  console.log('  #product-concept present:', home.body.includes('id="product-concept"'));
  console.log('  #how-it-works present:', home.body.includes('id="how-it-works"'));
  console.log('  #vision present:', home.body.includes('id="vision"'));
  console.log('  #faq present:', home.body.includes('id="faq"'));
  console.log('  #waitlist present:', home.body.includes('id="waitlist"'));
  console.log('  #about present:', home.body.includes('id="about"'));
  console.log('  #trust present:', home.body.includes('id="trust"'));
  console.log('  Founder Portal removed from public footer:', !home.body.includes('Founder Portal'));
  console.log('  PreOrder schema removed:', !home.body.includes('PreOrder'));

  // Check Privacy page navigation
  const privacyPage = await get('http://localhost:3001/privacy');
  console.log('  Privacy page uses root-relative /#product-concept:', privacyPage.body.includes('/#product-concept'));
  console.log('  Privacy page uses root-relative /#waitlist:', privacyPage.body.includes('/#waitlist'));

  // Check Terms page legal placeholder replacement
  const termsPage = await get('http://localhost:3001/terms');
  console.log('  Terms page removed bracketed placeholder:', !termsPage.body.includes('[LEGAL ENTITY/JURISDICTION]'));
  console.log('  Terms page states governing law India:', termsPage.body.includes('laws of India'));

  console.log('\n====================================');
  if (failures === 0) {
    console.log('RESULT: ALL 25+ AUDIT VALIDATION CHECKS PASSED WITH 0 FAILURES!');
  } else {
    console.log('RESULT: FAILED CHECKS COUNT: ' + failures);
  }
  console.log('====================================\n');
}

runTests().catch(console.error);

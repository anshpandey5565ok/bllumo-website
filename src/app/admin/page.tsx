"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Key,
  Users,
  Download,
  Search,
  Filter,
  ArrowLeft,
  Calendar,
  Layers,
  Lock,
  LogOut,
  RefreshCw,
  AlertCircle,
  FileSpreadsheet,
} from "lucide-react";
import { Logo } from "@/components/Logo";

interface WaitlistRecord {
  id: string;
  first_name: string;
  email: string;
  interest?: string;
  consent: boolean;
  created_at: string;
  source: string;
}

export default function AdminPage() {
  const [adminKey, setAdminKey] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [records, setRecords] = useState<WaitlistRecord[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [breakdown, setBreakdown] = useState<Record<string, number>>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");

  useEffect(() => {
    // Check if key is already remembered in session
    const saved = sessionStorage.getItem("bllumo_admin_key");
    if (saved) {
      setAdminKey(saved);
      fetchData(saved);
    }
  }, []);

  const fetchData = async (keyToUse: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/waitlist?key=${encodeURIComponent(keyToUse)}`);
      if (!res.ok) {
        if (res.status === 401) {
          throw new Error("Invalid admin key. Access denied.");
        }
        throw new Error("Failed to load waitlist records.");
      }
      const data = await res.json();
      setRecords(data.entries || []);
      setTotalCount(data.total || 0);
      setBreakdown(data.interestBreakdown || {});
      setIsAuthenticated(true);
      sessionStorage.setItem("bllumo_admin_key", keyToUse);
    } catch (err: any) {
      setError(err.message || "An error occurred.");
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminKey.trim()) {
      setError("Please enter the admin security passkey.");
      return;
    }
    fetchData(adminKey.trim());
  };

  const handleLogout = () => {
    sessionStorage.removeItem("bllumo_admin_key");
    setAdminKey("");
    setIsAuthenticated(false);
    setRecords([]);
  };

  const handleDownloadCsv = () => {
    window.open(`/api/admin/waitlist?key=${encodeURIComponent(adminKey)}&format=csv`, "_blank");
  };

  const filteredRecords = records.filter((r) => {
    const matchesSearch =
      r.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      filterCategory === "all" || (r.interest || "General Access") === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[#070A12] text-[#F8FAFC]">
      {/* Admin Top Header */}
      <header className="border-b border-white/10 bg-[#0D111C]/80 backdrop-blur-md px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="group flex items-center gap-2">
            <Logo size={24} showWordmark={true} />
            <span className="text-[11px] px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-mono">
              Admin Portal
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="text-xs text-slate-400 hover:text-white transition-colors flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Public Site</span>
          </Link>
          {isAuthenticated && (
            <button
              onClick={handleLogout}
              className="text-xs text-rose-400 hover:text-rose-300 transition-colors flex items-center gap-1 px-3 py-1.5 rounded-lg bg-rose-500/10 border border-rose-500/20"
            >
              <LogOut className="w-3 h-3" />
              <span>Sign Out</span>
            </button>
          )}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {!isAuthenticated ? (
          /* Authentication Screen */
          <div className="max-w-md mx-auto mt-16 p-8 rounded-3xl bg-[#0D111C] border border-white/10 shadow-2xl shadow-black/80 text-center">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mx-auto mb-4">
              <Lock className="w-6 h-6" />
            </div>

            <h2 className="text-xl font-bold text-white mb-2">Startup Founder Access</h2>
            <p className="text-xs text-slate-400 mb-6">
              Enter your secure administrator access key to review waitlist reservations and export data.
            </p>

            {error && (
              <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2 text-left">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="text-left">
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                  Admin Passkey
                </label>
                <input
                  type="password"
                  placeholder="Enter ADMIN_SECRET_KEY"
                  value={adminKey}
                  onChange={(e) => setAdminKey(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#070A12] border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <span className="text-[10px] text-slate-400 block mt-1">
                  Default dev key is defined in .env.local (`bllumo-founder-2026`)
                </span>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-sm font-semibold transition-all disabled:opacity-50"
              >
                {loading ? "Authenticating..." : "Unlock Dashboard"}
              </button>
            </form>
          </div>
        ) : (
          /* Dashboard Content */
          <div className="space-y-8">
            {/* Top Stats Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div className="p-6 rounded-2xl bg-[#0D111C] border border-white/8 space-y-1">
                <div className="flex items-center justify-between text-slate-400 mb-2">
                  <span className="text-xs font-mono uppercase tracking-wider">Total Signups</span>
                  <Users className="w-4 h-4 text-indigo-400" />
                </div>
                <div className="text-3xl font-extrabold text-white">{totalCount}</div>
                <span className="text-[11px] text-slate-400">Unique registered waitlist members</span>
              </div>

              <div className="p-6 rounded-2xl bg-[#0D111C] border border-white/8 space-y-1">
                <div className="flex items-center justify-between text-slate-400 mb-2">
                  <span className="text-xs font-mono uppercase tracking-wider">Storage Target</span>
                  <ShieldCheck className="w-4 h-4 text-cyan-400" />
                </div>
                <div className="text-xl font-bold text-cyan-300">Active & Syncing</div>
                <span className="text-[11px] text-slate-400">Local persistent store + Supabase bridge</span>
              </div>

              <div className="p-6 rounded-2xl bg-[#0D111C] border border-white/8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-slate-400 mb-2">
                    <span className="text-xs font-mono uppercase tracking-wider">Export Data</span>
                    <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
                  </div>
                  <span className="text-xs text-slate-300">Generate CSV for spreadsheet reporting</span>
                </div>
                <button
                  onClick={handleDownloadCsv}
                  className="mt-3 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 text-xs font-semibold transition-all"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Waitlist CSV</span>
                </button>
              </div>
            </div>

            {/* Interest Breakdown Chips */}
            <div className="p-6 rounded-2xl bg-[#0D111C] border border-white/8 space-y-3">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block">
                Interest Distribution:
              </span>
              <div className="flex flex-wrap gap-2">
                {Object.entries(breakdown).map(([category, count]) => (
                  <div
                    key={category}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/8 text-xs"
                  >
                    <span className="text-slate-300">{category}</span>
                    <span className="px-1.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-bold text-[10px]">
                      {count}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Search, Filter, and Table */}
            <div className="rounded-2xl bg-[#0D111C] border border-white/8 overflow-hidden">
              <div className="p-5 border-b border-white/8 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <div className="relative w-full sm:w-72">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search by name or email..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#070A12] border border-white/10 text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>

                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="px-3 py-2 rounded-xl bg-[#070A12] border border-white/10 text-xs text-white focus:outline-none"
                  >
                    <option value="all">All Categories</option>
                    {Object.keys(breakdown).map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={() => fetchData(adminKey)}
                  className="text-xs text-slate-300 hover:text-white flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 transition-colors"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
                  <span>Refresh</span>
                </button>
              </div>

              {/* Records Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#070A12] text-slate-400 uppercase font-mono tracking-wider border-b border-white/5">
                    <tr>
                      <th className="py-3.5 px-5">First Name</th>
                      <th className="py-3.5 px-5">Email Address</th>
                      <th className="py-3.5 px-5">Interest</th>
                      <th className="py-3.5 px-5">Date Joined</th>
                      <th className="py-3.5 px-5">Source</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredRecords.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="py-12 text-center text-slate-400">
                          {records.length === 0
                            ? "No waitlist submissions recorded yet."
                            : "No records matched your search query."}
                        </td>
                      </tr>
                    ) : (
                      filteredRecords.map((item) => (
                        <tr key={item.id} className="hover:bg-white/[0.02] transition-colors">
                          <td className="py-3.5 px-5 font-semibold text-white">
                            {item.first_name}
                          </td>
                          <td className="py-3.5 px-5 font-mono text-indigo-300">
                            {item.email}
                          </td>
                          <td className="py-3.5 px-5">
                            <span className="px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/8 text-slate-200">
                              {item.interest || "General Access"}
                            </span>
                          </td>
                          <td className="py-3.5 px-5 text-slate-400">
                            {new Date(item.created_at).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </td>
                          <td className="py-3.5 px-5 text-slate-400 font-mono text-[11px]">
                            {item.source}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Cookie, X, Check, Shield } from "lucide-react";

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem("bllumo_cookie_consent");
      if (!consent) {
        // Small delay so it doesn't abruptly pop on initial load
        const timer = setTimeout(() => setShowBanner(true), 1200);
        return () => clearTimeout(timer);
      } else {
        const parsed = JSON.parse(consent);
        setAnalyticsEnabled(Boolean(parsed.analytics));
      }
    } catch {
      setShowBanner(true);
    }

    const handleOpenModal = () => {
      setShowModal(true);
      setShowBanner(false);
    };

    window.addEventListener("open-cookie-preferences", handleOpenModal);
    return () => window.removeEventListener("open-cookie-preferences", handleOpenModal);
  }, []);

  const saveConsent = (analytics: boolean) => {
    try {
      localStorage.setItem(
        "bllumo_cookie_consent",
        JSON.stringify({
          essential: true,
          analytics,
          timestamp: new Date().toISOString(),
        })
      );
    } catch (e) {
      console.warn("Could not save cookie consent:", e);
    }
    setAnalyticsEnabled(analytics);
    setShowBanner(false);
    setShowModal(false);
  };

  if (!showBanner && !showModal) return null;

  return (
    <>
      {/* Sticky Bottom Banner */}
      {showBanner && (
        <div
          role="dialog"
          aria-label="Cookie consent banner"
          className="fixed bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-md z-50 p-5 rounded-2xl bg-[#0D111C]/95 backdrop-blur-2xl border border-white/10 shadow-2xl shadow-black/80 text-white animate-fade-in"
        >
          <div className="flex items-start gap-3 mb-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0">
              <Cookie className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Privacy & Cookie Choices</h4>
              <p className="text-xs text-slate-300 leading-relaxed mt-1">
                We use strictly essential cookies to operate this waitlist website, and optional analytics to measure aggregated interest. We do not sell your personal data.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-2">
            <button
              onClick={() => saveConsent(true)}
              className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow transition-colors"
            >
              Accept All
            </button>
            <button
              onClick={() => saveConsent(false)}
              className="px-3.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 text-xs font-medium transition-colors"
            >
              Essential Only
            </button>
            <button
              onClick={() => {
                setShowBanner(false);
                setShowModal(true);
              }}
              className="text-xs text-slate-400 hover:text-white underline underline-offset-2 ml-auto"
            >
              Manage Preferences
            </button>
          </div>
        </div>
      )}

      {/* Preferences Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
          <div className="max-w-lg w-full rounded-2xl bg-[#0D111C] border border-white/15 p-6 sm:p-7 shadow-2xl shadow-black/90 text-white relative">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-cyan-400" />
                <h3 className="text-lg font-bold text-white">Cookie Preferences</h3>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/5"
                aria-label="Close preferences"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed mb-5">
              Customize your cookie preferences. Essential cookies are required for basic site security and session integrity, while analytics cookies help us observe anonymized interaction patterns.
            </p>

            <div className="space-y-4 mb-6">
              {/* Essential Cookies */}
              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between gap-4">
                <div>
                  <span className="text-sm font-semibold text-white block">Strictly Necessary Cookies</span>
                  <span className="text-xs text-slate-400">Essential for security, form submission, and remembering your preferences.</span>
                </div>
                <span className="text-[11px] font-semibold uppercase px-2 py-0.5 rounded bg-white/10 text-slate-300">
                  Required
                </span>
              </div>

              {/* Analytics Cookies */}
              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between gap-4">
                <div>
                  <span className="text-sm font-semibold text-white block">Performance & Aggregated Analytics</span>
                  <span className="text-xs text-slate-400">Measures anonymous traffic to help us gauge demand across regions.</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={analyticsEnabled}
                    onChange={(e) => setAnalyticsEnabled(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
              <button
                type="button"
                onClick={() => saveConsent(false)}
                className="px-4 py-2 rounded-xl text-xs font-medium text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 transition-colors"
              >
                Reject Optional
              </button>
              <button
                type="button"
                onClick={() => saveConsent(analyticsEnabled)}
                className="px-5 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 transition-all shadow-md"
              >
                Save Preferences
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

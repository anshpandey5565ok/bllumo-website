"use client";

import { useState, useEffect } from "react";
import { X, Shield } from "lucide-react";

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem("bllumo_cookie_consent");
      if (!consent) {
        const timer = setTimeout(() => setShowBanner(true), 1500);
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
      {/* Discreet Bottom Banner */}
      {showBanner && (
        <div
          role="dialog"
          aria-label="Cookie consent banner"
          className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 p-4 rounded-xl surface-card text-neutral-300 shadow-2xl"
        >
          <div className="space-y-2 mb-3">
            <h4 className="text-xs font-semibold text-white">Privacy & Cookies</h4>
            <p className="text-[11px] text-neutral-400 leading-relaxed">
              We use essential cookies to operate this waitlist and optional analytics to understand aggregated interest. We do not sell your personal data.
            </p>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={() => saveConsent(true)}
              className="px-3 py-1.5 rounded-md bg-white text-black hover:bg-neutral-200 text-xs font-medium transition-colors"
            >
              Accept All
            </button>
            <button
              onClick={() => saveConsent(false)}
              className="px-3 py-1.5 rounded-md bg-white/[0.04] hover:bg-white/[0.08] text-neutral-300 border border-white/[0.08] text-xs font-medium transition-colors"
            >
              Essential Only
            </button>
            <button
              onClick={() => {
                setShowBanner(false);
                setShowModal(true);
              }}
              className="text-[11px] text-neutral-400 hover:text-white underline ml-auto"
            >
              Preferences
            </button>
          </div>
        </div>
      )}

      {/* Preferences Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="max-w-md w-full rounded-2xl bg-[#0B0D14] border border-white/[0.1] p-6 text-neutral-200 shadow-2xl relative">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/[0.06]">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-neutral-400" />
                <h3 className="text-sm font-semibold text-white">Cookie Preferences</h3>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="p-1 rounded-md text-neutral-400 hover:text-white"
                aria-label="Close preferences"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-neutral-400 leading-relaxed mb-5">
              Customize your cookie choices. Essential cookies are required for basic site security and session integrity.
            </p>

            <div className="space-y-3 mb-6">
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] flex items-center justify-between">
                <div>
                  <span className="text-xs font-medium text-white block">Strictly Necessary</span>
                  <span className="text-[10px] text-neutral-500">Security and preference storage.</span>
                </div>
                <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-white/[0.06] text-neutral-400">
                  Required
                </span>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] flex items-center justify-between">
                <div>
                  <span className="text-xs font-medium text-white block">Performance Analytics</span>
                  <span className="text-[10px] text-neutral-500">Measures anonymous aggregated traffic.</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={analyticsEnabled}
                    onChange={(e) => setAnalyticsEnabled(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-neutral-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-white/[0.06]">
              <button
                type="button"
                onClick={() => saveConsent(false)}
                className="px-3 py-1.5 rounded-lg text-xs text-neutral-400 hover:text-white"
              >
                Reject Optional
              </button>
              <button
                type="button"
                onClick={() => saveConsent(analyticsEnabled)}
                className="px-4 py-1.5 rounded-lg text-xs font-medium text-black bg-white hover:bg-neutral-200 transition-colors"
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

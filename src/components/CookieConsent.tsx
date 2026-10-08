"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { X, Shield } from "lucide-react";

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    try {
      const consent = localStorage.getItem("bllumo_cookie_consent");
      if (!consent) {
        timer = setTimeout(() => setShowBanner(true), 1200);
      } else {
        const parsed = JSON.parse(consent);
        if (parsed.analytics) {
          timer = setTimeout(() => setAnalyticsEnabled(true), 0);
        }
      }
    } catch {
      timer = setTimeout(() => setShowBanner(true), 1200);
    }

    const handleOpenModal = () => {
      triggerRef.current = document.activeElement as HTMLElement;
      setShowModal(true);
      setShowBanner(false);
    };

    window.addEventListener("open-cookie-preferences", handleOpenModal);
    return () => {
      if (timer) clearTimeout(timer);
      window.removeEventListener("open-cookie-preferences", handleOpenModal);
    };
  }, []);

  // Trap focus inside modal & handle Escape dismissal
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!showModal) return;

      if (e.key === "Escape") {
        e.preventDefault();
        setShowModal(false);
        triggerRef.current?.focus();
        return;
      }

      if (e.key === "Tab" && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const first = focusableElements[0];
        const last = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last?.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first?.focus();
          }
        }
      }
    },
    [showModal]
  );

  useEffect(() => {
    if (showModal) {
      window.addEventListener("keydown", handleKeyDown);
      // Set initial focus to close button or first interactive control
      setTimeout(() => closeBtnRef.current?.focus(), 50);
    } else {
      window.removeEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showModal, handleKeyDown]);

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
    triggerRef.current?.focus();
  };

  if (!showBanner && !showModal) return null;

  return (
    <>
      {/* Discreet Bottom Banner */}
      {showBanner && (
        <aside
          role="region"
          aria-labelledby="cookie-banner-title"
          className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 p-5 rounded-2xl surface-card text-neutral-200 shadow-2xl border border-white/[0.12]"
        >
          <div className="space-y-2 mb-4">
            <h2 id="cookie-banner-title" className="text-xs font-semibold text-white tracking-wide uppercase font-mono">
              Privacy & Cookie Choices
            </h2>
            <p className="text-xs text-neutral-300 leading-relaxed">
              We use strictly necessary storage to maintain session security and optional aggregated analytics to understand website interest. We do not sell personal data.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-1">
            <button
              onClick={() => saveConsent(true)}
              type="button"
              className="px-3.5 py-1.5 rounded-lg bg-white text-black hover:bg-neutral-200 text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-indigo-400 focus-visible:outline-offset-2"
            >
              Accept All
            </button>
            <button
              onClick={() => saveConsent(false)}
              type="button"
              className="px-3.5 py-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] text-neutral-200 border border-white/[0.1] text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-indigo-400 focus-visible:outline-offset-2"
            >
              Essential Only
            </button>
            <button
              onClick={() => {
                triggerRef.current = document.activeElement as HTMLElement;
                setShowBanner(false);
                setShowModal(true);
              }}
              type="button"
              className="text-xs text-neutral-300 hover:text-white underline underline-offset-4 ml-auto focus-visible:outline-2 focus-visible:outline-indigo-400 focus-visible:outline-offset-2 rounded"
            >
              Preferences
            </button>
          </div>
        </aside>
      )}

      {/* Accessible Preferences Modal */}
      {showModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="cookie-preferences-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        >
          <div
            ref={modalRef}
            className="max-w-md w-full rounded-2xl bg-[#0B0D14] border border-white/[0.14] p-6 text-neutral-200 shadow-2xl relative"
          >
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/[0.08]">
              <div className="flex items-center gap-2.5">
                <Shield className="w-4 h-4 text-indigo-400" />
                <h2 id="cookie-preferences-title" className="text-sm font-bold text-white">
                  Cookie Preferences
                </h2>
              </div>
              <button
                ref={closeBtnRef}
                onClick={() => {
                  setShowModal(false);
                  triggerRef.current?.focus();
                }}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/[0.08] focus-visible:outline-2 focus-visible:outline-indigo-400 focus-visible:outline-offset-2"
                aria-label="Close preferences dialog"
                type="button"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-neutral-300 leading-relaxed mb-5">
              Customize your privacy preferences. Essential cookies are required to preserve session integrity and security. Optional analytics measure aggregate site interactions.
            </p>

            <div className="space-y-3 mb-6">
              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-white block">Strictly Necessary</span>
                  <span className="text-xs text-neutral-400">Security tokens and preference records.</span>
                </div>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-white/[0.08] text-neutral-300 border border-white/[0.08]">
                  Required
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between">
                <div>
                  <label htmlFor="analytics-toggle" className="text-xs font-semibold text-white block cursor-pointer">
                    Performance Analytics
                  </label>
                  <span className="text-xs text-neutral-400">Measures anonymous aggregated page interest.</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    id="analytics-toggle"
                    type="checkbox"
                    aria-label="Allow performance analytics cookies"
                    checked={analyticsEnabled}
                    onChange={(e) => setAnalyticsEnabled(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-10 h-6 bg-neutral-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/[0.08]">
              <button
                type="button"
                onClick={() => saveConsent(false)}
                className="px-4 py-2 rounded-xl text-xs font-medium text-neutral-300 hover:text-white hover:bg-white/[0.04] transition-colors focus-visible:outline-2 focus-visible:outline-indigo-400 focus-visible:outline-offset-2"
              >
                Reject Non-Essential
              </button>
              <button
                type="button"
                onClick={() => saveConsent(analyticsEnabled)}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-white text-black hover:bg-neutral-200 transition-colors focus-visible:outline-2 focus-visible:outline-indigo-400 focus-visible:outline-offset-2"
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

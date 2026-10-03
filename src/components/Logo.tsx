import React from "react";

interface LogoProps {
  className?: string;
  size?: number;
  showWordmark?: boolean;
}

export function Logo({ className = "", size = 26, showWordmark = true }: LogoProps) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Production-grade Architectural Bllumo Glyph */}
      <div
        style={{ width: size, height: size }}
        className="relative shrink-0 rounded-lg bg-white/[0.08] hover:bg-white/[0.12] border border-white/[0.12] flex items-center justify-center p-1 transition-all duration-150"
      >
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Upper Adaptive Arc */}
          <path
            d="M26 22 H54 C66 22 75 30 75 41 C75 48 70 52 61 54 L38 54 C31.4 54 26 48.6 26 42 Z"
            fill="#FFFFFF"
          />
          {/* Upper Counter Cutout */}
          <circle cx="51" cy="38" r="7" fill="#0B0D14" />

          {/* Lower Grounding Arc (Interlocking with a 3px architectural offset) */}
          <path
            d="M26 48 L60 48 C71 48 79 55 79 65 C79 75 70 82 56 82 H26 V48 Z"
            fill="url(#bllumoMarkGradient)"
          />
          {/* Lower Counter Cutout */}
          <circle cx="53" cy="65" r="8" fill="#0B0D14" />

          <defs>
            <linearGradient id="bllumoMarkGradient" x1="26" y1="48" x2="79" y2="82" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#94A3B8" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Wordmark */}
      {showWordmark && (
        <span className="text-sm font-semibold tracking-tight text-white transition-colors">
          Bllumo
        </span>
      )}
    </div>
  );
}

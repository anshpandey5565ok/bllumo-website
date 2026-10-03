import React from "react";

interface LogoProps {
  className?: string;
  size?: number;
  showWordmark?: boolean;
}

export function Logo({ className = "", size = 28, showWordmark = true }: LogoProps) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Icon Glyph */}
      <div
        style={{ width: size, height: size }}
        className="relative shrink-0 rounded-lg overflow-hidden flex items-center justify-center p-0.5 bg-[#0A0C14] border border-white/[0.1] shadow-sm transition-transform duration-200 group-hover:scale-105"
      >
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="logoRibbonGrad" x1="15%" y1="10%" x2="85%" y2="90%">
              <stop offset="0%" stopColor="#818CF8" />
              <stop offset="50%" stopColor="#6366F1" />
              <stop offset="100%" stopColor="#06B6D4" />
            </linearGradient>
          </defs>

          {/* Precision engineered continuous curves representing life adaptation & personal intelligence */}
          <path
            d="M32 25 C32 22.8, 33.8 21, 36 21 L42 21 C53.5 21, 62 28, 62 37.5 C62 44.5, 57 49, 50 50 C58.5 51, 65 56.5, 65 65 C65 74.5, 55.5 81, 42 81 L36 81 C33.8 81, 32 79.2, 32 77 Z"
            fill="none"
            stroke="url(#logoRibbonGrad)"
            strokeWidth="7.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Dynamic Inner Voids */}
          <path
            d="M42 33 L45 33 C50 33, 53.5 35.5, 53.5 39 C53.5 42.5, 50 45, 45 45 L42 45 Z"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.9"
          />
          <path
            d="M42 55 L46 55 C52 55, 56 58, 56 62.5 C56 67, 52 70, 46 70 L42 70 Z"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.9"
          />

          {/* Intelligent Nexus Indicator */}
          <circle cx="50" cy="50" r="3.5" fill="#38BDF8" />
          <circle cx="50" cy="50" r="1.5" fill="#FFFFFF" />
        </svg>
      </div>

      {/* Wordmark */}
      {showWordmark && (
        <span className="text-base font-semibold tracking-tight text-white group-hover:text-neutral-100 transition-colors">
          Bllumo
        </span>
      )}
    </div>
  );
}

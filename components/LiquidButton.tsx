"use client";

import React from "react";

function GlassFilter() {
  return (
    <svg className="hidden" aria-hidden="true">
      <defs>
        <filter id="liquid-glass" x="0%" y="0%" width="100%" height="100%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.05 0.05" numOctaves="1" seed="1" result="turbulence" />
          <feGaussianBlur in="turbulence" stdDeviation="2" result="blurredNoise" />
          <feDisplacementMap in="SourceGraphic" in2="blurredNoise" scale="70" xChannelSelector="R" yChannelSelector="B" result="displaced" />
          <feGaussianBlur in="displaced" stdDeviation="4" result="finalBlur" />
          <feComposite in="finalBlur" in2="finalBlur" operator="over" />
        </filter>
      </defs>
    </svg>
  );
}

interface LiquidButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  href?: string;
}

export default function LiquidButton({ children, href, className = "", onClick, ...props }: LiquidButtonProps) {
  const inner = (
    <div className="relative inline-flex items-center justify-center cursor-pointer">
      {/* Glass blur layer */}
      <div
        className="absolute inset-0 -z-10 overflow-hidden rounded-full"
        style={{ backdropFilter: 'url("#liquid-glass") blur(0px)' }}
      />
      {/* Glass shell */}
      <div
        className="absolute inset-0 rounded-full transition-all duration-200"
        style={{
          boxShadow:
            "0 0 6px rgba(0,0,0,0.03), 0 2px 6px rgba(0,0,0,0.08), inset 3px 3px 0.5px -3px rgba(255,255,255,0.9), inset -3px -3px 0.5px -3px rgba(255,255,255,0.85), inset 1px 1px 1px -0.5px rgba(255,255,255,0.6), inset -1px -1px 1px -0.5px rgba(255,255,255,0.6), inset 0 0 6px 6px rgba(255,255,255,0.12), inset 0 0 2px 2px rgba(255,255,255,0.06), 0 0 12px rgba(255,255,255,0.15)",
        }}
      />
      {/* Content */}
      <span className={`relative z-10 inline-flex items-center gap-2 px-7 py-3 rounded-full text-sm font-semibold ${className}`}>
        {children}
      </span>
      <GlassFilter />
    </div>
  );

  if (href) {
    return (
      <a href={href} className="inline-flex hover:scale-105 active:scale-95 transition-transform duration-200">
        {inner}
      </a>
    );
  }

  return (
    <button
      className="inline-flex hover:scale-105 active:scale-95 transition-transform duration-200"
      onClick={onClick}
      {...props}
    >
      {inner}
    </button>
  );
}

import React from 'react';

export default function Logo({ size = 'medium', light = false }) {
  const isSmall = size === 'small';
  
  return (
    <div className={`fruico-logo ${isSmall ? 'logo-sm' : ''} ${light ? 'logo-light' : ''}`}>
      <div className="logo-symbol">
        <svg viewBox="0 0 48 48" className="logo-svg-icon" aria-hidden="true">
          <defs>
            <linearGradient id="logoIconGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1b2cc1" />
              <stop offset="100%" stopColor="#7692ff" />
            </linearGradient>
          </defs>
          <rect x="2" y="2" width="44" height="44" rx="12" fill={light ? '#1b2cc1' : '#091540'} />
          <path d="M24 9 L35 18 L31 35 L24 40 L17 35 L13 18 Z" fill="url(#logoIconGrad)" />
          <path d="M24 9 L24 40 L31 35 L35 18 Z" fill="#1b2cc1" opacity="0.6" />
          <path d="M24 9 L13 18 L24 22 Z" fill="#abd2fa" opacity="0.85" />
          <path d="M24 9 L35 18 L24 22 Z" fill="#ffffff" opacity="0.45" />
          <polygon points="37,6 39,10 43,12 39,14 37,18 35,14 31,12 35,10" fill="#abd2fa" />
        </svg>
      </div>

      <div className="logo-typography">
        <span className={`logo-main-text ${light ? 'text-white' : ''}`}>
          FRUICO<span className="logo-tld">.DZ</span>
        </span>
        <span className="logo-tagline-text">
          SURGELÉS NATURELS -18°C
        </span>
      </div>
    </div>
  );
}

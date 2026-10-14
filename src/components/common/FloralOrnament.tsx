import React from 'react';

interface FloralProps {
  className?: string;
}

export const FloralCornerTopLeft: React.FC<FloralProps> = ({ className = 'w-24 h-24 text-gold-400' }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path
      d="M10 10C35 10 50 25 50 50M10 10C10 35 25 50 50 50M10 10L60 60"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      opacity="0.6"
    />
    <circle cx="20" cy="20" r="3" fill="currentColor" opacity="0.7" />
    <circle cx="35" cy="15" r="2" fill="currentColor" opacity="0.5" />
    <circle cx="15" cy="35" r="2" fill="currentColor" opacity="0.5" />
    <path
      d="M15 15Q30 45 65 30Q45 60 15 15"
      stroke="currentColor"
      strokeWidth="1.2"
      fill="currentColor"
      fillOpacity="0.12"
    />
  </svg>
);

export const FloralCornerTopRight: React.FC<FloralProps> = ({ className = 'w-24 h-24 text-gold-400' }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${className} -scale-x-100`}>
    <path
      d="M10 10C35 10 50 25 50 50M10 10C10 35 25 50 50 50M10 10L60 60"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      opacity="0.6"
    />
    <circle cx="20" cy="20" r="3" fill="currentColor" opacity="0.7" />
    <circle cx="35" cy="15" r="2" fill="currentColor" opacity="0.5" />
    <circle cx="15" cy="35" r="2" fill="currentColor" opacity="0.5" />
    <path
      d="M15 15Q30 45 65 30Q45 60 15 15"
      stroke="currentColor"
      strokeWidth="1.2"
      fill="currentColor"
      fillOpacity="0.12"
    />
  </svg>
);

export const FloralDivider: React.FC<FloralProps> = ({ className = 'w-48 h-8 text-gold-500' }) => (
  <div className="flex items-center justify-center my-4">
    <svg viewBox="0 0 240 30" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M10 15H90" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
      <path d="M150 15H230" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
      <circle cx="120" cy="15" r="4" fill="currentColor" />
      <circle cx="106" cy="15" r="2" fill="currentColor" opacity="0.7" />
      <circle cx="134" cy="15" r="2" fill="currentColor" opacity="0.7" />
      <path
        d="M110 15C115 10 120 10 120 15C120 20 125 20 130 15"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  </div>
);

export const MonogramRing: React.FC<{ textGroom: string; textBride: string; className?: string }> = ({
  textGroom,
  textBride,
  className = 'w-16 h-16',
}) => (
  <div
    className={`relative flex items-center justify-center rounded-full border border-gold-300/60 bg-ivory-50/90 shadow-sm ${className}`}
  >
    <div className="absolute inset-1 rounded-full border border-dashed border-gold-400/40" />
    <span className="font-serif italic text-gold-600 font-semibold tracking-wider text-sm select-none">
      {textGroom[0]} & {textBride[0]}
    </span>
  </div>
);

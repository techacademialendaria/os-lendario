/**
 * AuthBackground - Background layout organism
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@/components/ui/icon';
import type { AuthBackgroundProps } from '../types';

const logoUrl = "/logo-academialendaria.svg";

export const AuthBackground: React.FC<AuthBackgroundProps> = ({ children }) => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center bg-background overflow-hidden selection:bg-primary/30">
      {/* Warm gradient background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[150px] pointer-events-none z-0" />

      {/* Subtle texture overlay */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none" />

      <div className="relative z-10 w-full max-w-md px-6 flex flex-col items-center">
        {/* Logo Section */}
        <div className="mb-10 group cursor-pointer">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <img
              src={logoUrl}
              alt="Academia Lendaria"
              className="w-14 h-14 relative z-10 drop-shadow-2xl transition-transform duration-500 group-hover:scale-110"
            />
          </div>
        </div>

        {children}

        {/* Bottom Info */}
        <div className="mt-12 flex items-center gap-4 text-[9px] font-black uppercase tracking-[0.35em] text-zinc-700 animate-pulse-slow">
          <Icon name="shield-check" size="size-4" className="text-zinc-700" />
          <span>Secured by Aurora</span>
          <div className="w-1 h-1 rounded-full bg-zinc-800" />
          <span className="opacity-60">v4.1.0</span>
        </div>

        {/* Back to System */}
        <button
          onClick={() => navigate('/')}
          className="mt-8 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-600 hover:text-zinc-400 transition-colors duration-200 group"
        >
          <Icon name="arrow-left" size="size-4" className="transition-transform duration-200 group-hover:-translate-x-1" />
          <span>Voltar</span>
        </button>
      </div>
    </div>
  );
};

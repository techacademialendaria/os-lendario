/**
 * LuxuryButton - Premium styled button component
 */

import React from 'react';
import { Button } from '@/components/ui/button';
import type { LuxuryButtonProps } from '../types';

export const LuxuryButton: React.FC<LuxuryButtonProps> = ({
  children,
  onClick,
  type = 'button',
  disabled,
  isLoading,
}) => (
  <Button
    type={type}
    onClick={onClick}
    disabled={disabled || isLoading}
    className="
      w-full h-14
      bg-primary text-primary-foreground
      hover:bg-primary/90
      active:scale-[0.98]
      rounded-2xl
      text-sm font-black uppercase tracking-[0.3em]
      shadow-[0_20px_50px_rgba(201,178,152,0.15)]
      hover:shadow-[0_25px_60px_rgba(201,178,152,0.25)]
      transition-all duration-300 ease-out
      relative overflow-hidden
      group
    "
  >
    {isLoading ? (
      <div className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
    ) : (
      <>
        <span className="relative z-10">{children}</span>
        {/* Brushed metal shimmer effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
      </>
    )}
  </Button>
);

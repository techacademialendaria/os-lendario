/**
 * LuxuryInput - Premium styled input component
 */

import React from 'react';
import { Input } from '@/components/ui/input';
import { Icon } from '@/components/ui/icon';
import type { LuxuryInputProps } from '../types';

export const LuxuryInput: React.FC<LuxuryInputProps> = ({
  id,
  type = 'text',
  placeholder,
  value,
  onChange,
  icon,
  showToggle,
  onToggle,
  toggleState,
  autoComplete,
  disabled,
}) => (
  <div className="relative group">
    {/* Glow effect on focus */}
    <div className="absolute -inset-0.5 bg-primary/0 group-focus-within:bg-primary/10 rounded-2xl blur-xl transition-all duration-500 opacity-0 group-focus-within:opacity-100" />

    <div className="relative">
      <Icon
        name={icon as any}
        className="absolute left-5 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary/70 transition-colors duration-300"
        size="size-5"
      />
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        autoComplete={autoComplete}
        className="
          w-full h-14 pl-14 pr-14
          bg-muted/30 dark:bg-muted/10
          border border-border
          hover:border-border/80
          focus:border-primary/30
          focus:bg-muted/50 dark:focus:bg-muted/20
          focus:shadow-[0_0_30px_rgba(201,178,152,0.08)]
          rounded-2xl
          text-foreground text-base font-light tracking-wide
          placeholder:text-muted-foreground placeholder:font-light placeholder:tracking-[0.15em] placeholder:uppercase placeholder:text-sm
          transition-all duration-300 ease-out
          outline-none ring-0 focus:ring-0
        "
      />
      {showToggle && (
        <button
          type="button"
          onClick={onToggle}
          className="absolute right-5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors duration-200"
        >
          <Icon name={toggleState ? 'eye-crossed' : 'eye'} size="size-5" />
        </button>
      )}
    </div>
  </div>
);

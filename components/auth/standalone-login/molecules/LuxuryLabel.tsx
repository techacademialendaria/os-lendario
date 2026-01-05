/**
 * LuxuryLabel - Premium styled label component
 */

import React from 'react';
import type { LuxuryLabelProps } from '../types';

export const LuxuryLabel: React.FC<LuxuryLabelProps> = ({ children, htmlFor, extra }) => (
  <div className="flex items-center justify-between mb-3">
    <label
      htmlFor={htmlFor}
      className="text-[11px] font-bold uppercase tracking-[0.25em] text-muted-foreground"
    >
      {children}
    </label>
    {extra}
  </div>
);

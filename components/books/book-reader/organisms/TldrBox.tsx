import React from 'react';
import { Icon } from '@/components/ui/icon';
import type { TldrBoxProps } from '../types';

export const TldrBox: React.FC<TldrBoxProps> = ({
  summary,
  readingMode,
  currentMode,
}) => {
  return (
    <div
      className="mb-16 rounded-xl border p-6 md:mb-24"
      style={{
        backgroundColor: readingMode === 'night' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
        borderColor: currentMode.border,
      }}
    >
      <div className="mb-4 flex items-center gap-2">
        <Icon name="bolt" size="size-4" className="text-primary" />
        <span
          className="text-[10px] font-black uppercase tracking-[0.3em]"
          style={{ color: currentMode.textMuted }}
        >
          Em Resumo
        </span>
      </div>
      <p
        className="font-serif text-base leading-relaxed md:text-lg"
        style={{ color: currentMode.text }}
      >
        {summary}
      </p>
    </div>
  );
};

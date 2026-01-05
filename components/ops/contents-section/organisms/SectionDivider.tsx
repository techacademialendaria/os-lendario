import React from 'react';

interface SectionDividerProps {
  title: string;
}

/**
 * SectionDivider - Visual divider between major sections with a title
 */
export const SectionDivider: React.FC<SectionDividerProps> = ({ title }) => {
  return (
    <div className="flex items-center gap-6 py-8">
      <div className="flex-1 h-px bg-border/40" />
      <span className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground/60">
        {title}
      </span>
      <div className="flex-1 h-px bg-border/40" />
    </div>
  );
};

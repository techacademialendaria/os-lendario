import React from 'react';
import { Icon } from '@/components/ui/icon';
import { WORKS_FOR, NOT_WORKS_FOR } from '../data';

export const ArticleChecklist: React.FC = () => (
  <div className="not-prose my-12 grid gap-8 md:grid-cols-2">
    <div className="rounded-xl border border-brand-green/20 bg-brand-green/5 p-6">
      <h4 className="mb-4 flex items-center gap-2 font-bold text-brand-green">
        <Icon name="check-circle" /> Para quem funciona
      </h4>
      <ul className="space-y-3 text-sm">
        {WORKS_FOR.map((item, i) => (
          <li key={i} className="flex gap-2">
            <Icon name="check" className="shrink-0 text-brand-green" /> {item}
          </li>
        ))}
      </ul>
    </div>
    <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-6">
      <h4 className="mb-4 flex items-center gap-2 font-bold text-destructive">
        <Icon name="cross-circle" /> Nao funciona para
      </h4>
      <ul className="space-y-3 text-sm">
        {NOT_WORKS_FOR.map((item, i) => (
          <li key={i} className="flex gap-2">
            <Icon name="cross" className="shrink-0 text-destructive" /> {item}
          </li>
        ))}
      </ul>
    </div>
  </div>
);

import React from 'react';
import { Badge } from '../../../ui/badge';
import { Symbol } from '../../../ui/symbol';
import { quickRefData } from '../data';

export const QuickRefCard: React.FC = () => (
  <section className="border-t border-border pt-8">
    <div className="relative mx-auto max-w-3xl overflow-hidden rounded-xl bg-foreground p-8 text-background shadow-2xl">
      <div className="absolute right-0 top-0 p-4 opacity-10">
        <Symbol name="infinity" className="text-9xl" />
      </div>

      <div className="relative z-10 space-y-6">
        <div className="flex items-center justify-between border-b border-white/20 pb-4">
          <h3 className="flex items-center gap-2 font-sans text-xl font-bold tracking-wider">
            <Symbol name="infinity" /> LENDAR[IA] QUICK REF {quickRefData.version}
          </h3>
          <Badge variant="outline" className="border-background text-background">
            {quickRefData.badge}
          </Badge>
        </div>

        <div className="grid grid-cols-1 gap-8 text-sm sm:grid-cols-2">
          <div>
            <p className="mb-2 font-bold text-primary">MISSAO</p>
            <p className="font-sans font-medium leading-relaxed opacity-80">
              {quickRefData.mission}
            </p>
          </div>
          <div>
            <p className="mb-2 font-bold text-primary">ARQUETIPOS</p>
            <p className="font-sans font-medium opacity-80">{quickRefData.archetypes}</p>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-bold text-primary">MANDAMENTOS DA COMUNICACAO</p>
          <ul className="grid grid-cols-1 gap-x-4 space-y-1 font-sans text-sm font-medium opacity-80 sm:grid-cols-2">
            {quickRefData.commandments.map((cmd, i) => (
              <li key={i} className="flex gap-2">
                <span>[]</span> {cmd}
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-2 border-t border-white/20 pt-4 text-center">
          <p className="font-sans text-lg font-bold italic">{quickRefData.closingPtBr}</p>
          <p className="font-sans text-sm opacity-50">{quickRefData.closingEn}</p>
        </div>
      </div>
    </div>
  </section>
);

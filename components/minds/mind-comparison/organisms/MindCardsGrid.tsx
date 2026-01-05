import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import RadarChart from '../../ui/RadarChart';
import { getDiscTheme } from '@/utils/psychometrics';
import type { MindCardsGridProps } from '../types';

export const MindCardsGrid: React.FC<MindCardsGridProps> = ({ minds }) => {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
      {minds.map((mind, idx) => {
        const discTheme = getDiscTheme(mind.archetypes.disc);

        return (
          <Card
            key={mind.id}
            className={`bg-studio-card group relative overflow-hidden border-white/5 transition-all duration-300 hover:border-white/10 ${idx === 1 ? 'z-10 scale-[1.02] border-indigo-500/30 shadow-2xl ring-1 ring-indigo-500/20' : 'opacity-90 hover:opacity-100'}`}
          >
            <div
              className={`absolute left-0 top-0 h-1 w-full ${idx === 1 ? 'bg-indigo-500' : idx === 0 ? 'bg-studio-primary' : 'bg-zinc-500'} opacity-50`}
            ></div>
            <CardHeader className="relative z-10 pb-4 pt-8 text-center">
              <div className="absolute right-4 top-4 font-mono text-[10px] text-zinc-600">
                {idx + 1}
              </div>
              <div className="mx-auto mb-3 h-20 w-20 rounded-full border border-white/10 bg-black p-1 transition-transform duration-500 group-hover:scale-110">
                <img
                  src={mind.avatar}
                  alt={mind.name}
                  className="h-full w-full rounded-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
                />
              </div>
              <CardTitle className="mb-1 text-xl text-white">{mind.name}</CardTitle>
              <Badge
                variant="outline"
                className="mx-auto border-white/5 text-[10px] uppercase tracking-wider text-zinc-500"
              >
                {mind.title}
              </Badge>
            </CardHeader>
            <CardContent className="space-y-6 pb-8">
              <div className="-my-4 flex h-[200px] w-full items-center justify-center">
                <RadarChart
                  data={mind.radar}
                  size={220}
                  colors={{
                    stroke: idx === 0 ? '#D4AF37' : idx === 1 ? '#6366f1' : '#e4e4e7',
                    fill:
                      idx === 0
                        ? 'rgba(212, 175, 55, 0.2)'
                        : idx === 1
                          ? 'rgba(99, 102, 241, 0.2)'
                          : 'rgba(228, 228, 231, 0.1)',
                    text: 'fill-zinc-500',
                    grid: 'rgba(255,255,255,0.05)',
                  }}
                />
              </div>

              <div className="space-y-3 px-4 text-center">
                <div>
                  <p className="mb-1 text-[9px] font-bold uppercase tracking-widest text-zinc-600">
                    Superpower
                  </p>
                  <p className="font-serif text-xs italic leading-relaxed text-zinc-300">
                    "{mind.superpower}"
                  </p>
                </div>
                <div>
                  <p className="mb-1 text-[9px] font-bold uppercase tracking-widest text-zinc-600">
                    Kryptonite
                  </p>
                  <p className="text-xs leading-relaxed text-zinc-500">{mind.kryptonite}</p>
                </div>
              </div>
            </CardContent>

            {/* Footer / Quick Stats */}
            <div className="grid grid-cols-3 border-t border-white/5 bg-white/[0.02]">
              <div className="border-r border-white/5 p-3 text-center">
                <div className="text-lg font-bold leading-none text-white">
                  {mind.archetypes.mbti}
                </div>
                <div className="mt-1 text-[9px] uppercase text-zinc-600">MBTI</div>
              </div>
              <div className="border-r border-white/5 p-3 text-center">
                <div className="text-lg font-bold leading-none text-white">
                  {mind.archetypes.enneagram}
                </div>
                <div className="mt-1 text-[9px] uppercase text-zinc-600">Eneagrama</div>
              </div>
              <div className="p-3 text-center">
                <div className={`text-lg font-bold leading-none ${discTheme.color}`}>
                  {mind.archetypes.disc}
                </div>
                <div className="mt-1 text-[9px] uppercase text-zinc-600">DISC</div>
              </div>
            </div>
            <div className="border-t border-white/5 bg-black/40 py-2 text-center">
              <span className="font-mono text-[10px] tracking-wider text-zinc-500">
                ESTRATO COGNITIVO: <span className="font-bold text-zinc-300">{mind.strat}</span>
              </span>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

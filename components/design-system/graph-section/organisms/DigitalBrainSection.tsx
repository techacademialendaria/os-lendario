import React from 'react';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { ObsidianGraphView } from './ObsidianGraphView';

export const DigitalBrainSection: React.FC = () => {
  return (
    <section className="space-y-6 border-t border-border pt-12">
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#050505] p-8 shadow-2xl md:p-12">
        {/* Background gradient hint */}
        <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full bg-brand-indigo/20 blur-[100px]"></div>

        <div className="relative z-10 grid grid-cols-1 gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <ObsidianGraphView />
          </div>
          <div className="flex flex-col justify-center space-y-6 text-white">
            <h3 className="bg-gradient-to-r from-white to-white/50 bg-clip-text font-sans text-3xl font-bold text-transparent">
              Cerebro Digital
            </h3>
            <p className="font-serif leading-relaxed text-white/70">
              O estilo "Second Brain". Fundo escuro profundo para reduzir a fadiga visual em
              analises prolongadas de dados complexos.
            </p>
            <ul className="space-y-3 font-mono text-sm text-white/60">
              <li className="flex items-center gap-2">
                <Icon name="check" className="text-brand-indigo" /> Alto Contraste
              </li>
              <li className="flex items-center gap-2">
                <Icon name="check" className="text-brand-indigo" /> Efeito Glow (Neon)
              </li>
              <li className="flex items-center gap-2">
                <Icon name="check" className="text-brand-indigo" /> Animacao "Drift"
              </li>
            </ul>
            <Button
              variant="outline"
              className="w-fit border-white/20 text-white hover:bg-white/10"
            >
              Explorar Dataset
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

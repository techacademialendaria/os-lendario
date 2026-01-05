import React from 'react';
import { ALAN_AVATAR, AUTHORITY_METRICS } from '../data';

export const AuthoritySection: React.FC = () => (
  <section className="border-y border-white/10 bg-zinc-900 px-4 py-20 text-white">
    <div className="mx-auto flex max-w-5xl flex-col items-center gap-12 md:flex-row">
      <div className="w-full md:w-1/3">
        <div className="relative aspect-square overflow-hidden rounded-2xl border-2 border-primary shadow-2xl">
          <img src={ALAN_AVATAR} className="h-full w-full object-cover" alt="Alan Nicolas" />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
            <p className="text-lg font-bold">Alan Nicolas</p>
            <p className="text-xs uppercase tracking-widest text-zinc-300">Fundador</p>
          </div>
        </div>
      </div>
      <div className="flex-1 space-y-8">
        <h2 className="text-3xl font-bold md:text-4xl">Por que me ouvir?</h2>

        <div className="grid grid-cols-2 gap-4">
          {AUTHORITY_METRICS.map((metric, i) => (
            <div key={i} className="rounded-lg border border-white/10 bg-white/5 p-4">
              <p className="text-2xl font-bold text-primary">{metric.value}</p>
              <p className="text-xs text-zinc-400">{metric.label}</p>
            </div>
          ))}
        </div>

        <div className="space-y-4 font-serif leading-relaxed text-zinc-300">
          <p>
            <strong>O que eu nao sou:</strong> Nao sou dev. Nao sou tecnico de formacao. Nao sou
            guru de palco vendendo formula magica.
          </p>
          <p>
            <strong>O que eu sou:</strong> Criador do conceito "Segundo Cerebro com IA" no
            Brasil. O cara que usa IA a cada 30 minutos - nao como modinha, mas como extensao do
            cerebro.
          </p>
          <div className="rounded-lg border border-primary/20 bg-primary/10 p-4 text-sm italic text-primary-foreground">
            "Eu tambem era o cara travado. TDAH. Milhoes de ideias. Execucao fragmentada. Criei
            o sistema para mim antes de ensinar para outros. Isso nao e teoria. E o que me
            salvou."
          </div>
        </div>
      </div>
    </div>
  </section>
);

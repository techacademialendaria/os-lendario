import React from 'react';
import { AI_TOOLS } from '../data';

export const ToolsSection: React.FC = () => (
  <section className="border-y border-border bg-muted/10 px-4 py-20">
    <div className="mx-auto max-w-4xl space-y-10 text-center">
      <div className="space-y-4">
        <h2 className="text-3xl font-bold">Ferramentas Premium Inclusas</h2>
        <p className="font-serif text-muted-foreground">
          Acesso ao nosso <strong>Super Chat</strong> com as 9 IAs mais poderosas do mundo.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
        {AI_TOOLS.map((ai, i) => (
          <div
            key={i}
            className="flex items-center justify-center rounded-xl border border-border bg-card p-4 text-sm font-bold shadow-sm"
          >
            {ai}
          </div>
        ))}
      </div>

      <div className="inline-block rotate-1 transform rounded-2xl border border-border bg-background p-6 shadow-lg transition-transform duration-300 hover:rotate-0">
        <p className="mb-2 text-sm font-bold uppercase tracking-widest text-muted-foreground">
          Valor se contratado separado
        </p>
        <p className="text-4xl font-black text-foreground line-through decoration-destructive/30 decoration-4">
          R$ 8.400<span className="text-lg font-normal text-muted-foreground">/ano</span>
        </p>
        <p className="mt-2 text-xs font-bold text-primary">Voce recebe incluso na assinatura.</p>
      </div>
    </div>
  </section>
);

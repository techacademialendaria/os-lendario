import React from 'react';
import { Badge } from '../../../ui/badge';
import { Icon } from '../../../ui/icon';
import { leaderAttributes, teamVirtues, productiveTensions } from '../data';

export const PeopleCultureView: React.FC = () => (
  <section className="space-y-8">
    <h3 className="flex items-center gap-2 border-b border-border pb-2 font-sans text-2xl font-semibold">
      <Icon name="users-alt" /> 3. Pessoas & Cultura
    </h3>

    <div className="grid grid-cols-1 gap-12 xl:grid-cols-2">
      {/* LIDERANCA */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h4 className="flex items-center gap-2 text-xl font-bold">
            <Icon name="crown" className="text-primary" /> 15 Atributos do Lider
          </h4>
          <Badge variant="outline">Sobre Nossos Lideres</Badge>
        </div>
        <div className="custom-scrollbar h-[500px] space-y-3 overflow-y-auto pr-2">
          {leaderAttributes.map((attr, i) => (
            <div
              key={i}
              className="group rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary/50"
            >
              <p className="text-sm font-bold text-foreground transition-colors group-hover:text-primary">
                {i + 1}. {attr.title}
              </p>
              <p className="mt-1 font-sans text-xs font-medium text-muted-foreground">
                {attr.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* TIME */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h4 className="flex items-center gap-2 text-xl font-bold">
            <Icon name="shield-check" className="text-primary" /> 8 Virtudes do Time
          </h4>
          <Badge variant="outline">Sobre Nosso Time</Badge>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {teamVirtues.map((virtue, i) => (
            <div
              key={i}
              className="flex flex-col items-center gap-3 rounded-lg border border-border bg-card p-4 text-center transition-colors hover:bg-muted/50"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Icon name={virtue.icon} size="size-5" />
              </div>
              <span className="text-sm font-bold">{virtue.title}</span>
            </div>
          ))}
        </div>

        {/* Tensions summary */}
        <div className="mt-6 rounded-xl border border-dashed border-border bg-muted/20 p-6">
          <h5 className="mb-4 text-sm font-bold uppercase tracking-wider text-muted-foreground">
            Tensoes Produtivas
          </h5>
          <div className="space-y-2 font-sans text-sm font-medium">
            {productiveTensions.map((tension, i) => (
              <div
                key={i}
                className={`flex justify-between ${i < productiveTensions.length - 1 ? 'border-b border-border/50 pb-1' : 'pb-1'}`}
              >
                <span>{tension.left}</span> <span>{tension.right}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

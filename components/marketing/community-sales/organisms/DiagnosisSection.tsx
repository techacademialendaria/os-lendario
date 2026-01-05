import React from 'react';
import { Icon } from '@/components/ui/icon';
import { DIAGNOSIS_ITEMS } from '../data';

export const DiagnosisSection: React.FC = () => (
  <section className="border-b border-border bg-muted/5 px-4 py-20">
    <div className="mx-auto max-w-3xl space-y-12">
      <div className="text-center">
        <h2 className="mb-4 text-3xl font-bold md:text-4xl">Voce se reconhece?</h2>
        <p className="font-serif text-lg text-muted-foreground">
          Se voce marcar 3 ou mais, este sistema foi feito para voce.
        </p>
      </div>

      <div className="space-y-4">
        {DIAGNOSIS_ITEMS.map((item, i) => (
          <div
            key={i}
            className="flex items-start gap-4 rounded-xl border border-border bg-card p-4 shadow-sm transition-colors hover:border-primary/30"
          >
            <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded border-2 border-primary text-primary">
              <Icon name="check" size="size-3" />
            </div>
            <p className="font-medium text-foreground/90">{item}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

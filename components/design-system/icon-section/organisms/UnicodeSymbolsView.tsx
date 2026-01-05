import React from 'react';
import { Symbol } from '@/components/ui/symbol';
import { Card } from '@/components/ui/card';
import { SYMBOL_ITEMS } from '../data';

/**
 * Unicode symbols section displaying typographic glyphs
 */
export const UnicodeSymbolsView: React.FC = () => {
  return (
    <section className="space-y-8">
      <h3 className="flex items-center gap-2 font-sans text-2xl font-semibold">
        <Symbol name="infinity" /> Simbolos Tipograficos
      </h3>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {SYMBOL_ITEMS.map((item) => (
          <Card
            key={item.name}
            className="flex flex-col items-center justify-center gap-4 border-dashed bg-muted/10 p-8"
          >
            <Symbol
              name={item.name}
              className={`text-5xl ${item.name === 'infinity' ? 'text-primary' : item.name === 'bullet' ? 'text-muted-foreground' : 'text-foreground'}`}
            />
            <div className="text-center">
              <span className="block font-mono text-sm font-bold">{item.label}</span>
              <span className="text-xs text-muted-foreground">{item.description}</span>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};

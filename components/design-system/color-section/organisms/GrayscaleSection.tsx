import React from 'react';
import { Icon } from '@/components/ui/icon';
import { GRAYSCALE_COLORS } from '../data';

export const GrayscaleSection: React.FC = () => {
  return (
    <section className="space-y-6">
      <h3 className="flex items-center gap-2 font-sans text-2xl font-bold">
        <Icon name="palette" /> Escala Monocromatica
      </h3>
      <p className="font-serif text-muted-foreground">
        Do branco ao preto, cada tom de cinza e calculado em multiplos de 8.
      </p>
      <div className="custom-scrollbar w-full overflow-x-auto pb-4">
        <div className="flex min-w-max gap-2">
          {GRAYSCALE_COLORS.map((hex, index) => (
            <div key={index} className="group flex flex-col items-center">
              <div
                className="relative h-24 w-12 cursor-pointer rounded-md border border-border transition-transform hover:z-10 hover:scale-110 hover:shadow-lg"
                style={{ backgroundColor: hex }}
                title={hex}
              />
              <span className="mt-2 font-mono text-[10px] uppercase text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100">
                {hex}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

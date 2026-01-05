/**
 * LuxeFooter - Footer section for Lendario Luxe showcase
 */

import React from 'react';

export const LuxeFooter: React.FC = () => {
  return (
    <section className="text-center">
      <p className="text-[9px] font-black uppercase tracking-[0.4em] text-primary">
        Academia Lendária
      </p>
      <p className="mt-2 text-xl font-bold tracking-tight">
        Componentes de <code className="text-primary">/books</code>
      </p>
      <p className="mt-1 font-serif text-sm italic text-muted-foreground">
        Usando componentes reais • Tema Gold automático
      </p>
    </section>
  );
};

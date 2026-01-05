import React from 'react';

export const IntroSection: React.FC = () => {
  return (
    <section>
      <div className="mb-12 space-y-4">
        <h2 className="font-sans text-4xl font-bold tracking-tight md:text-5xl">
          Cores Lendarias.
        </h2>
        <p className="max-w-3xl font-serif text-xl leading-relaxed text-muted-foreground">
          Simples. Preciso. Funcional. A cor aparece apenas onde faz sentido, guiando a
          experiencia sem comprometer a estetica minimalista.
        </p>
      </div>

      {/* 8% Rule */}
      <div className="grid grid-cols-1 items-center gap-12 rounded-2xl border border-border bg-card p-8 md:grid-cols-2">
        <div className="flex items-center justify-center">
          <div className="relative flex h-48 w-48 items-center justify-center rounded-full border-4 border-muted bg-secondary">
            <div
              className="absolute inset-0 rounded-full border-4 border-primary"
              style={{
                clipPath: 'polygon(50% 50%, 100% 0, 100% 30%, 50% 50%)',
                transform: 'rotate(-45deg)',
              }}
            ></div>
            <div className="flex flex-col items-center">
              <span className="font-sans text-5xl font-bold text-primary">8%</span>
            </div>
            <div className="absolute right-0 top-1/2 -mr-16 hidden h-px w-16 translate-x-4 bg-foreground md:block"></div>
          </div>
        </div>
        <div className="space-y-4">
          <h3 className="font-sans text-xl font-bold">A Regra dos 8%</h3>
          <p className="font-serif leading-relaxed text-muted-foreground">
            <strong className="text-foreground">Nada em excesso. Nada sem motivo.</strong>
            <br />
            8% e o maximo que a cor pode ocupar em uma Tela, Arte ou Aplicacao. O restante deve
            ser respirado pelo background e tipografia.
          </p>
        </div>
      </div>
    </section>
  );
};

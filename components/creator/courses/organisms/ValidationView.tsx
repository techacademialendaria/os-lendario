import React from 'react';
import { Button } from '../../../ui/button';
import { Icon } from '../../../ui/icon';

interface ValidationViewProps {
  onBack: () => void;
}

export const ValidationView: React.FC<ValidationViewProps> = ({ onBack }) => {
  return (
    <div className="flex min-h-[60vh] animate-fade-in flex-col items-center justify-center space-y-8 text-center">
      <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-success/10 text-success">
        <Icon name="check" size="size-10" />
      </div>
      <h1 className="font-sans text-4xl font-bold">Curso Pronto para Publicação!</h1>
      <p className="max-w-2xl font-serif text-xl text-muted-foreground">
        Todas as lições foram geradas, validadas pelos frameworks GPS e Didática Lendária, e
        aprovadas.
      </p>
      <div className="grid grid-cols-3 gap-8 rounded-xl border border-border bg-card p-8 text-left shadow-lg">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Aulas</p>
          <p className="mt-1 text-3xl font-bold">12</p>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
            Duração
          </p>
          <p className="mt-1 text-3xl font-bold">2h 15m</p>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
            Materiais
          </p>
          <p className="mt-1 text-3xl font-bold">5 PDFs</p>
        </div>
      </div>
      <div className="flex gap-4 pt-4">
        <Button variant="outline" size="lg" onClick={onBack}>
          Voltar ao Dashboard
        </Button>
        <Button size="lg" className="shadow-xl">
          Publicar Agora
        </Button>
      </div>
    </div>
  );
};

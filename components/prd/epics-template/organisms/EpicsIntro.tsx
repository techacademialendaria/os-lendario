// EpicsIntro Organism
// Intro text for the epics page

import React from 'react';

export const EpicsIntro: React.FC = () => (
  <div className="space-y-4 text-center">
    <h1 className="text-3xl font-bold">Arquitetura de Execucao</h1>
    <p className="mx-auto max-w-2xl font-serif text-muted-foreground">
      A IA transformou seu PRD em marcos (Epicos) e tarefas (Stories). Valide a logica antes
      de exportar para garantir que o "Puxadinho" vire "Mansao".
    </p>
  </div>
);

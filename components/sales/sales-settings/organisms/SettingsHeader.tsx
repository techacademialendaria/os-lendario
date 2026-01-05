import React from 'react';

export const SettingsHeader: React.FC = () => {
  return (
    <div className="flex items-center justify-between">
      <div className="space-y-1">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">Configuracoes</h2>
        <p className="font-serif text-muted-foreground">
          Gerencie as conexoes e o comportamento da IA.
        </p>
      </div>
      <div className="flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-2 shadow-sm">
        <div className="relative">
          <div className="bg-success h-3 w-3 animate-pulse rounded-full"></div>
        </div>
        <div className="text-sm">
          <p className="font-bold leading-none">Sistema Operacional</p>
          <p className="text-[10px] text-muted-foreground">Uptime: 99.9%</p>
        </div>
      </div>
    </div>
  );
};

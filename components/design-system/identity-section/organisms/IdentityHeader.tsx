import React from 'react';
import { Badge } from '../../../ui/badge';
import { Icon } from '../../../ui/icon';

export const IdentityHeader: React.FC = () => (
  <div className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-card to-muted p-6 md:p-10">
    <div className="mb-4 flex items-center justify-between">
      <Badge variant="outline" className="bg-background/50 backdrop-blur-sm">
        FIVU v2.0
      </Badge>
      <span className="font-mono text-xs text-muted-foreground">Corpus: 15.832 palavras</span>
    </div>
    <h2 className="mb-4 font-sans text-3xl font-bold tracking-tight md:text-5xl">
      Identidade Verbal <span className="text-primary">Universal</span>
    </h2>
    <p className="max-w-3xl font-sans text-lg font-medium leading-relaxed text-muted-foreground md:text-xl">
      A voz da <strong className="text-foreground">Academia Lendar[IA]</strong>. Um framework vivo
      para comunicacao institucional, fundamentado em documentos culturais, manifestos e principios
      de lideranca.
    </p>
    <div className="relative z-10 mt-8 flex flex-col gap-4 sm:flex-row">
      <div className="flex items-center gap-2 text-sm font-semibold">
        <Icon name="user" className="text-primary" /> Founder: Alan Nicolas
      </div>
      <div className="flex items-center gap-2 text-sm font-semibold">
        <Icon name="calendar" className="text-primary" /> Desde: 15/01/2020
      </div>
    </div>
    <Icon
      name="fingerprint"
      className="absolute -bottom-8 -right-8 rotate-12 text-[8rem] text-primary/5 md:text-[12rem]"
    />
  </div>
);

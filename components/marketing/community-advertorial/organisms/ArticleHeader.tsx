import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Icon } from '@/components/ui/icon';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ALAN_AVATAR } from '../data';

export const ArticleHeader: React.FC = () => (
  <header className="mb-8 space-y-6">
    <div className="flex items-center gap-2">
      <Badge
        variant="warning"
        className="rounded-sm border-brand-orange/20 bg-brand-orange/10 text-[10px] uppercase tracking-widest text-brand-orange"
      >
        Carreira
      </Badge>
      <span className="font-sans text-xs font-bold uppercase tracking-widest text-muted-foreground">
        Dezembro 2025 - 7 min de leitura
      </span>
    </div>

    <h1 className="font-serif text-3xl font-bold leading-[1.1] text-foreground md:text-5xl lg:text-6xl">
      80% Dos Profissionais Experientes Estao Perdendo Horas Por Dia Em Tarefas Que IA
      Resolve Em Minutos
    </h1>

    <h2 className="border-l-4 border-primary pl-6 font-sans text-lg font-light italic leading-relaxed text-muted-foreground md:text-xl">
      Uma pesquisa com 150+ profissionais revelou por que decadas de experiencia estao sendo
      desperdicadas - e o sistema de 3 camadas que inverte isso.
    </h2>

    <div className="mt-8 flex items-center justify-between border-y border-border/50 py-6">
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage src={ALAN_AVATAR} />
          <AvatarFallback>AN</AvatarFallback>
        </Avatar>
        <div className="text-left font-sans">
          <p className="text-sm font-bold text-foreground">Por Redacao Lendaria</p>
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
            Especial Carreira 4.0
          </p>
        </div>
      </div>
      <div className="flex gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full bg-muted/20 hover:bg-brand-blue/10 hover:text-brand-blue"
        >
          <Icon name="linkedin" type="brands" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full bg-muted/20 hover:bg-brand-green/10 hover:text-brand-green"
        >
          <Icon name="whatsapp" type="brands" />
        </Button>
      </div>
    </div>
  </header>
);

// Decision Section Component
// Task vs Project decision cards

import React from 'react';
import { Icon } from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';
import { STUDIO_TEAL, MIN_CHARS_REQUIRED } from '../types';

interface DecisionSectionProps {
  isValid: boolean;
  isAdvancing: boolean;
  onTaskSelect: () => void;
  onProjectSelect: () => void;
}

export const DecisionSection: React.FC<DecisionSectionProps> = ({
  isValid,
  isAdvancing,
  onTaskSelect,
  onProjectSelect,
}) => (
  <div className="mt-12 border-t border-border pt-12">
    <h3 className="mb-8 text-center text-2xl font-bold">
      Decisao Estrategica: O que estamos construindo?
    </h3>

    <div className="grid gap-8 md:grid-cols-2">
      {/* Task Card */}
      <button
        onClick={onTaskSelect}
        disabled={!isValid || isAdvancing}
        className="group relative cursor-pointer overflow-hidden rounded-2xl border-2 border-border p-8 text-left transition-all hover:border-muted-foreground/50 hover:bg-card disabled:cursor-not-allowed disabled:opacity-50"
      >
        <div className="mb-6 flex size-16 items-center justify-center rounded-full bg-muted text-3xl transition-transform group-hover:scale-110">
          <Icon name="check" />
        </div>
        <h4 className="mb-2 text-2xl font-bold">E uma TAREFA</h4>
        <p className="mb-6 font-serif text-muted-foreground">
          Uma acao macro com resultado verificavel e isolado.
          <br />
          <span className="text-xs opacity-70">
            (Ex: Landing page, Automacao simples, Chatbot basico)
          </span>
        </p>
        <Badge
          variant="outline"
          className="bg-muted text-muted-foreground transition-colors group-hover:bg-foreground group-hover:text-background"
        >
          Fluxo Rapido: ~30 min
        </Badge>
      </button>

      {/* Project Card */}
      <button
        onClick={onProjectSelect}
        disabled={!isValid || isAdvancing}
        className="hover:bg-[var(--studio-teal)]/10 group relative cursor-pointer overflow-hidden rounded-2xl border-2 p-8 text-left shadow-lg transition-all disabled:cursor-not-allowed disabled:opacity-50"
        style={
          {
            '--studio-teal': STUDIO_TEAL,
            borderColor: STUDIO_TEAL,
            backgroundColor: `${STUDIO_TEAL}08`,
            boxShadow: `0 10px 40px ${STUDIO_TEAL}15`,
          } as React.CSSProperties
        }
      >
        <div
          className="absolute right-4 top-4 animate-pulse"
          style={{ color: STUDIO_TEAL }}
        >
          <Icon name="star" />
        </div>
        <div
          className="mb-6 flex size-16 items-center justify-center rounded-full text-3xl text-white transition-transform group-hover:scale-110"
          style={{ backgroundColor: STUDIO_TEAL }}
        >
          <Icon name="multi-window" />
        </div>
        <h4 className="mb-2 text-2xl font-bold text-foreground">E um PROJETO</h4>
        <p className="mb-6 font-serif text-muted-foreground">
          Multiplas acoes interconectadas, banco de dados ou sistemas.
          <br />
          <span className="text-xs opacity-70">(Ex: CRM, SaaS, App Multi-tela)</span>
        </p>
        <Badge
          className="text-white hover:opacity-90"
          style={{ backgroundColor: STUDIO_TEAL }}
        >
          {isAdvancing ? (
            <>
              <Icon name="refresh" className="mr-1 size-3 animate-spin" />
              Processando...
            </>
          ) : (
            'Fluxo Completo: Detalhar PRD ->'
          )}
        </Badge>
      </button>
    </div>

    {!isValid && (
      <p className="mt-4 text-center text-sm text-muted-foreground">
        Preencha Problema e Solucao (minimo {MIN_CHARS_REQUIRED} caracteres cada) para
        continuar.
      </p>
    )}
  </div>
);

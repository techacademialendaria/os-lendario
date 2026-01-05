import React from 'react';
import { OpsCard, OpsCardHeader, OpsCardContent } from '../../ops-ui';
import { OPS_ACCENT } from '../../ops-tokens';

const CREATION_STEPS = [
  { step: 1, title: 'PESQUISAR', desc: 'Fonte primaria (quem criou, quando, onde publicou)' },
  { step: 2, title: 'EXEMPLOS', desc: 'Coletar 3+ exemplos praticos de aplicacao real' },
  { step: 3, title: 'CRITICAS', desc: 'Pesquisar erros comuns, limitacoes e controversias' },
  { step: 4, title: 'VALIDAR', desc: 'Preencher todos os 18 campos obrigatorios' },
  { step: 5, title: 'JSON', desc: 'Gerar JSON valido e passar no checklist de qualidade' }
];

const QUALITY_CHECKLIST = [
  'Slug unico (nao existe)',
  'year_originated verificado',
  'origin_author verificado',
  '3+ exemplos completos',
  '3+ common_mistakes',
  '3-5 discovery_questions PT',
  'ai_instructions e STRING',
  'complementary_models validos',
  'JSON valido (sem syntax)',
  'quality_score calculado'
];

export const CreationProcessView: React.FC = () => {
  return (
    <OpsCard>
      <OpsCardHeader title="Processo de Criacao & Regras" accentColor="text-muted-foreground" />
      <OpsCardContent>
        <div className="space-y-4">
          {/* Creation Process */}
          <div>
            <h4 className="font-bold text-sm mb-3" style={{ color: OPS_ACCENT }}>
              Processo de Criacao
            </h4>
            <div className="space-y-2">
              {CREATION_STEPS.map((item, i) => (
                <div key={i} className="flex gap-3 p-3 rounded-lg bg-muted/20">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs text-white" style={{ backgroundColor: OPS_ACCENT }}>
                    {item.step}
                  </div>
                  <div>
                    <h5 className="font-bold text-xs text-foreground">{item.title}</h5>
                    <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Critical Rules */}
          <div className="border-t border-border/20 pt-4">
            <h4 className="font-bold text-sm mb-3" style={{ color: OPS_ACCENT }}>
              Regras Criticas
            </h4>
            <div className="space-y-2 text-xs">
              <div className="p-2 rounded bg-red-500/10 border-l-2 border-red-500">
                <span className="font-mono font-bold text-red-600">ai_instructions</span>
                <span className="text-muted-foreground ml-1">DEVE ser STRING, nao objeto</span>
              </div>
              <div className="p-2 rounded bg-red-500/10 border-l-2 border-red-500">
                <span className="font-mono font-bold text-red-600">year_originated</span>
                <span className="text-muted-foreground ml-1">Verificado com 2+ fontes (nao suposicoes)</span>
              </div>
              <div className="p-2 rounded bg-yellow-500/10 border-l-2 border-yellow-500">
                <span className="font-mono font-bold text-yellow-600">examples</span>
                <span className="text-muted-foreground ml-1">Minimo 3 com context/application/insight</span>
              </div>
              <div className="p-2 rounded bg-yellow-500/10 border-l-2 border-yellow-500">
                <span className="font-mono font-bold text-yellow-600">discovery_questions</span>
                <span className="text-muted-foreground ml-1">3-5 em PT-BR (nao em ingles)</span>
              </div>
              <div className="p-2 rounded bg-blue-500/10 border-l-2 border-blue-500">
                <span className="font-mono font-bold text-blue-600">complementary_models</span>
                <span className="text-muted-foreground ml-1">Slugs validos existentes no sistema</span>
              </div>
            </div>
          </div>

          {/* Quality Checklist */}
          <div className="border-t border-border/20 pt-4">
            <h4 className="font-bold text-sm mb-3" style={{ color: OPS_ACCENT }}>
              Checklist de Qualidade (pre-commit)
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {QUALITY_CHECKLIST.map((item, i) => (
                <div key={i} className="p-2 rounded bg-muted/20 text-muted-foreground">
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Storage Info */}
          <div className="border-t border-border/20 pt-4 p-3 rounded-lg bg-muted/20">
            <p className="text-xs text-muted-foreground">
              <span className="font-bold text-foreground">Armazenamento:</span> Mental Models sao salvos na tabela{' '}
              <span className="font-mono text-primary">tools</span> com{' '}
              <span className="font-mono text-primary">tool_type = "mental_model"</span> e dados estruturados em{' '}
              <span className="font-mono text-primary">tool_schema (JSONB)</span>
            </p>
          </div>
        </div>
      </OpsCardContent>
    </OpsCard>
  );
};

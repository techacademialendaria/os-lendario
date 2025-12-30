import React, { useState } from 'react';
import { Icon } from '../../ui/icon';
import { cn } from '../../../lib/utils';
import {
  OpsPage,
  OpsCard,
  OpsCardHeader,
  OpsCardContent,
  OpsGrid,
  OpsText,
} from '../ops-ui';
import { OPS_ACCENT, OPS_PRIMARY } from '../ops-tokens';
import { MermaidDiagram } from '../components/MermaidDiagram';
import { StatusBadge } from '../components/StatusBadge';
import {
  MENTAL_MODELS_EXPLANATION,
  MENTAL_MODELS_RELATIONSHIPS,
  MENTAL_MODELS_FRAMEWORK,
  MENTAL_MODELS_RECOMMENDATIONS,
  MENTAL_MODELS_REFERENCES
} from '../data/mental-models-content';
import { MENTAL_MODELS_DIAGRAM, MENTAL_MODELS_TABLE } from '../data/tables';
import { useMentalModels } from '../../../hooks/useMentalModels';

const MentalModelsSection: React.FC = () => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [expandedModel, setExpandedModel] = useState<string | null>(null);
  const { categories, loading, error, totalModels } = useMentalModels();

  return (
    <OpsPage>
      {/* Main Definition */}
      <OpsCard>
        <OpsCardHeader title={MENTAL_MODELS_EXPLANATION.title} />
        <OpsCardContent>
          <OpsText className="text-foreground mb-4">
            {MENTAL_MODELS_EXPLANATION.definition}
          </OpsText>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {MENTAL_MODELS_EXPLANATION.importance.map((point, i) => (
              <div key={i} className="flex items-start gap-2 p-3 rounded-lg bg-muted/20">
                <Icon name="check" size="size-4" className="text-primary mt-0.5 flex-shrink-0" />
                <span className="text-sm text-foreground">{point}</span>
              </div>
            ))}
          </div>
        </OpsCardContent>
      </OpsCard>

      {/* Loading State */}
      {loading && (
        <OpsCard>
          <OpsCardContent className="flex items-center justify-center py-12">
            <div className="flex flex-col items-center gap-3">
              <Icon name="spinner" size="size-6" className="animate-spin text-primary" />
              <span className="text-sm text-muted-foreground">Carregando modelos mentais...</span>
            </div>
          </OpsCardContent>
        </OpsCard>
      )}

      {/* Error State */}
      {error && !loading && (
        <OpsCard>
          <OpsCardContent className="flex items-center justify-center py-12">
            <div className="flex flex-col items-center gap-3">
              <Icon name="exclamation-circle" size="size-6" className="text-destructive" />
              <span className="text-sm text-destructive">Erro ao carregar modelos mentais</span>
              <span className="text-xs text-muted-foreground">{error.message}</span>
            </div>
          </OpsCardContent>
        </OpsCard>
      )}

      {/* Empty State */}
      {!loading && !error && categories.length === 0 && (
        <OpsCard>
          <OpsCardContent className="flex items-center justify-center py-12">
            <div className="flex flex-col items-center gap-3">
              <Icon name="info-circle" size="size-6" className="text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Nenhum modelo mental encontrado</span>
            </div>
          </OpsCardContent>
        </OpsCard>
      )}

      {/* Categories Deep Dive */}
      {!loading && !error && categories.length > 0 && (
        <OpsCard>
          <OpsCardHeader title="Categorias de Modelos Mentais" accentColor="text-muted-foreground" />
          <OpsCardContent>
            <div className="space-y-4">
              {categories.map((category, idx) => (
              <div
                key={idx}
                className="rounded-lg border border-border/40 overflow-hidden hover:border-border/60 transition-colors"
              >
                {/* Header */}
                <button
                  onClick={() => setExpandedCategory(expandedCategory === category.name ? null : category.name)}
                  className="w-full p-4 bg-muted/10 hover:bg-muted/20 transition-colors flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <Icon
                      name={category.icon}
                      size="size-5"
                      style={{ color: OPS_ACCENT }}
                    />
                    <div className="text-left">
                      <h3 className="font-bold text-sm" style={{ color: OPS_ACCENT }}>
                        {category.name}
                      </h3>
                      <p className="text-xs text-muted-foreground">{category.description}</p>
                    </div>
                    <span className="text-xs bg-muted/50 px-2 py-1 rounded text-muted-foreground ml-auto">
                      {category.models.length} modelos
                    </span>
                  </div>
                  <Icon
                    name={expandedCategory === category.name ? 'angle-small-up' : 'angle-small-down'}
                    size="size-4"
                    className="text-muted-foreground group-hover:text-foreground ml-2"
                  />
                </button>

                {/* Content */}
                {expandedCategory === category.name && (
                  <div className="p-4 border-t border-border/20 bg-background space-y-3">
                    {category.models.map((model, i) => (
                      <button
                        key={i}
                        onClick={() => setExpandedModel(expandedModel === model.slug ? null : model.slug)}
                        className="w-full text-left p-3 rounded-lg bg-muted/20 border-l-4 hover:bg-muted/30 transition-all"
                        style={{ borderColor: OPS_PRIMARY }}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-bold text-sm text-foreground mb-1">
                              {model.name}
                            </h4>
                            <p className="text-xs text-muted-foreground mb-2">
                              {model.desc}
                            </p>
                            <div className="flex flex-wrap gap-1">
                              <span className="text-[10px] bg-muted/50 px-1.5 py-0.5 rounded text-muted-foreground">
                                {model.origin}
                              </span>
                              <span className="text-[10px] bg-muted/50 px-1.5 py-0.5 rounded text-muted-foreground">
                                Complexidade: {model.complexity}/10
                              </span>
                              <span className="text-[10px] bg-muted/50 px-1.5 py-0.5 rounded text-muted-foreground">
                                Aplicabilidade: {model.applicability}/10
                              </span>
                            </div>
                          </div>
                          {expandedModel === model.slug && (
                            <Icon name="angle-small-up" size="size-4" className="text-muted-foreground ml-2 flex-shrink-0" />
                          )}
                        </div>

                        {/* Expanded Details */}
                        {expandedModel === model.slug && (
                          <div className="mt-3 pt-3 border-t border-border/20 space-y-2">
                            <div className="text-xs">
                              <span className="font-medium text-muted-foreground">Quando usar: </span>
                              <span className="text-foreground">{model.useCase}</span>
                            </div>
                            <div className="text-xs italic" style={{ color: OPS_PRIMARY }}>
                              <span className="font-medium">Exemplo: </span>
                              {model.example}
                            </div>
                            <div className="flex flex-wrap gap-1 pt-1">
                              {model.driverAffinities.map((affinity, j) => (
                                <span key={j} className="text-[9px] bg-primary/10 text-primary px-1.5 py-0.5 rounded">
                                  ↔ {affinity}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </OpsCardContent>
      </OpsCard>
      )}

      {/* Relationships */}
      <OpsCard>
        <OpsCardHeader title={MENTAL_MODELS_RELATIONSHIPS.title} accentColor="text-muted-foreground" />
        <OpsCardContent>
          <OpsText className="mb-4">{MENTAL_MODELS_RELATIONSHIPS.description}</OpsText>

          <div className="space-y-4">
            {MENTAL_MODELS_RELATIONSHIPS.relationTypes.map((relType, i) => (
              <div key={i} className="p-4 rounded-lg bg-muted/20 border-l-4" style={{ borderColor: relType.color }}>
                <div className="flex items-center gap-2 mb-2">
                  <Icon name={relType.icon} size="size-4" style={{ color: relType.color }} />
                  <h4 className="font-bold text-sm" style={{ color: relType.color }}>
                    {relType.type}
                  </h4>
                  <span className="text-xs text-muted-foreground">- {relType.description}</span>
                </div>
                <div className="space-y-2 mt-3">
                  {relType.examples.map((ex, j) => (
                    <div key={j} className="p-2 rounded bg-muted/20 text-xs">
                      <p className="font-medium text-foreground mb-1">
                        {(ex as any).models?.join(' ↔ ')}
                      </p>
                      <p className="text-muted-foreground">{ex.explanation}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </OpsCardContent>
      </OpsCard>

      {/* How to Use Framework */}
      <OpsCard>
        <OpsCardHeader title={MENTAL_MODELS_FRAMEWORK.title} accentColor="text-muted-foreground" />
        <OpsCardContent>
          <OpsText className="mb-6">
            {MENTAL_MODELS_FRAMEWORK.description}
          </OpsText>

          <div className="space-y-3">
            {MENTAL_MODELS_FRAMEWORK.steps.map((step) => (
              <div
                key={step.step}
                className="flex gap-4 p-4 rounded-lg bg-muted/10 border border-border/20 hover:bg-muted/20 transition-colors"
              >
                <div
                  className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm text-white"
                  style={{ backgroundColor: OPS_ACCENT }}
                >
                  {step.step}
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-sm text-foreground mb-1">
                    {step.title}
                  </h4>
                  <p className="text-xs text-muted-foreground mb-1">
                    {step.description}
                  </p>
                  <p className="text-[11px] italic text-primary">
                    Ação: {step.action}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 rounded-lg bg-primary/10 border border-primary/20">
            <p className="text-sm text-foreground">
              <span className="font-bold">Dica de Ouro: </span>
              Charlie Munger (investidor lendário) recomenda desenvolver "uma mente que possa saltar
              entre diferentes disciplinas". O poder não está em memorizar modelos, mas em saber qual
              aplicar quando, e em combinar múltiplas perspectivas para ver mais claramente.
            </p>
          </div>
        </OpsCardContent>
      </OpsCard>

      {/* Core Principles */}
      <OpsCard>
        <OpsCardHeader title="Princípios Fundamentais" accentColor="text-muted-foreground" />
        <OpsCardContent>
          <OpsGrid columns={2}>
            {MENTAL_MODELS_FRAMEWORK.principles.map((principle, i) => (
              <div key={i} className="p-4 rounded-lg bg-muted/20 space-y-2">
                <div className="flex items-center gap-2 mb-2">
                  <Icon
                    name={principle.icon}
                    size="size-4"
                    style={{ color: OPS_ACCENT }}
                  />
                  <h4 className="font-bold text-sm" style={{ color: OPS_ACCENT }}>
                    {principle.principle}
                  </h4>
                </div>
                <p className="text-xs text-muted-foreground">
                  {principle.desc}
                </p>
              </div>
            ))}
          </OpsGrid>
        </OpsCardContent>
      </OpsCard>

      {/* Recommendations by Situation */}
      <OpsCard>
        <OpsCardHeader title={MENTAL_MODELS_RECOMMENDATIONS.title} accentColor="text-muted-foreground" />
        <OpsCardContent>
          <div className="space-y-3">
            {MENTAL_MODELS_RECOMMENDATIONS.situations.map((situation, i) => (
              <div key={i} className="p-3 rounded-lg bg-muted/20 border border-border/20">
                <h4 className="font-bold text-sm text-foreground mb-2">{situation.situation}</h4>
                <div className="flex flex-wrap gap-1 mb-2">
                  {situation.models.map((model, j) => (
                    <span key={j} className="text-[10px] bg-primary/20 text-primary px-2 py-1 rounded">
                      {model}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground italic">{situation.reason}</p>
              </div>
            ))}
          </div>
        </OpsCardContent>
      </OpsCard>

      {/* Schema Diagram */}
      <OpsCard>
        <OpsCardHeader title="Schema - Relacionamentos" accentColor="text-muted-foreground" />
        <OpsCardContent>
          <MermaidDiagram chart={MENTAL_MODELS_DIAGRAM} id="mental-models" />
        </OpsCardContent>
      </OpsCard>

      {/* Table Status */}
      <OpsCard>
        <OpsCardHeader title="Status das Tabelas" accentColor="text-muted-foreground" />
        <OpsCardContent className="p-0">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-xs font-bold text-muted-foreground uppercase">Tabela</th>
                <th className="text-left py-3 px-4 text-xs font-bold text-muted-foreground uppercase">Registros</th>
                <th className="text-left py-3 px-4 text-xs font-bold text-muted-foreground uppercase">Status</th>
                <th className="text-left py-3 px-4 text-xs font-bold text-muted-foreground uppercase hidden md:table-cell">Descrição</th>
              </tr>
            </thead>
            <tbody>
              {MENTAL_MODELS_TABLE.map((row, i) => (
                <tr key={i} className="border-b border-border/30 hover:bg-muted/30">
                  <td className="py-3 px-4">
                    <span className="font-mono text-xs" style={{ color: OPS_ACCENT }}>
                      {row.table}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-mono text-xs">{row.records}</td>
                  <td className="py-3 px-4">
                    <StatusBadge status={row.status} />
                  </td>
                  <td className="py-3 px-4 text-muted-foreground text-xs hidden md:table-cell">{row.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </OpsCardContent>
      </OpsCard>

      {/* References */}
      <OpsCard>
        <OpsCardHeader title="Referências & Aprofundamento" accentColor="text-muted-foreground" />
        <OpsCardContent>
          <div className="space-y-6">
            {/* Books */}
            <div>
              <h4 className="font-bold text-sm mb-3" style={{ color: OPS_ACCENT }}>Livros Recomendados</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {MENTAL_MODELS_REFERENCES.books.map((book, i) => (
                  <div key={i} className="p-3 rounded-lg bg-muted/20 border border-border/20">
                    <h5 className="font-bold text-xs text-foreground mb-1">{book.title}</h5>
                    <p className="text-[10px] text-muted-foreground mb-2">{book.author}</p>
                    <p className="text-[10px] text-muted-foreground">
                      <span className="font-medium">Foco:</span> {book.focus}
                    </p>
                    <p className="text-[9px] italic text-primary mt-1">{book.relevance}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Websites */}
            <div>
              <h4 className="font-bold text-sm mb-3" style={{ color: OPS_ACCENT }}>Websites & Recursos</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {MENTAL_MODELS_REFERENCES.websites.map((site, i) => (
                  <a
                    key={i}
                    href={site.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-lg bg-muted/20 border border-border/40 hover:border-border/60 transition-colors group"
                  >
                    <div className="flex items-start justify-between mb-1">
                      <h5 className="font-bold text-sm text-foreground group-hover:text-primary transition-colors">
                        {site.name}
                      </h5>
                      <Icon name="link" size="size-3.5" className="text-muted-foreground" />
                    </div>
                    <p className="text-[10px] text-muted-foreground">{site.focus}</p>
                  </a>
                ))}
              </div>
            </div>

            {/* Key Thinkers */}
            <div>
              <h4 className="font-bold text-sm mb-3" style={{ color: OPS_ACCENT }}>Pensadores Influentes</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {MENTAL_MODELS_REFERENCES.key_thinkers.map((thinker, i) => (
                  <div key={i} className="p-3 rounded-lg bg-muted/20 border-l-4" style={{ borderColor: OPS_PRIMARY }}>
                    <h5 className="font-bold text-xs text-foreground mb-1">{thinker.name}</h5>
                    <p className="text-[10px] text-muted-foreground mb-1">
                      <span className="font-medium">Especialidade:</span> {thinker.specialty}
                    </p>
                    <p className="text-[9px] italic text-primary">
                      <span className="font-medium">Modelo:</span> {thinker.model}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </OpsCardContent>
      </OpsCard>

      {/* Creation Process & Rules */}
      <OpsCard>
        <OpsCardHeader title="Processo de Criação & Regras" accentColor="text-muted-foreground" />
        <OpsCardContent>
          <div className="space-y-4">
            {/* Creation Process */}
            <div>
              <h4 className="font-bold text-sm mb-3" style={{ color: OPS_ACCENT }}>
                Processo de Criação
              </h4>
              <div className="space-y-2">
                {[
                  { step: 1, title: 'PESQUISAR', desc: 'Fonte primária (quem criou, quando, onde publicou)' },
                  { step: 2, title: 'EXEMPLOS', desc: 'Coletar 3+ exemplos práticos de aplicação real' },
                  { step: 3, title: 'CRÍTICAS', desc: 'Pesquisar erros comuns, limitações e controversias' },
                  { step: 4, title: 'VALIDAR', desc: 'Preencher todos os 18 campos obrigatórios' },
                  { step: 5, title: 'JSON', desc: 'Gerar JSON válido e passar no checklist de qualidade' }
                ].map((item, i) => (
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
                Regras Críticas
              </h4>
              <div className="space-y-2 text-xs">
                <div className="p-2 rounded bg-red-500/10 border-l-2 border-red-500">
                  <span className="font-mono font-bold text-red-600">ai_instructions</span>
                  <span className="text-muted-foreground ml-1">DEVE ser STRING, não objeto</span>
                </div>
                <div className="p-2 rounded bg-red-500/10 border-l-2 border-red-500">
                  <span className="font-mono font-bold text-red-600">year_originated</span>
                  <span className="text-muted-foreground ml-1">Verificado com 2+ fontes (não suposições)</span>
                </div>
                <div className="p-2 rounded bg-yellow-500/10 border-l-2 border-yellow-500">
                  <span className="font-mono font-bold text-yellow-600">examples</span>
                  <span className="text-muted-foreground ml-1">Mínimo 3 com context/application/insight</span>
                </div>
                <div className="p-2 rounded bg-yellow-500/10 border-l-2 border-yellow-500">
                  <span className="font-mono font-bold text-yellow-600">discovery_questions</span>
                  <span className="text-muted-foreground ml-1">3-5 em PT-BR (não em inglês)</span>
                </div>
                <div className="p-2 rounded bg-blue-500/10 border-l-2 border-blue-500">
                  <span className="font-mono font-bold text-blue-600">complementary_models</span>
                  <span className="text-muted-foreground ml-1">Slugs válidos existentes no sistema</span>
                </div>
              </div>
            </div>

            {/* Quality Checklist */}
            <div className="border-t border-border/20 pt-4">
              <h4 className="font-bold text-sm mb-3" style={{ color: OPS_ACCENT }}>
                Checklist de Qualidade (pre-commit)
              </h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {[
                  '✓ Slug único (não existe)',
                  '✓ year_originated verificado',
                  '✓ origin_author verificado',
                  '✓ 3+ exemplos completos',
                  '✓ 3+ common_mistakes',
                  '✓ 3-5 discovery_questions PT',
                  '✓ ai_instructions é STRING',
                  '✓ complementary_models válidos',
                  '✓ JSON válido (sem syntax)',
                  '✓ quality_score calculado'
                ].map((item, i) => (
                  <div key={i} className="p-2 rounded bg-muted/20 text-muted-foreground">
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Storage Info */}
            <div className="border-t border-border/20 pt-4 p-3 rounded-lg bg-muted/20">
              <p className="text-xs text-muted-foreground">
                <span className="font-bold text-foreground">Armazenamento:</span> Mental Models são salvos na tabela{' '}
                <span className="font-mono text-primary">tools</span> com{' '}
                <span className="font-mono text-primary">tool_type = "mental_model"</span> e dados estruturados em{' '}
                <span className="font-mono text-primary">tool_schema (JSONB)</span>
              </p>
            </div>
          </div>
        </OpsCardContent>
      </OpsCard>

      {/* Practical Application */}
      <OpsCard>
        <OpsCardHeader title="Aplicação Prática" accentColor="text-muted-foreground" />
        <OpsCardContent>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
              <h4 className="font-bold text-sm text-blue-600 mb-2">Exemplo: Decisão de Carreira</h4>
              <div className="space-y-2 text-xs text-muted-foreground">
                <p>
                  <span className="font-medium text-foreground">1. Mapa vs Território:</span> A descrição
                  do trabalho não é o trabalho real. Converse com pessoas que fazem.
                </p>
                <p>
                  <span className="font-medium text-foreground">2. Círculo de Competência:</span> Você é
                  bom nessa área? Ser honesto reduz riscos.
                </p>
                <p>
                  <span className="font-medium text-foreground">3. Trade-offs:</span> Salário maior significa
                  menos tempo livre? Qual é o preço real?
                </p>
                <p>
                  <span className="font-medium text-foreground">4. Incentivos:</span> O que motiva essa
                  empresa? Seus incentivos alinham com os deles?
                </p>
                <p>
                  <span className="font-medium text-foreground">5. Margem de Segurança:</span> Você tem
                  poupança para arriscar? Qual é seu pior cenário?
                </p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
              <h4 className="font-bold text-sm text-green-600 mb-2">Exemplo: Entender Mercados</h4>
              <div className="space-y-2 text-xs text-muted-foreground">
                <p>
                  <span className="font-medium text-foreground">1. Oferta & Demanda:</span> Produto novo
                  com alta demanda = preços altos no início.
                </p>
                <p>
                  <span className="font-medium text-foreground">2. Pensamento de Primeiros Princípios:</span>
                  Por que as pessoas realmente querem isso? O que é a necessidade fundamental?
                </p>
                <p>
                  <span className="font-medium text-foreground">3. Loops de Feedback:</span> Mais users
                  criam mais valor (rede) = crescimento exponencial.
                </p>
              </div>
            </div>
          </div>
        </OpsCardContent>
      </OpsCard>

      {/* References */}
      <OpsCard>
        <OpsCardHeader title="Referências & Aprofundamento" accentColor="text-muted-foreground" />
        <OpsCardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <a
              href="https://fs.blog/mental-models/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-lg bg-muted/20 border border-border/40 hover:border-border/60 transition-colors group"
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-bold text-sm text-foreground group-hover:text-primary transition-colors">
                  Farnam Street
                </h4>
                <Icon name="link" size="size-3.5" className="text-muted-foreground" />
              </div>
              <p className="text-xs text-muted-foreground">
                Biblioteca abrangente de modelos mentais organizados por disciplina. Inclui
                explicações detalhadas e exemplos práticos.
              </p>
            </a>

            <a
              href="https://nesslabs.com/mental-models"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-lg bg-muted/20 border border-border/40 hover:border-border/60 transition-colors group"
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-bold text-sm text-foreground group-hover:text-primary transition-colors">
                  Ness Labs
                </h4>
                <Icon name="link" size="size-3.5" className="text-muted-foreground" />
              </div>
              <p className="text-xs text-muted-foreground">
                Exploração profunda de como modelos mentais funcionam, com foco em pensamento
                crítico e tomada de decisão.
              </p>
            </a>
          </div>
        </OpsCardContent>
      </OpsCard>
    </OpsPage>
  );
};

export default MentalModelsSection;

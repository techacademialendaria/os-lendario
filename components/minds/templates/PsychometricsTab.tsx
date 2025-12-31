import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Icon } from '../../ui/icon';
import { Badge } from '../../ui/badge';
import { PsychometricData } from '../../../hooks/useMindPsychometrics';
import RadarChart from '../ui/RadarChart';
import { getDiscTheme } from '../../../utils/psychometrics';

interface PsychometricsTabProps {
  psychometrics: PsychometricData | null;
  loading: boolean;
}

export const PsychometricsTab: React.FC<PsychometricsTabProps> = ({ psychometrics, loading }) => {
  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!psychometrics) {
    return (
      <div className="py-12 text-center text-muted-foreground">
        <Icon name="chart-pie" size="size-12" className="mx-auto mb-4 opacity-50" />
        <p>Dados psicométricos não disponíveis para esta mente.</p>
        <p className="mt-2 text-xs opacity-50">
          Execute o import de perfis psicométricos para popular os dados.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Row 1: Archetypes + Big Five Radar */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Archetypes Card */}
        <Card className="rounded-xl border-border bg-gradient-to-br from-card to-primary/5">
          <CardHeader className="border-b border-border pb-3">
            <CardTitle className="flex items-center gap-2 text-base uppercase tracking-widest text-muted-foreground">
              <Icon name="fingerprint" className="text-primary" /> Arquétipos Psicológicos
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-2 gap-6">
              {/* MBTI */}
              {psychometrics.mbtiType && (
                <div className="space-y-2">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    MBTI
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge
                      variant="outline"
                      className="border-blue-600/30 px-3 py-1 font-mono text-2xl font-bold text-blue-500"
                    >
                      {psychometrics.mbtiType}
                    </Badge>
                    {psychometrics.mbtiRole && (
                      <div className="text-sm text-muted-foreground">{psychometrics.mbtiRole}</div>
                    )}
                  </div>
                  {psychometrics.mbtiStack.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {psychometrics.mbtiStack.map((fn, i) => (
                        <span
                          key={i}
                          className="rounded bg-blue-600/10 px-1.5 py-0.5 font-mono text-[10px] text-blue-500"
                        >
                          {fn}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Enneagram */}
              {psychometrics.enneagramType && (
                <div className="space-y-2">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    Eneagrama
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge
                      variant="outline"
                      className="border-blue-500/30 px-3 py-1 font-mono text-2xl font-bold text-blue-400"
                    >
                      {psychometrics.enneagramWing || psychometrics.enneagramType}
                    </Badge>
                    {psychometrics.enneagramTriad && (
                      <div className="text-sm text-muted-foreground">
                        {psychometrics.enneagramTriad} Triad
                      </div>
                    )}
                  </div>
                  {psychometrics.enneagramVariant && (
                    <div className="mt-2 text-xs text-muted-foreground">
                      Variante:{' '}
                      <span className="font-mono text-foreground">
                        {psychometrics.enneagramVariant}
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* DISC */}
              {psychometrics.discPattern && (
                <div className="space-y-2">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    DISC
                  </div>
                  <div className="flex flex-col gap-1">
                    <Badge
                      variant="outline"
                      className={`w-fit px-3 py-1 font-mono text-2xl font-bold ${getDiscTheme(psychometrics.discPattern).border} ${getDiscTheme(psychometrics.discPattern).color}`}
                    >
                      {psychometrics.discPattern}
                    </Badge>
                    {psychometrics.disc?.patternName && (
                      <span className="text-xs text-muted-foreground">
                        {psychometrics.disc.patternName}
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Cognitive Stratum */}
              {psychometrics.cognitiveStratum && (
                <div className="space-y-2">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    Estrato Cognitivo
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge
                      variant="outline"
                      className="border-studio-primary/30 px-3 py-1 font-mono text-2xl font-bold text-studio-primary"
                    >
                      {psychometrics.cognitiveStratum}
                    </Badge>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Big Five Radar */}
        {psychometrics.bigFive && (
          <Card className="bg-studio-card rounded-xl border-border">
            <CardHeader className="border-b border-border pb-3">
              <CardTitle className="flex items-center gap-2 text-base uppercase tracking-widest text-muted-foreground">
                <Icon name="chart-histogram" className="text-indigo-400" /> Big Five (OCEAN)
              </CardTitle>
            </CardHeader>
            <CardContent className="flex min-h-[280px] items-center justify-center pt-6">
              <RadarChart
                data={[
                  { skillName: 'Abertura', level: psychometrics.bigFive.openness / 10 },
                  { skillName: 'Consc.', level: psychometrics.bigFive.conscientiousness / 10 },
                  { skillName: 'Extrov.', level: psychometrics.bigFive.extraversion / 10 },
                  { skillName: 'Amabil.', level: psychometrics.bigFive.agreeableness / 10 },
                  { skillName: 'Neurot.', level: psychometrics.bigFive.neuroticism / 10 },
                ]}
                size={240}
                colors={{
                  stroke: '#6366f1',
                  fill: 'rgba(99, 102, 241, 0.2)',
                  text: 'fill-zinc-400',
                  grid: 'rgba(255,255,255,0.05)',
                }}
              />
            </CardContent>
          </Card>
        )}
      </div>

      {/* Row 2: DISC Bars */}
      {psychometrics.disc && (
        <Card className="bg-studio-card rounded-xl border-border">
          <CardHeader className="border-b border-border pb-3">
            <CardTitle className="flex items-center gap-2 text-base uppercase tracking-widest text-muted-foreground">
              <Icon name="chart-pie" className="text-white" /> DISC - Comportamento Observável
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
              {[
                {
                  label: 'Dominância (D)',
                  value: psychometrics.disc.d,
                  color: 'bg-red-500',
                  textColor: 'text-red-400',
                },
                {
                  label: 'Influência (I)',
                  value: psychometrics.disc.i,
                  color: 'bg-yellow-500',
                  textColor: 'text-yellow-400',
                },
                {
                  label: 'Estabilidade (S)',
                  value: psychometrics.disc.s,
                  color: 'bg-emerald-500',
                  textColor: 'text-emerald-400',
                },
                {
                  label: 'Conformidade (C)',
                  value: psychometrics.disc.c,
                  color: 'bg-blue-500',
                  textColor: 'text-blue-400',
                },
              ].map((metric, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className={`font-medium ${metric.textColor}`}>{metric.label}</span>
                    <span className="font-mono font-bold text-white">{metric.value}%</span>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full bg-white/5">
                    <div
                      className={`h-full rounded-full ${metric.color} transition-all duration-500`}
                      style={{ width: `${metric.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            {/* DISC Specific Behaviors */}
            {psychometrics.disc.specificBehaviors &&
              psychometrics.disc.specificBehaviors.length > 0 && (
                <div className="mt-6 border-t border-white/5 pt-6">
                  <div className="mb-3 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    Comportamentos Específicos
                  </div>
                  <ul className="space-y-2">
                    {psychometrics.disc.specificBehaviors.slice(0, 5).map((behavior, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <div className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                        <span>{behavior}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
          </CardContent>
        </Card>
      )}

      {/* Row 3: Big Five Details + Superpowers */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Big Five Details */}
        {psychometrics.bigFive && (
          <Card className="rounded-xl border-border">
            <CardHeader className="border-b border-border pb-3">
              <CardTitle className="flex items-center gap-2 text-base uppercase tracking-widest text-muted-foreground">
                <Icon name="chart-histogram" /> Big Five - Detalhamento
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              {[
                {
                  label: 'Abertura (Openness)',
                  value: psychometrics.bigFive.openness,
                  color: 'bg-blue-600',
                  desc: 'Curiosidade, criatividade, abertura a novas experiências',
                },
                {
                  label: 'Conscienciosidade',
                  value: psychometrics.bigFive.conscientiousness,
                  color: 'bg-blue-500',
                  desc: 'Organização, disciplina, orientação a metas',
                },
                {
                  label: 'Extroversão',
                  value: psychometrics.bigFive.extraversion,
                  color: 'bg-yellow-500',
                  desc: 'Sociabilidade, energia, assertividade',
                },
                {
                  label: 'Agradabilidade',
                  value: psychometrics.bigFive.agreeableness,
                  color: 'bg-green-500',
                  desc: 'Cooperação, empatia, confiança',
                },
                {
                  label: 'Neuroticismo',
                  value: psychometrics.bigFive.neuroticism,
                  color: 'bg-red-500',
                  desc: 'Sensibilidade emocional, ansiedade, reatividade',
                },
              ].map((trait, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{trait.label}</span>
                    <span className="font-mono font-bold">{trait.value}/100</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-muted/30">
                    <div
                      className={`h-full rounded-full ${trait.color}`}
                      style={{ width: `${trait.value}%` }}
                    />
                  </div>
                  <p className="text-[10px] text-muted-foreground">{trait.desc}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Superpowers & Kryptonite */}
        <div className="space-y-6">
          {/* Superpowers */}
          {psychometrics.superpowers.length > 0 && (
            <Card className="rounded-xl border-border bg-gradient-to-br from-card to-studio-primary/5">
              <CardHeader className="border-b border-border pb-3">
                <CardTitle className="flex items-center gap-2 text-base uppercase tracking-widest text-studio-primary">
                  <Icon name="bolt" /> Superpoderes
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-3">
                  {psychometrics.superpowers.map((power, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-studio-primary/20">
                        <span className="text-xs font-bold text-studio-primary">{i + 1}</span>
                      </div>
                      <span className="text-sm font-medium">{power}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Kryptonite */}
          {psychometrics.kryptonite.length > 0 && (
            <Card className="rounded-xl border-red-500/20 bg-red-500/5">
              <CardHeader className="border-b border-red-500/10 pb-3">
                <CardTitle className="flex items-center gap-2 text-base uppercase tracking-widest text-red-400">
                  <Icon name="shield" /> Kryptonita
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <ul className="space-y-2">
                  {psychometrics.kryptonite.map((k, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <div className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-red-500" />
                      <span>{k}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Enneagram Details */}
          {psychometrics.enneagramDetails &&
            (psychometrics.enneagramDetails.coreFear ||
              psychometrics.enneagramDetails.coreDesire) && (
              <Card className="rounded-xl border-primary/20 bg-primary/5">
                <CardHeader className="border-b border-primary/10 pb-3">
                  <CardTitle className="flex items-center gap-2 text-base uppercase tracking-widest text-primary">
                    <Icon name="target" /> Motivação Central
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 pt-4">
                  {psychometrics.enneagramDetails.coreDesire && (
                    <div>
                      <div className="mb-1 text-[10px] font-bold uppercase tracking-widest text-green-400">
                        Desejo Central
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {psychometrics.enneagramDetails.coreDesire}
                      </p>
                    </div>
                  )}
                  {psychometrics.enneagramDetails.coreFear && (
                    <div>
                      <div className="mb-1 text-[10px] font-bold uppercase tracking-widest text-red-400">
                        Medo Central
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {psychometrics.enneagramDetails.coreFear}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
        </div>
      </div>

      {/* Row 4: Dark Triad (if available) */}
      {psychometrics.darkTriad &&
        (psychometrics.darkTriad.narcissism > 0 ||
          psychometrics.darkTriad.machiavellianism > 0 ||
          psychometrics.darkTriad.psychopathy > 0) && (
          <Card className="rounded-xl border-red-500/10 bg-red-500/5">
            <CardHeader className="border-b border-red-500/10 pb-3">
              <CardTitle className="flex items-center gap-2 text-base uppercase tracking-widest text-red-400">
                <Icon name="shield" /> Dark Triad Profile
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                {[
                  {
                    label: 'Narcisismo',
                    value: psychometrics.darkTriad.narcissism,
                    desc: 'Grandiosidade, necessidade de admiração',
                  },
                  {
                    label: 'Maquiavelismo',
                    value: psychometrics.darkTriad.machiavellianism,
                    desc: 'Manipulação estratégica, pragmatismo frio',
                  },
                  {
                    label: 'Psicopatia',
                    value: psychometrics.darkTriad.psychopathy,
                    desc: 'Baixa empatia, impulsividade, frieza',
                  },
                ].map((trait, i) => (
                  <div key={i} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-red-400">{trait.label}</span>
                      <span className="font-mono text-lg font-bold text-white">
                        {trait.value}/7
                      </span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-red-500/10">
                      <div
                        className="h-full rounded-full bg-red-500/50"
                        style={{ width: `${(trait.value / 7) * 100}%` }}
                      />
                    </div>
                    <p className="text-[10px] text-red-400/70">{trait.desc}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

      {/* Row 5: Convergence Analysis */}
      {psychometrics.convergence &&
        (psychometrics.convergence.powerfulAlignments?.length ||
          psychometrics.convergence.productiveTensions?.length) && (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Powerful Alignments */}
            {psychometrics.convergence.powerfulAlignments &&
              psychometrics.convergence.powerfulAlignments.length > 0 && (
                <Card className="rounded-xl border-border">
                  <CardHeader className="border-b border-border pb-3">
                    <CardTitle className="flex items-center gap-2 text-base uppercase tracking-widest text-green-400">
                      <Icon name="link" /> Alinhamentos Poderosos
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <ul className="space-y-3">
                      {psychometrics.convergence.powerfulAlignments.map((alignment, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-sm text-muted-foreground"
                        >
                          <div className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-green-500" />
                          <span>{alignment}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

            {/* Productive Tensions */}
            {psychometrics.convergence.productiveTensions &&
              psychometrics.convergence.productiveTensions.length > 0 && (
                <Card className="rounded-xl border-border">
                  <CardHeader className="border-b border-border pb-3">
                    <CardTitle className="flex items-center gap-2 text-base uppercase tracking-widest text-amber-400">
                      <Icon name="link" /> Tensões Produtivas
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <ul className="space-y-3">
                      {psychometrics.convergence.productiveTensions.map((tension, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-sm text-muted-foreground"
                        >
                          <div className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                          <span>{tension}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}
          </div>
        )}

      {/* Metadata Footer */}
      {(psychometrics.analysisDate || psychometrics.confidence) && (
        <div className="border-t border-border pt-4 text-center text-[10px] text-muted-foreground/50">
          {psychometrics.analysisDate && <span>Análise: {psychometrics.analysisDate}</span>}
          {psychometrics.analysisDate && psychometrics.confidence && (
            <span className="mx-2">•</span>
          )}
          {psychometrics.confidence && <span>Confiança: {psychometrics.confidence}</span>}
        </div>
      )}
    </div>
  );
};

export default PsychometricsTab;

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Icon } from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ToneBar } from '../molecules';
import type { OverviewSectionProps, PunctuationItem, BehavioralTrait, RhetoricalDevice } from '../types';

/**
 * OverviewSection - Main overview of writing style DNA
 *
 * Displays:
 * - Voice DNA metrics (ToneBars)
 * - Power words and punctuation signature
 * - Operational mode/archetype
 * - Behavioral OS traits
 * - Rhetorical arsenal
 */
export const OverviewSection: React.FC<OverviewSectionProps> = ({
  profile,
  onNavigateToSemantics,
}) => {
  const behavioralOS = profile.behavioralOS || { traits: [] };
  const linguistics = profile.linguistics || { punctuation: [], antiPatterns: [] };
  const psycho = profile.psycholinguistics || { traits: [], archetype: 'Desconhecido' };
  const arsenal = profile.rhetoricalArsenal || [];

  return (
    <div className="animate-fade-in space-y-8">
      {/* HERO: ARCHETYPE & DNA */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <Card className="bg-studio-card border-white/10 lg:col-span-8">
          <CardHeader className="border-b border-white/5 pb-4">
            <CardTitle className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-zinc-400">
              <Icon name="chart-line" className="text-brand-cyan" /> DNA Cirurgico
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-8 p-8 md:grid-cols-2">
            <div className="space-y-6">
              <ToneBar
                label="Nivel de Provocacao"
                value={profile.voiceDNA.provocationActivity || 85}
                leftLabel="Conforto"
                rightLabel="Crise"
                color="red"
              />
              <ToneBar
                label="Temperatura da Verdade"
                value={profile.voiceDNA.truthTemperature || 95}
                leftLabel="Aconselhamento"
                rightLabel="Humilhacao"
              />
              <ToneBar
                label="Validar vs. Desafiar"
                value={profile.voiceDNA.validationVsChallenge || 30}
                leftLabel="Validar"
                rightLabel="Desafiar"
              />
              <ToneBar
                label="Densidade"
                value={profile.voiceDNA.density || 40}
                leftLabel="Conciso"
                rightLabel="Detalhado"
              />
            </div>
            <div className="space-y-6">
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">
                    Power Words
                  </span>
                  <Button
                    variant="link"
                    className="h-auto p-0 text-[10px] text-studio-primary"
                    onClick={onNavigateToSemantics}
                  >
                    Ver Arsenal &rarr;
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {profile.voiceDNA.keywords.slice(0, 6).map((kw: string, i: number) => (
                    <Badge
                      key={i}
                      variant="secondary"
                      className="border-zinc-700 bg-zinc-800 text-zinc-300 transition-colors hover:text-white"
                    >
                      {kw}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Punctuation Signature */}
              <div>
                <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-zinc-500">
                  Assinatura de Pontuacao
                </span>
                <div className="flex gap-3">
                  {linguistics.punctuation?.map((p: PunctuationItem, i: number) => (
                    <div key={i} className="group relative flex cursor-help items-center gap-2">
                      <Badge
                        variant="outline"
                        className="flex h-8 w-8 items-center justify-center border-studio-primary/20 bg-studio-primary/5 font-mono text-lg text-studio-primary"
                      >
                        {p.char}
                      </Badge>
                      <div className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 hidden w-48 -translate-x-1/2 rounded border border-white/20 bg-black p-2 text-center text-xs text-zinc-300 shadow-xl group-hover:block">
                        {p.desc}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="relative flex flex-col items-center justify-center overflow-hidden border-studio-primary/20 bg-gradient-to-br from-[#0a0a0a] to-studio-primary/10 p-6 text-center lg:col-span-4">
          <div className="absolute right-0 top-0 p-3">
            <Badge
              variant="outline"
              className="border-studio-primary/30 bg-studio-primary/5 text-[10px] font-bold uppercase tracking-wider text-studio-primary"
            >
              {psycho.rule || 'Verdade > Empatia'}
            </Badge>
          </div>
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-studio-primary/20 text-studio-primary ring-4 ring-studio-primary/5">
            <Icon name="cpu" size="size-8" />
          </div>
          <h3 className="mb-2 text-xs font-bold uppercase tracking-widest text-zinc-500">
            Modo Operacional
          </h3>
          <h2 className="glow-text-gold text-xl font-black text-white">
            {behavioralOS.archetype || 'Instalacao de SO Mental'}
          </h2>
          <p className="mt-2 font-serif text-xs italic text-zinc-400">"{behavioralOS.role}"</p>
        </Card>
      </div>

      {/* SECTION: BEHAVIORAL OS */}
      <div>
        <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-white">
          <Icon name="graph-up" className="text-blue-400" /> Sistema Operacional Comportamental
        </h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {behavioralOS.traits?.map((trait: BehavioralTrait, i: number) => (
            <Card
              key={i}
              className={cn(
                'bg-studio-card group border-white/5 transition-colors hover:bg-white/[0.02]',
                trait.color ? 'border-red-500/20' : ''
              )}
            >
              <CardHeader className="p-4 pb-2">
                <div className="mb-2 flex items-start justify-between">
                  <Icon
                    name={trait.icon as any}
                    className={cn('text-zinc-500', trait.color || 'group-hover:text-blue-400')}
                    size="size-5"
                  />
                  <Badge
                    variant="outline"
                    className={cn(
                      'text-[9px]',
                      trait.color
                        ? 'border-red-500/30 text-red-500'
                        : 'border-white/10 text-zinc-500'
                    )}
                  >
                    {trait.value}
                  </Badge>
                </div>
                <CardTitle className="text-sm font-bold text-zinc-200">{trait.name}</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className="text-xs leading-snug text-zinc-500">{trait.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* SECTION: THE ARSENAL (Rhetorical Devices) */}
      <div>
        <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-white">
          <Icon name="flash" className="text-red-400" /> Arsenal Retorico
        </h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {arsenal.map((item: RhetoricalDevice, i: number) => (
            <Card
              key={i}
              className="bg-studio-card group relative overflow-hidden border-white/5 transition-colors hover:bg-white/[0.02]"
            >
              <div className="absolute right-0 top-0 p-2 opacity-50 transition-opacity group-hover:opacity-100">
                <Badge variant="outline" className="border-white/10 text-[9px] text-zinc-500">
                  {item.frequency}
                </Badge>
              </div>
              <CardContent className="space-y-3 p-5 pt-8">
                <h4 className="text-sm font-bold text-white">{item.name}</h4>
                <p className="min-h-[40px] text-xs leading-relaxed text-zinc-500">{item.desc}</p>
                <div className="rounded border border-l-2 border-white/5 border-l-red-500/50 bg-zinc-900/50 p-2 font-serif text-xs italic text-zinc-300">
                  "{item.example}"
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

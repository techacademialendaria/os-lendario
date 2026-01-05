import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Icon } from '@/components/ui/icon';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { ExamplesSectionProps, WriteChannel, BlueprintPhase, AnalysisItem } from '../types';
import { WRITE_CHANNELS } from '../types';

/**
 * ExamplesSection - Reverse engineering of real content pieces
 *
 * Displays:
 * - Channel tabs (Twitter, LinkedIn, Newsletter, WhatsApp)
 * - Structural blueprint timeline
 * - Content piece visualization
 * - Tactical analysis breakdown
 */
export const ExamplesSection: React.FC<ExamplesSectionProps> = ({
  writingSamples,
  activeChannel,
  onChannelChange,
}) => {
  const currentSample = writingSamples[activeChannel];
  const blueprint = currentSample?.blueprint || [];

  return (
    <div className="animate-fade-in space-y-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="flex items-center gap-3 text-2xl font-bold text-white">
            <Icon name="pencil" className="text-studio-primary" /> Engenharia Reversa
          </h3>
          <p className="mt-1 text-zinc-500">Dissecacao tatica de pecas de conteudo reais.</p>
        </div>
      </div>

      <Tabs value={activeChannel} onValueChange={(v) => onChannelChange(v as WriteChannel)} className="w-full">
        <div className="mb-6 border-b border-white/10">
          <TabsList className="h-auto w-full flex-wrap justify-start gap-4 bg-transparent p-0">
            {WRITE_CHANNELS.map((ch) => (
              <TabsTrigger
                key={ch}
                value={ch}
                className="rounded-none border-b-2 border-transparent px-1 pb-2 capitalize text-zinc-500 hover:text-white data-[state=active]:border-brand-cyan data-[state=active]:text-brand-cyan"
              >
                {ch === 'twitter' ? 'X (Twitter)' : ch}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {/* TIMELINE BLUEPRINT */}
        {blueprint.length > 0 && (
          <div className="mb-8">
            <h4 className="mb-3 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
              Blueprint Estrutural
            </h4>
            <div className="flex h-20 w-full gap-1 overflow-hidden rounded-lg border border-white/10">
              {blueprint.map((phase: BlueprintPhase, i: number) => (
                <div
                  key={i}
                  className="group relative flex flex-1 flex-col items-center justify-center border-r border-black/50 bg-zinc-900 p-3 text-center transition-colors last:border-0 hover:bg-zinc-800"
                >
                  <div className="mb-1 flex h-5 w-5 items-center justify-center rounded-full border border-white/5 bg-white/5 text-[10px] font-bold text-white/50">
                    {i + 1}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 group-hover:text-white">
                    {phase.phase.split('(')[0]}
                  </span>
                  <div className="pointer-events-none absolute left-1/2 top-full z-20 mt-2 hidden w-48 -translate-x-1/2 rounded border border-white/20 bg-black p-2 text-xs text-zinc-300 shadow-xl group-hover:block">
                    {phase.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Content Area */}
        <div className="grid min-h-[400px] grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Left: The Example (Visual) */}
          <div className="relative">
            <div className="absolute -top-3 left-4 z-10 bg-black px-2 text-xs font-bold uppercase tracking-wider text-zinc-500">
              Peca de Conteudo
            </div>
            <div className="relative flex min-h-[400px] flex-col justify-center overflow-hidden rounded-xl border border-white/10 bg-zinc-900/50 p-8">
              <div className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-zinc-200">
                {activeChannel === 'whatsapp' && (
                  <p className="mb-2 text-xs italic text-zinc-500">Audio Transcript:</p>
                )}
                {currentSample?.content}
              </div>
            </div>
          </div>

          {/* Right: The Breakdown (Analytical) */}
          <div className="space-y-6">
            <Card className="bg-studio-card h-full border-white/10">
              <CardHeader>
                <CardTitle className="flex justify-between text-base font-bold text-white">
                  <span>Taticas Identificadas</span>
                  <Badge variant="outline" className="border-studio-primary/30 text-studio-primary">
                    {currentSample?.framework}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {currentSample?.analysis.map((item: AnalysisItem, i: number) => (
                  <div
                    key={i}
                    className="group flex gap-4 rounded-lg border border-transparent p-3 transition-colors hover:border-white/5 hover:bg-white/5"
                  >
                    <div className="mt-1">
                      <Badge className="min-w-[100px] justify-center bg-zinc-800 text-[10px] font-bold uppercase tracking-wider text-zinc-300 group-hover:bg-brand-cyan/20 group-hover:text-brand-cyan">
                        {item.type}
                      </Badge>
                    </div>
                    <div>
                      <p className="font-mono text-sm text-xs leading-relaxed text-zinc-300">
                        {item.text}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </Tabs>
    </div>
  );
};

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Icon } from '../../ui/icon';
import { cn } from '../../../lib/utils';
import { Button } from '../../ui/button';
import { Tabs, TabsList, TabsTrigger } from '../../ui/tabs';
import { Avatar, AvatarImage } from '../../ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table';

interface WritingStylesTabProps {
  profile: any;
}

const ToneBar = ({
  label,
  value,
  leftLabel,
  rightLabel,
  color = 'studio-primary',
}: {
  label: string;
  value: number;
  leftLabel: string;
  rightLabel: string;
  color?: string;
}) => (
  <div className="space-y-1">
    <div className="flex justify-between text-[10px] font-bold uppercase text-zinc-500">
      <span>{leftLabel}</span>
      <span className="text-white">{label}</span>
      <span>{rightLabel}</span>
    </div>
    <div className="relative h-2 overflow-hidden rounded-full bg-zinc-800">
      <div
        className={cn(
          'absolute bottom-0 top-0 h-full w-2 rounded-full shadow-[0_0_10px_currentColor]',
          color === 'red' ? 'bg-red-500 text-red-500' : 'bg-studio-primary text-white'
        )}
        style={{ left: `${value}%` }}
      ></div>
      <div
        className={cn(
          'h-full w-full bg-gradient-to-r from-transparent to-transparent opacity-50',
          color === 'red' ? 'via-red-500/20' : 'via-studio-primary/20'
        )}
        style={{ transform: `translateX(${value - 50}%)` }}
      ></div>
    </div>
  </div>
);

type SidebarSection = 'overview' | 'semantics' | 'examples' | 'catchphrases' | 'prompts';

export const WritingStylesTab: React.FC<WritingStylesTabProps> = ({ profile }) => {
  const [activeSection, setActiveSection] = useState<SidebarSection>('overview');
  const [writeChannel, setWriteChannel] = useState('twitter');

  const psycho = profile.psycholinguistics || { traits: [], archetype: 'Desconhecido' };
  const arsenal = profile.rhetoricalArsenal || [];
  const contextMatrix = profile.contextualMatrix || [];
  const systemPrompts = profile.systemPrompts || [];
  const catchphrases = profile.catchphrases || [];
  const semantics = profile.semantics || { tier1: {}, tier2: {}, tier3: {} };
  const behavioralOS = profile.behavioralOS || { traits: [] };
  const linguistics = profile.linguistics || { punctuation: [], antiPatterns: [] };

  // --- SUB-COMPONENTS / RENDERERS ---

  const renderOverview = () => (
    <div className="animate-fade-in space-y-8">
      {/* HERO: ARCHETYPE & DNA */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <Card className="bg-studio-card border-white/10 lg:col-span-8">
          <CardHeader className="border-b border-white/5 pb-4">
            <CardTitle className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-zinc-400">
              <Icon name="chart-line" className="text-brand-cyan" /> DNA Cirúrgico
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-8 p-8 md:grid-cols-2">
            <div className="space-y-6">
              <ToneBar
                label="Nível de Provocação"
                value={profile.voiceDNA.provocationActivity || 85}
                leftLabel="Conforto"
                rightLabel="Crise"
                color="red"
              />
              <ToneBar
                label="Temperatura da Verdade"
                value={profile.voiceDNA.truthTemperature || 95}
                leftLabel="Aconselhamento"
                rightLabel="Humilhação"
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
                    onClick={() => setActiveSection('semantics')}
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
                  Assinatura de Pontuação
                </span>
                <div className="flex gap-3">
                  {linguistics.punctuation?.map((p: any, i: number) => (
                    <div key={i} className="group relative flex cursor-help items-center gap-2">
                      <Badge
                        variant="outline"
                        className="flex h-8 w-8 items-center justify-center border-studio-primary/20 bg-studio-primary/5 font-mono text-lg text-studio-primary"
                      >
                        {p.char}
                      </Badge>

                      {/* Tooltip */}
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
            {behavioralOS.archetype || 'Instalação de SO Mental'}
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
          {behavioralOS.traits?.map((trait: any, i: number) => (
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
          <Icon name="flash" className="text-red-400" /> Arsenal Retórico
        </h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {arsenal.map((item: any, i: number) => (
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

  const renderSemantics = () => (
    <div className="animate-fade-in space-y-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="flex items-center gap-3 text-2xl font-bold text-white">
            <Icon name="book-open-cover" className="text-studio-primary" /> Campo Semântico
          </h3>
          <p className="mt-1 text-zinc-500">
            O vocabulário cirúrgico dividido por intenção de impacto.
          </p>
        </div>
      </div>

      {/* 3 COLUMNS OF POWER WORDS */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* TIER 1: MANTRAS */}
        <Card className="bg-studio-card border-studio-primary/20">
          <CardHeader className="border-b border-white/5 pb-3">
            <CardTitle className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-studio-primary">
              <Icon name="flash" size="size-3" /> {semantics.tier1?.label || 'Tier 1: Mantras'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 p-4">
            {semantics.tier1?.words?.map((word: string, i: number) => (
              <div
                key={i}
                className="group flex items-center gap-2 rounded p-2 text-sm text-zinc-300 transition-colors hover:bg-white/5"
              >
                <div className="h-1 w-1 rounded-full bg-studio-primary transition-transform group-hover:scale-150"></div>
                {word}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* TIER 2: MENTAL MODELS */}
        <Card className="bg-studio-card border-blue-500/20">
          <CardHeader className="border-b border-white/5 pb-3">
            <CardTitle className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-blue-400">
              <Icon name="box" size="size-3" /> {semantics.tier2?.label || 'Tier 2: Frameworks'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 p-4">
            {semantics.tier2?.words?.map((word: string, i: number) => (
              <div
                key={i}
                className="group flex items-center gap-2 rounded p-2 text-sm text-zinc-300 transition-colors hover:bg-white/5"
              >
                <div className="h-1 w-1 rounded-full bg-blue-500 transition-transform group-hover:scale-150"></div>
                {word}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* TIER 3: CONTEXTUAL */}
        <Card className="bg-studio-card border-blue-600/20">
          <CardHeader className="border-b border-white/5 pb-3">
            <CardTitle className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-blue-500">
              <Icon name="sitemap" size="size-3" />{' '}
              {semantics.tier3?.label || 'Tier 3: Contextual'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 p-4">
            {semantics.tier3?.words?.map((word: string, i: number) => (
              <div
                key={i}
                className="group flex items-center gap-2 rounded p-2 text-sm text-zinc-300 transition-colors hover:bg-white/5"
              >
                <div className="h-1 w-1 rounded-full bg-blue-600 transition-transform group-hover:scale-150"></div>
                {word}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* ANTI-PATTERNS (FORBIDDEN PHRASES) */}
      {linguistics.antiPatterns?.length > 0 && (
        <div className="mt-8">
          <h4 className="mb-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-red-500">
            <Icon name="cross-circle" size="size-3" /> Anti-Patterns (Nunca Dizer)
          </h4>
          <div className="flex flex-wrap gap-3">
            {linguistics.antiPatterns.map((phrase: string, i: number) => (
              <Badge
                key={i}
                variant="outline"
                className="strike-through border-red-900/50 bg-red-950/10 text-red-400 line-through decoration-red-500/50 decoration-1 transition-colors hover:bg-red-950/20"
              >
                "{phrase}"
              </Badge>
            ))}
          </div>
        </div>
      )}

      <Card className="bg-studio-card border-white/10">
        <CardHeader className="border-b border-white/5 pb-4">
          <CardTitle className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-zinc-400">
            <Icon name="quote" className="text-brand-cyan" /> Aplicação em Contexto
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Badge
                variant="outline"
                className="border-red-500/20 bg-red-500/10 text-[10px] text-red-500"
              >
                Antes (Passivo)
              </Badge>
            </div>
            <p className="border-l-2 border-red-500/20 pl-3 font-serif text-sm italic text-zinc-500">
              "Nossa plataforma ajuda usuários a automatizar tarefas para terem mais sucesso."
            </p>
          </div>

          <div className="flex justify-center">
            <Icon name="arrow-small-down" className="text-zinc-700" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <Badge
                  variant="outline"
                  className="border-studio-primary/20 bg-studio-primary/10 text-[10px] text-studio-primary"
                >
                  Depois (High Agency)
                </Badge>
                <Badge variant="secondary" className="bg-zinc-800 text-[9px] text-zinc-400">
                  Regra: Verdade &gt; Empatia
                </Badge>
              </div>
            </div>
            <p className="border-l-2 border-studio-primary/50 pl-3 font-serif text-sm text-zinc-200">
              "Nosso <span className="text-brand-cyan">ecossistema</span> potencializa{' '}
              <span className="text-brand-cyan">Lendários</span> com uma mentalidade{' '}
              <span className="text-brand-cyan">AI First</span> para{' '}
              <span className="text-brand-cyan">imortalizar seu legado</span>."
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderExamples = () => {
    const currentSample = profile.writingSamples[writeChannel];
    const blueprint = currentSample.blueprint || [];

    return (
      <div className="animate-fade-in space-y-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h3 className="flex items-center gap-3 text-2xl font-bold text-white">
              <Icon name="pencil" className="text-studio-primary" /> Engenharia Reversa
            </h3>
            <p className="mt-1 text-zinc-500">Dissecação tática de peças de conteúdo reais.</p>
          </div>
        </div>

        <Tabs value={writeChannel} onValueChange={setWriteChannel} className="w-full">
          <div className="mb-6 border-b border-white/10">
            <TabsList className="h-auto w-full flex-wrap justify-start gap-4 bg-transparent p-0">
              {['twitter', 'linkedin', 'newsletter', 'whatsapp'].map((ch) => (
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
                {blueprint.map((phase: any, i: number) => (
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

                    {/* Tooltip */}
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
                Peça de Conteúdo
              </div>
              <div className="relative flex min-h-[400px] flex-col justify-center overflow-hidden rounded-xl border border-white/10 bg-zinc-900/50 p-8">
                {/* Render logic simplified for brevity, assuming standard mock structure */}
                <div className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-zinc-200">
                  {writeChannel === 'whatsapp' && (
                    <p className="mb-2 text-xs italic text-zinc-500">Audio Transcript:</p>
                  )}
                  {currentSample.content}
                </div>
              </div>
            </div>

            {/* Right: The Breakdown (Analytical) */}
            <div className="space-y-6">
              <Card className="bg-studio-card h-full border-white/10">
                <CardHeader>
                  <CardTitle className="flex justify-between text-base font-bold text-white">
                    <span>Táticas Identificadas</span>
                    <Badge
                      variant="outline"
                      className="border-studio-primary/30 text-studio-primary"
                    >
                      {currentSample.framework}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {currentSample.analysis.map((item: any, i: number) => (
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

  const renderCatchphrases = () => (
    <div className="animate-fade-in space-y-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="flex items-center gap-3 text-2xl font-bold text-white">
            <Icon name="quote" className="text-studio-primary" /> Matriz de Catchphrases
          </h3>
          <p className="mt-1 text-zinc-500">
            Âncoras cognitivas para instalação de novos sistemas mentais.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {catchphrases.map((phrase: any, i: number) => (
          <Card
            key={i}
            className="bg-studio-card group relative overflow-hidden border-white/10 transition-colors hover:border-studio-primary/50"
          >
            <div className="absolute right-0 top-0 p-3 opacity-30 transition-opacity group-hover:opacity-100">
              <Icon name="quote" className="h-8 w-8 text-white/20" type="solid" />
            </div>
            <CardHeader className="pb-2">
              <Badge
                variant="outline"
                className="mb-2 w-fit border-white/10 text-[9px] uppercase tracking-widest text-zinc-500"
              >
                {phrase.tag}
              </Badge>
            </CardHeader>
            <CardContent>
              <h4 className="mb-3 font-serif text-lg font-bold leading-tight text-white">
                "{phrase.text}"
              </h4>
              <p className="text-xs text-zinc-500">{phrase.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderPrompts = () => (
    <div className="animate-fade-in space-y-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="flex items-center gap-3 text-2xl font-bold text-white">
            <Icon name="terminal" className="text-studio-primary" /> System Prompts
          </h3>
          <p className="mt-1 text-zinc-500">
            Instruções prontas para calibrar sua própria LLM com este estilo.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {systemPrompts.map((prompt: any, i: number) => (
          <Card key={i} className="bg-studio-card group border-white/10">
            <CardHeader className="border-b border-white/5 pb-4">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="mb-1 text-base font-bold text-white">
                    {prompt.title}
                  </CardTitle>
                  <p className="text-xs text-zinc-500">{prompt.desc}</p>
                </div>
                <Button
                  variant="ghost"
                  className="h-8 w-8 p-0 text-zinc-500 hover:text-studio-primary"
                >
                  <Icon name="copy" size="size-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="relative overflow-hidden bg-zinc-950/50 p-6 font-mono text-xs text-zinc-400 transition-colors group-hover:text-zinc-300">
                <div className="absolute bottom-0 left-0 top-0 w-1 bg-studio-primary/20 transition-colors group-hover:bg-studio-primary"></div>
                <p className="whitespace-pre-wrap leading-relaxed">{prompt.content}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const menuItems = [
    { id: 'overview', label: 'Visão Geral', icon: 'layout-grid' },
    { id: 'semantics', label: 'Campo Semântico', icon: 'book-alt' },
    { id: 'examples', label: 'Exemplos', icon: 'pencil' },
    { id: 'catchphrases', label: 'Catchphrases', icon: 'quote' },
    { id: 'prompts', label: 'Prompts', icon: 'terminal' },
  ];

  return (
    <div className="flex flex-col gap-8 pb-20 lg:flex-row">
      {/* SIDEBAR NAVIGATION */}
      <div className="w-full shrink-0 lg:w-[240px]">
        <div className="sticky top-4 space-y-2">
          {menuItems.map((item) => (
            <Button
              key={item.id}
              variant="ghost"
              className={cn(
                'h-10 w-full justify-start gap-3 font-normal',
                activeSection === item.id
                  ? 'bg-white/10 font-medium text-white'
                  : 'text-zinc-500 hover:text-white'
              )}
              onClick={() => setActiveSection(item.id as SidebarSection)}
            >
              <Icon name={item.icon as any} size="size-4" /> {item.label}
            </Button>
          ))}

          <div className="mt-4 border-t border-white/5 px-3 pt-4">
            <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-zinc-600">
              Qualidade
            </p>
            <div className="mb-1 flex items-center gap-2 text-xs text-zinc-500">
              <div className="h-1.5 w-1.5 rounded-full bg-green-500"></div>
              Voz Ativa
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="min-w-0 flex-1">
        {activeSection === 'overview' && renderOverview()}
        {activeSection === 'semantics' && renderSemantics()}
        {activeSection === 'examples' && renderExamples()}
        {activeSection === 'catchphrases' && renderCatchphrases()}
        {activeSection === 'prompts' && renderPrompts()}
      </div>
    </div>
  );
};

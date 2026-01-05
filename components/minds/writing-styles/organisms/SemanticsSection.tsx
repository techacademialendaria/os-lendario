import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Icon } from '@/components/ui/icon';
import type { SemanticsSectionProps } from '../types';

/**
 * SemanticsSection - Semantic field vocabulary display
 *
 * Displays:
 * - Three-tier word categories (Mantras, Frameworks, Contextual)
 * - Anti-patterns (forbidden phrases)
 * - Before/After transformation example
 */
export const SemanticsSection: React.FC<SemanticsSectionProps> = ({ semantics, antiPatterns }) => (
  <div className="animate-fade-in space-y-8">
    <div className="mb-6 flex items-center justify-between">
      <div>
        <h3 className="flex items-center gap-3 text-2xl font-bold text-white">
          <Icon name="book-open-cover" className="text-studio-primary" /> Campo Semantico
        </h3>
        <p className="mt-1 text-zinc-500">O vocabulario cirurgico dividido por intencao de impacto.</p>
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
              <div className="h-1 w-1 rounded-full bg-studio-primary transition-transform group-hover:scale-150" />
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
              <div className="h-1 w-1 rounded-full bg-blue-500 transition-transform group-hover:scale-150" />
              {word}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* TIER 3: CONTEXTUAL */}
      <Card className="bg-studio-card border-blue-600/20">
        <CardHeader className="border-b border-white/5 pb-3">
          <CardTitle className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-blue-500">
            <Icon name="sitemap" size="size-3" /> {semantics.tier3?.label || 'Tier 3: Contextual'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 p-4">
          {semantics.tier3?.words?.map((word: string, i: number) => (
            <div
              key={i}
              className="group flex items-center gap-2 rounded p-2 text-sm text-zinc-300 transition-colors hover:bg-white/5"
            >
              <div className="h-1 w-1 rounded-full bg-blue-600 transition-transform group-hover:scale-150" />
              {word}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>

    {/* ANTI-PATTERNS (FORBIDDEN PHRASES) */}
    {antiPatterns && antiPatterns.length > 0 && (
      <div className="mt-8">
        <h4 className="mb-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-red-500">
          <Icon name="cross-circle" size="size-3" /> Anti-Patterns (Nunca Dizer)
        </h4>
        <div className="flex flex-wrap gap-3">
          {antiPatterns.map((phrase: string, i: number) => (
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

    {/* TRANSFORMATION EXAMPLE */}
    <Card className="bg-studio-card border-white/10">
      <CardHeader className="border-b border-white/5 pb-4">
        <CardTitle className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-zinc-400">
          <Icon name="quote" className="text-brand-cyan" /> Aplicacao em Contexto
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
            "Nossa plataforma ajuda usuarios a automatizar tarefas para terem mais sucesso."
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
            <span className="text-brand-cyan">Lendarios</span> com uma mentalidade{' '}
            <span className="text-brand-cyan">AI First</span> para{' '}
            <span className="text-brand-cyan">imortalizar seu legado</span>."
          </p>
        </div>
      </CardContent>
    </Card>
  </div>
);

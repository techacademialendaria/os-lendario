import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Icon } from '@/components/ui/icon';
import type { CatchphrasesSectionProps } from '../types';

/**
 * CatchphrasesSection - Catchphrase matrix display
 *
 * Displays cognitive anchors for mental system installation.
 */
export const CatchphrasesSection: React.FC<CatchphrasesSectionProps> = ({ catchphrases }) => (
  <div className="animate-fade-in space-y-8">
    <div className="mb-6 flex items-center justify-between">
      <div>
        <h3 className="flex items-center gap-3 text-2xl font-bold text-white">
          <Icon name="quote" className="text-studio-primary" /> Matriz de Catchphrases
        </h3>
        <p className="mt-1 text-zinc-500">
          Ancoras cognitivas para instalacao de novos sistemas mentais.
        </p>
      </div>
    </div>

    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {catchphrases.map((phrase, i: number) => (
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

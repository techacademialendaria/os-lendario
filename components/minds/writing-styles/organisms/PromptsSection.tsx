import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import type { PromptsSectionProps } from '../types';

/**
 * PromptsSection - System prompts for LLM calibration
 *
 * Displays ready-to-use instructions for calibrating LLMs with this writing style.
 */
export const PromptsSection: React.FC<PromptsSectionProps> = ({ prompts }) => (
  <div className="animate-fade-in space-y-8">
    <div className="mb-6 flex items-center justify-between">
      <div>
        <h3 className="flex items-center gap-3 text-2xl font-bold text-white">
          <Icon name="terminal" className="text-studio-primary" /> System Prompts
        </h3>
        <p className="mt-1 text-zinc-500">
          Instrucoes prontas para calibrar sua propria LLM com este estilo.
        </p>
      </div>
    </div>

    <div className="space-y-6">
      {prompts.map((prompt, i: number) => (
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
              <div className="absolute bottom-0 left-0 top-0 w-1 bg-studio-primary/20 transition-colors group-hover:bg-studio-primary" />
              <p className="whitespace-pre-wrap leading-relaxed">{prompt.content}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

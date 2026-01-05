// Context Sidebar Component
// Shows original input and AI insights

import React from 'react';
import { Icon } from '@/components/ui/icon';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { STUDIO_TEAL } from '../types';

interface ContextSidebarProps {
  uploadContent: string;
  insights: string[];
}

export const ContextSidebar: React.FC<ContextSidebarProps> = ({
  uploadContent,
  insights
}) => (
  <aside className="space-y-6 lg:sticky lg:top-32 lg:col-span-4">
    <div className="space-y-2">
      <h2 className="text-2xl font-bold tracking-tight">Contexto & Insights</h2>
      <p className="font-serif text-sm text-muted-foreground">
        A base de informacoes que a IA usou para estruturar o brief ao lado.
      </p>
    </div>

    {/* Original Input Card */}
    <Card className="border-dashed border-border bg-muted/10">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-muted-foreground">
          <Icon name="cloud-upload" size="size-4" /> Input Original
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="font-serif text-sm italic text-foreground/80">
          "{uploadContent || 'Nenhum conteudo do upload'}"
        </p>
      </CardContent>
    </Card>

    {/* Insights Card */}
    {insights.length > 0 && (
      <Card
        className="border-[var(--studio-teal)]/20 bg-[var(--studio-teal)]/5"
        style={{ '--studio-teal': STUDIO_TEAL } as React.CSSProperties}
      >
        <CardHeader className="pb-3">
          <CardTitle
            className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider"
            style={{ color: STUDIO_TEAL }}
          >
            <Icon name="lightbulb" size="size-4" /> Insights (WOWs)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {insights.map((insight, i) => (
            <div key={i} className="flex items-start gap-3 text-sm">
              <div
                className="mt-1.5 size-1.5 shrink-0 rounded-full"
                style={{ backgroundColor: STUDIO_TEAL }}
              />
              <p className="leading-snug text-foreground/90">{insight}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    )}

    {/* Warning Tip */}
    <div className="flex gap-3 rounded-xl border border-yellow-500/20 bg-yellow-500/10 p-4 text-xs font-medium text-yellow-600">
      <Icon name="info-circle" size="size-4" className="mt-0.5 shrink-0" />
      <p>
        Lembre-se: O Brief e o contrato entre sua visao e a execucao tecnica. Seja especifico.
      </p>
    </div>
  </aside>
);

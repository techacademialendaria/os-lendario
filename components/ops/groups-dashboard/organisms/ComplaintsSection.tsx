import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../../ui/card';
import { Icon } from '../../../ui/icon';
import { SentimentBadge } from '../molecules';
import type { ComplaintsSectionProps } from '../types';

export const ComplaintsSection: React.FC<ComplaintsSectionProps> = ({ complaints }) => {
  if (complaints.length === 0) return null;

  return (
    <section className="space-y-4">
      <Card className="rounded-3xl border border-red-200 bg-red-50/30 dark:bg-red-950/20 dark:border-red-900/40 overflow-hidden shadow-sm">
        <CardHeader className="pb-4 border-b border-red-200/50 dark:border-red-900/30">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-background rounded-full text-red-500 shadow-sm">
              <Icon name="exclamation-triangle" size="size-5" />
            </div>
            <div>
              <CardTitle className="text-lg text-red-700 dark:text-red-400 font-bold">
                Reclamações em Destaque
              </CardTitle>
              <CardDescription className="text-red-600/80 dark:text-red-300/80">
                Pontos de atenção identificados pela IA nos últimos dias.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {complaints.map((comp, i) => (
            <ComplaintCard key={i} complaint={comp} />
          ))}
        </CardContent>
      </Card>
    </section>
  );
};

interface ComplaintCardProps {
  complaint: {
    data: string;
    texto: string;
    sentimento: string;
  };
}

const ComplaintCard: React.FC<ComplaintCardProps> = ({ complaint }) => (
  <div className="bg-background border border-red-100 dark:border-red-900/30 rounded-xl p-4 shadow-sm hover:shadow-md transition-all">
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground bg-muted/30 px-2 py-1 rounded">
        <Icon name="calendar" size="size-3" /> {complaint.data}
      </div>
      <SentimentBadge sentiment={complaint.sentimento} size="sm" />
    </div>
    <p className="text-sm font-serif text-foreground/90 leading-relaxed line-clamp-3">
      "{complaint.texto}"
    </p>
  </div>
);

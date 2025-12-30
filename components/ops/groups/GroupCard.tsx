import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Icon } from '../../ui/icon';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { cn } from '../../../lib/utils';
import type { GroupSummary } from '../../../types/groups';

interface GroupCardProps {
  group: GroupSummary;
  onClick: (groupName: string) => void;
  index: number;
}

/**
 * Retorna configuração de sentimento
 */
function getSentimentConfig(sentiment: string) {
  const normalized = sentiment?.toLowerCase() || 'neutro';

  switch (normalized) {
    case 'positivo':
      return {
        color: 'text-green-600',
        bg: 'bg-green-500',
        bgLight: 'bg-green-500/20',
        border: 'border-green-500/30',
        icon: 'graph-up' as const,
      };
    case 'negativo':
      return {
        color: 'text-red-600',
        bg: 'bg-red-500',
        bgLight: 'bg-red-500/20',
        border: 'border-red-500/30',
        icon: 'graph-down' as const,
      };
    case 'misto':
      return {
        color: 'text-amber-600',
        bg: 'bg-amber-500',
        bgLight: 'bg-amber-500/20',
        border: 'border-amber-500/30',
        icon: 'minus' as const,
      };
    default:
      return {
        color: 'text-gray-600',
        bg: 'bg-gray-500',
        bgLight: 'bg-gray-500/20',
        border: 'border-gray-500/30',
        icon: 'minus' as const,
      };
  }
}

/**
 * Formata data para exibição
 */
function formatDate(dateStr: string): string {
  try {
    const date = parseISO(dateStr);
    return format(date, "dd 'de' MMM", { locale: ptBR });
  } catch {
    return dateStr;
  }
}

export function GroupCard({ group, onClick, index }: GroupCardProps) {
  const sentimentConfig = getSentimentConfig(group.lastSentiment);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: index * 0.05,
        ease: 'easeOut',
      }}
      whileHover={{
        y: -4,
        transition: { duration: 0.2 },
      }}
      className="cursor-pointer group"
      onClick={() => onClick(group.grupo)}
    >
      <Card className="h-full rounded-3xl border-border bg-card shadow-lg hover:shadow-xl hover:border-primary/30 transition-all duration-300 overflow-hidden">
        {/* Sentiment indicator bar at top */}
        <div className={cn('h-1 w-full', sentimentConfig.bg)} />

        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-lg font-bold tracking-tight text-foreground line-clamp-2 group-hover:text-primary transition-colors">
              {group.grupo}
            </CardTitle>
            <div className="flex items-center gap-1.5 flex-shrink-0">
              {group.hasComplaints && (
                <div className="p-1 rounded-full bg-amber-500/10">
                  <Icon name="warning-triangle" className="size-3.5 text-amber-500" />
                </div>
              )}
            </div>
          </div>

          {/* Sentiment badge with icon */}
          <div className="flex items-center gap-2 mt-3">
            <div className={cn('flex items-center gap-1.5 px-2.5 py-1 rounded-full', sentimentConfig.bgLight)}>
              <Icon name={sentimentConfig.icon} className={cn('size-3.5', sentimentConfig.color)} />
              <span className={cn('text-xs font-semibold', sentimentConfig.color)}>
                {group.lastSentiment}
              </span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-0 space-y-4">
          {/* Resumo */}
          {group.lastSummary && (
            <p className="text-sm text-muted-foreground line-clamp-2">
              {group.lastSummary}
            </p>
          )}

          {/* Métricas */}
          <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t border-border/50">
            <div className="flex items-center gap-1.5">
              <div className="p-1 rounded bg-muted/50">
                <Icon name="group" className="size-3" />
              </div>
              <span>{group.memberCount} participantes</span>
            </div>

            <div className="flex items-center gap-1.5">
              <div className="p-1 rounded bg-muted/50">
                <Icon name="calendar" className="size-3" />
              </div>
              <span>{formatDate(group.lastActivityDate)}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

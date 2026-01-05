import React from 'react';
import { Icon } from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { ReadingStatusCardProps } from '../types';

/**
 * ReadingStatusCard - Reading status selection card
 */
export const ReadingStatusCard: React.FC<ReadingStatusCardProps> = ({
  readingStatus,
  isMarkingRead,
  interactionsLoading,
  onSetReadingStatus,
  onMarkAsRead,
}) => (
  <Card className="border-border bg-background shadow-sm">
    <CardContent className="p-4">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
          Status de Leitura
        </span>
        {readingStatus === 'read' && (
          <Badge className="bg-green-500/20 text-green-600">Concluido</Badge>
        )}
      </div>
      <div className="flex gap-2">
        <Button
          variant={readingStatus === 'reading' ? 'default' : 'outline'}
          size="sm"
          className={cn(
            'flex-1 text-xs',
            readingStatus === 'reading' && 'bg-blue-600 hover:bg-blue-700'
          )}
          onClick={() => !interactionsLoading && onSetReadingStatus('reading')}
          disabled={interactionsLoading}
        >
          <Icon name="book-open-cover" size="size-3" className="mr-1" />
          Lendo
        </Button>
        <Button
          variant={readingStatus === 'read' ? 'default' : 'outline'}
          size="sm"
          className={cn(
            'flex-1 text-xs',
            readingStatus === 'read' && 'bg-green-600 hover:bg-green-700'
          )}
          onClick={onMarkAsRead}
          disabled={isMarkingRead || interactionsLoading}
        >
          <Icon name="check" size="size-3" className="mr-1" />
          Lido
        </Button>
      </div>
    </CardContent>
  </Card>
);

export default ReadingStatusCard;

import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Icon } from '@/components/ui/icon';

interface BatchHeaderProps {
  sseState: 'connected' | 'connecting' | 'disconnected' | 'error';
  failedCount: number;
  inProgressCount: number;
  bulkLoading: string | null;
  onRetryAllFailed: () => void;
  onPauseAll: () => void;
  onAddBook: () => void;
  onRefresh: () => void;
}

export const BatchHeader: React.FC<BatchHeaderProps> = ({
  sseState,
  failedCount,
  inProgressCount,
  bulkLoading,
  onRetryAllFailed,
  onPauseAll,
  onAddBook,
  onRefresh,
}) => (
  <div className="flex flex-wrap items-center justify-between gap-4">
    <div className="flex items-center gap-3">
      <h2 className="text-xl font-bold">Pipeline de Resumos</h2>
      <Badge
        variant={sseState === 'connected' ? 'success' : sseState === 'connecting' ? 'warning' : 'secondary'}
        className="gap-1"
      >
        {sseState === 'connected' && <span className="h-2 w-2 rounded-full bg-success animate-pulse" />}
        {sseState === 'connected' ? 'Tempo real' : sseState === 'connecting' ? 'Conectando...' : 'Polling'}
      </Badge>
    </div>
    <div className="flex items-center gap-2">
      {failedCount > 0 && (
        <Button
          variant="outline"
          size="sm"
          onClick={onRetryAllFailed}
          disabled={!!bulkLoading}
          className="gap-2"
        >
          {bulkLoading === 'retry' ? (
            <Icon name="spinner" size="size-4" className="animate-spin" />
          ) : (
            <Icon name="refresh" size="size-4" />
          )}
          Retry Todos Falhos ({failedCount})
        </Button>
      )}
      {inProgressCount > 0 && (
        <Button
          variant="outline"
          size="sm"
          onClick={onPauseAll}
          disabled={!!bulkLoading}
          className="gap-2"
        >
          {bulkLoading === 'pause' ? (
            <Icon name="spinner" size="size-4" className="animate-spin" />
          ) : (
            <Icon name="pause" size="size-4" />
          )}
          Pausar Todos
        </Button>
      )}
      <Button onClick={onAddBook} className="gap-2">
        <Icon name="plus" size="size-4" />
        Adicionar Livro
      </Button>
      <Button variant="outline" size="icon" onClick={onRefresh} title="Atualizar">
        <Icon name="refresh" size="size-4" />
      </Button>
    </div>
  </div>
);

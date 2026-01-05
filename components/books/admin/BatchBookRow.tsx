import React from 'react';
import { Button } from '../../ui/button';
import { Icon } from '../../ui/icon';
import { Badge } from '../../ui/badge';
import { TableRow, TableCell } from '../../ui/table';
import { Popover } from '../../ui/popover';
import { cn } from '../../../lib/utils';
import { PhaseTimeline } from '../ui/PhaseTimeline';
import type { BatchBook } from '../../../hooks/useBatchProgress';

// Phase names for retry selection
const PHASE_OPTIONS = [
  { value: 1, label: 'Research', description: 'Pesquisa de fontes externas' },
  { value: 2, label: 'Enrichment', description: 'Enriquecimento de dados' },
  { value: 3, label: 'Extraction', description: 'Extração do conteúdo' },
  { value: 4, label: 'Gap Analysis', description: 'Análise de lacunas' },
  { value: 5, label: 'Curation', description: 'Curadoria de insights' },
  { value: 6, label: 'Architecture', description: 'Estruturação do resumo' },
  { value: 7, label: 'Commentary', description: 'Comentário editorial' },
  { value: 8, label: 'Action Design', description: 'Design de ações' },
  { value: 9, label: 'Final Writer', description: 'Escrita final' },
  { value: 10, label: 'Quality Gate', description: 'Validação de qualidade' },
  { value: 11, label: 'Premium Output', description: 'Geração do output' },
];

interface BatchBookRowProps {
  book: BatchBook;
  isLoading: boolean;
  serverAvailable: boolean;
  onPlay: (slug: string) => void;
  onPause: (slug: string) => void;
  onRetry: (slug: string, fromPhase: number) => void;
  onRemove: (slug: string, title: string) => void;
  onViewLogs: (slug: string, title: string) => void;
}

export const BatchBookRow: React.FC<BatchBookRowProps> = ({
  book,
  isLoading,
  serverAvailable,
  onPlay,
  onPause,
  onRetry,
  onRemove,
  onViewLogs,
}) => {
  // Render action buttons
  const renderActions = () => {
    if (!serverAvailable) {
      return <span className="text-xs text-muted-foreground">Servidor offline</span>;
    }

    return (
      <div className="flex items-center justify-end gap-1">
        {/* Logs button - for in_progress or failed */}
        {(book.status === 'in_progress' || book.status === 'failed') && (
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8"
            onClick={(e) => {
              e.stopPropagation();
              onViewLogs(book.slug, book.title);
            }}
            title="Ver logs em tempo real"
          >
            <Icon name="terminal" size="size-5" className="text-muted-foreground" />
          </Button>
        )}

        {/* Play button - for pending, failed, or paused */}
        {(book.status === 'pending' || book.status === 'failed') && (
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8"
            onClick={(e) => {
              e.stopPropagation();
              onPlay(book.slug);
            }}
            disabled={isLoading}
            title="Iniciar pipeline"
          >
            {isLoading ? (
              <Icon name="spinner" size="size-5" className="animate-spin" />
            ) : (
              <Icon name="play-circle" size="size-5" className="text-success" />
            )}
          </Button>
        )}

        {/* Pause button - for in_progress */}
        {book.status === 'in_progress' && (
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8"
            onClick={(e) => {
              e.stopPropagation();
              onPause(book.slug);
            }}
            disabled={isLoading}
            title="Pausar pipeline"
          >
            {isLoading ? (
              <Icon name="spinner" size="size-5" className="animate-spin" />
            ) : (
              <Icon name="pause" size="size-5" className="text-warning" />
            )}
          </Button>
        )}

        {/* Retry button with phase selection - for failed */}
        {book.status === 'failed' && (
          <Popover
            align="end"
            trigger={
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8"
                disabled={isLoading}
                title="Reiniciar de uma fase específica"
              >
                <Icon name="refresh" size="size-5" className="text-muted-foreground" />
              </Button>
            }
            content={
              <div className="space-y-2 -m-2">
                <div className="px-2 py-1.5">
                  <p className="text-sm font-medium">Reiniciar da fase:</p>
                  <p className="text-xs text-muted-foreground">Selecione a partir de qual fase</p>
                </div>
                <div className="max-h-[280px] overflow-y-auto space-y-0.5">
                  {PHASE_OPTIONS.map((phase) => {
                    const isCurrentPhase = book.current_phase === phase.value;
                    return (
                      <Button
                        key={phase.value}
                        variant="ghost"
                        size="sm"
                        className={cn(
                          'w-full justify-start h-auto py-2 px-2',
                          isCurrentPhase && 'bg-destructive/10 border border-destructive/30'
                        )}
                        onClick={() => onRetry(book.slug, phase.value)}
                        disabled={isLoading}
                      >
                        <div className="flex items-center gap-2 w-full">
                          <span className="text-xs font-mono w-5 text-muted-foreground">
                            {phase.value}.
                          </span>
                          <div className="flex-1 text-left">
                            <div className="text-sm font-medium">{phase.label}</div>
                            <div className="text-xs text-muted-foreground">{phase.description}</div>
                          </div>
                          {isCurrentPhase && (
                            <Badge variant="destructive" className="text-[10px] px-1.5 py-0">
                              Falhou
                            </Badge>
                          )}
                        </div>
                      </Button>
                    );
                  })}
                </div>
                <div className="border-t pt-2 px-2">
                  <Button
                    variant="destructive"
                    size="sm"
                    className="w-full"
                    onClick={() => onRetry(book.slug, 1)}
                    disabled={isLoading}
                  >
                    <Icon name="refresh" size="size-4" className="mr-2" />
                    Reiniciar do Início
                  </Button>
                </div>
              </div>
            }
            className="w-64"
          />
        )}

        {/* Completed checkmark */}
        {book.status === 'completed' && (
          <div className="flex items-center gap-2">
            {book.score && (
              <Badge
                variant="outline"
                className="font-mono text-xs bg-success/10 text-success border-success/30"
              >
                {book.score}/100
              </Badge>
            )}
            <Icon name="check-circle" size="size-5" className="text-success" />
          </div>
        )}

        {/* Remove button - for pending or completed */}
        {(book.status === 'pending' || book.status === 'completed') && (
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8 opacity-50 hover:opacity-100"
            onClick={(e) => {
              e.stopPropagation();
              onRemove(book.slug, book.title);
            }}
            disabled={isLoading}
            title="Remover do pipeline"
          >
            <Icon name="trash" size="size-4" className="text-muted-foreground" />
          </Button>
        )}
      </div>
    );
  };

  // Render status badge
  const renderStatusBadge = () => {
    switch (book.status) {
      case 'in_progress':
        return (
          <Badge variant="outline" className="border-warning text-warning bg-transparent gap-1.5">
            <Icon name="play" size="size-3" />
            Em Progresso
          </Badge>
        );
      case 'failed':
        return (
          <Badge variant="destructive" className="gap-1.5">
            <Icon name="x-circle" size="size-3" />
            Falhou
          </Badge>
        );
      case 'completed':
        return (
          <Badge variant="success" className="gap-1.5">
            <Icon name="check-circle" size="size-3" />
            Concluído
          </Badge>
        );
      default:
        return (
          <Badge variant="secondary" className="gap-1.5">
            <Icon name="clock" size="size-3" />
            Pendente
          </Badge>
        );
    }
  };

  return (
    <TableRow className="group hover:bg-muted/30">
      <TableCell>
        <div>
          <div className="font-semibold">{book.title}</div>
          <div className="text-sm text-muted-foreground">{book.author}</div>
          {book.status === 'failed' && book.last_error && (
            <div
              className="mt-1 text-xs text-orange-400 font-mono truncate max-w-[280px]"
              title={book.last_error}
            >
              Erro: {book.last_error}
            </div>
          )}
        </div>
      </TableCell>
      <TableCell>{renderStatusBadge()}</TableCell>
      <TableCell>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="font-medium text-sm">
              {book.status === 'completed' ? '11/11' : book.current_phase ? `${book.current_phase}/11` : '-'}
            </span>
            <PhaseTimeline
              currentPhase={book.current_phase || 0}
              status={book.status}
              phasesCompleted={book.phases_completed}
            />
          </div>
          <span className="text-xs text-muted-foreground">
            {book.next_action?.replace(/\s*\(fase\s*\d+\)/gi, '') ||
              (book.status === 'pending' ? 'Aguardando...' : '')}
          </span>
        </div>
      </TableCell>
      <TableCell className="text-center">
        {book.status === 'completed' && book.score ? (
          <Badge
            variant="outline"
            className={cn(
              'font-mono text-sm px-2',
              book.score >= 90 && 'bg-success/10 text-success border-success/30',
              book.score >= 70 && book.score < 90 && 'bg-warning/10 text-warning border-warning/30',
              book.score < 70 && 'bg-destructive/10 text-destructive border-destructive/30'
            )}
          >
            {book.score}/100
          </Badge>
        ) : (
          <span className="text-xs text-muted-foreground">-</span>
        )}
      </TableCell>
      <TableCell>{renderActions()}</TableCell>
    </TableRow>
  );
};

export default BatchBookRow;

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Button } from '../../ui/button';
import { Icon } from '../../ui/icon';
import { Badge } from '../../ui/badge';
import { cn } from '../../../lib/utils';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../../ui/dialog';

interface LogEntry {
  timestamp?: string;
  level?: 'info' | 'warning' | 'error' | 'debug' | 'success';
  phase?: number;
  message: string;
  duration?: number;
  [key: string]: unknown;
}

interface LogsViewerProps {
  slug: string;
  title: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PIPELINE_API = '/api/pipeline';

export const LogsViewer: React.FC<LogsViewerProps> = ({
  slug,
  title,
  open,
  onOpenChange,
}) => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [autoScroll, setAutoScroll] = useState(true);
  const logsEndRef = useRef<HTMLDivElement>(null);
  const eventSourceRef = useRef<EventSource | null>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (autoScroll && logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs, autoScroll]);

  // Connect to SSE when dialog opens
  useEffect(() => {
    if (!open || !slug) {
      // Cleanup when closed
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
        eventSourceRef.current = null;
      }
      setConnected(false);
      return;
    }

    // Reset state
    setLogs([]);
    setError(null);
    setConnected(false);

    const eventSource = new EventSource(`${PIPELINE_API}/books/${slug}/logs/stream`);
    eventSourceRef.current = eventSource;

    eventSource.addEventListener('connected', (event) => {
      setConnected(true);
      try {
        const data = JSON.parse(event.data);
        setLogs(prev => [...prev, {
          level: 'info',
          message: `Conectado ao stream de logs (${data.initial_lines} linhas iniciais)`,
          timestamp: new Date().toISOString(),
        }]);
      } catch {
        setConnected(true);
      }
    });

    eventSource.addEventListener('log', (event) => {
      try {
        const logEntry = JSON.parse(event.data);
        setLogs(prev => [...prev, logEntry]);
      } catch (e) {
        console.error('Failed to parse log:', e);
      }
    });

    eventSource.addEventListener('state', (event) => {
      // Pipeline state update - could show phase progress
      try {
        const state = JSON.parse(event.data);
        if (state.current_phase) {
          setLogs(prev => [...prev, {
            level: 'info',
            message: `Pipeline na fase ${state.current_phase}`,
            timestamp: new Date().toISOString(),
            phase: state.current_phase,
          }]);
        }
      } catch {
        // Ignore state parse errors
      }
    });

    eventSource.addEventListener('error', (event) => {
      try {
        const data = JSON.parse((event as MessageEvent).data);
        setError(data.error);
      } catch {
        setError('Erro de conexão');
      }
    });

    eventSource.onerror = () => {
      setConnected(false);
      setError('Conexão perdida. Tentando reconectar...');
    };

    return () => {
      eventSource.close();
      eventSourceRef.current = null;
    };
  }, [open, slug]);

  const getLevelColor = (level?: string) => {
    switch (level) {
      case 'error':
        return 'text-red-400';
      case 'warning':
        return 'text-yellow-400';
      case 'success':
        return 'text-green-400';
      case 'debug':
        return 'text-gray-400';
      default:
        return 'text-blue-400';
    }
  };

  const getLevelBadge = (level?: string) => {
    switch (level) {
      case 'error':
        return <Badge variant="destructive" className="text-[10px] px-1">ERR</Badge>;
      case 'warning':
        return <Badge variant="outline" className="text-[10px] px-1 border-yellow-500 text-yellow-500">WARN</Badge>;
      case 'success':
        return <Badge variant="outline" className="text-[10px] px-1 border-green-500 text-green-500">OK</Badge>;
      case 'debug':
        return <Badge variant="secondary" className="text-[10px] px-1">DBG</Badge>;
      default:
        return <Badge variant="secondary" className="text-[10px] px-1">INFO</Badge>;
    }
  };

  const formatTimestamp = (ts?: string) => {
    if (!ts) return '';
    try {
      const date = new Date(ts);
      return date.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        fractionalSecondDigits: 3
      });
    } catch {
      return ts;
    }
  };

  const clearLogs = useCallback(() => {
    setLogs([]);
  }, []);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl h-[80vh] flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-2">
              <Icon name="terminal" size="size-5" />
              Logs: {title}
            </DialogTitle>
            <div className="flex items-center gap-2">
              {/* Connection status */}
              <div className="flex items-center gap-1.5">
                <span className={cn(
                  'h-2 w-2 rounded-full',
                  connected ? 'bg-green-500 animate-pulse' : 'bg-red-500'
                )} />
                <span className={cn(
                  'text-xs',
                  connected ? 'text-green-500' : 'text-red-500'
                )}>
                  {connected ? 'Live' : 'Desconectado'}
                </span>
              </div>

              {/* Auto-scroll toggle */}
              <Button
                variant={autoScroll ? 'secondary' : 'outline'}
                size="sm"
                onClick={() => setAutoScroll(!autoScroll)}
                title={autoScroll ? 'Auto-scroll ativado' : 'Auto-scroll desativado'}
              >
                <Icon name={autoScroll ? 'chevron-down' : 'pause'} size="size-4" />
              </Button>

              {/* Clear logs */}
              <Button
                variant="outline"
                size="sm"
                onClick={clearLogs}
                title="Limpar logs"
              >
                <Icon name="trash" size="size-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>

        {/* Error banner */}
        {error && (
          <div className="flex-shrink-0 bg-destructive/10 border border-destructive/30 rounded-md p-2 text-sm text-destructive">
            {error}
          </div>
        )}

        {/* Logs container */}
        <div className="flex-1 overflow-auto bg-gray-950 rounded-md p-3 font-mono text-xs">
          {logs.length === 0 ? (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              <div className="text-center">
                <Icon name="terminal" size="size-12" className="mx-auto mb-2 opacity-30" />
                <p>Aguardando logs...</p>
                <p className="text-xs mt-1">Os logs aparecerão aqui em tempo real</p>
              </div>
            </div>
          ) : (
            <div className="space-y-0.5">
              {logs.map((log, index) => (
                <div
                  key={index}
                  className={cn(
                    'flex items-start gap-2 py-0.5 hover:bg-white/5 rounded px-1 -mx-1',
                    log.level === 'error' && 'bg-red-500/10'
                  )}
                >
                  {/* Timestamp */}
                  <span className="text-gray-500 flex-shrink-0 w-24">
                    {formatTimestamp(log.timestamp)}
                  </span>

                  {/* Level badge */}
                  <span className="flex-shrink-0 w-12">
                    {getLevelBadge(log.level)}
                  </span>

                  {/* Phase indicator */}
                  {log.phase && (
                    <span className="flex-shrink-0 text-purple-400">
                      [P{log.phase}]
                    </span>
                  )}

                  {/* Message */}
                  <span className={cn('flex-1', getLevelColor(log.level))}>
                    {log.message}
                  </span>

                  {/* Duration if available */}
                  {log.duration && (
                    <span className="text-gray-500 flex-shrink-0">
                      {log.duration.toFixed(2)}s
                    </span>
                  )}
                </div>
              ))}
              <div ref={logsEndRef} />
            </div>
          )}
        </div>

        {/* Footer with stats */}
        <div className="flex-shrink-0 flex items-center justify-between text-xs text-muted-foreground pt-2">
          <span>{logs.length} linhas</span>
          <span>Slug: {slug}</span>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LogsViewer;

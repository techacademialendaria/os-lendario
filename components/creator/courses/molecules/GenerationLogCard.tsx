import React from 'react';
import { Card } from '../../../ui/card';
import { Icon } from '../../../ui/icon';
import { cn } from '../../../../lib/utils';
import type { GenerationLogEntry } from '../types';

interface GenerationLogCardProps {
  log: GenerationLogEntry;
}

export const GenerationLogCard: React.FC<GenerationLogCardProps> = ({ log }) => {
  return (
    <Card
      className={cn(
        'border-l-4 transition-all',
        log.status === 'success'
          ? 'border-l-success bg-success/5'
          : log.status === 'retrying'
            ? 'border-l-brand-yellow bg-brand-yellow/5'
            : 'border-l-muted bg-muted/5 opacity-60'
      )}
    >
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-4">
          {log.status === 'success' ? (
            <Icon name="check-circle" className="text-success" />
          ) : log.status === 'retrying' ? (
            <Icon name="refresh" className="animate-spin text-brand-yellow" />
          ) : (
            <Icon name="circle" className="text-muted-foreground" />
          )}

          <div>
            <p className="text-sm font-bold">
              {log.id} - {log.title}
            </p>
            <p className="text-xs text-muted-foreground">{log.msg}</p>
          </div>
        </div>
        <div className="flex gap-4 font-mono text-xs">
          <div className="text-center">
            <span className="block text-[10px] uppercase text-muted-foreground">GPS Score</span>
            <span
              className={cn(
                'font-bold',
                log.gps > 70
                  ? 'text-success'
                  : log.gps > 0
                    ? 'text-brand-yellow'
                    : 'text-muted'
              )}
            >
              {log.gps > 0 ? log.gps : '-'}
            </span>
          </div>
          <div className="text-center">
            <span className="block text-[10px] uppercase text-muted-foreground">DL Score</span>
            <span
              className={cn(
                'font-bold',
                log.dl > 70
                  ? 'text-success'
                  : log.dl > 0
                    ? 'text-brand-yellow'
                    : 'text-muted'
              )}
            >
              {log.dl > 0 ? log.dl : '-'}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};

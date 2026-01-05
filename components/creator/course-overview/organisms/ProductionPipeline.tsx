import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';
import { cn } from '@/lib/utils';
import { STUDIO_PRIMARY } from '../../studio-tokens';
import type { PipelineStage } from '../types';

interface ProductionPipelineProps {
  stages: PipelineStage[];
  progressPercent: number;
}

export const ProductionPipeline: React.FC<ProductionPipelineProps> = ({ stages, progressPercent }) => {
  const completedCount = stages.filter((s) => s.status === 'completed').length;
  const lineProgress = (completedCount / (stages.length - 1)) * 100;

  return (
    <Card className="group border-border bg-card transition-colors hover:border-studio-primary/50">
      <CardContent className="p-6">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-muted-foreground transition-colors group-hover:text-studio-primary">
            <Icon name="sitemap" size="size-4" /> Pipeline de Producao
          </h3>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">{progressPercent}% completo</span>
            <div className="h-2 w-32 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%`, backgroundColor: STUDIO_PRIMARY }}
              />
            </div>
          </div>
        </div>

        <div className="relative flex min-w-[700px] items-center justify-between">
          {/* Connecting line with progress */}
          <div className="absolute left-0 top-5 -z-0 h-0.5 w-full bg-muted">
            <div
              className="h-full transition-all duration-1000"
              style={{ width: `${lineProgress}%`, backgroundColor: STUDIO_PRIMARY }}
            />
          </div>

          {stages.map((stage) => (
            <div
              key={stage.id}
              className="group/step relative z-10 flex flex-col items-center gap-3"
            >
              <div
                className={cn(
                  'flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-300',
                  stage.status === 'current'
                    ? 'scale-110 text-white shadow-lg'
                    : stage.status === 'completed'
                      ? 'bg-card text-foreground'
                      : 'border-border bg-card text-muted-foreground group-hover/step:text-foreground'
                )}
                style={{
                  backgroundColor: stage.status === 'current' ? STUDIO_PRIMARY : undefined,
                  borderColor:
                    stage.status === 'current' || stage.status === 'completed'
                      ? STUDIO_PRIMARY
                      : undefined,
                  boxShadow: stage.status === 'current' ? `0 0 20px ${STUDIO_PRIMARY}40` : undefined,
                }}
              >
                {stage.status === 'completed' ? (
                  <Icon name="check" size="size-4" />
                ) : (
                  <Icon name={stage.icon} size="size-4" />
                )}
              </div>
              <div className="text-center">
                <p
                  className="mb-0.5 text-xs font-bold uppercase tracking-wider"
                  style={
                    stage.status === 'current' || stage.status === 'completed'
                      ? { color: STUDIO_PRIMARY }
                      : {}
                  }
                >
                  {stage.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

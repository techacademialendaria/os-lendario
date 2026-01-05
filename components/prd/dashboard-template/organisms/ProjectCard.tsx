import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { PRD_ACCENT, PRD_PRIMARY, PRD_STATUS, getProgressPercentage } from '../../prd-tokens';
import type { PRDStatus } from '@/types/prd';
import type { ProjectCardProps } from '../types';

const formatRelativeTime = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'agora';
  if (diffMins < 60) return `${diffMins}min atras`;
  if (diffHours < 24) return `${diffHours}h atras`;
  if (diffDays < 7) return `${diffDays}d atras`;
  return date.toLocaleDateString('pt-BR');
};

const getStatusLabel = (status: PRDStatus): string => {
  const labels: Record<PRDStatus, string> = {
    upload: 'Upload',
    brief: 'Brief',
    prd: 'PRD',
    epics: 'Epicos',
    stories: 'Stories',
    exported: 'Exportado',
  };
  return labels[status] || status;
};

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, viewMode }) => {
  const navigate = useNavigate();
  const status = project.status as PRDStatus;
  const statusConfig = PRD_STATUS[status] || PRD_STATUS.upload;
  const progress = getProgressPercentage(status);
  const prdType = project.project_metadata?.prdType || 'project';

  return (
    <Card
      className="group relative cursor-pointer overflow-hidden border-border bg-card transition-all hover:shadow-md"
      onClick={() => navigate(`/prd/${project.slug}`)}
    >
      {/* Hover Border Effect */}
      <div className="pointer-events-none absolute inset-0 rounded-xl border-2 border-transparent transition-colors group-hover:border-studio-primary/30" />

      <CardContent className={cn('p-4', viewMode === 'grid' && 'p-5')}>
        <div className={cn('flex gap-4', viewMode === 'grid' ? 'flex-col' : 'items-center')}>
          {/* Icon Box */}
          <div
            className={cn(
              'flex shrink-0 items-center justify-center rounded-lg transition-colors group-hover:bg-studio-primary group-hover:text-white',
              viewMode === 'grid' ? 'h-14 w-14' : 'h-12 w-12'
            )}
            style={{ backgroundColor: PRD_ACCENT, color: PRD_PRIMARY }}
          >
            <Icon name={prdType === 'task' ? 'check-square' : 'folder'} size="size-5" />
          </div>

          {/* Title + Meta */}
          <div className={cn('min-w-0 flex-1', viewMode === 'grid' && 'w-full')}>
            <div
              className={cn(
                'mb-1.5 flex gap-2',
                viewMode === 'grid' ? 'items-start justify-between' : 'items-center'
              )}
            >
              <h4 className="truncate text-base font-bold text-foreground transition-colors group-hover:text-studio-primary">
                {project.name}
              </h4>
            </div>

            <div className="mb-2 flex items-center gap-2">
              <Badge
                variant="outline"
                className="h-4 border-studio-primary/30 bg-studio-primary/5 px-1.5 text-[9px] text-studio-primary"
              >
                {prdType === 'task' ? 'Task' : 'Projeto'}
              </Badge>
              <span className="text-xs text-muted-foreground">
                {formatRelativeTime(project.updated_at)}
              </span>
            </div>

            {viewMode === 'list' && (
              <div className="hidden md:block">
                <Progress value={progress} className="h-1.5 w-32 bg-muted" />
              </div>
            )}
          </div>

          {/* Status Badge */}
          <div
            className={cn(
              'flex shrink-0 items-center gap-2',
              viewMode === 'grid'
                ? 'mt-auto w-full justify-between border-t border-border pt-3'
                : ''
            )}
          >
            <Badge
              className={cn(
                statusConfig.bg,
                statusConfig.text,
                'text-[10px] uppercase tracking-wider'
              )}
            >
              <span className={cn('mr-1.5 h-1.5 w-1.5 rounded-full', statusConfig.dot)} />
              {getStatusLabel(status)}
            </Badge>

            {viewMode === 'list' && (
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 shrink-0 text-muted-foreground hover:text-foreground"
                onClick={(e) => e.stopPropagation()}
              >
                <Icon name="menu-dots-vertical" size="size-4" />
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

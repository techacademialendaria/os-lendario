import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { STUDIO_PRIMARY } from '../../studio-tokens';
import type { QuickAction } from '../types';

interface CourseInfo {
  status?: string;
  projectType?: string;
  metodologia?: string;
  duracaoEstimada?: string;
}

interface SidebarPanelProps {
  quickActions: QuickAction[];
  courseInfo: CourseInfo;
}

export const SidebarPanel: React.FC<SidebarPanelProps> = ({ quickActions, courseInfo }) => {
  const navigate = useNavigate();

  return (
    <div className="h-fit space-y-6 lg:sticky lg:top-24">
      {/* Quick Actions */}
      <Card className="border-border bg-card shadow-sm">
        <CardHeader className="border-b border-border pb-3">
          <CardTitle className="flex items-center gap-2 text-sm uppercase tracking-wider text-muted-foreground">
            <Icon name="bolt" size="size-4" /> Acoes Rapidas
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 pt-4">
          {quickActions.map((action, i) => (
            <Button
              key={i}
              variant="outline"
              className="h-10 w-full justify-start transition-colors hover:border-studio-primary/50 hover:text-studio-primary"
              onClick={() => navigate(action.path)}
            >
              <Icon name={action.icon} size="size-4" className="mr-3 text-muted-foreground" />
              {action.label}
            </Button>
          ))}
        </CardContent>
      </Card>

      {/* Course Info */}
      <Card className="border-border bg-card shadow-sm">
        <CardHeader className="border-b border-border pb-3">
          <CardTitle className="flex items-center gap-2 text-sm uppercase tracking-wider text-muted-foreground">
            <Icon name="info-circle" size="size-4" /> Informacoes
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 pt-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Status</span>
            <span className="font-medium capitalize">
              {courseInfo.status?.replace('_', ' ') || 'Em progresso'}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Tipo</span>
            <span className="font-medium capitalize">{courseInfo.projectType || 'Curso'}</span>
          </div>
          {courseInfo.metodologia && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Metodologia</span>
              <span className="font-medium" style={{ color: STUDIO_PRIMARY }}>
                {courseInfo.metodologia}
              </span>
            </div>
          )}
          {courseInfo.duracaoEstimada && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Duracao</span>
              <span className="font-medium">{courseInfo.duracaoEstimada}</span>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

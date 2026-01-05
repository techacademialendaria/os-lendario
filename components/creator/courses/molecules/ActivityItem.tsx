import React from 'react';
import { Icon } from '../../../ui/icon';
import { formatRelativeTime, getIconForTipoLabel } from '../../../../hooks/useRecentActivities';

interface Activity {
  id: string;
  tipo_label: string;
  title: string;
  project_slug: string;
  project_name: string;
  updated_at: string;
}

interface ActivityItemProps {
  activity: Activity;
  onClick: () => void;
}

export const ActivityItem: React.FC<ActivityItemProps> = ({ activity, onClick }) => {
  return (
    <div
      className="group relative flex cursor-pointer gap-4 pb-6 last:pb-4"
      onClick={onClick}
    >
      <div className="z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-studio-accent text-studio-primary shadow-sm">
        <Icon name={getIconForTipoLabel(activity.tipo_label)} size="size-4" />
      </div>
      <div className="min-w-0 flex-1 pt-0.5">
        <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
          {activity.tipo_label}
        </p>
        <p className="truncate text-sm font-medium text-foreground" title={activity.title}>
          {activity.title}
        </p>
        <p className="mt-1 flex items-center gap-1 text-[10px] text-muted-foreground">
          <span className="text-studio-accent">{activity.project_name}</span>
          <span className="text-border">·</span>
          <span className="font-mono">{formatRelativeTime(activity.updated_at)}</span>
        </p>
      </div>
    </div>
  );
};

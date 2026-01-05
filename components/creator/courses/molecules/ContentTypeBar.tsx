import React from 'react';
import { Icon } from '../../../ui/icon';
import type { ContentTypeConfig } from '../types';

interface ContentTypeBarProps {
  type: ContentTypeConfig;
}

export const ContentTypeBar: React.FC<ContentTypeBarProps> = ({ type }) => {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-xs">
        <span className="flex items-center gap-2 font-medium text-foreground">
          <Icon name={type.icon} size="size-3" className="text-muted-foreground" />
          {type.label}
        </span>
        <span className="font-mono text-muted-foreground">{type.count}</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-studio-primary"
          style={{ width: `${type.percent}%` }}
        />
      </div>
    </div>
  );
};

// PRD Project Detail - Breadcrumb organism
import React from 'react';
import { Icon } from '@/components/ui/icon';

interface BreadcrumbProps {
  projectName: string;
  onBack: () => void;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ projectName, onBack }) => (
  <div className="flex items-center gap-2 text-sm text-muted-foreground">
    <span
      className="cursor-pointer transition-colors hover:text-foreground"
      onClick={onBack}
    >
      Projetos
    </span>
    <Icon name="angle-small-right" size="size-3" />
    <span className="truncate font-medium text-foreground">{projectName}</span>
  </div>
);

import React from 'react';
import { Button } from '../../ui/button';
import { Icon } from '../../ui/icon';

interface CoursesHeaderProps {
  title: string;
  breadcrumb?: string;
  showBackButton?: boolean;
  showNewButton?: boolean;
  onBack?: () => void;
  onNew?: () => void;
  onBreadcrumbClick?: () => void;
}

export function CoursesHeader({
  title,
  breadcrumb,
  showBackButton = false,
  showNewButton = false,
  onBack,
  onNew,
  onBreadcrumbClick,
}: CoursesHeaderProps) {
  return (
    <div className="mb-8 flex animate-fade-in items-center justify-between">
      <div>
        <div className="mb-1 flex items-center gap-2 text-sm text-muted-foreground">
          <span
            className="cursor-pointer hover:text-foreground"
            onClick={onBreadcrumbClick}
          >
            Cursos
          </span>
          {breadcrumb && (
            <>
              <Icon name="angle-small-right" size="size-3" />
              <span className="text-foreground">{breadcrumb}</span>
            </>
          )}
        </div>
        <h1 className="font-sans text-3xl font-bold tracking-tight text-foreground">
          {title}
        </h1>
      </div>
      <div className="flex gap-3">
        {showBackButton && onBack && (
          <Button variant="outline" onClick={onBack}>
            <Icon name="angle-left" className="mr-2 size-4" /> Voltar
          </Button>
        )}
        {showNewButton && onNew && (
          <Button
            onClick={onNew}
            className="bg-studio-primary text-white shadow-lg shadow-studio-primary/20 transition-transform hover:scale-105"
          >
            <Icon name="plus" className="mr-2 size-4" /> Novo Curso
          </Button>
        )}
      </div>
    </div>
  );
}

export default CoursesHeader;

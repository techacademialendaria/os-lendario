import React from 'react';
import { Card, CardContent } from '../../../ui/card';
import { Button } from '../../../ui/button';
import { Icon } from '../../../ui/icon';
import { Badge } from '../../../ui/badge';
import { Progress } from '../../../ui/progress';
import { cn } from '../../../../lib/utils';
import type { Course, ViewMode } from '../types';

interface CourseCardProps {
  course: Course;
  viewMode: ViewMode;
  onClick: () => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course, viewMode, onClick }) => {
  return (
    <Card
      className="group relative cursor-pointer overflow-hidden border-border bg-card transition-all hover:shadow-md"
      onClick={onClick}
    >
      {/* Hover Border Effect */}
      <div className="pointer-events-none absolute inset-0 rounded-xl border-2 border-transparent transition-colors group-hover:border-studio-primary/30" />

      <CardContent className={cn('p-4', viewMode === 'grid' && 'p-5')}>
        <div
          className={cn(
            'flex gap-4',
            viewMode === 'grid' ? 'flex-col' : 'items-center'
          )}
        >
          {/* Icon Box */}
          <div
            className={cn(
              'flex shrink-0 items-center justify-center rounded-lg bg-studio-accent text-studio-primary transition-colors group-hover:bg-studio-primary group-hover:text-white',
              viewMode === 'grid' ? 'h-14 w-14' : 'h-12 w-12'
            )}
          >
            <Icon name={course.icon} size="size-5" />
          </div>

          {/* Title + Meta */}
          <div className={cn('min-w-0 flex-1', viewMode === 'grid' && 'w-full')}>
            {/* Title row with menu for grid */}
            <div
              className={cn(
                'mb-1.5 flex gap-2',
                viewMode === 'grid' ? 'items-start justify-between' : 'items-center'
              )}
            >
              <h4 className="truncate text-base font-bold text-foreground transition-colors group-hover:text-studio-primary">
                {course.title}
              </h4>
              {viewMode === 'grid' && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="-mr-2 -mt-1 h-7 w-7 shrink-0 text-muted-foreground hover:text-foreground"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Icon name="menu-dots-vertical" size="size-4" />
                </Button>
              )}
            </div>

            <div className="mb-2 flex items-center gap-2">
              <Badge
                variant="outline"
                className="h-4 border-studio-primary/30 bg-studio-primary/5 px-1.5 text-[9px] text-studio-primary"
              >
                {course.category}
              </Badge>
            </div>

            <div
              className={cn(
                'flex text-xs text-muted-foreground',
                viewMode === 'grid'
                  ? 'mt-3 flex-col gap-2 border-t border-border pt-3'
                  : 'items-center gap-4'
              )}
            >
              <span className="flex items-center gap-1.5 font-medium text-studio-accent">
                <Icon name="user" size="size-3" /> {course.instructor.name}
              </span>
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <Icon name="layers" size="size-3" /> {course.modulesCount} mód
                </span>
                <span className="flex items-center gap-1.5">
                  <Icon name="document" size="size-3" /> {course.lessonsCount} aulas
                </span>
              </div>
            </div>
          </div>

          {/* Status + Date */}
          <div
            className={cn(
              'flex shrink-0 gap-1.5',
              viewMode === 'grid'
                ? 'mt-auto w-full items-center justify-between border-t border-border pt-3'
                : 'hidden flex-col items-end md:flex'
            )}
          >
            {course.progress === 100 ? (
              <Badge
                variant="outline"
                className="border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[10px] uppercase tracking-wider text-emerald-600"
              >
                <span className="mr-1.5 h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                Completo
              </Badge>
            ) : (
              <div
                className={cn(
                  'space-y-1',
                  viewMode === 'grid' ? 'mr-4 flex-1' : 'w-28'
                )}
              >
                <div className="flex justify-between text-[10px] font-bold uppercase text-studio-primary">
                  <span>Produzindo</span>
                  <span>{course.progress}%</span>
                </div>
                <Progress value={course.progress} className="h-1.5 bg-muted" />
              </div>
            )}
            <div className="flex items-center gap-1.5 font-mono text-[10px] text-muted-foreground">
              <Icon name="calendar" size="size-3" />
              <span>{course.updatedAt}</span>
            </div>
          </div>

          {/* Menu - List view only */}
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
      </CardContent>
    </Card>
  );
};

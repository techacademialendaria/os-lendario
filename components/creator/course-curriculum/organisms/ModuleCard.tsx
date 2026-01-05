import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { ModuleCardProps } from '../types';
import { getStatusIcon, getTypeIcon } from '../hooks';

export const ModuleCard: React.FC<ModuleCardProps> = ({
  module,
  moduleIndex,
  onToggle,
  onAddLesson,
  onDeleteModule,
  onDeleteLesson,
  onEditLesson,
}) => {
  return (
    <Card className="overflow-hidden">
      {/* Module Header */}
      <CardHeader
        className={cn(
          'cursor-pointer py-4 transition-colors',
          module.isExpanded ? 'border-b border-border bg-primary/5' : 'hover:bg-muted/30'
        )}
        onClick={() => onToggle(module.id)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-studio-primary/10 font-bold text-studio-primary">
              {moduleIndex + 1}
            </div>
            <div>
              <CardTitle className="text-base">{module.title}</CardTitle>
              <CardDescription className="text-xs">{module.description}</CardDescription>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="text-[10px]">
              {module.lessons.length} aulas
            </Badge>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={(e) => {
                  e.stopPropagation();
                  onAddLesson(module.id);
                }}
              >
                <Icon name="plus" size="size-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-destructive"
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteModule(module.id);
                }}
              >
                <Icon name="trash" size="size-4" />
              </Button>
            </div>
            <Icon
              name={module.isExpanded ? 'angle-up' : 'angle-down'}
              className="text-muted-foreground"
              size="size-4"
            />
          </div>
        </div>
      </CardHeader>

      {/* Lessons List */}
      {module.isExpanded && (
        <CardContent className="p-0">
          {module.lessons.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              <Icon name="document" className="mx-auto mb-2 size-8 opacity-30" />
              <p className="text-sm">Nenhuma licao neste modulo</p>
              <Button
                variant="outline"
                size="sm"
                className="mt-4"
                onClick={() => onAddLesson(module.id)}
              >
                <Icon name="plus" className="mr-2 size-3" /> Criar primeira licao
              </Button>
            </div>
          ) : (
            module.lessons.map((lesson) => {
              const statusInfo = getStatusIcon(lesson.status);
              return (
                <div
                  key={lesson.id}
                  className="group flex items-center gap-4 border-b border-border p-4 transition-colors last:border-0 hover:bg-muted/20"
                >
                  {/* Drag Handle */}
                  <Icon
                    name="menu-burger"
                    className="cursor-grab text-muted-foreground/30 group-hover:text-muted-foreground"
                    size="size-4"
                  />

                  {/* Status */}
                  <Icon
                    name={statusInfo.icon}
                    className={statusInfo.color}
                    size="size-4"
                    type={lesson.status === 'completed' ? 'solid' : 'regular'}
                  />

                  {/* Lesson Number */}
                  <span className="w-8 font-mono text-xs text-muted-foreground">{lesson.id}</span>

                  {/* Type Icon */}
                  <div className="flex h-8 w-8 items-center justify-center rounded bg-muted/50">
                    <Icon
                      name={getTypeIcon(lesson.type)}
                      size="size-4"
                      className="text-muted-foreground"
                    />
                  </div>

                  {/* Title */}
                  <span className="flex-1 text-sm font-medium">{lesson.title}</span>

                  {/* Duration */}
                  <Badge variant="secondary" className="font-mono text-[10px]">
                    {lesson.duration}
                  </Badge>

                  {/* Actions */}
                  <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => onEditLesson?.(lesson.id)}
                    >
                      <Icon name="pencil" size="size-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive"
                      onClick={() => onDeleteLesson(module.id, lesson.id)}
                    >
                      <Icon name="trash" size="size-4" />
                    </Button>
                  </div>
                </div>
              );
            })
          )}
        </CardContent>
      )}
    </Card>
  );
};

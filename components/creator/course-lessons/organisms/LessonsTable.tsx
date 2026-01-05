import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { LESSON_TYPE_ICONS } from '../types';
import type { LessonsTableProps, Lesson, LessonStatus } from '../types';

const getStatusBadge = (status: LessonStatus) => {
  switch (status) {
    case 'completed':
      return <Badge className="bg-success/10 text-success border-0 text-[10px]">Concluido</Badge>;
    case 'review':
      return (
        <Badge className="border-0 bg-brand-yellow/10 text-[10px] text-brand-yellow">
          Revisao
        </Badge>
      );
    case 'generating':
      return (
        <Badge className="animate-pulse border-0 text-[10px] text-studio-primary bg-studio-primary/10">
          Gerando...
        </Badge>
      );
    default:
      return (
        <Badge variant="secondary" className="text-[10px]">
          Rascunho
        </Badge>
      );
  }
};

const getScoreColor = (score?: number) => {
  if (!score) return 'text-muted-foreground';
  if (score >= 80) return 'text-success';
  if (score >= 60) return 'text-brand-yellow';
  return 'text-destructive';
};

export const LessonsTable: React.FC<LessonsTableProps> = ({
  lessons,
  selectedLessons,
  allSelected,
  onToggleSelectAll,
  onToggleSelect,
  onEditLesson,
}) => {
  return (
    <ScrollArea className="flex-1">
      <Card className="m-6 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/30">
              <TableHead className="w-12">
                <Checkbox
                  checked={allSelected}
                  onCheckedChange={onToggleSelectAll}
                />
              </TableHead>
              <TableHead className="w-16">ID</TableHead>
              <TableHead className="w-12">Tipo</TableHead>
              <TableHead>Titulo</TableHead>
              <TableHead>Modulo</TableHead>
              <TableHead className="w-24">Status</TableHead>
              <TableHead className="w-16 text-center">GPS</TableHead>
              <TableHead className="w-16 text-center">DL</TableHead>
              <TableHead className="w-20">Duracao</TableHead>
              <TableHead className="w-24">Acoes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {lessons.map((lesson) => (
              <TableRow
                key={lesson.id}
                className={cn(
                  'cursor-pointer transition-colors hover:bg-muted/20',
                  selectedLessons.includes(lesson.id) && 'bg-primary/5'
                )}
              >
                <TableCell>
                  <Checkbox
                    checked={selectedLessons.includes(lesson.id)}
                    onCheckedChange={() => onToggleSelect(lesson.id)}
                  />
                </TableCell>
                <TableCell>
                  <span className="font-mono text-xs text-muted-foreground">{lesson.id}</span>
                </TableCell>
                <TableCell>
                  <div className="flex h-8 w-8 items-center justify-center rounded bg-muted/50">
                    <Icon
                      name={LESSON_TYPE_ICONS[lesson.type]}
                      size="size-4"
                      className="text-muted-foreground"
                    />
                  </div>
                </TableCell>
                <TableCell>
                  <span className="font-medium">{lesson.title}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm text-muted-foreground">{lesson.moduleName}</span>
                </TableCell>
                <TableCell>{getStatusBadge(lesson.status)}</TableCell>
                <TableCell className="text-center">
                  <span
                    className={cn(
                      'font-mono text-sm font-bold',
                      getScoreColor(lesson.gpsScore)
                    )}
                  >
                    {lesson.gpsScore || '-'}
                  </span>
                </TableCell>
                <TableCell className="text-center">
                  <span
                    className={cn(
                      'font-mono text-sm font-bold',
                      getScoreColor(lesson.dlScore)
                    )}
                  >
                    {lesson.dlScore || '-'}
                  </span>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary" className="font-mono text-[10px]">
                    {lesson.duration}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => onEditLesson?.(lesson.id)}
                    >
                      <Icon name="pencil" size="size-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Icon name="eye" size="size-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </ScrollArea>
  );
};

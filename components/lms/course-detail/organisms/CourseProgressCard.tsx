import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Progress } from '@/components/ui/progress';
import type { CourseProgressCardProps } from '../types';

export function CourseProgressCard({ course, onContinue, disabled }: CourseProgressCardProps) {
  return (
    <div className="space-y-3 rounded-xl border border-border bg-card/50 p-6 shadow-sm">
      <div className="flex items-end justify-between">
        <div>
          <p className="mb-1 text-xs font-bold uppercase tracking-widest text-muted-foreground">
            Seu Progresso
          </p>
          <p className="text-2xl font-bold text-foreground">
            {course.progress}%{' '}
            <span className="text-sm font-normal text-muted-foreground">Concluido</span>
          </p>
        </div>
        <Button
          size="lg"
          className="rounded-full bg-foreground px-8 font-bold text-background hover:bg-foreground/90"
          onClick={onContinue}
          disabled={disabled}
        >
          <Icon name="play" className="mr-2" />{' '}
          {course.completedLessons > 0 ? 'Continuar' : 'Comecar'}
        </Button>
      </div>
      <Progress value={course.progress} className="h-2 bg-muted" />
      <p className="text-right text-xs text-muted-foreground">
        {course.completedLessons}/{course.totalLessons} Aulas finalizadas
      </p>
    </div>
  );
}

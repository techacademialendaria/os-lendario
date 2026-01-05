import { cn } from '@/lib/utils';
import { Icon } from '@/components/ui/icon';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import type { CourseContentTabProps, LessonStatus } from '../types';

export function CourseContentTab({ modules, onLessonClick }: CourseContentTabProps) {
  const getLessonIcon = (status: LessonStatus) => {
    switch (status) {
      case 'completed':
        return <Icon name="check-circle" className="text-green-500" size="size-4" />;
      case 'current':
        return <Icon name="play-circle" className="text-primary" size="size-4" />;
      case 'locked':
        return <Icon name="lock" className="text-muted-foreground" size="size-4" />;
    }
  };

  return (
    <Accordion type="multiple" defaultValue={['m1', 'm2']} className="w-full space-y-4">
      {modules.map((module) => (
        <AccordionItem
          key={module.id}
          value={module.id}
          className="overflow-hidden rounded-xl border border-border bg-card/30"
        >
          <AccordionTrigger className="px-6 py-4 hover:bg-muted/50 hover:no-underline">
            <div className="flex-1 text-left">
              <p className="text-base font-bold text-foreground">{module.title}</p>
              <p className="mt-1 text-xs font-normal text-muted-foreground">
                {module.lessons.length} aulas - {module.duration}
              </p>
            </div>
          </AccordionTrigger>
          <AccordionContent className="border-t border-border bg-muted/5 p-0">
            {module.lessons.map((lesson, idx) => (
              <div
                key={lesson.id}
                className={cn(
                  'group flex cursor-pointer items-center gap-4 border-b border-border p-4 pl-6 transition-colors last:border-0',
                  lesson.status === 'locked' ? 'cursor-not-allowed opacity-50' : 'hover:bg-muted/50',
                  lesson.status === 'current' ? 'bg-primary/5' : ''
                )}
                onClick={() => onLessonClick(lesson.id, lesson.status)}
              >
                <div className="w-6 font-mono text-xs text-muted-foreground">{idx + 1}</div>
                <div className="flex-1">
                  <p
                    className={cn(
                      'text-sm font-medium',
                      lesson.status === 'current'
                        ? 'text-primary'
                        : 'text-foreground/80 group-hover:text-foreground'
                    )}
                  >
                    {lesson.title}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-mono text-xs text-muted-foreground">{lesson.duration}</span>
                  {getLessonIcon(lesson.status)}
                </div>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

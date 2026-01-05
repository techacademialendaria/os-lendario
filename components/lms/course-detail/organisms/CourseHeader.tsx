import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { CourseHeaderProps } from '../types';

export function CourseHeader({ course, onBack }: CourseHeaderProps) {
  return (
    <>
      {/* Nav Back */}
      <div className="container mx-auto max-w-7xl px-6 py-6">
        <Button
          variant="ghost"
          className="gap-2 pl-0 text-muted-foreground hover:text-foreground"
          onClick={onBack}
        >
          <Icon name="arrow-left" size="size-4" /> Voltar para Meus Cursos
        </Button>
      </div>

      {/* Header Content */}
      <div className="space-y-4">
        <h1 className="text-4xl font-bold leading-tight tracking-tight md:text-5xl">
          {course.title}
        </h1>
        <p className="max-w-3xl font-serif text-xl leading-relaxed text-muted-foreground">
          {course.description}
        </p>
        <div className="flex items-center gap-6 pt-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>AN</AvatarFallback>
            </Avatar>
            <span className="text-foreground">{course.author}</span>
          </div>
          <div className="flex items-center gap-1">
            <Icon name="star" className="text-yellow-500" size="size-3" />
            <span className="font-bold text-foreground">{course.rating}</span>
            <span>({course.students} alunos)</span>
          </div>
          <div>
            Atualizado em <span className="text-foreground">{course.lastUpdated}</span>
          </div>
        </div>
      </div>
    </>
  );
}

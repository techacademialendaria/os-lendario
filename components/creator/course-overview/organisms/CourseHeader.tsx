import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Icon } from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { STUDIO_PRIMARY } from '../../studio-tokens';

interface CourseHeaderProps {
  courseName: string;
  courseDescription?: string | null;
  courseSlug: string;
  currentStage: string;
}

export const CourseHeader: React.FC<CourseHeaderProps> = ({
  courseName,
  courseDescription,
  courseSlug,
  currentStage,
}) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
      <div>
        {/* Breadcrumb */}
        <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/creator/cursos" className="transition-colors hover:text-foreground">
            Cursos
          </Link>
          <Icon name="angle-right" size="size-3" />
          <span className="font-medium text-foreground">{courseName}</span>
        </div>

        {/* Title + Status */}
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-foreground">{courseName}</h1>
          <Badge
            variant="outline"
            className="border-studio-primary/30 text-xs uppercase tracking-wider text-studio-primary"
          >
            {currentStage}
          </Badge>
        </div>

        {courseDescription && (
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{courseDescription}</p>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={() => navigate('/creator/cursos')}>
          <Icon name="arrow-left" size="size-4" className="mr-2" />
          Voltar
        </Button>
        <Button
          size="sm"
          className="text-white"
          style={{ backgroundColor: STUDIO_PRIMARY }}
          onClick={() => navigate(`/creator/cursos/${courseSlug}/licoes`)}
        >
          <Icon name="play" size="size-4" className="mr-2" />
          Continuar Producao
        </Button>
      </div>
    </div>
  );
};

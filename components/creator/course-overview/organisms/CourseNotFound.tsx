import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Section } from '@/types';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import CreatorTopbar from '../../CreatorTopbar';
import { STUDIO_ACCENT, STUDIO_PRIMARY } from '../../studio-tokens';

interface CourseNotFoundProps {
  slug: string | undefined;
  setSection: (s: Section) => void;
}

export const CourseNotFound: React.FC<CourseNotFoundProps> = ({ slug, setSection }) => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col bg-background font-sans">
      <CreatorTopbar currentSection={Section.APP_CREATOR_COURSES} setSection={setSection} />
      <main className="mx-auto w-full max-w-[1400px] p-6 md:p-8">
        <div className="flex min-h-[60vh] flex-col items-center justify-center">
          <div
            className="mb-6 flex h-16 w-16 items-center justify-center rounded-lg"
            style={{ backgroundColor: STUDIO_ACCENT }}
          >
            <Icon name="exclamation-triangle" style={{ color: STUDIO_PRIMARY }} size="size-8" />
          </div>
          <h2 className="mb-2 text-2xl font-bold">Curso nao encontrado</h2>
          <p className="mb-6 text-muted-foreground">
            O curso "{slug}" nao existe ou foi removido.
          </p>
          <Button
            onClick={() => navigate('/creator/cursos')}
            style={{ backgroundColor: STUDIO_PRIMARY }}
            className="text-white"
          >
            <Icon name="arrow-left" className="mr-2" size="size-4" />
            Voltar para Cursos
          </Button>
        </div>
      </main>
    </div>
  );
};

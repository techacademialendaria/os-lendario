import React from 'react';
import { Card, CardContent } from '../../../ui/card';
import { Button } from '../../../ui/button';
import { Icon } from '../../../ui/icon';
import { Input } from '../../../ui/input';
import { Select } from '../../../ui/select';
import { cn } from '../../../../lib/utils';
import { CoursesHeader } from '../../ui';
import type { CourseMode } from '../types';

interface NewCourseViewProps {
  mode: CourseMode | null;
  setMode: (mode: CourseMode | null) => void;
  slug: string;
  handleSlugChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  persona: string;
  setPersona: (persona: string) => void;
  isCreating: boolean;
  isValid: boolean;
  onBack: () => void;
  onBreadcrumbClick: () => void;
  onCreateCourse: () => void;
}

export const NewCourseView: React.FC<NewCourseViewProps> = ({
  mode,
  setMode,
  slug,
  handleSlugChange,
  persona,
  setPersona,
  isCreating,
  isValid,
  onBack,
  onBreadcrumbClick,
  onCreateCourse,
}) => {
  return (
    <>
      <CoursesHeader
        title="Novo Curso"
        breadcrumb="Novo"
        showBackButton
        onBack={onBack}
        onBreadcrumbClick={onBreadcrumbClick}
      />
      <div className="mx-auto max-w-4xl animate-fade-in space-y-12 pb-20">
        <div className="space-y-6">
          <h3 className="font-sans text-xl font-bold">Como você quer criar seu curso?</h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Card
              className={cn(
                'cursor-pointer border-2 transition-all duration-300 hover:shadow-lg',
                mode === 'greenfield'
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50'
              )}
              onClick={() => setMode('greenfield')}
            >
              <CardContent className="space-y-6 p-8">
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-green/10 text-brand-green">
                    <Icon name="flower-tulip" size="size-6" />
                  </div>
                  {mode === 'greenfield' && (
                    <Icon name="check-circle" className="size-6 text-studio-primary" type="solid" />
                  )}
                </div>
                <div>
                  <h4 className="text-lg font-bold">Greenfield (Do Zero)</h4>
                  <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                    Recomendado
                  </p>
                </div>
                <p className="font-serif text-sm leading-relaxed text-muted-foreground">
                  Crie uma estrutura pedagógica perfeita (GPS + Didática Lendária) sem vícios antigos.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div
          className="space-y-6 transition-opacity duration-500"
          style={{ opacity: mode ? 1 : 0.3, pointerEvents: mode ? 'auto' : 'none' }}
        >
          <h3 className="font-sans text-xl font-bold">Configuração Inicial</h3>
          <Card>
            <CardContent className="space-y-6 p-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Slug do Curso</label>
                  <Input
                    placeholder="ex: vendas-b2b-avancado"
                    value={slug}
                    onChange={handleSlugChange}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Instrutor / Persona</label>
                  <Select
                    placeholder="Selecione um instrutor..."
                    value={persona}
                    onValueChange={setPersona}
                    options={[{ label: 'MMOS: Alan Nicolas', value: 'an' }]}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end gap-4 border-t border-border pt-8">
          <Button variant="ghost" onClick={onBack}>
            Cancelar
          </Button>
          <Button onClick={onCreateCourse} disabled={!isValid} className="min-w-[140px]">
            {isCreating ? (
              <Icon name="refresh" className="mr-2 animate-spin" />
            ) : (
              <>
                Criar Curso <Icon name="arrow-right" className="ml-2" />
              </>
            )}
          </Button>
        </div>
      </div>
    </>
  );
};

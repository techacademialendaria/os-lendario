import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Section } from '../../../types';
import { Card, CardContent } from '../../ui/card';
import { Button } from '../../ui/button';
import { Icon } from '../../ui/icon';
import { Input } from '../../ui/input';
import { Select } from '../../ui/select';
import { cn } from '../../../lib/utils';
import CreatorTopbar from '../CreatorTopbar';
import CourseBreadcrumb from './CourseBreadcrumb';
import { STUDIO_PRIMARY, STUDIO_GOLD, STUDIO_ACCENT } from '../studio-tokens';

interface CourseNewProps {
  setSection: (s: Section) => void;
}

const CourseNew: React.FC<CourseNewProps> = ({ setSection }) => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<'greenfield' | 'brownfield' | null>(null);
  const [slug, setSlug] = useState('');
  const [persona, setPersona] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateCourse = () => {
    if (!slug || !mode) return;
    setIsCreating(true);
    // TODO: Create course in Supabase
    setTimeout(() => {
      setIsCreating(false);
      navigate(`/creator/cursos/${slug}/brief`);
    }, 1500);
  };

  return (
    <div className="flex min-h-screen flex-col bg-background pb-20 font-sans">
      <CreatorTopbar currentSection={Section.APP_CREATOR_COURSES} setSection={setSection} />
      <main className="mx-auto w-full max-w-[1400px] p-6 md:p-12">
        <CourseBreadcrumb
          items={[{ label: 'Cursos', href: '/creator/cursos' }, { label: 'Novo Curso' }]}
          title="Novo Curso"
          actions={
            <Button variant="outline" onClick={() => navigate('/creator/cursos')}>
              <Icon name="angle-left" className="mr-2 size-4" /> Voltar
            </Button>
          }
        />

        <div className="mx-auto max-w-4xl animate-fade-in space-y-12 pb-20">
          <div className="space-y-6">
            <h3 className="font-sans text-xl font-bold">Como você quer criar seu curso?</h3>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Greenfield Card */}
              <Card
                className={cn(
                  'cursor-pointer border-2 transition-all duration-300 hover:shadow-lg',
                  mode === 'greenfield'
                    ? 'bg-studio-primary/10'
                    : 'border-border hover:border-studio-primary/50'
                )}
                style={mode === 'greenfield' ? { borderColor: STUDIO_PRIMARY } : {}}
                onClick={() => setMode('greenfield')}
              >
                <CardContent className="space-y-6 p-8">
                  <div className="flex items-center justify-between">
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-xl transition-colors bg-studio-accent text-studio-primary"
                    >
                      <Icon name="flower-tulip" size="size-6" />
                    </div>
                    {mode === 'greenfield' && (
                      <Icon
                        name="check-circle"
                        size="size-6"
                        type="solid"
                        className="text-studio-primary"
                      />
                    )}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold">Greenfield (Do Zero)</h4>
                    <p
                      className="font-mono text-xs uppercase tracking-wider text-studio-primary"
                    >
                      Recomendado
                    </p>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    Crie uma estrutura pedagógica perfeita (GPS + Didática Lendária) sem vícios
                    antigos.
                  </p>
                </CardContent>
              </Card>

              {/* Brownfield Card */}
              <Card
                className={cn(
                  'cursor-pointer border-2 transition-all duration-300 hover:shadow-lg',
                  mode === 'brownfield'
                    ? 'bg-studio-primary/10'
                    : 'border-border hover:border-studio-primary/50'
                )}
                style={mode === 'brownfield' ? { borderColor: STUDIO_PRIMARY } : {}}
                onClick={() => setMode('brownfield')}
              >
                <CardContent className="space-y-6 p-8">
                  <div className="flex items-center justify-between">
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-xl transition-colors bg-studio-accent text-studio-gold"
                    >
                      <Icon name="upload" size="size-6" />
                    </div>
                    {mode === 'brownfield' && (
                      <Icon
                        name="check-circle"
                        size="size-6"
                        type="solid"
                        className="text-studio-primary"
                      />
                    )}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold">Brownfield (Existente)</h4>
                    <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                      Migração
                    </p>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    Importe um curso existente e aprimore com IA e frameworks pedagógicos.
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
                      onChange={(e) => setSlug(e.target.value)}
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
            <Button variant="ghost" onClick={() => navigate('/creator/cursos')}>
              Cancelar
            </Button>
            <Button
              onClick={handleCreateCourse}
              disabled={!mode || !slug}
              className="min-w-[140px] text-white bg-studio-primary hover:bg-studio-primary/90"
            >
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
      </main>
    </div>
  );
};

export default CourseNew;

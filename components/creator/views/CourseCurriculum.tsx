// @ts-nocheck
import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Section } from '../../../types';
import { Card, CardContent } from '../../ui/card';
import { Button } from '../../ui/button';
import { Icon } from '../../ui/icon';
import { Badge } from '../../ui/badge';
import { Input } from '../../ui/input';
import { cn } from '../../../lib/utils';
import { useCourse } from '../../../hooks/useCourse';
import { useCourseContents, CourseModule, CourseLesson } from '../../../hooks/useCourseContents';
import { STUDIO_PRIMARY, STUDIO_GOLD } from '../studio-tokens';
import CreatorTopbar from '../CreatorTopbar';

interface CourseCurriculumProps {
  setSection: (s: Section) => void;
}

const CourseCurriculum: React.FC<CourseCurriculumProps> = ({ setSection }) => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { course, loading: courseLoading } = useCourse(slug);
  const { content, loading: contentLoading } = useCourseContents(slug);

  // Edit states
  const [editingModuleId, setEditingModuleId] = useState<string | null>(null);
  const [editingLessonId, setEditingLessonId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState('');
  const [hasChanges, setHasChanges] = useState(false);

  const loading = courseLoading || contentLoading;

  // Handlers
  const handleEditModule = (mod: CourseModule) => {
    setEditingModuleId(mod.id);
    setEditingTitle(mod.title);
  };

  const handleEditLesson = (les: CourseLesson) => {
    setEditingLessonId(les.id);
    setEditingTitle(les.title);
  };

  const handleSaveEdit = () => {
    // TODO: Implement save to database
    console.log('Saving:', editingModuleId || editingLessonId, editingTitle);
    setEditingModuleId(null);
    setEditingLessonId(null);
    setEditingTitle('');
    setHasChanges(true);
  };

  const handleCancelEdit = () => {
    setEditingModuleId(null);
    setEditingLessonId(null);
    setEditingTitle('');
  };

  const handleAddModule = () => {
    // TODO: Implement add module
    console.log('Add module');
    setHasChanges(true);
  };

  const handleAddLesson = (moduleId: string) => {
    // TODO: Implement add lesson
    console.log('Add lesson to module:', moduleId);
    setHasChanges(true);
  };

  const handleDeleteModule = (moduleId: string) => {
    // TODO: Implement delete with confirmation
    console.log('Delete module:', moduleId);
    setHasChanges(true);
  };

  const handleDeleteLesson = (lessonId: string) => {
    // TODO: Implement delete with confirmation
    console.log('Delete lesson:', lessonId);
    setHasChanges(true);
  };

  const handleSaveAll = () => {
    // TODO: Implement save all changes
    console.log('Save all changes');
    setHasChanges(false);
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex min-h-screen flex-col bg-[#0A0A0F] font-sans">
        <CreatorTopbar currentSection={Section.APP_CREATOR_COURSES} setSection={setSection} />
        <main className="mx-auto w-full max-w-[1400px] flex-1 px-6 py-8 md:px-12">
          <div className="mx-auto max-w-[1000px]">
            <div className="mb-3 h-4 w-48 animate-pulse rounded bg-muted/20" />
            <div className="mb-8 h-8 w-64 animate-pulse rounded bg-muted/30" />
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-24 animate-pulse rounded-xl border border-border/30 bg-muted/10"
                />
              ))}
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Not found state
  if (!course) {
    return (
      <div className="flex min-h-screen flex-col bg-[#0A0A0F] font-sans">
        <CreatorTopbar currentSection={Section.APP_CREATOR_COURSES} setSection={setSection} />
        <main className="flex flex-1 flex-col items-center justify-center">
          <Icon name="exclamation" className="mb-4 text-destructive" size="size-12" />
          <h2 className="mb-2 text-2xl font-bold">Curso não encontrado</h2>
          <Button onClick={() => navigate('/creator/cursos')}>Voltar para Cursos</Button>
        </main>
      </div>
    );
  }

  const modules = content?.modules || [];
  const totalLessons = content?.totalLessons || 0;
  const totalModules = content?.totalModules || 0;

  return (
    <div className="flex min-h-screen flex-col bg-[#0A0A0F] font-sans">
      <CreatorTopbar currentSection={Section.APP_CREATOR_COURSES} setSection={setSection} />

      {/* SUB-HEADER */}
      <div className="border-b border-border/50 bg-[#0A0A0F]/95">
        <div className="mx-auto max-w-[1400px] px-6 py-4 md:px-12">
          {/* Breadcrumb */}
          <nav className="mb-3 flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/creator/cursos" className="transition-colors hover:text-foreground">
              Cursos
            </Link>
            <Icon name="angle-right" size="size-3" />
            <Link
              to={`/creator/cursos/${slug}`}
              className="transition-colors hover:text-foreground"
            >
              {course.name}
            </Link>
            <Icon name="angle-right" size="size-3" />
            <span className="text-foreground">Editar Currículo</span>
          </nav>

          {/* Title row */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="flex items-center gap-2 text-xl font-bold text-foreground">
                <Icon name="pencil" size="size-5" className="text-studio-primary" />
                Editor de Currículo
              </h1>
              <p className="mt-0.5 text-sm text-muted-foreground">
                {totalModules} módulos · {totalLessons} lições
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate(`/creator/cursos/${slug}`)}
                className="border-border/50 hover:bg-muted/20"
              >
                <Icon name="angle-left" className="mr-2" size="size-4" /> Voltar
              </Button>
              {hasChanges && (
                <Button
                  size="sm"
                  onClick={handleSaveAll}
                  className="font-semibold text-[#0A0A0F] bg-studio-gold hover:bg-studio-gold/90"
                >
                  <Icon name="check" className="mr-2" size="size-4" /> Salvar Alterações
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* TOOLBAR */}
      <div className="border-b border-border/30 bg-card/20">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-3 md:px-12">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Icon name="info-circle" size="size-3" />
            <span>
              Arraste para reordenar · Clique no título para editar · Use os botões + para adicionar
            </span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleAddModule}
            className="border-dashed border-[#538096]/50 text-[#538096] hover:bg-[#538096]/10"
          >
            <Icon name="plus" className="mr-2" size="size-4" /> Novo Módulo
          </Button>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <main className="mx-auto w-full max-w-[1400px] flex-1 px-6 py-6 md:px-12">
        {modules.length === 0 ? (
          <Card className="border-dashed border-border/30 bg-card/30">
            <CardContent className="p-12 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted/20">
                <Icon name="folder-open" size="size-8" className="text-muted-foreground" />
              </div>
              <h3 className="mb-2 text-lg font-bold">Currículo vazio</h3>
              <p className="mb-6 text-sm text-muted-foreground">
                Comece adicionando o primeiro módulo do seu curso.
              </p>
              <Button
                onClick={handleAddModule}
                className="text-white bg-studio-primary hover:bg-studio-primary/90"
              >
                <Icon name="plus" className="mr-2" size="size-4" /> Criar Primeiro Módulo
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {modules.map((mod, modIndex) => (
              <Card
                key={mod.id}
                className="group/module overflow-hidden border-border/30 bg-card/30"
              >
                {/* Module Header */}
                <div className="flex items-center gap-3 border-b border-border/30 bg-card/50 px-4 py-3">
                  {/* Drag Handle */}
                  <div className="cursor-grab text-muted-foreground/40 transition-colors hover:text-muted-foreground">
                    <Icon name="menu-dots-vertical" size="size-4" />
                  </div>

                  {/* Module Badge */}
                  <div
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold bg-studio-primary/20 text-studio-primary"
                  >
                    M{modIndex + 1}
                  </div>

                  {/* Module Title (Editable) */}
                  {editingModuleId === mod.id ? (
                    <div className="flex flex-1 items-center gap-2">
                      <Input
                        value={editingTitle}
                        onChange={(e) => setEditingTitle(e.target.value)}
                        className="h-8 bg-background text-sm font-semibold"
                        autoFocus
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleSaveEdit();
                          if (e.key === 'Escape') handleCancelEdit();
                        }}
                      />
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-7 w-7"
                        onClick={handleSaveEdit}
                      >
                        <Icon name="check" size="size-3" className="text-emerald-500" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-7 w-7"
                        onClick={handleCancelEdit}
                      >
                        <Icon name="cross" size="size-3" className="text-muted-foreground" />
                      </Button>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleEditModule(mod)}
                      className="flex-1 text-left font-semibold text-foreground transition-colors hover:text-[#538096]"
                    >
                      {mod.title}
                    </button>
                  )}

                  {/* Module Meta */}
                  <Badge variant="secondary" className="bg-muted/30 text-[10px]">
                    {mod.lessons.length} aulas
                  </Badge>

                  {/* Module Actions */}
                  <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover/module:opacity-100">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-7 w-7 text-muted-foreground hover:text-foreground"
                      onClick={() => handleAddLesson(mod.id)}
                      title="Adicionar aula"
                    >
                      <Icon name="plus" size="size-3" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-7 w-7 text-muted-foreground hover:text-destructive"
                      onClick={() => handleDeleteModule(mod.id)}
                      title="Excluir módulo"
                    >
                      <Icon name="trash" size="size-3" />
                    </Button>
                  </div>
                </div>

                {/* Lessons */}
                <div className="divide-y divide-border/20">
                  {mod.lessons.map((les, lesIndex) => (
                    <div
                      key={les.id}
                      className="group/lesson flex items-center gap-3 px-4 py-2.5 transition-colors hover:bg-muted/5"
                    >
                      {/* Drag Handle */}
                      <div className="cursor-grab pl-4 text-muted-foreground/30 transition-colors hover:text-muted-foreground">
                        <Icon name="menu-dots-vertical" size="size-3" />
                      </div>

                      {/* Lesson Number */}
                      <span className="w-8 shrink-0 font-mono text-xs text-muted-foreground">
                        {modIndex + 1}.{lesIndex + 1}
                      </span>

                      {/* Lesson Title (Editable) */}
                      {editingLessonId === les.id ? (
                        <div className="flex flex-1 items-center gap-2">
                          <Input
                            value={editingTitle}
                            onChange={(e) => setEditingTitle(e.target.value)}
                            className="h-7 bg-background text-sm"
                            autoFocus
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') handleSaveEdit();
                              if (e.key === 'Escape') handleCancelEdit();
                            }}
                          />
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-6 w-6"
                            onClick={handleSaveEdit}
                          >
                            <Icon name="check" size="size-3" className="text-emerald-500" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-6 w-6"
                            onClick={handleCancelEdit}
                          >
                            <Icon name="cross" size="size-3" className="text-muted-foreground" />
                          </Button>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleEditLesson(les)}
                          className="flex-1 truncate text-left text-sm text-foreground/80 transition-colors hover:text-[#538096]"
                        >
                          {les.title}
                        </button>
                      )}

                      {/* Lesson Status */}
                      <Badge
                        variant="secondary"
                        className={cn(
                          'shrink-0 text-[10px]',
                          les.status === 'published'
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : 'bg-muted/30 text-muted-foreground'
                        )}
                      >
                        {les.status === 'published' ? 'Publicado' : 'Rascunho'}
                      </Badge>

                      {/* Lesson Actions */}
                      <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover/lesson:opacity-100">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-6 w-6 text-muted-foreground hover:text-foreground"
                          onClick={() => navigate(`/creator/cursos/${slug}/licoes/${les.id}`)}
                          title="Editar conteúdo"
                        >
                          <Icon name="arrow-right" size="size-3" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-6 w-6 text-muted-foreground hover:text-destructive"
                          onClick={() => handleDeleteLesson(les.id)}
                          title="Excluir aula"
                        >
                          <Icon name="trash" size="size-3" />
                        </Button>
                      </div>
                    </div>
                  ))}

                  {/* Add Lesson Button (inside module) */}
                  <button
                    onClick={() => handleAddLesson(mod.id)}
                    className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-muted/5 hover:text-[#538096]"
                  >
                    <div className="pl-4">
                      <Icon name="plus" size="size-3" />
                    </div>
                    <span className="w-8 font-mono text-xs">
                      {modIndex + 1}.{mod.lessons.length + 1}
                    </span>
                    <span>Adicionar aula...</span>
                  </button>
                </div>
              </Card>
            ))}

            {/* Add Module Button */}
            <button
              onClick={handleAddModule}
              className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border/30 p-4 text-muted-foreground transition-colors hover:border-[#538096]/50 hover:text-[#538096]"
            >
              <Icon name="plus" size="size-4" />
              <span className="font-medium">Adicionar Módulo</span>
            </button>
          </div>
        )}
      </main>

      {/* FOOTER with save indicator */}
      {hasChanges && (
        <div className="sticky bottom-0 border-t border-border/50 bg-[#0A0A0F]/95 backdrop-blur-sm">
          <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-3 md:px-12">
            <div className="flex items-center gap-2 text-sm text-amber-500">
              <Icon name="exclamation" size="size-4" />
              <span>Você tem alterações não salvas</span>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" onClick={() => setHasChanges(false)}>
                Descartar
              </Button>
              <Button
                size="sm"
                onClick={handleSaveAll}
                className="font-semibold text-[#0A0A0F] bg-studio-gold hover:bg-studio-gold/90"
              >
                <Icon name="check" className="mr-2" size="size-4" /> Salvar Alterações
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseCurriculum;

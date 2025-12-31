// @ts-nocheck
import React, { useState, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Section } from '../../../types';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Icon } from '../../ui/icon';
import { Badge } from '../../ui/badge';
import { Input } from '../../ui/input';
import CreatorTopbar from '../CreatorTopbar';
import CourseBreadcrumb from './CourseBreadcrumb';
import { useCourse } from '../../../hooks/useCourse';
import { useCourseContents } from '../../../hooks/useCourseContents';

interface CourseLessonsProps {
  setSection: (s: Section) => void;
}

const CourseLessons: React.FC<CourseLessonsProps> = ({ setSection }) => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { course, loading: courseLoading } = useCourse(slug);
  const { content, loading: contentLoading } = useCourseContents(slug);

  const loading = courseLoading || contentLoading;

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col bg-background font-sans">
        <CreatorTopbar currentSection={Section.APP_CREATOR_COURSES} setSection={setSection} />
        <main className="mx-auto w-full max-w-[1400px] p-6 md:p-12">
          {/* Breadcrumb skeleton */}
          <div className="mb-8">
            <div className="mb-2 h-4 w-40 animate-pulse rounded bg-muted" />
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="h-8 w-28 animate-pulse rounded bg-muted" />
                <div className="h-4 w-32 animate-pulse rounded bg-muted/60" />
              </div>
              <div className="h-9 w-24 animate-pulse rounded bg-muted" />
            </div>
          </div>

          <div className="space-y-6">
            {/* Search skeleton */}
            <div className="h-10 w-full animate-pulse rounded bg-muted" />

            {/* Lessons table skeleton */}
            <Card>
              <CardHeader>
                <div className="h-6 w-32 animate-pulse rounded bg-muted" />
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-border">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                    <div key={i} className="flex items-center justify-between p-4">
                      <div className="flex items-center gap-4">
                        <div className="h-4 w-10 animate-pulse rounded bg-muted/40" />
                        <div className="space-y-1">
                          <div className="h-5 w-56 animate-pulse rounded bg-muted" />
                          <div className="h-3 w-32 animate-pulse rounded bg-muted/40" />
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="h-5 w-10 animate-pulse rounded bg-muted/60" />
                        <div className="h-5 w-16 animate-pulse rounded bg-muted/60" />
                        <div className="h-4 w-4 animate-pulse rounded bg-muted/40" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="flex min-h-screen flex-col bg-background font-sans">
        <CreatorTopbar currentSection={Section.APP_CREATOR_COURSES} setSection={setSection} />
        <main className="mx-auto w-full max-w-[1400px] p-6 md:p-12">
          <div className="flex min-h-[40vh] animate-fade-in flex-col items-center justify-center">
            <Icon name="exclamation" className="mb-4 text-destructive" size="size-12" />
            <h2 className="mb-2 text-2xl font-bold">Curso não encontrado</h2>
            <Button onClick={() => navigate('/creator/cursos')}>Voltar para Cursos</Button>
          </div>
        </main>
      </div>
    );
  }

  // Flatten all lessons from all modules
  const allLessons =
    content?.modules.flatMap((mod, modIndex) =>
      mod.lessons.map((les, lesIndex) => ({
        ...les,
        moduleTitle: mod.title,
        moduleIndex: modIndex + 1,
        lessonIndex: lesIndex + 1,
      }))
    ) || [];

  // Search state
  const [searchQuery, setSearchQuery] = useState('');

  // Filtered lessons
  const filteredLessons = useMemo(() => {
    if (!searchQuery.trim()) return allLessons;
    const query = searchQuery.toLowerCase();
    return allLessons.filter(
      (les) =>
        les.title.toLowerCase().includes(query) ||
        les.moduleTitle.toLowerCase().includes(query) ||
        `${les.moduleIndex}.${les.lessonIndex}`.includes(query)
    );
  }, [allLessons, searchQuery]);

  return (
    <div className="flex min-h-screen flex-col bg-background pb-20 font-sans">
      <CreatorTopbar currentSection={Section.APP_CREATOR_COURSES} setSection={setSection} />
      <main className="mx-auto w-full max-w-[1400px] p-6 md:p-12">
        <CourseBreadcrumb
          items={[
            { label: 'Cursos', href: '/creator/cursos' },
            { label: course.name, href: `/creator/cursos/${slug}` },
            { label: 'Lições' },
          ]}
          title="Lições"
          subtitle={`${allLessons.length} lições no total`}
          actions={
            <Button variant="outline" onClick={() => navigate(`/creator/cursos/${slug}`)}>
              <Icon name="angle-left" className="mr-2 size-4" /> Voltar
            </Button>
          }
        />

        <div className="animate-fade-in space-y-6">
          {/* Search and filters */}
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Icon
                name="search"
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                size="size-4"
              />
              <Input
                placeholder="Buscar por título, módulo ou número..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            {searchQuery && (
              <Button variant="outline" onClick={() => setSearchQuery('')}>
                Limpar
              </Button>
            )}
          </div>

          {/* Lessons Table */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Todas as Lições</CardTitle>
              {searchQuery && (
                <span className="text-sm text-muted-foreground">
                  {filteredLessons.length} de {allLessons.length} lições
                </span>
              )}
            </CardHeader>
            <CardContent className="p-0">
              {allLessons.length === 0 ? (
                <div className="p-12 text-center">
                  <Icon name="play" className="mx-auto mb-4 text-muted-foreground" size="size-12" />
                  <h3 className="mb-2 text-lg font-bold">Nenhuma lição encontrada</h3>
                  <p className="text-sm text-muted-foreground">Este curso ainda não tem lições.</p>
                </div>
              ) : filteredLessons.length === 0 ? (
                <div className="p-12 text-center">
                  <Icon
                    name="search"
                    className="mx-auto mb-4 text-muted-foreground"
                    size="size-10"
                  />
                  <h3 className="mb-2 text-lg font-bold">Nenhum resultado</h3>
                  <p className="mb-4 text-sm text-muted-foreground">
                    Nenhuma lição corresponde à busca "{searchQuery}"
                  </p>
                  <Button variant="outline" onClick={() => setSearchQuery('')}>
                    Limpar Busca
                  </Button>
                </div>
              ) : (
                <div className="divide-y divide-border">
                  {filteredLessons.map((lesson) => (
                    <Link
                      key={lesson.id}
                      to={`/creator/cursos/${slug}/licoes/${lesson.id}`}
                      className="flex items-center justify-between p-4 transition-colors hover:bg-muted/10"
                    >
                      <div className="flex items-center gap-4">
                        <span className="w-10 font-mono text-xs text-muted-foreground">
                          {lesson.moduleIndex}.{lesson.lessonIndex}
                        </span>
                        <div>
                          <p className="font-medium">{lesson.title}</p>
                          <p className="text-xs text-muted-foreground">{lesson.moduleTitle}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        {lesson.fidelity_score !== undefined && lesson.fidelity_score !== null && (
                          <Badge
                            variant={
                              lesson.fidelity_score >= 0.8
                                ? 'success'
                                : lesson.fidelity_score >= 0.6
                                  ? 'warning'
                                  : 'destructive'
                            }
                            className="text-[10px]"
                          >
                            {Math.round(lesson.fidelity_score * 100)}%
                          </Badge>
                        )}
                        <Badge
                          variant={lesson.status === 'published' ? 'success' : 'outline'}
                          className="text-[10px]"
                        >
                          {lesson.status}
                        </Badge>
                        <Icon name="angle-right" className="text-muted-foreground" size="size-4" />
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default CourseLessons;

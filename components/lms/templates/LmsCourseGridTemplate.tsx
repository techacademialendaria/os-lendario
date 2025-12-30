import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../ui/button';
import { Icon } from '../../ui/icon';
import { cn } from '../../../lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';
import { useLmsCourses, useLmsCategories } from '../../../hooks/lms';
import { Skeleton } from '../../ui/skeleton';
import { Badge } from '../../ui/badge';

// Color palettes for organic liquid backgrounds (Academia Lendária brand)
const liquidPalettes = [
  { bg: 'bg-zinc-950', blobs: ['bg-brand-indigo', 'bg-brand-teal', 'bg-brand-gold'] },
  { bg: 'bg-zinc-950', blobs: ['bg-brand-pink', 'bg-brand-orange', 'bg-brand-gold'] },
  { bg: 'bg-zinc-950', blobs: ['bg-brand-teal', 'bg-brand-mint', 'bg-brand-blue'] },
  { bg: 'bg-zinc-950', blobs: ['bg-brand-gold', 'bg-brand-brown', 'bg-brand-orange'] },
  { bg: 'bg-zinc-950', blobs: ['bg-brand-blue', 'bg-brand-cyan', 'bg-brand-indigo'] },
  { bg: 'bg-zinc-950', blobs: ['bg-brand-pink', 'bg-brand-indigo', 'bg-brand-teal'] },
];

// Get palette based on string hash for consistency
const getPalette = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return liquidPalettes[Math.abs(hash) % liquidPalettes.length];
};

// Course cover component - shows image or liquid organic fallback with category icon
const CourseCover = ({
  image,
  title,
  className = '',
  showTitle = true,
  categoryIcon,
}: {
  image?: string | null;
  title: string;
  className?: string;
  showTitle?: boolean;
  categoryIcon?: string;
}) => {
  if (image) {
    return <img src={image} alt={title} className={cn('h-full w-full object-cover', className)} />;
  }

  const palette = getPalette(title);

  return (
    <div className={cn('relative h-full w-full overflow-hidden', palette.bg, className)}>
      {/* Organic liquid blobs */}
      <div
        className={cn(
          'absolute -left-1/4 -top-1/4 h-3/4 w-3/4 rounded-full opacity-60 blur-3xl',
          palette.blobs[0]
        )}
      />
      <div
        className={cn(
          'absolute -bottom-1/4 -right-1/4 h-2/3 w-2/3 rounded-full opacity-50 blur-3xl',
          palette.blobs[1]
        )}
      />
      <div
        className={cn(
          'absolute left-1/3 top-1/2 h-1/2 w-1/2 rounded-full opacity-40 blur-2xl',
          palette.blobs[2]
        )}
      />
      {/* Category icon watermark */}
      {categoryIcon && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Icon name={categoryIcon} className="text-6xl text-white/20" />
        </div>
      )}
      {/* Title overlay */}
      {showTitle && (
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <h3 className="line-clamp-3 text-center font-serif text-xl font-bold leading-tight text-white drop-shadow-lg">
            {title}
          </h3>
        </div>
      )}
    </div>
  );
};

// Category icons mapping
const categoryIcons: Record<string, string> = {
  fundamentals: 'book-open',
  projects: 'code',
  business: 'briefcase',
  tools: 'settings',
  legendary_mind: 'brain',
  marketing: 'megaphone',
};

// Category display order (Fundamentos primeiro, Todos por último)
const categoryOrder = ['fundamentals', 'legendary_mind', 'projects', 'tools'];

export default function LmsCourseGridTemplate() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<string>('fundamentals'); // Start with fundamentals
  const { courses, loading } = useLmsCourses();
  const { categories } = useLmsCategories();

  const goToCourse = (slug: string) => {
    navigate(`/lms/cursos/${slug}`);
  };

  // Get first category icon for a course
  const getCourseIcon = (tags: { slug: string }[]) => {
    const firstTag = tags[0]?.slug;
    return firstTag ? categoryIcons[firstTag] : undefined;
  };

  // Filter courses by selected category
  const filteredCourses =
    activeCategory === 'all'
      ? courses
      : courses.filter((c) => c.tags.some((t) => t.slug === activeCategory));

  // Courses with real progress (completedLessons > 0)
  const coursesInProgress = courses.filter((c) => c.progress.completedLessons > 0);

  // Get courses by category
  const getCoursesByCategory = (categorySlug: string) => {
    return courses.filter((c) => c.tags.some((t) => t.slug === categorySlug));
  };

  // Loading skeleton
  if (loading) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="container mx-auto max-w-7xl space-y-8">
          <Skeleton className="h-16 w-full" />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-64 w-full rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen animate-fade-in bg-background pb-20 font-sans text-foreground">
      {/* --- Top Bar --- */}
      <header className="sticky top-0 z-50 h-16 border-b border-border bg-background/90 backdrop-blur-xl transition-all duration-300">
        <div className="container mx-auto flex h-full max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold tracking-tight">
              Academia Lendár<span className="text-primary">[IA]</span>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="mr-4 hidden items-center gap-6 text-sm font-medium text-muted-foreground md:flex">
              <span className="flex h-16 cursor-pointer items-center border-b-2 border-foreground font-bold text-foreground">
                Início
              </span>
              <span className="cursor-pointer transition-colors hover:text-foreground">
                Minha Lista
              </span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground"
            >
              <Icon name="search" size="size-4" />
            </Button>
            <Avatar className="h-8 w-8 border border-border">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>AL</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <main>
        {/* --- Section: Continuar Aprendendo (only if has progress) --- */}
        {coursesInProgress.length > 0 && (
          <section className="border-b border-border/50 bg-secondary/40 py-12">
            <div className="container mx-auto max-w-7xl px-6">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-foreground">Continuar Aprendendo</h2>
                <Button variant="link" className="text-sm font-semibold text-primary">
                  Ver tudo <Icon name="angle-small-right" />
                </Button>
              </div>

              <div className="scrollbar-hide -mx-6 flex snap-x gap-6 overflow-x-auto px-6 pb-6">
                {coursesInProgress.map((course) => (
                  <div
                    key={course.id}
                    className="group min-w-[320px] cursor-pointer snap-center overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all hover:shadow-md md:min-w-[380px]"
                    onClick={() => goToCourse(course.slug)}
                  >
                    {/* Header Info */}
                    <div className="flex items-start gap-3 border-b border-border bg-background/50 p-4">
                      <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg border border-border">
                        <CourseCover
                          image={course.thumbnail}
                          title={course.title}
                          showTitle={false}
                          categoryIcon={getCourseIcon(course.tags)}
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="truncate text-sm font-bold">{course.title}</h4>
                        <p className="mt-0.5 text-xs text-muted-foreground">
                          {course.progress.completedLessons} de {course.stats.totalLessons} aulas
                        </p>
                        <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-muted">
                          <div
                            className="h-full bg-primary transition-all"
                            style={{ width: `${course.progress.percentage}%` }}
                          />
                        </div>
                      </div>
                      <Icon name="angle-small-right" className="text-muted-foreground" />
                    </div>

                    {/* Course Visual */}
                    <div className="relative aspect-video transition-opacity group-hover:opacity-90">
                      <CourseCover
                        image={course.thumbnail}
                        title={course.title}
                        showTitle={!course.thumbnail}
                        categoryIcon={!course.thumbnail ? getCourseIcon(course.tags) : undefined}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-white/80">
                          {course.progress.percentage}% concluído
                        </p>
                        <h3 className="line-clamp-2 text-lg font-bold leading-tight text-white">
                          {course.title}
                        </h3>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/40 bg-white/20 backdrop-blur-md">
                          <Icon name="play" className="ml-1 text-white" />
                        </div>
                      </div>
                    </div>

                    {/* Footer Info */}
                    <div className="bg-card p-4">
                      <div className="mb-2 flex items-center justify-between">
                        <h5 className="line-clamp-1 text-sm font-bold">{course.title}</h5>
                        <span className="ml-2 whitespace-nowrap text-xs text-muted-foreground">
                          {course.stats.duration}
                        </span>
                      </div>
                      {course.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                          {course.tags.slice(0, 2).map((tag) => (
                            <Badge
                              key={tag.id}
                              variant="secondary"
                              className="px-2 py-0.5 text-[10px]"
                            >
                              {tag.name}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* --- Category Menu (Fundamentos primeiro, Todos por último) --- */}
        <section className="sticky top-16 z-30 border-b border-border bg-background/95 shadow-sm backdrop-blur-md">
          <div className="container mx-auto max-w-7xl px-6">
            <div className="scrollbar-hide flex items-center overflow-x-auto">
              <div className="flex min-w-max items-center gap-6">
                {/* Categories first (ordered) */}
                {categoryOrder
                  .map((slug) => categories.find((c) => c.slug === slug))
                  .filter(Boolean)
                  .map((cat) => (
                    <button
                      key={cat!.id}
                      onClick={() => setActiveCategory(cat!.slug)}
                      className={cn(
                        'group flex items-center gap-2 whitespace-nowrap border-b-2 py-4 text-sm font-medium transition-all',
                        activeCategory === cat!.slug
                          ? 'border-primary text-primary'
                          : 'border-transparent text-muted-foreground hover:border-border hover:text-foreground'
                      )}
                    >
                      <Icon
                        name={categoryIcons[cat!.slug] || 'tag'}
                        size="size-4"
                        className={cn(
                          'transition-colors',
                          activeCategory === cat!.slug
                            ? 'text-primary'
                            : 'text-muted-foreground group-hover:text-foreground'
                        )}
                      />
                      <span>{cat!.name}</span>
                    </button>
                  ))}

                {/* "Todos" button last */}
                <button
                  onClick={() => setActiveCategory('all')}
                  className={cn(
                    'group flex items-center gap-2 whitespace-nowrap border-b-2 py-4 text-sm font-medium transition-all',
                    activeCategory === 'all'
                      ? 'border-primary text-primary'
                      : 'border-transparent text-muted-foreground hover:border-border hover:text-foreground'
                  )}
                >
                  <Icon
                    name="grid"
                    size="size-4"
                    className={cn(
                      'transition-colors',
                      activeCategory === 'all'
                        ? 'text-primary'
                        : 'text-muted-foreground group-hover:text-foreground'
                    )}
                  />
                  <span>Todos</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* --- Section: Novos Lançamentos (last 3 courses) --- */}
        {courses.length > 0 && (
          <section className="border-b border-border/50 bg-secondary/40 py-12">
            <div className="container mx-auto max-w-7xl px-6">
              <h2 className="mb-8 text-2xl font-bold">Novos Lançamentos</h2>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {courses.slice(0, 3).map((course) => (
                  <div
                    key={course.id}
                    className="group cursor-pointer"
                    onClick={() => goToCourse(course.slug)}
                  >
                    <div className="relative mb-4 aspect-[16/9] overflow-hidden rounded-xl border border-border shadow-sm">
                      <CourseCover
                        image={course.thumbnail}
                        title={course.title}
                        showTitle={false}
                        categoryIcon={!course.thumbnail ? getCourseIcon(course.tags) : undefined}
                        className="transition-transform duration-700 group-hover:scale-105"
                      />

                      <div className="absolute inset-0 flex flex-col items-start justify-end bg-gradient-to-t from-black/90 via-black/20 to-transparent p-6 text-white">
                        <h3 className="mb-1 font-serif text-2xl font-bold italic tracking-wide">
                          {course.title}
                        </h3>
                        <p className="mb-4 text-xs font-bold uppercase tracking-widest text-white/70">
                          {course.instructor.name}
                        </p>
                        <div className="h-1 w-full overflow-hidden rounded-full bg-white/20">
                          <div className="h-full w-0 bg-white transition-all duration-1000 group-hover:w-full" />
                        </div>
                      </div>

                      <div className="absolute bottom-4 right-4 flex h-10 w-10 translate-y-4 transform items-center justify-center rounded-full bg-white text-black opacity-0 shadow-lg transition-all group-hover:translate-y-0 group-hover:opacity-100">
                        <Icon name="angle-small-right" size="size-5" />
                      </div>
                    </div>

                    <div className="flex items-start justify-between px-1">
                      <div>
                        <h4 className="font-bold text-foreground transition-colors group-hover:text-primary">
                          {course.title}
                        </h4>
                        <p className="text-xs text-muted-foreground">{course.instructor.name}</p>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Icon name="user" size="size-3" /> {course.stats.students}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* --- Sections by Category --- */}
        {categoryOrder.map((categorySlug) => {
          const category = categories.find((c) => c.slug === categorySlug);
          const categoryCourses = getCoursesByCategory(categorySlug);

          if (!category || categoryCourses.length === 0) return null;

          return (
            <section key={categorySlug} className="bg-background py-12">
              <div className="container mx-auto max-w-7xl px-6">
                <div className="mb-8 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon name={categoryIcons[categorySlug] || 'tag'} className="text-primary" />
                    <h2 className="text-2xl font-bold">{category.name}</h2>
                  </div>
                  <Button
                    variant="link"
                    className="text-sm font-bold text-primary"
                    onClick={() => setActiveCategory(categorySlug)}
                  >
                    Ver tudo <Icon name="angle-small-right" />
                  </Button>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                  {categoryCourses.slice(0, 4).map((course) => (
                    <div
                      key={course.id}
                      className="group cursor-pointer"
                      onClick={() => goToCourse(course.slug)}
                    >
                      <div className="relative mb-3 aspect-[4/3] overflow-hidden rounded-xl border border-border shadow-sm">
                        <CourseCover
                          image={course.thumbnail}
                          title={course.title}
                          showTitle={!course.thumbnail}
                          categoryIcon={!course.thumbnail ? categoryIcons[categorySlug] : undefined}
                          className="transition-transform duration-500 group-hover:scale-105"
                        />

                        {/* Category icon watermark on thumbnail */}
                        {!course.thumbnail && (
                          <div className="absolute bottom-2 right-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 backdrop-blur">
                              <Icon
                                name={categoryIcons[categorySlug] || 'tag'}
                                size="size-4"
                                className="text-white/60"
                              />
                            </div>
                          </div>
                        )}

                        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-md">
                            <Icon name="play" className="ml-0.5 text-white" size="size-4" />
                          </div>
                        </div>
                      </div>

                      <h4 className="mb-1 line-clamp-2 text-sm font-bold text-foreground transition-colors group-hover:text-primary">
                        {course.title}
                      </h4>
                      <p className="text-xs text-muted-foreground">{course.instructor.name}</p>
                      <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{course.stats.totalLessons} aulas</span>
                        <span>•</span>
                        <span>{course.stats.duration}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          );
        })}

        {/* --- Empty state --- */}
        {courses.length === 0 && (
          <section className="flex min-h-[400px] items-center justify-center">
            <div className="text-center">
              <Icon name="graduation-cap" className="mx-auto mb-4 text-6xl text-muted-foreground" />
              <h3 className="mb-2 text-xl font-bold">Nenhum curso disponível</h3>
              <p className="text-muted-foreground">Novos cursos serão adicionados em breve.</p>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

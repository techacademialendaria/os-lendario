import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../ui/button';
import { Icon } from '../../ui/icon';
import { cn } from '../../../lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';
import { useLmsCourses, useLmsCategories } from '../../../hooks/lms';
import { Skeleton } from '../../ui/skeleton';
import { Badge } from '../../ui/badge';

// --- Fallback Mock Data (used when no real data) ---
const continueLearningData = [
  {
    id: 1,
    slug: 'dualidade',
    courseTitle: 'Dualidade',
    totalLessons: 28,
    completedLessons: 0,
    lessonTitle: 'Consciência Energética e Presença Pessoal',
    lessonNumber: 1,
    duration: '0 minutos',
    image:
      'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop',
    author: 'Jeffrey Allen',
    status: 'Você está no mesmo dia que a sua turma',
  },
  {
    id: 2,
    slug: 'tantra-touch',
    courseTitle: 'Tantra Touch',
    totalLessons: 30,
    completedLessons: 0,
    lessonTitle: 'The Best Foreplay & Tantra Massage for Two',
    lessonNumber: 21,
    duration: '15 minutos',
    image:
      'https://images.unsplash.com/photo-1518152006812-edab29b069ac?q=80&w=2070&auto=format&fit=crop',
    author: 'Psayla & Smith',
    status: 'A sua turma está atualmente em Aula 30',
  },
  {
    id: 3,
    slug: 'silva-ultramind',
    courseTitle: 'The Silva Ultramind System',
    totalLessons: 29,
    completedLessons: 6,
    lessonTitle: 'Tap into Alpha with the Centering Exercise',
    lessonNumber: 2,
    duration: '28 minutos',
    image:
      'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=2094&auto=format&fit=crop',
    author: 'Vishen',
    status: 'A sua turma está atualmente em Aula 29',
  },
];

const trendingData = [
  {
    rank: 1,
    slug: 'hipnoterapia',
    title: 'Hipnoterapia de Transformação...',
    author: 'Marisa Peer',
    image:
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=200&auto=format&fit=crop',
  },
  {
    rank: 2,
    slug: 'vida-sem-limites',
    title: 'Vida Sem Limites',
    author: 'Marisa Peer',
    image:
      'https://images.unsplash.com/photo-1519834785169-98be25ec3f84?q=80&w=200&auto=format&fit=crop',
  },
  {
    rank: 3,
    slug: 'silva-ultramind',
    title: 'Método Silva Ultramind',
    author: 'Vishen',
    image:
      'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=200&auto=format&fit=crop',
  },
  {
    rank: 4,
    slug: 'wildfit',
    title: 'WildFit em Português',
    author: 'Eric Edmeades',
    image:
      'https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=200&auto=format&fit=crop',
  },
  {
    rank: 5,
    slug: 'seja-extraordinario',
    title: 'Seja Extraordinário',
    author: 'Vishen',
    image:
      'https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=200&auto=format&fit=crop',
  },
  {
    rank: 6,
    slug: 'supercerebro',
    title: 'Supercérebro',
    author: 'Jim Kwik',
    image:
      'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?q=80&w=200&auto=format&fit=crop',
  },
  {
    rank: 7,
    slug: 'dualidade',
    title: 'Dualidade',
    author: 'Jeffrey Allen',
    image:
      'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=200&auto=format&fit=crop',
  },
  {
    rank: 8,
    slug: 'proposito',
    title: 'Descobrindo seu Propósito',
    author: 'Michael Beckwith',
    image:
      'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?q=80&w=200&auto=format&fit=crop',
  },
];

const newReleases = [
  {
    slug: 'vida-sem-limites',
    title: 'Vida Sem Limites',
    author: 'Marisa Peer',
    students: '1.266',
    image:
      'https://images.unsplash.com/photo-1519834785169-98be25ec3f84?q=80&w=600&auto=format&fit=crop',
  },
  {
    slug: 'wildfit',
    title: 'WildFit em Português',
    author: 'Eric Edmeades',
    students: '339',
    image:
      'https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=600&auto=format&fit=crop',
  },
  {
    slug: 'dualidade',
    title: 'Dualidade',
    author: 'Jeffrey Allen',
    students: '1.058',
    image:
      'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=600&auto=format&fit=crop',
  },
];

// Gradient combinations for course covers without images
const gradients = [
  'from-violet-600 via-purple-500 to-indigo-600',
  'from-rose-500 via-pink-500 to-fuchsia-500',
  'from-amber-500 via-orange-500 to-red-500',
  'from-emerald-500 via-teal-500 to-cyan-500',
  'from-blue-500 via-indigo-500 to-violet-500',
  'from-slate-700 via-slate-600 to-slate-800',
  'from-fuchsia-600 via-pink-500 to-rose-500',
  'from-cyan-500 via-sky-500 to-blue-500',
];

// Get gradient based on string hash for consistency
const getGradient = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return gradients[Math.abs(hash) % gradients.length];
};

// Course cover component - shows image or gradient fallback
const CourseCover = ({
  image,
  title,
  className = '',
  showTitle = true,
}: {
  image?: string | null;
  title: string;
  className?: string;
  showTitle?: boolean;
}) => {
  if (image) {
    return <img src={image} alt={title} className={cn('h-full w-full object-cover', className)} />;
  }

  return (
    <div
      className={cn(
        'flex h-full w-full items-center justify-center bg-gradient-to-br p-4',
        getGradient(title),
        className
      )}
    >
      {showTitle && (
        <h3 className="line-clamp-3 text-center text-lg font-bold leading-tight text-white drop-shadow-lg">
          {title}
        </h3>
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

// Category display order (only these will show, in this order)
const categoryOrder = ['fundamentals', 'legendary_mind', 'projects', 'tools'];

export default function LmsCourseGridTemplate() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<string | null>(null); // null = "Todos"
  const { courses, loading } = useLmsCourses();
  const { categories } = useLmsCategories();

  const goToCourse = (slug: string) => {
    navigate(`/lms/cursos/${slug}`);
  };

  // Filter courses by selected category
  const filteredCourses = activeCategory
    ? courses.filter((c) => c.tags.some((t) => t.slug === activeCategory))
    : courses;

  // Transform real courses to the display format
  const displayCourses =
    filteredCourses.length > 0
      ? filteredCourses.map((course) => ({
          id: course.id,
          slug: course.slug,
          courseTitle: course.title,
          totalLessons: course.stats.totalLessons,
          completedLessons: course.progress.completedLessons,
          lessonTitle: 'Próxima aula disponível',
          lessonNumber: course.progress.completedLessons + 1,
          duration: course.stats.duration,
          image: course.thumbnail,
          author: course.instructor.name,
          status:
            course.progress.percentage > 0
              ? `${course.progress.percentage}% concluído`
              : 'Comece agora',
          tags: course.tags,
        }))
      : continueLearningData.map((c) => ({ ...c, tags: [] }));

  const trendingDisplay =
    courses.length > 0
      ? courses.slice(0, 8).map((course, idx) => ({
          rank: idx + 1,
          slug: course.slug,
          title: course.title,
          author: course.instructor.name,
          image: course.thumbnail,
        }))
      : trendingData;

  const newReleasesDisplay =
    courses.length > 0
      ? courses.slice(0, 3).map((course) => ({
          slug: course.slug,
          title: course.title,
          author: course.instructor.name,
          students: String(course.stats.students),
          image: course.thumbnail,
        }))
      : newReleases;

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
              <span className="cursor-pointer transition-colors hover:text-foreground">Canais</span>
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
        {/* --- Section 1: Continuar Aprendendo --- */}
        <section className="border-b border-border/50 bg-secondary/40 py-12">
          <div className="container mx-auto max-w-7xl px-6">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">Continuar Aprendendo</h2>
              <Button variant="link" className="text-sm font-semibold text-primary">
                Ver tudo <Icon name="angle-small-right" />
              </Button>
            </div>

            {/* Cards Row */}
            <div className="scrollbar-hide -mx-6 flex snap-x gap-6 overflow-x-auto px-6 pb-6">
              {displayCourses.map((course) => (
                <div
                  key={course.id}
                  className="group min-w-[320px] cursor-pointer snap-center overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all hover:shadow-md md:min-w-[380px]"
                  onClick={() => goToCourse(course.slug)}
                >
                  {/* Header Info */}
                  <div className="flex items-start gap-3 border-b border-border bg-background/50 p-4">
                    <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg border border-border">
                      <CourseCover
                        image={course.image}
                        title={course.courseTitle}
                        showTitle={false}
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="truncate text-sm font-bold">{course.courseTitle}</h4>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {course.completedLessons} de {course.totalLessons} aulas completadas
                      </p>
                      <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-muted">
                        <div className="h-full w-[5%] bg-primary"></div>
                      </div>
                    </div>
                    <Icon name="angle-small-right" className="text-muted-foreground" />
                  </div>

                  {/* Lesson Visual */}
                  <div className="relative aspect-video transition-opacity group-hover:opacity-90">
                    <CourseCover
                      image={course.image}
                      title={course.courseTitle}
                      showTitle={!course.image}
                    />
                    {course.image && (
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                    )}
                    <div className="absolute bottom-4 left-4 right-4">
                      <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-white/80">
                        Aula {course.lessonNumber}
                      </p>
                      <h3 className="line-clamp-2 text-lg font-bold leading-tight text-white">
                        {course.lessonTitle}
                      </h3>
                    </div>
                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/40 bg-white/20 backdrop-blur-md">
                        <Icon name="play" className="ml-1 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Footer Info */}
                  <div className="bg-card p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <h5 className="line-clamp-1 text-sm font-bold leading-tight">
                        {course.lessonTitle}
                      </h5>
                      <span className="ml-2 whitespace-nowrap text-xs text-muted-foreground">
                        {course.duration}
                      </span>
                    </div>
                    {course.tags && course.tags.length > 0 && (
                      <div className="mb-2 flex flex-wrap gap-1.5">
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
                    <p className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                      <Icon name="info" size="size-3" className="text-primary" /> {course.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- Section 2: Menu Categories --- */}
        <section className="sticky top-16 z-30 border-b border-border bg-background/95 shadow-sm backdrop-blur-md">
          <div className="container mx-auto max-w-7xl px-6">
            <div className="scrollbar-hide flex items-center justify-between overflow-x-auto">
              <div className="flex min-w-max items-center gap-6">
                {/* "Todos" button */}
                <button
                  onClick={() => setActiveCategory(null)}
                  className={cn(
                    'group flex items-center gap-2 whitespace-nowrap border-b-2 py-4 text-sm font-medium transition-all',
                    activeCategory === null
                      ? 'border-primary text-primary'
                      : 'border-transparent text-muted-foreground hover:border-border hover:text-foreground'
                  )}
                >
                  <Icon
                    name="grid"
                    size="size-4"
                    className={cn(
                      'transition-colors',
                      activeCategory === null
                        ? 'text-primary'
                        : 'text-muted-foreground group-hover:text-foreground'
                    )}
                  />
                  <span>Todos</span>
                </button>

                {/* Dynamic categories from DB (ordered) */}
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
              </div>
            </div>
          </div>
        </section>

        {/* --- Section 3: Em Alta Globalmente --- */}
        <section className="bg-background py-12">
          <div className="container mx-auto max-w-7xl px-6">
            <div className="mb-8 flex items-center gap-3">
              <Icon name="trend-up" className="text-yellow-500" />
              <h2 className="text-2xl font-bold">Em alta globalmente esta semana</h2>
            </div>

            <div className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2 lg:grid-cols-4">
              {trendingDisplay.map((item) => (
                <div
                  key={item.rank}
                  className="group flex cursor-pointer items-center gap-4 rounded-lg p-2 transition-colors hover:bg-muted/30"
                  onClick={() => goToCourse(item.slug)}
                >
                  <span className="w-8 text-right text-4xl font-black text-muted-foreground/20 transition-colors group-hover:text-primary/50">
                    {item.rank}
                  </span>
                  <div className="h-16 w-24 shrink-0 overflow-hidden rounded-md border border-border shadow-sm">
                    <CourseCover
                      image={item.image}
                      title={item.title}
                      showTitle={false}
                      className="transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="line-clamp-2 text-sm font-bold leading-snug text-foreground transition-colors group-hover:text-primary">
                      {item.title}
                    </h4>
                    <p className="mt-1 text-xs text-muted-foreground">{item.author}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- Section 4: Novos Lançamentos --- */}
        <section className="border-y border-border/50 bg-secondary/40 py-12">
          <div className="container mx-auto max-w-7xl px-6">
            <h2 className="mb-8 text-2xl font-bold">Novos Lançamentos</h2>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {newReleasesDisplay.map((item, i) => (
                <div key={i} className="group cursor-pointer" onClick={() => goToCourse(item.slug)}>
                  <div className="relative mb-4 aspect-[16/9] overflow-hidden rounded-xl border border-border shadow-sm">
                    <CourseCover
                      image={item.image}
                      title={item.title}
                      showTitle={false}
                      className="transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Overlay Content */}
                    <div className="absolute inset-0 flex flex-col items-start justify-end bg-gradient-to-t from-black/90 via-black/20 to-transparent p-6 text-white">
                      <h3 className="mb-1 font-serif text-2xl font-bold italic tracking-wide">
                        {item.title}
                      </h3>
                      <p className="mb-4 text-xs font-bold uppercase tracking-widest text-white/70">
                        {item.author}
                      </p>
                      <div className="h-1 w-full overflow-hidden rounded-full bg-white/20">
                        <div className="h-full w-0 bg-white transition-all duration-1000 group-hover:w-full"></div>
                      </div>
                    </div>

                    {/* Floating Play Button */}
                    <div className="absolute bottom-4 right-4 flex h-10 w-10 translate-y-4 transform items-center justify-center rounded-full bg-white text-black opacity-0 shadow-lg transition-all group-hover:translate-y-0 group-hover:opacity-100">
                      <Icon name="angle-small-right" size="size-5" />
                    </div>
                  </div>

                  <div className="flex items-start justify-between px-1">
                    <div>
                      <h4 className="font-bold text-foreground transition-colors group-hover:text-primary">
                        {item.title}
                      </h4>
                      <p className="text-xs text-muted-foreground">{item.author}</p>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Icon name="user" size="size-3" /> {item.students}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- Section 5: Categorias (Mente) --- */}
        <section className="bg-background py-12">
          <div className="container mx-auto max-w-7xl px-6">
            <div className="mb-8 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Icon name="brain" className="text-blue-500" />
                <h2 className="text-2xl font-bold">Mente</h2>
              </div>
              <Button variant="link" className="text-sm font-bold text-primary">
                Ver tudo <Icon name="angle-small-right" />
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {newReleasesDisplay.map((item, i) => (
                <div key={i} className="group cursor-pointer" onClick={() => goToCourse(item.slug)}>
                  <div className="relative mb-4 aspect-[16/9] overflow-hidden rounded-xl border border-border shadow-sm">
                    <CourseCover
                      image={item.image}
                      title={item.title}
                      showTitle={false}
                      className="brightness-75 filter transition-transform duration-700 group-hover:scale-105 group-hover:brightness-100"
                    />

                    {/* Center Text Style */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                      <p className="mb-2 text-xs font-bold uppercase tracking-widest text-white/80">
                        MASTERCLASS
                      </p>
                      <h3 className="mb-4 text-3xl font-bold text-white drop-shadow-lg">
                        {item.title}
                      </h3>
                      <p className="font-sans text-xs uppercase tracking-widest text-white">
                        POR {item.author}
                      </p>
                    </div>

                    <div className="absolute bottom-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
                      <Icon name="arrow-right" size="size-4" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between px-1">
                    <h4 className="text-sm font-bold text-foreground">{item.title}</h4>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Icon name="user" size="size-3" /> {item.students}
                    </div>
                  </div>
                  <p className="px-1 text-xs text-muted-foreground">{item.author}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

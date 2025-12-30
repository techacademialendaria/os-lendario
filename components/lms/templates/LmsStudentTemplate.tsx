import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../../ui/button';
import { Icon } from '../../ui/icon';
import { ScrollArea } from '../../ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';
import { Progress } from '../../ui/progress';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../ui/tabs';
import { cn } from '../../../lib/utils';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../../ui/accordion';
import { Textarea } from '../../ui/textarea';
import { Skeleton } from '../../ui/skeleton';
import { useLmsCourse, useLmsLesson } from '../../../hooks/lms';
import { MarkdownRenderer } from '../../shared/MarkdownRenderer';

// Gradient combinations for covers without images
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

// Cover component - shows image or gradient fallback
const GradientCover = ({
  image,
  title,
  className = '',
}: {
  image?: string | null;
  title: string;
  className?: string;
}) => {
  if (image) {
    return <img src={image} alt={title} className={cn('h-full w-full object-cover', className)} />;
  }

  return <div className={cn('h-full w-full bg-gradient-to-br', getGradient(title), className)} />;
};

type LessonType = 'video' | 'text' | 'quiz';

interface Lesson {
  id: string;
  title: string;
  duration: string;
  status: 'completed' | 'current' | 'locked';
  type: LessonType;
}

interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

export default function LmsStudentTemplate() {
  const navigate = useNavigate();
  const { slug, lessonId } = useParams();

  // Fetch real data
  const { course: realCourse, loading: courseLoading } = useLmsCourse(slug);
  const { lesson: realLesson, loading: lessonLoading } = useLmsLesson(slug, lessonId);

  // State for Active Lesson
  const [activeLessonId, setActiveLessonId] = useState(lessonId || '');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  // Update activeLessonId when lessonId from URL changes
  useEffect(() => {
    if (lessonId) setActiveLessonId(lessonId);
  }, [lessonId]);

  // Fallback mock data
  const fallbackCourseData = {
    title: 'Vibecoding - Apps Sem Código',
    progress: 35,
    modules: [
      {
        id: 'm1',
        title: 'Módulo 1: Fundamentos',
        lessons: [
          {
            id: 'l1',
            title: 'Boas Vindas & Mindset',
            duration: '10:05',
            status: 'completed' as const,
            type: 'video' as const,
          },
          {
            id: 'l2',
            title: 'Manifesto No-Code (Leitura)',
            duration: '5 min',
            status: 'completed' as const,
            type: 'text' as const,
          },
          {
            id: 'l3',
            title: 'Configurando o Ambiente',
            duration: '12:10',
            status: 'completed' as const,
            type: 'video' as const,
          },
        ],
      },
      {
        id: 'm2',
        title: 'Módulo 2: Banco de Dados',
        lessons: [
          {
            id: 'l4',
            title: 'Estrutura Relacional',
            duration: '25:00',
            status: 'current' as const,
            type: 'video' as const,
          },
          {
            id: 'l5',
            title: 'Guia de Tipos de Dados',
            duration: '10 min',
            status: 'locked' as const,
            type: 'text' as const,
          },
          {
            id: 'l6',
            title: 'Tabelas e Conexões',
            duration: '32:10',
            status: 'locked' as const,
            type: 'video' as const,
          },
        ],
      },
    ],
  };

  // Transform real data or use fallback
  const courseData = realCourse
    ? {
        title: realCourse.title,
        progress: realCourse.progress.percentage,
        modules: realCourse.modules.map((m) => ({
          id: m.id,
          title: m.title,
          lessons: m.lessons.map((l) => ({
            id: l.id,
            title: l.title,
            duration: l.duration,
            status: l.status,
            type: l.type,
          })),
        })),
      }
    : fallbackCourseData;

  // Set initial activeLessonId if not set
  useEffect(() => {
    if (!activeLessonId && courseData.modules.length > 0) {
      const firstLesson = courseData.modules[0]?.lessons[0];
      if (firstLesson) setActiveLessonId(firstLesson.id);
    }
  }, [courseData, activeLessonId]);

  // New Interaction States
  const [isFavorited, setIsFavorited] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  // Find active lesson data from sidebar
  const getActiveLessonData = () => {
    for (const mod of courseData.modules) {
      const lesson = mod.lessons.find((l) => l.id === activeLessonId);
      if (lesson) return { ...lesson, moduleTitle: mod.title };
    }
    return {
      id: 'l4',
      title: 'Estrutura Relacional',
      duration: '25:00',
      status: 'current',
      type: 'video' as LessonType,
      moduleTitle: 'Módulo 2',
    };
  };

  const activeLesson = getActiveLessonData();

  // Determine content type: if no videoUrl, it's text
  const hasVideo = realLesson?.videoUrl;
  const contentType: LessonType = hasVideo ? 'video' : 'text';
  const lessonContent = realLesson?.content || '';

  // Content renderer - prioritizes text if no video
  const renderContent = () => {
    // Loading state
    if (lessonLoading) {
      return (
        <div className="mx-auto w-full max-w-3xl space-y-4">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="mt-8 h-32 w-full" />
        </div>
      );
    }

    // Video content (only if has videoUrl)
    if (contentType === 'video' && hasVideo) {
      return (
        <div className="w-full">
          {/* Video Container (16:9 Aspect Ratio) */}
          <div className="group relative aspect-video w-full overflow-hidden rounded-xl border border-border/20 bg-black shadow-2xl">
            {/* Placeholder Cover */}
            <GradientCover
              image={null}
              title={realLesson?.title || activeLesson.title}
              className="opacity-50"
            />

            {/* Play Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex h-20 w-20 cursor-pointer items-center justify-center rounded-full bg-primary/90 pl-1 shadow-[0_0_50px_rgba(201,178,152,0.3)] transition-transform hover:scale-110">
                <Icon name="play" className="text-3xl text-primary-foreground" />
              </div>
            </div>

            {/* Hover Controls */}
            <div className="absolute bottom-0 left-0 right-0 flex h-16 items-end bg-gradient-to-t from-black/80 to-transparent px-4 pb-4 opacity-0 transition-opacity group-hover:opacity-100">
              <div className="flex w-full items-center gap-4 text-white">
                <Icon name="play" />
                <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/20">
                  <div className="h-full w-[10%] bg-primary"></div>
                </div>
                <span className="font-mono text-xs">
                  02:15 / {realLesson?.duration || activeLesson.duration}
                </span>
                <Icon name="volume" />
                <Icon name="settings" />
                <Icon name="expand" />
              </div>
            </div>
          </div>

          {/* Show text content below video if available */}
          {lessonContent && (
            <div className="mt-8 rounded-xl border border-border bg-card p-8 shadow-sm md:p-12">
              <span className="mb-4 block text-xs font-bold uppercase tracking-widest text-primary">
                Transcrição / Notas da Aula
              </span>
              <MarkdownRenderer content={lessonContent} variant="lesson" />
            </div>
          )}
        </div>
      );
    }

    // Text content (default - when no video)
    return (
      <div className="mx-auto w-full max-w-3xl rounded-xl border border-border bg-card p-8 shadow-sm md:p-12">
        <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-primary">
          {realLesson?.moduleTitle || activeLesson.moduleTitle}
        </span>
        <h1 className="mb-6 text-3xl font-bold leading-tight text-foreground md:text-4xl">
          {realLesson?.title || activeLesson.title}
        </h1>

        <MarkdownRenderer content={lessonContent} variant="lesson" />
      </div>
    );
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background font-sans text-foreground">
      {/* --- MAIN CONTENT (PLAYER) --- */}
      <div className="relative flex h-full flex-1 flex-col">
        {/* Top Navigation */}
        <header className="z-20 h-16 shrink-0 border-b border-border bg-background/95 backdrop-blur-sm">
          <div className="container mx-auto flex h-full max-w-7xl items-center justify-between px-6">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-foreground"
                onClick={() => navigate(`/lms/cursos/${slug}`)}
              >
                <Icon name="arrow-left" size="size-4" />
              </Button>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  {courseData.title}
                </span>
                <h1 className="flex items-center gap-2 text-sm font-bold text-foreground">
                  {activeLesson.title}
                  <Icon name="angle-small-right" className="text-muted-foreground" size="size-3" />
                  <span className="font-normal text-muted-foreground">
                    {activeLesson.moduleTitle}
                  </span>
                </h1>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  'gap-2 text-muted-foreground hover:text-foreground',
                  !sidebarOpen && 'text-primary'
                )}
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                <Icon name={sidebarOpen ? 'expand' : 'compress'} size="size-4" />
                {sidebarOpen ? 'Modo Foco' : 'Mostrar Menu'}
              </Button>
              <Avatar className="h-8 w-8 border border-border">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>AL</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Content Area (Scrollable) */}
        <div className="custom-scrollbar flex-1 overflow-y-auto bg-muted/20">
          <div
            className={cn(
              'mx-auto w-full p-6 md:p-8',
              activeLesson.type === 'text' ? 'max-w-5xl' : 'max-w-6xl'
            )}
          >
            {/* Dynamic Content Renderer */}
            {renderContent()}

            {/* Footer / Context (Below Content) */}
            <div className="mt-8 space-y-8">
              {/* Lesson Actions */}
              <div className="flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    className="gap-2 border-border text-foreground hover:bg-muted"
                    disabled={!realLesson?.previousLessonId}
                    onClick={() =>
                      realLesson?.previousLessonId &&
                      navigate(`/lms/cursos/${slug}/aula/${realLesson.previousLessonId}`)
                    }
                  >
                    <Icon name="angle-left" size="size-4" /> Anterior
                  </Button>
                  <Button
                    variant="outline"
                    className="gap-2 border-border text-foreground hover:bg-muted"
                    disabled={!realLesson?.nextLessonId}
                    onClick={() =>
                      realLesson?.nextLessonId &&
                      navigate(`/lms/cursos/${slug}/aula/${realLesson.nextLessonId}`)
                    }
                  >
                    Próxima <Icon name="angle-right" size="size-4" />
                  </Button>
                </div>

                <div className="flex items-center gap-4">
                  {/* Star Rating System */}
                  <div
                    className="mr-4 flex h-8 items-center gap-1 border-r border-border pr-4"
                    onMouseLeave={() => setHoverRating(0)}
                  >
                    <span className="mr-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                      Avalie:
                    </span>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        className="transition-transform hover:scale-110 focus:outline-none"
                      >
                        <Icon
                          name="star"
                          className={cn(
                            'h-5 w-5 transition-colors',
                            (hoverRating || rating) >= star
                              ? 'text-yellow-500'
                              : 'text-muted-foreground/50'
                          )}
                        />
                      </button>
                    ))}
                  </div>

                  {/* Favorite Button */}
                  <Button
                    variant="ghost"
                    className={cn(
                      'gap-2 transition-colors hover:bg-red-500/10',
                      isFavorited
                        ? 'text-red-500 hover:text-red-600'
                        : 'text-muted-foreground hover:text-red-400'
                    )}
                    onClick={() => setIsFavorited(!isFavorited)}
                  >
                    <Icon name="heart" size="size-4" />
                    {isFavorited ? 'Favorito' : 'Favoritar'}
                  </Button>

                  {/* Complete Button */}
                  <Button className="gap-2 bg-primary font-bold text-primary-foreground shadow-lg shadow-primary/10 hover:bg-primary/90">
                    <Icon name="check-circle" size="size-4" />
                    {activeLesson.type === 'text' ? 'Marcar como Lida' : 'Marcar Concluída'}
                  </Button>
                </div>
              </div>

              {/* Additional Context Tabs */}
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="h-auto w-full justify-start gap-8 rounded-none border-b border-border bg-transparent p-0">
                  <TabsTrigger
                    value="overview"
                    className="rounded-none border-b-2 border-transparent bg-transparent px-0 pb-3 text-sm font-medium text-muted-foreground hover:text-foreground data-[state=active]:border-primary data-[state=active]:text-primary"
                  >
                    Visão Geral
                  </TabsTrigger>
                  <TabsTrigger
                    value="materials"
                    className="rounded-none border-b-2 border-transparent bg-transparent px-0 pb-3 text-sm font-medium text-muted-foreground hover:text-foreground data-[state=active]:border-primary data-[state=active]:text-primary"
                  >
                    Materiais (2)
                  </TabsTrigger>
                  <TabsTrigger
                    value="comments"
                    className="rounded-none border-b-2 border-transparent bg-transparent px-0 pb-3 text-sm font-medium text-muted-foreground hover:text-foreground data-[state=active]:border-primary data-[state=active]:text-primary"
                  >
                    Comentários (12)
                  </TabsTrigger>
                </TabsList>

                <div className="min-h-[300px] pt-6">
                  {/* Overview Tab */}
                  <TabsContent value="overview" className="animate-fade-in space-y-6">
                    <div className="prose dark:prose-invert max-w-none font-serif text-muted-foreground">
                      <h3>Resumo da Aula</h3>
                      <p>
                        Nesta unidade, focamos nos conceitos essenciais de banco de dados para
                        aplicações modernas. A compreensão de chaves primárias e estrangeiras é
                        fundamental para criar relações escaláveis.
                      </p>
                      <h3>O que você vai aprender</h3>
                      <ul>
                        <li>Conceitos fundamentais de banco de dados relacional</li>
                        <li>Diferença entre Primary Key e Foreign Key</li>
                        <li>Como modelar dados para escala (1M+ registros)</li>
                      </ul>
                    </div>
                  </TabsContent>

                  {/* Materials Tab */}
                  <TabsContent value="materials" className="animate-fade-in space-y-4">
                    <div className="group flex cursor-pointer items-center justify-between rounded-xl border border-border bg-card p-4 shadow-sm transition-colors hover:bg-muted/50">
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-muted text-muted-foreground transition-colors group-hover:text-primary">
                          <Icon name="file-pdf" size="size-5" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-foreground">Slide_Deck_v2.pdf</p>
                          <p className="text-xs text-muted-foreground">2.4 MB</p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-muted-foreground group-hover:text-foreground"
                      >
                        <Icon name="download" />
                      </Button>
                    </div>
                  </TabsContent>

                  {/* Comments Tab */}
                  <TabsContent value="comments" className="animate-fade-in space-y-6">
                    <div className="flex gap-4">
                      <Avatar className="h-10 w-10 border border-border">
                        <AvatarFallback>EU</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <Textarea
                          placeholder="Adicione um comentário ou dúvida..."
                          className="mb-2 min-h-[80px] border-border bg-card text-sm"
                        />
                        <div className="flex justify-end">
                          <Button
                            size="sm"
                            className="bg-foreground text-background hover:bg-foreground/90"
                          >
                            Comentar
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="group flex gap-4">
                        <Avatar className="h-8 w-8 border border-border">
                          <AvatarFallback className="bg-muted text-xs text-muted-foreground">
                            JP
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-foreground">João Pedro</span>
                            <span className="text-[10px] text-muted-foreground">5h atrás</span>
                          </div>
                          <p className="font-serif text-sm leading-relaxed text-muted-foreground">
                            Excelente explicação sobre normalização. Ficou muito mais claro.
                          </p>
                          <div className="flex items-center gap-4 pt-1 opacity-0 transition-opacity group-hover:opacity-100">
                            <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
                              <Icon name="thumbs-up" size="size-3" /> Curtir
                            </button>
                            <button className="text-xs text-muted-foreground hover:text-foreground">
                              Responder
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </div>
              </Tabs>
            </div>
          </div>
        </div>
      </div>

      {/* --- RIGHT SIDEBAR (CURRICULUM) --- */}
      <aside
        className={cn(
          'flex flex-col border-l border-border bg-card transition-all duration-300',
          sidebarOpen ? 'w-80 md:w-96' : 'w-0 overflow-hidden opacity-0'
        )}
      >
        <div className="flex flex-col gap-4 border-b border-border p-4">
          <div>
            <h3 className="mb-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Seu Progresso
            </h3>
            <div className="mb-1 flex items-center justify-between text-sm">
              <span className="font-mono font-bold text-foreground">35%</span>
              <span className="text-xs text-muted-foreground">12/42 Aulas</span>
            </div>
            <Progress value={35} className="h-1 bg-muted" />
          </div>
        </div>

        <ScrollArea className="flex-1">
          <Accordion type="multiple" defaultValue={['m1', 'm2']} className="w-full">
            {courseData.modules.map((module) => (
              <AccordionItem
                key={module.id}
                value={module.id}
                className="border-b border-border last:border-0"
              >
                <AccordionTrigger className="group px-4 py-4 text-left hover:bg-muted/30 hover:no-underline">
                  <div className="flex-1">
                    <p className="text-sm font-bold text-muted-foreground transition-colors group-hover:text-foreground">
                      {module.title}
                    </p>
                    <p className="mt-0.5 text-[10px] font-normal text-muted-foreground/70">
                      {module.lessons.length} aulas
                    </p>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="bg-muted/10 p-0">
                  {module.lessons.map((lesson) => (
                    <button
                      key={lesson.id}
                      onClick={() => {
                        setActiveLessonId(lesson.id);
                        navigate(`/lms/cursos/${slug}/aula/${lesson.id}`);
                      }}
                      className={cn(
                        'flex w-full items-center gap-3 border-l-2 p-3 pl-6 text-left transition-colors hover:bg-muted/50',
                        activeLessonId === lesson.id
                          ? 'border-primary bg-muted/30'
                          : 'border-transparent'
                      )}
                    >
                      <div className="shrink-0">
                        {lesson.status === 'completed' && (
                          <Icon name="check-circle" className="text-green-500" size="size-4" />
                        )}
                        {(lesson.status === 'current' || activeLessonId === lesson.id) && (
                          <div className="h-4 w-4 rounded-full border-2 border-primary"></div>
                        )}
                        {lesson.status === 'locked' && (
                          <Icon name="lock" className="text-muted-foreground" size="size-4" />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p
                          className={cn(
                            'truncate text-xs font-medium',
                            activeLessonId === lesson.id
                              ? 'text-foreground'
                              : lesson.status === 'locked'
                                ? 'text-muted-foreground/60'
                                : 'text-muted-foreground'
                          )}
                        >
                          {lesson.title}
                        </p>
                        <div className="mt-0.5 flex items-center gap-2 text-muted-foreground/60">
                          {lesson.type === 'video' && <Icon name="play-circle" size="size-3" />}
                          {lesson.type === 'text' && <Icon name="file-text" size="size-3" />}
                          <span className="font-mono text-[10px]">{lesson.duration}</span>
                        </div>
                      </div>
                    </button>
                  ))}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </ScrollArea>
      </aside>
    </div>
  );
}

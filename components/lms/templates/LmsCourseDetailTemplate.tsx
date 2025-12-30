import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../../ui/button';
import { Icon } from '../../ui/icon';
import { Badge } from '../../ui/badge';
import { Progress } from '../../ui/progress';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../../ui/accordion';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { Input } from '../../ui/input';
import { cn } from '../../../lib/utils';
import { Separator } from '../../ui/separator';
import { Skeleton } from '../../ui/skeleton';
import { useLmsCourse } from '../../../hooks/lms';

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

// Fallback Mock Data - Course
const fallbackCourse = {
  title: 'Vibecoding - Apps Sem Código',
  author: 'Alan Nicolas',
  description:
    'Aprenda a construir aplicações web completas usando ferramentas No-Code e inteligência artificial. Do zero ao deploy em semanas, não meses.',
  progress: 35,
  totalLessons: 42,
  completedLessons: 12,
  rating: 4.9,
  students: 1240,
  lastUpdated: 'Out 2025',
  cover:
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop',
  modules: [
    {
      id: 'm1',
      title: 'Módulo 1: Fundamentos',
      duration: '1h 20m',
      lessons: [
        {
          id: 'l1',
          title: 'Boas Vindas & Mindset',
          duration: '10:05',
          status: 'completed' as const,
        },
        { id: 'l2', title: 'O que é No-Code?', duration: '15:20', status: 'completed' as const },
        {
          id: 'l3',
          title: 'Configurando o Ambiente',
          duration: '12:10',
          status: 'completed' as const,
        },
      ],
    },
    {
      id: 'm2',
      title: 'Módulo 2: Banco de Dados',
      duration: '2h 15m',
      lessons: [
        { id: 'l4', title: 'Estrutura Relacional', duration: '25:00', status: 'current' as const },
        { id: 'l5', title: 'Tipos de Dados', duration: '18:45', status: 'locked' as const },
        { id: 'l6', title: 'Tabelas e Conexões', duration: '32:10', status: 'locked' as const },
      ],
    },
    {
      id: 'm3',
      title: 'Módulo 3: Automações',
      duration: '3h 40m',
      lessons: [
        { id: 'l7', title: 'Lógica de Workflows', duration: '20:00', status: 'locked' as const },
        { id: 'l8', title: 'Integrando APIs', duration: '45:00', status: 'locked' as const },
      ],
    },
  ],
};

// Mock Data - Resources
const resources = [
  {
    id: 1,
    title: 'Slide Deck: Fundamentos No-Code',
    type: 'PDF',
    size: '2.4 MB',
    icon: 'file-pdf',
    color: 'text-red-400',
  },
  {
    id: 2,
    title: 'Comunidade Discord (Vibecoding)',
    type: 'Link',
    size: 'Externo',
    icon: 'discord',
    color: 'text-indigo-400',
  },
  {
    id: 3,
    title: 'Template de Banco de Dados',
    type: 'CSV',
    size: '15 KB',
    icon: 'file-csv',
    color: 'text-green-400',
  },
  {
    id: 4,
    title: 'Checklist de Lançamento de App',
    type: 'Notion',
    size: 'Link',
    icon: 'file-check',
    color: 'text-foreground',
  },
  {
    id: 5,
    title: 'Código Fonte: Aula 12',
    type: 'ZIP',
    size: '120 MB',
    icon: 'folder-zip',
    color: 'text-yellow-400',
  },
];

// Mock Data - Students
const studentsList = [
  {
    id: 1,
    name: 'Mariana Costa',
    email: 'mariana@example.com',
    status: 'active',
    progress: 85,
    lastAccess: '2h atrás',
    avatar: 'https://i.pravatar.cc/150?u=mc',
  },
  {
    id: 2,
    name: 'João Pedro',
    email: 'joao@example.com',
    status: 'risk',
    progress: 42,
    lastAccess: '1 dia atrás',
    avatar: 'https://i.pravatar.cc/150?u=jp',
  },
  {
    id: 3,
    name: 'Lucas Silva',
    email: 'lucas@example.com',
    status: 'completed',
    progress: 100,
    lastAccess: '3 dias atrás',
    avatar: 'https://i.pravatar.cc/150?u=ls',
  },
  {
    id: 4,
    name: 'Ana Beatriz',
    email: 'ana@example.com',
    status: 'inactive',
    progress: 12,
    lastAccess: '15 dias atrás',
    avatar: 'https://i.pravatar.cc/150?u=ab',
  },
  {
    id: 5,
    name: 'Carlos Eduardo',
    email: 'carlos@example.com',
    status: 'active',
    progress: 68,
    lastAccess: '5h atrás',
    avatar: 'https://i.pravatar.cc/150?u=ce',
  },
  {
    id: 6,
    name: 'Fernanda Lima',
    email: 'fernanda@example.com',
    status: 'active',
    progress: 55,
    lastAccess: '10h atrás',
    avatar: 'https://i.pravatar.cc/150?u=fl',
  },
  {
    id: 7,
    name: 'Roberto Dias',
    email: 'roberto@example.com',
    status: 'risk',
    progress: 30,
    lastAccess: '5 dias atrás',
    avatar: 'https://i.pravatar.cc/150?u=rd',
  },
];

const getStatusStyle = (status: string) => {
  switch (status) {
    case 'active':
      return { label: 'Online', class: 'bg-green-500/20 text-green-500 border-green-500/30' };
    case 'risk':
      return { label: 'Ausente', class: 'bg-orange-500/20 text-orange-500 border-orange-500/30' };
    case 'completed':
      return { label: 'Concluiu', class: 'bg-blue-500/20 text-blue-500 border-blue-500/30' };
    default:
      return { label: 'Offline', class: 'bg-zinc-500/20 text-zinc-500 border-zinc-500/30' };
  }
};

export default function LmsCourseDetailTemplate() {
  const navigate = useNavigate();
  const { slug } = useParams();
  const { course: realCourse, loading, error } = useLmsCourse(slug);

  const goToPlayer = (lessonId: string) => {
    navigate(`/lms/cursos/${slug}/aula/${lessonId}`);
  };

  // Transform real data or use fallback
  const course = realCourse
    ? {
        title: realCourse.title,
        author: realCourse.instructor.name,
        description: realCourse.description,
        progress: realCourse.progress.percentage,
        totalLessons: realCourse.stats.totalLessons,
        completedLessons: realCourse.progress.completedLessons,
        rating: realCourse.stats.rating,
        students: realCourse.stats.students,
        lastUpdated: realCourse.stats.lastUpdated,
        cover: realCourse.thumbnail,
        modules: realCourse.modules.map((m) => ({
          id: m.id,
          title: m.title,
          duration: `${m.lessons.length * 15}m`,
          lessons: m.lessons.map((l) => ({
            id: l.id,
            title: l.title,
            duration: l.duration,
            status: l.status,
          })),
        })),
      }
    : fallbackCourse;

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="container mx-auto max-w-7xl space-y-8">
          <Skeleton className="h-8 w-32" />
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="space-y-6 lg:col-span-8">
              <Skeleton className="h-12 w-3/4" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-32 w-full rounded-xl" />
              <Skeleton className="h-64 w-full rounded-xl" />
            </div>
            <div className="space-y-6 lg:col-span-4">
              <Skeleton className="h-48 w-full rounded-xl" />
              <Skeleton className="h-32 w-full rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Find first available lesson for "Continue" button
  const firstAvailableLesson =
    course.modules.flatMap((m) => m.lessons).find((l) => l.status !== 'completed') ||
    course.modules[0]?.lessons[0];

  return (
    <div className="min-h-screen animate-fade-in bg-background pb-20 font-sans text-foreground">
      {/* Nav Back */}
      <div className="container mx-auto max-w-7xl px-6 py-6">
        <Button
          variant="ghost"
          className="gap-2 pl-0 text-muted-foreground hover:text-foreground"
          onClick={() => navigate('/lms')}
        >
          <Icon name="arrow-left" size="size-4" /> Voltar para Meus Cursos
        </Button>
      </div>

      <main className="container mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Left Column: Course Info */}
          <div className="space-y-8 lg:col-span-8">
            {/* Header */}
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

            {/* Progress Bar (Large) */}
            <div className="space-y-3 rounded-xl border border-border bg-card/50 p-6 shadow-sm">
              <div className="flex items-end justify-between">
                <div>
                  <p className="mb-1 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    Seu Progresso
                  </p>
                  <p className="text-2xl font-bold text-foreground">
                    {course.progress}%{' '}
                    <span className="text-sm font-normal text-muted-foreground">Concluído</span>
                  </p>
                </div>
                <Button
                  size="lg"
                  className="rounded-full bg-foreground px-8 font-bold text-background hover:bg-foreground/90"
                  onClick={() => firstAvailableLesson && goToPlayer(firstAvailableLesson.id)}
                  disabled={!firstAvailableLesson}
                >
                  <Icon name="play" className="mr-2" />{' '}
                  {course.completedLessons > 0 ? 'Continuar' : 'Começar'}
                </Button>
              </div>
              <Progress value={course.progress} className="h-2 bg-muted" />
              <p className="text-right text-xs text-muted-foreground">
                {course.completedLessons}/{course.totalLessons} Aulas finalizadas
              </p>
            </div>

            {/* Main Tabs System */}
            <Tabs defaultValue="content" className="mt-8 w-full">
              <TabsList className="mb-6 w-full justify-start gap-6 overflow-x-auto border-b border-border bg-transparent p-0">
                <TabsTrigger
                  value="content"
                  className="rounded-none border-b-2 border-transparent bg-transparent px-0 pb-3 text-base font-bold text-muted-foreground transition-all data-[state=active]:border-primary data-[state=active]:text-foreground"
                >
                  Conteúdo do Curso
                </TabsTrigger>
                <TabsTrigger
                  value="resources"
                  className="rounded-none border-b-2 border-transparent bg-transparent px-0 pb-3 text-base font-bold text-muted-foreground transition-all data-[state=active]:border-primary data-[state=active]:text-foreground"
                >
                  Recursos ({resources.length})
                </TabsTrigger>
                <TabsTrigger
                  value="students"
                  className="rounded-none border-b-2 border-transparent bg-transparent px-0 pb-3 text-base font-bold text-muted-foreground transition-all data-[state=active]:border-primary data-[state=active]:text-foreground"
                >
                  Alunos ({course.students})
                </TabsTrigger>
              </TabsList>

              {/* TAB 1: CONTENT (SYLLABUS) */}
              <TabsContent value="content" className="animate-fade-in space-y-6">
                <Accordion type="multiple" defaultValue={['m1', 'm2']} className="w-full space-y-4">
                  {course.modules.map((module) => (
                    <AccordionItem
                      key={module.id}
                      value={module.id}
                      className="overflow-hidden rounded-xl border border-border bg-card/30"
                    >
                      <AccordionTrigger className="px-6 py-4 hover:bg-muted/50 hover:no-underline">
                        <div className="flex-1 text-left">
                          <p className="text-base font-bold text-foreground">{module.title}</p>
                          <p className="mt-1 text-xs font-normal text-muted-foreground">
                            {module.lessons.length} aulas • {module.duration}
                          </p>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="border-t border-border bg-muted/5 p-0">
                        {module.lessons.map((lesson, idx) => (
                          <div
                            key={lesson.id}
                            className={cn(
                              'group flex cursor-pointer items-center gap-4 border-b border-border p-4 pl-6 transition-colors last:border-0',
                              lesson.status === 'locked'
                                ? 'cursor-not-allowed opacity-50'
                                : 'hover:bg-muted/50',
                              lesson.status === 'current' ? 'bg-primary/5' : ''
                            )}
                            onClick={() => lesson.status !== 'locked' && goToPlayer(lesson.id)}
                          >
                            <div className="w-6 font-mono text-xs text-muted-foreground">
                              {idx + 1}
                            </div>
                            <div className="flex-1">
                              <p
                                className={cn(
                                  'text-sm font-medium',
                                  lesson.status === 'current'
                                    ? 'text-primary'
                                    : 'text-foreground/80 group-hover:text-foreground'
                                )}
                              >
                                {lesson.title}
                              </p>
                            </div>
                            <div className="flex items-center gap-4">
                              <span className="font-mono text-xs text-muted-foreground">
                                {lesson.duration}
                              </span>
                              {lesson.status === 'completed' && (
                                <Icon
                                  name="check-circle"
                                  className="text-green-500"
                                  size="size-4"
                                />
                              )}
                              {lesson.status === 'current' && (
                                <Icon name="play-circle" className="text-primary" size="size-4" />
                              )}
                              {lesson.status === 'locked' && (
                                <Icon name="lock" className="text-muted-foreground" size="size-4" />
                              )}
                            </div>
                          </div>
                        ))}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </TabsContent>

              {/* TAB 2: RESOURCES */}
              <TabsContent value="resources" className="animate-fade-in space-y-6">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {resources.map((res) => (
                    <div
                      key={res.id}
                      className="group flex cursor-pointer items-center justify-between rounded-xl border border-border bg-card/50 p-4 transition-all hover:border-primary/30 hover:bg-card"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-border bg-muted">
                          <Icon name={res.icon} size="size-6" className={res.color} />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-foreground transition-colors group-hover:text-primary">
                            {res.title}
                          </h4>
                          <div className="mt-1 flex items-center gap-2">
                            <Badge
                              variant="secondary"
                              className="h-4 border-0 bg-muted text-[9px] text-muted-foreground"
                            >
                              {res.type}
                            </Badge>
                            <span className="font-mono text-[10px] text-muted-foreground">
                              {res.size}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="opacity-0 transition-opacity group-hover:opacity-100">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="text-muted-foreground hover:text-primary"
                        >
                          <Icon
                            name={res.type === 'Link' ? 'external-link' : 'download'}
                            size="size-4"
                          />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              {/* TAB 3: STUDENTS LIST */}
              <TabsContent value="students" className="animate-fade-in space-y-6">
                {/* Filters Bar */}
                <div className="flex flex-col items-center justify-between gap-4 rounded-xl border border-border bg-muted/20 p-3 sm:flex-row">
                  <div className="relative w-full">
                    <Icon
                      name="search"
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                      size="size-4"
                    />
                    <Input
                      placeholder="Encontrar colega..."
                      className="h-10 border-input bg-background pl-10 text-sm focus:border-primary/50"
                    />
                  </div>
                </div>

                {/* Students Table */}
                <div className="overflow-hidden rounded-xl border border-border bg-card">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                      <thead className="border-b border-border bg-muted/40 text-xs uppercase text-muted-foreground">
                        <tr>
                          <th className="px-6 py-4 font-medium tracking-wider">Aluno</th>
                          <th className="px-6 py-4 font-medium tracking-wider">Status</th>
                          <th className="px-6 py-4 font-medium tracking-wider">Progresso</th>
                          <th className="px-6 py-4 text-right font-medium tracking-wider">Ações</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {studentsList.map((student) => {
                          const statusInfo = getStatusStyle(student.status);
                          return (
                            <tr
                              key={student.id}
                              className="group transition-colors hover:bg-muted/30"
                            >
                              <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                  <Avatar className="h-10 w-10 border border-border">
                                    <AvatarImage src={student.avatar} />
                                    <AvatarFallback>{student.name.substring(0, 2)}</AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <div className="cursor-pointer font-bold text-foreground transition-colors group-hover:text-primary">
                                      {student.name}
                                    </div>
                                    <div className="text-xs text-muted-foreground">Aluno</div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <Badge
                                  variant="outline"
                                  className={cn(
                                    'border text-[10px] font-bold uppercase',
                                    statusInfo.class
                                  )}
                                >
                                  {statusInfo.label}
                                </Badge>
                              </td>
                              <td className="w-48 px-6 py-4">
                                <div className="flex items-center gap-3">
                                  <Progress value={student.progress} className="h-1.5 bg-muted" />
                                  <span className="w-8 text-right font-mono text-xs font-bold text-muted-foreground">
                                    {student.progress}%
                                  </span>
                                </div>
                              </td>
                              <td className="px-6 py-4 text-right">
                                <div className="flex items-center justify-end gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                                  <Button
                                    size="icon"
                                    variant="ghost"
                                    className="h-8 w-8 text-muted-foreground hover:text-foreground"
                                    title="Enviar Mensagem"
                                  >
                                    <Icon name="envelope" size="size-4" />
                                  </Button>
                                  <Button
                                    size="icon"
                                    variant="ghost"
                                    className="h-8 w-8 text-muted-foreground hover:text-foreground"
                                    title="Ver Perfil"
                                  >
                                    <Icon name="user" size="size-4" />
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                  <div className="border-t border-border bg-muted/10 p-4 text-center">
                    <Button
                      variant="link"
                      className="text-xs text-muted-foreground hover:text-foreground"
                    >
                      Carregar mais colegas
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column: Sidebar Info */}
          <div className="space-y-8 lg:col-span-4">
            {/* Cover Image Card */}
            <div className="group relative overflow-hidden rounded-2xl border border-border shadow-2xl">
              <div className="relative aspect-[4/3]">
                <CourseCover image={course.cover} title={course.title} showTitle={!course.cover} />
                {course.cover && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                )}
                <div className="absolute bottom-4 left-4 right-4">
                  <Badge className="mb-2 bg-primary font-bold text-primary-foreground hover:bg-primary">
                    Dev No-Code
                  </Badge>
                </div>
                <div
                  className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black/40 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100"
                  onClick={() => firstAvailableLesson && goToPlayer(firstAvailableLesson.id)}
                >
                  <div className="flex h-16 w-16 transform items-center justify-center rounded-full bg-white pl-1 shadow-xl transition-transform group-hover:scale-110">
                    <Icon name="play" className="text-2xl text-black" />
                  </div>
                </div>
              </div>
            </div>

            {/* Certificates & Badges */}
            <div className="space-y-4 rounded-xl border border-border bg-card p-6">
              <h4 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
                Certificado
              </h4>
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-border bg-muted text-muted-foreground">
                  <Icon name="badge-check" size="size-6" />
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">Certificado de Conclusão</p>
                  <p className="text-xs text-muted-foreground">Complete 100% do curso</p>
                </div>
              </div>
            </div>

            {/* Community */}
            <div className="space-y-4 rounded-xl border border-primary/20 bg-gradient-to-br from-primary/10 to-transparent p-6">
              <h4 className="text-sm font-bold uppercase tracking-widest text-primary">
                Comunidade
              </h4>
              <p className="text-sm text-muted-foreground">
                Tire dúvidas e faça networking com outros alunos no nosso Discord exclusivo.
              </p>
              <Button
                variant="outline"
                className="w-full border-primary/30 text-primary hover:bg-primary/10"
              >
                Acessar Comunidade
              </Button>
            </div>

            {/* Testimonials */}
            <div className="space-y-6 rounded-xl border border-border bg-card p-6">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
                  Depoimentos
                </h4>
                <div className="flex items-center gap-1 text-xs font-bold text-yellow-500">
                  <Icon name="star" size="size-3" /> 4.9
                </div>
              </div>

              <div className="space-y-5">
                {/* Review 1 */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6 border border-border">
                        <AvatarFallback className="bg-muted text-[9px]">SL</AvatarFallback>
                      </Avatar>
                      <span className="text-xs font-bold text-foreground">Sarah Lima</span>
                    </div>
                    <span className="text-[10px] text-muted-foreground">2d atrás</span>
                  </div>
                  <p className="font-serif text-xs leading-relaxed text-muted-foreground">
                    "O módulo de banco de dados finalmente fez a ficha cair. Já estou aplicando no
                    meu projeto."
                  </p>
                  <div className="flex gap-0.5 text-yellow-500">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Icon key={i} name="star" size="size-3" />
                    ))}
                  </div>
                </div>

                <Separator className="bg-border" />

                {/* Review 2 */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6 border border-border">
                        <AvatarFallback className="bg-muted text-[9px]">MP</AvatarFallback>
                      </Avatar>
                      <span className="text-xs font-bold text-foreground">Marcos Paulo</span>
                    </div>
                    <span className="text-[10px] text-muted-foreground">1sem atrás</span>
                  </div>
                  <p className="font-serif text-xs leading-relaxed text-muted-foreground">
                    "A didática é direto ao ponto. Sem enrolação. O melhor investimento que fiz este
                    ano."
                  </p>
                  <div className="flex gap-0.5 text-yellow-500">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Icon key={i} name="star" size="size-3" />
                    ))}
                  </div>
                </div>
              </div>

              <Button
                variant="ghost"
                className="h-8 w-full border border-border text-xs text-muted-foreground hover:text-foreground"
              >
                Ver todos os 154 depoimentos
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

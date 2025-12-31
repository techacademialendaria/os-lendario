import React, { useState } from 'react';
import CreatorTopbar from '../CreatorTopbar';
import { Section } from '../../../types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../ui/card';
import { Button } from '../../ui/button';
import { Icon } from '../../ui/icon';
import { Badge } from '../../ui/badge';
import { Input } from '../../ui/input';
import { ScrollArea } from '../../ui/scroll-area';
import { Separator } from '../../ui/separator';
import { Progress } from '../../ui/progress';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../ui/table';
import { Select } from '../../ui/select';
import { Checkbox } from '../../ui/checkbox';
import { cn } from '../../../lib/utils';
import { STUDIO_PRIMARY, STUDIO_ACCENT } from '../studio-tokens';

// --- TYPES ---
interface Lesson {
  id: string;
  moduleId: number;
  moduleName: string;
  title: string;
  duration: string;
  type: 'video' | 'text' | 'quiz' | 'practice';
  status: 'draft' | 'generating' | 'review' | 'completed';
  gpsScore?: number;
  dlScore?: number;
  wordCount?: number;
  lastUpdated: string;
}

interface CourseLessonsTemplateProps {
  setSection: (s: Section) => void;
  courseSlug: string;
  courseTitle: string;
  onBack: () => void;
  onNavigate: (view: 'overview' | 'brief' | 'research' | 'curriculum' | 'validation') => void;
  onEditLesson?: (lessonId: string) => void;
}

// --- SIDEBAR NAV COMPONENT ---
const CourseSidebar = ({
  courseTitle,
  currentStep,
  pipeline,
  onNavigate,
}: {
  courseTitle: string;
  currentStep: string;
  pipeline: { key: string; label: string; status: 'completed' | 'current' | 'pending' }[];
  onNavigate: (view: any) => void;
}) => {
  return (
    <div className="flex h-[calc(100vh-64px)] w-64 shrink-0 flex-col border-r border-border bg-card/50">
      <div className="border-b border-border p-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onNavigate('overview')}
          className="mb-2 gap-2"
        >
          <Icon name="arrow-left" size="size-3" />
          <span>Voltar ao curso</span>
        </Button>
        <h3 className="truncate font-bold text-foreground">{courseTitle}</h3>
      </div>

      <ScrollArea className="flex-1">
        <div className="space-y-2 p-4">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">
            Pipeline
          </p>
          {pipeline.map((step) => {
            let iconName = 'circle';
            let colorClass = 'text-muted-foreground/40';

            if (step.status === 'completed') {
              iconName = 'check-circle';
              colorClass = 'text-success';
            } else if (step.status === 'current') {
              iconName = 'target';
              colorClass = 'text-primary';
            }

            const isActive = currentStep === step.key;

            return (
              <Button
                key={step.key}
                variant="ghost"
                size="sm"
                onClick={() => step.status !== 'pending' && onNavigate(step.key)}
                disabled={step.status === 'pending'}
                className={cn(
                  'w-full justify-start gap-3',
                  isActive
                    ? 'bg-primary/10 font-medium text-primary ring-1 ring-primary/20'
                    : step.status === 'pending'
                      ? 'cursor-not-allowed'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                )}
              >
                <Icon
                  name={iconName}
                  size="size-4"
                  className={colorClass}
                  type={step.status === 'completed' ? 'solid' : 'regular'}
                />
                <span>{step.label}</span>
              </Button>
            );
          })}
        </div>
      </ScrollArea>

      <div className="border-t border-border bg-muted/20 p-4">
        <div className="mb-2 flex items-center gap-2 text-xs text-muted-foreground">
          <Icon name="clock" size="size-3" />
          <span>Auto-save ativo</span>
        </div>
        <p className="text-[10px] text-muted-foreground">Última alteração: há 3 min</p>
      </div>
    </div>
  );
};

// --- MOCK DATA ---
const mockLessons: Lesson[] = [
  {
    id: '1.1',
    moduleId: 1,
    moduleName: 'O Desafio do Engajamento',
    title: 'Introdução ao Desafio',
    duration: '8 min',
    type: 'video',
    status: 'completed',
    gpsScore: 92,
    dlScore: 88,
    wordCount: 1250,
    lastUpdated: '09/12/2025',
  },
  {
    id: '1.2',
    moduleId: 1,
    moduleName: 'O Desafio do Engajamento',
    title: 'A Curva da Atenção',
    duration: '7 min',
    type: 'video',
    status: 'completed',
    gpsScore: 88,
    dlScore: 85,
    wordCount: 1100,
    lastUpdated: '09/12/2025',
  },
  {
    id: '1.3',
    moduleId: 1,
    moduleName: 'O Desafio do Engajamento',
    title: 'Erros Comuns',
    duration: '8 min',
    type: 'video',
    status: 'review',
    gpsScore: 75,
    dlScore: 72,
    wordCount: 1300,
    lastUpdated: '09/12/2025',
  },
  {
    id: '1.4',
    moduleId: 1,
    moduleName: 'O Desafio do Engajamento',
    title: 'Case de Sucesso',
    duration: '7 min',
    type: 'video',
    status: 'generating',
    lastUpdated: '09/12/2025',
  },
  {
    id: '2.1',
    moduleId: 2,
    moduleName: 'Método GPS',
    title: 'Destino Claro',
    duration: '10 min',
    type: 'video',
    status: 'draft',
    lastUpdated: '08/12/2025',
  },
  {
    id: '2.2',
    moduleId: 2,
    moduleName: 'Método GPS',
    title: 'Origem (Empatia)',
    duration: '8 min',
    type: 'video',
    status: 'draft',
    lastUpdated: '08/12/2025',
  },
  {
    id: '2.3',
    moduleId: 2,
    moduleName: 'Método GPS',
    title: 'Rota Otimizada',
    duration: '9 min',
    type: 'video',
    status: 'draft',
    lastUpdated: '08/12/2025',
  },
  {
    id: '2.4',
    moduleId: 2,
    moduleName: 'Método GPS',
    title: 'Workshop GPS',
    duration: '8 min',
    type: 'practice',
    status: 'draft',
    lastUpdated: '08/12/2025',
  },
  {
    id: '3.1',
    moduleId: 3,
    moduleName: 'Didática para o Aluno Lendário',
    title: 'Perfil do Aluno',
    duration: '10 min',
    type: 'video',
    status: 'draft',
    lastUpdated: '07/12/2025',
  },
  {
    id: '3.2',
    moduleId: 3,
    moduleName: 'Didática para o Aluno Lendário',
    title: 'Linguagem e Tom',
    duration: '8 min',
    type: 'video',
    status: 'draft',
    lastUpdated: '07/12/2025',
  },
];

const CourseLessonsTemplate: React.FC<CourseLessonsTemplateProps> = ({
  setSection,
  courseSlug,
  courseTitle,
  onBack,
  onNavigate,
  onEditLesson,
}) => {
  const [lessons, setLessons] = useState<Lesson[]>(mockLessons);
  const [selectedLessons, setSelectedLessons] = useState<string[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterModule, setFilterModule] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const pipeline = [
    { key: 'brief', label: 'Brief', status: 'completed' as const },
    { key: 'research', label: 'Research', status: 'completed' as const },
    { key: 'curriculum', label: 'Currículo', status: 'completed' as const },
    { key: 'lessons', label: 'Lições', status: 'current' as const },
    { key: 'validation', label: 'Validação', status: 'pending' as const },
  ];

  // Get unique modules for filter
  const modules = Array.from(new Set(lessons.map((l) => l.moduleName)));

  // Filter lessons
  const filteredLessons = lessons.filter((lesson) => {
    const matchesStatus = filterStatus === 'all' || lesson.status === filterStatus;
    const matchesModule = filterModule === 'all' || lesson.moduleName === filterModule;
    const matchesSearch =
      searchQuery === '' ||
      lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lesson.id.includes(searchQuery);
    return matchesStatus && matchesModule && matchesSearch;
  });

  // Statistics
  const stats = {
    total: lessons.length,
    completed: lessons.filter((l) => l.status === 'completed').length,
    review: lessons.filter((l) => l.status === 'review').length,
    generating: lessons.filter((l) => l.status === 'generating').length,
    draft: lessons.filter((l) => l.status === 'draft').length,
  };

  const progressPercent = Math.round((stats.completed / stats.total) * 100);

  const toggleSelectAll = () => {
    if (selectedLessons.length === filteredLessons.length) {
      setSelectedLessons([]);
    } else {
      setSelectedLessons(filteredLessons.map((l) => l.id));
    }
  };

  const toggleSelectLesson = (lessonId: string) => {
    setSelectedLessons((prev) =>
      prev.includes(lessonId) ? prev.filter((id) => id !== lessonId) : [...prev, lessonId]
    );
  };

  const handleGenerateSelected = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setLessons((prev) =>
        prev.map((lesson) =>
          selectedLessons.includes(lesson.id) && lesson.status === 'draft'
            ? { ...lesson, status: 'generating' as const }
            : lesson
        )
      );
      setSelectedLessons([]);
      setIsGenerating(false);
    }, 1500);
  };

  const getStatusBadge = (status: Lesson['status']) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-success/10 text-success border-0 text-[10px]">Concluído</Badge>;
      case 'review':
        return (
          <Badge className="border-0 bg-brand-yellow/10 text-[10px] text-brand-yellow">
            Revisão
          </Badge>
        );
      case 'generating':
        return (
          <Badge className="animate-pulse border-0 text-[10px] text-studio-primary bg-studio-primary/10">
            Gerando...
          </Badge>
        );
      default:
        return (
          <Badge variant="secondary" className="text-[10px]">
            Rascunho
          </Badge>
        );
    }
  };

  const getTypeIcon = (type: Lesson['type']) => {
    switch (type) {
      case 'video':
        return 'video';
      case 'text':
        return 'document';
      case 'quiz':
        return 'question';
      case 'practice':
        return 'laptop-code';
      default:
        return 'document';
    }
  };

  const getScoreColor = (score?: number) => {
    if (!score) return 'text-muted-foreground';
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-brand-yellow';
    return 'text-destructive';
  };

  return (
    <div className="flex min-h-screen flex-col bg-background font-sans">
      <CreatorTopbar currentSection={Section.APP_CREATOR_COURSES} setSection={setSection} />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <CourseSidebar
          courseTitle={courseTitle}
          currentStep="lessons"
          pipeline={pipeline}
          onNavigate={onNavigate}
        />

        {/* Main Content */}
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Header */}
          <div className="flex h-16 shrink-0 items-center justify-between border-b border-border bg-card px-6">
            <div>
              <h1 className="text-lg font-bold">Lições do Curso</h1>
              <p className="text-xs text-muted-foreground">
                Gerencie e edite o conteúdo de cada lição
              </p>
            </div>
            <div className="flex items-center gap-3">
              {selectedLessons.length > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleGenerateSelected}
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <Icon name="refresh" className="mr-2 size-4 animate-spin" />
                  ) : (
                    <Icon name="magic-wand" className="mr-2 size-4" />
                  )}
                  Gerar {selectedLessons.length} Selecionadas
                </Button>
              )}
              <Button
                onClick={() => onNavigate('validation')}
                className="bg-studio-primary hover:bg-studio-primary/90 text-white"
                disabled={stats.completed < stats.total}
              >
                Ir para Validação
                <Icon name="arrow-right" className="ml-2 size-4" />
              </Button>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="border-b border-border bg-muted/20 px-6 py-4">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="bg-success h-3 w-3 rounded-full"></div>
                  <span className="text-sm">{stats.completed} concluídas</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-brand-yellow"></div>
                  <span className="text-sm">{stats.review} em revisão</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 animate-pulse rounded-full bg-primary"></div>
                  <span className="text-sm">{stats.generating} gerando</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-muted"></div>
                  <span className="text-sm">{stats.draft} rascunhos</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Progresso:</span>
                <Progress value={progressPercent} className="h-2 w-32" />
                <span className="font-mono text-sm">{progressPercent}%</span>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="border-b border-border bg-card px-6 py-3">
            <div className="flex items-center gap-4">
              <div className="relative max-w-sm flex-1">
                <Icon
                  name="search"
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  size="size-4"
                />
                <Input
                  placeholder="Buscar por título ou ID..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select
                placeholder="Status"
                value={filterStatus}
                onValueChange={setFilterStatus}
                className="w-40"
                options={[
                  { label: 'Todos', value: 'all' },
                  { label: 'Concluído', value: 'completed' },
                  { label: 'Revisão', value: 'review' },
                  { label: 'Gerando', value: 'generating' },
                  { label: 'Rascunho', value: 'draft' },
                ]}
              />
              <Select
                placeholder="Módulo"
                value={filterModule}
                onValueChange={setFilterModule}
                className="w-56"
                options={[
                  { label: 'Todos os Módulos', value: 'all' },
                  ...modules.map((m) => ({ label: m, value: m })),
                ]}
              />
            </div>
          </div>

          {/* Table */}
          <ScrollArea className="flex-1">
            <Card className="m-6 overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/30">
                    <TableHead className="w-12">
                      <Checkbox
                        checked={
                          selectedLessons.length === filteredLessons.length &&
                          filteredLessons.length > 0
                        }
                        onCheckedChange={toggleSelectAll}
                      />
                    </TableHead>
                    <TableHead className="w-16">ID</TableHead>
                    <TableHead className="w-12">Tipo</TableHead>
                    <TableHead>Título</TableHead>
                    <TableHead>Módulo</TableHead>
                    <TableHead className="w-24">Status</TableHead>
                    <TableHead className="w-16 text-center">GPS</TableHead>
                    <TableHead className="w-16 text-center">DL</TableHead>
                    <TableHead className="w-20">Duração</TableHead>
                    <TableHead className="w-24">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLessons.map((lesson) => (
                    <TableRow
                      key={lesson.id}
                      className={cn(
                        'cursor-pointer transition-colors hover:bg-muted/20',
                        selectedLessons.includes(lesson.id) && 'bg-primary/5'
                      )}
                    >
                      <TableCell>
                        <Checkbox
                          checked={selectedLessons.includes(lesson.id)}
                          onCheckedChange={() => toggleSelectLesson(lesson.id)}
                        />
                      </TableCell>
                      <TableCell>
                        <span className="font-mono text-xs text-muted-foreground">{lesson.id}</span>
                      </TableCell>
                      <TableCell>
                        <div className="flex h-8 w-8 items-center justify-center rounded bg-muted/50">
                          <Icon
                            name={getTypeIcon(lesson.type)}
                            size="size-4"
                            className="text-muted-foreground"
                          />
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="font-medium">{lesson.title}</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-muted-foreground">{lesson.moduleName}</span>
                      </TableCell>
                      <TableCell>{getStatusBadge(lesson.status)}</TableCell>
                      <TableCell className="text-center">
                        <span
                          className={cn(
                            'font-mono text-sm font-bold',
                            getScoreColor(lesson.gpsScore)
                          )}
                        >
                          {lesson.gpsScore || '-'}
                        </span>
                      </TableCell>
                      <TableCell className="text-center">
                        <span
                          className={cn(
                            'font-mono text-sm font-bold',
                            getScoreColor(lesson.dlScore)
                          )}
                        >
                          {lesson.dlScore || '-'}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="font-mono text-[10px]">
                          {lesson.duration}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => onEditLesson?.(lesson.id)}
                          >
                            <Icon name="pencil" size="size-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Icon name="eye" size="size-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};

export default CourseLessonsTemplate;

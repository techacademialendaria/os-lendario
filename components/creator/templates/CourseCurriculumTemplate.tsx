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
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from '../../ui/sheet';
import { Label } from '../../ui/label';
import { Textarea } from '../../ui/textarea';
import { Select } from '../../ui/select';
import { cn } from '../../../lib/utils';
import { STUDIO_PRIMARY, STUDIO_ACCENT } from '../studio-tokens';

// --- TYPES ---
interface Lesson {
  id: string;
  title: string;
  duration: string;
  type: 'video' | 'text' | 'quiz' | 'practice';
  status: 'draft' | 'in_progress' | 'completed';
}

interface Module {
  id: number;
  title: string;
  description: string;
  lessons: Lesson[];
  isExpanded: boolean;
}

interface CourseCurriculumTemplateProps {
  setSection: (s: Section) => void;
  courseSlug: string;
  courseTitle: string;
  onBack: () => void;
  onNavigate: (view: 'overview' | 'brief' | 'research' | 'lessons' | 'validation') => void;
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
        <p className="text-[10px] text-muted-foreground">Última alteração: há 1 min</p>
      </div>
    </div>
  );
};

// --- MOCK DATA ---
const initialModules: Module[] = [
  {
    id: 1,
    title: 'O Desafio do Engajamento',
    description: 'Por que 70% dos alunos abandonam cursos.',
    isExpanded: true,
    lessons: [
      {
        id: '1.1',
        title: 'Introdução ao Desafio',
        duration: '8 min',
        type: 'video',
        status: 'completed',
      },
      {
        id: '1.2',
        title: 'A Curva da Atenção',
        duration: '7 min',
        type: 'video',
        status: 'completed',
      },
      { id: '1.3', title: 'Erros Comuns', duration: '8 min', type: 'video', status: 'in_progress' },
      { id: '1.4', title: 'Case de Sucesso', duration: '7 min', type: 'video', status: 'draft' },
    ],
  },
  {
    id: 2,
    title: 'Método GPS',
    description: 'Dominar Destino + Origem + Rota.',
    isExpanded: true,
    lessons: [
      { id: '2.1', title: 'Destino Claro', duration: '10 min', type: 'video', status: 'draft' },
      { id: '2.2', title: 'Origem (Empatia)', duration: '8 min', type: 'video', status: 'draft' },
      { id: '2.3', title: 'Rota Otimizada', duration: '9 min', type: 'video', status: 'draft' },
      { id: '2.4', title: 'Workshop GPS', duration: '8 min', type: 'practice', status: 'draft' },
    ],
  },
  {
    id: 3,
    title: 'Didática para o Aluno Lendário',
    description: 'Adaptar para o ICP da Academia.',
    isExpanded: false,
    lessons: [
      { id: '3.1', title: 'Perfil do Aluno', duration: '10 min', type: 'video', status: 'draft' },
      { id: '3.2', title: 'Linguagem e Tom', duration: '8 min', type: 'video', status: 'draft' },
      { id: '3.3', title: 'Exemplos Práticos', duration: '12 min', type: 'video', status: 'draft' },
      { id: '3.4', title: 'Andragogia', duration: '10 min', type: 'video', status: 'draft' },
      { id: '3.5', title: 'Gamificação', duration: '10 min', type: 'video', status: 'draft' },
      { id: '3.6', title: 'Feedback Loop', duration: '5 min', type: 'video', status: 'draft' },
      { id: '3.7', title: 'Conclusão do Módulo', duration: '5 min', type: 'text', status: 'draft' },
    ],
  },
  {
    id: 4,
    title: 'Semiótica da Imagem',
    description: 'Transformar conceitos em imagens mentais.',
    isExpanded: false,
    lessons: [
      {
        id: '4.1',
        title: 'Fundamentos da Semiótica',
        duration: '10 min',
        type: 'video',
        status: 'draft',
      },
      { id: '4.2', title: 'Metáforas Visuais', duration: '10 min', type: 'video', status: 'draft' },
      {
        id: '4.3',
        title: 'Storytelling Visual',
        duration: '10 min',
        type: 'video',
        status: 'draft',
      },
      { id: '4.4', title: 'Exercício Prático', duration: '10 min', type: 'quiz', status: 'draft' },
    ],
  },
  {
    id: 5,
    title: 'Estrutura de Aula Completa',
    description: 'As 7 partes de uma aula perfeita.',
    isExpanded: false,
    lessons: [
      { id: '5.1', title: 'O Hook (Gancho)', duration: '8 min', type: 'video', status: 'draft' },
      { id: '5.2', title: 'Desenvolvimento', duration: '12 min', type: 'video', status: 'draft' },
      { id: '5.3', title: 'Clímax', duration: '8 min', type: 'video', status: 'draft' },
      { id: '5.4', title: 'Call to Action', duration: '7 min', type: 'video', status: 'draft' },
      { id: '5.5', title: 'Revisão', duration: '10 min', type: 'quiz', status: 'draft' },
    ],
  },
];

const CourseCurriculumTemplate: React.FC<CourseCurriculumTemplateProps> = ({
  setSection,
  courseSlug,
  courseTitle,
  onBack,
  onNavigate,
  onEditLesson,
}) => {
  const [modules, setModules] = useState<Module[]>(initialModules);
  const [isAddModuleOpen, setIsAddModuleOpen] = useState(false);
  const [isAddLessonOpen, setIsAddLessonOpen] = useState(false);
  const [selectedModuleId, setSelectedModuleId] = useState<number | null>(null);
  const [newModuleTitle, setNewModuleTitle] = useState('');
  const [newModuleDescription, setNewModuleDescription] = useState('');
  const [newLessonTitle, setNewLessonTitle] = useState('');
  const [newLessonDuration, setNewLessonDuration] = useState('');
  const [newLessonType, setNewLessonType] = useState<Lesson['type']>('video');

  const pipeline = [
    { key: 'brief', label: 'Brief', status: 'completed' as const },
    { key: 'research', label: 'Research', status: 'completed' as const },
    { key: 'curriculum', label: 'Currículo', status: 'current' as const },
    { key: 'lessons', label: 'Lições', status: 'pending' as const },
    { key: 'validation', label: 'Validação', status: 'pending' as const },
  ];

  // Statistics
  const totalLessons = modules.reduce((acc, mod) => acc + mod.lessons.length, 0);
  const completedLessons = modules.reduce(
    (acc, mod) => acc + mod.lessons.filter((l) => l.status === 'completed').length,
    0
  );
  const totalDuration = modules.reduce((acc, mod) => {
    return (
      acc +
      mod.lessons.reduce((lacc, l) => {
        const mins = parseInt(l.duration) || 0;
        return lacc + mins;
      }, 0)
    );
  }, 0);

  const toggleModule = (moduleId: number) => {
    setModules((prev) =>
      prev.map((mod) => (mod.id === moduleId ? { ...mod, isExpanded: !mod.isExpanded } : mod))
    );
  };

  const handleAddModule = () => {
    if (!newModuleTitle) return;
    const newModule: Module = {
      id: Date.now(),
      title: newModuleTitle,
      description: newModuleDescription,
      lessons: [],
      isExpanded: true,
    };
    setModules((prev) => [...prev, newModule]);
    setNewModuleTitle('');
    setNewModuleDescription('');
    setIsAddModuleOpen(false);
  };

  const handleAddLesson = () => {
    if (!newLessonTitle || !selectedModuleId) return;
    const moduleIndex = modules.findIndex((m) => m.id === selectedModuleId);
    if (moduleIndex === -1) return;

    const lessonCount = modules[moduleIndex].lessons.length;
    const newLesson: Lesson = {
      id: `${selectedModuleId}.${lessonCount + 1}`,
      title: newLessonTitle,
      duration: newLessonDuration || '10 min',
      type: newLessonType,
      status: 'draft',
    };

    setModules((prev) =>
      prev.map((mod) =>
        mod.id === selectedModuleId ? { ...mod, lessons: [...mod.lessons, newLesson] } : mod
      )
    );

    setNewLessonTitle('');
    setNewLessonDuration('');
    setNewLessonType('video');
    setIsAddLessonOpen(false);
    setSelectedModuleId(null);
  };

  const deleteModule = (moduleId: number) => {
    setModules((prev) => prev.filter((mod) => mod.id !== moduleId));
  };

  const deleteLesson = (moduleId: number, lessonId: string) => {
    setModules((prev) =>
      prev.map((mod) =>
        mod.id === moduleId
          ? { ...mod, lessons: mod.lessons.filter((l) => l.id !== lessonId) }
          : mod
      )
    );
  };

  const getStatusIcon = (status: Lesson['status']) => {
    switch (status) {
      case 'completed':
        return { icon: 'check-circle', color: 'text-success' };
      case 'in_progress':
        return { icon: 'clock', color: 'text-brand-yellow' };
      default:
        return { icon: 'circle', color: 'text-muted-foreground/30' };
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

  return (
    <div className="flex min-h-screen flex-col bg-background font-sans">
      <CreatorTopbar currentSection={Section.APP_CREATOR_COURSES} setSection={setSection} />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <CourseSidebar
          courseTitle={courseTitle}
          currentStep="curriculum"
          pipeline={pipeline}
          onNavigate={onNavigate}
        />

        {/* Main Content */}
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Header */}
          <div className="flex h-16 shrink-0 items-center justify-between border-b border-border bg-card px-6">
            <div>
              <h1 className="text-lg font-bold">Estrutura do Currículo</h1>
              <p className="text-xs text-muted-foreground">
                Organize módulos e lições (arraste para reordenar)
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="mr-4 flex items-center gap-4 text-sm">
                <div className="text-center">
                  <p className="font-mono font-bold">{modules.length}</p>
                  <p className="text-[10px] text-muted-foreground">Módulos</p>
                </div>
                <Separator orientation="vertical" className="h-8" />
                <div className="text-center">
                  <p className="font-mono font-bold">{totalLessons}</p>
                  <p className="text-[10px] text-muted-foreground">Lições</p>
                </div>
                <Separator orientation="vertical" className="h-8" />
                <div className="text-center">
                  <p className="font-mono font-bold">
                    {Math.floor(totalDuration / 60)}h {totalDuration % 60}m
                  </p>
                  <p className="text-[10px] text-muted-foreground">Duração</p>
                </div>
              </div>
              <Button variant="outline" size="sm" onClick={() => setIsAddModuleOpen(true)}>
                <Icon name="plus" className="mr-2 size-4" /> Módulo
              </Button>
              <Button
                onClick={() => onNavigate('lessons')}
                className="bg-studio-primary hover:bg-studio-primary/90 text-white"
              >
                Gerar Lições
                <Icon name="arrow-right" className="ml-2 size-4" />
              </Button>
            </div>
          </div>

          {/* Content Area */}
          <ScrollArea className="flex-1">
            <div className="mx-auto max-w-4xl space-y-4 p-8">
              {modules.map((mod, modIndex) => (
                <Card key={mod.id} className="overflow-hidden">
                  {/* Module Header */}
                  <CardHeader
                    className={cn(
                      'cursor-pointer py-4 transition-colors',
                      mod.isExpanded ? 'border-b border-border bg-primary/5' : 'hover:bg-muted/30'
                    )}
                    onClick={() => toggleModule(mod.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg font-bold text-studio-primary bg-studio-primary/10">
                          {modIndex + 1}
                        </div>
                        <div>
                          <CardTitle className="text-base">{mod.title}</CardTitle>
                          <CardDescription className="text-xs">{mod.description}</CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge variant="outline" className="text-[10px]">
                          {mod.lessons.length} aulas
                        </Badge>
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedModuleId(mod.id);
                              setIsAddLessonOpen(true);
                            }}
                          >
                            <Icon name="plus" size="size-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive"
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteModule(mod.id);
                            }}
                          >
                            <Icon name="trash" size="size-4" />
                          </Button>
                        </div>
                        <Icon
                          name={mod.isExpanded ? 'angle-up' : 'angle-down'}
                          className="text-muted-foreground"
                          size="size-4"
                        />
                      </div>
                    </div>
                  </CardHeader>

                  {/* Lessons List */}
                  {mod.isExpanded && (
                    <CardContent className="p-0">
                      {mod.lessons.length === 0 ? (
                        <div className="p-8 text-center text-muted-foreground">
                          <Icon name="document" className="mx-auto mb-2 size-8 opacity-30" />
                          <p className="text-sm">Nenhuma lição neste módulo</p>
                          <Button
                            variant="outline"
                            size="sm"
                            className="mt-4"
                            onClick={() => {
                              setSelectedModuleId(mod.id);
                              setIsAddLessonOpen(true);
                            }}
                          >
                            <Icon name="plus" className="mr-2 size-3" /> Criar primeira lição
                          </Button>
                        </div>
                      ) : (
                        mod.lessons.map((lesson, lessonIndex) => {
                          const statusInfo = getStatusIcon(lesson.status);
                          return (
                            <div
                              key={lesson.id}
                              className="group flex items-center gap-4 border-b border-border p-4 transition-colors last:border-0 hover:bg-muted/20"
                            >
                              {/* Drag Handle */}
                              <Icon
                                name="menu-burger"
                                className="cursor-grab text-muted-foreground/30 group-hover:text-muted-foreground"
                                size="size-4"
                              />

                              {/* Status */}
                              <Icon
                                name={statusInfo.icon}
                                className={statusInfo.color}
                                size="size-4"
                                type={lesson.status === 'completed' ? 'solid' : 'regular'}
                              />

                              {/* Lesson Number */}
                              <span className="w-8 font-mono text-xs text-muted-foreground">
                                {lesson.id}
                              </span>

                              {/* Type Icon */}
                              <div className="flex h-8 w-8 items-center justify-center rounded bg-muted/50">
                                <Icon
                                  name={getTypeIcon(lesson.type)}
                                  size="size-4"
                                  className="text-muted-foreground"
                                />
                              </div>

                              {/* Title */}
                              <span className="flex-1 text-sm font-medium">{lesson.title}</span>

                              {/* Duration */}
                              <Badge variant="secondary" className="font-mono text-[10px]">
                                {lesson.duration}
                              </Badge>

                              {/* Actions */}
                              <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() => onEditLesson?.(lesson.id)}
                                >
                                  <Icon name="pencil" size="size-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 text-destructive"
                                  onClick={() => deleteLesson(mod.id, lesson.id)}
                                >
                                  <Icon name="trash" size="size-4" />
                                </Button>
                              </div>
                            </div>
                          );
                        })
                      )}
                    </CardContent>
                  )}
                </Card>
              ))}

              {/* Add Module Button */}
              <Button
                variant="outline"
                className="w-full border-dashed py-8 hover:bg-primary/5 hover:border-primary/50 bg-studio-primary/5"
                onClick={() => setIsAddModuleOpen(true)}
              >
                <Icon name="plus" className="mr-2 size-5" />
                Adicionar Novo Módulo
              </Button>
            </div>
          </ScrollArea>
        </div>
      </div>

      {/* Add Module Sheet */}
      <Sheet open={isAddModuleOpen} onOpenChange={setIsAddModuleOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Novo Módulo</SheetTitle>
            <SheetDescription>Adicione um novo módulo ao currículo</SheetDescription>
          </SheetHeader>
          <div className="space-y-6 py-6">
            <div className="space-y-2">
              <Label>Título do Módulo</Label>
              <Input
                placeholder="Ex: Fundamentos do Método GPS"
                value={newModuleTitle}
                onChange={(e) => setNewModuleTitle(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Descrição</Label>
              <Textarea
                placeholder="Uma breve descrição do que será abordado..."
                value={newModuleDescription}
                onChange={(e) => setNewModuleDescription(e.target.value)}
              />
            </div>
          </div>
          <SheetFooter>
            <Button variant="outline" onClick={() => setIsAddModuleOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleAddModule} disabled={!newModuleTitle}>
              Criar Módulo
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      {/* Add Lesson Sheet */}
      <Sheet open={isAddLessonOpen} onOpenChange={setIsAddLessonOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Nova Lição</SheetTitle>
            <SheetDescription>Adicione uma nova lição ao módulo</SheetDescription>
          </SheetHeader>
          <div className="space-y-6 py-6">
            <div className="space-y-2">
              <Label>Título da Lição</Label>
              <Input
                placeholder="Ex: Introdução ao Conceito"
                value={newLessonTitle}
                onChange={(e) => setNewLessonTitle(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Duração Estimada</Label>
                <Input
                  placeholder="Ex: 10 min"
                  value={newLessonDuration}
                  onChange={(e) => setNewLessonDuration(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Tipo de Conteúdo</Label>
                <Select
                  value={newLessonType}
                  onValueChange={(v) => setNewLessonType(v as Lesson['type'])}
                  options={[
                    { label: 'Vídeo', value: 'video' },
                    { label: 'Texto', value: 'text' },
                    { label: 'Quiz', value: 'quiz' },
                    { label: 'Prático', value: 'practice' },
                  ]}
                />
              </div>
            </div>
          </div>
          <SheetFooter>
            <Button variant="outline" onClick={() => setIsAddLessonOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleAddLesson} disabled={!newLessonTitle}>
              Criar Lição
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default CourseCurriculumTemplate;

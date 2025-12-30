import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CreatorTopbar from '../CreatorTopbar';
import { Section } from '../../../types';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '../../ui/card';
import { Button } from '../../ui/button';
import { Icon } from '../../ui/icon';
import { Input } from '../../ui/input';
import { Badge } from '../../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';
import { Select } from '../../ui/select';
import { ScrollArea } from '../../ui/scroll-area';
import { cn } from '../../../lib/utils';
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '../../ui/dropdown-menu';
import { Skeleton } from '../../ui/skeleton';
import { FileUpload } from '../../ui/file-upload';
import { Separator } from '../../ui/separator';
import { Textarea } from '../../ui/textarea';
import { Slider } from '../../ui/slider';
import { Label } from '../../ui/label';
import { RadioGroup, RadioGroupItem } from '../../ui/radio-group';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from '../../ui/sheet';
import { Progress } from '../../ui/progress';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '../../ui/alert';
import LessonEditor from './LessonEditor';
import { useCourses, Course as HookCourse } from '../../../hooks/useCourses';
import { useCourseContents } from '../../../hooks/useCourseContents';
import {
  useRecentActivities,
  formatRelativeTime,
  getIconForTipoLabel,
} from '../../../hooks/useRecentActivities';
import { STUDIO_PRIMARY, STUDIO_GOLD, STUDIO_ACCENT, getCategoryColor } from '../studio-tokens';

// --- TYPES & MOCK DATA ---
type ViewState =
  | 'list'
  | 'new'
  | 'brief'
  | 'research_loading' // Agent Running: Market Research
  | 'research_results' // Checkpoint: Review Market Data
  | 'reformulation' // Checkpoint: Review Brief Updates
  | 'curriculum' // Checkpoint: Approve Structure
  | 'generation' // Agent Running: Lesson Gen + GPS/DL Validation
  | 'lesson' // Manual: Review Lesson (NOW USES LessonEditor)
  | 'validation'; // Final QA

interface Course {
  id: string | number;
  title: string;
  slug: string;
  icon: string;
  category: string;
  instructor: {
    name: string;
    avatar: string;
    isMMOS: boolean;
  };
  // Content counts
  lessonsCount: number;
  modulesCount: number;
  researchCount: number;
  assessmentsCount: number;
  duration: string;
  // Metadata
  type: 'Greenfield' | 'Brownfield';
  frameworks: string[]; // e.g., ['GPS', 'Didática Lendária']
  fidelityScore: number | null; // Average fidelity score (0-100)
  // Status
  statusLabel: string;
  progress: number;
  updatedAt: string;
  // Alerts
  alerts?: {
    type: 'warning' | 'error';
    message: string;
  }[];
  pipeline: {
    brief: 'completed' | 'current' | 'pending';
    research: 'completed' | 'current' | 'pending';
    curriculum: 'completed' | 'current' | 'pending';
    lessons: 'completed' | 'current' | 'pending';
    validation: 'completed' | 'current' | 'pending';
  };
}

// Full Curriculum Data for Didática Lendária (Real Data)
const didaticaCurriculum = [
  {
    id: 1,
    title: 'O Desafio do Engajamento',
    description: 'Por que 70% dos alunos abandonam cursos.',
    lessons: [
      { id: '1.1', title: 'Introdução ao Desafio', duration: '8 min' },
      { id: '1.2', title: 'A Curva da Atenção', duration: '7 min' },
      { id: '1.3', title: 'Erros Comuns', duration: '8 min' },
      { id: '1.4', title: 'Case de Sucesso', duration: '7 min' },
    ],
  },
  {
    id: 2,
    title: 'Método GPS',
    description: 'Dominar Destino + Origem + Rota.',
    lessons: [
      { id: '2.1', title: 'Destino Claro', duration: '10 min' },
      { id: '2.2', title: 'Origem (Empatia)', duration: '8 min' },
      { id: '2.3', title: 'Rota Otimizada', duration: '9 min' },
      { id: '2.4', title: 'Workshop GPS', duration: '8 min' },
    ],
  },
  {
    id: 3,
    title: 'Didática para o Aluno Lendário',
    description: 'Adaptar para o ICP da Academia.',
    lessons: [
      { id: '3.1', title: 'Perfil do Aluno', duration: '10 min' },
      { id: '3.2', title: 'Linguagem e Tom', duration: '8 min' },
      { id: '3.3', title: 'Exemplos Práticos', duration: '12 min' },
      { id: '3.4', title: 'Andragogia', duration: '10 min' },
      { id: '3.5', title: 'Gamificação', duration: '10 min' },
      { id: '3.6', title: 'Feedback Loop', duration: '5 min' },
      { id: '3.7', title: 'Conclusão do Módulo', duration: '5 min' },
    ],
  },
  {
    id: 4,
    title: 'Semiótica da Imagem',
    description: 'Transformar conceitos em imagens mentais.',
    lessons: [
      { id: '4.1', title: 'Fundamentos da Semiótica', duration: '10 min' },
      { id: '4.2', title: 'Metáforas Visuais', duration: '10 min' },
      { id: '4.3', title: 'Storytelling Visual', duration: '10 min' },
      { id: '4.4', title: 'Exercício Prático', duration: '10 min' },
    ],
  },
  {
    id: 5,
    title: 'Estrutura de Aula Completa',
    description: 'As 7 partes de uma aula perfeita.',
    lessons: [
      { id: '5.1', title: 'O Hook (Gancho)', duration: '8 min' },
      { id: '5.2', title: 'Desenvolvimento', duration: '12 min' },
      { id: '5.3', title: 'Clímax', duration: '8 min' },
      { id: '5.4', title: 'Call to Action', duration: '7 min' },
      { id: '5.5', title: 'Revisão', duration: '10 min' },
    ],
  },
];

// Helper to calculate status based on pipeline
// Simulating real pipeline status from the provided data structure
const coursesMock: Course[] = [
  // 1. Claude Code Expert
  {
    id: 'course_001',
    title: 'Claude Code Expert',
    slug: 'claude-code',
    icon: 'terminal',
    category: 'IA Generativa',
    instructor: {
      name: 'José Carlos Amorim',
      avatar: 'https://i.pravatar.cc/150?u=jose',
      isMMOS: true,
    },
    lessonsCount: 11,
    modulesCount: 3,
    researchCount: 5,
    assessmentsCount: 3,
    duration: '2.5h',
    type: 'Greenfield',
    frameworks: ['GPS'],
    fidelityScore: 94,
    statusLabel: 'Completo',
    progress: 100,
    updatedAt: '10/12/2025',
    pipeline: {
      brief: 'completed',
      research: 'completed',
      curriculum: 'completed',
      lessons: 'completed',
      validation: 'completed',
    },
  },
  // 2. Didática Lendária
  {
    id: 'course_002',
    title: 'Didática Lendária',
    slug: 'didatica-lendaria',
    icon: 'presentation',
    category: 'Soft Skills',
    instructor: {
      name: 'Adriano de Marqui',
      avatar:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop',
      isMMOS: true,
    },
    lessonsCount: 35,
    modulesCount: 7,
    researchCount: 12,
    assessmentsCount: 7,
    duration: '5.3h',
    type: 'Brownfield',
    frameworks: ['GPS', 'Didática Lendária'],
    fidelityScore: 78,
    statusLabel: 'Produzindo',
    progress: 65,
    updatedAt: '10/12/2025',
    alerts: [{ type: 'warning', message: '3 lições com fidelidade < 70%' }],
    pipeline: {
      brief: 'completed',
      research: 'completed',
      curriculum: 'completed',
      lessons: 'current',
      validation: 'pending',
    },
  },
  // 3. Vibecoding
  {
    id: 'course_003',
    title: 'Vibecoding - Apps Sem Código',
    slug: 'vibecoding',
    icon: 'magic-wand',
    category: 'Dev No-Code',
    instructor: {
      name: 'Alan Nicolas',
      avatar:
        'https://yt3.googleusercontent.com/JNCtRSKK2aMQOmEroyBWmdbiaq_uTlFn-h_RuhGakkxBHW14e9u4yMZk884Espvk8he9GIYjrPE=s900-c-k-c0x00ffffff-no-rj',
      isMMOS: false,
    },
    lessonsCount: 7,
    modulesCount: 3,
    researchCount: 3,
    assessmentsCount: 2,
    duration: '2h',
    type: 'Greenfield',
    frameworks: ['GPS'],
    fidelityScore: 92,
    statusLabel: 'Completo',
    progress: 100,
    updatedAt: '10/12/2025',
    pipeline: {
      brief: 'completed',
      research: 'completed',
      curriculum: 'completed',
      lessons: 'completed',
      validation: 'completed',
    },
  },
  // 4. Supabase Zero Backend
  {
    id: 'course_004',
    title: 'Supabase do Zero',
    slug: 'supabase-zero-backend',
    icon: 'database',
    category: 'Backend',
    instructor: {
      name: 'José Carlos Amorim',
      avatar: 'https://i.pravatar.cc/150?u=jose',
      isMMOS: true,
    },
    lessonsCount: 52,
    modulesCount: 13,
    researchCount: 8,
    assessmentsCount: 13,
    duration: '12h',
    type: 'Greenfield',
    frameworks: ['GPS'],
    fidelityScore: 88,
    statusLabel: 'Completo',
    progress: 100,
    updatedAt: '30/10/2025',
    pipeline: {
      brief: 'completed',
      research: 'completed',
      curriculum: 'completed',
      lessons: 'completed',
      validation: 'completed',
    },
  },
  // 5. Dominando Obsidian
  {
    id: 'course_005',
    title: 'Dominando Obsidian',
    slug: 'dominando-obsidian',
    icon: 'document',
    category: 'Produtividade',
    instructor: {
      name: 'Adriano de Marqui',
      avatar:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop',
      isMMOS: true,
    },
    lessonsCount: 22,
    modulesCount: 5,
    researchCount: 6,
    assessmentsCount: 5,
    duration: '14.5h',
    type: 'Brownfield',
    frameworks: ['GPS', 'Didática Lendária'],
    fidelityScore: 82,
    statusLabel: 'Validação',
    progress: 90,
    updatedAt: '05/12/2025',
    pipeline: {
      brief: 'completed',
      research: 'completed',
      curriculum: 'completed',
      lessons: 'completed',
      validation: 'current',
    },
  },
  // 6. Método M.A.P.A.
  {
    id: 'course_006',
    title: 'Método M.A.P.A.™',
    slug: 'metodo-mapa',
    icon: 'map-marker',
    category: 'Estratégia',
    instructor: {
      name: 'Alan Nicolas',
      avatar:
        'https://yt3.googleusercontent.com/JNCtRSKK2aMQOmEroyBWmdbiaq_uTlFn-h_RuhGakkxBHW14e9u4yMZk884Espvk8he9GIYjrPE=s900-c-k-c0x00ffffff-no-rj',
      isMMOS: false,
    },
    lessonsCount: 14,
    modulesCount: 4,
    researchCount: 4,
    assessmentsCount: 4,
    duration: '14h',
    type: 'Greenfield',
    frameworks: ['GPS'],
    fidelityScore: 90,
    statusLabel: 'Completo',
    progress: 100,
    updatedAt: '15/11/2025',
    pipeline: {
      brief: 'completed',
      research: 'completed',
      curriculum: 'completed',
      lessons: 'completed',
      validation: 'completed',
    },
  },
  // 7. Meu Clone IA
  {
    id: 'course_007',
    title: 'Meu Clone IA',
    slug: 'meu-clone-ia',
    icon: 'fingerprint',
    category: 'Produtividade',
    instructor: {
      name: 'Alan Nicolas',
      avatar:
        'https://yt3.googleusercontent.com/JNCtRSKK2aMQOmEroyBWmdbiaq_uTlFn-h_RuhGakkxBHW14e9u4yMZk884Espvk8he9GIYjrPE=s900-c-k-c0x00ffffff-no-rj',
      isMMOS: false,
    },
    lessonsCount: 10,
    modulesCount: 3,
    researchCount: 2,
    assessmentsCount: 3,
    duration: '3h',
    type: 'Greenfield',
    frameworks: ['GPS'],
    fidelityScore: 85,
    statusLabel: 'Completo',
    progress: 100,
    updatedAt: '10/12/2025',
    pipeline: {
      brief: 'completed',
      research: 'completed',
      curriculum: 'completed',
      lessons: 'completed',
      validation: 'completed',
    },
  },
  // 8. Prompt Engineering
  {
    id: 'course_008',
    title: 'Prompt Engineering',
    slug: 'prompt-engineer',
    icon: 'comment-alt',
    category: 'IA Generativa',
    instructor: {
      name: 'José Carlos Amorim',
      avatar: 'https://i.pravatar.cc/150?u=jose',
      isMMOS: true,
    },
    lessonsCount: 12,
    modulesCount: 4,
    researchCount: 6,
    assessmentsCount: 4,
    duration: '16.5h',
    type: 'Greenfield',
    frameworks: ['GPS'],
    fidelityScore: 91,
    statusLabel: 'Completo',
    progress: 100,
    updatedAt: '25/10/2025',
    pipeline: {
      brief: 'completed',
      research: 'completed',
      curriculum: 'completed',
      lessons: 'completed',
      validation: 'completed',
    },
  },
];

// Live Generation Log with Framework Scores
const generationLog = [
  { id: '1.1', title: 'Introdução', gps: 92, dl: 85, status: 'success', msg: 'Hook validado' },
  { id: '1.2', title: 'Mindset', gps: 88, dl: 78, status: 'success', msg: 'História adicionada' },
  {
    id: '1.3',
    title: 'Diagnóstico',
    gps: 45,
    dl: 82,
    status: 'retrying',
    msg: 'GPS: Destino pouco claro. Regenerando...',
  },
  { id: '2.1', title: 'Pomodoro', gps: 0, dl: 0, status: 'pending', msg: 'Aguardando...' },
];

// Helper to convert hook courses to template Course format
const mapHookCourseToTemplateCourse = (hookCourse: HookCourse): Course => {
  const statusToPipeline = (status: HookCourse['status']): Course['pipeline'] => {
    const pipelines: Record<HookCourse['status'], Course['pipeline']> = {
      planning: {
        brief: 'current',
        research: 'pending',
        curriculum: 'pending',
        lessons: 'pending',
        validation: 'pending',
      },
      brief: {
        brief: 'current',
        research: 'pending',
        curriculum: 'pending',
        lessons: 'pending',
        validation: 'pending',
      },
      research: {
        brief: 'completed',
        research: 'current',
        curriculum: 'pending',
        lessons: 'pending',
        validation: 'pending',
      },
      curriculum: {
        brief: 'completed',
        research: 'completed',
        curriculum: 'current',
        lessons: 'pending',
        validation: 'pending',
      },
      generation: {
        brief: 'completed',
        research: 'completed',
        curriculum: 'completed',
        lessons: 'current',
        validation: 'pending',
      },
      validation: {
        brief: 'completed',
        research: 'completed',
        curriculum: 'completed',
        lessons: 'completed',
        validation: 'current',
      },
      published: {
        brief: 'completed',
        research: 'completed',
        curriculum: 'completed',
        lessons: 'completed',
        validation: 'completed',
      },
    };
    return pipelines[status] || pipelines.planning;
  };

  const getStatusLabel = (status: HookCourse['status']): string => {
    const labels: Record<HookCourse['status'], string> = {
      planning: 'Planejamento',
      brief: 'Brief',
      research: 'Pesquisa',
      curriculum: 'Currículo',
      generation: 'Produzindo',
      validation: 'Validação',
      published: 'Completo',
    };
    return labels[status] || 'Em Progresso';
  };

  const getIconFromSlug = (slug: string): string => {
    const iconMap: Record<string, string> = {
      'claude-code': 'terminal',
      'didatica-lendaria': 'presentation',
      vibecoding: 'magic-wand',
      'supabase-zero-backend': 'database',
      'dominando-obsidian': 'document',
      'metodo-mapa': 'map-marker',
      'meu-clone-ia': 'fingerprint',
      'prompt-engineer': 'comment-alt',
    };
    return iconMap[slug] || 'book';
  };

  const getCategoryFromMetadata = (metadata: HookCourse['metadata']): string => {
    const meta = metadata as Record<string, unknown> | undefined;
    if (meta?.category) return String(meta.category);
    if (meta?.course_type) return String(meta.course_type);
    return 'Geral';
  };

  const getFrameworksFromMetadata = (metadata: HookCourse['metadata']): string[] => {
    const frameworks: string[] = [];
    const meta = metadata as Record<string, unknown> | undefined;
    if (meta?.metodologia) frameworks.push(String(meta.metodologia));
    // Default to GPS if no methodology specified
    if (frameworks.length === 0) frameworks.push('GPS');
    return frameworks;
  };

  // Get content counts from hook course
  const contentCounts = hookCourse.contentCounts;

  return {
    id: hookCourse.id,
    title: hookCourse.title,
    slug: hookCourse.slug,
    icon: getIconFromSlug(hookCourse.slug),
    category: getCategoryFromMetadata(hookCourse.metadata),
    instructor: {
      name: hookCourse.instructor,
      avatar: hookCourse.instructorAvatar || 'https://i.pravatar.cc/150?u=' + hookCourse.slug,
      isMMOS: true, // Assume MMOS by default for now
    },
    lessonsCount: contentCounts?.lessons || hookCourse.lessons,
    modulesCount: contentCounts?.modules || hookCourse.modules,
    researchCount: contentCounts?.research || 0,
    assessmentsCount: contentCounts?.assessments || 0,
    duration: hookCourse.duration,
    type: (contentCounts?.research || 0) > 0 ? 'Brownfield' : 'Greenfield',
    frameworks: getFrameworksFromMetadata(hookCourse.metadata),
    fidelityScore: contentCounts?.avgFidelityScore || null,
    statusLabel: getStatusLabel(hookCourse.status),
    progress: hookCourse.progress,
    updatedAt: new Date(hookCourse.updatedAt).toLocaleDateString('pt-BR'),
    pipeline: statusToPipeline(hookCourse.status),
  };
};

const CoursesTemplate: React.FC<{ setSection: (s: Section) => void }> = ({ setSection }) => {
  const navigate = useNavigate();
  const [view, setView] = useState<ViewState>('list');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [filterStatus, setFilterStatus] = useState('Todos');
  const [selectedCourseSlug, setSelectedCourseSlug] = useState<string | null>(null);

  // Use real data from Supabase (falls back to mock if not configured)
  const {
    courses: hookCourses,
    loading: isLoading,
    error,
    isUsingMockData,
    refetch,
  } = useCourses();

  // Fetch recent activities from Supabase
  const { activities: recentActivities, loading: activitiesLoading } = useRecentActivities(5);

  // Convert hook courses to template format
  const courses: Course[] = hookCourses.map(mapHookCourseToTemplateCourse);

  // Fetch course contents when a course is selected
  const { content: courseContent, loading: contentLoading } = useCourseContents(selectedCourseSlug);

  // Get selected course info for breadcrumbs
  const selectedCourse = courses.find((c) => c.slug === selectedCourseSlug);

  // --- NEW COURSE STATE ---
  const [mode, setMode] = useState<'greenfield' | 'brownfield' | null>(null);
  const [slug, setSlug] = useState('');
  const [persona, setPersona] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [isCreating, setIsCreating] = useState(false);

  // --- BRIEF EDITOR STATE ---
  const [activeSection, setActiveSection] = useState(1);
  const [showValidation, setShowValidation] = useState(false);
  const [painPoints, setPainPoints] = useState([{ id: 1, text: 'Falta de tempo', intensity: 8 }]);

  // --- NAVIGATION HELPERS ---
  const goBack = () => {
    setView('list');
    setMode(null);
    setSlug('');
    setPersona('');
    setFiles([]);
    setSelectedCourseSlug(null);
  };

  // Workflow Steps Transitions
  const goToBrief = () => setView('brief');
  const startResearch = () => {
    setView('research_loading');
    // Simulate Agent Work
    setTimeout(() => setView('research_results'), 3500);
  };
  const goToReformulation = () => setView('reformulation');
  const goToCurriculum = () => setView('curriculum');
  const startGeneration = () => {
    setView('generation');
    // Simulate Generation
    setTimeout(() => setView('lesson'), 5000);
  };
  const goToLesson = () => setView('lesson');
  const goToValidation = () => setView('validation');

  // --- HANDLERS ---
  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSlug(e.target.value);
  };

  const handleCreateCourse = () => {
    if (!slug || !mode) return;
    setIsCreating(true);
    // Simulating API creation
    setTimeout(() => {
      setIsCreating(false);
      setView('brief');
    }, 1500);
  };

  const handleFileAdd = (file: File | null) => {
    if (file) setFiles((prev) => [...prev, file]);
  };

  const handleRemoveFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // --- VISUAL COMPONENTS ---

  const PipelineStep = ({
    status,
    label,
  }: {
    status: 'completed' | 'current' | 'pending';
    label: string;
  }) => {
    let iconName = 'circle';
    let colorClass = 'text-muted-foreground/30';
    let labelClass = 'text-muted-foreground';

    if (status === 'completed') {
      iconName = 'check-circle';
      colorClass = 'text-success';
      labelClass = 'text-success font-medium';
    } else if (status === 'current') {
      iconName = 'target';
      colorClass = 'text-primary animate-pulse';
      labelClass = 'text-primary font-bold';
    }

    return (
      <div className="group relative flex cursor-help flex-col items-center gap-1">
        <Icon
          name={iconName}
          className={cn('size-4 transition-colors', colorClass)}
          type={status === 'completed' ? 'solid' : 'regular'}
        />
        <span className={cn('text-[9px] uppercase tracking-wider transition-colors', labelClass)}>
          {label}
        </span>
      </div>
    );
  };

  const PipelineVisual = ({ pipeline }: { pipeline: Course['pipeline'] }) => (
    <div className="relative flex w-full items-center justify-between">
      <div className="absolute left-0 top-[7px] -z-10 h-0.5 w-full bg-muted"></div>
      <div className="z-10 bg-card px-1">
        <PipelineStep status={pipeline.brief} label="Brief" />
      </div>
      <div className="z-10 bg-card px-1">
        <PipelineStep status={pipeline.research} label="Research" />
      </div>
      <div className="z-10 bg-card px-1">
        <PipelineStep status={pipeline.curriculum} label="Currículo" />
      </div>
      <div className="z-10 bg-card px-1">
        <PipelineStep status={pipeline.lessons} label="Lições" />
      </div>
      <div className="z-10 bg-card px-1">
        <PipelineStep status={pipeline.validation} label="Validação" />
      </div>
    </div>
  );

  const CoursesHeader = ({ title, breadcrumb }: { title: string; breadcrumb?: string }) => (
    <div className="mb-8 flex animate-fade-in items-center justify-between">
      <div>
        <div className="mb-1 flex items-center gap-2 text-sm text-muted-foreground">
          <span className="cursor-pointer hover:text-foreground" onClick={() => setView('list')}>
            Cursos
          </span>
          {breadcrumb && (
            <>
              <Icon name="angle-small-right" size="size-3" />
              <span className="text-foreground">{breadcrumb}</span>
            </>
          )}
        </div>
        <h1 className="font-sans text-3xl font-bold tracking-tight text-foreground">{title}</h1>
      </div>
      <div className="flex gap-3">
        {view !== 'list' && (
          <Button variant="outline" onClick={goBack}>
            <Icon name="angle-left" className="mr-2 size-4" /> Voltar
          </Button>
        )}
        {view === 'list' && (
          <Button
            onClick={() => setView('new')}
            className="bg-studio-primary text-white shadow-lg shadow-studio-primary/20 transition-transform hover:scale-105"
          >
            <Icon name="plus" className="mr-2 size-4" /> Novo Curso
          </Button>
        )}
      </div>
    </div>
  );

  // --- RENDERERS ---

  const renderList = () => {
    // Calculate aggregated stats
    const totalLessons = courses.reduce((acc, c) => acc + c.lessonsCount, 0);
    const totalModules = courses.reduce((acc, c) => acc + c.modulesCount, 0);
    const totalResearch = courses.reduce((acc, c) => acc + c.researchCount, 0);
    const totalAssessments = courses.reduce((acc, c) => acc + c.assessmentsCount, 0);
    const avgFidelity =
      courses.filter((c) => c.fidelityScore !== null).length > 0
        ? Math.round(
          courses
            .filter((c) => c.fidelityScore !== null)
            .reduce((acc, c) => acc + (c.fidelityScore || 0), 0) /
          courses.filter((c) => c.fidelityScore !== null).length
        )
        : null;

    // Calculate Top Instructors with MMOS flag
    type InstructorStat = { name: string; avatar: string; count: number; isMMOS: boolean };
    const instructorCounts = courses.reduce(
      (acc, course) => {
        const { name, avatar, isMMOS } = course.instructor;
        if (!acc[name]) acc[name] = { name, avatar, count: 0, isMMOS };
        acc[name].count += 1;
        return acc;
      },
      {} as Record<string, InstructorStat>
    );
    const topInstructors = (Object.values(instructorCounts) as InstructorStat[])
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    // Courses needing attention
    const coursesWithAlerts = courses.filter((c) => c.alerts && c.alerts.length > 0);
    const lowFidelityCourses = courses.filter(
      (c) => c.fidelityScore !== null && c.fidelityScore < 80
    );

    // Pipeline counts
    const pipelineCounts = {
      briefing: courses.filter((c) => c.pipeline.brief === 'current').length,
      research: courses.filter((c) => c.pipeline.research === 'current').length,
      curriculum: courses.filter((c) => c.pipeline.curriculum === 'current').length,
      generation: courses.filter((c) => c.pipeline.lessons === 'current').length,
      validation: courses.filter((c) => c.pipeline.validation === 'current').length,
      published: courses.filter((c) => c.progress === 100).length,
    };

    // Loading state - skeleton
    if (isLoading) {
      return (
        <div className="animate-fade-in space-y-6">
          {/* Stats skeleton */}
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="p-5">
                <div className="space-y-2">
                  <div className="h-3 w-24 animate-pulse rounded bg-muted" />
                  <div className="h-8 w-16 animate-pulse rounded bg-muted" />
                  <div className="h-3 w-20 animate-pulse rounded bg-muted/60" />
                </div>
              </Card>
            ))}
          </div>
          {/* Pipeline skeleton */}
          <Card className="p-6">
            <div className="mb-4 h-5 w-40 animate-pulse rounded bg-muted" />
            <div className="flex justify-between">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <div className="h-10 w-10 animate-pulse rounded-full bg-muted" />
                  <div className="h-3 w-16 animate-pulse rounded bg-muted/60" />
                </div>
              ))}
            </div>
          </Card>
          {/* Course cards skeleton */}
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-4">
            <div className="space-y-3 xl:col-span-3">
              {[1, 2, 3, 4].map((i) => (
                <Card key={i} className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="h-14 w-14 animate-pulse rounded-lg bg-muted" />
                    <div className="flex-1 space-y-2">
                      <div className="h-5 w-48 animate-pulse rounded bg-muted" />
                      <div className="h-3 w-32 animate-pulse rounded bg-muted/60" />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="animate-fade-in space-y-6">
        {/* --- GLOBAL METRICS ROW --- */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              label: 'Cursos Ativos',
              value: courses.length,
              icon: 'graduation-cap',
              change: '+12%',
              changeLabel: 'vs mês anterior',
              trendUp: true,
              sparkline: '0,20 10,15 20,25 30,18 40,22 50,10 60,15 70,5 80,10 90,0',
            },
            {
              label: 'Total de Lições',
              value: totalLessons,
              icon: 'document',
              change: '+5',
              changeLabel: 'novas esta semana',
              trendUp: true,
              sparkline: '0,25 10,22 20,20 30,15 40,18 50,12 60,10 70,8 80,5 90,2',
            },
            {
              label: 'Horas de Conteúdo',
              value: '28.8h',
              icon: 'clock',
              change: '—',
              changeLabel: '0% atualizado hoje',
              trendUp: false,
              sparkline: '0,15 10,15 20,15 30,15 40,15 50,15 60,15 70,15 80,15 90,15',
            },
            {
              label: 'Alunos Impactados',
              value: '3.2k',
              icon: 'users',
              change: '+15%',
              changeLabel: 'vs mês anterior',
              trendUp: true,
              sparkline: '0,28 10,25 20,22 30,20 40,15 50,10 60,12 70,8 80,5 90,0',
            },
          ].map((metric, idx) => (
            <Card
              key={idx}
              className="group relative overflow-hidden border-border bg-card transition-all hover:border-studio-primary/50"
            >
              {/* Sparkline Background */}
              <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-16 opacity-10 transition-opacity group-hover:opacity-20">
                <svg viewBox="0 0 100 30" preserveAspectRatio="none" className="h-full w-full">
                  <path d={`M0,30 L${metric.sparkline} L100,30 Z`} fill="hsl(var(--primary-color))" />
                </svg>
              </div>
              <CardContent className="relative z-10 flex items-start justify-between p-5">
                <div>
                  <p className="mb-1 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    {metric.label}
                  </p>
                  <h3 className="font-mono text-3xl font-medium text-foreground">{metric.value}</h3>
                  <div className="mt-2 flex items-center gap-1">
                    {metric.trendUp ? (
                      <Icon name="trend-up" className="text-emerald-500" size="size-3" />
                    ) : (
                      <Icon name="minus" className="text-muted-foreground" size="size-3" />
                    )}
                    <span
                      className={cn(
                        'text-[10px] font-bold',
                        metric.trendUp ? 'text-emerald-600' : 'text-muted-foreground'
                      )}
                    >
                      {metric.change}
                    </span>
                    <span className="ml-1 text-[10px] text-muted-foreground">
                      {metric.changeLabel}
                    </span>
                  </div>
                </div>
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-studio-accent text-studio-primary transition-colors"
                >
                  <Icon name={metric.icon} size="size-5" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* --- PIPELINE DE PRODUÇÃO --- */}
        <Card className="group cursor-pointer border-border bg-card transition-colors hover:border-studio-primary/50">
          <CardContent className="p-6">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-muted-foreground transition-colors group-hover:text-studio-primary">
                <Icon name="sitemap" size="size-4" /> Pipeline de Produção
              </h3>
              <Badge
                variant="outline"
                className="border-border text-muted-foreground transition-colors group-hover:border-studio-primary group-hover:text-studio-primary"
              >
                Clique para Gerenciar <Icon name="arrow-right" size="size-3" className="ml-2" />
              </Badge>
            </div>

            <div className="relative flex min-w-[700px] items-center justify-between">
              {/* Connecting line with progress */}
              <div className="absolute left-0 top-5 -z-0 h-0.5 w-full bg-muted">
                <div
                  className="h-full bg-studio-primary transition-all duration-1000"
                  style={{ width: '15%' }}
                />
              </div>

              {[
                {
                  id: 'briefing',
                  label: 'BRIEFING',
                  icon: 'file-edit',
                  count: pipelineCounts.briefing || 8,
                  status: 'active',
                },
                {
                  id: 'research',
                  label: 'PESQUISA',
                  icon: 'search',
                  count: pipelineCounts.research || 3,
                  status: 'pending',
                },
                {
                  id: 'curriculum',
                  label: 'CURRÍCULO',
                  icon: 'list',
                  count: pipelineCounts.curriculum || 1,
                  status: 'pending',
                },
                {
                  id: 'generation',
                  label: 'GERAÇÃO',
                  icon: 'magic-wand',
                  count: pipelineCounts.generation || 2,
                  status: 'pending',
                },
                {
                  id: 'validation',
                  label: 'VALIDAÇÃO',
                  icon: 'check-circle',
                  count: pipelineCounts.validation || 0,
                  status: 'pending',
                },
                {
                  id: 'production',
                  label: 'PRODUÇÃO',
                  icon: 'video-camera',
                  count: 4,
                  status: 'pending',
                },
                {
                  id: 'published',
                  label: 'PUBLICADO',
                  icon: 'rocket',
                  count: pipelineCounts.published || 12,
                  status: 'done',
                },
              ].map((stage) => (
                <div
                  key={stage.id}
                  className="group/step relative z-10 flex flex-col items-center gap-3"
                >
                  <div
                    className={cn(
                      'flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-300',
                      stage.status === 'active'
                        ? 'border-studio-primary bg-studio-primary text-white shadow-[0_0_20px_hsl(var(--primary-color)/.4)] scale-110'
                        : stage.status === 'done'
                          ? 'border-studio-primary bg-card text-studio-primary'
                          : 'border-border bg-card text-muted-foreground group-hover/step:text-foreground'
                    )}
                  >
                    {stage.status === 'done' ? (
                      <Icon name="check" size="size-4" />
                    ) : (
                      <Icon name={stage.icon} size="size-4" />
                    )}
                  </div>
                  <div className="text-center">
                    <p
                      className={cn(
                        'mb-0.5 text-xs font-bold uppercase tracking-wider',
                        (stage.status === 'active' || stage.status === 'done') ? 'text-studio-primary' : 'text-muted-foreground'
                      )}
                    >
                      {stage.label}
                    </p>
                    <p className="font-mono text-sm text-muted-foreground">{stage.count}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* --- MAIN CONTENT GRID --- */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-4" >
          {/* Left: Course List */}
          <div className="space-y-4 xl:col-span-3" >
            {/* Search + Filters */}
            <Card className="border-border/30 bg-card/50" >
              <CardContent className="flex flex-col items-stretch gap-3 p-3 sm:flex-row sm:items-center">
                <div className="relative flex-1">
                  <Icon
                    name="search"
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                    size="size-4"
                  />
                  <Input
                    placeholder="Buscar cursos..."
                    className="h-10 rounded-lg border-border/30 bg-muted/20 pl-10"
                  />
                </div>
                <Select
                  placeholder="Todos"
                  options={[
                    { label: 'Todos', value: 'all' },
                    { label: 'Publicados', value: 'published' },
                    { label: 'Em Produção', value: 'production' },
                  ]}
                  className="h-10 w-full sm:w-[120px]"
                />
                <div className="flex rounded-lg border border-border/30 bg-muted/20 p-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className={cn(
                      'h-8 w-8',
                      viewMode === 'list'
                        ? 'bg-card text-foreground shadow-sm'
                        : 'text-muted-foreground'
                    )}
                    onClick={() => setViewMode('list')}
                  >
                    <Icon name="list" size="size-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={cn(
                      'h-8 w-8',
                      viewMode === 'grid'
                        ? 'bg-card text-foreground shadow-sm'
                        : 'text-muted-foreground'
                    )}
                    onClick={() => setViewMode('grid')}
                  >
                    <Icon name="grid" size="size-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Course Cards - List or Grid */}
            <div
              className={
                cn(
                  'transition-all duration-300',
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'
                    : 'space-y-3'
                )}
            >
              {
                courses.map((course) => (
                  <Card
                    key={course.id}
                    className="group relative cursor-pointer overflow-hidden border-border bg-card transition-all hover:shadow-md"
                    onClick={() => navigate(`/creator/cursos/${course.slug}`)}
                  >
                    {/* Hover Border Effect */}
                    <div className="pointer-events-none absolute inset-0 rounded-xl border-2 border-transparent transition-colors group-hover:border-studio-primary/30" />

                    <CardContent className={cn('p-4', viewMode === 'grid' && 'p-5')}>
                      <div
                        className={cn(
                          'flex gap-4',
                          viewMode === 'grid' ? 'flex-col' : 'items-center'
                        )}
                      >
                        {/* Icon Box - Bege com hover para azul */}
                        <div
                          className={cn(
                            'flex shrink-0 items-center justify-center rounded-lg bg-studio-accent text-studio-primary transition-colors group-hover:bg-studio-primary group-hover:text-white',
                            viewMode === 'grid' ? 'h-14 w-14' : 'h-12 w-12'
                          )}
                        >
                          <Icon name={course.icon} size="size-5" />
                        </div>

                        {/* Title + Meta */}
                        <div className={cn('min-w-0 flex-1', viewMode === 'grid' && 'w-full')}>
                          {/* Title row with menu for grid */}
                          <div
                            className={cn(
                              'mb-1.5 flex gap-2',
                              viewMode === 'grid' ? 'items-start justify-between' : 'items-center'
                            )}
                          >
                            <h4 className="truncate text-base font-bold text-foreground transition-colors group-hover:text-studio-primary">
                              {course.title}
                            </h4>
                            {viewMode === 'grid' && (
                              <Button
                                variant="ghost"
                                size="icon"
                                className="-mr-2 -mt-1 h-7 w-7 shrink-0 text-muted-foreground hover:text-foreground"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <Icon name="menu-dots-vertical" size="size-4" />
                              </Button>
                            )}
                          </div>

                          <div className="mb-2 flex items-center gap-2">
                            <Badge
                              variant="outline"
                              className="h-4 border-studio-primary/30 bg-studio-primary/5 px-1.5 text-[9px] text-studio-primary"
                            >
                              {course.category}
                            </Badge>
                          </div>

                          <div
                            className={cn(
                              'flex text-xs text-muted-foreground',
                              viewMode === 'grid'
                                ? 'mt-3 flex-col gap-2 border-t border-border pt-3'
                                : 'items-center gap-4'
                            )}
                          >
                            <span
                              className="flex items-center gap-1.5 font-medium text-studio-accent"
                            >
                              <Icon name="user" size="size-3" /> {course.instructor.name}
                            </span>
                            <div className="flex items-center gap-4">
                              <span className="flex items-center gap-1.5">
                                <Icon name="layers" size="size-3" /> {course.modulesCount} mód
                              </span>
                              <span className="flex items-center gap-1.5">
                                <Icon name="document" size="size-3" /> {course.lessonsCount} aulas
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Status + Date */}
                        <div
                          className={cn(
                            'flex shrink-0 gap-1.5',
                            viewMode === 'grid'
                              ? 'mt-auto w-full items-center justify-between border-t border-border pt-3'
                              : 'hidden flex-col items-end md:flex'
                          )}
                        >
                          {course.progress === 100 ? (
                            <Badge
                              variant="outline"
                              className="border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[10px] uppercase tracking-wider text-emerald-600"
                            >
                              <span className="mr-1.5 h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                              Completo
                            </Badge>
                          ) : (
                            <div
                              className={cn(
                                'space-y-1',
                                viewMode === 'grid' ? 'mr-4 flex-1' : 'w-28'
                              )}
                            >
                              <div
                                className="flex justify-between text-[10px] font-bold uppercase text-studio-primary"
                              >
                                <span>Produzindo</span>
                                <span>{course.progress}%</span>
                              </div>
                              <Progress value={course.progress} className="h-1.5 bg-muted" />
                            </div>
                          )}
                          <div className="flex items-center gap-1.5 font-mono text-[10px] text-muted-foreground">
                            <Icon name="calendar" size="size-3" />
                            <span>{course.updatedAt}</span>
                          </div>
                        </div>

                        {/* Menu - List view only */}
                        {viewMode === 'list' && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 shrink-0 text-muted-foreground hover:text-foreground"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Icon name="menu-dots-vertical" size="size-4" />
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))
              }
            </div>
          </div>

          {/* Right: Sidebar */}
          <div className="h-fit space-y-6 lg:sticky lg:top-24" >
            {/* Activity Feed */}
            <Card className="border-border bg-card shadow-sm" >
              <CardHeader className="border-b border-border pb-3">
                <CardTitle className="flex items-center gap-2 text-sm uppercase tracking-wider text-muted-foreground">
                  <Icon name="bell" size="size-4" /> Atividade Recente
                </CardTitle>
              </CardHeader>
              <CardContent className="px-4 pb-0 pt-4">
                <div className="relative space-y-0">
                  {/* Timeline vertical line */}
                  <div className="absolute bottom-6 left-4 top-2 w-px bg-border" />

                  {activitiesLoading ? (
                    // Loading skeleton
                    [1, 2, 3].map((i) => (
                      <div key={i} className="relative flex gap-4 pb-6">
                        <div className="z-10 h-8 w-8 shrink-0 animate-pulse rounded-lg bg-muted/30" />
                        <div className="flex-1 space-y-2 pt-1">
                          <div className="h-3 w-24 animate-pulse rounded bg-muted/30" />
                          <div className="h-4 w-32 animate-pulse rounded bg-muted/20" />
                        </div>
                      </div>
                    ))
                  ) : recentActivities.length === 0 ? (
                    // Empty state
                    <div className="py-4 text-center">
                      <Icon
                        name="inbox"
                        size="size-6"
                        className="mx-auto mb-2 text-muted-foreground/40"
                      />
                      <p className="text-xs text-muted-foreground">Nenhuma atividade recente</p>
                    </div>
                  ) : (
                    // Real activities with timeline
                    recentActivities.map((activity, i) => (
                      <div
                        key={activity.id}
                        className="group relative flex cursor-pointer gap-4 pb-6 last:pb-4"
                        onClick={() => navigate(`/creator/cursos/${activity.project_slug}`)}
                      >
                        <div
                          className="z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-studio-accent text-studio-primary shadow-sm"
                        >
                          <Icon name={getIconForTipoLabel(activity.tipo_label)} size="size-4" />
                        </div>
                        <div className="min-w-0 flex-1 pt-0.5">
                          <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
                            {activity.tipo_label}
                          </p>
                          <p
                            className="truncate text-sm font-medium text-foreground"
                            title={activity.title}
                          >
                            {activity.title}
                          </p>
                          <p className="mt-1 flex items-center gap-1 text-[10px] text-muted-foreground">
                            <span className="text-studio-accent">{activity.project_name}</span>
                            <span className="text-border">·</span>
                            <span className="font-mono">
                              {formatRelativeTime(activity.updated_at)}
                            </span>
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Content by Type */}
            <Card className="border-border bg-card shadow-sm" >
              <CardHeader className="border-b border-border pb-3">
                <CardTitle className="flex items-center gap-2 text-sm uppercase tracking-wider text-muted-foreground">
                  <Icon name="layers" size="size-4" /> Conteúdos por Tipo
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-5 pt-4">
                {[
                  { label: 'Aulas', count: 161, percent: 55, icon: 'video-camera' },
                  { label: 'Planejamento', count: 35, percent: 12, icon: 'calendar' },
                  { label: 'Recursos', count: 28, percent: 10, icon: 'folder' },
                  { label: 'Quizzes', count: 20, percent: 7, icon: 'list-check' },
                  { label: 'Pesquisas', count: 17, percent: 6, icon: 'search' },
                  { label: 'Relatórios', count: 14, percent: 5, icon: 'chart-pie' },
                  { label: 'Projetos', count: 12, percent: 4, icon: 'rocket' },
                  { label: 'Validações', count: 4, percent: 1, icon: 'shield-check' },
                ].map((type, i) => (
                  <div key={i} className="space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="flex items-center gap-2 font-medium text-foreground">
                        <Icon name={type.icon} size="size-3" className="text-muted-foreground" />
                        {type.label}
                      </span>
                      <span className="font-mono text-muted-foreground">{type.count}</span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-studio-primary"
                        style={{ width: `${type.percent}%` }}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  };

  const renderNewCourse = () => (
    <>
      <CoursesHeader title="Novo Curso" breadcrumb="Cursos > Novo" />
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
                    <Icon name="seedling" size="size-6" />
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
                  Crie uma estrutura pedagógica perfeita (GPS + Didática Lendária) sem vícios
                  antigos.
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
          <Button variant="ghost" onClick={goBack}>
            Cancelar
          </Button>
          <Button onClick={handleCreateCourse} disabled={!mode || !slug} className="min-w-[140px]">
            {isCreating ? (
              <Icon name="spinner" className="mr-2 animate-spin" />
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

  const renderBriefEditor = () => (
    <div className="animate-fade-in pb-20">
      <CoursesHeader
        title="Briefing Estratégico"
        breadcrumb={`Cursos > ${slug || 'novo'} > Brief`}
      />
      <div className="flex flex-col gap-8 lg:flex-row">
        <div className="w-full shrink-0 space-y-6 lg:w-64">
          <Card className="border-border bg-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Seções
              </CardTitle>
            </CardHeader>
            <CardContent className="p-2">
              <nav className="space-y-1">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((id) => (
                  <Button
                    key={id}
                    variant="ghost"
                    size="sm"
                    onClick={() => setActiveSection(id)}
                    className={cn(
                      'w-full justify-between',
                      activeSection === id
                        ? 'bg-primary/10 font-medium text-primary'
                        : 'text-muted-foreground hover:bg-muted'
                    )}
                  >
                    <span className="truncate">Seção {id}</span>
                    {activeSection > id && (
                      <Icon name="check-circle" className="text-success size-3" type="solid" />
                    )}
                  </Button>
                ))}
              </nav>
            </CardContent>
          </Card>
        </div>
        <div className="flex-1 space-y-6">
          <Card>
            <CardContent className="space-y-6 p-6">
              <div className="space-y-2">
                <Label>Qual é a promessa principal? (Dream Outcome)</Label>
                <Textarea
                  placeholder="Ex: Dominar vendas B2B em 30 dias..."
                  className="min-h-[100px]"
                />
              </div>
              <div className="space-y-2">
                <Label>Quem é o aluno ideal? (ICP)</Label>
                <Textarea placeholder="Ex: Gestores de vendas com equipe de 5+ pessoas..." />
              </div>
            </CardContent>
          </Card>
          <div className="flex justify-between border-t border-border pt-6">
            <Button
              variant="outline"
              disabled={activeSection === 1}
              onClick={() => setActiveSection((p) => p - 1)}
            >
              Anterior
            </Button>
            {activeSection < 8 ? (
              <Button onClick={() => setActiveSection((p) => p + 1)}>Próxima Seção</Button>
            ) : (
              <Button onClick={startResearch} className="shadow-lg shadow-primary/20">
                Iniciar Pesquisa de Mercado <Icon name="search-alt" className="ml-2" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  // --- AGENT: RESEARCH LOADING ---
  const renderResearchLoading = () => (
    <div className="flex min-h-[60vh] animate-fade-in flex-col items-center justify-center space-y-8 text-center">
      <div className="relative h-32 w-32">
        <div className="absolute inset-0 rounded-full border-4 border-muted"></div>
        <div className="absolute inset-0 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        <Icon
          name="search-alt"
          className="absolute inset-0 m-auto size-10 animate-pulse text-studio-primary"
        />
      </div>
      <div className="space-y-2">
        <h3 className="font-sans text-2xl font-bold">Agente de Pesquisa Ativo</h3>
        <p className="font-serif text-muted-foreground">
          Analisando concorrentes, identificando gaps e buscando diferenciais...
        </p>
        <div className="space-y-1 pt-4 font-mono text-xs text-muted-foreground">
          <p className="text-success">GET /udemy/top-courses... 200 OK</p>
          <p className="text-success">ANALYZING reviews... DONE</p>
          <p className="animate-pulse">EXTRACTING gaps... PROCESSING</p>
        </div>
      </div>
    </div>
  );

  // --- AGENT OUTPUT: RESEARCH RESULTS ---
  const renderResearchResults = () => (
    <div className="animate-fade-in space-y-8 pb-20">
      <CoursesHeader
        title="Inteligência de Mercado"
        breadcrumb={`Cursos > ${slug || 'novo'} > Pesquisa`}
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Análise de Concorrência</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <Icon name="info" className="size-4" />
              <AlertTitle>Insight Principal</AlertTitle>
              <AlertDescription>
                90% dos cursos focam em teoria. A maior reclamação é falta de templates práticos.
              </AlertDescription>
            </Alert>
            <div className="space-y-3">
              <div className="flex items-center justify-between rounded border bg-muted/10 p-3">
                <span>Curso A (Líder)</span>
                <Badge variant="outline">Muito Teórico</Badge>
              </div>
              <div className="flex items-center justify-between rounded border bg-muted/10 p-3">
                <span>Curso B</span>
                <Badge variant="outline">Desatualizado (2022)</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-studio-primary/20 bg-studio-primary/5">
          <CardHeader>
            <CardTitle className="text-studio-primary">Oportunidades (Gaps)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-2">
              <Icon name="check-circle" className="mt-1 size-4 text-studio-primary" />
              <span className="text-sm">Incluir módulo sobre IA aplicada</span>
            </div>
            <div className="flex items-start gap-2">
              <Icon name="check-circle" className="mt-1 size-4 text-studio-primary" />
              <span className="text-sm">Fornecer scripts prontos (Copy & Paste)</span>
            </div>
            <div className="flex items-start gap-2">
              <Icon name="check-circle" className="mt-1 size-4 text-studio-primary" />
              <span className="text-sm">Focar em Mobile-First learning</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end border-t border-border pt-4">
        <Button onClick={goToReformulation} size="lg" className="shadow-lg">
          Ver Sugestão de Reformulação <Icon name="arrow-right" className="ml-2" />
        </Button>
      </div>
    </div>
  );

  // --- AGENT INTERACTION: REFORMULATION ---
  const renderReformulation = () => (
    <div className="animate-fade-in space-y-8 pb-20">
      <CoursesHeader
        title="Reformulação do Brief"
        breadcrumb={`Cursos > ${slug || 'novo'} > Diff`}
      />

      <div className="grid grid-cols-2 gap-8">
        <div className="space-y-4">
          <h3 className="text-center text-sm font-bold uppercase tracking-widest text-muted-foreground">
            Seu Brief Original
          </h3>
          <Card className="border-dashed opacity-70">
            <CardContent className="p-6 font-serif text-sm">
              <p className="mb-2">
                <strong>Promessa:</strong> Ensinar vendas B2B.
              </p>
              <p>
                <strong>Público:</strong> Vendedores.
              </p>
              <p>
                <strong>Diferencial:</strong> Minha experiência.
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="space-y-4">
          <h3 className="text-center text-sm font-bold uppercase tracking-widest text-studio-primary">
            Sugestão da IA (Baseada em Dados)
          </h3>
          <Card className="relative border-primary shadow-lg" style={{ backgroundColor: 'hsl(var(--primary-color) / 0.05)' }}>
            <Badge className="absolute -top-3 right-4 bg-primary text-primary-foreground">
              Otimizado
            </Badge>
            <CardContent className="p-6 font-serif text-sm">
              <p className="mb-2">
                <strong>Promessa:</strong>{' '}
                <span className="rounded px-1" style={{ backgroundColor: 'hsl(var(--primary-color) / 0.2)' }}>
                  Dominar o ciclo de vendas B2B e fechar contratos High-Ticket em 30 dias.
                </span>
              </p>
              <p>
                <strong>Público:</strong>{' '}
                <span className="rounded px-1" style={{ backgroundColor: 'hsl(var(--primary-color) / 0.2)' }}>
                  Account Executives e SDRs buscando promoção.
                </span>
              </p>
              <p>
                <strong>Diferencial:</strong>{' '}
                <span className="rounded px-1" style={{ backgroundColor: 'hsl(var(--primary-color) / 0.2)' }}>
                  Único com templates de IA e foco em Social Selling.
                </span>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex justify-center gap-4 pt-8">
        <Button variant="outline">Manter Original</Button>
        <Button onClick={goToCurriculum} className="shadow-xl">
          Aceitar & Gerar Currículo <Icon name="check" className="ml-2" />
        </Button>
      </div>
    </div>
  );

  // --- CHECKPOINT: CURRICULUM ---
  const renderCurriculum = () => {
    const courseName = courseContent?.projectName || selectedCourse?.title || 'Curso';
    const modules = courseContent?.modules || [];

    // Loading state - skeleton
    if (contentLoading) {
      return (
        <div className="animate-fade-in space-y-8 pb-20">
          {/* Header skeleton */}
          <div className="mb-6">
            <div className="mb-2 h-4 w-48 animate-pulse rounded bg-muted" />
            <div className="h-8 w-64 animate-pulse rounded bg-muted" />
          </div>
          {/* Meta and actions skeleton */}
          <div className="mb-4 flex items-center justify-between">
            <div className="h-4 w-40 animate-pulse rounded bg-muted/60" />
            <div className="flex gap-2">
              <div className="h-8 w-28 animate-pulse rounded bg-muted" />
              <div className="h-8 w-40 animate-pulse rounded bg-muted" />
            </div>
          </div>
          {/* Modules skeleton */}
          <div className="space-y-4">
            {[1, 2, 3].map((m) => (
              <Card key={m}>
                <CardHeader className="border-b border-border bg-muted/20 py-3">
                  <div className="flex items-center justify-between">
                    <div className="h-5 w-48 animate-pulse rounded bg-muted" />
                    <div className="h-5 w-16 animate-pulse rounded bg-muted/60" />
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  {[1, 2, 3].map((l) => (
                    <div
                      key={l}
                      className="flex items-center justify-between border-b border-border p-4 last:border-0"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-3 w-3 animate-pulse rounded bg-muted/40" />
                        <div className="h-4 w-10 animate-pulse rounded bg-muted/40" />
                        <div className="h-4 w-48 animate-pulse rounded bg-muted" />
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="h-5 w-16 animate-pulse rounded bg-muted/60" />
                        <div className="h-5 w-16 animate-pulse rounded bg-muted/60" />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div className="animate-fade-in space-y-8 pb-20">
        <CoursesHeader title={courseName} breadcrumb={`${selectedCourseSlug} > Currículo`} />

        <div className="mb-4 flex items-center justify-between">
          <p className="text-muted-foreground">
            {courseContent
              ? `${courseContent.totalModules} módulos · ${courseContent.totalLessons} lições`
              : 'Estrutura gerada com base no brief otimizado e gaps de mercado.'}
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Icon name="refresh" className="mr-2" /> Regenerar
            </Button>
            <Button size="sm" onClick={startGeneration} className="shadow-lg shadow-primary/20">
              Aprovar e Criar Aulas
            </Button>
          </div>
        </div>

        {modules.length === 0 ? (
          <Card className="p-12 text-center">
            <Icon
              name="folder-open"
              className="mx-auto mb-4 text-muted-foreground"
              size="size-12"
            />
            <h3 className="mb-2 text-lg font-bold">Nenhum conteúdo encontrado</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              Este curso ainda não tem módulos ou lições cadastrados.
            </p>
            <Button onClick={() => setView('brief')}>Criar Brief</Button>
          </Card>
        ) : (
          <div className="space-y-4">
            {modules.map((mod, modIndex) => (
              <Card key={mod.id}>
                <CardHeader className="border-b border-border bg-muted/20 py-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base font-bold text-studio-primary">
                      Módulo {modIndex + 1}: {mod.title}
                    </CardTitle>
                    <Badge variant="outline" className="text-[10px]">
                      {mod.lessons.length} aulas
                    </Badge>
                  </div>
                  {mod.description && (
                    <p className="mt-1 text-xs text-muted-foreground">{mod.description}</p>
                  )}
                </CardHeader>
                <CardContent className="p-0">
                  {mod.lessons.map((les, lesIndex) => (
                    <div
                      key={les.id}
                      className="group flex cursor-pointer items-center justify-between border-b border-border p-4 last:border-0 hover:bg-muted/10"
                      onClick={() => {
                        setSlug(les.slug);
                        setView('lesson');
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <Icon
                          name="menu-burger"
                          className="cursor-grab text-muted-foreground opacity-30 group-hover:opacity-100"
                          size="size-3"
                        />
                        <span className="w-10 font-mono text-xs text-muted-foreground">
                          {modIndex + 1}.{lesIndex + 1}
                        </span>
                        <span className="text-sm font-medium">{les.title}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        {les.fidelity_score && (
                          <Badge
                            variant={
                              les.fidelity_score >= 80
                                ? 'success'
                                : les.fidelity_score >= 60
                                  ? 'warning'
                                  : 'destructive'
                            }
                            className="text-[10px]"
                          >
                            Score: {les.fidelity_score}
                          </Badge>
                        )}
                        <Badge variant="secondary" className="text-[10px] font-normal">
                          {les.duration || '--'}
                        </Badge>
                        <Badge
                          variant={les.status === 'published' ? 'success' : 'outline'}
                          className="text-[10px]"
                        >
                          {les.status === 'published'
                            ? 'Publicado'
                            : les.status === 'draft'
                              ? 'Rascunho'
                              : les.status}
                        </Badge>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <Icon name="pencil" size="size-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    );
  };

  // --- AGENT RUNNING: GENERATION ---
  const renderGeneration = () => (
    <div className="animate-fade-in space-y-8 pb-20">
      <CoursesHeader title="Gerando Aulas" breadcrumb={`Cursos > ${slug || 'novo'} > Geração`} />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Log / Terminal */}
        <div className="space-y-4 lg:col-span-2">
          {generationLog.map((log) => (
            <Card
              key={log.id}
              className={cn(
                'border-l-4 transition-all',
                log.status === 'success'
                  ? 'border-l-success bg-success/5'
                  : log.status === 'retrying'
                    ? 'border-l-brand-yellow bg-brand-yellow/5'
                    : 'border-l-muted bg-muted/5 opacity-60'
              )}
            >
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-4">
                  {log.status === 'success' ? (
                    <Icon name="check-circle" className="text-success" />
                  ) : log.status === 'retrying' ? (
                    <Icon name="refresh" className="animate-spin text-brand-yellow" />
                  ) : (
                    <Icon name="circle" className="text-muted-foreground" />
                  )}

                  <div>
                    <p className="text-sm font-bold">
                      {log.id} - {log.title}
                    </p>
                    <p className="text-xs text-muted-foreground">{log.msg}</p>
                  </div>
                </div>
                <div className="flex gap-4 font-mono text-xs">
                  <div className="text-center">
                    <span className="block text-[10px] uppercase text-muted-foreground">
                      GPS Score
                    </span>
                    <span
                      className={cn(
                        'font-bold',
                        log.gps > 70
                          ? 'text-success'
                          : log.gps > 0
                            ? 'text-brand-yellow'
                            : 'text-muted'
                      )}
                    >
                      {log.gps > 0 ? log.gps : '-'}
                    </span>
                  </div>
                  <div className="text-center">
                    <span className="block text-[10px] uppercase text-muted-foreground">
                      DL Score
                    </span>
                    <span
                      className={cn(
                        'font-bold',
                        log.dl > 70
                          ? 'text-success'
                          : log.dl > 0
                            ? 'text-brand-yellow'
                            : 'text-muted'
                      )}
                    >
                      {log.dl > 0 ? log.dl : '-'}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Progress Sidebar */}
        <Card className="h-fit">
          <CardHeader>
            <CardTitle>Progresso Total</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className="mb-2 font-mono text-4xl font-bold text-studio-primary">35%</div>
              <Progress value={35} className="h-2" />
              <p className="mt-2 text-xs text-muted-foreground">Estimativa: 4 min restantes</p>
            </div>
            <Separator />
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider">
                Quality Gate (Validação)
              </h4>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Framework GPS</span>{' '}
                <span className="text-success font-bold">Pass</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Didática Lendária</span>{' '}
                <span className="text-success font-bold">Pass</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Voice Consistency</span>{' '}
                <span className="font-bold text-brand-yellow">Checking...</span>
              </div>
            </div>
            <Button className="w-full" variant="outline" onClick={goToLesson}>
              Simular Finalização
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  // --- MANUAL: LESSON REVIEW (Now uses the new component) ---
  const renderLesson = () => (
    <LessonEditor onBack={() => setView('curriculum')} courseSlug={slug} lessonId="1.1" />
  );

  // --- FINAL QA: VALIDATION ---
  const renderValidation = () => (
    <div className="flex min-h-[60vh] animate-fade-in flex-col items-center justify-center space-y-8 text-center">
      <div className="bg-success/10 text-success mb-4 flex h-24 w-24 items-center justify-center rounded-full">
        <Icon name="check" size="size-10" />
      </div>
      <h1 className="font-sans text-4xl font-bold">Curso Pronto para Publicação!</h1>
      <p className="max-w-2xl font-serif text-xl text-muted-foreground">
        Todas as lições foram geradas, validadas pelos frameworks GPS e Didática Lendária, e
        aprovadas.
      </p>
      <div className="grid grid-cols-3 gap-8 rounded-xl border border-border bg-card p-8 text-left shadow-lg">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Aulas</p>
          <p className="mt-1 text-3xl font-bold">12</p>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
            Duração
          </p>
          <p className="mt-1 text-3xl font-bold">2h 15m</p>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
            Materiais
          </p>
          <p className="mt-1 text-3xl font-bold">5 PDFs</p>
        </div>
      </div>
      <div className="flex gap-4 pt-4">
        <Button variant="outline" size="lg" onClick={goBack}>
          Voltar ao Dashboard
        </Button>
        <Button size="lg" className="shadow-xl">
          Publicar Agora
        </Button>
      </div>
    </div>
  );

  // --- MAIN RENDER ---
  return (
    <div className="flex min-h-screen flex-col bg-background pb-20 font-sans">
      {/* Topbar only shows if NOT in editor mode (LessonEditor has its own header) */}
      {view !== 'lesson' && (
        <CreatorTopbar currentSection={Section.APP_CREATOR_COURSES} setSection={setSection} />
      )}

      <main
        className={cn('mx-auto w-full', view !== 'lesson' ? 'max-w-[1400px] p-6 md:p-12' : 'p-0')}
      >
        {view === 'list' && renderList()}
        {view === 'new' && renderNewCourse()}
        {view === 'brief' && renderBriefEditor()}
        {view === 'research_loading' && renderResearchLoading()}
        {view === 'research_results' && renderResearchResults()}
        {view === 'reformulation' && renderReformulation()}
        {view === 'curriculum' && renderCurriculum()}
        {view === 'generation' && renderGeneration()}
        {view === 'lesson' && renderLesson()}
        {view === 'validation' && renderValidation()}
      </main>
    </div>
  );
};

export default CoursesTemplate;

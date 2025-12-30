import React, { useState } from 'react';
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
import { Badge } from '../../ui/badge';
import { Input } from '../../ui/input';
import { Textarea } from '../../ui/textarea';
import { Label } from '../../ui/label';
import { ScrollArea } from '../../ui/scroll-area';
import { Separator } from '../../ui/separator';
import { Progress } from '../../ui/progress';
import { Alert, AlertDescription, AlertTitle } from '../../ui/alert';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../ui/tabs';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../ui/table';
import { cn } from '../../../lib/utils';
import { STUDIO_PRIMARY, STUDIO_ACCENT } from '../studio-tokens';

// --- TYPES ---
interface Competitor {
  id: string;
  name: string;
  platform: string;
  price: string;
  rating: number;
  students: string;
  strengths: string[];
  weaknesses: string[];
}

interface MarketGap {
  id: string;
  description: string;
  opportunity: 'high' | 'medium' | 'low';
  addressed: boolean;
}

interface Source {
  id: string;
  title: string;
  url: string;
  type: 'article' | 'video' | 'course' | 'book' | 'other';
  notes: string;
}

interface CourseResearchTemplateProps {
  setSection: (s: Section) => void;
  courseSlug: string;
  courseTitle: string;
  onBack: () => void;
  onNavigate: (view: 'overview' | 'brief' | 'curriculum' | 'lessons' | 'validation') => void;
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
        <p className="text-[10px] text-muted-foreground">Última alteração: há 5 min</p>
      </div>
    </div>
  );
};

// --- MOCK DATA ---
const mockCompetitors: Competitor[] = [
  {
    id: '1',
    name: 'Curso de Didática Premium',
    platform: 'Udemy',
    price: 'R$ 199',
    rating: 4.2,
    students: '12.5k',
    strengths: ['Preço acessível', 'Muitos alunos'],
    weaknesses: ['Muito teórico', 'Desatualizado (2022)', 'Sem comunidade'],
  },
  {
    id: '2',
    name: 'Masterclass Ensino Online',
    platform: 'Hotmart',
    price: 'R$ 997',
    rating: 4.7,
    students: '3.2k',
    strengths: ['Alta qualidade', 'Comunidade ativa'],
    weaknesses: ['Preço alto', 'Foco em marketing'],
  },
  {
    id: '3',
    name: 'Professor Digital',
    platform: 'Eduzz',
    price: 'R$ 497',
    rating: 3.9,
    students: '8.1k',
    strengths: ['Templates inclusos', 'Suporte'],
    weaknesses: ['Interface ruim', 'Conteúdo básico'],
  },
];

const mockGaps: MarketGap[] = [
  {
    id: '1',
    description: 'Nenhum curso aborda IA aplicada à criação de aulas',
    opportunity: 'high',
    addressed: false,
  },
  {
    id: '2',
    description: 'Falta de templates práticos prontos para uso',
    opportunity: 'high',
    addressed: false,
  },
  {
    id: '3',
    description: 'Ausência de framework metodológico estruturado (GPS)',
    opportunity: 'high',
    addressed: true,
  },
  {
    id: '4',
    description: 'Poucos cursos focam em mobile-first learning',
    opportunity: 'medium',
    addressed: false,
  },
  {
    id: '5',
    description: 'Falta integração com ferramentas modernas (Notion, Obsidian)',
    opportunity: 'medium',
    addressed: false,
  },
];

const mockSources: Source[] = [
  {
    id: '1',
    title: 'Research: Online Learning Trends 2025',
    url: 'https://example.com/research',
    type: 'article',
    notes: 'Dados sobre retenção',
  },
  {
    id: '2',
    title: 'Livro: Made to Stick',
    url: '',
    type: 'book',
    notes: 'Framework de ideias memoráveis',
  },
  {
    id: '3',
    title: 'Análise de reviews Udemy',
    url: 'https://udemy.com',
    type: 'other',
    notes: 'Principais reclamações',
  },
];

const CourseResearchTemplate: React.FC<CourseResearchTemplateProps> = ({
  setSection,
  courseSlug,
  courseTitle,
  onBack,
  onNavigate,
}) => {
  const [activeTab, setActiveTab] = useState('competitors');
  const [competitors, setCompetitors] = useState(mockCompetitors);
  const [gaps, setGaps] = useState(mockGaps);
  const [sources, setSources] = useState(mockSources);
  const [isRunningAI, setIsRunningAI] = useState(false);

  const pipeline = [
    { key: 'brief', label: 'Brief', status: 'completed' as const },
    { key: 'research', label: 'Research', status: 'current' as const },
    { key: 'curriculum', label: 'Currículo', status: 'pending' as const },
    { key: 'lessons', label: 'Lições', status: 'pending' as const },
    { key: 'validation', label: 'Validação', status: 'pending' as const },
  ];

  const handleRunAIResearch = () => {
    setIsRunningAI(true);
    setTimeout(() => {
      setIsRunningAI(false);
    }, 3000);
  };

  const getOpportunityColor = (opp: string) => {
    switch (opp) {
      case 'high':
        return 'text-success bg-success/10';
      case 'medium':
        return 'text-brand-yellow bg-brand-yellow/10';
      case 'low':
        return 'text-muted-foreground bg-muted/10';
      default:
        return 'text-muted-foreground bg-muted/10';
    }
  };

  const getSourceIcon = (type: string) => {
    switch (type) {
      case 'article':
        return 'newspaper';
      case 'video':
        return 'video';
      case 'course':
        return 'graduation-cap';
      case 'book':
        return 'book';
      default:
        return 'link';
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background font-sans">
      <CreatorTopbar currentSection={Section.APP_CREATOR_COURSES} setSection={setSection} />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <CourseSidebar
          courseTitle={courseTitle}
          currentStep="research"
          pipeline={pipeline}
          onNavigate={onNavigate}
        />

        {/* Main Content */}
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Header */}
          <div className="flex h-16 shrink-0 items-center justify-between border-b border-border bg-card px-6">
            <div>
              <h1 className="text-lg font-bold">Inteligência de Mercado</h1>
              <p className="text-xs text-muted-foreground">
                Analise concorrência e identifique oportunidades
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={handleRunAIResearch}
                disabled={isRunningAI}
              >
                {isRunningAI ? (
                  <>
                    <Icon name="spinner" className="mr-2 size-4 animate-spin" />
                    Analisando...
                  </>
                ) : (
                  <>
                    <Icon name="sparkles" className="mr-2 size-4" />
                    Rodar IA Research
                  </>
                )}
              </Button>
              <Button
                onClick={() => onNavigate('curriculum')}
                className="bg-studio-primary hover:bg-studio-primary/90 text-white"
              >
                Aprovar e Gerar Currículo
                <Icon name="arrow-right" className="ml-2 size-4" />
              </Button>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="mx-auto max-w-6xl space-y-6">
              {/* AI Insights Alert */}
              <Alert className="border-primary/20 bg-studio-primary/5">
                <Icon name="lightbulb-on" className="size-4 text-studio-primary" />
                <AlertTitle>Insight Principal da IA</AlertTitle>
                <AlertDescription>
                  90% dos cursos de didática focam em teoria. A maior reclamação dos alunos é{' '}
                  <strong>falta de templates práticos</strong> e{' '}
                  <strong>exemplos aplicáveis</strong>. Esta é sua maior oportunidade de
                  diferenciação.
                </AlertDescription>
              </Alert>

              {/* Tabs */}
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="bg-muted/30 p-1">
                  <TabsTrigger value="competitors">
                    <Icon name="users" className="mr-2 size-4" />
                    Concorrentes ({competitors.length})
                  </TabsTrigger>
                  <TabsTrigger value="gaps">
                    <Icon name="target" className="mr-2 size-4" />
                    Gaps de Mercado ({gaps.length})
                  </TabsTrigger>
                  <TabsTrigger value="sources">
                    <Icon name="book-open" className="mr-2 size-4" />
                    Fontes ({sources.length})
                  </TabsTrigger>
                </TabsList>

                {/* Competitors Tab */}
                <TabsContent value="competitors" className="mt-6 animate-fade-in space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">
                      Análise dos principais concorrentes no mercado
                    </p>
                    <Button variant="outline" size="sm">
                      <Icon name="plus" className="mr-2 size-3" /> Adicionar Concorrente
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
                    {competitors.map((comp) => (
                      <Card key={comp.id} className="transition-colors hover:border-primary/30">
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between">
                            <div>
                              <CardTitle className="text-base">{comp.name}</CardTitle>
                              <CardDescription className="mt-1 flex items-center gap-2">
                                <Badge variant="outline" className="text-[10px]">
                                  {comp.platform}
                                </Badge>
                                <span className="text-xs">{comp.price}</span>
                              </CardDescription>
                            </div>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Icon name="menu-dots-vertical" size="size-4" />
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-1">
                              <Icon name="star" className="size-3 text-brand-yellow" type="solid" />
                              <span className="font-medium">{comp.rating}</span>
                            </div>
                            <span className="text-muted-foreground">{comp.students} alunos</span>
                          </div>

                          <Separator />

                          <div className="space-y-2">
                            <p className="text-success text-xs font-bold uppercase tracking-wider">
                              Pontos Fortes
                            </p>
                            <div className="flex flex-wrap gap-1">
                              {comp.strengths.map((s, i) => (
                                <Badge
                                  key={i}
                                  variant="secondary"
                                  className="bg-success/10 text-success border-0 text-[10px]"
                                >
                                  {s}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div className="space-y-2">
                            <p className="text-xs font-bold uppercase tracking-wider text-destructive">
                              Fraquezas
                            </p>
                            <div className="flex flex-wrap gap-1">
                              {comp.weaknesses.map((w, i) => (
                                <Badge
                                  key={i}
                                  variant="secondary"
                                  className="border-0 bg-destructive/10 text-[10px] text-destructive"
                                >
                                  {w}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                {/* Market Gaps Tab */}
                <TabsContent value="gaps" className="mt-6 animate-fade-in space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">
                      Oportunidades identificadas no mercado
                    </p>
                    <Button variant="outline" size="sm">
                      <Icon name="plus" className="mr-2 size-3" /> Adicionar Gap
                    </Button>
                  </div>

                  <div className="space-y-3">
                    {gaps.map((gap) => (
                      <Card
                        key={gap.id}
                        className={cn(
                          'transition-all',
                          gap.addressed && 'border-success/30 bg-success/5'
                        )}
                      >
                        <CardContent className="flex items-center gap-4 p-4">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setGaps((prev) =>
                                prev.map((g) =>
                                  g.id === gap.id ? { ...g, addressed: !g.addressed } : g
                                )
                              );
                            }}
                            className={cn(
                              'h-6 w-6 rounded-full border-2 transition-colors',
                              gap.addressed
                                ? 'bg-success border-success text-white'
                                : 'border-muted-foreground/30'
                            )}
                          >
                            {gap.addressed && <Icon name="check" size="size-3" />}
                          </Button>

                          <div className="flex-1">
                            <p
                              className={cn(
                                'text-sm font-medium',
                                gap.addressed && 'text-muted-foreground line-through'
                              )}
                            >
                              {gap.description}
                            </p>
                          </div>

                          <Badge
                            className={cn(
                              'text-[10px] uppercase',
                              getOpportunityColor(gap.opportunity)
                            )}
                          >
                            {gap.opportunity === 'high'
                              ? 'Alta Oportunidade'
                              : gap.opportunity === 'medium'
                                ? 'Média Oportunidade'
                                : 'Baixa Oportunidade'}
                          </Badge>

                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground"
                          >
                            <Icon name="pencil" size="size-4" />
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <div className="rounded-lg border border-border bg-muted/20 p-4">
                    <div className="mb-2 flex items-center gap-2">
                      <Icon name="chart-pie" className="size-4 text-studio-primary" />
                      <span className="text-sm font-medium">Resumo</span>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <p className="text-success text-2xl font-bold">
                          {gaps.filter((g) => g.addressed).length}
                        </p>
                        <p className="text-xs text-muted-foreground">Endereçados</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-brand-yellow">
                          {gaps.filter((g) => !g.addressed).length}
                        </p>
                        <p className="text-xs text-muted-foreground">Pendentes</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold">
                          {gaps.filter((g) => g.opportunity === 'high').length}
                        </p>
                        <p className="text-xs text-muted-foreground">Alta Prioridade</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                {/* Sources Tab */}
                <TabsContent value="sources" className="mt-6 animate-fade-in space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">
                      Referências e fontes de pesquisa
                    </p>
                    <Button variant="outline" size="sm">
                      <Icon name="plus" className="mr-2 size-3" /> Adicionar Fonte
                    </Button>
                  </div>

                  <Card>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-12">Tipo</TableHead>
                          <TableHead>Título</TableHead>
                          <TableHead>Notas</TableHead>
                          <TableHead className="w-24">Ações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {sources.map((source) => (
                          <TableRow key={source.id}>
                            <TableCell>
                              <div className="flex h-8 w-8 items-center justify-center rounded bg-muted">
                                <Icon
                                  name={getSourceIcon(source.type)}
                                  size="size-4"
                                  className="text-muted-foreground"
                                />
                              </div>
                            </TableCell>
                            <TableCell>
                              <div>
                                <p className="text-sm font-medium">{source.title}</p>
                                {source.url && (
                                  <a
                                    href={source.url}
                                    className="text-xs hover:underline text-studio-primary"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    {source.url}
                                  </a>
                                )}
                              </div>
                            </TableCell>
                            <TableCell>
                              <p className="text-sm text-muted-foreground">{source.notes}</p>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <Icon name="pencil" size="size-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 text-destructive"
                                >
                                  <Icon name="trash" size="size-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseResearchTemplate;

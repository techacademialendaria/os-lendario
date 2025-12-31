import React, { useState } from 'react';
import CreatorTopbar from '../CreatorTopbar';
import { Section } from '../../../types';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Icon } from '../../ui/icon';
import { Badge } from '../../ui/badge';
import { cn } from '../../../lib/utils';
import { Separator } from '../../ui/separator';
import { Tabs, TabsList, TabsTrigger } from '../../ui/tabs';
import { Skeleton } from '../../ui/skeleton';
import { STUDIO_PRIMARY, STUDIO_GOLD, STUDIO_ACCENT } from '../studio-tokens';
import { useContentFrameworks, Framework } from '../../../hooks/useContentFrameworks';

const CATEGORY_LABELS: Record<string, string> = {
  pedagogical: 'Pedagógico',
  marketing: 'Marketing',
  content_structure: 'Estrutura',
  storytelling: 'Storytelling',
};

const CATEGORY_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  pedagogical: { bg: `opacity-20`, text: 'text-white', border: 'opacity-30' },
  marketing: { bg: 'bg-amber-500/20', text: 'text-amber-400', border: 'border-amber-500/30' },
  content_structure: { bg: 'bg-cyan-500/20', text: 'text-cyan-400', border: 'border-cyan-500/30' },
  storytelling: {
    bg: 'bg-emerald-500/20',
    text: 'text-emerald-400',
    border: 'border-emerald-500/30',
  },
};

const FrameworksTemplate: React.FC<{ setSection: (s: Section) => void }> = ({ setSection }) => {
  const [selectedFramework, setSelectedFramework] = useState<Framework | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<
    'all' | 'pedagogical' | 'marketing' | 'content_structure' | 'storytelling'
  >('all');

  // Fetch frameworks from database
  const { frameworks, loading, error, refetch } = useContentFrameworks();

  const filteredFrameworks =
    categoryFilter === 'all'
      ? frameworks
      : frameworks.filter((f) => f.frameworkType === categoryFilter);

  const renderList = () => (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h2 className="font-sans text-2xl font-bold">Biblioteca de Frameworks</h2>
          <p className="text-sm text-muted-foreground">
            Metodologias pedagógicas e de marketing para estruturar seus cursos.
          </p>
        </div>
        <Tabs value={categoryFilter} onValueChange={(v) => setCategoryFilter(v as any)}>
          <TabsList className="bg-muted/30">
            <TabsTrigger value="all" className="text-xs">
              Todos
            </TabsTrigger>
            <TabsTrigger value="pedagogical" className="text-xs">
              Pedagógicos
            </TabsTrigger>
            <TabsTrigger value="marketing" className="text-xs">
              Marketing
            </TabsTrigger>
            <TabsTrigger value="storytelling" className="text-xs">
              Storytelling
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="overflow-hidden">
              <div className="h-1 w-full bg-muted" />
              <CardHeader className="flex flex-row items-start gap-4 pb-2">
                <Skeleton className="h-12 w-12 rounded-xl" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-4 w-20" />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-4 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Error State */}
      {error && (
        <Card className="border-destructive/50 bg-destructive/5">
          <CardContent className="flex items-center gap-4 p-6">
            <Icon name="cross-circle" size="size-6" className="text-destructive" />
            <div>
              <p className="font-medium">Erro ao carregar frameworks</p>
              <p className="text-sm text-muted-foreground">{error.message}</p>
            </div>
            <Button variant="outline" size="sm" onClick={() => refetch()} className="ml-auto">
              Tentar novamente
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Grid */}
      {!loading && !error && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredFrameworks.map((framework) => {
            const catColors =
              CATEGORY_COLORS[framework.frameworkType] || CATEGORY_COLORS.pedagogical;
            return (
              <Card
                key={framework.id}
                className="group cursor-pointer overflow-hidden transition-all"
                style={{
                  borderColor: framework.frameworkType === 'pedagogical' ? `${STUDIO_PRIMARY}50` : undefined,
                }}
                onMouseEnter={(e) => {
                  if (framework.frameworkType === 'pedagogical') {
                    e.currentTarget.style.borderColor = `${STUDIO_PRIMARY}80`;
                  }
                }}
                onMouseLeave={(e) => {
                  if (framework.frameworkType === 'pedagogical') {
                    e.currentTarget.style.borderColor = `${STUDIO_PRIMARY}50`;
                  }
                }}
                onClick={() => setSelectedFramework(framework)}
              >
                {/* Color Bar */}
                <div className="h-1 w-full" style={{ backgroundColor: framework.color }} />

                <CardHeader className="flex flex-row items-start gap-4 pb-2">
                  <div
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border text-xl"
                    style={{
                      backgroundColor: `${framework.color}20`,
                      borderColor: `${framework.color}30`,
                    }}
                  >
                    <Icon
                      name={framework.icon as any}
                      size="size-5"
                      style={{ color: framework.color }}
                    />
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <div className="mb-1 flex items-center gap-2">
                      <CardTitle className="truncate text-base">{framework.name}</CardTitle>
                    </div>
                    <Badge
                      className={cn('text-[10px]', catColors.bg, catColors.text, catColors.border)}
                    >
                      {CATEGORY_LABELS[framework.frameworkType] || framework.frameworkType}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="line-clamp-2 text-sm text-muted-foreground">
                    {framework.description}
                  </p>

                  {/* Steps Preview */}
                  <div className="flex items-center gap-1 overflow-hidden">
                    {framework.steps.slice(0, 4).map((step, i) => (
                      <React.Fragment key={i}>
                        <span className="truncate font-mono text-[10px] text-muted-foreground">
                          {step.name}
                        </span>
                        {i < Math.min(framework.steps.length - 1, 3) && (
                          <Icon
                            name="arrow-right"
                            size="size-3"
                            className="shrink-0 text-muted-foreground/50"
                          />
                        )}
                      </React.Fragment>
                    ))}
                    {framework.steps.length > 4 && (
                      <span className="text-[10px] text-muted-foreground">
                        +{framework.steps.length - 4}
                      </span>
                    )}
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{framework.steps.length} etapas</span>
                    <span
                      className="flex items-center gap-1 font-medium transition-colors"
                      style={{
                        color: framework.frameworkType === 'pedagogical' ? STUDIO_PRIMARY : 'inherit',
                      }}
                    >
                      Ver detalhes <Icon name="arrow-right" size="size-3" />
                    </span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && filteredFrameworks.length === 0 && (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center p-12 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted/30">
              <Icon name="layers" size="size-8" className="text-muted-foreground" />
            </div>
            <h3 className="mb-2 text-lg font-semibold">Nenhum framework encontrado</h3>
            <p className="mb-6 max-w-md text-sm text-muted-foreground">
              {categoryFilter !== 'all'
                ? 'Nenhum framework nesta categoria. Tente outra categoria.'
                : 'Nenhum framework cadastrado no sistema.'}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );

  const renderDetail = () => {
    if (!selectedFramework) return null;
    const catColors =
      CATEGORY_COLORS[selectedFramework.frameworkType] || CATEGORY_COLORS.pedagogical;

    return (
      <div className="animate-fade-in space-y-6">
        {/* Back Button */}
        <Button variant="ghost" onClick={() => setSelectedFramework(null)} className="mb-4">
          <Icon name="arrow-left" className="mr-2" size="size-4" /> Voltar para Frameworks
        </Button>

        {/* Header */}
        <div
          className="relative overflow-hidden rounded-xl border bg-card p-6"
          style={{ borderColor: `${selectedFramework.color}30` }}
        >
          {/* Background Gradient */}
          <div
            className="absolute inset-0 opacity-5"
            style={{
              background: `linear-gradient(135deg, ${selectedFramework.color} 0%, transparent 70%)`,
            }}
          />

          <div className="relative flex flex-col items-start gap-6 md:flex-row">
            <div
              className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl border text-2xl"
              style={{
                backgroundColor: `${selectedFramework.color}20`,
                borderColor: `${selectedFramework.color}30`,
              }}
            >
              <Icon
                name={selectedFramework.icon as any}
                size="size-7"
                style={{ color: selectedFramework.color }}
              />
            </div>

            <div className="flex-1 space-y-3">
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-2xl font-bold">{selectedFramework.name}</h2>
                <Badge className={cn('text-xs', catColors.bg, catColors.text, catColors.border)}>
                  {CATEGORY_LABELS[selectedFramework.frameworkType] ||
                    selectedFramework.frameworkType}
                </Badge>
              </div>
              <p className="text-muted-foreground">{selectedFramework.description}</p>
            </div>

            <Button
              className="shrink-0 text-white"
              style={{ backgroundColor: selectedFramework.color }}
            >
              <Icon name="plus" size="size-4" className="mr-2" /> Usar neste Curso
            </Button>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Steps */}
          <Card className="lg:col-span-2">
            <CardHeader className="border-b border-border bg-muted/5">
              <CardTitle className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-muted-foreground">
                <Icon name="list-ul" size="size-4" /> Etapas do Framework
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {selectedFramework.steps.map((step, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 rounded-lg border border-border/50 p-4 transition-colors"
                    style={{
                      borderColor: selectedFramework.frameworkType === 'pedagogical' ? `${STUDIO_PRIMARY}50` : undefined,
                    }}
                    onMouseEnter={(e) => {
                      if (selectedFramework.frameworkType === 'pedagogical') {
                        e.currentTarget.style.borderColor = `${STUDIO_PRIMARY}80`;
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (selectedFramework.frameworkType === 'pedagogical') {
                        e.currentTarget.style.borderColor = `${STUDIO_PRIMARY}50`;
                      }
                    }}
                  >
                    <div
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold"
                      style={{
                        backgroundColor: `${selectedFramework.color}20`,
                        color: selectedFramework.color,
                      }}
                    >
                      {i + 1}
                    </div>
                    <div className="flex-1">
                      <div className="mb-1 flex items-center gap-2">
                        <h4 className="font-semibold">{step.name}</h4>
                        {step.duration && (
                          <Badge variant="outline" className="text-[10px]">
                            {step.duration}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Framework Info */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-muted-foreground">
                  <Icon name="info-circle" size="size-4" /> Informações
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 p-6 pt-2">
                <div className="flex items-center justify-between border-b border-border/50 py-2">
                  <span className="text-sm text-muted-foreground">Tipo</span>
                  <Badge className={cn('text-xs', catColors.bg, catColors.text, catColors.border)}>
                    {CATEGORY_LABELS[selectedFramework.frameworkType] ||
                      selectedFramework.frameworkType}
                  </Badge>
                </div>
                <div className="flex items-center justify-between border-b border-border/50 py-2">
                  <span className="text-sm text-muted-foreground">Etapas</span>
                  <span className="font-semibold">{selectedFramework.steps.length}</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-muted-foreground">Status</span>
                  <Badge
                    variant={selectedFramework.isActive ? 'default' : 'secondary'}
                    className="text-xs"
                  >
                    {selectedFramework.isActive ? 'Ativo' : 'Inativo'}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Best For (if available) */}
            {selectedFramework.bestFor && selectedFramework.bestFor.length > 0 && (
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-muted-foreground">
                    <Icon name="check-circle" size="size-4" /> Aplicação
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 pt-2">
                  <div className="flex flex-wrap gap-2">
                    {selectedFramework.bestFor.map((item, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Use Cases (if available) */}
            {selectedFramework.useCases && selectedFramework.useCases.length > 0 && (
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-muted-foreground">
                    <Icon name="briefcase" size="size-4" /> Melhores Práticas
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 pt-2">
                  <ul className="space-y-2">
                    {selectedFramework.useCases.map((useCase, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span
                          className="h-1.5 w-1.5 shrink-0 rounded-full"
                          style={{ backgroundColor: selectedFramework.color }}
                        />
                        {useCase}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex min-h-screen flex-col bg-background pb-20 font-sans">
      <CreatorTopbar currentSection={Section.APP_CREATOR_FRAMEWORKS} setSection={setSection} />

      <main className="mx-auto w-full max-w-[1400px] flex-1 p-6 md:p-12">
        {selectedFramework ? renderDetail() : renderList()}
      </main>
    </div>
  );
};

export default FrameworksTemplate;

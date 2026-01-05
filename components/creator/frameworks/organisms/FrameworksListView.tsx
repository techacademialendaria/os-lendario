import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import type { Framework } from '@/hooks/useContentFrameworks';
import { FrameworkCard } from '../molecules';
import type { FrameworkCategory } from '../types';

interface FrameworksListViewProps {
  frameworks: Framework[];
  loading: boolean;
  error: Error | null;
  categoryFilter: FrameworkCategory;
  setCategoryFilter: (cat: FrameworkCategory) => void;
  onSelectFramework: (framework: Framework) => void;
  onRefetch: () => void;
}

export const FrameworksListView: React.FC<FrameworksListViewProps> = ({
  frameworks,
  loading,
  error,
  categoryFilter,
  setCategoryFilter,
  onSelectFramework,
  onRefetch,
}) => {
  const filteredFrameworks =
    categoryFilter === 'all'
      ? frameworks
      : frameworks.filter((f) => f.frameworkType === categoryFilter);

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h2 className="font-sans text-2xl font-bold">Biblioteca de Frameworks</h2>
          <p className="text-sm text-muted-foreground">
            Metodologias pedagógicas e de marketing para estruturar seus cursos.
          </p>
        </div>
        <Tabs value={categoryFilter} onValueChange={(v) => setCategoryFilter(v as FrameworkCategory)}>
          <TabsList className="bg-muted/30">
            <TabsTrigger value="all" className="text-xs">Todos</TabsTrigger>
            <TabsTrigger value="pedagogical" className="text-xs">Pedagógicos</TabsTrigger>
            <TabsTrigger value="marketing" className="text-xs">Marketing</TabsTrigger>
            <TabsTrigger value="storytelling" className="text-xs">Storytelling</TabsTrigger>
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
            <Button variant="outline" size="sm" onClick={onRefetch} className="ml-auto">
              Tentar novamente
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Grid */}
      {!loading && !error && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredFrameworks.map((framework) => (
            <FrameworkCard
              key={framework.id}
              framework={framework}
              onClick={() => onSelectFramework(framework)}
            />
          ))}
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
};

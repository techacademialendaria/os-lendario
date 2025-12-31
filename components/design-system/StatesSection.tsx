import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Icon } from '../ui/icon';
import { Skeleton } from '../ui/skeleton';
import { Progress } from '../ui/progress';
import { Symbol } from '../ui/symbol';
import { Stepper } from '../ui/stepper'; // New Import

const StatesSection: React.FC = () => {
  return (
    <div className="animate-fade-in space-y-16">
      <div>
        <h2 className="mb-4 font-serif text-4xl font-light">Estados do Sistema</h2>
        <p className="max-w-2xl font-serif text-lg leading-relaxed text-muted-foreground">
          Gerenciando a expectativa do usuário durante latência, ausência de dados e falhas.
        </p>
      </div>

      {/* --- SKELETONS EXPANDED --- */}
      <section className="space-y-8">
        <h3 className="border-b border-border pb-2 font-sans text-xl font-semibold">
          Estruturas de Carregamento (Skeletons)
        </h3>

        <div className="grid grid-cols-1 gap-12">
          {/* 1. Dashboard Skeleton */}
          <div className="space-y-4">
            <p className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
              Dashboard & Analytics
            </p>
            <div className="space-y-6 rounded-xl border border-border bg-background p-6">
              {/* Header */}
              <div className="flex items-center justify-between">
                <Skeleton className="h-8 w-48" />
                <div className="flex gap-2">
                  <Skeleton className="h-9 w-24" />
                  <Skeleton className="h-9 w-9" />
                </div>
              </div>
              {/* KPI Grid */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                {[1, 2, 3, 4].map((i) => (
                  <Card key={i} className="space-y-3 bg-card p-4">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-8 w-16" />
                    <Skeleton className="h-3 w-full" />
                  </Card>
                ))}
              </div>
              {/* Main Chart Area */}
              <Card className="flex h-64 flex-col justify-between bg-card p-6">
                <div className="mb-4 flex justify-between">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-5 w-20" />
                </div>
                <div className="flex h-full items-end gap-2 pb-2">
                  {[...Array(12)].map((_, i) => (
                    <Skeleton
                      key={i}
                      className="w-full rounded-t-sm"
                      style={{ height: `${Math.random() * 60 + 20}%` }}
                    />
                  ))}
                </div>
                <div className="mt-2 flex justify-between border-t border-border pt-2">
                  <Skeleton className="h-3 w-8" />
                  <Skeleton className="h-3 w-8" />
                  <Skeleton className="h-3 w-8" />
                  <Skeleton className="h-3 w-8" />
                </div>
              </Card>
            </div>
          </div>

          {/* 2. Chat / AI Interaction Skeleton */}
          <div className="space-y-4">
            <p className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
              Interface de Chat (IA Thinking)
            </p>
            <Card className="mx-auto max-w-2xl bg-card p-6">
              <div className="space-y-6">
                {/* User Message */}
                <div className="flex justify-end">
                  <div className="max-w-[80%] rounded-2xl rounded-tr-sm bg-primary/10 p-4">
                    <p className="text-sm font-medium">
                      Crie uma estratégia de lançamento para um produto digital.
                    </p>
                  </div>
                </div>

                {/* AI Thinking / Loading */}
                <div className="flex gap-4">
                  <Skeleton className="h-10 w-10 shrink-0 rounded-full" /> {/* Avatar */}
                  <div className="w-full space-y-2">
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-4 w-24" />
                      <span className="animate-pulse text-xs text-muted-foreground">
                        Pensando...
                      </span>
                    </div>
                    <Skeleton className="h-4 w-[90%]" />
                    <Skeleton className="h-4 w-[95%]" />
                    <Skeleton className="h-4 w-[75%]" />
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* 3. Detail Page / Article */}
          <div className="space-y-4">
            <p className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
              Página de Detalhes
            </p>
            <div className="overflow-hidden rounded-xl border border-border bg-card">
              {/* Cover Image */}
              <Skeleton className="h-48 w-full rounded-none" />
              <div className="space-y-6 p-8">
                {/* Title Section */}
                <div className="space-y-3">
                  <Skeleton className="h-8 w-3/4" />
                  <div className="flex gap-3">
                    <Skeleton className="h-5 w-20 rounded-full" />
                    <Skeleton className="h-5 w-20 rounded-full" />
                  </div>
                </div>
                {/* Body Text */}
                <div className="space-y-3 pt-4">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-[92%]" />
                  <Skeleton className="h-4 w-[98%]" />
                  <Skeleton className="h-4 w-[60%]" />
                </div>
                {/* Actions */}
                <div className="flex gap-4 pt-4">
                  <Skeleton className="h-10 w-32" />
                  <Skeleton className="h-10 w-32" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- EMPTY STATES --- */}
      <section className="space-y-8 border-t border-border pt-8">
        <h3 className="flex items-center gap-2 border-b border-border pb-2 font-sans text-xl font-semibold">
          <Icon name="box" /> Empty States (Vazios)
        </h3>
        <p className="font-serif text-sm text-muted-foreground">
          Momentos em que não há dados para mostrar. Use para educar e incentivar a primeira ação.
        </p>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Simple Empty State */}
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border p-12 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted/50 text-muted-foreground">
              <Icon name="search" size="size-8" />
            </div>
            <h4 className="mb-2 text-lg font-bold">Nenhum resultado encontrado</h4>
            <p className="mb-6 max-w-xs font-serif text-sm text-muted-foreground">
              Não encontramos nada com os filtros selecionados. Tente ajustar sua busca.
            </p>
            <Button variant="outline">Limpar Filtros</Button>
          </div>

          {/* Call to Action Empty State */}
          <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-card p-12 text-center shadow-sm">
            <div className="mb-4 flex h-16 w-16 animate-pulse items-center justify-center rounded-full bg-primary/10 text-primary">
              <Icon name="magic-wand" size="size-8" />
            </div>
            <h4 className="mb-2 text-lg font-bold">Crie sua primeira Lenda</h4>
            <p className="mb-6 max-w-xs font-serif text-sm text-muted-foreground">
              Você ainda não gerou nenhum conteúdo. Comece agora a usar a IA para potencializar seu
              trabalho.
            </p>
            <Button className="gap-2">
              <Icon name="plus" size="size-4" /> Novo Projeto
            </Button>
          </div>
        </div>
      </section>

      {/* --- ERROR & MAINTENANCE --- */}
      <section className="space-y-8 border-t border-border pt-8">
        <h3 className="flex items-center gap-2 border-b border-border pb-2 font-sans text-xl font-semibold">
          <Icon name="exclamation-triangle" /> Erros & Exceções
        </h3>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* 404 / Generic Error */}
          <Card className="overflow-hidden border-destructive/20 bg-card">
            <div className="h-2 w-full bg-destructive/50"></div>
            <CardContent className="flex flex-col items-center p-12 text-center">
              <div className="mb-4 text-destructive">
                <Icon name="cross-circle" size="size-10" />
              </div>
              <h4 className="mb-2 font-sans text-2xl font-bold">Falha na Conexão</h4>
              <p className="mb-6 max-w-sm font-serif text-muted-foreground">
                Não foi possível sincronizar seus dados com o servidor neural. Verifique sua conexão
                e tente novamente.
              </p>
              <div className="flex gap-4">
                <Button variant="ghost">Reportar</Button>
                <Button
                  variant="outline"
                  className="border-destructive/50 text-destructive hover:bg-destructive/10"
                >
                  Tentar Novamente
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Offline / Maintenance */}
          <Card className="border-none bg-muted/10">
            <CardContent className="flex flex-col items-center p-12 text-center">
              <Icon name="cloud-slash" className="mb-4 text-6xl text-muted-foreground opacity-20" />
              <h4 className="mb-2 font-sans text-xl font-bold text-muted-foreground">
                Modo Offline
              </h4>
              <p className="mb-6 max-w-xs font-serif text-sm text-muted-foreground/70">
                Você está navegando em uma versão em cache. Algumas funcionalidades de IA podem
                estar indisponíveis.
              </p>
              <Badge variant="outline" className="bg-background">
                Última sync: 14:30
              </Badge>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* --- LOADERS --- */}
      <section className="space-y-8 border-t border-border pt-8">
        <h3 className="border-b border-border pb-2 font-sans text-xl font-semibold">
          Loaders & Spinners
        </h3>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Standard Spinner */}
          <Card className="flex flex-col items-center justify-center bg-card p-8">
            <div className="mb-4 animate-spin text-primary">
              <Icon name="spinner" size="size-8" />
            </div>
            <p className="text-sm font-medium text-muted-foreground">Carregamento Padrão</p>
          </Card>

          {/* AI Generation Loader */}
          <Card className="flex flex-col items-center justify-center border-primary/20 bg-gradient-to-br from-card to-primary/5 p-8">
            <div className="relative mb-4">
              <div className="absolute inset-0 animate-pulse rounded-full bg-primary/20 blur-xl"></div>
              <Symbol
                name="infinity"
                className="relative z-10 animate-spin-slow text-4xl text-primary"
              />
            </div>
            <p className="animate-pulse text-sm font-bold text-foreground">Gerando Lenda...</p>
            <p className="text-xs text-muted-foreground">Processando tokens neurais</p>
          </Card>

          {/* Progress Bar */}
          <Card className="flex flex-col justify-center space-y-4 bg-card p-8">
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-medium">
                <span>Upload</span>
                <span>45%</span>
              </div>
              <Progress value={45} />
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-medium">
                <span>Processamento</span>
                <span>Indeterminado</span>
              </div>
              {/* Indeterminate simulated by full width + pulse */}
              <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                <div className="h-full w-1/2 animate-[shimmer_1.5s_infinite] rounded-full bg-primary"></div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* --- WIZARD / STEPPER --- */}
      <section className="space-y-8 border-t border-border pt-8">
        <h3 className="border-b border-border pb-2 font-sans text-xl font-semibold">
          Jornada em Etapas (Wizard)
        </h3>

        <div className="space-y-12 rounded-xl border border-border bg-card p-8">
          {/* Replaced manual stepper with Component */}
          <Stepper
            currentStep={1}
            steps={[
              { id: 1, label: 'Dados' },
              { id: 2, label: 'Configuração IA' },
              { id: 3, label: 'Revisão' },
              { id: 4, label: 'Pagamento' },
            ]}
          />

          {/* Content Placeholder */}
          <div className="flex h-32 items-center justify-center rounded-lg border border-dashed border-border bg-muted/10 font-serif text-sm text-muted-foreground">
            Conteúdo do Passo 2: Configuração do Modelo Neural
          </div>
        </div>
      </section>
    </div>
  );
};

export default StatesSection;

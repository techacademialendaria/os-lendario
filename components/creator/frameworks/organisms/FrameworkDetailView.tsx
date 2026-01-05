import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Icon } from '@/components/ui/icon';
import { cn } from '@/lib/utils';
import { FrameworkStep } from '../molecules';
import { CATEGORY_LABELS, CATEGORY_COLORS, type FrameworkDetailProps } from '../types';

export const FrameworkDetailView: React.FC<FrameworkDetailProps> = ({ framework, onBack }) => {
  const catColors = CATEGORY_COLORS[framework.frameworkType] || CATEGORY_COLORS.pedagogical;
  const isPedagogical = framework.frameworkType === 'pedagogical';

  return (
    <div className="animate-fade-in space-y-6">
      {/* Back Button */}
      <Button variant="ghost" onClick={onBack} className="mb-4">
        <Icon name="arrow-left" className="mr-2" size="size-4" /> Voltar para Frameworks
      </Button>

      {/* Header */}
      <div
        className="relative overflow-hidden rounded-xl border bg-card p-6"
        style={{ borderColor: `${framework.color}30` }}
      >
        {/* Background Gradient */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            background: `linear-gradient(135deg, ${framework.color} 0%, transparent 70%)`,
          }}
        />

        <div className="relative flex flex-col items-start gap-6 md:flex-row">
          <div
            className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl border text-2xl"
            style={{
              backgroundColor: `${framework.color}20`,
              borderColor: `${framework.color}30`,
            }}
          >
            <Icon
              name={framework.icon as any}
              size="size-7"
              style={{ color: framework.color }}
            />
          </div>

          <div className="flex-1 space-y-3">
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-2xl font-bold">{framework.name}</h2>
              <Badge className={cn('text-xs', catColors.bg, catColors.text, catColors.border)}>
                {CATEGORY_LABELS[framework.frameworkType] || framework.frameworkType}
              </Badge>
            </div>
            <p className="text-muted-foreground">{framework.description}</p>
          </div>

          <Button
            className="shrink-0 text-white"
            style={{ backgroundColor: framework.color }}
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
              {framework.steps.map((step, i) => (
                <FrameworkStep
                  key={i}
                  step={step}
                  index={i}
                  color={framework.color}
                  isPedagogical={isPedagogical}
                />
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
                  {CATEGORY_LABELS[framework.frameworkType] || framework.frameworkType}
                </Badge>
              </div>
              <div className="flex items-center justify-between border-b border-border/50 py-2">
                <span className="text-sm text-muted-foreground">Etapas</span>
                <span className="font-semibold">{framework.steps.length}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-muted-foreground">Status</span>
                <Badge
                  variant={framework.isActive ? 'default' : 'secondary'}
                  className="text-xs"
                >
                  {framework.isActive ? 'Ativo' : 'Inativo'}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Best For */}
          {framework.bestFor && framework.bestFor.length > 0 && (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-muted-foreground">
                  <Icon name="check-circle" size="size-4" /> Aplicação
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-2">
                <div className="flex flex-wrap gap-2">
                  {framework.bestFor.map((item, i) => (
                    <Badge key={i} variant="secondary" className="text-xs">
                      {item}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Use Cases */}
          {framework.useCases && framework.useCases.length > 0 && (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-muted-foreground">
                  <Icon name="briefcase" size="size-4" /> Melhores Práticas
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-2">
                <ul className="space-y-2">
                  {framework.useCases.map((useCase, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span
                        className="h-1.5 w-1.5 shrink-0 rounded-full"
                        style={{ backgroundColor: framework.color }}
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

import React from 'react';
import { Icon } from '../ui/icon';
import { Symbol } from '../ui/symbol';
import { cn } from '../../lib/utils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';

// --- HELPER COMPONENTS ---

type CheckStyle = 'standard' | 'white' | 'soft' | 'soft-outlined' | 'solid' | 'outlined';
type ColorVariant = 'dark' | 'gray' | 'green' | 'blue' | 'red' | 'yellow' | 'light' | 'primary';
type Shape = 'rounded' | 'circle';

interface ListItemProps {
  style?: CheckStyle;
  color?: ColorVariant;
  shape?: Shape;
  label: React.ReactNode;
  className?: string;
}

const ListItem: React.FC<ListItemProps> = ({
  style = 'standard',
  color = 'dark',
  shape = 'circle',
  label,
  className,
}) => {
  // Mapping Colors
  const colorMap: Record<
    ColorVariant,
    {
      text: string;
      bg: string;
      border: string;
      iconColor: string;
      bgSolid: string;
    }
  > = {
    dark: {
      text: 'text-foreground',
      bg: 'bg-foreground/10',
      border: 'border-foreground',
      iconColor: 'text-foreground',
      bgSolid: 'bg-foreground',
    },
    gray: {
      text: 'text-muted-foreground',
      bg: 'bg-muted',
      border: 'border-muted-foreground/30',
      iconColor: 'text-muted-foreground',
      bgSolid: 'bg-muted-foreground',
    },
    green: {
      text: 'text-brand-green',
      bg: 'bg-brand-green/10',
      border: 'border-brand-green',
      iconColor: 'text-brand-green',
      bgSolid: 'bg-brand-green',
    },
    blue: {
      text: 'text-brand-blue',
      bg: 'bg-brand-blue/10',
      border: 'border-brand-blue',
      iconColor: 'text-brand-blue',
      bgSolid: 'bg-brand-blue',
    },
    red: {
      text: 'text-brand-red',
      bg: 'bg-brand-red/10',
      border: 'border-brand-red',
      iconColor: 'text-brand-red',
      bgSolid: 'bg-brand-red',
    },
    yellow: {
      text: 'text-brand-yellow',
      bg: 'bg-brand-yellow/10',
      border: 'border-brand-yellow',
      iconColor: 'text-brand-yellow-dark',
      bgSolid: 'bg-brand-yellow',
    },
    light: {
      text: 'text-foreground',
      bg: 'bg-white/10',
      border: 'border-white/30',
      iconColor: 'text-white',
      bgSolid: 'bg-white',
    },
    primary: {
      text: 'text-primary',
      bg: 'bg-primary/10',
      border: 'border-primary',
      iconColor: 'text-primary',
      bgSolid: 'bg-primary',
    },
  };

  const colors = colorMap[color];
  const radius = shape === 'circle' ? 'rounded-full' : 'rounded-md';

  // Define Icon Container Styles
  let iconContainerClass = '';
  let checkIconClass = '';

  switch (style) {
    case 'standard':
      iconContainerClass = cn('w-5 h-5 flex items-center justify-center shrink-0');
      checkIconClass = colors.text;
      break;
    case 'white':
      iconContainerClass = cn(
        'w-5 h-5 flex items-center justify-center bg-card border border-border shadow-sm shrink-0',
        radius
      );
      checkIconClass = colors.text;
      break;
    case 'soft':
      iconContainerClass = cn(
        'w-5 h-5 flex items-center justify-center shrink-0',
        colors.bg,
        radius
      );
      checkIconClass = colors.iconColor;
      break;
    case 'soft-outlined':
      iconContainerClass = cn(
        'w-5 h-5 flex items-center justify-center border shrink-0',
        colors.bg,
        colors.border,
        radius
      );
      checkIconClass = colors.iconColor;
      break;
    case 'solid':
      iconContainerClass = cn(
        'w-5 h-5 flex items-center justify-center shrink-0',
        colors.bgSolid,
        radius
      );
      // Contrast logic for solid backgrounds
      checkIconClass =
        color === 'yellow' || color === 'primary' ? 'text-black' : 'text-white dark:text-black';
      if (color === 'dark') checkIconClass = 'text-background';
      break;
    case 'outlined':
      iconContainerClass = cn(
        'w-5 h-5 flex items-center justify-center border bg-transparent shrink-0',
        colors.border,
        radius
      );
      checkIconClass = colors.text;
      break;
  }

  return (
    <div className={cn('flex items-start gap-3', className)}>
      <div className={cn(iconContainerClass, 'mt-0.5')}>
        <Icon name="check" className={cn('h-3 w-3', checkIconClass)} />
      </div>
      <span className="text-sm font-medium leading-tight text-foreground/90">{label}</span>
    </div>
  );
};

const ListSection: React.FC = () => {
  return (
    <div className="animate-fade-in space-y-20">
      {/* HEADER */}
      <div className="flex flex-col items-start justify-between gap-4 border-b border-border pb-8 md:flex-row md:items-end">
        <div>
          <h2 className="mb-4 font-serif text-4xl font-light">Listas & Checklist</h2>
          <p className="max-w-2xl font-serif text-lg leading-relaxed text-muted-foreground">
            Componentes essenciais para exibir recursos, passos, comparações e metadados. Projetados
            para legibilidade e escaneabilidade.
          </p>
        </div>
        <div className="flex gap-2">
          <Badge variant="outline" className="h-8">
            v4.1 System
          </Badge>
        </div>
      </div>

      {/* --- SECTION 1: REAL WORLD CONTEXT (HERO) --- */}
      <section className="space-y-8">
        <h3 className="flex items-center gap-2 font-sans text-xl font-semibold">
          <Icon name="layout-fluid" className="text-primary" /> Aplicação Real
        </h3>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* USE CASE: PRICING CARD (Solid/Primary) */}
          <Card className="relative overflow-hidden border-primary/20 bg-gradient-to-b from-card to-primary/5 shadow-lg">
            <div className="pointer-events-none absolute right-0 top-0 p-4 opacity-10">
              <Icon name="crown" className="-rotate-12 text-8xl" />
            </div>
            <CardHeader>
              <Badge className="mb-2 w-fit">Recomendado</Badge>
              <CardTitle className="text-2xl">Lendário Pro</CardTitle>
              <CardDescription>Para quem busca o topo.</CardDescription>
              <div className="flex items-baseline gap-1 pt-4">
                <span className="text-4xl font-bold text-primary">R$ 97</span>
                <span className="text-muted-foreground">/mês</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <Separator className="bg-primary/20" />
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                O que está incluso:
              </p>
              <div className="space-y-3">
                <ListItem
                  label="Acesso Ilimitado à IA"
                  style="solid"
                  color="primary"
                  shape="circle"
                />
                <ListItem
                  label="Templates de Alta Conversão"
                  style="solid"
                  color="primary"
                  shape="circle"
                />
                <ListItem
                  label="Suporte Prioritário 24/7"
                  style="solid"
                  color="primary"
                  shape="circle"
                />
                <ListItem
                  label="Comunidade Exclusiva"
                  style="solid"
                  color="primary"
                  shape="circle"
                />
                <ListItem
                  label="Certificação Oficial"
                  style="solid"
                  color="primary"
                  shape="circle"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full shadow-lg shadow-primary/20">Assinar Agora</Button>
            </CardFooter>
          </Card>

          {/* USE CASE: FEATURE BREAKDOWN (Soft/Blue) */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="settings" /> Configuração do Projeto
              </CardTitle>
              <CardDescription>Checklist de lançamento.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-3">
                  <ListItem
                    label="Definição de Domínio"
                    style="soft"
                    color="blue"
                    shape="rounded"
                  />
                  <ListItem label="Configuração de DNS" style="soft" color="blue" shape="rounded" />
                  <ListItem
                    label="Instalação de Certificado SSL"
                    style="soft"
                    color="blue"
                    shape="rounded"
                  />
                </div>
                <Separator />
                <div className="space-y-3 opacity-60">
                  <ListItem
                    label="Integração de Pagamento"
                    style="outlined"
                    color="gray"
                    shape="rounded"
                  />
                  <ListItem label="Testes de Carga" style="outlined" color="gray" shape="rounded" />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Gerenciar
              </Button>
            </CardFooter>
          </Card>

          {/* USE CASE: PROS & CONS (Semantic) */}
          <Card>
            <CardHeader>
              <CardTitle>Análise Comparativa</CardTitle>
              <CardDescription>Pontos fortes e fracos.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="text-success mb-3 flex items-center gap-2 text-sm font-bold">
                  <Icon name="thumbs-up" /> Vantagens
                </h4>
                <div className="space-y-2">
                  <ListItem label="Alta Performance" style="standard" color="green" />
                  <ListItem label="Escalabilidade Infinita" style="standard" color="green" />
                  <ListItem label="Custo Benefício" style="standard" color="green" />
                </div>
              </div>
              <div>
                <h4 className="mb-3 flex items-center gap-2 text-sm font-bold text-destructive">
                  <Icon name="thumbs-down" /> Desvantagens
                </h4>
                <div className="space-y-2">
                  <div className="flex items-start gap-3">
                    <Icon name="cross" className="mt-0.5 h-4 w-4 text-destructive" />
                    <span className="text-sm">Curva de aprendizado</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon name="cross" className="mt-0.5 h-4 w-4 text-destructive" />
                    <span className="text-sm">Requer internet ativa</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* --- SECTION 2: THE MATRIX (STYLES & COLORS) --- */}
      <section className="space-y-8 border-t border-border pt-12">
        <div className="space-y-2">
          <h3 className="font-sans text-xl font-semibold">Galeria de Estilos</h3>
          <p className="font-serif text-sm text-muted-foreground">
            Matriz de combinações visuais para diferentes hierarquias de informação.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {/* SOLID - High Emphasis */}
          <div className="space-y-4">
            <h4 className="border-b border-border pb-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Solid (High Emphasis)
            </h4>
            <div className="space-y-3">
              <ListItem label="Primary Feature" style="solid" color="primary" />
              <ListItem label="Success State" style="solid" color="green" />
              <ListItem label="Alert / Critical" style="solid" color="red" />
              <ListItem label="Info Highlight" style="solid" color="blue" />
              <ListItem label="Neutral / Dark" style="solid" color="dark" />
            </div>
          </div>

          {/* SOFT - Medium Emphasis */}
          <div className="space-y-4">
            <h4 className="border-b border-border pb-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Soft (Balanced)
            </h4>
            <div className="space-y-3">
              <ListItem label="Primary Feature" style="soft" color="primary" />
              <ListItem label="Success State" style="soft" color="green" />
              <ListItem label="Alert / Critical" style="soft" color="red" />
              <ListItem label="Info Highlight" style="soft" color="blue" />
              <ListItem label="Neutral / Gray" style="soft" color="gray" />
            </div>
          </div>

          {/* OUTLINED - Low Emphasis */}
          <div className="space-y-4">
            <h4 className="border-b border-border pb-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Outlined (Subtle)
            </h4>
            <div className="space-y-3">
              <ListItem label="Primary Feature" style="outlined" color="primary" />
              <ListItem label="Success State" style="outlined" color="green" />
              <ListItem label="Alert / Critical" style="outlined" color="red" />
              <ListItem label="Info Highlight" style="outlined" color="blue" />
              <ListItem label="Neutral / Gray" style="outlined" color="gray" />
            </div>
          </div>

          {/* MINIMAL - Clean */}
          <div className="space-y-4">
            <h4 className="border-b border-border pb-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Minimal (Clean)
            </h4>
            <div className="space-y-3">
              <ListItem label="Standard Check" style="standard" color="primary" />
              <ListItem label="Green Check" style="standard" color="green" />
              <div className="flex items-start gap-3">
                <Icon name="check" className="mt-0.5 h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground line-through">
                  Disabled / Completed
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 3: SHAPES & VARIANTS --- */}
      <section className="space-y-8 border-t border-border pt-12">
        <h3 className="font-sans text-xl font-semibold">Formas & Variações</h3>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <Card className="border-dashed bg-muted/10">
            <CardHeader>
              <CardTitle className="text-base">Rounded (Square)</CardTitle>
              <CardDescription>Para listas mais técnicas ou modernas.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <ListItem label="Soft Rounded" style="soft" color="blue" shape="rounded" />
                <ListItem label="Solid Rounded" style="solid" color="blue" shape="rounded" />
              </div>
              <div className="space-y-2">
                <ListItem label="Outlined Rounded" style="outlined" color="blue" shape="rounded" />
                <ListItem label="White Rounded" style="white" color="blue" shape="rounded" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-dashed bg-muted/10">
            <CardHeader>
              <CardTitle className="text-base">Circle (Pill)</CardTitle>
              <CardDescription>O padrão amigável e orgânico.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <ListItem label="Soft Circle" style="soft" color="primary" shape="circle" />
                <ListItem label="Solid Circle" style="solid" color="primary" shape="circle" />
              </div>
              <div className="space-y-2">
                <ListItem label="Outlined Circle" style="outlined" color="primary" shape="circle" />
                <ListItem label="White Circle" style="white" color="primary" shape="circle" />
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* --- SECTION 4: TYPOGRAPHY & METADATA --- */}
      <section className="space-y-8 border-t border-border pt-12">
        <h3 className="font-sans text-xl font-semibold">Tipografia & Metadados</h3>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          {/* Standard HTML Lists */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Listas de Texto
            </h4>
            <div className="space-y-6 rounded-xl border border-border bg-card p-6">
              <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground marker:text-primary">
                <li>Item de lista padrão</li>
                <li>Marcador com cor primária</li>
                <li>Texto serifado para leitura</li>
              </ul>
              <ol className="list-decimal space-y-1 pl-5 text-sm text-muted-foreground marker:font-bold marker:text-foreground">
                <li>Passo ordenado um</li>
                <li>Passo ordenado dois</li>
                <li>Passo ordenado três</li>
              </ol>
            </div>
          </div>

          {/* Inline Separators */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Separadores Inline (Breadcrumbs/Meta)
            </h4>
            <div className="flex flex-col justify-center space-y-4 rounded-xl border border-border bg-card p-6">
              <div className="flex flex-wrap items-center justify-center gap-2 text-sm">
                <span className="text-foreground">Home</span>
                <Icon
                  name="angle-small-right"
                  className="text-muted-foreground opacity-50"
                  size="size-3"
                />
                <span className="text-foreground">Settings</span>
                <Icon
                  name="angle-small-right"
                  className="text-muted-foreground opacity-50"
                  size="size-3"
                />
                <span className="font-semibold text-primary">Billing</span>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground">
                <span>Admin</span>
                <Symbol name="bullet" />
                <span>2h atrás</span>
                <Symbol name="bullet" />
                <span>Editado</span>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-3 text-sm">
                <span className="cursor-pointer transition-colors hover:text-primary">Privacy</span>
                <span className="text-border">|</span>
                <span className="cursor-pointer transition-colors hover:text-primary">Terms</span>
                <span className="text-border">|</span>
                <span className="cursor-pointer transition-colors hover:text-primary">Support</span>
              </div>
            </div>
          </div>

          {/* Icon Metadata List */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Metadados com Ícones
            </h4>
            <div className="space-y-3 rounded-xl border border-border bg-card p-6">
              <div className="flex items-center gap-3 text-sm">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground">
                  <Icon name="envelope" size="size-4" />
                </div>
                <span className="text-muted-foreground">contato@academialendaria.com</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground">
                  <Icon name="map-marker" size="size-4" />
                </div>
                <span className="text-muted-foreground">São Paulo, SP - Brasil</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground">
                  <Icon name="globe" size="size-4" />
                </div>
                <span className="cursor-pointer text-primary hover:underline">
                  www.academialendaria.com
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 5: LIST GROUPS (Advanced) --- */}
      <section className="space-y-8 border-t border-border pt-12">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h3 className="font-sans text-2xl font-bold">List Groups & Menus</h3>
            <p className="text-sm text-muted-foreground">
              Padrões de navegação vertical e horizontal com estados interativos.
            </p>
          </div>
        </div>

        {/* 1. Basic Shapes & States */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Basic Usage */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Basic Usage
            </h4>
            <div className="overflow-hidden rounded-xl border border-border bg-card">
              <div className="cursor-pointer border-b border-border px-4 py-3 text-sm font-medium transition-colors hover:bg-muted/50">
                Profile
              </div>
              <div className="cursor-pointer border-b border-border bg-primary/5 px-4 py-3 text-sm font-medium text-primary">
                Active
              </div>
              <div className="cursor-pointer border-b border-border bg-muted px-4 py-3 text-sm font-medium">
                Hover
              </div>
              <div className="cursor-not-allowed px-4 py-3 text-sm font-medium text-muted-foreground opacity-60">
                Disabled
              </div>
            </div>
          </div>

          {/* Flush (No outer border radius conceptually, usually inside a card) */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Flush
            </h4>
            <div className="bg-card">
              <div className="cursor-pointer border-b border-border px-0 py-3 text-sm font-medium transition-colors hover:bg-muted/50">
                Profile
              </div>
              <div className="cursor-pointer border-b border-border px-0 py-3 text-sm font-medium text-primary">
                Active
              </div>
              <div className="cursor-pointer border-b border-border bg-muted/30 px-0 py-3 text-sm font-medium">
                Hover
              </div>
              <div className="cursor-not-allowed px-0 py-3 text-sm font-medium text-muted-foreground opacity-60">
                Disabled
              </div>
            </div>
          </div>

          {/* No Gutters (Tight) */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
              No Gutters
            </h4>
            <div className="border-y border-border bg-card">
              <div className="cursor-pointer border-b border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted/50">
                Profile
              </div>
              <div className="cursor-pointer border-b border-border px-4 py-2 text-sm font-medium text-primary">
                Active
              </div>
              <div className="cursor-pointer border-b border-border bg-muted/30 px-4 py-2 text-sm font-medium">
                Hover
              </div>
              <div className="cursor-not-allowed px-4 py-2 text-sm font-medium text-muted-foreground opacity-60">
                Disabled
              </div>
            </div>
          </div>
        </div>

        {/* 2. Complex Variations */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {/* List Group */}
          <Card className="overflow-hidden">
            <div className="border-b border-border bg-muted/50 px-4 py-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
              List Group
            </div>
            <div className="divide-y divide-border">
              <button className="w-full px-4 py-3 text-left text-sm font-medium transition-colors hover:bg-muted/50">
                Profile
              </button>
              <button className="w-full bg-primary/5 px-4 py-3 text-left text-sm font-medium text-primary transition-colors hover:bg-primary/10">
                Settings
              </button>
              <button className="w-full px-4 py-3 text-left text-sm font-medium transition-colors hover:bg-muted/50">
                Newsletter
              </button>
              <button className="w-full cursor-not-allowed px-4 py-3 text-left text-sm font-medium text-muted-foreground opacity-50">
                Team
              </button>
            </div>
          </Card>

          {/* Icons */}
          <Card className="overflow-hidden">
            <div className="border-b border-border bg-muted/50 px-4 py-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Icons & Badges
            </div>
            <div className="divide-y divide-border">
              <button className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium transition-colors hover:bg-muted/50">
                <Icon name="user" className="text-muted-foreground" size="size-4" />
                Profile
              </button>
              <button className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium transition-colors hover:bg-muted/50">
                <Icon name="settings" className="text-muted-foreground" size="size-4" />
                Settings
              </button>
              <button className="flex w-full items-center justify-between px-4 py-3 text-sm font-medium transition-colors hover:bg-muted/50">
                <div className="flex items-center gap-3">
                  <Icon name="bell" className="text-muted-foreground" size="size-4" />
                  Newsletter
                </div>
                <Badge variant="outline" className="h-5 px-1.5 text-[10px]">
                  New
                </Badge>
              </button>
              <button className="flex w-full items-center justify-between px-4 py-3 text-sm font-medium text-primary transition-colors hover:bg-muted/50">
                <div className="flex items-center gap-3">
                  <Icon name="users-alt" size="size-4" />
                  Team
                </div>
                <Badge className="h-5 bg-primary px-1.5 text-[10px] text-primary-foreground">
                  99+
                </Badge>
              </button>
            </div>
          </Card>

          {/* Striped */}
          <Card className="overflow-hidden">
            <div className="border-b border-border bg-muted/50 px-4 py-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Striped
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-3 px-4 py-3 text-sm font-medium">
                <Icon name="user" className="text-muted-foreground" size="size-4" /> Profile
              </div>
              <div className="flex items-center justify-between bg-muted/40 px-4 py-3 text-sm font-medium">
                <div className="flex items-center gap-3">
                  <Icon name="settings" className="text-muted-foreground" size="size-4" /> Settings
                </div>
                <Badge variant="secondary" className="text-[10px]">
                  New
                </Badge>
              </div>
              <div className="flex items-center justify-between px-4 py-3 text-sm font-medium">
                <div className="flex items-center gap-3">
                  <Icon name="bell" className="text-muted-foreground" size="size-4" /> Newsletter
                </div>
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-muted text-[10px] font-bold">
                  2
                </div>
              </div>
              <div className="flex items-center justify-between bg-muted/40 px-4 py-3 text-sm font-medium">
                <div className="flex items-center gap-3">
                  <Icon name="users-alt" className="text-muted-foreground" size="size-4" /> Team
                </div>
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-[10px] font-bold text-primary">
                  9+
                </div>
              </div>
            </div>
          </Card>

          {/* Striped with Border */}
          <Card className="overflow-hidden border-2 border-border/60">
            <div className="border-b border-border bg-muted/50 px-4 py-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Striped + Border
            </div>
            <div className="flex flex-col divide-y divide-border">
              <div className="flex items-center gap-3 px-4 py-3 text-sm font-medium">
                <Icon name="user" className="text-muted-foreground" size="size-4" /> Profile
              </div>
              <div className="flex items-center gap-3 bg-muted/30 px-4 py-3 text-sm font-medium">
                <Icon name="settings" className="text-muted-foreground" size="size-4" /> Settings
              </div>
              <div className="flex items-center justify-between px-4 py-3 text-sm font-medium">
                <div className="flex items-center gap-3">
                  <Icon name="bell" className="text-muted-foreground" size="size-4" /> Newsletter
                </div>
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-foreground text-[10px] font-bold text-background">
                  5
                </div>
              </div>
              <div className="flex items-center justify-between bg-muted/30 px-4 py-3 text-sm font-medium">
                <div className="flex items-center gap-3">
                  <Icon name="users-alt" className="text-muted-foreground" size="size-4" /> Team
                </div>
                <div className="font-mono text-xs text-muted-foreground">99+</div>
              </div>
            </div>
          </Card>
        </div>

        {/* 3. Horizontal */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Horizontal
            </h4>
            <div className="flex overflow-x-auto rounded-lg border border-border bg-card p-1">
              <button className="flex-1 whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-muted">
                <Icon
                  name="user"
                  className="mr-2 inline-block text-muted-foreground"
                  size="size-3"
                />{' '}
                Profile
              </button>
              <div className="my-1 w-px bg-border"></div>
              <button className="flex-1 whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-muted">
                <Icon
                  name="settings"
                  className="mr-2 inline-block text-muted-foreground"
                  size="size-3"
                />{' '}
                Settings
              </button>
              <div className="my-1 w-px bg-border"></div>
              <button className="flex-1 whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-muted">
                <Icon
                  name="bell"
                  className="mr-2 inline-block text-muted-foreground"
                  size="size-3"
                />{' '}
                Newsletter
              </button>
              <div className="my-1 w-px bg-border"></div>
              <button className="flex-1 whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-muted">
                <Icon
                  name="users-alt"
                  className="mr-2 inline-block text-muted-foreground"
                  size="size-3"
                />{' '}
                Team
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Mixed Horizontal
            </h4>
            <div className="flex divide-x divide-border overflow-hidden rounded-lg border border-border bg-card">
              <button className="flex-1 bg-primary/5 px-4 py-3 text-sm font-medium text-primary hover:bg-muted/50">
                <Icon name="user" className="mr-2 inline-block" size="size-3" /> Profile
              </button>
              <button className="flex flex-1 items-center justify-center gap-2 px-4 py-3 text-sm font-medium hover:bg-muted/50">
                Settings
                <span className="rounded-full bg-primary px-1.5 py-0.5 text-[10px] text-primary-foreground">
                  2
                </span>
              </button>
              <button className="flex flex-1 items-center justify-center gap-2 px-4 py-3 text-sm font-medium hover:bg-muted/50">
                Newsletter
              </button>
              <button className="flex flex-1 cursor-not-allowed items-center justify-center gap-2 bg-muted/20 px-4 py-3 text-sm font-medium text-muted-foreground">
                Team
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/50 text-[10px] text-primary-foreground">
                  5
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ListSection;

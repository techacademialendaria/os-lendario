import React, { useState } from 'react';
import SalesTopbar from '../SalesTopbar';
import { Section } from '../../../types';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Icon } from '../../ui/icon';
import { Badge } from '../../ui/badge';
import { Tabs, TabsList, TabsTrigger } from '../../ui/tabs';
import { Progress } from '../../ui/progress';
import { ScrollArea } from '../../ui/scroll-area';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table';
import { cn } from '../../../lib/utils';

// --- VISUALIZATION HELPERS ---

const Sparkline: React.FC<{ data: number[]; color?: string }> = ({
  data,
  color = 'stroke-primary',
}) => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const points = data
    .map((val, i) => {
      const x = (i / (data.length - 1)) * 100;
      const y = 100 - ((val - min) / (max - min)) * 100;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <svg viewBox="0 0 100 100" className="h-6 w-16 overflow-visible" preserveAspectRatio="none">
      <polyline
        fill="none"
        strokeWidth="3"
        points={points}
        className={cn(color, 'vector-effect-non-scaling-stroke')}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const StackedAreaChart: React.FC = () => {
  // Simulated path data for a wavy stacked chart
  return (
    <div className="relative h-64 w-full">
      <svg viewBox="0 0 1000 300" preserveAspectRatio="none" className="h-full w-full">
        {/* Grid Lines */}
        <line
          x1="0"
          y1="75"
          x2="1000"
          y2="75"
          className="stroke-dasharray-4 stroke-border stroke-1"
        />
        <line
          x1="0"
          y1="150"
          x2="1000"
          y2="150"
          className="stroke-dasharray-4 stroke-border stroke-1"
        />
        <line
          x1="0"
          y1="225"
          x2="1000"
          y2="225"
          className="stroke-dasharray-4 stroke-border stroke-1"
        />

        {/* Layer 1: Competitor (Bottom) */}
        <path
          d="M0,300 Q250,280 500,290 T1000,300 L1000,300 L0,300 Z"
          className="fill-brand-blue opacity-20"
        />
        <path
          d="M0,300 Q250,280 500,290 T1000,300"
          className="fill-none stroke-brand-blue stroke-2"
        />

        {/* Layer 2: Timing (Middle) */}
        <path
          d="M0,300 Q250,200 500,220 T1000,250 L1000,300 L0,300 Z"
          className="fill-brand-orange opacity-20"
        />
        <path
          d="M0,300 Q250,200 500,220 T1000,250"
          className="fill-none stroke-brand-orange stroke-2"
        />

        {/* Layer 3: Price (Top) - Largest */}
        <path
          d="M0,300 Q250,100 500,150 T1000,100 L1000,300 L0,300 Z"
          className="fill-destructive opacity-10"
        />
        <path
          d="M0,300 Q250,100 500,150 T1000,100"
          className="fill-none stroke-destructive stroke-2"
        />
      </svg>

      {/* Axis Labels (X) */}
      <div className="mt-2 flex justify-between font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
        <span>Semana 1</span>
        <span>Semana 2</span>
        <span>Semana 3</span>
        <span>Semana 4</span>
      </div>
    </div>
  );
};

// --- DATA ---

const SalesObjectionsTemplate: React.FC<{ setSection: (s: Section) => void }> = ({
  setSection,
}) => {
  const [period, setPeriod] = useState('30d');

  // Mock Ranking Data
  const objectionRanking = [
    {
      name: 'Preço muito alto',
      count: 245,
      trend: [10, 20, 15, 30, 45, 40, 55],
      color: 'bg-destructive',
      stroke: 'stroke-destructive',
    },
    {
      name: 'Concorrente X',
      count: 180,
      trend: [30, 25, 35, 20, 15, 20, 10],
      color: 'bg-brand-blue',
      stroke: 'stroke-brand-blue',
    },
    {
      name: 'Timing / Agora não',
      count: 120,
      trend: [10, 12, 10, 15, 12, 18, 20],
      color: 'bg-brand-orange',
      stroke: 'stroke-brand-orange',
    },
    {
      name: 'Preciso falar com sócio',
      count: 90,
      trend: [5, 5, 8, 10, 12, 15, 12],
      color: 'bg-brand-green',
      stroke: 'stroke-brand-green',
    },
    {
      name: 'Dúvida Técnica (API)',
      count: 65,
      trend: [20, 18, 15, 12, 10, 8, 5],
      color: 'bg-muted-foreground',
      stroke: 'stroke-muted-foreground',
    },
  ];

  // Mock Matrix Data (Objections x Products)
  const products = ['Enterprise', 'Pro Plan', 'Consultoria'];
  const matrixData = [
    { objection: 'Preço', values: [80, 40, 20] }, // High intensity for Enterprise
    { objection: 'Concorrente', values: [20, 60, 10] }, // High for Pro
    { objection: 'Timing', values: [30, 30, 30] },
    { objection: 'Sócio', values: [50, 20, 80] }, // High for Consultoria
    { objection: 'Técnica', values: [90, 10, 0] }, // Very high for Enterprise
  ];

  const getHeatmapColor = (val: number) => {
    if (val > 70) return 'bg-destructive text-destructive-foreground font-bold';
    if (val > 40) return 'bg-destructive/60 text-white';
    if (val > 20) return 'bg-destructive/30 text-white/80';
    return 'bg-muted/30 text-muted-foreground';
  };

  // Mock Alerts
  const alerts = [
    { objection: 'Concorrente Z (Novo)', freq: 12, growth: '+200%' },
    { objection: 'LGPD / Compliance', freq: 8, growth: '+50%' },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background pb-20 font-sans">
      <SalesTopbar currentSection={Section.TEMPLATE_SALES_OBJECTIONS} setSection={setSection} />

      <main className="mx-auto w-full max-w-[1400px] flex-1 space-y-6 p-6">
        {/* --- HEADER --- */}
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Análise de Objeções
            </h2>
            <div className="hidden h-6 w-px bg-border md:block"></div>
            <div className="flex items-center gap-2 rounded-full border border-border bg-muted/20 px-3 py-1">
              <div className="h-2 w-2 animate-pulse rounded-full bg-primary"></div>
              <span className="font-mono text-xs font-bold">842 Ocorrências</span>
            </div>
          </div>

          <Tabs value={period} onValueChange={setPeriod} className="w-auto">
            <TabsList className="grid h-9 w-full grid-cols-4">
              <TabsTrigger value="7d" className="text-xs">
                7d
              </TabsTrigger>
              <TabsTrigger value="30d" className="text-xs">
                30d
              </TabsTrigger>
              <TabsTrigger value="90d" className="text-xs">
                90d
              </TabsTrigger>
              <TabsTrigger value="custom" className="text-xs">
                Custom
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* --- ROW 1: METRICS --- */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <Card className="border-border bg-card shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="flex justify-between text-sm font-bold uppercase tracking-widest text-muted-foreground">
                Objeções Únicas
                <Icon name="fingerprint" className="text-brand-blue" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end gap-3">
                <span className="font-mono text-3xl font-bold text-foreground">14</span>
                <Badge
                  variant="outline"
                  className="h-5 border-brand-blue/20 bg-brand-blue/10 text-[10px] text-brand-blue"
                >
                  +2 novas
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border bg-card shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="flex justify-between text-sm font-bold uppercase tracking-widest text-muted-foreground">
                Mais Frequente
                <Icon name="flame" className="text-destructive" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col">
                <span className="truncate text-lg font-bold text-foreground">Preço muito alto</span>
                <div className="mt-1 flex items-center gap-2">
                  <span className="font-mono text-xs text-muted-foreground">245 calls</span>
                  <Icon name="trend-up" className="size-3 text-destructive" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border bg-card shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="flex justify-between text-sm font-bold uppercase tracking-widest text-muted-foreground">
                Taxa de Resolução (IA)
                <Icon name="check-circle" className="text-brand-green" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end gap-3">
                <span className="font-mono text-3xl font-bold text-foreground">42%</span>
                <p className="mb-1 text-[10px] text-muted-foreground">Contornadas com sucesso</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* --- ROW 2: MAIN CHART --- */}
        <Card className="overflow-hidden border-border">
          <CardHeader className="flex flex-row items-center justify-between border-b border-border px-6 py-4">
            <CardTitle className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest">
              <Icon name="chart-line" className="text-primary" /> Evolução ao Longo do Tempo
            </CardTitle>
            <div className="flex gap-2">
              <Badge variant="outline" className="cursor-pointer bg-muted hover:bg-muted/80">
                Absoluto
              </Badge>
              <Badge
                variant="outline"
                className="cursor-pointer border-transparent text-muted-foreground hover:bg-muted"
              >
                Percentual
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <StackedAreaChart />
            <div className="mt-4 flex justify-center gap-6">
              <div className="flex cursor-pointer items-center gap-2 opacity-80 hover:opacity-100">
                <div className="h-3 w-3 rounded-full bg-destructive"></div>
                <span className="text-xs font-bold text-muted-foreground">Preço</span>
              </div>
              <div className="flex cursor-pointer items-center gap-2 opacity-80 hover:opacity-100">
                <div className="h-3 w-3 rounded-full bg-brand-orange"></div>
                <span className="text-xs font-bold text-muted-foreground">Timing</span>
              </div>
              <div className="flex cursor-pointer items-center gap-2 opacity-80 hover:opacity-100">
                <div className="h-3 w-3 rounded-full bg-brand-blue"></div>
                <span className="text-xs font-bold text-muted-foreground">Concorrente</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* --- ROW 3: SPLIT PANELS --- */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Left: Ranking */}
          <Card className="flex h-[500px] flex-col border-border">
            <CardHeader className="border-b border-border px-6 py-4">
              <CardTitle className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest">
                <Icon name="list-ol" className="text-foreground" /> Ranking de Frequência
              </CardTitle>
            </CardHeader>
            <div className="custom-scrollbar flex-1 overflow-y-auto p-0">
              <Table>
                <TableHeader className="sticky top-0 z-10 bg-muted/10 backdrop-blur-sm">
                  <TableRow className="border-border hover:bg-transparent">
                    <TableHead className="w-[200px] text-xs font-bold">Objeção</TableHead>
                    <TableHead className="w-[100px] text-center text-xs font-bold">
                      Trend (7d)
                    </TableHead>
                    <TableHead className="text-right text-xs font-bold">Calls</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {objectionRanking.map((obj, i) => (
                    <TableRow key={i} className="group border-border hover:bg-muted/20">
                      <TableCell className="text-sm font-medium">
                        {obj.name}
                        <Progress
                          value={(obj.count / 245) * 100}
                          className="mt-2 h-1.5 bg-muted"
                          indicatorClassName={obj.color}
                        />
                      </TableCell>
                      <TableCell className="text-center">
                        <Sparkline data={obj.trend} color={obj.stroke} />
                      </TableCell>
                      <TableCell className="text-right font-mono text-sm font-bold">
                        {obj.count}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-primary"
                        >
                          <Icon name="arrow-right" size="size-3" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>

          {/* Right: Matrix */}
          <Card className="flex h-[500px] flex-col border-border">
            <CardHeader className="border-b border-border px-6 py-4">
              <CardTitle className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest">
                <Icon name="grid" className="text-brand-indigo" /> Matriz Objeção x Produto
              </CardTitle>
            </CardHeader>
            <CardContent className="flex h-full flex-col justify-center p-6">
              {/* Matrix Header */}
              <div className="mb-1 grid grid-cols-4 gap-1">
                <div className="self-end pr-2 text-right text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  Objeção
                </div>
                {products.map((p, i) => (
                  <div
                    key={i}
                    className="rotate-0 self-end pb-2 text-center text-[10px] font-bold uppercase tracking-wider text-muted-foreground"
                  >
                    {p}
                  </div>
                ))}
              </div>

              {/* Matrix Rows */}
              <div className="space-y-1">
                {matrixData.map((row, i) => (
                  <div key={i} className="group grid grid-cols-4 items-center gap-1">
                    <div
                      className="truncate pr-2 text-right text-xs font-bold text-muted-foreground transition-colors group-hover:text-foreground"
                      title={row.objection}
                    >
                      {row.objection}
                    </div>
                    {row.values.map((val, j) => (
                      <div
                        key={j}
                        className={cn(
                          'flex h-12 cursor-pointer items-center justify-center rounded-sm border border-transparent text-xs transition-transform hover:scale-105 hover:border-white/20',
                          getHeatmapColor(val)
                        )}
                        title={`${val} ocorrências`}
                      >
                        {val > 0 ? val : '-'}
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              <div className="mt-4 flex items-center justify-end gap-2 text-[10px] text-muted-foreground">
                <span>Baixa</span>
                <div className="h-2 w-16 rounded-full bg-gradient-to-r from-muted via-destructive/50 to-destructive"></div>
                <span>Alta Intensidade</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* --- ROW 4: ALERTS (NO MATERIAL) --- */}
        <Card className="border-y border-l-4 border-r border-border border-l-brand-yellow bg-card shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between border-b border-border bg-brand-yellow/5 px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-yellow text-black">
                <Icon name="exclamation" size="size-5" />
              </div>
              <div>
                <CardTitle className="text-sm font-bold uppercase tracking-widest text-foreground">
                  Atenção: Sem Material de Apoio
                </CardTitle>
                <p className="text-xs text-muted-foreground">
                  Objeções com alta frequência detectadas sem playbooks ou conteúdo cadastrado.
                </p>
              </div>
            </div>
            <Button
              size="sm"
              variant="outline"
              className="border-brand-yellow/30 text-brand-yellow hover:bg-brand-yellow/10"
            >
              Ver Todos
            </Button>
          </CardHeader>
          <div className="p-0">
            <Table>
              <TableBody>
                {alerts.map((alert, i) => (
                  <TableRow key={i} className="border-border hover:bg-muted/20">
                    <TableCell className="text-sm font-bold">{alert.objection}</TableCell>
                    <TableCell className="font-mono text-xs text-muted-foreground">
                      <span className="font-bold text-foreground">{alert.freq}</span> ocorrências
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="warning"
                        className="border-brand-yellow/20 bg-brand-yellow/10 text-brand-yellow-dark"
                      >
                        Crescimento: {alert.growth}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        size="sm"
                        className="h-7 bg-brand-yellow text-xs font-bold text-black hover:bg-brand-yellow/90"
                      >
                        <Icon name="magic-wand" size="size-3" className="mr-2" /> Criar Material
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default SalesObjectionsTemplate;

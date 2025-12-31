import React, { useState } from 'react';
import SalesTopbar from '../SalesTopbar';
import { Section } from '../../../types';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Icon } from '../../ui/icon';
import { Badge } from '../../ui/badge';
import { Select } from '../../ui/select';
import { Tabs, TabsList, TabsTrigger } from '../../ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../../ui/accordion';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table';
import { cn } from '../../../lib/utils';

const SalesProductTemplate: React.FC<{ setSection: (s: Section) => void }> = ({ setSection }) => {
  const [period, setPeriod] = useState('30d');

  // Mock Data: Feature Requests
  const featureRequests = [
    { id: 1, label: 'Integração WhatsApp Nativa', count: 87, roadmap: false },
    { id: 2, label: 'Dashboard Financeiro Customizável', count: 64, roadmap: true },
    { id: 3, label: 'App Mobile (iOS/Android)', count: 52, roadmap: false },
    { id: 4, label: 'Relatórios Exportáveis em PDF', count: 45, roadmap: true },
    { id: 5, label: 'Múltiplos Usuários (Permissions)', count: 30, roadmap: true },
  ];

  // Mock Data: Backlog
  const backlog = [
    {
      id: 'B-101',
      title: 'Integração WhatsApp API Oficial',
      score: 98,
      calls: 42,
      priority: 'Crítica',
    },
    { id: 'B-105', title: 'Melhoria UX no Onboarding', score: 85, calls: 28, priority: 'Alta' },
    { id: 'B-112', title: 'Dark Mode no App Cliente', score: 72, calls: 15, priority: 'Média' },
  ];

  // Mock Data: Competitors
  const competitors = [
    { name: 'Competidor X', context: 'Preço menor (-30%)', freq: 45, sentiment: 'negative' },
    { name: 'SaaS Y', context: 'Tem feature de chat', freq: 28, sentiment: 'neutral' },
    { name: 'Ferramenta Z', context: 'UX considerada complexa', freq: 12, sentiment: 'positive' },
  ];

  const maxFeatureCount = Math.max(...featureRequests.map((f) => f.count));

  return (
    <div className="flex min-h-screen flex-col bg-background pb-20 font-sans">
      <SalesTopbar currentSection={Section.TEMPLATE_SALES_PRODUCT} setSection={setSection} />

      <main className="mx-auto w-full max-w-[1400px] flex-1 space-y-6 p-6">
        {/* --- HEADER --- */}
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">Painel Produto</h2>
            <div className="hidden h-6 w-px bg-border md:block"></div>
            <Select
              className="w-[180px]"
              placeholder="Todos os Produtos"
              options={[
                { label: 'Todos os Produtos', value: 'all' },
                { label: 'Comunidade', value: 'community' },
                { label: 'Gestor IA', value: 'manager' },
                { label: 'Formação', value: 'course' },
                { label: 'Mastermind', value: 'master' },
              ]}
            />
          </div>

          <Tabs value={period} onValueChange={setPeriod} className="w-auto">
            <TabsList className="grid h-9 w-full grid-cols-3">
              <TabsTrigger value="30d" className="text-xs">
                30d
              </TabsTrigger>
              <TabsTrigger value="90d" className="text-xs">
                90d
              </TabsTrigger>
              <TabsTrigger value="all" className="text-xs">
                Tudo
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* --- ROW 1: METRICS --- */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="border-l-4 border-l-brand-blue bg-card shadow-sm transition-shadow hover:shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="flex justify-between text-sm font-bold uppercase tracking-widest text-muted-foreground">
                Feature Requests
                <Icon name="bulb" className="text-brand-blue" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-1 font-mono text-3xl font-bold text-foreground">142</div>
              <p
                className="truncate text-xs text-muted-foreground"
                title="Top: Integração WhatsApp"
              >
                Top: <span className="font-semibold text-foreground">Integração WhatsApp</span>
              </p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-destructive bg-card shadow-sm transition-shadow hover:shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="flex justify-between text-sm font-bold uppercase tracking-widest text-muted-foreground">
                Frustrações
                <Icon name="thumbs-down" className="text-destructive" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-1 font-mono text-3xl font-bold text-foreground">87</div>
              <p className="truncate text-xs text-muted-foreground">
                Principal:{' '}
                <span className="font-semibold text-foreground">Complexidade no Setup</span>
              </p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-brand-green bg-card shadow-sm transition-shadow hover:shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="flex justify-between text-sm font-bold uppercase tracking-widest text-muted-foreground">
                NPS Implícito (IA)
                <Icon name="thumbs-up" className="text-brand-green" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-1 font-mono text-3xl font-bold text-foreground">68</div>
              <p className="text-xs text-muted-foreground">Baseado em sentimento de 1.2k calls</p>
            </CardContent>
          </Card>

          <Card className="border-l-brand-blue border-l-4 bg-card shadow-sm transition-shadow hover:shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="flex justify-between text-sm font-bold uppercase tracking-widest text-muted-foreground">
                Gaps de Funcionalidade
                <Icon name="cube" className="text-brand-blue" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-1 font-mono text-3xl font-bold text-foreground">12</div>
              <p className="text-xs text-muted-foreground">Funcionalidades críticas ausentes</p>
            </CardContent>
          </Card>
        </div>

        {/* --- ROW 2: BACKLOG SUGERIDO (NEW) --- */}
        <Card className="border border-primary bg-gradient-to-br from-card to-primary/5 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between border-b border-border px-6 py-4">
            <div className="space-y-1">
              <CardTitle className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-foreground">
                <Icon name="magic-wand" className="text-primary" /> Backlog Sugerido pela IA
              </CardTitle>
              <p className="text-[10px] text-muted-foreground">
                Priorização baseada em volume de pedidos × impacto na receita.
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="h-8 gap-2 border-primary/30 bg-background text-primary hover:bg-primary/10"
            >
              <Icon name="download" size="size-3" /> Exportar CSV
            </Button>
          </CardHeader>
          <div className="p-0">
            <Table>
              <TableHeader className="bg-muted/10">
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="w-[80px] text-xs font-bold">ID</TableHead>
                  <TableHead className="text-xs font-bold">Funcionalidade / Melhoria</TableHead>
                  <TableHead className="w-[120px] text-xs font-bold">Prioridade</TableHead>
                  <TableHead className="w-[100px] text-center text-xs font-bold">Score</TableHead>
                  <TableHead className="w-[180px] text-right text-xs font-bold">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {backlog.map((item) => (
                  <TableRow key={item.id} className="group border-border hover:bg-muted/20">
                    <TableCell className="font-mono text-xs text-muted-foreground">
                      {item.id}
                    </TableCell>
                    <TableCell className="text-sm font-medium">
                      {item.title}
                      <span className="mt-0.5 block text-[10px] font-normal text-muted-foreground">
                        Mencionado em {item.calls} calls recentes
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          item.priority === 'Crítica'
                            ? 'destructive'
                            : item.priority === 'Alta'
                              ? 'warning'
                              : 'secondary'
                        }
                        className="h-5 px-1.5 text-[10px] font-bold uppercase"
                      >
                        {item.priority}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center font-mono text-sm font-bold text-primary">
                      {item.score}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                        <Button variant="ghost" size="sm" className="h-7 px-2 text-[10px]">
                          Ver Calls
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-7 gap-1 border-primary/30 px-2 text-[10px] text-primary hover:border-primary hover:bg-primary/10"
                        >
                          <Icon name="plus" size="size-3" /> Notion
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>

        {/* --- ROW 3: SPLIT PANELS --- */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Left: Frustrations */}
          <Card className="flex h-[500px] flex-col">
            <CardHeader className="border-b border-border px-6 py-4">
              <CardTitle className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest">
                <Icon name="thumbs-down" className="text-destructive" /> Frustrações e Atritos
              </CardTitle>
            </CardHeader>
            <div className="custom-scrollbar flex-1 overflow-y-auto p-4">
              <Accordion type="single" collapsible className="space-y-2">
                <AccordionItem
                  value="onboarding"
                  className="rounded-lg border border-border bg-card px-4"
                >
                  <AccordionTrigger className="py-3 hover:no-underline">
                    <div className="flex items-center gap-3">
                      <Badge
                        variant="destructive"
                        className="flex h-5 w-5 items-center justify-center rounded-full p-0 text-[10px]"
                      >
                        8
                      </Badge>
                      <span className="text-sm font-semibold">Onboarding / Setup Inicial</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="space-y-3 pb-4 pt-2">
                    <div className="rounded border-l-2 border-destructive bg-muted/30 p-3 font-serif text-xs italic text-muted-foreground">
                      "Achei muito confuso configurar a integração no começo, perdi 2 horas."
                    </div>
                    <div className="rounded border-l-2 border-destructive bg-muted/30 p-3 font-serif text-xs italic text-muted-foreground">
                      "Não entendi onde coloco a chave de API, o tutorial estava desatualizado."
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem
                  value="interface"
                  className="rounded-lg border border-border bg-card px-4"
                >
                  <AccordionTrigger className="py-3 hover:no-underline">
                    <div className="flex items-center gap-3">
                      <Badge
                        variant="warning"
                        className="flex h-5 w-5 items-center justify-center rounded-full p-0 text-[10px] text-black"
                      >
                        5
                      </Badge>
                      <span className="text-sm font-semibold">Interface / UX</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="space-y-3 pb-4 pt-2">
                    <div className="rounded border-l-2 border-brand-yellow bg-muted/30 p-3 font-serif text-xs italic text-muted-foreground">
                      "Muitos cliques para chegar no relatório final."
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem
                  value="performance"
                  className="rounded-lg border border-border bg-card px-4"
                >
                  <AccordionTrigger className="py-3 hover:no-underline">
                    <div className="flex items-center gap-3">
                      <Badge
                        variant="secondary"
                        className="flex h-5 w-5 items-center justify-center rounded-full p-0 text-[10px]"
                      >
                        3
                      </Badge>
                      <span className="text-sm font-semibold">Performance / Lentidão</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="space-y-3 pb-4 pt-2">
                    <div className="rounded bg-muted/30 p-3 font-serif text-xs italic text-muted-foreground">
                      "O carregamento da lista de leads demora muito quando tem mais de 1000 itens."
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </Card>

          {/* Right: Competitors */}
          <Card className="flex h-[500px] flex-col">
            <CardHeader className="border-b border-border px-6 py-4">
              <CardTitle className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest">
                <Icon name="bolt" className="text-brand-orange" /> Menções a Concorrentes
              </CardTitle>
            </CardHeader>
            <div className="flex-1 overflow-hidden p-0">
              <Table>
                <TableHeader className="bg-muted/10">
                  <TableRow className="border-border hover:bg-transparent">
                    <TableHead className="w-[120px] text-xs font-bold">Concorrente</TableHead>
                    <TableHead className="text-xs font-bold">Contexto Principal</TableHead>
                    <TableHead className="w-[60px] text-center text-xs font-bold">Freq.</TableHead>
                    <TableHead className="w-[80px] text-center text-xs font-bold">
                      Sentimento
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {competitors.map((comp, i) => (
                    <TableRow key={i} className="border-border hover:bg-muted/20">
                      <TableCell className="text-xs font-bold">{comp.name}</TableCell>
                      <TableCell className="text-xs text-muted-foreground">
                        {comp.context}
                      </TableCell>
                      <TableCell className="text-center font-mono text-xs">{comp.freq}</TableCell>
                      <TableCell className="text-center">
                        <Badge
                          variant={
                            comp.sentiment === 'negative'
                              ? 'destructive'
                              : comp.sentiment === 'positive'
                                ? 'success'
                                : 'secondary'
                          }
                          className="h-5 px-1.5 text-[9px] uppercase"
                        >
                          {comp.sentiment}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default SalesProductTemplate;

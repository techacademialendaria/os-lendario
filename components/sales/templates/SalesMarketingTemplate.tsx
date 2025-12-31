import React from 'react';
import SalesTopbar from '../SalesTopbar';
import { Section } from '../../../types';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Icon } from '../../ui/icon';
import { Badge } from '../../ui/badge';
import { ScrollArea } from '../../ui/scroll-area';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table';
import { cn } from '../../../lib/utils';

const SalesMarketingTemplate: React.FC<{ setSection: (s: Section) => void }> = ({ setSection }) => {
  // Mock Data: Objections Queue
  const objectionQueue = [
    {
      id: 1,
      objection: 'Preço alto / Budget curto',
      freq: 45,
      lastSeen: 'Hoje, 10:30',
      snippet: 'Não tenho budget pra esse quarter...',
      status: 'no_material',
    },
    {
      id: 2,
      objection: 'Já uso concorrente X',
      freq: 32,
      lastSeen: 'Ontem, 16:45',
      snippet: 'O sistema Y já faz isso por menos...',
      status: 'in_production',
    },
    {
      id: 3,
      objection: 'Preciso falar com sócio',
      freq: 28,
      lastSeen: 'Hoje, 09:15',
      snippet: 'Não decido sozinho, preciso ver...',
      status: 'published',
    },
    {
      id: 4,
      objection: 'Implantação demorada',
      freq: 15,
      lastSeen: '23 Out',
      snippet: 'Tenho medo de parar a operação...',
      status: 'no_material',
    },
  ];

  // Mock Data: Snippets
  const snippets = [
    {
      category: 'Preço',
      date: 'Hoje',
      text: 'O valor é alto demais para o que entrega hoje. Se fosse metade eu fechava.',
    },
    {
      category: 'Concorrente',
      date: 'Ontem',
      text: 'Gosto da plataforma de vocês, mas o [Concorrente] tem aquele dashboard financeiro que eu preciso.',
    },
    {
      category: 'Autoridade',
      date: '23 Out',
      text: 'Nunca ouvi falar da empresa de vocês antes. Quem mais usa?',
    },
  ];

  // Mock Data: Auto Tasks
  const tasks = [
    {
      id: 'T-102',
      task: "Criar carrossel: '5 Mitos sobre Implantação'",
      status: 'To Do',
      link: 'https://clickup.com',
    },
    {
      id: 'T-101',
      task: 'Revisar LP: Adicionar logo Microsoft na prova social',
      status: 'In Progress',
      link: 'https://clickup.com',
    },
    {
      id: 'T-099',
      task: 'Email Marketing: Case de Sucesso Varejo',
      status: 'Done',
      link: 'https://clickup.com',
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'no_material':
        return (
          <Badge variant="destructive" className="h-5 text-[10px] font-bold uppercase">
            Sem Material
          </Badge>
        );
      case 'in_production':
        return (
          <Badge variant="warning" className="h-5 text-[10px] font-bold uppercase text-black">
            Em Produção
          </Badge>
        );
      case 'published':
        return (
          <Badge variant="success" className="h-5 text-[10px] font-bold uppercase">
            Publicado
          </Badge>
        );
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background pb-20 font-sans">
      <SalesTopbar currentSection={Section.TEMPLATE_SALES_MARKETING} setSection={setSection} />

      <main className="mx-auto w-full max-w-[1400px] flex-1 space-y-6 p-6">
        {/* --- HEADER --- */}
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">Painel Marketing</h2>
            <Badge
              variant="outline"
              className="rounded-sm border-destructive/50 bg-destructive/5 px-2 font-mono text-xs text-destructive"
            >
              12 Ações Pendentes
            </Badge>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="gap-2 border-border bg-card font-mono text-xs hover:bg-muted"
          >
            <div className="bg-success h-2 w-2 animate-pulse rounded-full"></div>
            Sync ClickUp • 14:32
          </Button>
        </div>

        {/* --- ROW 1: ACTION CARDS --- */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Card 1 */}
          <Card className="border-l-4 border-l-destructive bg-card shadow-sm transition-shadow hover:shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="flex justify-between text-sm font-bold uppercase tracking-widest text-muted-foreground">
                Materiais para Criar
                <Icon name="file-plus" className="text-destructive" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-3 font-mono text-3xl font-bold text-foreground">5</div>
              <ul className="space-y-1.5 text-xs font-medium text-muted-foreground">
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-destructive"></div> Objeção Preço
                  (Carrossel)
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-destructive"></div> Comparativo
                  Competidor X
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-destructive"></div> Case Study Tech
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Card 2 */}
          <Card className="flex flex-col border-l-4 border-l-brand-orange bg-card shadow-sm transition-shadow hover:shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="flex justify-between text-sm font-bold uppercase tracking-widest text-muted-foreground">
                Campanhas para Revisar
                <Icon name="eye" className="text-brand-orange" />
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col justify-between">
              <div>
                <div className="mb-3 font-mono text-3xl font-bold text-foreground">2</div>
                <p className="font-serif text-xs leading-relaxed text-muted-foreground">
                  Insight: A campanha "Fundo de Funil" está atraindo leads que desconhecem a feature
                  de automação.
                </p>
              </div>
              <Button variant="outline" size="sm" className="mt-4 h-8 w-full text-xs">
                Ir para Campanha <Icon name="external-link" className="ml-2 size-3" />
              </Button>
            </CardContent>
          </Card>

          {/* Card 3 */}
          <Card className="border-l-4 border-l-brand-blue bg-card shadow-sm transition-shadow hover:shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="flex justify-between text-sm font-bold uppercase tracking-widest text-muted-foreground">
                Em Produção
                <Icon name="settings" className="animate-spin-slow text-brand-blue" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-3 font-mono text-3xl font-bold text-foreground">8</div>
              <div className="mb-2 h-2 w-full overflow-hidden rounded-full bg-muted/50">
                <div className="h-full w-[60%] bg-brand-blue"></div>
              </div>
              <p className="text-right text-[10px] text-muted-foreground">
                60% do sprint concluído
              </p>
            </CardContent>
          </Card>
        </div>

        {/* --- ROW 4: AUTO TASKS (MOVED UP FOR VISIBILITY AS PER REQUEST) --- */}
        <Card className="border-border">
          <CardHeader className="border-b border-border px-6 py-4">
            <CardTitle className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest">
              <Icon name="check-square" className="text-primary" /> Tasks Criadas Automaticamente
            </CardTitle>
          </CardHeader>
          <div className="p-0">
            <Table>
              <TableHeader className="bg-muted/10">
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="w-[80px] text-xs font-bold">ID</TableHead>
                  <TableHead className="text-xs font-bold">Task Criada</TableHead>
                  <TableHead className="w-[120px] text-center text-xs font-bold">Status</TableHead>
                  <TableHead className="w-[100px] text-right text-xs font-bold">Link</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tasks.map((task) => (
                  <TableRow key={task.id} className="border-border hover:bg-muted/20">
                    <TableCell className="font-mono text-xs text-muted-foreground">
                      {task.id}
                    </TableCell>
                    <TableCell className="text-sm font-medium">{task.task}</TableCell>
                    <TableCell className="text-center">
                      <Badge
                        variant="outline"
                        className={cn(
                          'h-5 border-none text-[10px]',
                          task.status === 'To Do'
                            ? 'bg-muted text-muted-foreground'
                            : task.status === 'In Progress'
                              ? 'bg-brand-blue/10 text-brand-blue'
                              : 'bg-success/10 text-success'
                        )}
                      >
                        {task.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <a href={task.link} target="_blank" rel="noopener noreferrer">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 text-muted-foreground hover:text-primary"
                        >
                          <Icon name="external-link" size="size-3" />
                        </Button>
                      </a>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>

        {/* --- ROW 2: OBJECTION QUEUE --- */}
        <Card className="overflow-hidden border-border">
          <CardHeader className="flex flex-row items-center justify-between border-b border-border bg-muted/10 px-6 py-4">
            <div className="flex items-center gap-2">
              <Icon name="check-square" className="text-primary" />
              <CardTitle className="text-sm font-bold uppercase tracking-widest">
                Fila de Objeções para Conteúdo
              </CardTitle>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" className="h-7 text-xs">
                <Icon name="sort-alt" size="size-3" className="mr-1" /> Urgência
              </Button>
            </div>
          </CardHeader>
          <Table>
            <TableHeader className="bg-background">
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-[200px] text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Objeção Principal
                </TableHead>
                <TableHead className="text-center text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Freq.
                </TableHead>
                <TableHead className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Última Vez
                </TableHead>
                <TableHead className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Exemplo (Snippet)
                </TableHead>
                <TableHead className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Status
                </TableHead>
                <TableHead className="w-[100px] text-right"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {objectionQueue.map((item) => (
                <TableRow key={item.id} className="transition-colors hover:bg-muted/20">
                  <TableCell className="text-sm font-medium">{item.objection}</TableCell>
                  <TableCell className="text-center font-mono text-xs font-bold text-foreground">
                    {item.freq}
                  </TableCell>
                  <TableCell className="font-mono text-xs text-muted-foreground">
                    {item.lastSeen}
                  </TableCell>
                  <TableCell className="border-l-2 border-border pl-3 font-serif text-xs italic text-muted-foreground">
                    "{item.snippet}"
                  </TableCell>
                  <TableCell>{getStatusBadge(item.status)}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-7 border-dashed border-border text-xs hover:border-primary hover:text-primary"
                    >
                      <Icon name="magic-wand" size="size-3" className="mr-1" /> Criar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>

        {/* --- ROW 3: SPLIT PANELS --- */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Left: Correlation */}
          <Card className="flex h-[400px] flex-col">
            <CardHeader className="border-b border-border px-6 py-4">
              <CardTitle className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest">
                <Icon name="network" className="text-brand-blue" /> Correlação Anúncio →
                Objeção
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 p-0">
              <Table>
                <TableHeader>
                  <TableRow className="border-border hover:bg-transparent">
                    <TableHead className="text-xs">Fonte (Utm)</TableHead>
                    <TableHead className="text-xs">Objeção Principal</TableHead>
                    <TableHead className="text-right text-xs">Ação Sugerida</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow className="border-border/50">
                    <TableCell className="font-mono text-xs text-brand-blue">
                      ads_facebook_c1
                    </TableCell>
                    <TableCell className="text-xs">Preço Alto</TableCell>
                    <TableCell className="text-right text-xs text-muted-foreground">
                      Reforçar valor na LP
                    </TableCell>
                  </TableRow>
                  <TableRow className="border-border/50">
                    <TableCell className="font-mono text-xs text-brand-pink">
                      instagram_bio
                    </TableCell>
                    <TableCell className="text-xs">Como Funciona?</TableCell>
                    <TableCell className="text-right text-xs text-muted-foreground">
                      Vídeo explicativo
                    </TableCell>
                  </TableRow>
                  <TableRow className="border-border/50">
                    <TableCell className="font-mono text-xs text-brand-blue">
                      linkedin_post
                    </TableCell>
                    <TableCell className="text-xs">Integração</TableCell>
                    <TableCell className="text-right text-xs text-muted-foreground">
                      Docs Técnica
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              {/* Placeholder for more data */}
              <div className="flex flex-col items-center justify-center p-8 text-center opacity-50">
                <Icon name="chart-pie" className="mb-2 text-4xl text-muted-foreground" />
                <p className="text-xs text-muted-foreground">Mais dados sendo coletados...</p>
              </div>
            </CardContent>
          </Card>

          {/* Right: Snippets Feed */}
          <Card className="flex h-[400px] flex-col">
            <CardHeader className="flex flex-row items-center justify-between border-b border-border px-6 py-4">
              <CardTitle className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest">
                <Icon name="quote-right" className="text-brand-green" /> Snippets Recentes
              </CardTitle>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <Icon name="refresh" size="size-3" />
              </Button>
            </CardHeader>
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {snippets.map((snip, i) => (
                  <div
                    key={i}
                    className="group rounded-lg border border-border bg-muted/20 p-4 transition-colors hover:border-primary/30"
                  >
                    <div className="mb-2 flex items-start justify-between">
                      <Badge variant="outline" className="h-4 bg-background px-1.5 text-[9px]">
                        {snip.category}
                      </Badge>
                      <span className="font-mono text-[10px] text-muted-foreground">
                        {snip.date}
                      </span>
                    </div>
                    <p className="mb-3 font-serif text-sm italic leading-relaxed text-foreground/90">
                      "{snip.text}"
                    </p>
                    <div className="flex gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                      <Button variant="outline" size="sm" className="h-6 px-2 text-[10px]">
                        <Icon name="copy" size="size-3" className="mr-1" /> Copiar
                      </Button>
                      <Button variant="ghost" size="sm" className="h-6 px-2 text-[10px]">
                        <Icon name="play-circle" size="size-3" className="mr-1" /> Ouvir
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default SalesMarketingTemplate;

import React, { useState } from 'react';
import SalesTopbar from '../SalesTopbar';
import { Section } from '../../../types';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Icon } from '../../ui/icon';
import { Badge } from '../../ui/badge';
import { Select } from '../../ui/select';
import { Input } from '../../ui/input';
import { Switch } from '../../ui/switch';
import { Textarea } from '../../ui/textarea';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../../ui/accordion';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';
import { cn } from '../../../lib/utils';

const SalesSettingsTemplate: React.FC<{ setSection: (s: Section) => void }> = ({ setSection }) => {
  const [activeTab, setActiveTab] = useState('integrations');

  // Mock Data: Integrations
  const integrations = [
    { name: 'Bluedot', status: 'connected', lastSync: '2 min atrás', icon: 'microphone' },
    { name: 'N8N', status: 'connected', lastSync: '15 min atrás', icon: 'network-cloud' },
    { name: 'Gemini', status: 'connected', lastSync: '5 min atrás', icon: 'sparkles' },
    { name: 'Supabase', status: 'connected', lastSync: 'Agora', icon: 'database' },
    { name: 'ActiveCampaign', status: 'error', lastSync: '2 dias atrás', icon: 'envelope' },
    { name: 'ClickUp', status: 'connected', lastSync: '1 hora atrás', icon: 'check-square' },
    { name: 'Notion', status: 'pending', lastSync: '-', icon: 'document' },
  ];

  // Mock Data: Team
  const team = [
    { name: 'Alan Nicolas', email: 'alan@legends.co', calls: 142, active: true },
    { name: 'Amanda L.', email: 'amanda@legends.co', calls: 98, active: true },
    { name: 'Roberto F.', email: 'roberto@legends.co', calls: 85, active: true },
    { name: 'Carla M.', email: 'carla@legends.co', calls: 0, active: false },
  ];

  // Mock Data: Logs
  const logs = [
    { time: '14:32:01', type: 'info', msg: 'Webhook recebido de Bluedot.' },
    { time: '14:32:05', type: 'info', msg: 'Transcrição processada. 423 tokens.' },
    { time: '14:32:10', type: 'warning', msg: 'ActiveCampaign timeout. Retrying...' },
    { time: '14:35:00', type: 'error', msg: 'Falha ao atualizar contato ID #992.' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected':
        return 'text-success border-success/20 bg-success/10';
      case 'error':
        return 'text-destructive border-destructive/20 bg-destructive/10';
      case 'pending':
        return 'text-muted-foreground border-border bg-muted/10';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background pb-20 font-sans">
      <SalesTopbar currentSection={Section.TEMPLATE_SALES_SETTINGS} setSection={setSection} />

      <main className="mx-auto w-full max-w-[1400px] flex-1 space-y-6 p-6">
        {/* --- HEADER --- */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">Configurações</h2>
            <p className="font-serif text-muted-foreground">
              Gerencie as conexões e o comportamento da IA.
            </p>
          </div>
          <div className="flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-2 shadow-sm">
            <div className="relative">
              <div className="bg-success h-3 w-3 animate-pulse rounded-full"></div>
            </div>
            <div className="text-sm">
              <p className="font-bold leading-none">Sistema Operacional</p>
              <p className="text-[10px] text-muted-foreground">Uptime: 99.9%</p>
            </div>
          </div>
        </div>

        {/* --- MAIN TABS --- */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="h-auto w-full justify-start overflow-x-auto border border-border bg-card p-1">
            <TabsTrigger value="integrations" className="gap-2">
              {' '}
              <Icon name="plug" size="size-4" /> Integrações
            </TabsTrigger>
            <TabsTrigger value="ai" className="gap-2">
              {' '}
              <Icon name="brain" size="size-4" /> Classificação & Prompts
            </TabsTrigger>
            <TabsTrigger value="distribution" className="gap-2">
              {' '}
              <Icon name="share" size="size-4" /> Distribuição
            </TabsTrigger>
            <TabsTrigger value="team" className="gap-2">
              {' '}
              <Icon name="users-alt" size="size-4" /> Time
            </TabsTrigger>
            <TabsTrigger value="objections" className="gap-2">
              {' '}
              <Icon name="shield" size="size-4" /> Categorias
            </TabsTrigger>
            <TabsTrigger value="logs" className="gap-2">
              {' '}
              <Icon name="terminal" size="size-4" /> Logs
            </TabsTrigger>
          </TabsList>

          {/* 1. INTEGRATIONS */}
          <TabsContent value="integrations" className="animate-fade-in">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {integrations.map((app, i) => (
                <Card key={i} className="flex flex-col justify-between">
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                          <Icon name={app.icon} size="size-5" />
                        </div>
                        <CardTitle className="text-base">{app.name}</CardTitle>
                      </div>
                      <Badge
                        variant="outline"
                        className={cn(
                          'font-mono text-[10px] capitalize',
                          getStatusColor(app.status)
                        )}
                      >
                        {app.status === 'connected'
                          ? 'Conectado'
                          : app.status === 'error'
                            ? 'Erro'
                            : 'Pendente'}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4 font-mono text-xs text-muted-foreground">
                      Última sync: {app.lastSync}
                    </p>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="h-8 w-full text-xs">
                        Testar
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-full text-xs text-muted-foreground hover:text-foreground"
                      >
                        Reconfigurar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* 2. AI & PROMPTS */}
          <TabsContent value="ai" className="animate-fade-in space-y-6">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              <div className="space-y-6 lg:col-span-2">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">Prompt do Analista</CardTitle>
                      <Select
                        className="h-8 w-[140px] text-xs"
                        options={[
                          { label: 'Gemini 1.5 Pro', value: 'gemini' },
                          { label: 'GPT-4 Turbo', value: 'gpt4' },
                          { label: 'Claude 3.5 Sonnet', value: 'claude' },
                        ]}
                        value="gemini"
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Textarea
                      className="h-96 resize-none bg-muted/20 font-mono text-xs leading-relaxed"
                      defaultValue={`You are an expert Sales Analyst AI. Your goal is to extract key insights from sales calls.

Output Format: JSON
{
  "summary": "3 sentences summary",
  "sentiment": "positive" | "neutral" | "negative",
  "score": 0-100,
  "objections": [
    { "type": "price", "snippet": "..." }
  ],
  "next_steps": ["..."]
}

Constraints:
- Be concise.
- Focus on commercial intent.
- Ignore small talk.`}
                    />
                    <div className="flex justify-between">
                      <Button variant="outline" size="sm">
                        <Icon name="refresh" className="mr-2 size-3" /> Restaurar Padrão
                      </Button>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Icon name="play" className="mr-2 size-3" /> Testar com Exemplo
                        </Button>
                        <Button size="sm">Salvar Alterações</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Métricas do Modelo</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Precisão Estimada</span>
                      <span className="text-success font-bold">94.2%</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Custo Médio / Call</span>
                      <span className="font-mono">R$ 0,12</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Latência Média</span>
                      <span className="font-mono">4.2s</span>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Histórico de Versões</CardTitle>
                  </CardHeader>
                  <div className="px-2">
                    <Accordion type="single" collapsible className="w-full">
                      {[1, 2, 3].map((v) => (
                        <AccordionItem key={v} value={`v${v}`} className="border-border">
                          <AccordionTrigger className="rounded px-2 py-2 text-xs hover:bg-muted/50">
                            <div className="flex w-full justify-between pr-4">
                              <span>v1.{5 - v} (Atual)</span>
                              <span className="font-mono text-muted-foreground">24 Out</span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="px-2 text-xs text-muted-foreground">
                            Alteração no prompt de objeções para capturar nuances de preço.
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* 3. AUTOMATIC DISTRIBUTION */}
          <TabsContent value="distribution" className="animate-fade-in">
            <Card>
              <CardHeader>
                <CardTitle>Regras de Distribuição</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 divide-y divide-border">
                {/* ActiveCampaign */}
                <div className="flex items-start justify-between pt-6 first:pt-0">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Icon name="envelope" className="text-primary" />
                      <h4 className="text-sm font-bold">ActiveCampaign</h4>
                    </div>
                    <p className="max-w-md text-xs text-muted-foreground">
                      Atualiza campos personalizados do contato e adiciona tags baseadas no status
                      da call.
                    </p>
                    <div className="mt-2 inline-block rounded border border-border bg-muted/30 p-2 font-mono text-xs">
                      Campos: ai_score, ai_summary, last_call_sentiment
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>

                {/* ClickUp */}
                <div className="flex items-start justify-between pt-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Icon name="check-square" className="text-brand-blue" />
                      <h4 className="text-sm font-bold">ClickUp</h4>
                    </div>
                    <p className="max-w-md text-xs text-muted-foreground">
                      Cria tarefas automáticas para o time de marketing quando "Objeção de Conteúdo"
                      é detectada.
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-xs">Lista de Destino:</span>
                      <Select
                        className="h-7 w-[180px] text-xs"
                        options={[{ label: 'Marketing / Conteúdo', value: 'mkt' }]}
                        value="mkt"
                      />
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>

                {/* Notion */}
                <div className="flex items-start justify-between pt-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Icon name="document" className="text-foreground" />
                      <h4 className="text-sm font-bold">Notion</h4>
                    </div>
                    <p className="max-w-md text-xs text-muted-foreground">
                      Salva o resumo e transcrição em uma base de conhecimento.
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-xs">Database:</span>
                      <Select
                        className="h-7 w-[180px] text-xs"
                        options={[{ label: 'Sales Calls Knowledge', value: 'db' }]}
                        value="db"
                      />
                    </div>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 4. SALES TEAM */}
          <TabsContent value="team" className="animate-fade-in">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Consultores Ativos</CardTitle>
                <Button size="sm" className="gap-2">
                  <Icon name="plus" size="size-3" /> Adicionar Consultor
                </Button>
              </CardHeader>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Consultor</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Calls (Mês)</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {team.map((member, i) => (
                    <TableRow key={i}>
                      <TableCell className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={`https://i.pravatar.cc/150?u=${i}`} />
                          <AvatarFallback>{member.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium">{member.name}</span>
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">
                        {member.email}
                      </TableCell>
                      <TableCell className="font-mono text-sm">{member.calls}</TableCell>
                      <TableCell>
                        <Switch checked={member.active} />
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Icon name="pencil" size="size-3" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

          {/* 5. CATEGORIES (Drag n Drop Sim) */}
          <TabsContent value="objections" className="animate-fade-in">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Categorias de Objeção</CardTitle>
                <Button size="sm" variant="outline" className="gap-2">
                  <Icon name="plus" size="size-3" /> Nova Categoria
                </Button>
              </CardHeader>
              <CardContent className="space-y-2">
                {[
                  { name: 'Preço / Budget', desc: 'Cliente acha caro ou não tem verba.' },
                  { name: 'Concorrência', desc: 'Cliente cita competidor direto.' },
                  { name: 'Autoridade / Confiança', desc: 'Cliente não conhece a marca.' },
                  { name: 'Timing', desc: 'Cliente quer deixar para depois.' },
                  { name: 'Decisor', desc: 'Precisa falar com sócio/diretor.' },
                ].map((cat, i) => (
                  <div
                    key={i}
                    className="group flex items-center gap-4 rounded-lg border border-border bg-card p-3 transition-colors hover:border-primary/50"
                  >
                    <Icon
                      name="menu-burger"
                      className="cursor-grab text-muted-foreground opacity-50 hover:opacity-100"
                      size="size-4"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-bold">{cat.name}</p>
                      <p className="text-xs text-muted-foreground">{cat.desc}</p>
                    </div>
                    <div className="flex gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Icon name="pencil" size="size-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:text-destructive"
                      >
                        <Icon name="trash" size="size-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* 6. LOGS */}
          <TabsContent value="logs" className="animate-fade-in">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between py-4">
                <div className="flex gap-2">
                  <Badge variant="outline" className="cursor-pointer bg-muted">
                    All
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer hover:bg-muted">
                    Info
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer hover:bg-muted">
                    Warning
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer hover:bg-muted">
                    Error
                  </Badge>
                </div>
                <Button variant="ghost" size="sm" className="h-8 gap-2">
                  <Icon name="download" size="size-3" /> Exportar CSV
                </Button>
              </CardHeader>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[150px]">Timestamp</TableHead>
                    <TableHead className="w-[100px]">Tipo</TableHead>
                    <TableHead>Mensagem</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {logs.map((log, i) => (
                    <TableRow key={i} className="font-mono text-xs">
                      <TableCell className="text-muted-foreground">{log.time}</TableCell>
                      <TableCell>
                        <span
                          className={cn(
                            'font-bold uppercase',
                            log.type === 'info'
                              ? 'text-blue-400'
                              : log.type === 'warning'
                                ? 'text-yellow-400'
                                : 'text-red-400'
                          )}
                        >
                          {log.type}
                        </span>
                      </TableCell>
                      <TableCell>{log.msg}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default SalesSettingsTemplate;

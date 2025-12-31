import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../ui/card';
import { Badge } from '../ui/badge';
import { Icon } from '../ui/icon';
import { Symbol } from '../ui/symbol';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

const ToneSlider: React.FC<{ left: string; right: string; value: number; description: string }> = ({
  left,
  right,
  value,
  description,
}) => (
  <div className="space-y-2">
    <div className="flex justify-between font-sans text-sm font-semibold">
      <span>{left}</span>
      <span>{right}</span>
    </div>
    <div className="relative h-2 overflow-hidden rounded-full bg-muted">
      <div
        className="absolute bottom-0 top-0 -mt-0.5 h-3 w-3 -translate-x-1/2 transform rounded-full bg-primary shadow-md"
        style={{ left: `${(value / 10) * 100}%` }}
      />
      <div
        className="absolute bottom-0 left-0 top-0 bg-primary/20"
        style={{ width: `${(value / 10) * 100}%` }}
      />
    </div>
    <p className="text-center font-sans text-xs font-medium italic text-muted-foreground">
      {description}
    </p>
  </div>
);

const IdentitySection: React.FC = () => {
  return (
    <div className="animate-fade-in space-y-16">
      {/* HEADER v2.0 */}
      <div className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-card to-muted p-6 md:p-10">
        <div className="mb-4 flex items-center justify-between">
          <Badge variant="outline" className="bg-background/50 backdrop-blur-sm">
            FIVU v2.0
          </Badge>
          <span className="font-mono text-xs text-muted-foreground">Corpus: 15.832 palavras</span>
        </div>
        <h2 className="mb-4 font-sans text-3xl font-bold tracking-tight md:text-5xl">
          Identidade Verbal <span className="text-primary">Universal</span>
        </h2>
        <p className="max-w-3xl font-sans text-lg font-medium leading-relaxed text-muted-foreground md:text-xl">
          A voz da <strong className="text-foreground">Academia Lendár[IA]</strong>. Um framework
          vivo para comunicação institucional, fundamentado em documentos culturais, manifestos e
          princípios de liderança.
        </p>
        <div className="relative z-10 mt-8 flex flex-col gap-4 sm:flex-row">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <Icon name="user" className="text-primary" /> Founder: Alan Nicolas
          </div>
          <div className="flex items-center gap-2 text-sm font-semibold">
            <Icon name="calendar" className="text-primary" /> Desde: 15/01/2020
          </div>
        </div>
        <Icon
          name="fingerprint"
          className="absolute -bottom-8 -right-8 rotate-12 text-[8rem] text-primary/5 md:text-[12rem]"
        />
      </div>

      {/* 1. CORE IDENTITY */}
      <section className="space-y-8">
        <h3 className="flex items-center gap-2 border-b border-border pb-2 font-sans text-2xl font-semibold">
          <Icon name="diamond" /> 1. Núcleo Identitário
        </h3>

        {/* Mission / Vision / Positioning Cards - CHANGED: md:grid-cols-2 -> lg:grid-cols-3 */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <Card className="relative overflow-hidden border-none bg-primary text-primary-foreground">
            <div className="absolute -bottom-4 -right-4 rotate-12 opacity-10">
              <Icon name="target" className="text-9xl" />
            </div>
            <CardHeader>
              <CardTitle className="relative z-10 flex items-center gap-2 text-lg">
                <Icon name="target" /> Missão
              </CardTitle>
            </CardHeader>
            <CardContent className="relative z-10">
              <p className="font-sans text-lg font-medium leading-relaxed">
                "Unir e potencializar pessoas lendárias com IA para construírem soluções e negócios
                que <strong>imortalizam seu legado</strong>."
              </p>
            </CardContent>
          </Card>
          <Card className="relative overflow-hidden">
            <div className="absolute -bottom-4 -right-4 rotate-12 opacity-5">
              <Icon name="eye" className="text-9xl" />
            </div>
            <CardHeader>
              <CardTitle className="relative z-10 flex items-center gap-2 text-lg">
                <Icon name="eye" /> Visão
              </CardTitle>
            </CardHeader>
            <CardContent className="relative z-10">
              <p className="font-sans font-medium text-muted-foreground">
                Ser referência global em educação de IA generativa aplicada a negócios, com um
                portfólio de startups de sucesso internacional.
              </p>
            </CardContent>
          </Card>
          <Card className="relative overflow-hidden">
            <div className="absolute -bottom-4 -right-4 rotate-12 opacity-5">
              <Icon name="map-marker" className="text-9xl" />
            </div>
            <CardHeader>
              <CardTitle className="relative z-10 flex items-center gap-2 text-lg">
                <Icon name="map-marker" /> Posicionamento
              </CardTitle>
            </CardHeader>
            <CardContent className="relative z-10">
              <p className="font-sans font-medium text-muted-foreground">
                Somos um ecossistema de educação & inovação que potencializa pessoas e negócios com
                inteligência artificial generativa.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Archetypes with Hero Style Icons - CHANGED: md:grid-cols-3 to lg:grid-cols-3 */}
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Rebelde */}
          <div className="group relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-card to-primary/5 p-8 transition-all duration-300 hover:border-primary hover:shadow-lg">
            <div className="absolute -bottom-12 -right-12 rotate-12 text-[10rem] text-primary/10 transition-all duration-500 group-hover:rotate-6 group-hover:scale-110">
              <Icon name="flame" />
            </div>
            <div className="relative z-10 flex h-full flex-col justify-between">
              <div className="mb-6">
                <div className="mb-2 flex items-center justify-between">
                  <h4 className="font-sans text-3xl font-bold text-foreground">Rebelde</h4>
                  <Icon name="flame" className="text-primary md:hidden" size="size-6" />
                </div>
                <span className="inline-block rounded border border-primary/20 bg-primary/10 px-2 py-1 text-xs font-bold uppercase tracking-widest text-primary">
                  Arquétipo Primário
                </span>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="mb-1 text-xs font-semibold uppercase text-muted-foreground">
                    Motivação
                  </p>
                  <p className="text-sm font-medium leading-snug">
                    Desafiar o status quo e recusar a mediocridade.
                  </p>
                </div>
                <div>
                  <p className="mb-1 text-xs font-semibold uppercase text-muted-foreground">
                    Manifestação
                  </p>
                  <p className="font-serif text-sm italic leading-snug text-muted-foreground">
                    "Enquanto muitos os chamam de loucos, nós os reconhecemos como gênios."
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Mago */}
          <div className="group relative overflow-hidden rounded-2xl border border-brand-indigo/20 bg-gradient-to-br from-card to-brand-indigo/5 p-8 transition-all duration-300 hover:border-brand-indigo hover:shadow-lg">
            <div className="absolute -bottom-12 -right-12 rotate-12 text-[10rem] text-brand-indigo/10 transition-all duration-500 group-hover:rotate-6 group-hover:scale-110">
              <Icon name="magic-wand" />
            </div>
            <div className="relative z-10 flex h-full flex-col justify-between">
              <div className="mb-6">
                <div className="mb-2 flex items-center justify-between">
                  <h4 className="font-sans text-3xl font-bold text-foreground">Mago</h4>
                  <Icon name="magic-wand" className="text-brand-indigo md:hidden" size="size-6" />
                </div>
                <span className="inline-block rounded border border-brand-indigo/20 bg-brand-indigo/10 px-2 py-1 text-xs font-bold uppercase tracking-widest text-brand-indigo">
                  Arquétipo Secundário
                </span>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="mb-1 text-xs font-semibold uppercase text-muted-foreground">
                    Motivação
                  </p>
                  <p className="text-sm font-medium leading-snug">
                    Transformar realidade e conhecimento em revolução.
                  </p>
                </div>
                <div>
                  <p className="mb-1 text-xs font-semibold uppercase text-muted-foreground">
                    Manifestação
                  </p>
                  <p className="font-serif text-sm italic leading-snug text-muted-foreground">
                    "Alquimistas do conhecimento, arquitetos do impossível."
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sábio */}
          <div className="group relative overflow-hidden rounded-2xl border border-brand-blue/20 bg-gradient-to-br from-card to-brand-blue/5 p-8 transition-all duration-300 hover:border-brand-blue hover:shadow-lg">
            <div className="absolute -bottom-12 -right-12 rotate-12 text-[10rem] text-brand-blue/10 transition-all duration-500 group-hover:rotate-6 group-hover:scale-110">
              <Icon name="book-alt" />
            </div>
            <div className="relative z-10 flex h-full flex-col justify-between">
              <div className="mb-6">
                <div className="mb-2 flex items-center justify-between">
                  <h4 className="font-sans text-3xl font-bold text-foreground">Sábio</h4>
                  <Icon name="book-alt" className="text-brand-blue md:hidden" size="size-6" />
                </div>
                <span className="inline-block rounded border border-brand-blue/20 bg-brand-blue/10 px-2 py-1 text-xs font-bold uppercase tracking-widest text-brand-blue">
                  Arquétipo Terciário
                </span>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="mb-1 text-xs font-semibold uppercase text-muted-foreground">
                    Motivação
                  </p>
                  <p className="text-sm font-medium leading-snug">
                    Buscar a verdade através da transparência radical.
                  </p>
                </div>
                <div>
                  <p className="mb-1 text-xs font-semibold uppercase text-muted-foreground">
                    Manifestação
                  </p>
                  <p className="font-serif text-sm italic leading-snug text-muted-foreground">
                    "Contexto, não controle. Verdade, bondade e utilidade."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PHILOSOPHY & VALUES */}
      <section className="space-y-8">
        <h3 className="flex items-center gap-2 border-b border-border pb-2 font-sans text-2xl font-semibold">
          <Icon name="columns" /> 2. Filosofia & Valores
        </h3>

        <Tabs defaultValue="beliefs" className="w-full">
          <TabsList className="mb-6 h-auto flex-wrap gap-2">
            <TabsTrigger value="beliefs" className="min-w-[140px] flex-1">
              Crenças Fundamentais
            </TabsTrigger>
            <TabsTrigger value="enemies" className="min-w-[140px] flex-1">
              Inimigos Conceituais
            </TabsTrigger>
            <TabsTrigger value="allies" className="min-w-[140px] flex-1">
              Aliados Conceituais
            </TabsTrigger>
          </TabsList>

          <TabsContent value="beliefs">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              {[
                'Pessoas acima de processos',
                'Liberdade com responsabilidade',
                'Excelência sem desculpas',
                'AI First',
                'Beneficiar a humanidade',
                'Contexto, não controle',
                '8 ou 80',
                'Ser antes de Ter',
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 rounded-lg border border-border bg-card p-4"
                >
                  <Badge variant="outline" className="mt-0.5">
                    {i + 1}
                  </Badge>
                  <span className="text-sm font-semibold">{item}</span>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="enemies">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              {[
                'Mediocridade',
                'Microgerenciamento',
                'Reuniões improdutivas',
                'Perfeccionismo paralisante',
                'Zona de conforto',
                'Burocracia',
                'Fofoca e politicagem',
                'Resistência à IA',
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 rounded-lg border border-destructive/20 bg-destructive/5 p-4 text-destructive"
                >
                  <Icon name="cross-circle" size="size-4" />
                  <span className="text-sm font-semibold">{item}</span>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="allies">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {[
                'Inovação constante',
                'Transparência radical',
                'Neurodivergência',
                'Generosidade e gratidão',
                'Zona de genialidade',
                'Comunicação assíncrona',
                'Mentalidade de abundância',
                'Fail fast, learn faster',
                'Círculos de mastermind',
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-success/5 border-success/20 text-success-foreground flex items-center gap-3 rounded-lg border p-4"
                >
                  <Icon name="check-circle" size="size-4" />
                  <span className="text-sm font-semibold">{item}</span>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* 3. LIDERANÇA & TIME (New) */}
      <section className="space-y-8">
        <h3 className="flex items-center gap-2 border-b border-border pb-2 font-sans text-2xl font-semibold">
          <Icon name="users-alt" /> 3. Pessoas & Cultura
        </h3>

        <div className="grid grid-cols-1 gap-12 xl:grid-cols-2">
          {/* LIDERANÇA */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h4 className="flex items-center gap-2 text-xl font-bold">
                <Icon name="crown" className="text-primary" /> 15 Atributos do Líder
              </h4>
              <Badge variant="outline">Sobre Nossos Líderes</Badge>
            </div>
            <div className="custom-scrollbar h-[500px] space-y-3 overflow-y-auto pr-2">
              {[
                {
                  title: 'Amplificam o Coletivo',
                  desc: 'Iluminam o brilho da equipe, ego inversamente proporcional ao sucesso.',
                },
                {
                  title: 'Alquimistas de Desafios',
                  desc: 'Transformam problemas em oportunidades.',
                },
                {
                  title: 'Celebram Publicamente',
                  desc: 'Transformam conquistas em lendas inspiradoras.',
                },
                {
                  title: 'Nutrem Discretamente',
                  desc: 'Abordam desafios individuais com delicadeza.',
                },
                { title: 'Elevam o Padrão', desc: 'Buscam talentos que os desafiem e superem.' },
                {
                  title: 'Priorizam o Ecossistema',
                  desc: 'Removem elementos tóxicos, mesmo que produtivos.',
                },
                {
                  title: 'Donos da Narrativa',
                  desc: 'Assumem total responsabilidade por resultados.',
                },
                { title: 'Inspiram, Não Intimidam', desc: 'Metas como faróis de possibilidades.' },
                { title: 'Celebram Overachievers', desc: 'Extraordinário vira novo padrão.' },
                { title: 'Impacto Transformador', desc: 'Sucesso medido pela revolução causada.' },
                {
                  title: 'Lideram pelo Exemplo',
                  desc: 'Pavimentam o caminho com ações extraordinárias.',
                },
                {
                  title: 'Catalisam Inovação Disruptiva',
                  desc: 'Ideias ousadas esperadas e celebradas.',
                },
                {
                  title: 'Cultivam Autonomia Responsável',
                  desc: 'Empoderam com confiança, esperam resultados.',
                },
                { title: 'Mestres da Adaptabilidade', desc: 'Navegam mudanças com graça e visão.' },
                {
                  title: 'Pensamento Exponencial',
                  desc: 'Saltos quânticos, não melhorias incrementais.',
                },
              ].map((attr, i) => (
                <div
                  key={i}
                  className="group rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary/50"
                >
                  <p className="text-sm font-bold text-foreground transition-colors group-hover:text-primary">
                    {i + 1}. {attr.title}
                  </p>
                  <p className="mt-1 font-sans text-xs font-medium text-muted-foreground">
                    {attr.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* TIME */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h4 className="flex items-center gap-2 text-xl font-bold">
                <Icon name="shield-check" className="text-primary" /> 8 Virtudes do Time
              </h4>
              <Badge variant="outline">Sobre Nosso Time</Badge>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {[
                { title: 'Curiosidade Insaciável', icon: 'search' },
                { title: 'Resiliência de Titã', icon: 'shield' },
                { title: 'Altruísmo Revolucionário', icon: 'heart' },
                { title: 'Bom Senso Visionário', icon: 'bulb' },
                { title: 'Sinceridade Radical', icon: 'comment-alt' },
                { title: 'Criatividade Disruptiva', icon: 'rocket' },
                { title: 'Coragem Épica', icon: 'shield-check' },
                { title: 'Autonomia Responsável', icon: 'badge-check' },
              ].map((virtue, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center gap-3 rounded-lg border border-border bg-card p-4 text-center transition-colors hover:bg-muted/50"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Icon name={virtue.icon} size="size-5" />
                  </div>
                  <span className="text-sm font-bold">{virtue.title}</span>
                </div>
              ))}
            </div>

            {/* Tensions summary */}
            <div className="mt-6 rounded-xl border border-dashed border-border bg-muted/20 p-6">
              <h5 className="mb-4 text-sm font-bold uppercase tracking-wider text-muted-foreground">
                Tensões Produtivas
              </h5>
              <div className="space-y-2 font-sans text-sm font-medium">
                <div className="flex justify-between border-b border-border/50 pb-1">
                  <span>Liberdade total</span> <span>Responsabilidade absoluta</span>
                </div>
                <div className="flex justify-between border-b border-border/50 pb-1">
                  <span>Sonhar grande</span> <span>Começar pequeno</span>
                </div>
                <div className="flex justify-between border-b border-border/50 pb-1">
                  <span>8 ou 80</span> <span>Líquidos no aprender</span>
                </div>
                <div className="flex justify-between pb-1">
                  <span>Celebrar publicamente</span> <span>Nutrir discretamente</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. VOCABULARY & EXPRESSION */}
      <section className="space-y-8">
        <h3 className="flex items-center gap-2 border-b border-border pb-2 font-sans text-2xl font-semibold">
          <Icon name="quote-left" /> 4. Expressão & Vocabulário
        </h3>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Tones with Registers */}
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Matriz de Tons (Registros)</CardTitle>
                <CardDescription>Adaptação por contexto</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <p className="mb-2 flex items-center gap-2 text-sm font-bold">
                    <Icon name="megaphone" size="size-3" /> Formal-Inspirador (Manifesto)
                  </p>
                  <p className="border-l-2 border-primary pl-3 font-serif text-xs italic text-muted-foreground">
                    "Este é um chamado aos inconformados. Àqueles que desafiam as tradições. Estes
                    são os lendários."
                  </p>
                </div>
                <div>
                  <p className="mb-2 flex items-center gap-2 text-sm font-bold">
                    <Icon name="briefcase" size="size-3" /> Profissional-Direto (Interno)
                  </p>
                  <p className="border-l-2 border-primary pl-3 font-serif text-xs italic text-muted-foreground">
                    "Líderes erram rápido, barato e diferente. Cultura lendária é inegociável."
                  </p>
                </div>
                <div>
                  <p className="mb-2 flex items-center gap-2 text-sm font-bold">
                    <Icon name="bolt" size="size-3" /> Informal-Intenso (Chat)
                  </p>
                  <p className="border-l-2 border-primary pl-3 font-serif text-xs italic text-muted-foreground">
                    "Usa IA, porra! Antes de contratar, pergunta: dá pra automatizar isso?"
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4 rounded-xl border border-border bg-card p-6">
              <h4 className="font-bold">Dimensões de Voz</h4>
              <ToneSlider left="Engraçado" right="Sério" value={4} description="Sério com leveza" />
              <ToneSlider
                left="Casual"
                right="Formal"
                value={4}
                description="Casual-profissional"
              />
              <ToneSlider
                left="Irreverente"
                right="Respeitoso"
                value={6}
                description="Rebelde fundamentado"
              />
              <ToneSlider
                left="Inspirador"
                right="Factual"
                value={8}
                description="Épico e convocatório"
              />
            </div>
          </div>

          {/* Vocabulary Table & Metaphors */}
          <div className="space-y-8">
            <div className="overflow-hidden rounded-xl border border-border bg-card">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead>Termo (Proprietário)</TableHead>
                    <TableHead className="text-right text-destructive">Nunca Usar</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-bold text-primary">Lendário/a</TableCell>
                    <TableCell className="text-right text-muted-foreground line-through decoration-destructive">
                      Usuário, Cliente
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-bold text-primary">AI First</TableCell>
                    <TableCell className="text-right text-muted-foreground line-through decoration-destructive">
                      Automatização
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-bold text-primary">Forjando lendas</TableCell>
                    <TableCell className="text-right text-muted-foreground line-through decoration-destructive">
                      Construindo equipes
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-bold text-primary">
                      Catalisadores de grandeza
                    </TableCell>
                    <TableCell className="text-right text-muted-foreground line-through decoration-destructive">
                      Bons gestores
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-bold text-primary">Imortalizar seu legado</TableCell>
                    <TableCell className="text-right text-muted-foreground line-through decoration-destructive">
                      Ter sucesso
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            <Card className="border-primary/20 bg-primary/5">
              <CardHeader>
                <CardTitle className="text-base">Metáforas Recorrentes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 font-serif text-sm italic text-muted-foreground">
                <p>• "Não apontam o caminho; eles o pavimentam"</p>
                <p>• "Dança na chuva de desafios"</p>
                <p>• "Vulnerabilidade é sua armadura"</p>
                <p>• "Metas como faróis de possibilidades"</p>
                <p>• "Saltos quânticos, não melhorias incrementais"</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 5. ORGANISMOS (Templates) */}
      <section className="space-y-8">
        <h3 className="flex items-center gap-2 border-b border-border pb-2 font-sans text-2xl font-semibold">
          <Icon name="layout-fluid" /> 5. Organismos (Templates)
        </h3>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-xl border border-border bg-card p-6">
            <Badge className="mb-2">Manifesto</Badge>
            <p className="font-sans text-sm font-medium leading-relaxed text-muted-foreground">
              [CONTEXTO] Por 200 mil anos, fomos reféns da biologia... <br />
              [CHAMADO] Este é um chamado aos inconformados... <br />
              [DEFINIÇÃO] Estes são os lendários. <br />
              [FECHAMENTO] Movimento Lendário. Construindo o infinito, hoje.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card p-6">
            <Badge className="mb-2">Princípio</Badge>
            <p className="font-sans text-sm font-medium leading-relaxed text-muted-foreground">
              [DEFINIÇÃO] Somos "a Apple das IAs"... <br />
              [EXPLICAÇÃO] Lembre-se: excelência ≠ perfeccionismo. <br />
              [PERGUNTAS-GUIA] Fiz meu melhor no tempo que eu tive? <br />
              [AÇÃO] Erre muito, mas sempre rápido.
            </p>
          </div>
        </div>
      </section>

      {/* 6. MARKETING AUTÊNTICO (NEW) */}
      <section className="space-y-12 border-t-2 border-primary/20 pt-12">
        {/* Header */}
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row">
          <div>
            <h3 className="mb-2 flex items-center gap-3 font-sans text-3xl font-bold">
              <Icon name="megaphone" className="text-primary" size="size-8" /> 6. Marketing
              Autêntico
            </h3>
            <p className="font-serif text-xl italic text-muted-foreground">
              "Vender sem esforço e sem mentir."
            </p>
          </div>
          <Badge variant="outline" className="border-primary py-1 text-sm text-primary">
            Filosofia Central
          </Badge>
        </div>

        {/* Definition - The "Manifesto" */}
        <div className="relative overflow-hidden rounded-xl bg-foreground p-8 text-background shadow-2xl md:p-12">
          <Icon
            name="flame"
            className="absolute -bottom-10 -right-10 rotate-12 text-[12rem] text-primary/10"
          />
          <div className="relative z-10 space-y-8">
            <h4 className="font-sans text-3xl font-bold text-primary">A Definição</h4>
            <div className="max-w-4xl space-y-6 font-serif text-lg leading-relaxed opacity-90 md:text-xl">
              <p>
                Marketing Autêntico é o único tipo de marketing que{' '}
                <strong className="rounded bg-primary/10 px-1 text-primary">
                  não reserva um lugar para você no inferno
                </strong>
                ; ele se dedica a impulsionar mensagens autênticas e transparentes.
              </p>
              <p className="font-sans text-base text-background/70">
                Enquanto outros se escondem atrás de fachadas brilhantes e promessas vazias, criando
                um mundo superficial cheio de pessoas frustradas, o Marketing Autêntico se ergue
                como um farol de integridade.
              </p>
              <div className="border-l-4 border-primary pl-6 italic text-primary-foreground">
                "Não é apenas uma estratégia; é uma revolução ética. Um chamado para rejeitarmos o
                que é superficial e abraçarmos o que é autêntico e humano."
              </div>
            </div>
          </div>
        </div>

        {/* Characteristics - Grid - CHANGED: md:grid-cols-2 -> lg:grid-cols-5 */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
          {[
            {
              title: 'Transparência',
              icon: 'eye',
              desc: 'Abertura total sobre práticas e origens.',
            },
            {
              title: 'Autenticidade',
              icon: 'fingerprint',
              desc: 'Comunicação honesta, sem falsas promessas.',
            },
            { title: 'Valor Real', icon: 'diamond', desc: 'Foco no cliente, não apenas na venda.' },
            {
              title: 'Engajamento',
              icon: 'users-alt',
              desc: 'Criar comunidade, não apenas base de clientes.',
            },
            { title: 'Responsabilidade', icon: 'globe', desc: 'Compromisso ético e sustentável.' },
          ].map((item, i) => (
            <div
              key={i}
              className="group rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/50"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary transition-transform group-hover:scale-110">
                <Icon name={item.icon} size="size-5" />
              </div>
              <h5 className="mb-2 text-sm font-bold">{item.title}</h5>
              <p className="font-sans text-xs font-medium leading-snug text-muted-foreground">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Values & Application - Split View */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <Card className="border-brand-blue/20 bg-brand-blue/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-brand-blue">
                <Icon name="refresh" /> Alinhamento de Valores
              </CardTitle>
              <CardDescription>Como nossa filosofia se conecta com quem somos.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  val: 'Consciência & Sabedoria',
                  desc: 'Abordagem consciente e emocionalmente inteligente.',
                },
                {
                  val: 'Evolução (Progresso)',
                  desc: 'Melhoria contínua da marca e da experiência.',
                },
                { val: 'Coerência', desc: 'Alinhamento total entre a promessa e a entrega.' },
                { val: 'Clareza', desc: 'Comunicação direta é um pilar fundamental.' },
                { val: 'Simplicidade', desc: 'Mensagens simples, mas profundas e eficazes.' },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 rounded-lg border border-brand-blue/10 bg-background/50 p-3"
                >
                  <Badge variant="outline" className="mt-0.5 border-brand-blue text-brand-blue">
                    {i + 1}
                  </Badge>
                  <div>
                    <span className="block text-sm font-bold text-foreground">{item.val}</span>
                    <span className="font-sans text-xs font-medium text-muted-foreground">
                      {item.desc}
                    </span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-brand-green/20 bg-brand-green/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-brand-green">
                <Icon name="rocket" /> Aplicações Práticas
              </CardTitle>
              <CardDescription>Transformando filosofia em ação diária.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="flex items-center gap-4 rounded-lg border border-brand-green/10 bg-background p-4">
                <div className="shrink-0 rounded-full bg-brand-green/10 p-3 text-brand-green">
                  <Icon name="book-alt" />
                </div>
                <div>
                  <h5 className="text-sm font-bold">Storytelling Alinhado</h5>
                  <p className="font-sans text-xs font-medium text-muted-foreground">
                    Sua missão de vida traduzida no negócio.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 rounded-lg border border-brand-green/10 bg-background p-4">
                <div className="shrink-0 rounded-full bg-brand-green/10 p-3 text-brand-green">
                  <Icon name="share" />
                </div>
                <div>
                  <h5 className="text-sm font-bold">Big Picture Content</h5>
                  <p className="font-sans text-xs font-medium text-muted-foreground">
                    Estratégias que educam usando suas zonas de genialidade.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 rounded-lg border border-brand-green/10 bg-background p-4">
                <div className="shrink-0 rounded-full bg-brand-green/10 p-3 text-brand-green">
                  <Icon name="comment-alt" />
                </div>
                <div>
                  <h5 className="text-sm font-bold">Comunidade de Valor</h5>
                  <p className="font-sans text-xs font-medium text-muted-foreground">
                    Um espaço onde as pessoas se sentem realizadas.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* QUICK REF CARD */}
      <section className="border-t border-border pt-8">
        <div className="relative mx-auto max-w-3xl overflow-hidden rounded-xl bg-foreground p-8 text-background shadow-2xl">
          <div className="absolute right-0 top-0 p-4 opacity-10">
            <Symbol name="infinity" className="text-9xl" />
          </div>

          <div className="relative z-10 space-y-6">
            <div className="flex items-center justify-between border-b border-white/20 pb-4">
              <h3 className="flex items-center gap-2 font-sans text-xl font-bold tracking-wider">
                <Symbol name="infinity" /> LENDÁR[IA] QUICK REF v2.0
              </h3>
              <Badge variant="outline" className="border-background text-background">
                Institucional
              </Badge>
            </div>

            <div className="grid grid-cols-1 gap-8 text-sm sm:grid-cols-2">
              <div>
                <p className="mb-2 font-bold text-primary">MISSÃO</p>
                <p className="font-sans font-medium leading-relaxed opacity-80">
                  Unir e potencializar pessoas lendárias com IA para imortalizar seu legado.
                </p>
              </div>
              <div>
                <p className="mb-2 font-bold text-primary">ARQUÉTIPOS</p>
                <p className="font-sans font-medium opacity-80">Rebelde + Mago + Sábio</p>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-bold text-primary">MANDAMENTOS DA COMUNICAÇÃO</p>
              <ul className="grid grid-cols-1 gap-x-4 space-y-1 font-sans text-sm font-medium opacity-80 sm:grid-cols-2">
                <li className="flex gap-2">
                  <span>□</span> Usar "nós" e vocabulário proprietário
                </li>
                <li className="flex gap-2">
                  <span>□</span> Contrastar Lendário vs Medíocre
                </li>
                <li className="flex gap-2">
                  <span>□</span> Incluir chamada à ação clara
                </li>
                <li className="flex gap-2">
                  <span>□</span> Eliminar linguagem corporativa
                </li>
                <li className="flex gap-2">
                  <span>□</span> Elevar o tom (transformar "time" em "panteão")
                </li>
                <li className="flex gap-2">
                  <span>□</span> Inspirar sem ser vazio
                </li>
              </ul>
            </div>

            <div className="space-y-2 border-t border-white/20 pt-4 text-center">
              <p className="font-sans text-lg font-bold italic">"Construindo o infinito, hoje."</p>
              <p className="font-sans text-sm opacity-50">"Shaping Infinity, Today. ♾️"</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default IdentitySection;

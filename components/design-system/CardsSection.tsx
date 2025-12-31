import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Icon } from '../ui/icon';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Carousel, CarouselItem } from '../ui/carousel';

const CardsSection: React.FC = () => {
  return (
    <div className="animate-fade-in space-y-16">
      <div>
        <h2 className="mb-4 font-serif text-4xl font-light">Cards & Contêineres</h2>
        <p className="max-w-2xl font-serif text-lg leading-relaxed text-muted-foreground">
          Superfícies versáteis para agrupar conteúdo. Explore variações de estrutura, mídia e
          interatividade.
        </p>
      </div>

      {/* --- GRUPO 1: BÁSICOS --- */}
      <section className="space-y-8">
        <h3 className="border-b border-border pb-2 font-sans text-xl font-semibold">
          Estruturas Básicas
        </h3>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Body Only (Simulated) */}
          <Card>
            <CardHeader>
              <CardTitle>Título do Card</CardTitle>
              <CardDescription>SUBTÍTULO</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="font-serif text-sm text-muted-foreground">
                Exemplo de texto rápido para compor o conteúdo principal do card. Estrutura limpa
                focada em leitura.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="link" className="px-0">
                Link de Ação <Icon name="angle-small-right" />
              </Button>
            </CardFooter>
          </Card>

          {/* With Heading Feature */}
          <Card>
            <div className="border-b border-border bg-muted/20 px-6 py-3">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Destaque
              </span>
            </div>
            <CardHeader>
              <CardTitle>Título Especial</CardTitle>
              <CardDescription>SUBTÍTULO</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="font-serif text-sm text-muted-foreground">
                Este card possui um cabeçalho dedicado para categorização ou metadados antes do
                conteúdo principal.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="link" className="px-0">
                Ver Detalhes <Icon name="angle-small-right" />
              </Button>
            </CardFooter>
          </Card>

          {/* With Complex Footer */}
          <Card>
            <CardHeader>
              <CardTitle>Atualizações</CardTitle>
              <CardDescription>STATUS DO SISTEMA</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="font-serif text-sm text-muted-foreground">
                Conteúdo que requer uma validação temporal ou informação de rodapé contextual.
              </p>
            </CardContent>
            <CardFooter className="mt-auto border-t border-border bg-muted/10">
              <p className="w-full text-center text-xs text-muted-foreground">
                Última atualização: 5 min atrás
              </p>
            </CardFooter>
          </Card>
        </div>
      </section>

      {/* --- GRUPO 2: MÍDIA --- */}
      <section className="space-y-8">
        <h3 className="border-b border-border pb-2 font-sans text-xl font-semibold">
          Imagens & Mídia
        </h3>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Image Cap (Top) */}
          <Card className="overflow-hidden">
            <div className="h-48 w-full bg-muted">
              <img
                src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop"
                alt="Cyberpunk"
                className="h-full w-full object-cover"
              />
            </div>
            <CardHeader>
              <CardTitle>Image Cap</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                A imagem ocupa toda a largura superior, ideal para posts de blog ou vitrines de
                produtos.
              </p>
            </CardContent>
            <CardFooter>
              <p className="text-xs text-muted-foreground">Atualizado há pouco</p>
            </CardFooter>
          </Card>

          {/* Image Inside Body */}
          <Card>
            <CardContent className="pt-6">
              <div className="mb-4 h-40 w-full overflow-hidden rounded-md bg-muted">
                <img
                  src="https://images.unsplash.com/photo-1614728263952-84ea256f9679?q=80&w=1000&auto=format&fit=crop"
                  alt="Abstract"
                  className="h-full w-full object-cover"
                />
              </div>
              <CardTitle className="mb-2">Image Inside</CardTitle>
              <p className="font-serif text-sm text-muted-foreground">
                A imagem respeita o padding do card, criando uma moldura natural. Estilo comum em
                feeds de notícias.
              </p>
            </CardContent>
            <CardFooter>
              <p className="text-xs text-muted-foreground">Postado hoje</p>
            </CardFooter>
          </Card>

          {/* Horizontal / Row Layout */}
          <Card className="flex flex-row overflow-hidden md:col-span-2 lg:col-span-1">
            <div className="w-1/3 shrink-0 bg-muted">
              <img
                src="https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1000&auto=format&fit=crop"
                alt="Side"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex flex-col justify-center p-4">
              <h4 className="mb-1 text-lg font-bold">Horizontal</h4>
              <p className="mb-3 font-serif text-xs text-muted-foreground">
                Layout lateral para listas.
              </p>
              <Button size="sm" variant="outline" className="h-8 w-fit text-xs">
                Ver
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* --- CAROUSEL (NEW) --- */}
      <section className="space-y-8">
        <h3 className="border-b border-border pb-2 font-sans text-xl font-semibold">
          Carrossel de Conteúdo
        </h3>
        <p className="font-serif text-sm text-muted-foreground">
          Utilizado para navegação horizontal de cards ou imagens.
        </p>

        <Carousel>
          {Array.from({ length: 5 }).map((_, i) => (
            <CarouselItem key={i}>
              <Card className="h-full">
                <div className="flex h-32 items-center justify-center rounded-t-xl bg-muted/30">
                  <Icon name="image" className="text-muted-foreground opacity-30" size="size-8" />
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">Curso Destaque {i + 1}</CardTitle>
                  <CardDescription>Módulo Intensivo</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="font-serif text-sm text-muted-foreground">
                    Aprenda as técnicas avançadas de IA para escalar seus resultados.
                  </p>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </Carousel>
      </section>

      {/* --- GRUPO 3: INTERATIVO & UTILITÁRIO --- */}
      <section className="space-y-8">
        <h3 className="border-b border-border pb-2 font-sans text-xl font-semibold">
          Interativo & Utilitário
        </h3>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Button Actions */}
          <Card>
            <div className="h-32 bg-gradient-to-r from-brand-blue to-brand-cyan"></div>
            <CardHeader>
              <CardTitle>Ações Principais</CardTitle>
              <CardDescription>CTA CARD</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="font-serif text-sm text-muted-foreground">
                Focado em conversão. O footer contém botões de alta prioridade.
              </p>
            </CardContent>
            <CardFooter className="gap-2">
              <Button>Confirmar</Button>
              <Button variant="ghost">Cancelar</Button>
            </CardFooter>
          </Card>

          {/* Alert Inside */}
          <Card>
            <CardHeader>
              <span className="text-xs font-bold uppercase text-muted-foreground">Notificação</span>
              <CardTitle>Card com Alerta</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert variant="warning">
                <Icon name="exclamation" size="size-4" />
                <AlertTitle>Atenção</AlertTitle>
                <AlertDescription>Sua assinatura expira em 3 dias.</AlertDescription>
              </Alert>
              <p className="font-serif text-sm text-muted-foreground">
                Utilize alertas dentro de cards para destacar informações contextuais sem bloquear o
                fluxo.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="link" className="px-0">
                Renovar Agora
              </Button>
            </CardFooter>
          </Card>

          {/* Navigation Tabs */}
          <Card className="md:col-span-2 lg:col-span-1">
            <Tabs defaultValue="account">
              <div className="border-b border-border px-6 pt-4">
                <TabsList className="h-auto w-full justify-start bg-transparent p-0">
                  <TabsTrigger
                    value="account"
                    className="mr-4 rounded-none border-b-2 border-transparent px-0 pb-2 data-[state=active]:border-primary data-[state=active]:bg-transparent"
                  >
                    Conta
                  </TabsTrigger>
                  <TabsTrigger
                    value="security"
                    className="rounded-none border-b-2 border-transparent px-0 pb-2 data-[state=active]:border-primary data-[state=active]:bg-transparent"
                  >
                    Segurança
                  </TabsTrigger>
                </TabsList>
              </div>
              <CardContent className="pt-6">
                <TabsContent value="account" className="mt-0 animate-fade-in space-y-2">
                  <h4 className="text-sm font-bold">Dados da Conta</h4>
                  <p className="font-serif text-xs text-muted-foreground">
                    Gerencie seus dados públicos aqui.
                  </p>
                  <Button size="sm" className="mt-2">
                    Editar Perfil
                  </Button>
                </TabsContent>
                <TabsContent value="security" className="mt-0 animate-fade-in space-y-2">
                  <h4 className="text-sm font-bold">Senha e Acesso</h4>
                  <p className="font-serif text-xs text-muted-foreground">
                    Autenticação de dois fatores.
                  </p>
                  <Button size="sm" variant="outline" className="mt-2">
                    Alterar Senha
                  </Button>
                </TabsContent>
              </CardContent>
            </Tabs>
          </Card>
        </div>
      </section>

      {/* --- GRUPO 4: ESTADOS ESPECIAIS --- */}
      <section className="space-y-8">
        <h3 className="border-b border-border pb-2 font-sans text-xl font-semibold">
          Estados & Variações
        </h3>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {/* Centered Body */}
          <Card className="flex flex-col items-center justify-center p-6 text-center">
            <CardHeader>
              <CardTitle>Centralizado</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-serif text-sm text-muted-foreground">
                Texto de apoio centralizado para leads ou anúncios breves.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="link">
                Saiba Mais <Icon name="angle-small-right" />
              </Button>
            </CardFooter>
          </Card>

          {/* Empty State */}
          <Card className="flex flex-col items-center justify-center border-dashed p-8 text-center">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
              <Icon name="box-open" size="size-6" />
            </div>
            <h4 className="mb-1 text-lg font-bold">Sem Dados</h4>
            <p className="mb-4 font-serif text-xs text-muted-foreground">
              Nenhum registro encontrado nesta categoria.
            </p>
            <Button size="sm" variant="outline">
              Adicionar Novo
            </Button>
          </Card>

          {/* Top Bordered */}
          <Card className="border-t-4 border-t-brand-blue">
            <CardHeader>
              <CardTitle>Top Bordered</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-serif text-sm text-muted-foreground">
                Borda colorida no topo para indicar status ou categoria (ex: Azul para Info).
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="link" className="px-0 text-brand-blue">
                Detalhes
              </Button>
            </CardFooter>
          </Card>

          {/* Scrollable Body */}
          <Card>
            <CardHeader>
              <CardTitle>Scrollable</CardTitle>
            </CardHeader>
            <div className="custom-scrollbar h-[150px] overflow-y-auto border-y border-border bg-muted/5 px-6">
              <div className="space-y-2 py-4 font-serif text-sm text-muted-foreground">
                <p>Este é um card com corpo rolável.</p>
                <p>
                  Ideal para termos de uso, logs ou listas longas que não devem quebrar o layout.
                </p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                <p>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                <p>Ut enim ad minim veniam, quis nostrud exercitation.</p>
                <p>Duis aute irure dolor in reprehenderit.</p>
              </div>
            </div>
            <CardFooter className="pt-4">
              <Button size="sm" className="w-full">
                Aceitar Termos
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>

      {/* --- GUIDELINES --- */}
      <section className="space-y-8 border-t border-border pt-12">
        <h3 className="flex items-center gap-2 font-sans text-2xl font-semibold">
          <Icon name="check-circle" /> Diretrizes de Cards
        </h3>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* DO'S */}
          <Card className="border-brand-green/20 bg-brand-green/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-brand-green">
                <Icon name="check" /> O que fazer (Do)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col gap-1">
                <span className="text-sm font-bold text-foreground">Conteúdo Agrupado</span>
                <p className="text-xs text-muted-foreground">
                  Use Cards para agrupar informações relacionadas que devem ser consumidas como uma
                  unidade única.
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm font-bold text-foreground">Ações Claras</span>
                <p className="text-xs text-muted-foreground">
                  Coloque botões e links no rodapé (CardFooter) para separar a ação do conteúdo.
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm font-bold text-foreground">Imagens Otimizadas</span>
                <p className="text-xs text-muted-foreground">
                  Em layouts de grade, garanta que as imagens tenham a mesma proporção (aspect
                  ratio).
                </p>
              </div>
            </CardContent>
          </Card>

          {/* DON'TS */}
          <Card className="border-destructive/20 bg-destructive/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-destructive">
                <Icon name="cross" /> O que não fazer (Don't)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col gap-1">
                <span className="text-sm font-bold text-destructive">Sobrecarga</span>
                <p className="text-xs text-muted-foreground">
                  Evite colocar conteúdo demais em um único card. Se necessário, use um link "Ver
                  Mais" ou expanda em um modal.
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm font-bold text-destructive">Ninhamento Excessivo</span>
                <p className="text-xs text-muted-foreground">
                  Evite colocar Cards dentro de Cards, a menos que visualmente distintos (ex:
                  backgrounds diferentes).
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm font-bold text-destructive">Alturas Inconsistentes</span>
                <p className="text-xs text-muted-foreground">
                  Em grids, tente alinhar a altura dos cards para evitar espaços em branco estranhos
                  (use flex-grow ou grid).
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default CardsSection;

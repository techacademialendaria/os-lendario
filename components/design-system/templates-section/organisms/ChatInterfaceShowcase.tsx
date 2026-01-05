/**
 * ChatInterfaceShowcase - Lendario GPT chat interface template demo
 */

import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Icon } from '@/components/ui/icon';
import { Symbol } from '@/components/ui/symbol';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { StreamingText } from '@/components/ui/streaming-text';

export const ChatInterfaceShowcase: React.FC = () => {
  return (
    <div className="flex h-[700px] w-full overflow-hidden rounded-xl border border-border bg-background shadow-2xl">
      {/* Sidebar (Chat History) */}
      <div className="hidden w-64 flex-col border-r border-border bg-muted/20 md:flex">
        <div className="border-b border-border p-4">
          <Button className="w-full justify-start gap-2" variant="outline">
            <Icon name="plus" size="size-4" /> Novo Chat
          </Button>
        </div>

        <ScrollArea className="flex-1 px-3 py-4">
          <div className="space-y-6">
            <div>
              <h4 className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Hoje
              </h4>
              <div className="space-y-1">
                <Button
                  variant="ghost"
                  className="w-full justify-start truncate bg-accent/50 text-sm font-normal text-accent-foreground"
                >
                  Estrategia de Marketing Q3
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start truncate text-sm font-normal"
                >
                  Ideias para Youtube
                </Button>
              </div>
            </div>
            <div>
              <h4 className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Ontem
              </h4>
              <div className="space-y-1">
                <Button
                  variant="ghost"
                  className="w-full justify-start truncate text-sm font-normal"
                >
                  Revisao de Copy de Vendas
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start truncate text-sm font-normal"
                >
                  Analise de Dados CSV
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start truncate text-sm font-normal"
                >
                  Traducao PT-EN
                </Button>
              </div>
            </div>
          </div>
        </ScrollArea>

        <div className="border-t border-border p-4">
          <div className="flex items-center gap-3">
            <Avatar size="sm">
              <AvatarFallback>AN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col overflow-hidden">
              <span className="truncate text-sm font-bold">Alan Nicolas</span>
              <span className="truncate text-xs text-muted-foreground">Pro Plan</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex flex-1 flex-col bg-card">
        {/* Header */}
        <header className="sticky top-0 z-10 flex h-14 items-center justify-between border-b border-border bg-background/50 px-6 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <span className="font-sans font-bold">Lendario GPT 4.0</span>
            <Badge
              variant="outline"
              className="h-5 border-primary/50 bg-primary/5 text-[10px] text-primary"
            >
              Beta
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Icon name="share" />
            </Button>
            <Button variant="ghost" size="icon">
              <Icon name="settings" />
            </Button>
          </div>
        </header>

        {/* Messages Area */}
        <ScrollArea className="flex-1 p-6">
          <div className="mx-auto max-w-3xl space-y-8">
            {/* User Message */}
            <div className="flex flex-row-reverse gap-4">
              <Avatar className="mt-1 h-8 w-8">
                <AvatarFallback>AN</AvatarFallback>
              </Avatar>
              <div className="max-w-[80%] rounded-2xl rounded-tr-sm bg-muted px-5 py-3 text-foreground">
                <p className="text-sm">
                  Crie uma estrutura de landing page focada em conversao para um curso de IA
                  Generativa.
                </p>
              </div>
            </div>

            {/* AI Message */}
            <div className="flex gap-4">
              <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full border border-primary/20 bg-primary/10 text-primary">
                <Symbol name="infinity" className="text-sm" />
              </div>
              <div className="max-w-[90%] space-y-4">
                <div className="prose dark:prose-invert font-serif text-sm leading-relaxed text-muted-foreground">
                  <div className="mb-4">
                    <StreamingText
                      text="Com certeza. Para uma landing page de alta conversao no nicho de IA, precisamos focar em autoridade e clareza. Aqui esta uma estrutura sugerida:"
                      speed={15}
                    />
                  </div>

                  <div className="my-4 overflow-hidden rounded-lg border border-border bg-background">
                    <div className="border-b border-border bg-muted/50 px-4 py-2 font-mono text-xs font-bold text-muted-foreground">
                      Estrutura da LP
                    </div>
                    <div className="space-y-2 p-4 font-mono text-xs">
                      <p>1. HERO SECTION: Headline Forte + VSL + CTA</p>
                      <p>2. PROBLEMA: "Voce vai ser substituido?"</p>
                      <p>3. SOLUCAO: O metodo "Lendario AI"</p>
                      <p>4. AUTORIDADE: Quem e o professor?</p>
                      <p>5. PROVA SOCIAL: Depoimentos</p>
                      <p>6. GARANTIA & FAQ</p>
                    </div>
                  </div>

                  <p>Gostaria que eu detalhasse a copy da Hero Section?</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="h-8 text-xs">
                    <Icon name="copy" className="mr-2 size-3" /> Copiar
                  </Button>
                  <Button variant="outline" size="sm" className="h-8 text-xs">
                    <Icon name="refresh" className="mr-2 size-3" /> Regenerar
                  </Button>
                </div>
              </div>
            </div>

            {/* User Message 2 */}
            <div className="flex flex-row-reverse gap-4">
              <Avatar className="mt-1 h-8 w-8">
                <AvatarFallback>AN</AvatarFallback>
              </Avatar>
              <div className="max-w-[80%] rounded-2xl rounded-tr-sm bg-muted px-5 py-3 text-foreground">
                <p className="text-sm">Sim, por favor. Use um tom "Rebelde" e inspirador.</p>
              </div>
            </div>

            {/* AI Thinking */}
            <div className="flex gap-4 opacity-70">
              <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full border border-primary/20 bg-primary/10 text-primary">
                <Symbol name="infinity" className="animate-pulse text-sm" />
              </div>
              <div className="mt-2 flex items-center gap-2">
                <span
                  className="h-2 w-2 animate-bounce rounded-full bg-primary"
                  style={{ animationDelay: '0s' }}
                ></span>
                <span
                  className="h-2 w-2 animate-bounce rounded-full bg-primary"
                  style={{ animationDelay: '0.2s' }}
                ></span>
                <span
                  className="h-2 w-2 animate-bounce rounded-full bg-primary"
                  style={{ animationDelay: '0.4s' }}
                ></span>
              </div>
            </div>
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="border-t border-border bg-background p-4">
          <div className="relative mx-auto max-w-3xl">
            <div className="absolute left-3 top-3 flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-foreground"
              >
                <Icon name="clip" />
              </Button>
            </div>
            <textarea
              className="max-h-[200px] min-h-[50px] w-full resize-none rounded-xl border border-input bg-muted/30 py-3 pl-12 pr-12 text-sm transition-all focus:bg-background focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="Envie uma mensagem para a IA..."
              rows={1}
            />
            <div className="absolute right-2 top-2">
              <Button size="icon" className="h-8 w-8 rounded-lg">
                <Icon name="arrow-right" size="size-4" />
              </Button>
            </div>
          </div>
          <p className="mt-2 text-center text-[10px] text-muted-foreground opacity-70">
            A IA pode cometer erros. Considere verificar informacoes importantes.
          </p>
        </div>
      </div>
    </div>
  );
};

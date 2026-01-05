/**
 * AccordionSectionView
 * Design System - Accordion/Collapsible Elements Showcase
 */

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';

export function AccordionSectionView() {
  return (
    <section className="space-y-12 border-t border-border pt-12">
      <div className="flex items-end justify-between">
        <h3 className="font-sans text-2xl font-semibold">Elementos Colapsiveis (Accordion)</h3>
        <Badge variant="secondary">FAQ & Modulos</Badge>
      </div>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        {/* FAQ Style */}
        <Card>
          <CardHeader>
            <CardTitle>Perguntas Frequentes</CardTitle>
            <CardDescription>Estilo padrao para FAQs.</CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>O que e a Academia Lendaria?</AccordionTrigger>
                <AccordionContent>
                  E um ecossistema de educacao focado em unir Inteligencia Artificial Generativa com
                  mentalidade de alta performance para criar negocios e carreiras a prova de futuro.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Posso acessar offline?</AccordionTrigger>
                <AccordionContent>
                  Sim, atraves do nosso aplicativo mobile voce pode baixar aulas para assistir quando
                  estiver sem conexao.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Qual a politica de reembolso?</AccordionTrigger>
                <AccordionContent>
                  Oferecemos garantia incondicional de 7 dias. Se nao ficar satisfeito, devolvemos
                  100% do seu investimento.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        {/* Course Module Style */}
        <Card>
          <CardHeader>
            <CardTitle>Estrutura de Curso</CardTitle>
            <CardDescription>Estilo para modulos de aula.</CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="space-y-2">
              <AccordionItem
                value="mod-1"
                className="rounded-lg border border-b border-border px-4"
              >
                <AccordionTrigger className="py-3 hover:no-underline">
                  <div className="flex flex-col items-start text-left">
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      Modulo 01
                    </span>
                    <span>Fundamentos da IA</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2 pt-2">
                    <div className="flex cursor-pointer items-center gap-3 rounded p-2 hover:bg-muted">
                      <Icon name="play-circle" size="size-4" className="text-primary" />
                      <span>Aula 1: O que e LLM?</span>
                    </div>
                    <div className="flex cursor-pointer items-center gap-3 rounded p-2 hover:bg-muted">
                      <Icon name="play-circle" size="size-4" className="text-primary" />
                      <span>Aula 2: Engenharia de Prompt</span>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem
                value="mod-2"
                className="rounded-lg border border-b border-border px-4"
              >
                <AccordionTrigger className="py-3 hover:no-underline">
                  <div className="flex flex-col items-start text-left">
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      Modulo 02
                    </span>
                    <span>Aplicacoes de Negocio</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2 pt-2">
                    <div className="flex cursor-pointer items-center gap-3 rounded p-2 hover:bg-muted">
                      <Icon name="lock" size="size-4" className="text-muted-foreground" />
                      <span className="text-muted-foreground">Conteudo Bloqueado</span>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

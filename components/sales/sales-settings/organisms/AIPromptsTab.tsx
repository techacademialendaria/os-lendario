import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Select } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { AI_PROMPT_DEFAULT, MODEL_OPTIONS } from '../data';

export const AIPromptsTab: React.FC = () => {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <div className="space-y-6 lg:col-span-2">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Prompt do Analista</CardTitle>
              <Select
                className="h-8 w-[140px] text-xs"
                options={MODEL_OPTIONS}
                value="gemini"
              />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              className="h-96 resize-none bg-muted/20 font-mono text-xs leading-relaxed"
              defaultValue={AI_PROMPT_DEFAULT}
            />
            <div className="flex justify-between">
              <Button variant="outline" size="sm">
                <Icon name="refresh" className="mr-2 size-3" /> Restaurar Padrao
              </Button>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Icon name="play" className="mr-2 size-3" /> Testar com Exemplo
                </Button>
                <Button size="sm">Salvar Alteracoes</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Metricas do Modelo</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Precisao Estimada</span>
              <span className="text-success font-bold">94.2%</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Custo Medio / Call</span>
              <span className="font-mono">R$ 0,12</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Latencia Media</span>
              <span className="font-mono">4.2s</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Historico de Versoes</CardTitle>
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
                    Alteracao no prompt de objecoes para capturar nuances de preco.
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </Card>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Button } from '../../../ui/button';
import { Icon } from '../../../ui/icon';
import { Badge } from '../../../ui/badge';
import { Label } from '../../../ui/label';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from '../../../ui/sheet';

export const SheetSection: React.FC = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  return (
    <section className="space-y-8 border-t border-border pt-8">
      <h3 className="flex items-center gap-2 border-b border-border pb-2 font-sans text-xl font-semibold">
        <Icon name="layout-fluid" /> Paineis Laterais (Sheets)
      </h3>
      <p className="font-serif text-sm text-muted-foreground">
        Use Sheets para visualizar detalhes profundos, editar configuracoes complexas ou filtros,
        sem perder o contexto da pagina principal.
      </p>

      <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-border bg-muted/10 p-8">
        <Button onClick={() => setIsSheetOpen(true)} className="gap-2">
          <Icon name="menu-burger" size="size-4" /> Abrir Detalhes do Prompt
        </Button>
        <p className="text-xs text-muted-foreground">Clica para ver o comportamento do drawer.</p>
      </div>

      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Detalhes da Execucao</SheetTitle>
            <SheetDescription>ID: #8392-AX - Criado em 24 Out, 14:30</SheetDescription>
          </SheetHeader>
          <div className="flex-1 space-y-6 overflow-y-auto py-6">
            <div className="space-y-2">
              <Label>Input do Usuario</Label>
              <div className="rounded-md bg-muted p-3 font-mono text-sm text-muted-foreground">
                "Crie uma estrategia de marketing para uma marca de cafe premium focada em
                sustentabilidade."
              </div>
            </div>
            <div className="space-y-2">
              <Label>Configuracao do Modelo</Label>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded border border-border p-2 text-xs">
                  <span className="block text-muted-foreground">Temperatura</span>
                  <span className="font-bold">0.7</span>
                </div>
                <div className="rounded border border-border p-2 text-xs">
                  <span className="block text-muted-foreground">Tokens</span>
                  <span className="font-bold">2048</span>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Tags</Label>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">Marketing</Badge>
                <Badge variant="outline">Copywriting</Badge>
                <Badge variant="success">Sucesso</Badge>
              </div>
            </div>
          </div>
          <SheetFooter>
            <Button variant="outline" onClick={() => setIsSheetOpen(false)}>
              Fechar
            </Button>
            <Button onClick={() => setIsSheetOpen(false)}>Re-executar</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </section>
  );
};

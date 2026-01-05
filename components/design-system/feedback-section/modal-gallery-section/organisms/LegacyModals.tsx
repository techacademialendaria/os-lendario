import React from 'react';
import { Button } from '../../../../ui/button';
import { Icon } from '../../../../ui/icon';
import { Label } from '../../../../ui/label';
import { Input } from '../../../../ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '../../../../ui/dialog';
import { useToast } from '../../../../../hooks/use-toast';
import type { LegacyModalState, LegacyModalId } from '../types';

interface LegacyModalsProps {
  state: LegacyModalState;
  onClose: (id: LegacyModalId) => void;
}

export const LegacyModals: React.FC<LegacyModalsProps> = ({ state, onClose }) => {
  const { toast } = useToast();

  return (
    <>
      {/* Standard Modal (Terms) */}
      <Dialog open={state.terms} onOpenChange={() => onClose('terms')}>
        <DialogContent onClose={() => onClose('terms')}>
          <DialogHeader>
            <DialogTitle>Atualizacao de Contrato</DialogTitle>
            <DialogDescription>
              Novas clausulas foram adicionadas aos termos de uso da IA. Por favor, revise antes de
              continuar.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="max-h-40 overflow-y-auto rounded-md border border-border bg-muted/30 p-4 font-serif text-sm text-muted-foreground">
              <p className="mb-2">1. O uso de IA generativa implica responsabilidade etica...</p>
              <p className="mb-2">
                2. Dados sensiveis nao devem ser compartilhados sem anonimizacao...
              </p>
              <p>3. A Academia Lendaria reserva-se o direito de auditoria...</p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => onClose('terms')}>
              Cancelar
            </Button>
            <Button onClick={() => onClose('terms')}>Aceitar Termos</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Form Modal (Edit Profile) */}
      <Dialog open={state.form} onOpenChange={() => onClose('form')}>
        <DialogContent onClose={() => onClose('form')} className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Editar Perfil</DialogTitle>
            <DialogDescription>
              Faca alteracoes no seu perfil publico aqui. Clique em salvar quando terminar.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Nome
              </Label>
              <Input id="name" defaultValue="Alan Nicolas" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Username
              </Label>
              <Input id="username" defaultValue="@alannicolas" className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => onClose('form')}>
              Cancelar
            </Button>
            <Button
              type="submit"
              onClick={() => {
                onClose('form');
                toast({
                  title: 'Perfil Atualizado',
                  description: 'Suas alteracoes foram salvas.',
                  variant: 'success',
                });
              }}
            >
              Salvar Alteracoes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Success Modal */}
      <Dialog open={state.success} onOpenChange={() => onClose('success')}>
        <DialogContent
          onClose={() => onClose('success')}
          className="text-center sm:max-w-sm"
        >
          <div className="mx-auto mb-4 flex h-16 w-16 animate-accordion-down items-center justify-center rounded-full bg-success/10">
            <Icon name="check" className="text-success" size="size-8" />
          </div>
          <DialogHeader className="text-center sm:text-center">
            <DialogTitle className="text-xl">Projeto Criado!</DialogTitle>
            <DialogDescription>
              Seu novo projeto de IA foi inicializado com sucesso e esta pronto para configuracao.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-6 sm:justify-center">
            <Button className="w-full" onClick={() => onClose('success')}>
              Ir para o Dashboard
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Destructive Modal */}
      <Dialog open={state.destructive} onOpenChange={() => onClose('destructive')}>
        <DialogContent onClose={() => onClose('destructive')}>
          <DialogHeader>
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20">
              <Icon name="exclamation" className="text-red-600" size="size-6" />
            </div>
            <DialogTitle className="text-center">Deletar Projeto?</DialogTitle>
            <DialogDescription className="text-center">
              Esta acao nao pode ser desfeita. Todos os prompts e historicos associados serao
              perdidos permanentemente.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-center">
            <Button variant="outline" onClick={() => onClose('destructive')}>
              Manter Projeto
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                onClose('destructive');
                toast({
                  title: 'Projeto Deletado',
                  description: 'O projeto foi removido permanentemente.',
                  variant: 'destructive',
                });
              }}
            >
              Sim, Deletar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

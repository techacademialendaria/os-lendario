import React from 'react';
import { Button } from '../../../../ui/button';
import { Icon } from '../../../../ui/icon';
import { Label } from '../../../../ui/label';
import { Switch } from '../../../../ui/switch';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '../../../../ui/dialog';
import { useToast } from '../../../../../hooks/use-toast';
import { notificationToggles, paymentDetails } from '../../data';
import type { ModalGalleryState, GalleryModalId } from '../types';

interface GalleryModalsProps {
  state: ModalGalleryState;
  onClose: (id: GalleryModalId) => void;
}

export const GalleryModals: React.FC<GalleryModalsProps> = ({ state, onClose }) => {
  const { toast } = useToast();

  return (
    <>
      {/* Cookie Modal */}
      <Dialog open={state.cookie} onOpenChange={() => onClose('cookie')}>
        <DialogContent onClose={() => onClose('cookie')} className="text-center sm:max-w-sm">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-muted/50 text-4xl">
            Cookie
          </div>
          <DialogHeader className="text-center sm:text-center">
            <DialogTitle className="text-xl">Usamos Cookies!</DialogTitle>
            <DialogDescription>
              Para melhorar sua experiencia lendaria, utilizamos cookies. Voce aceita?
            </DialogDescription>
          </DialogHeader>
          <div className="mt-6 flex flex-row gap-3">
            <Button variant="ghost" className="flex-1" onClick={() => onClose('cookie')}>
              Politica
            </Button>
            <Button className="flex-1" onClick={() => onClose('cookie')}>
              Aceitar Tudo
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Image Top Modal */}
      <Dialog open={state.image} onOpenChange={() => onClose('image')}>
        <DialogContent
          onClose={() => onClose('image')}
          className="overflow-hidden border-0 p-0 shadow-2xl sm:max-w-sm"
        >
          <div className="relative h-48 w-full bg-[url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center">
            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onClose('image')}
              className="absolute right-4 top-4 h-8 w-8 rounded-full bg-black/20 p-0 text-white backdrop-blur-sm hover:bg-black/40 hover:text-white"
            >
              <Icon name="cross" size="size-3" />
            </Button>
          </div>
          <div className="p-6 pt-2">
            <DialogHeader className="text-left sm:text-left">
              <div className="mb-2 flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-primary">
                  Novo Recurso
                </span>
              </div>
              <DialogTitle className="text-2xl">Colaboracao em Tempo Real</DialogTitle>
              <DialogDescription className="mt-2">
                Agora voce pode convidar seu time para editar prompts simultaneamente. Aumente a
                produtividade da sua equipe.
              </DialogDescription>
            </DialogHeader>
            <div className="mt-8 flex items-center justify-between">
              <Button
                variant="link"
                className="px-0 text-muted-foreground"
                onClick={() => onClose('image')}
              >
                Pular
              </Button>
              <Button onClick={() => onClose('image')}>Explorar Agora</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Notification Settings Modal */}
      <Dialog open={state.notification} onOpenChange={() => onClose('notification')}>
        <DialogContent onClose={() => onClose('notification')} className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Notificacoes</DialogTitle>
            <DialogDescription>Gerencie como voce recebe alertas do sistema.</DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            {notificationToggles.map((toggle) => (
              <div key={toggle.id} className="flex items-center justify-between space-x-4">
                <div className="flex flex-col space-y-1">
                  <Label htmlFor={toggle.id} className="text-sm font-medium leading-none">
                    {toggle.label}
                  </Label>
                  <span className="text-xs text-muted-foreground">{toggle.description}</span>
                </div>
                <Switch id={toggle.id} defaultChecked={toggle.defaultChecked} />
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => onClose('notification')}>
              Cancelar
            </Button>
            <Button
              onClick={() => {
                onClose('notification');
                toast({ title: 'Preferencias Salvas', variant: 'success' });
              }}
            >
              Atualizar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Payment Modal */}
      <Dialog open={state.payment} onOpenChange={() => onClose('payment')}>
        <DialogContent onClose={() => onClose('payment')} className="sm:max-w-md">
          <div className="flex flex-col items-center p-4 text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-brand-blue/10 text-brand-blue">
              <Icon name="credit-card" size="size-6" />
            </div>
            <DialogHeader className="mb-4">
              <DialogTitle>Confirmar Assinatura Pro</DialogTitle>
              <DialogDescription>
                Voce sera cobrado <strong>{paymentDetails.monthlyPrice}</strong>. Cancele quando
                quiser.
              </DialogDescription>
            </DialogHeader>

            <div className="mb-6 w-full rounded-lg border border-border bg-muted/30 p-4 text-sm">
              <div className="mb-2 flex justify-between">
                <span className="text-muted-foreground">Plano</span>
                <span className="font-semibold">{paymentDetails.plan}</span>
              </div>
              <div className="mb-2 flex justify-between">
                <span className="text-muted-foreground">Ciclo</span>
                <span className="font-semibold">{paymentDetails.cycle}</span>
              </div>
              <div className="mt-2 flex justify-between border-t border-border pt-2">
                <span className="font-bold">Total</span>
                <span className="font-bold text-primary">{paymentDetails.total}</span>
              </div>
            </div>

            <div className="flex w-full flex-col gap-3">
              <Button className="w-full" size="lg" onClick={() => onClose('payment')}>
                Confirmar Pagamento
              </Button>
              <Button variant="ghost" className="w-full" onClick={() => onClose('payment')}>
                Agora nao
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

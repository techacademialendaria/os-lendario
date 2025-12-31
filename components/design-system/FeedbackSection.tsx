import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Icon } from '../ui/icon';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '../ui/dialog';
import { Alert, AlertTitle, AlertDescription } from '../ui/alert';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from '../ui/sheet';
import { Popover } from '../ui/popover';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Switch } from '../ui/switch';
import { Symbol } from '../ui/symbol';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
} from '../ui/command';
import { useToast } from '../../hooks/use-toast'; // Import real hook
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'; // Import real Tooltip

const FeedbackSection: React.FC = () => {
  // Existing States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDestructiveModalOpen, setIsDestructiveModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isCommandOpen, setIsCommandOpen] = useState(false);

  // New Modal Variation States
  const [showCookieModal, setShowCookieModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const { toast } = useToast(); // Use the hook
  const alanAvatar =
    'https://yt3.googleusercontent.com/JNCtRSKK2aMQOmEroyBWmdbiaq_uTlFn-h_RuhGakkxBHW14e9u4yMZk884Espvk8he9GIYjrPE=s900-c-k-c0x00ffffff-no-rj';

  return (
    <div className="animate-fade-in space-y-16">
      <div>
        <h2 className="mb-4 font-serif text-4xl font-light">Feedback & Overlays</h2>
        <p className="max-w-2xl font-serif text-lg leading-relaxed text-muted-foreground">
          Interrupções controladas e mensagens passivas para guiar o usuário sem frustração.
        </p>
      </div>

      {/* --- COMMAND PALETTE --- */}
      <section className="space-y-8">
        <h3 className="flex items-center gap-2 border-b border-border pb-2 font-sans text-xl font-semibold">
          <Icon name="terminal" /> Command Palette (Cmd+K)
        </h3>
        <p className="font-serif text-sm text-muted-foreground">
          Interface para power users. Acesso rápido a ações globais.
        </p>

        <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-card p-12 shadow-sm">
          <p className="mb-4 font-serif text-sm text-muted-foreground">
            Pressione{' '}
            <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
              <span className="text-xs">⌘</span>J
            </kbd>{' '}
            ou clique abaixo.
          </p>
          <Button
            variant="outline"
            className="w-64 justify-between text-muted-foreground hover:text-foreground"
            onClick={() => setIsCommandOpen(true)}
          >
            <span className="flex items-center gap-2">
              <Icon name="search" size="size-3" /> Buscar comandos...
            </span>
            <span className="text-xs text-muted-foreground">Cmd+K</span>
          </Button>
        </div>

        <CommandDialog open={isCommandOpen} onOpenChange={setIsCommandOpen}>
          <CommandInput placeholder="Digite um comando ou busca..." />
          <CommandList>
            <CommandEmpty>Nenhum resultado encontrado.</CommandEmpty>
            <CommandGroup heading="Sugestões">
              <CommandItem onSelect={() => setIsCommandOpen(false)}>
                <Icon name="calendar" className="mr-2" />
                <span>Agendar Mentoria</span>
              </CommandItem>
              <CommandItem onSelect={() => setIsCommandOpen(false)}>
                <Icon name="rocket" className="mr-2" />
                <span>Novo Projeto</span>
              </CommandItem>
              <CommandItem onSelect={() => setIsCommandOpen(false)}>
                <Icon name="magic-wand" className="mr-2" />
                <span>Gerar com IA</span>
                <CommandShortcut>⌘P</CommandShortcut>
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Configurações">
              <CommandItem onSelect={() => setIsCommandOpen(false)}>
                <Icon name="user" className="mr-2" />
                <span>Perfil</span>
                <CommandShortcut>⌘P</CommandShortcut>
              </CommandItem>
              <CommandItem onSelect={() => setIsCommandOpen(false)}>
                <Icon name="credit-card" className="mr-2" />
                <span>Faturamento</span>
                <CommandShortcut>⌘B</CommandShortcut>
              </CommandItem>
              <CommandItem onSelect={() => setIsCommandOpen(false)}>
                <Icon name="settings" className="mr-2" />
                <span>Preferências</span>
                <CommandShortcut>⌘S</CommandShortcut>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </CommandDialog>
      </section>

      {/* --- DRAWERS / SHEETS --- */}
      <section className="space-y-8 border-t border-border pt-8">
        <h3 className="flex items-center gap-2 border-b border-border pb-2 font-sans text-xl font-semibold">
          <Icon name="layout-fluid" /> Painéis Laterais (Sheets)
        </h3>
        <p className="font-serif text-sm text-muted-foreground">
          Use Sheets para visualizar detalhes profundos, editar configurações complexas ou filtros,
          sem perder o contexto da página principal.
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
              <SheetTitle>Detalhes da Execução</SheetTitle>
              <SheetDescription>ID: #8392-AX • Criado em 24 Out, 14:30</SheetDescription>
            </SheetHeader>
            <div className="flex-1 space-y-6 overflow-y-auto py-6">
              <div className="space-y-2">
                <Label>Input do Usuário</Label>
                <div className="rounded-md bg-muted p-3 font-mono text-sm text-muted-foreground">
                  "Crie uma estratégia de marketing para uma marca de café premium focada em
                  sustentabilidade."
                </div>
              </div>
              <div className="space-y-2">
                <Label>Configuração do Modelo</Label>
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

      {/* --- POPOVERS --- */}
      <section className="space-y-8 border-t border-border pt-8">
        <h3 className="flex items-center gap-2 border-b border-border pb-2 font-sans text-xl font-semibold">
          <Icon name="comment-alt" /> Popovers & Menus
        </h3>
        <p className="font-serif text-sm text-muted-foreground">
          Pequenas sobreposições para ações rápidas ou ajustes contextuais.
        </p>

        <div className="flex flex-wrap gap-8">
          {/* Popover 1: Settings */}
          <Popover
            trigger={
              <Button variant="outline" className="gap-2">
                <Icon name="settings-sliders" size="size-4" /> Ajustes
              </Button>
            }
            content={
              <div className="space-y-4">
                <div className="space-y-2">
                  <h4 className="text-sm font-medium leading-none">Dimensões</h4>
                  <p className="text-xs text-muted-foreground">Defina a largura do output.</p>
                </div>
                <div className="grid gap-2">
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="width">Width</Label>
                    <Input id="width" defaultValue="100%" className="col-span-2 h-8" />
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="height">Height</Label>
                    <Input id="height" defaultValue="Auto" className="col-span-2 h-8" />
                  </div>
                </div>
              </div>
            }
          />

          {/* Popover 2: Profile */}
          <Popover
            align="start"
            trigger={
              <div className="flex cursor-pointer items-center gap-3 rounded-full border border-border p-2 pr-4 transition-colors hover:bg-muted/50">
                <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-primary/20 text-xs font-bold text-primary">
                  <Avatar>
                    <AvatarImage src={alanAvatar} />
                    <AvatarFallback>AL</AvatarFallback>
                  </Avatar>
                </div>
                <div className="text-xs font-medium">Academia Admin</div>
              </div>
            }
            content={
              <div className="space-y-1">
                <div className="mb-1 border-b border-border px-2 py-1.5 text-sm font-semibold">
                  Minha Conta
                </div>
                <Button variant="ghost" className="w-full justify-start gap-2 px-2 py-1.5 text-sm font-normal h-auto">
                  <Icon name="user" size="size-3" /> Perfil
                </Button>
                <Button variant="ghost" className="w-full justify-start gap-2 px-2 py-1.5 text-sm font-normal h-auto">
                  <Icon name="credit-card" size="size-3" /> Faturamento
                </Button>
                <Button variant="ghost" className="w-full justify-start gap-2 px-2 py-1.5 text-sm font-normal h-auto text-destructive hover:text-destructive hover:bg-destructive/10">
                  <Icon name="sign-out-alt" size="size-3" /> Sair
                </Button>
              </div>
            }
          />
        </div>
      </section>

      {/* --- MODALS (Gallery) --- */}
      <section className="space-y-8 border-t border-border pt-8">
        <h3 className="flex items-center gap-2 border-b border-border pb-2 font-sans text-xl font-semibold">
          <Icon name="copy" /> Galeria de Modais
        </h3>
        <p className="mb-6 font-serif text-sm text-muted-foreground">
          Padrões comuns de diálogo para diferentes contextos da aplicação.
        </p>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <Button
            onClick={() => setShowCookieModal(true)}
            variant="outline"
            className="flex h-24 flex-col gap-2"
          >
            <Icon name="cookie" size="size-6" />
            <span>Cookies (Filled)</span>
          </Button>
          <Button
            onClick={() => setShowImageModal(true)}
            variant="outline"
            className="flex h-24 flex-col gap-2"
          >
            <Icon name="image" size="size-6" />
            <span>Image Top</span>
          </Button>
          <Button
            onClick={() => setShowNotificationModal(true)}
            variant="outline"
            className="flex h-24 flex-col gap-2"
          >
            <Icon name="settings" size="size-6" />
            <span>Switch Settings</span>
          </Button>
          <Button
            onClick={() => setShowPaymentModal(true)}
            variant="outline"
            className="flex h-24 flex-col gap-2"
          >
            <Icon name="credit-card" size="size-6" />
            <span>Transacional</span>
          </Button>
        </div>

        {/* 1. Cookie Modal */}
        <Dialog open={showCookieModal} onOpenChange={setShowCookieModal}>
          <DialogContent
            onClose={() => setShowCookieModal(false)}
            className="text-center sm:max-w-sm"
          >
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-muted/50 text-4xl">
              🍪
            </div>
            <DialogHeader className="text-center sm:text-center">
              <DialogTitle className="text-xl">Usamos Cookies!</DialogTitle>
              <DialogDescription>
                Para melhorar sua experiência lendária, utilizamos cookies. Você aceita?
              </DialogDescription>
            </DialogHeader>
            <div className="mt-6 flex flex-row gap-3">
              <Button variant="ghost" className="flex-1" onClick={() => setShowCookieModal(false)}>
                Política
              </Button>
              <Button className="flex-1" onClick={() => setShowCookieModal(false)}>
                Aceitar Tudo
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* 2. Image Top Modal (Feature/Upsell) */}
        <Dialog open={showImageModal} onOpenChange={setShowImageModal}>
          <DialogContent
            onClose={() => setShowImageModal(false)}
            className="overflow-hidden border-0 p-0 shadow-2xl sm:max-w-sm"
          >
            <div className="relative h-48 w-full bg-[url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center">
              <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowImageModal(false)}
                className="absolute right-4 top-4 h-8 w-8 rounded-full bg-black/20 text-white backdrop-blur-sm hover:bg-black/40 hover:text-white p-0"
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
                <DialogTitle className="text-2xl">Colaboração em Tempo Real</DialogTitle>
                <DialogDescription className="mt-2">
                  Agora você pode convidar seu time para editar prompts simultaneamente. Aumente a
                  produtividade da sua equipe.
                </DialogDescription>
              </DialogHeader>
              <div className="mt-8 flex items-center justify-between">
                <Button
                  variant="link"
                  className="px-0 text-muted-foreground"
                  onClick={() => setShowImageModal(false)}
                >
                  Pular
                </Button>
                <Button onClick={() => setShowImageModal(false)}>Explorar Agora</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* 3. Settings/Toggle Modal */}
        <Dialog open={showNotificationModal} onOpenChange={setShowNotificationModal}>
          <DialogContent onClose={() => setShowNotificationModal(false)} className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Notificações</DialogTitle>
              <DialogDescription>Gerencie como você recebe alertas do sistema.</DialogDescription>
            </DialogHeader>
            <div className="space-y-6 py-4">
              <div className="flex items-center justify-between space-x-4">
                <div className="flex flex-col space-y-1">
                  <Label htmlFor="activity" className="text-sm font-medium leading-none">
                    Atividade da Conta
                  </Label>
                  <span className="text-xs text-muted-foreground">
                    Segurança e logins suspeitos.
                  </span>
                </div>
                <Switch id="activity" defaultChecked />
              </div>
              <div className="flex items-center justify-between space-x-4">
                <div className="flex flex-col space-y-1">
                  <Label htmlFor="meetups" className="text-sm font-medium leading-none">
                    Novos Cursos
                  </Label>
                  <span className="text-xs text-muted-foreground">Lançamentos da Academia.</span>
                </div>
                <Switch id="meetups" />
              </div>
              <div className="flex items-center justify-between space-x-4">
                <div className="flex flex-col space-y-1">
                  <Label htmlFor="marketing" className="text-sm font-medium leading-none">
                    Marketing
                  </Label>
                  <span className="text-xs text-muted-foreground">Ofertas e promoções.</span>
                </div>
                <Switch id="marketing" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowNotificationModal(false)}>
                Cancelar
              </Button>
              <Button
                onClick={() => {
                  setShowNotificationModal(false);
                  toast({ title: 'Preferências Salvas', variant: 'success' });
                }}
              >
                Atualizar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* 4. Transactional/Simple Modal */}
        <Dialog open={showPaymentModal} onOpenChange={setShowPaymentModal}>
          <DialogContent onClose={() => setShowPaymentModal(false)} className="sm:max-w-md">
            <div className="flex flex-col items-center p-4 text-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-brand-blue/10 text-brand-blue">
                <Icon name="credit-card" size="size-6" />
              </div>
              <DialogHeader className="mb-4">
                <DialogTitle>Confirmar Assinatura Pro</DialogTitle>
                <DialogDescription>
                  Você será cobrado <strong>R$ 97,00/mês</strong>. Cancele quando quiser.
                </DialogDescription>
              </DialogHeader>

              <div className="mb-6 w-full rounded-lg border border-border bg-muted/30 p-4 text-sm">
                <div className="mb-2 flex justify-between">
                  <span className="text-muted-foreground">Plano</span>
                  <span className="font-semibold">Lendário Pro</span>
                </div>
                <div className="mb-2 flex justify-between">
                  <span className="text-muted-foreground">Ciclo</span>
                  <span className="font-semibold">Mensal</span>
                </div>
                <div className="mt-2 flex justify-between border-t border-border pt-2">
                  <span className="font-bold">Total</span>
                  <span className="font-bold text-primary">R$ 97,00</span>
                </div>
              </div>

              <div className="flex w-full flex-col gap-3">
                <Button className="w-full" size="lg" onClick={() => setShowPaymentModal(false)}>
                  Confirmar Pagamento
                </Button>
                <Button
                  variant="ghost"
                  className="w-full"
                  onClick={() => setShowPaymentModal(false)}
                >
                  Agora não
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* --- MODALS (Legacy / Functional Examples) --- */}
        <div className="mt-8 border-t border-border pt-8">
          <h4 className="mb-4 text-sm font-bold uppercase text-muted-foreground">
            Exemplos Funcionais (Anteriores)
          </h4>
          <div className="flex flex-wrap gap-4">
            <Button onClick={() => setIsModalOpen(true)} variant="secondary">
              Informativo (Terms)
            </Button>
            <Button onClick={() => setIsFormModalOpen(true)} variant="secondary">
              Formulário (Edit)
            </Button>
            <Button onClick={() => setIsSuccessModalOpen(true)} variant="secondary">
              Sucesso (Action)
            </Button>
            <Button onClick={() => setIsDestructiveModalOpen(true)} variant="secondary">
              Crítico (Delete)
            </Button>
          </div>
        </div>

        {/* 1. Standard Modal (Terms) */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent onClose={() => setIsModalOpen(false)}>
            <DialogHeader>
              <DialogTitle>Atualização de Contrato</DialogTitle>
              <DialogDescription>
                Novas cláusulas foram adicionadas aos termos de uso da IA. Por favor, revise antes
                de continuar.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="max-h-40 overflow-y-auto rounded-md border border-border bg-muted/30 p-4 font-serif text-sm text-muted-foreground">
                <p className="mb-2">1. O uso de IA generativa implica responsabilidade ética...</p>
                <p className="mb-2">
                  2. Dados sensíveis não devem ser compartilhados sem anonimização...
                </p>
                <p>3. A Academia Lendária reserva-se o direito de auditoria...</p>
              </div>
            </div>
            <DialogFooter>
              <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={() => setIsModalOpen(false)}>Aceitar Termos</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* 2. Form Modal (Edit Profile) */}
        <Dialog open={isFormModalOpen} onOpenChange={setIsFormModalOpen}>
          <DialogContent onClose={() => setIsFormModalOpen(false)} className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Editar Perfil</DialogTitle>
              <DialogDescription>
                Faça alterações no seu perfil público aqui. Clique em salvar quando terminar.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Nome
                </Label>
                <Input id="name" value="Alan Nicolas" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Username
                </Label>
                <Input id="username" value="@alannicolas" className="col-span-3" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsFormModalOpen(false)}>
                Cancelar
              </Button>
              <Button
                type="submit"
                onClick={() => {
                  setIsFormModalOpen(false);
                  toast({
                    title: 'Perfil Atualizado',
                    description: 'Suas alterações foram salvas.',
                    variant: 'success',
                  });
                }}
              >
                Salvar Alterações
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* 3. Success Modal */}
        <Dialog open={isSuccessModalOpen} onOpenChange={setIsSuccessModalOpen}>
          <DialogContent
            onClose={() => setIsSuccessModalOpen(false)}
            className="text-center sm:max-w-sm"
          >
            <div className="bg-success/10 mx-auto mb-4 flex h-16 w-16 animate-accordion-down items-center justify-center rounded-full">
              <Icon name="check" className="text-success" size="size-8" />
            </div>
            <DialogHeader className="text-center sm:text-center">
              <DialogTitle className="text-xl">Projeto Criado!</DialogTitle>
              <DialogDescription>
                Seu novo projeto de IA foi inicializado com sucesso e está pronto para configuração.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="mt-6 sm:justify-center">
              <Button className="w-full" onClick={() => setIsSuccessModalOpen(false)}>
                Ir para o Dashboard
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* 4. Destructive Modal */}
        <Dialog open={isDestructiveModalOpen} onOpenChange={setIsDestructiveModalOpen}>
          <DialogContent onClose={() => setIsDestructiveModalOpen(false)}>
            <DialogHeader>
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20">
                <Icon name="exclamation" className="text-red-600" size="size-6" />
              </div>
              <DialogTitle className="text-center">Deletar Projeto?</DialogTitle>
              <DialogDescription className="text-center">
                Esta ação não pode ser desfeita. Todos os prompts e históricos associados serão
                perdidos permanentemente.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="sm:justify-center">
              <Button variant="outline" onClick={() => setIsDestructiveModalOpen(false)}>
                Manter Projeto
              </Button>
              <Button
                variant="destructive"
                onClick={() => {
                  setIsDestructiveModalOpen(false);
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
      </section>

      {/* --- TOASTS --- */}
      <section className="space-y-8 border-t border-border pt-8">
        <h3 className="flex items-center gap-2 border-b border-border pb-2 font-sans text-xl font-semibold">
          <Icon name="bell" /> Toasts & Notificações
        </h3>
        <p className="font-serif text-sm text-muted-foreground">
          Mensagens transientes que aparecem nos cantos da tela.{' '}
          <strong>Clique para testar.</strong>
        </p>

        <div className="flex flex-wrap justify-center gap-4 rounded-xl border border-dashed border-border bg-muted/10 p-8">
          <Button
            variant="outline"
            onClick={() => {
              toast({
                title: 'Sucesso!',
                description: 'Seu arquivo foi enviado com segurança.',
                variant: 'success',
              });
            }}
          >
            Disparar Sucesso
          </Button>

          <Button
            variant="outline"
            onClick={() => {
              toast({
                title: 'Atenção',
                description: 'Sua sessão vai expirar em 5 minutos.',
                variant: 'warning',
              });
            }}
          >
            Disparar Aviso
          </Button>

          <Button
            variant="outline"
            onClick={() => {
              toast({
                title: 'Erro de Conexão',
                description: 'Não foi possível salvar as alterações.',
                variant: 'destructive',
              });
            }}
          >
            Disparar Erro
          </Button>

          <Button
            variant="outline"
            onClick={() => {
              toast({
                title: 'Atualização',
                description: 'Novos recursos disponíveis no sistema.',
              });
            }}
          >
            Disparar Padrão
          </Button>
        </div>
      </section>

      {/* --- TOOLTIPS --- */}
      <section className="space-y-8 border-t border-border pt-8">
        <h3 className="flex items-center gap-2 border-b border-border pb-2 font-sans text-xl font-semibold">
          <Icon name="info" /> Tooltips
        </h3>
        <p className="font-serif text-sm text-muted-foreground">
          Dicas contextuais que aparecem ao passar o mouse. Utilize para desambiguação ou detalhes
          extras.
        </p>

        <div className="flex flex-wrap items-center gap-12 rounded-xl border border-dashed border-border bg-muted/10 p-8">
          {/* 1. Simple Tooltip */}
          <Tooltip>
            <TooltipTrigger>
              <Button variant="outline" size="icon">
                <Icon name="info" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Mais informações</TooltipContent>
          </Tooltip>

          {/* 2. Text Link Tooltip */}
          <Tooltip>
            <TooltipTrigger>
              <span className="cursor-help text-sm text-muted-foreground underline decoration-dotted">
                Termo Técnico
              </span>
            </TooltipTrigger>
            <TooltipContent side="right" className="max-w-[200px] whitespace-normal text-center">
              Explicação detalhada sobre o termo técnico no contexto da IA.
            </TooltipContent>
          </Tooltip>

          {/* 3. Rich User Preview Tooltip */}
          <Tooltip>
            <TooltipTrigger>
              <div className="flex cursor-pointer items-center gap-2">
                <Avatar
                  size="sm"
                  className="ring-2 ring-transparent transition-all hover:ring-primary/50"
                >
                  <AvatarImage src={alanAvatar} />
                  <AvatarFallback>AN</AvatarFallback>
                </Avatar>
                <span className="text-sm font-semibold transition-colors hover:text-primary">
                  Alan Nicolas
                </span>
              </div>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="border-none bg-transparent p-0 shadow-none">
              {/* Nested custom content inside Tooltip primitive if needed, or simply style TooltipContent */}
              <div className="w-64 rounded-xl border border-border bg-card p-4 text-left shadow-2xl">
                <div className="flex items-start gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={alanAvatar} />
                    <AvatarFallback>AN</AvatarFallback>
                  </Avatar>
                  <div>
                    <h5 className="text-sm font-bold text-foreground">Alan Nicolas</h5>
                    <p className="text-xs text-muted-foreground">Founder @ Academia Lendária</p>
                  </div>
                </div>
                <p className="mt-3 whitespace-normal font-serif text-xs leading-relaxed text-muted-foreground">
                  Líder visionário focado em potencializar humanos com Inteligência Artificial.
                </p>
              </div>
            </TooltipContent>
          </Tooltip>

          {/* 4. Status Tooltip */}
          <Tooltip>
            <TooltipTrigger>
              <div className="flex items-center gap-2">
                <div className="bg-success h-3 w-3 cursor-help rounded-full"></div>
                <span className="text-sm">Sistema Online</span>
              </div>
            </TooltipTrigger>
            <TooltipContent side="right" className="bg-zinc-900 text-white">
              Uptime: 99.9% (Últimas 24h)
            </TooltipContent>
          </Tooltip>
        </div>
      </section>
    </div>
  );
};

export default FeedbackSection;

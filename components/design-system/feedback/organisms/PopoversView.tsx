import React from 'react';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Popover } from '@/components/ui/popover';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ALAN_AVATAR_URL } from '../data';

const PopoversView: React.FC = () => {
  return (
    <section className="space-y-8 border-t border-border pt-8">
      <h3 className="flex items-center gap-2 border-b border-border pb-2 font-sans text-xl font-semibold">
        <Icon name="comment-alt" /> Popovers & Menus
      </h3>
      <p className="font-serif text-sm text-muted-foreground">
        Pequenas sobreposicoes para acoes rapidas ou ajustes contextuais.
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
                <h4 className="text-sm font-medium leading-none">Dimensoes</h4>
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
                  <AvatarImage src={ALAN_AVATAR_URL} />
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
              <Button
                variant="ghost"
                className="h-auto w-full justify-start gap-2 px-2 py-1.5 text-sm font-normal"
              >
                <Icon name="user" size="size-3" /> Perfil
              </Button>
              <Button
                variant="ghost"
                className="h-auto w-full justify-start gap-2 px-2 py-1.5 text-sm font-normal"
              >
                <Icon name="credit-card" size="size-3" /> Faturamento
              </Button>
              <Button
                variant="ghost"
                className="h-auto w-full justify-start gap-2 px-2 py-1.5 text-sm font-normal text-destructive hover:bg-destructive/10 hover:text-destructive"
              >
                <Icon name="sign-out-alt" size="size-3" /> Sair
              </Button>
            </div>
          }
        />
      </div>
    </section>
  );
};

export default PopoversView;

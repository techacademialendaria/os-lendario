import React from 'react';
import { Button } from '../../../ui/button';
import { Icon } from '../../../ui/icon';
import { Label } from '../../../ui/label';
import { Input } from '../../../ui/input';
import { Popover } from '../../../ui/popover';
import { Avatar, AvatarFallback, AvatarImage } from '../../../ui/avatar';
import { dimensionFields, profileMenuItems } from '../data';

const ALAN_AVATAR =
  'https://yt3.googleusercontent.com/JNCtRSKK2aMQOmEroyBWmdbiaq_uTlFn-h_RuhGakkxBHW14e9u4yMZk884Espvk8he9GIYjrPE=s900-c-k-c0x00ffffff-no-rj';

export const PopoverSection: React.FC = () => {
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
                {dimensionFields.map((field) => (
                  <div key={field.id} className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor={field.id}>{field.label}</Label>
                    <Input
                      id={field.id}
                      defaultValue={field.defaultValue}
                      className="col-span-2 h-8"
                    />
                  </div>
                ))}
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
                  <AvatarImage src={ALAN_AVATAR} />
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
              {profileMenuItems.map((item) => (
                <Button
                  key={item.label}
                  variant="ghost"
                  className={`h-auto w-full justify-start gap-2 px-2 py-1.5 text-sm font-normal ${
                    item.variant === 'destructive'
                      ? 'text-destructive hover:bg-destructive/10 hover:text-destructive'
                      : ''
                  }`}
                >
                  <Icon name={item.icon} size="size-3" /> {item.label}
                </Button>
              ))}
            </div>
          }
        />
      </div>
    </section>
  );
};

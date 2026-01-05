import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
} from '@/components/ui/command';
import { commandGroups } from '../data';

const CommandPaletteView: React.FC = () => {
  const [isCommandOpen, setIsCommandOpen] = useState(false);

  return (
    <section className="space-y-8">
      <h3 className="flex items-center gap-2 border-b border-border pb-2 font-sans text-xl font-semibold">
        <Icon name="terminal" /> Command Palette (Cmd+K)
      </h3>
      <p className="font-serif text-sm text-muted-foreground">
        Interface para power users. Acesso rapido a acoes globais.
      </p>

      <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-card p-12 shadow-sm">
        <p className="mb-4 font-serif text-sm text-muted-foreground">
          Pressione{' '}
          <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
            <span className="text-xs">Cmd</span>J
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
          {commandGroups.map((group, groupIndex) => (
            <React.Fragment key={group.heading}>
              {groupIndex > 0 && <CommandSeparator />}
              <CommandGroup heading={group.heading}>
                {group.items.map((item) => (
                  <CommandItem key={item.label} onSelect={() => setIsCommandOpen(false)}>
                    <Icon name={item.icon} className="mr-2" />
                    <span>{item.label}</span>
                    {item.shortcut && <CommandShortcut>Cmd{item.shortcut}</CommandShortcut>}
                  </CommandItem>
                ))}
              </CommandGroup>
            </React.Fragment>
          ))}
        </CommandList>
      </CommandDialog>
    </section>
  );
};

export default CommandPaletteView;

import React from 'react';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Symbol } from '@/components/ui/symbol';

export const AdvertorialTopBar: React.FC = () => (
  <div className="sticky top-0 z-40 mb-12 border-b border-border bg-card py-4 shadow-sm">
    <div className="mx-auto flex max-w-6xl items-center justify-between px-4">
      <div className="flex items-center gap-4">
        <Icon name="menu-burger" className="cursor-pointer text-muted-foreground" />
        <span className="flex items-center gap-2 font-serif text-xl font-bold italic tracking-tighter md:text-2xl">
          <Symbol name="infinity" className="text-primary" />
          The <span className="text-primary">Legendary</span> Post
        </span>
      </div>
      <div className="hidden gap-6 font-sans text-xs font-bold uppercase tracking-widest text-muted-foreground md:flex">
        <span className="-mb-4 border-b-2 border-primary pb-4 text-foreground">Carreira</span>
        <span className="cursor-pointer hover:text-foreground">Tecnologia</span>
        <span className="cursor-pointer hover:text-foreground">Lideranca</span>
      </div>
      <div className="flex items-center gap-4">
        <Button size="sm" variant="ghost" className="h-8 w-8">
          <Icon name="search" />
        </Button>
        <Button
          size="sm"
          className="hidden h-8 font-sans text-xs font-bold uppercase tracking-wider sm:flex"
        >
          Inscrever-se
        </Button>
      </div>
    </div>
  </div>
);

import React from 'react';
import { Icon } from '@/components/ui/icon';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const ListGroupsView: React.FC = () => {
  return (
    <section className="space-y-8 border-t border-border pt-12">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h3 className="font-sans text-2xl font-bold">List Groups & Menus</h3>
          <p className="text-sm text-muted-foreground">
            Padroes de navegacao vertical e horizontal com estados interativos.
          </p>
        </div>
      </div>

      {/* 1. Basic Shapes & States */}
      <BasicStatesRow />

      {/* 2. Complex Variations */}
      <ComplexVariationsRow />

      {/* 3. Horizontal */}
      <HorizontalVariationsRow />
    </section>
  );
};

// --- Basic States Row ---
const BasicStatesRow: React.FC = () => (
  <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
    {/* Basic Usage */}
    <div className="space-y-4">
      <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
        Basic Usage
      </h4>
      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <div className="cursor-pointer border-b border-border px-4 py-3 text-sm font-medium transition-colors hover:bg-muted/50">
          Profile
        </div>
        <div className="cursor-pointer border-b border-border bg-primary/5 px-4 py-3 text-sm font-medium text-primary">
          Active
        </div>
        <div className="cursor-pointer border-b border-border bg-muted px-4 py-3 text-sm font-medium">
          Hover
        </div>
        <div className="cursor-not-allowed px-4 py-3 text-sm font-medium text-muted-foreground opacity-60">
          Disabled
        </div>
      </div>
    </div>

    {/* Flush */}
    <div className="space-y-4">
      <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
        Flush
      </h4>
      <div className="bg-card">
        <div className="cursor-pointer border-b border-border px-0 py-3 text-sm font-medium transition-colors hover:bg-muted/50">
          Profile
        </div>
        <div className="cursor-pointer border-b border-border px-0 py-3 text-sm font-medium text-primary">
          Active
        </div>
        <div className="cursor-pointer border-b border-border bg-muted/30 px-0 py-3 text-sm font-medium">
          Hover
        </div>
        <div className="cursor-not-allowed px-0 py-3 text-sm font-medium text-muted-foreground opacity-60">
          Disabled
        </div>
      </div>
    </div>

    {/* No Gutters */}
    <div className="space-y-4">
      <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
        No Gutters
      </h4>
      <div className="border-y border-border bg-card">
        <div className="cursor-pointer border-b border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted/50">
          Profile
        </div>
        <div className="cursor-pointer border-b border-border px-4 py-2 text-sm font-medium text-primary">
          Active
        </div>
        <div className="cursor-pointer border-b border-border bg-muted/30 px-4 py-2 text-sm font-medium">
          Hover
        </div>
        <div className="cursor-not-allowed px-4 py-2 text-sm font-medium text-muted-foreground opacity-60">
          Disabled
        </div>
      </div>
    </div>
  </div>
);

// --- Complex Variations Row ---
const ComplexVariationsRow: React.FC = () => (
  <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
    <ListGroupCard />
    <IconsBadgesCard />
    <StripedCard />
    <StripedBorderCard />
  </div>
);

const ListGroupCard: React.FC = () => (
  <Card className="overflow-hidden">
    <div className="border-b border-border bg-muted/50 px-4 py-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
      List Group
    </div>
    <div className="divide-y divide-border">
      <button className="w-full px-4 py-3 text-left text-sm font-medium transition-colors hover:bg-muted/50">
        Profile
      </button>
      <button className="w-full bg-primary/5 px-4 py-3 text-left text-sm font-medium text-primary transition-colors hover:bg-primary/10">
        Settings
      </button>
      <button className="w-full px-4 py-3 text-left text-sm font-medium transition-colors hover:bg-muted/50">
        Newsletter
      </button>
      <button className="w-full cursor-not-allowed px-4 py-3 text-left text-sm font-medium text-muted-foreground opacity-50">
        Team
      </button>
    </div>
  </Card>
);

const IconsBadgesCard: React.FC = () => (
  <Card className="overflow-hidden">
    <div className="border-b border-border bg-muted/50 px-4 py-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
      Icons & Badges
    </div>
    <div className="divide-y divide-border">
      <button className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium transition-colors hover:bg-muted/50">
        <Icon name="user" className="text-muted-foreground" size="size-4" />
        Profile
      </button>
      <button className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium transition-colors hover:bg-muted/50">
        <Icon name="settings" className="text-muted-foreground" size="size-4" />
        Settings
      </button>
      <button className="flex w-full items-center justify-between px-4 py-3 text-sm font-medium transition-colors hover:bg-muted/50">
        <div className="flex items-center gap-3">
          <Icon name="bell" className="text-muted-foreground" size="size-4" />
          Newsletter
        </div>
        <Badge variant="outline" className="h-5 px-1.5 text-[10px]">
          New
        </Badge>
      </button>
      <button className="flex w-full items-center justify-between px-4 py-3 text-sm font-medium text-primary transition-colors hover:bg-muted/50">
        <div className="flex items-center gap-3">
          <Icon name="users-alt" size="size-4" />
          Team
        </div>
        <Badge className="h-5 bg-primary px-1.5 text-[10px] text-primary-foreground">
          99+
        </Badge>
      </button>
    </div>
  </Card>
);

const StripedCard: React.FC = () => (
  <Card className="overflow-hidden">
    <div className="border-b border-border bg-muted/50 px-4 py-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
      Striped
    </div>
    <div className="flex flex-col">
      <div className="flex items-center gap-3 px-4 py-3 text-sm font-medium">
        <Icon name="user" className="text-muted-foreground" size="size-4" /> Profile
      </div>
      <div className="flex items-center justify-between bg-muted/40 px-4 py-3 text-sm font-medium">
        <div className="flex items-center gap-3">
          <Icon name="settings" className="text-muted-foreground" size="size-4" /> Settings
        </div>
        <Badge variant="secondary" className="text-[10px]">
          New
        </Badge>
      </div>
      <div className="flex items-center justify-between px-4 py-3 text-sm font-medium">
        <div className="flex items-center gap-3">
          <Icon name="bell" className="text-muted-foreground" size="size-4" /> Newsletter
        </div>
        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-muted text-[10px] font-bold">
          2
        </div>
      </div>
      <div className="flex items-center justify-between bg-muted/40 px-4 py-3 text-sm font-medium">
        <div className="flex items-center gap-3">
          <Icon name="users-alt" className="text-muted-foreground" size="size-4" /> Team
        </div>
        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-[10px] font-bold text-primary">
          9+
        </div>
      </div>
    </div>
  </Card>
);

const StripedBorderCard: React.FC = () => (
  <Card className="overflow-hidden border-2 border-border/60">
    <div className="border-b border-border bg-muted/50 px-4 py-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
      Striped + Border
    </div>
    <div className="flex flex-col divide-y divide-border">
      <div className="flex items-center gap-3 px-4 py-3 text-sm font-medium">
        <Icon name="user" className="text-muted-foreground" size="size-4" /> Profile
      </div>
      <div className="flex items-center gap-3 bg-muted/30 px-4 py-3 text-sm font-medium">
        <Icon name="settings" className="text-muted-foreground" size="size-4" /> Settings
      </div>
      <div className="flex items-center justify-between px-4 py-3 text-sm font-medium">
        <div className="flex items-center gap-3">
          <Icon name="bell" className="text-muted-foreground" size="size-4" /> Newsletter
        </div>
        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-foreground text-[10px] font-bold text-background">
          5
        </div>
      </div>
      <div className="flex items-center justify-between bg-muted/30 px-4 py-3 text-sm font-medium">
        <div className="flex items-center gap-3">
          <Icon name="users-alt" className="text-muted-foreground" size="size-4" /> Team
        </div>
        <div className="font-mono text-xs text-muted-foreground">99+</div>
      </div>
    </div>
  </Card>
);

// --- Horizontal Variations Row ---
const HorizontalVariationsRow: React.FC = () => (
  <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
    <div className="space-y-4">
      <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
        Horizontal
      </h4>
      <div className="flex overflow-x-auto rounded-lg border border-border bg-card p-1">
        <button className="flex-1 whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-muted">
          <Icon name="user" className="mr-2 inline-block text-muted-foreground" size="size-3" />{' '}
          Profile
        </button>
        <div className="my-1 w-px bg-border"></div>
        <button className="flex-1 whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-muted">
          <Icon name="settings" className="mr-2 inline-block text-muted-foreground" size="size-3" />{' '}
          Settings
        </button>
        <div className="my-1 w-px bg-border"></div>
        <button className="flex-1 whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-muted">
          <Icon name="bell" className="mr-2 inline-block text-muted-foreground" size="size-3" />{' '}
          Newsletter
        </button>
        <div className="my-1 w-px bg-border"></div>
        <button className="flex-1 whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-muted">
          <Icon name="users-alt" className="mr-2 inline-block text-muted-foreground" size="size-3" />{' '}
          Team
        </button>
      </div>
    </div>

    <div className="space-y-4">
      <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
        Mixed Horizontal
      </h4>
      <div className="flex divide-x divide-border overflow-hidden rounded-lg border border-border bg-card">
        <button className="flex-1 bg-primary/5 px-4 py-3 text-sm font-medium text-primary hover:bg-muted/50">
          <Icon name="user" className="mr-2 inline-block" size="size-3" /> Profile
        </button>
        <button className="flex flex-1 items-center justify-center gap-2 px-4 py-3 text-sm font-medium hover:bg-muted/50">
          Settings
          <span className="rounded-full bg-primary px-1.5 py-0.5 text-[10px] text-primary-foreground">
            2
          </span>
        </button>
        <button className="flex flex-1 items-center justify-center gap-2 px-4 py-3 text-sm font-medium hover:bg-muted/50">
          Newsletter
        </button>
        <button className="flex flex-1 cursor-not-allowed items-center justify-center gap-2 bg-muted/20 px-4 py-3 text-sm font-medium text-muted-foreground">
          Team
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/50 text-[10px] text-primary-foreground">
            5
          </span>
        </button>
      </div>
    </div>
  </div>
);

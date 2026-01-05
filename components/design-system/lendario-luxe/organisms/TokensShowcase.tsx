/**
 * TokensShowcase - Badges, Stats, Glassmorphism, and Patterns Reference demos
 */

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Icon } from '@/components/ui/icon';

export const TokensShowcase: React.FC = () => {
  return (
    <>
      {/* Badges & Pills */}
      <section>
        <Card>
          <CardHeader>
            <CardTitle>Badges & Pills</CardTitle>
            <CardDescription>Variações de badges luxe usadas nos componentes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <Badge className="rounded-full border-none bg-primary/10 px-4 py-1.5 text-[9px] font-black uppercase tracking-[0.3em] text-primary">
                Categoria
              </Badge>
              <Badge variant="outline" className="rounded-full border-primary/20 bg-primary/5 px-6 py-2 text-[10px] font-black uppercase tracking-[0.6em] text-primary">
                Premium
              </Badge>
              <Badge variant="secondary" className="rounded-full bg-muted/50 px-3 py-1 text-[8px] font-black uppercase tracking-[0.15em] text-muted-foreground">
                Tag
              </Badge>
              <span className="inline-flex items-center gap-2 rounded-full bg-green-500/10 px-4 py-2 text-[10px] font-medium text-green-500">
                <Icon name="check-circle" size="size-3" />
                Completo
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-amber-500/10 px-4 py-2 text-[10px] font-medium text-amber-500">
                <Icon name="clock" size="size-3" />
                Em progresso
              </span>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Stats Grid */}
      <section>
        <Card>
          <CardHeader>
            <CardTitle>Stats Cards Pattern</CardTitle>
            <CardDescription>Padrão usado em dashboards</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              <div className="rounded-xl border border-border bg-card/50 p-5">
                <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  Total
                </p>
                <h3 className="font-mono text-2xl font-bold text-foreground">1,234</h3>
              </div>
              <div className="rounded-xl border border-border bg-card/50 p-5">
                <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  Publicados
                </p>
                <h3 className="font-mono text-2xl font-bold text-green-500">892</h3>
              </div>
              <div className="rounded-xl border border-border bg-card/50 p-5">
                <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  Em Processo
                </p>
                <h3 className="font-mono text-2xl font-bold text-amber-500">234</h3>
              </div>
              <div className="rounded-xl border border-border bg-card/50 p-5">
                <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  Rascunhos
                </p>
                <h3 className="font-mono text-2xl font-bold text-muted-foreground">108</h3>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Glassmorphism Examples */}
      <section>
        <Card>
          <CardHeader>
            <CardTitle>Glassmorphism</CardTitle>
            <CardDescription>Padrões de container com blur</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-border bg-card/60 p-8 backdrop-blur-xl">
                <p className="mb-2 text-[10px] font-black uppercase tracking-[0.2em] text-primary">
                  Card Light
                </p>
                <p className="text-sm text-muted-foreground">bg-card/60 backdrop-blur-xl</p>
              </div>
              <div className="rounded-[2rem] border border-border bg-card/80 p-8 shadow-2xl backdrop-blur-2xl">
                <p className="mb-2 text-[10px] font-black uppercase tracking-[0.2em] text-primary">
                  Card Heavy
                </p>
                <p className="text-sm text-muted-foreground">bg-card/80 backdrop-blur-2xl shadow-2xl</p>
              </div>
              <div className="rounded-2xl border border-border/50 bg-muted/30 p-8 backdrop-blur-xl">
                <p className="mb-2 text-[10px] font-black uppercase tracking-[0.2em] text-primary">
                  Muted Glass
                </p>
                <p className="text-sm text-muted-foreground">bg-muted/30 border-border/50</p>
              </div>
              <div className="relative overflow-hidden rounded-2xl border border-border bg-card/95 p-8 backdrop-blur-xl">
                <div className="pointer-events-none absolute inset-[1px] rounded-2xl border border-white/[0.03]" />
                <p className="mb-2 text-[10px] font-black uppercase tracking-[0.2em] text-primary">
                  Inner Glow
                </p>
                <p className="text-sm text-muted-foreground">Com inner border sutil</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Patterns Reference */}
      <section>
        <Card>
          <CardHeader>
            <CardTitle>Padrões Luxe</CardTitle>
            <CardDescription>Classes Tailwind usadas nos componentes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 font-mono text-sm md:grid-cols-2">
              <div className="rounded-lg border border-border bg-muted/30 p-4">
                <p className="mb-2 text-[10px] font-black uppercase tracking-[0.2em] text-primary">
                  Tipografia
                </p>
                <p className="text-muted-foreground">text-[9px] font-black uppercase tracking-[0.25em]</p>
                <p className="text-muted-foreground">font-serif italic text-muted-foreground</p>
              </div>
              <div className="rounded-lg border border-border bg-muted/30 p-4">
                <p className="mb-2 text-[10px] font-black uppercase tracking-[0.2em] text-primary">
                  Containers
                </p>
                <p className="text-muted-foreground">rounded-2xl border border-border bg-card/60</p>
                <p className="text-muted-foreground">backdrop-blur-xl shadow-2xl</p>
              </div>
              <div className="rounded-lg border border-border bg-muted/30 p-4">
                <p className="mb-2 text-[10px] font-black uppercase tracking-[0.2em] text-primary">
                  Hover Levitação
                </p>
                <p className="text-muted-foreground">group-hover:-translate-y-3</p>
                <p className="text-muted-foreground">transition-all duration-500</p>
              </div>
              <div className="rounded-lg border border-border bg-muted/30 p-4">
                <p className="mb-2 text-[10px] font-black uppercase tracking-[0.2em] text-primary">
                  Aura Glow
                </p>
                <p className="text-muted-foreground">bg-primary/20 blur-3xl</p>
                <p className="text-muted-foreground">opacity-0 group-hover:opacity-100</p>
              </div>
              <div className="rounded-lg border border-border bg-muted/30 p-4">
                <p className="mb-2 text-[10px] font-black uppercase tracking-[0.2em] text-primary">
                  Heights
                </p>
                <p className="text-muted-foreground">h-14 (buttons), h-20 (topbar)</p>
                <p className="text-muted-foreground">h-[2px] (hairline indicator)</p>
              </div>
              <div className="rounded-lg border border-border bg-muted/30 p-4">
                <p className="mb-2 text-[10px] font-black uppercase tracking-[0.2em] text-primary">
                  Spacing
                </p>
                <p className="text-muted-foreground">p-8 (cards), gap-6/8 (grids)</p>
                <p className="text-muted-foreground">px-10 (buttons)</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </>
  );
};

/**
 * InputsButtonsShowcase - Buttons Luxe and Search Input demos
 */

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Icon } from '@/components/ui/icon';
import { BookDetailSheetDemo } from '../molecules';

export const InputsButtonsShowcase: React.FC = () => {
  return (
    <>
      {/* Buttons Luxe */}
      <section>
        <Card>
          <CardHeader>
            <CardTitle>Botões Luxe</CardTitle>
            <CardDescription>Padrão de botões com tipografia uppercase e tracking</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-wrap gap-4">
              <Button className="h-14 bg-foreground px-10 text-sm font-black uppercase tracking-[0.25em] text-background shadow-lg transition-all duration-300 hover:bg-foreground/90 hover:shadow-xl active:scale-[0.98]">
                Primário
              </Button>
              <Button
                variant="outline"
                className="h-14 border-border px-10 text-sm font-black uppercase tracking-[0.25em] transition-all duration-300 hover:border-primary/40 hover:bg-primary/5 active:scale-[0.98]"
              >
                Secundário
              </Button>
              <Button
                variant="outline"
                className="h-14 rounded-full border-primary/30 bg-primary/10 px-10 text-sm font-black uppercase tracking-[0.25em] text-primary transition-all duration-300 hover:bg-primary/20 active:scale-[0.98]"
              >
                Gold Pill
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Search Input Luxe */}
      <section>
        <Card>
          <CardHeader>
            <CardTitle>Search Input</CardTitle>
            <CardDescription>Input com glow no focus</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="group relative max-w-md">
              <div className="absolute -inset-0.5 rounded-2xl bg-primary/0 opacity-0 blur-xl transition-all duration-500 group-focus-within:bg-primary/10 group-focus-within:opacity-100" />
              <div className="relative">
                <Icon
                  name="search"
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors duration-300 group-focus-within:text-primary/70"
                  size="size-4"
                />
                <Input
                  placeholder="BUSCAR..."
                  className="h-14 rounded-2xl border-border bg-muted/30 pl-14 pr-14 text-base font-light tracking-wide outline-none ring-0 transition-all duration-300 placeholder:text-sm placeholder:font-light placeholder:uppercase placeholder:tracking-[0.15em] placeholder:text-muted-foreground hover:border-border/80 focus:border-primary/30 focus:bg-muted/50 focus:ring-0 dark:bg-muted/10 dark:focus:bg-muted/20"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* BookDetailSheet */}
      <section>
        <Card>
          <CardHeader>
            <CardTitle>BookDetailSheet</CardTitle>
            <CardDescription>
              <code>components/books/ui/BookDetailSheet.tsx</code> — Slide-out panel com hero blur
            </CardDescription>
          </CardHeader>
          <CardContent>
            <BookDetailSheetDemo />
          </CardContent>
        </Card>
      </section>
    </>
  );
};

/**
 * HeroSectionView
 * Design System - Hero Section Showcase
 */

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Symbol } from '@/components/ui/symbol';

export function HeroSectionView() {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-zinc-950 text-white shadow-2xl">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')] bg-cover bg-center opacity-30" />
      {/* Gradient to ensure text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent" />

      <div className="relative z-10 flex flex-col items-center space-y-8 p-6 text-center md:p-12 lg:p-24">
        <Badge
          variant="outline"
          className="animate-fade-in border-primary/50 bg-primary/20 px-4 py-1.5 text-primary-foreground backdrop-blur-md"
        >
          <Symbol name="star" className="mr-2" />
          Academia Lendaria v4.1
        </Badge>

        <h1
          className="max-w-4xl animate-fade-in font-sans text-4xl font-bold tracking-tight text-white drop-shadow-lg md:text-5xl lg:text-7xl"
          style={{ animationDelay: '100ms' }}
        >
          Crie o <span className="text-gradient-brand">Lendario</span>.
        </h1>

        <p
          className="max-w-2xl animate-fade-in font-serif text-lg leading-relaxed text-zinc-300 drop-shadow-md md:text-xl lg:text-2xl"
          style={{ animationDelay: '200ms' }}
        >
          Um ecossistema de design feito para escalar com elegancia, precisao e performance.
        </p>

        <div
          className="flex w-full animate-fade-in flex-col gap-4 pt-4 sm:w-auto sm:flex-row"
          style={{ animationDelay: '300ms' }}
        >
          <Button size="lg" className="h-14 w-full px-8 text-lg shadow-xl shadow-primary/10 sm:w-auto">
            Comecar Agora
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="h-14 w-full border-white/20 bg-transparent px-8 text-lg text-white backdrop-blur-sm transition-all duration-300 hover:bg-white hover:text-black sm:w-auto"
          >
            <Icon name="play" className="mr-2" /> Demo
          </Button>
        </div>
      </div>
    </section>
  );
}

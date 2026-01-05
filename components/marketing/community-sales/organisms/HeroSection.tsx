import React from 'react';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';

export const HeroSection: React.FC = () => (
  <section className="relative overflow-hidden border-b border-white/10 bg-gradient-to-b from-[#050505] to-[#121212] px-4 py-20 text-white md:px-8">
    <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />

    <div className="relative z-10 mx-auto max-w-5xl space-y-10 text-center">
      <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-semibold tracking-wide text-primary backdrop-blur-sm">
        <Icon name="sparkles" size="size-4" />
        <span>A Janela de Oportunidade Esta Fechando</span>
      </div>

      <div className="space-y-6">
        <h1 className="text-4xl font-bold leading-[1.1] tracking-tight md:text-6xl lg:text-7xl">
          Sua Experiencia de 20 Anos E <br />
          <span className="bg-gradient-to-r from-primary via-brand-yellow to-primary bg-clip-text text-transparent">
            Vantagem Competitiva
          </span>
        </h1>
        <p className="mx-auto max-w-3xl font-serif text-xl leading-relaxed text-zinc-400 md:text-2xl">
          Se voce souber usar IA para multiplica-la. O ecossistema que 20.000+ profissionais
          usaram para transformar decadas de bagagem em resultado real.
        </p>
      </div>

      <div className="group relative mx-auto aspect-video max-w-4xl cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-black shadow-[0_0_50px_rgba(201,178,152,0.1)] ring-1 ring-white/5">
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary/90 pl-2 shadow-lg shadow-primary/30 backdrop-blur-sm transition-transform group-hover:scale-110">
            <Icon name="play" className="text-4xl text-white" type="solid" />
          </div>
        </div>
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-transparent to-transparent" />
        <img
          src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop"
          className="h-full w-full object-cover opacity-60 transition-opacity duration-500 group-hover:opacity-40"
          alt="Video Thumbnail"
        />
      </div>

      <div className="pt-4">
        <Button
          size="lg"
          className="h-20 animate-pulse-slow px-12 text-xl font-bold uppercase tracking-wider shadow-[0_0_30px_rgba(201,178,152,0.3)]"
        >
          Quero Entrar na Comunidade Lendaria <Icon name="arrow-right" className="ml-2" />
        </Button>
        <p className="mt-4 text-xs uppercase tracking-widest text-zinc-500">
          Acesso Imediato - 30 Dias de Garantia - Cancelamento Gratis
        </p>
      </div>
    </div>
  </section>
);

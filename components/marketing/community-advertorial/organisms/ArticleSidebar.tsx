import React from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Symbol } from '@/components/ui/symbol';
import { ALAN_AVATAR, RELATED_ARTICLES } from '../data';

export const ArticleSidebar: React.FC = () => (
  <aside className="space-y-8 lg:col-span-4">
    <div className="sticky top-24 space-y-8">
      {/* Author Bio */}
      <div className="rounded-xl border border-border bg-card p-6 text-center shadow-md">
        <div className="relative mx-auto mb-4 h-24 w-24 overflow-hidden rounded-full border-2 border-primary">
          <Avatar className="h-full w-full">
            <AvatarImage src={ALAN_AVATAR} />
            <AvatarFallback>AN</AvatarFallback>
          </Avatar>
        </div>
        <h4 className="font-sans text-lg font-bold">Alan Nicolas</h4>
        <p className="mb-4 text-xs font-bold uppercase tracking-widest text-primary">Fundador</p>
        <p className="mb-6 font-sans text-sm font-medium leading-relaxed text-muted-foreground">
          Empresario com R$200M+ em vendas e mentor de 20.000 lideres. Sua missao e
          imortalizar o legado de profissionais experientes atraves da Inteligencia
          Artificial.
        </p>
        <Button variant="outline" className="w-full text-xs">
          Seguir no LinkedIn
        </Button>
      </div>

      {/* Urgency Box */}
      <div className="group relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-zinc-900 to-zinc-950 p-6 text-white shadow-xl">
        <div className="absolute right-0 top-0 p-4 opacity-10">
          <Symbol name="infinity" className="text-8xl" />
        </div>
        <div className="relative z-10 space-y-4">
          <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary">
            <span className="h-2 w-2 animate-pulse rounded-full bg-primary" /> Vagas Abertas
          </p>
          <h4 className="font-sans text-xl font-bold leading-tight">
            Nao deixe sua experiencia se tornar obsoleta.
          </h4>
          <p className="font-sans text-sm font-medium text-zinc-400">
            A proxima turma da Comunidade Lendaria comeca em breve. Garanta sua condicao
            especial.
          </p>
          <Button className="w-full bg-white font-bold text-black hover:bg-zinc-200">
            Ver Detalhes
          </Button>
        </div>
      </div>

      {/* Related */}
      <div className="space-y-4 border-t border-border pt-4">
        <h5 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
          Leia Tambem
        </h5>
        {RELATED_ARTICLES.map((article, i) => (
          <a key={i} href="#" className="group block">
            <h6 className="text-sm font-bold transition-colors group-hover:text-primary">
              {article.title}
            </h6>
            <p className="text-xs text-muted-foreground">
              {article.category} - {article.readTime}
            </p>
          </a>
        ))}
      </div>
    </div>
  </aside>
);

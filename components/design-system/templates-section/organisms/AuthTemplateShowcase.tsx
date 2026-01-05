/**
 * AuthTemplateShowcase - Authentication page template demo
 */

import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Icon } from '@/components/ui/icon';
import { Symbol } from '@/components/ui/symbol';

export const AuthTemplateShowcase: React.FC = () => {
  return (
    <div className="relative flex h-[700px] w-full flex-col overflow-hidden rounded-xl border border-border bg-background shadow-2xl lg:flex-row">
      {/* Visual Side (Left) */}
      <div className="relative flex w-full flex-col justify-between overflow-hidden bg-zinc-900 p-12 text-white lg:w-1/2">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1614728263952-84ea256f9679?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-40"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent"></div>

        <div className="relative z-10 flex items-center gap-2">
          <Symbol name="infinity" className="text-2xl text-white" />
          <span className="font-sans text-lg font-bold tracking-tight">
            Academia Lendar[IA]
          </span>
        </div>

        <div className="relative z-10 space-y-6">
          <h1 className="font-sans text-4xl font-bold leading-tight md:text-5xl">
            Imortalize seu legado com inteligencia artificial.
          </h1>
          <p className="font-serif text-lg text-zinc-300">
            Junte-se a lideres que usam IA para escalar resultados e liberar tempo para o que
            realmente importa.
          </p>
        </div>

        <div className="relative z-10 flex items-center gap-4 text-sm text-zinc-400">
          <span>&copy; 2025 The Legends & Co.</span>
        </div>
      </div>

      {/* Form Side (Right) */}
      <div className="flex w-full flex-col justify-center bg-card p-8 md:p-12 lg:w-1/2 lg:p-24">
        <div className="mx-auto w-full max-w-sm space-y-8">
          <div className="space-y-2 text-center">
            <h2 className="font-sans text-2xl font-bold">Acesse sua conta</h2>
            <p className="text-sm text-muted-foreground">
              Entre com suas credenciais para continuar.
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" placeholder="nome@exemplo.com" type="email" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Senha</Label>
                <Button variant="link" className="h-auto px-0 text-xs">
                  Esqueceu a senha?
                </Button>
              </div>
              <Input id="password" type="password" />
            </div>
            <Button className="w-full" size="lg">
              Entrar na Plataforma
            </Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">Ou continue com</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="w-full">
              <Icon name="google" type="brands" className="mr-2" /> Google
            </Button>
            <Button variant="outline" className="w-full">
              <Icon name="apple" type="brands" className="mr-2" /> Apple
            </Button>
          </div>

          <p className="px-8 text-center text-sm text-muted-foreground">
            Ao clicar em continuar, voce concorda com nossos{' '}
            <a href="#" className="underline hover:text-primary">
              Termos de Servico
            </a>{' '}
            e{' '}
            <a href="#" className="underline hover:text-primary">
              Politica de Privacidade
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

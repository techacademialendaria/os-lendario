/**
 * LoginCard - Main card container organism
 */

import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import type { LoginCardProps } from '../types';

export const LoginCard: React.FC<LoginCardProps> = ({
  view,
  error,
  success,
  children,
  onViewChange,
}) => {
  return (
    <Card className="w-full bg-card/95 backdrop-blur-3xl border border-border shadow-2xl dark:shadow-[0_50px_100px_rgba(0,0,0,0.8)] rounded-[2rem] overflow-hidden">
      {/* Inner glow border */}
      <div className="absolute inset-[1px] rounded-[2rem] border border-border/30 pointer-events-none" />

      <CardHeader className="pt-10 pb-4 px-8">
        <p className="text-center text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground mb-2">
          Lendar[IA] OS
        </p>
      </CardHeader>

      <CardContent className="px-8 pb-4">
        {/* Error Message */}
        {error && (
          <div className="mb-8 rounded-xl border border-red-500/20 bg-red-500/5 p-4 text-sm text-red-400/90 font-light tracking-wide animate-fade-in">
            {error}
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="mb-8 rounded-xl border border-green-500/20 bg-green-500/5 p-4 text-sm text-green-400/90 font-light tracking-wide animate-fade-in">
            {success}
          </div>
        )}

        {children}
      </CardContent>

      <CardFooter className="flex flex-col gap-4 pb-10 pt-6 px-8">
        <div className="flex items-center justify-center gap-3 text-[11px] font-bold uppercase tracking-[0.25em] text-muted-foreground">
          {view === 'login' ? (
            <>
              <span>Novo aqui?</span>
              <button
                onClick={() => onViewChange('register')}
                className="text-primary hover:text-primary/80 transition-colors duration-200"
              >
                Criar conta
              </button>
            </>
          ) : (
            <>
              <span>Ja tem conta?</span>
              <button
                onClick={() => onViewChange('login')}
                className="text-primary hover:text-primary/80 transition-colors duration-200"
              >
                Fazer login
              </button>
            </>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

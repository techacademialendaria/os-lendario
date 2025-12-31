import React from 'react';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Icon } from '../../ui/icon';
import { Card, CardContent } from '../../ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '../../ui/avatar';
import { Progress } from '../../ui/progress';
import { CLONES } from './data';
import { cn } from '../../../lib/utils';

// Helper: Extract initials from full name (e.g., "Steve Jobs" -> "SJ")
const getInitials = (name: string): string => {
  return name
    .trim()
    .split(/\s+/)
    .map((word) => word[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
};

interface ArenaLobbyProps {
  onCreateClick: () => void;
  onViewFrameworks?: () => void;
}

export const ArenaLobby: React.FC<ArenaLobbyProps> = ({ onCreateClick, onViewFrameworks }) => {
  return (
    <div className="animate-fade-in space-y-8">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-8 text-center md:p-16">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
        <div className="pointer-events-none absolute left-1/2 top-0 h-full w-full -translate-x-1/2 bg-gradient-to-b from-primary/5 via-transparent to-transparent"></div>

        <div className="relative z-10 space-y-6">
          <Badge
            variant="outline"
            className="border-primary/30 bg-primary/5 px-4 py-1 uppercase tracking-widest text-primary"
          >
            Beta v1.0
          </Badge>
          <h1 className="text-5xl font-black tracking-tighter text-foreground md:text-7xl">
            CLONE{' '}
            <span className="bg-gradient-to-r from-primary to-yellow-200 bg-clip-text text-transparent">
              ARENA
            </span>
          </h1>
          <p className="mx-auto max-w-2xl font-serif text-xl text-muted-foreground">
            Onde mentes lendárias debatem ideias em tempo real. Assista, vote e aprenda com a
            colisão de intelectos sintéticos.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 pt-4 sm:flex-row">
            <Button
              size="lg"
              className="h-14 bg-primary px-10 text-lg font-bold text-primary-foreground shadow-lg hover:bg-primary/90"
              onClick={onCreateClick}
            >
              <Icon name="flash" className="mr-2" /> Criar Debate
            </Button>
            {onViewFrameworks && (
              <Button
                size="lg"
                variant="outline"
                className="h-14 border-primary/30 px-10 text-lg font-bold hover:border-primary hover:bg-primary/5"
                onClick={onViewFrameworks}
              >
                <Icon name="library" className="mr-2" /> Explorar Frameworks
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Active Debates */}
        <div className="space-y-6 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h3 className="flex items-center gap-2 text-xl font-bold text-foreground">
              <Icon name="flash" className="text-destructive" /> Ao Vivo Agora
            </h3>
            <Button variant="link" className="text-muted-foreground">
              Ver Todos
            </Button>
          </div>

          <div className="grid gap-4">
            {[1, 2].map((_, i) => (
              <Card
                key={i}
                className="group cursor-pointer border-border bg-card transition-all hover:border-primary/50"
              >
                <CardContent className="p-6">
                  <div className="mb-4 flex items-start justify-between">
                    <Badge variant="destructive" className="animate-pulse">
                      LIVE
                    </Badge>
                    <span className="flex items-center gap-1 font-mono text-xs text-muted-foreground">
                      <Icon name="users" size="size-3" /> 1.2k watching
                    </span>
                  </div>
                  <h4 className="mb-6 text-lg font-bold text-foreground transition-colors group-hover:text-primary">
                    "A IA deve ser Open Source ou Proprietária?"
                  </h4>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="border-2 border-brand-cyan">
                        <AvatarFallback>EM</AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-bold text-foreground">Musk</span>
                    </div>
                    <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                      VS
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold text-foreground">Altman</span>
                      <Avatar className="border-2 border-brand-blue">
                        <AvatarFallback>SA</AvatarFallback>
                      </Avatar>
                    </div>
                  </div>
                  <div className="mt-6">
                    <div className="mb-1 flex justify-between text-[10px] font-bold uppercase text-muted-foreground">
                      <span>Musk (52%)</span>
                      <span>Round 3/5</span>
                      <span>Altman (48%)</span>
                    </div>
                    <Progress value={52} className="h-1 bg-muted" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Leaderboard */}
        <div className="space-y-6">
          <h3 className="flex items-center gap-2 text-xl font-bold text-foreground">
            <Icon name="trophy" className="text-primary" /> Ranking Global
          </h3>
          <Card className="border-border bg-card">
            <CardContent className="p-0">
              {CLONES.sort((a, b) => b.winRate - a.winRate)
                .slice(0, 5)
                .map((clone, i) => (
                  <div
                    key={clone.id}
                    className="flex items-center gap-4 border-b border-border p-4 transition-colors last:border-0 hover:bg-muted/20"
                  >
                    <span
                      className={cn(
                        'w-6 text-center text-lg font-black',
                        i === 0
                          ? 'text-primary'
                          : i === 1
                            ? 'text-foreground'
                            : i === 2
                              ? 'text-amber-700'
                              : 'text-muted-foreground'
                      )}
                    >
                      {i + 1}
                    </span>
                    <Avatar className="h-10 w-10 border border-border">
                      {clone.avatar?.startsWith('/') && (
                        <AvatarImage src={clone.avatar} alt={clone.name} />
                      )}
                      <AvatarFallback className="bg-card text-xs font-bold text-muted-foreground">
                        {clone.avatar?.startsWith('/') ? getInitials(clone.name) : clone.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-foreground">{clone.name}</p>
                      <p className="text-[10px] text-muted-foreground">{clone.debates} debates</p>
                    </div>
                    <Badge
                      variant="outline"
                      className="border-border font-mono text-muted-foreground"
                    >
                      {clone.winRate}% WR
                    </Badge>
                  </div>
                ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

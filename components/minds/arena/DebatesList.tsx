import React from 'react';
import { Card, CardContent } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Icon } from '../../ui/icon';
import { Avatar, AvatarImage, AvatarFallback } from '../../ui/avatar';
import { Skeleton } from '../../ui/skeleton';
import { cn } from '../../../lib/utils';
import { type ArenaState, type SavedDebate } from '../../../hooks/useArena';
import { type Debate } from '../../../hooks/useDebates';

interface DebatesListProps {
  state: ArenaState;
}

const getInitials = (name: string): string => {
  return name
    .trim()
    .split(/\s+/)
    .map((word) => word[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
};

export const DebatesList: React.FC<DebatesListProps> = ({ state }) => {
  const {
    minds,
    allDebates,
    debatesLoading,
    handleWatchReplay,
    setView,
  } = state;

  return (
    <div className="space-y-6">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-8 text-center md:p-16">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        <div className="pointer-events-none absolute left-1/2 top-0 h-full w-full -translate-x-1/2 bg-gradient-to-b from-primary/5 via-transparent to-transparent"></div>

        <div className="relative z-10 space-y-6">
          <Badge
            variant="outline"
            className="border-primary/30 bg-primary/5 px-4 py-1 uppercase tracking-widest text-primary"
          >
            Beta v1.0
          </Badge>
          <h1 className="text-5xl font-black tracking-tighter text-foreground md:text-7xl">
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              ARENA
            </span>
          </h1>
          <p className="mx-auto max-w-2xl font-serif text-xl text-muted-foreground">
            Onde mentes lendarias debatem ideias em tempo real. Assista, vote e aprenda com a
            colisao de intelectos sinteticos.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 pt-4 sm:flex-row">
            <Button
              size="lg"
              className="h-14 px-10 text-lg font-bold"
              onClick={() => setView('create')}
            >
              <Icon name="bolt" className="mr-2" /> Criar Debate
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-14 border-primary/30 px-10 text-lg font-bold hover:border-primary hover:bg-primary/5"
              onClick={() => setView('frameworks')}
            >
              <Icon name="library" className="mr-2" /> Explorar Frameworks
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Active Debates */}
        <div className="space-y-6 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h3 className="flex items-center gap-2 text-xl font-bold text-foreground">
              <Icon name="flash" className="text-red-500" /> Ao Vivo Agora
            </h3>
            <Button variant="link" className="text-muted-foreground">
              Ver Todos
            </Button>
          </div>

          <div className="grid gap-4">
            {minds.length >= 3 && (
              <>
                <Card className="border-border bg-card p-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold">A IA deve ser Open Source ou Proprietaria?</h4>
                      <Badge>Round 3/5</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={minds[0]?.avatar} alt={minds[0]?.name} />
                          <AvatarFallback>{getInitials(minds[0]?.name || '')}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm">{minds[0]?.name}</span>
                      </div>
                      <span className="text-sm font-bold">52%</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold">48%</span>
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={minds[2]?.avatar} alt={minds[2]?.name} />
                          <AvatarFallback>{getInitials(minds[2]?.name || '')}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm">{minds[2]?.name}</span>
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      👁️ 1.234 assistindo agora
                    </div>
                  </div>
                </Card>

                <Card className="border-border bg-card p-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold">O futuro do trabalho e remote ou presencial?</h4>
                      <Badge>Round 2/5</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={minds[1]?.avatar} alt={minds[1]?.name} />
                          <AvatarFallback>{getInitials(minds[1]?.name || '')}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm">{minds[1]?.name}</span>
                      </div>
                      <span className="text-sm font-bold">61%</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold">39%</span>
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={minds[4]?.avatar} alt={minds[4]?.name} />
                          <AvatarFallback>{getInitials(minds[4]?.name || '')}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm">{minds[4]?.name}</span>
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      👁️ 876 assistindo agora
                    </div>
                  </div>
                </Card>
              </>
            )}
          </div>
        </div>

        {/* Leaderboard */}
        <div className="space-y-6">
          <h3 className="flex items-center gap-2 text-xl font-bold text-foreground">
            <Icon name="trophy" className="text-studio-primary" /> Ranking Global
          </h3>
          <Card className="border-border bg-card">
            <CardContent className="p-0">
              {minds
                .sort((a) => a.winRate * -1)
                .slice(0, 10)
                .map((mind, i) => (
                  <div
                    key={mind.id}
                    className="flex items-center gap-4 border-b border-border p-4 transition-colors last:border-0 hover:bg-muted/50"
                  >
                    <span
                      className={cn(
                        'w-6 text-center text-lg font-black',
                        i === 0
                          ? 'text-studio-primary'
                          : i === 1
                            ? 'text-zinc-300'
                            : i === 2
                              ? 'text-amber-700'
                              : 'text-muted-foreground',
                      )}
                    >
                      {i + 1}
                    </span>
                    <Avatar className="h-10 w-10 border border-border">
                      <AvatarImage src={mind.avatar} alt={mind.name} />
                      <AvatarFallback className="bg-muted text-xs font-bold text-muted-foreground">
                        {getInitials(mind.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-foreground">{mind.name}</p>
                      <p className="text-[10px] text-muted-foreground">{mind.debates} debates</p>
                    </div>
                    <Badge
                      variant="outline"
                      className="border-border font-mono text-muted-foreground"
                    >
                      {mind.winRate}% WR
                    </Badge>
                  </div>
                ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Replays Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="flex items-center gap-2 text-xl font-bold text-foreground">
            <Icon name="play-circle" className="text-primary" /> Debates Anteriores
          </h3>
          <Badge variant="outline" className="text-muted-foreground">
            {debatesLoading ? '...' : allDebates.length} replays
          </Badge>
        </div>

        {debatesLoading ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {[1, 2].map((i) => (
              <Card key={i} className="border-border bg-card">
                <CardContent className="space-y-4 p-6">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-4 w-32" />
                  <div className="flex justify-between">
                    <Skeleton className="h-8 w-24" />
                    <Skeleton className="h-8 w-24" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {allDebates.map((debate) => {
              const m1 = minds.find((m) => m.id === debate.mind1.id);
              const m2 = minds.find((m) => m.id === debate.mind2.id);

              return (
                <Card
                  key={debate.id}
                  className="group cursor-pointer border-border bg-card transition-all hover:border-primary/30"
                  onClick={() => handleWatchReplay(debate)}
                >
                  <CardContent className="p-6">
                    <div className="mb-4 flex items-start justify-between">
                      <Badge variant="secondary" className="bg-muted">
                        <Icon name="play" size="size-3" className="mr-1" /> Replay
                      </Badge>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Icon name="eye" size="size-3" /> {debate.views.toLocaleString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <Icon name="star" size="size-3" className="text-yellow-500" />{' '}
                          {debate.rating}
                        </span>
                      </div>
                    </div>

                    <h4 className="mb-2 line-clamp-2 text-base font-bold text-foreground transition-colors group-hover:text-primary">
                      "{debate.topic}"
                    </h4>

                    <div className="mb-4 flex items-center gap-2 text-xs text-muted-foreground">
                      <Badge variant="outline" className="text-[10px]">
                        {debate.framework}
                      </Badge>
                      <span>{debate.rounds.length} rounds</span>
                      <span>{debate.date}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8 border border-border">
                          <AvatarImage
                            src={(debate.mind1 as any).avatar || m1?.avatar}
                            alt={debate.mind1.name}
                          />
                          <AvatarFallback className={cn('bg-muted text-xs font-bold', m1?.color)}>
                            {getInitials(debate.mind1.name)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-xs font-medium text-muted-foreground">
                          {debate.mind1.name.split(' ')[1]}
                        </span>
                      </div>
                      <span className="text-[10px] font-bold uppercase text-muted-foreground/50">
                        vs
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium text-muted-foreground">
                          {debate.mind2.name.split(' ')[1]}
                        </span>
                        <Avatar className="h-8 w-8 border border-border">
                          <AvatarImage
                            src={(debate.mind2 as any).avatar || m2?.avatar}
                            alt={debate.mind2.name}
                          />
                          <AvatarFallback className={cn('bg-muted text-xs font-bold', m2?.color)}>
                            {getInitials(debate.mind2.name)}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default DebatesList;

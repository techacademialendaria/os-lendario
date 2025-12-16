
import React from 'react';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Icon } from '../../ui/icon';
import { Card, CardContent } from '../../ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '../../ui/avatar';
import { Progress } from '../../ui/progress';
import { CLONES } from './data';
import { cn } from '../../../lib/utils';

interface ArenaLobbyProps {
    onCreateClick: () => void;
}

export const ArenaLobby: React.FC<ArenaLobbyProps> = ({ onCreateClick }) => {
    return (
      <div className="space-y-8 animate-fade-in">
        {/* Hero */}
        <div className="relative rounded-2xl overflow-hidden bg-card border border-border p-8 md:p-16 text-center">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none"></div>

          <div className="relative z-10 space-y-6">
            <Badge variant="outline" className="border-primary/30 text-primary bg-primary/5 uppercase tracking-widest px-4 py-1">
              Beta v1.0
            </Badge>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-foreground">
              CLONE <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-yellow-200">ARENA</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-serif">
              Onde mentes lendárias debatem ideias em tempo real. Assista, vote e aprenda com a colisão de intelectos sintéticos.
            </p>
            <div className="pt-4">
              <Button
                size="lg"
                className="h-14 px-10 text-lg font-bold bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg"
                onClick={onCreateClick}
              >
                <Icon name="sword" className="mr-2" /> Criar Debate
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Active Debates */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                <Icon name="flame" className="text-destructive" /> Ao Vivo Agora
              </h3>
              <Button variant="link" className="text-muted-foreground">Ver Todos</Button>
            </div>

            <div className="grid gap-4">
              {[1, 2].map((_, i) => (
                <Card key={i} className="bg-card border-border hover:border-primary/50 transition-all cursor-pointer group">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <Badge variant="destructive" className="animate-pulse">LIVE</Badge>
                      <span className="text-xs font-mono text-muted-foreground flex items-center gap-1">
                        <Icon name="users" size="size-3" /> 1.2k watching
                      </span>
                    </div>
                    <h4 className="text-lg font-bold text-foreground mb-6 group-hover:text-primary transition-colors">
                      "A IA deve ser Open Source ou Proprietária?"
                    </h4>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="border-2 border-brand-cyan">
                          <AvatarFallback>EM</AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-bold text-foreground">Musk</span>
                      </div>
                      <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest">VS</div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-bold text-foreground">Altman</span>
                        <Avatar className="border-2 border-brand-blue">
                          <AvatarFallback>SA</AvatarFallback>
                        </Avatar>
                      </div>
                    </div>
                    <div className="mt-6">
                      <div className="flex justify-between text-[10px] uppercase font-bold text-muted-foreground mb-1">
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
            <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
              <Icon name="trophy" className="text-primary" /> Ranking Global
            </h3>
            <Card className="bg-card border-border">
              <CardContent className="p-0">
                {CLONES.sort((a, b) => b.winRate - a.winRate)
                  .slice(0, 5)
                  .map((clone, i) => (
                    <div
                      key={clone.id}
                      className="flex items-center gap-4 p-4 border-b border-border last:border-0 hover:bg-muted/20 transition-colors"
                    >
                      <span
                        className={cn(
                          "text-lg font-black w-6 text-center",
                          i === 0 ? "text-primary" : i === 1 ? "text-foreground" : i === 2 ? "text-amber-700" : "text-muted-foreground"
                        )}
                      >
                        {i + 1}
                      </span>
                      <Avatar className="w-10 h-10 border border-border">
                        {clone.avatar?.startsWith('/') ? (
                          <>
                            <AvatarImage src={clone.avatar} alt={clone.name} />
                            <AvatarFallback className="bg-card text-xs font-bold text-muted-foreground">
                              {clone.name.substring(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </>
                        ) : (
                          <AvatarFallback className="bg-card text-xs font-bold text-muted-foreground">
                            {clone.avatar}
                          </AvatarFallback>
                        )}
                      </Avatar>
                      <div className="flex-1">
                        <p className="text-sm font-bold text-foreground">{clone.name}</p>
                        <p className="text-[10px] text-muted-foreground">{clone.debates} debates</p>
                      </div>
                      <Badge variant="outline" className="font-mono border-border text-muted-foreground">
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

import React from 'react';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Icon } from '../../ui/icon';
import { Avatar, AvatarImage, AvatarFallback } from '../../ui/avatar';
import { ScrollArea } from '../../ui/scroll-area';
import { Separator } from '../../ui/separator';
import { cn } from '../../../lib/utils';
import type { Mind } from '../../../hooks/useArena';

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

// SavedDebate type for replay functionality
export interface SavedDebate {
  id: string;
  topic: string;
  framework: string;
  date: string;
  mind1: { id: string; name: string; role: string; avatar?: string };
  mind2: { id: string; name: string; role: string; avatar?: string };
  rounds: Array<{
    number: number;
    type: string;
    mind1Argument: string;
    mind2Argument: string;
  }>;
  views: number;
  rating: number;
}

export interface ArenaReplayViewProps {
  selectedReplay: SavedDebate | null;
  minds: Mind[];
  onBack: () => void;
}

export function ArenaReplayView({ selectedReplay, minds, onBack }: ArenaReplayViewProps) {
  if (!selectedReplay) return null;

  const m1 = minds.find((m) => m.id === selectedReplay.mind1.id);
  const m2 = minds.find((m) => m.id === selectedReplay.mind2.id);

  return (
    <div className="animate-in fade-in flex h-[calc(100vh-200px)] flex-col duration-500">
      {/* Header */}
      <div className="flex items-center justify-between rounded-t-2xl border-b border-border bg-card p-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <Icon name="arrow-left" />
          </Button>
          <div>
            <div className="mb-1 flex items-center gap-2">
              <Badge variant="secondary" className="bg-muted">
                <Icon name="play" size="size-3" className="mr-1" /> Replay
              </Badge>
              <Badge variant="outline">{selectedReplay.framework}</Badge>
              <Badge variant="outline">{selectedReplay.rounds.length} rounds</Badge>
            </div>
            <h2 className="text-lg font-bold text-foreground">{selectedReplay.topic}</h2>
          </div>
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Icon name="eye" size="size-4" /> {selectedReplay.views.toLocaleString()}
          </span>
          <span className="flex items-center gap-1">
            <Icon name="star" size="size-4" className="text-yellow-500" /> {selectedReplay.rating}
          </span>
          <span>{selectedReplay.date}</span>
        </div>
      </div>

      {/* Participants Bar */}
      <div className="flex items-center justify-center gap-8 border-b border-border bg-muted/30 p-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 border-2 border-border">
            <AvatarImage src={m1?.avatar} alt={selectedReplay.mind1.name} />
            <AvatarFallback className={cn('bg-muted font-bold', m1?.color)}>
              {getInitials(selectedReplay.mind1.name)}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-bold text-foreground">{selectedReplay.mind1.name}</p>
            <p className="text-xs text-muted-foreground">{selectedReplay.mind1.role}</p>
          </div>
        </div>
        <span className="text-xl font-black text-muted-foreground/30">VS</span>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="font-bold text-foreground">{selectedReplay.mind2.name}</p>
            <p className="text-xs text-muted-foreground">{selectedReplay.mind2.role}</p>
          </div>
          <Avatar className="h-10 w-10 border-2 border-border">
            <AvatarImage src={m2?.avatar} alt={selectedReplay.mind2.name} />
            <AvatarFallback className={cn('bg-muted font-bold', m2?.color)}>
              {getInitials(selectedReplay.mind2.name)}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* Debate Timeline */}
      <div className="flex-1 overflow-hidden rounded-b-2xl border border-t-0 border-border bg-card">
        <ScrollArea className="h-full">
          <div className="mx-auto max-w-4xl space-y-6 px-6 py-8">
            {selectedReplay.rounds.map((round, roundIdx) => (
              <div key={roundIdx} className="space-y-6">
                {/* Round Header */}
                <div className="flex items-center gap-4 py-4">
                  <Separator className="flex-1" />
                  <Badge
                    variant="outline"
                    className="px-4 py-1 text-xs font-bold uppercase tracking-widest"
                  >
                    Round {round.number} - {round.type}
                  </Badge>
                  <Separator className="flex-1" />
                </div>

                {/* Mind 1 Argument */}
                <div className="flex gap-4">
                  <Avatar className="mt-1 h-10 w-10 shrink-0 border-2 border-border">
                    <AvatarImage src={m1?.avatar} alt={selectedReplay.mind1.name} />
                    <AvatarFallback className={cn('bg-muted text-sm font-bold', m1?.color)}>
                      {getInitials(selectedReplay.mind1.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-baseline gap-2">
                      <span className="font-bold text-foreground">{selectedReplay.mind1.name}</span>
                      <span className="text-xs text-muted-foreground">Round {round.number}</span>
                    </div>
                    <div className="rounded-2xl rounded-tl-sm border border-border/50 bg-muted/20 p-4">
                      <p className="whitespace-pre-line font-serif leading-relaxed text-foreground">
                        {round.mind1Argument}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Mind 2 Argument */}
                <div className="flex flex-row-reverse gap-4">
                  <Avatar className="mt-1 h-10 w-10 shrink-0 border-2 border-border">
                    <AvatarImage src={m2?.avatar} alt={selectedReplay.mind2.name} />
                    <AvatarFallback className={cn('bg-muted text-sm font-bold', m2?.color)}>
                      {getInitials(selectedReplay.mind2.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-baseline justify-end gap-2">
                      <span className="text-xs text-muted-foreground">Round {round.number}</span>
                      <span className="font-bold text-foreground">{selectedReplay.mind2.name}</span>
                    </div>
                    <div className="rounded-2xl rounded-tr-sm border border-primary/10 bg-primary/5 p-4">
                      <p className="whitespace-pre-line font-serif leading-relaxed text-foreground">
                        {round.mind2Argument}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* End of Debate */}
            <div className="flex items-center gap-4 py-8">
              <Separator className="flex-1" />
              <Badge className="px-4 py-1 text-xs font-bold uppercase tracking-widest">
                Fim do Debate
              </Badge>
              <Separator className="flex-1" />
            </div>
          </div>
        </ScrollArea>
      </div>

      {/* Footer */}
      <div className="mt-4 flex items-center justify-between rounded-2xl border-t border-border bg-card p-4">
        <Button variant="outline" onClick={onBack}>
          <Icon name="arrow-left" className="mr-2" /> Voltar
        </Button>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Icon name="clock" size="size-4" />
          <span>{selectedReplay.rounds.length} rounds completos</span>
        </div>
        <Button variant="outline">
          <Icon name="share" className="mr-2" /> Compartilhar
        </Button>
      </div>
    </div>
  );
}

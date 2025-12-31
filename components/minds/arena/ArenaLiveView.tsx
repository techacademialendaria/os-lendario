import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Icon } from '../../ui/icon';
import { Avatar, AvatarImage, AvatarFallback } from '../../ui/avatar';
import { Progress } from '../../ui/progress';
import { Input } from '../../ui/input';
import { ScrollArea } from '../../ui/scroll-area';
import { cn } from '../../../lib/utils';
import { ChatMessage } from './ChatMessage';
import { Mind, MindHistoryItem, Framework, FRAMEWORKS, getInitials } from './types';

export interface ArenaLiveViewProps {
  // Minds data
  minds: Mind[];
  selectedMind1: string | null;
  selectedMind2: string | null;

  // Debate state
  topic: string;
  framework: string;
  currentRound: number;
  totalRounds: number;
  isStreaming: boolean;
  streamedText: string;
  history: MindHistoryItem[];

  // Poll state
  pollVotes: { c1: number; c2: number };
  userVoted: boolean;

  // Refs
  messagesEndRef: React.RefObject<HTMLDivElement>;

  // Callbacks
  onVote: (mind: 'c1' | 'c2') => void;
  onExit: () => void;
}

export const ArenaLiveView: React.FC<ArenaLiveViewProps> = ({
  minds,
  selectedMind1,
  selectedMind2,
  topic,
  framework,
  currentRound,
  totalRounds,
  isStreaming,
  streamedText,
  history,
  pollVotes,
  userVoted,
  messagesEndRef,
  onVote,
  onExit,
}) => {
  const c1 = minds.find((c) => c.id === selectedMind1);
  const c2 = minds.find((c) => c.id === selectedMind2);

  if (!c1 || !c2) return null;

  const activeSpeaker = isStreaming ? (currentRound % 2 !== 0 ? c1 : c2) : null;
  const debateRound = Math.ceil(currentRound / 2);

  return (
    <div className="animate-in fade-in flex h-[calc(100vh-200px)] flex-col gap-6 duration-500 lg:flex-row">
      {/* Main Stage (Transcript) */}
      <div className="relative flex flex-1 flex-col overflow-hidden rounded-2xl border border-border bg-card">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border bg-muted/30 p-4">
          <div>
            <div className="mb-1 flex items-center gap-2">
              <Badge variant="destructive" className="animate-pulse">
                AO VIVO
              </Badge>
              <span className="font-mono text-xs text-muted-foreground">
                Round {debateRound}/{totalRounds} -{' '}
                {FRAMEWORKS.find((f) => f.id === framework)?.name}
              </span>
            </div>
            <h2 className="text-lg font-bold leading-tight text-foreground">{topic}</h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-2xl font-black text-foreground">
                {pollVotes.c1} <span className="text-sm font-normal text-muted-foreground">vs</span>{' '}
                {pollVotes.c2}
              </div>
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                Votos da Comunidade
              </div>
            </div>
          </div>
        </div>

        {/* Timeline Visualizer */}
        <div className="flex h-1 w-full bg-muted">
          {Array.from({ length: totalRounds }).map((_, i) => (
            <div
              key={i}
              className={cn(
                'flex-1 border-r border-background',
                i + 1 < debateRound
                  ? 'bg-muted-foreground'
                  : i + 1 === debateRound
                    ? 'animate-pulse bg-primary'
                    : 'bg-transparent'
              )}
            />
          ))}
        </div>

        {/* Transcript Area */}
        <ScrollArea className="flex-1 p-6">
          <div className="mx-auto max-w-3xl space-y-8 pb-20">
            {/* History */}
            {history.map((turn, i) => (
              <div
                key={i}
                className={cn(
                  'flex gap-6',
                  turn.speaker.id === c1.id ? 'flex-row' : 'flex-row-reverse'
                )}
              >
                <Avatar className="h-12 w-12 shrink-0 border-2 border-border">
                  <AvatarImage src={turn.speaker.avatar} alt={turn.speaker.name} />
                  <AvatarFallback className="bg-muted text-xs font-bold">
                    {getInitials(turn.speaker.name)}
                  </AvatarFallback>
                </Avatar>
                <div
                  className={cn(
                    'flex-1 space-y-2',
                    turn.speaker.id === c1.id ? 'text-left' : 'text-right'
                  )}
                >
                  <div
                    className="flex items-baseline gap-2"
                    style={{
                      justifyContent: turn.speaker.id === c1.id ? 'flex-start' : 'flex-end',
                    }}
                  >
                    <span className="font-bold text-foreground">{turn.speaker.name}</span>
                    <span className="font-mono text-xs text-muted-foreground">
                      Round {turn.round}
                    </span>
                  </div>
                  <p className="font-serif text-lg leading-relaxed text-muted-foreground">
                    {turn.text}
                  </p>
                </div>
              </div>
            ))}

            {/* Active Streaming */}
            {isStreaming && activeSpeaker && (
              <div
                className={cn(
                  'flex gap-6',
                  activeSpeaker.id === c1.id ? 'flex-row' : 'flex-row-reverse'
                )}
              >
                <Avatar className="h-12 w-12 shrink-0 animate-pulse border-2 border-primary shadow-[0_0_15px_-3px_hsl(var(--primary)/0.5)]">
                  <AvatarFallback className="bg-muted font-bold text-foreground">
                    {getInitials(activeSpeaker.name)}
                  </AvatarFallback>
                </Avatar>
                <div
                  className={cn(
                    'flex-1 space-y-2',
                    activeSpeaker.id === c1.id ? 'text-left' : 'text-right'
                  )}
                >
                  <div
                    className="flex items-baseline gap-2"
                    style={{
                      justifyContent: activeSpeaker.id === c1.id ? 'flex-start' : 'flex-end',
                    }}
                  >
                    <span className="font-bold text-primary">{activeSpeaker.name}</span>
                    <span className="animate-pulse font-mono text-xs text-muted-foreground">
                      Digitando...
                    </span>
                  </div>
                  <p className="font-serif text-lg leading-relaxed text-foreground">
                    {streamedText}
                    <span className="ml-1 inline-block h-5 w-2 animate-pulse bg-primary align-middle" />
                  </p>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Controls Footer */}
        <div className="flex items-center justify-between border-t border-border bg-muted/30 p-4">
          <Button
            variant="ghost"
            onClick={onExit}
            className="text-muted-foreground hover:text-foreground"
          >
            <Icon name="arrow-left" className="mr-2" /> Sair
          </Button>
          <div className="flex gap-4">
            <Button
              variant={userVoted ? 'outline' : 'default'}
              className={cn(userVoted && 'opacity-50')}
              onClick={() => onVote('c1')}
              disabled={userVoted}
            >
              Vote {c1.name.split(' ')[1]}
            </Button>
            <Button
              variant={userVoted ? 'outline' : 'default'}
              className={cn(userVoted && 'opacity-50')}
              onClick={() => onVote('c2')}
              disabled={userVoted}
            >
              Vote {c2.name.split(' ')[1]}
            </Button>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="flex w-full flex-col gap-6 lg:w-80">
        {/* Fidelity Stats */}
        <Card className="border-border bg-card">
          <CardHeader className="border-b border-border py-3">
            <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Fidelity Score (Live)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 p-4">
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-foreground">
                <span>{c1.name}</span>
                <span>{c1.fidelity}%</span>
              </div>
              <Progress value={c1.fidelity} className="h-1.5" />
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-foreground">
                <span>{c2.name}</span>
                <span>{c2.fidelity}%</span>
              </div>
              <Progress value={c2.fidelity} className="h-1.5" />
            </div>
          </CardContent>
        </Card>

        {/* Live Chat */}
        <Card className="flex min-h-[300px] flex-1 flex-col border-border bg-card">
          <CardHeader className="flex flex-row items-center justify-between border-b border-border py-3">
            <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Chat da Comunidade
            </CardTitle>
            <Badge variant="outline" className="border-border text-[9px] text-muted-foreground">
              234 online
            </Badge>
          </CardHeader>
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-3">
              <ChatMessage user="CryptoKing" text="Argumento forte!" time="14:02" />
              <ChatMessage
                user="Sarah_AI"
                text="O argumento sobre seguranca e muito solido."
                time="14:03"
              />
              <ChatMessage
                user="Dev_Junior"
                text="Alguem mais notou a referencia ao paper de 2019?"
                time="14:03"
              />
              <ChatMessage user="Anon" text="Team Open Source sempre!" time="14:04" />
              <ChatMessage user="Mod_Bot" text="Votacao aberta." time="14:05" />
            </div>
          </ScrollArea>
          <div className="border-t border-border p-3">
            <Input placeholder="Comente algo..." className="h-9 text-xs" />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ArenaLiveView;

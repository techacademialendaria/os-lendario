import React from 'react';
import { Card, CardContent } from '../../../ui/card';
import { Badge } from '../../../ui/badge';
import { Icon } from '../../../ui/icon';
import { Avatar, AvatarFallback } from '../../../ui/avatar';
import type { TopParticipantsCardProps } from '../types';

const getAvatarInitials = (name: string): string => {
  const parts = name.split(' ').filter((p) => p.length > 0);
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
};

export const TopParticipantsCard: React.FC<TopParticipantsCardProps> = ({ participantes }) => {
  return (
    <Card className="rounded-3xl border-border bg-card shadow-sm h-full hover:border-primary/30 transition-colors">
      <CardContent className="p-8 flex flex-col gap-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500">
            <Icon name="users-alt" size="size-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-foreground">Top Participantes</h3>
            <p className="text-xs text-muted-foreground font-serif">Membros mais engajados</p>
          </div>
        </div>
        <div className="space-y-3">
          {participantes.slice(0, 5).map((p, i) => (
            <div
              key={i}
              className="flex items-center justify-between group p-2 rounded-lg hover:bg-muted/30 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-6 flex justify-center">
                  {i === 0 && <Icon name="medal" className="text-yellow-500" />}
                  {i === 1 && <Icon name="medal" className="text-zinc-400" />}
                  {i === 2 && <Icon name="medal" className="text-amber-700" />}
                  {i > 2 && <span className="text-xs font-mono text-muted-foreground">#{i + 1}</span>}
                </div>
                <Avatar className="h-6 w-6">
                  <AvatarFallback className="text-[9px] bg-primary/10 text-primary">
                    {getAvatarInitials(p.nome)}
                  </AvatarFallback>
                </Avatar>
                <span className="font-medium text-foreground text-sm group-hover:text-primary transition-colors truncate max-w-[150px]">
                  {p.nome}
                </span>
              </div>
              <Badge className="bg-muted text-muted-foreground font-mono text-[10px] border-none rounded px-2 min-w-[32px] justify-center">
                {p.participacoes}x
              </Badge>
            </div>
          ))}
          {participantes.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-4">Nenhum participante</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

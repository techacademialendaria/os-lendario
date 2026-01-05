import React, { useState } from 'react';
import { Icon } from '../../../ui/icon';
import { Badge } from '../../../ui/badge';
import { cn } from '../../../../lib/utils';
import type { Mind } from '../types';

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

interface PlayerStageProps {
  player: 'player1' | 'player2';
  mind: Mind | undefined;
  isSelected: boolean;
}

export const PlayerStage: React.FC<PlayerStageProps> = ({ player, mind, isSelected }) => {
  const [imgError, setImgError] = useState(false);

  // Reset image error when mind changes
  React.useEffect(() => {
    setImgError(false);
  }, [mind?.id]);

  const isPlayer1 = player === 'player1';
  const borderColor = isPlayer1 ? 'border-cyan-500/50' : 'border-red-500/50';
  const shadowColor = isPlayer1
    ? 'shadow-[0_0_30px_-10px_rgba(34,211,238,0.2)]'
    : 'shadow-[0_0_30px_-10px_rgba(239,68,68,0.2)]';
  const gradientColor = isPlayer1 ? 'from-cyan-500/5' : 'from-red-500/5';
  const accentBorderColor = isPlayer1 ? 'border-cyan-500/20' : 'border-red-500/20';
  const badgeBgColor = isPlayer1 ? 'bg-cyan-500/10 border-cyan-500/20 text-cyan-500' : 'bg-red-500/10 border-red-500/20 text-red-500';
  const badgeText = isPlayer1 ? 'PROPOSICAO' : 'OPOSICAO';
  const placeholderText = isPlayer1 ? 'Selecione o Player 1' : 'Selecione o Player 2';

  return (
    <div
      className={cn(
        'bg-studio-card relative flex flex-1 flex-col items-center justify-center overflow-hidden rounded-2xl border-2 p-6 transition-all duration-500',
        isSelected
          ? `${borderColor} ${shadowColor}`
          : 'border-dashed border-white/5'
      )}
    >
      {mind ? (
        <>
          <div className={cn('pointer-events-none absolute inset-0 bg-gradient-to-b to-transparent', gradientColor)}></div>
          <div className={cn(
            'relative z-10 mb-4 flex h-32 w-32 items-center justify-center overflow-hidden rounded-full border-4 bg-zinc-900 shadow-xl transition-transform duration-500 hover:scale-110',
            accentBorderColor
          )}>
            {mind.avatar?.startsWith('/') && !imgError ? (
              <img
                src={mind.avatar}
                alt={mind.name}
                className="h-full w-full object-cover"
                onError={() => setImgError(true)}
              />
            ) : null}
            {(imgError || !mind.avatar?.startsWith('/')) && (
              <span className={cn('text-4xl font-black', mind.color)}>
                {mind.avatar?.startsWith('/') ? getInitials(mind.name) : mind.avatar}
              </span>
            )}
          </div>
          <h2 className="z-10 text-center text-3xl font-black uppercase tracking-tight text-white">
            {mind.name}
          </h2>
          <p className="z-10 font-serif text-zinc-400">{mind.role}</p>
          <Badge className={cn('mt-4', badgeBgColor)}>
            {badgeText}
          </Badge>
        </>
      ) : (
        <div className="text-center text-zinc-600">
          <Icon name="user" className="mb-4 text-6xl opacity-20" />
          <p className="font-mono text-sm uppercase tracking-widest">{placeholderText}</p>
        </div>
      )}
    </div>
  );
};

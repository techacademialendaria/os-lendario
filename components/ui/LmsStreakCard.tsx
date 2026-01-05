/**
 * LmsStreakCard - Luxo 2.0 Design System
 *
 * Glow Atmosférico: #FF9500 @ 15% opacity, 40px blur
 * Micro-animação: Pulse infinito no ícone de chama
 * Estados: Concluído (Check), Pendente (Dot), Hoje (Ring)
 */

import React from 'react';
import { cn } from '../../lib/utils';
import { Icon } from './icon';

interface DayActivity {
  label: string;
  isActive: boolean;
  isToday?: boolean;
}

interface LmsStreakCardProps {
  count: number;
  days: DayActivity[];
  className?: string;
}

export const LmsStreakCard: React.FC<LmsStreakCardProps> = ({
  count,
  days,
  className,
}) => {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-[3rem] border border-white/10 bg-[#0A0A0A] p-10',
        'shadow-[0_0_40px_rgba(255,149,0,0.03)]', // Glow atmosférico sutil
        className
      )}
    >
      {/* Gradient overlay sutil */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />

      <div className="relative z-10 space-y-10">
        {/* Header: Contador + Fire Icon */}
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <h3 className="text-8xl font-black leading-none text-white tracking-tighter font-sans">
              {count}
            </h3>
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#FF9500]">
              Dias de Ofensiva
            </p>
          </div>

          {/* Fire Icon com Pulse sutil */}
          <div className="relative flex h-20 w-20 items-center justify-center rounded-3xl bg-[#5C4A1F]">
            {/* Pulse layer - quase imperceptível */}
            <div className="absolute inset-0 rounded-3xl bg-[#FF9500]/20 animate-pulse" />
            <Icon
              name="flame"
              type="solid"
              size="size-10"
              className="relative z-10 text-[#FF9500]"
            />
          </div>
        </div>

        {/* Week Progress */}
        <div className="rounded-[2rem] border border-white/5 bg-[#0F0F0F] p-6">
          {/* Labels */}
          <div className="flex items-center justify-between px-1 mb-4">
            {days.map((day, i) => (
              <span
                key={`label-${i}`}
                className={cn(
                  'text-[11px] font-bold uppercase tracking-widest',
                  day.isToday ? 'text-[#FF9500]' : 'text-[#3A3A3A]'
                )}
              >
                {day.label}
              </span>
            ))}
          </div>

          {/* Circles - Overlapping */}
          <div className="flex items-center">
            {days.map((day, i) => (
              <div
                key={`circle-${i}`}
                className={cn(
                  'flex h-14 w-14 items-center justify-center rounded-full transition-all duration-300',
                  // Estados
                  day.isActive && 'bg-[#FF9500] text-white shadow-[0_0_20px_rgba(255,149,0,0.5)]',
                  !day.isActive && !day.isToday && 'bg-[#1A1A1A]',
                  day.isToday && !day.isActive && 'bg-transparent ring-2 ring-[#FF9500]'
                )}
                style={{
                  marginLeft: i > 0 ? '-10px' : '0',
                  zIndex: days.length - i, // Primeiro dia fica na frente
                }}
              >
                {day.isActive ? (
                  <Icon name="check" size="size-5" strokeWidth={2.5} />
                ) : (
                  <div className="h-1.5 w-1.5 rounded-full bg-white/20" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LmsStreakCard;

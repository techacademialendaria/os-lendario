import React, { useState } from 'react';
import { Card, CardContent } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Icon } from '../../ui/icon';
import { cn } from '../../../lib/utils';
import { STUDIO_MIND_CARD_CLASSES } from '../studio-tokens';

// DiceBear fallback for missing images
const getDiceBearUrl = (slug: string): string => {
  return `https://api.dicebear.com/7.x/initials/svg?seed=${slug}&backgroundColor=0d9488`;
};

import type { PsychometricProfile } from '../../../types/psychometrics';

export interface MindData {
  id: string;
  name: string;
  slug: string;
  avatar: string;
  hasRealAvatar: boolean;
  description: string;
  status: 'production' | 'progress' | 'draft';
  completion?: string; // Deprecated but kept for type compat if needed
  score?: number; // Deprecated
  signatureSkill: string;
  expertise: string[];
  differentials: string[];
  taxonomy: {
    category: string;
    roles: string[];
  };
  progressPercent?: number;
  psychometrics?: PsychometricProfile;
}

interface MindCardProps {
  mind: MindData;
  onClick?: () => void;
}

const MindCard: React.FC<MindCardProps> = ({ mind, onClick }) => {
  const [imgError, setImgError] = useState(false);

  // Card Opacity/Style based on Status
  const isDraft = mind.status === 'draft';
  const isProgress = mind.status === 'progress';

  // Use avatar, fallback to DiceBear if image fails to load
  const avatarSrc = imgError ? getDiceBearUrl(mind.slug) : mind.avatar;

  // Status Colors
  const statusColors = {
    production: {
      border: 'border-studio-primary/30',
      text: 'text-studio-primary',
      bg: 'bg-studio-primary/10',
    },
    progress: { border: 'border-brand-teal/30', text: 'text-brand-teal', bg: 'bg-brand-teal/10' },
    draft: { border: 'border-zinc-700/30', text: 'text-zinc-500', bg: 'bg-zinc-800/10' },
  };

  const statusStyle = statusColors[mind.status] || statusColors.draft;

  return (
    <Card
      className={cn(
        'bg-studio-card group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-xl border border-white/5 transition-all duration-500 hover:border-studio-primary/30 hover:bg-black/40 hover:shadow-2xl',
        isDraft && 'opacity-60 grayscale-[0.8]'
      )}
      onClick={onClick}
    >
      {/* Background Gradient Hover Effect */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-studio-primary/5 via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

      <CardContent className="relative z-10 flex h-full flex-col p-0">
        {/* 1. HEADER & AVATAR */}
        <div className="flex flex-col items-center p-6 pb-0 text-center">
          <div className="relative mb-4">
            {/* Avatar Ring */}
            <div
              className={cn(
                'h-20 w-20 rounded-full border p-1 transition-all duration-500',
                mind.status === 'production'
                  ? 'border-studio-primary/20 group-hover:border-studio-primary/60'
                  : 'border-white/10'
              )}
            >
              <div className="h-full w-full overflow-hidden rounded-full bg-zinc-900">
                <img
                  src={avatarSrc}
                  alt={mind.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  onError={() => setImgError(true)}
                />
              </div>
            </div>
            {/* Status Dot (Absolute) */}
            <div
              className={cn(
                'border-studio-card absolute bottom-1 right-1 h-3 w-3 rounded-full border-2',
                mind.status === 'production'
                  ? 'bg-emerald-500'
                  : mind.status === 'progress'
                    ? 'animate-pulse bg-amber-500'
                    : 'bg-zinc-600'
              )}
            />
          </div>

          <h3 className="mb-1 font-sans text-lg font-bold text-white transition-colors group-hover:text-studio-primary">
            {mind.name}
          </h3>

          {/* Integrated Signature Skill */}
          <div className="mb-3">
            <span className="inline-flex items-center rounded-full border border-white/5 bg-white/5 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-zinc-400 transition-all group-hover:border-studio-primary/20 group-hover:text-studio-primary/80">
              {mind.signatureSkill || 'Synthetic Mind'}
            </span>
          </div>

          {/* Psychometric Badges (Conditional) */}
          {mind.psychometrics && (
            <div className="mb-2 flex gap-2">
              <div
                className="flex items-center gap-1 rounded border border-purple-500/20 bg-purple-500/10 px-1.5 py-0.5 font-mono text-[9px] text-purple-400"
                title={`MBTI: ${mind.psychometrics.mbti.role}`}
              >
                {mind.psychometrics.mbti.type}
              </div>
              <div
                className="flex items-center gap-1 rounded border border-blue-500/20 bg-blue-500/10 px-1.5 py-0.5 font-mono text-[9px] text-blue-400"
                title={`Enneagram: ${mind.psychometrics.enneagram.triad}`}
              >
                {mind.psychometrics.enneagram.type}
              </div>
            </div>
          )}
        </div>

        {/* 2. DESCRIPTION (Simplified) */}
        <div className="flex-1 px-6 pb-6">
          <p className="line-clamp-3 text-center font-serif text-xs italic leading-relaxed text-zinc-500">
            "{mind.description}"
          </p>
        </div>

        {/* 3. FOOTER (Expertise & Status) */}
        <div className="mt-auto flex items-center justify-between gap-4 border-t border-white/5 bg-white/[0.01] p-4 transition-colors group-hover:bg-white/[0.03]">
          {/* LEFT: Expertise Tags (Now always visible) */}
          <div className="flex items-center gap-1.5 overflow-hidden">
            {mind.expertise?.slice(0, 3).map((skill, i) => (
              <span
                key={i}
                className="whitespace-nowrap rounded-sm border border-white/5 bg-white/5 px-1.5 py-0.5 text-[9px] font-medium text-zinc-400 transition-colors group-hover:border-white/10 group-hover:text-zinc-300"
              >
                {skill}
              </span>
            ))}
            {(mind.expertise?.length || 0) > 3 && (
              <span className="text-[9px] text-zinc-600">+{mind.expertise.length - 3}</span>
            )}
          </div>

          {/* RIGHT: Status or Action */}
          <div className="shrink-0">
            {isProgress && mind.progressPercent ? (
              <div className="flex items-center gap-2" title="Em progresso">
                <div className="h-1 w-8 overflow-hidden rounded-full bg-zinc-800">
                  <div
                    className="h-full bg-brand-teal"
                    style={{ width: `${mind.progressPercent}%` }}
                  />
                </div>
                <span className="font-mono text-[9px] text-brand-teal">
                  {mind.progressPercent}%
                </span>
              </div>
            ) : (
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/5 text-zinc-500 transition-all group-hover:bg-studio-primary/20 group-hover:text-white">
                <Icon name="arrow-right" size="size-3" />
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default React.memo(MindCard);

import React from 'react';
import { Card } from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';
import { cn } from '@/lib/utils';
import { STUDIO_CARD_CLASSES } from '@/components/creator/studio-tokens';
import type { ChannelEngagementSegment, PersonaColorInfo } from '../types';

interface ChannelBarProps {
  icon: string;
  label: string;
  benchmark: string;
  segments: ChannelEngagementSegment[];
}

const ChannelBar: React.FC<ChannelBarProps> = ({ icon, label, benchmark, segments }) => {
  const total = segments.reduce((sum, s) => sum + s.value, 0);
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon name={icon as any} size="size-4" className="text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">{label}</span>
        </div>
        <span className="text-xs text-muted-foreground">{benchmark}</span>
      </div>
      <div className="flex h-8 w-full overflow-hidden rounded-md bg-background">
        {segments.map((seg, i) => {
          const width = (seg.value / total) * 100;
          return (
            <div
              key={seg.name}
              className={cn(
                'flex h-full items-center justify-center text-[10px] font-bold',
                seg.colorInfo.bg,
                i < 2 ? 'text-background' : 'text-white'
              )}
              style={{ width: `${width}%` }}
            >
              {seg.name.charAt(0)}: {seg.value}%
            </div>
          );
        })}
      </div>
    </div>
  );
};

interface EngagementChartProps {
  channelEngagement: {
    email: ChannelEngagementSegment[];
    social: ChannelEngagementSegment[];
    blog: ChannelEngagementSegment[];
  };
  getPersonaColor: (index: number) => PersonaColorInfo;
}

export const EngagementChart: React.FC<EngagementChartProps> = ({
  channelEngagement,
  getPersonaColor,
}) => {
  return (
    <Card className={cn(STUDIO_CARD_CLASSES, 'flex flex-col p-6')}>
      <div className="mb-6 flex items-center justify-between">
        <h3 className="flex items-center gap-2 text-lg font-bold text-foreground">
          <Icon name="cursor-finger" size="size-5" className="text-[#C9B298]" />
          Qual Perfil Mais Interage?
        </h3>
        <span className="text-xs font-semibold text-muted-foreground">Taxa de Engajamento</span>
      </div>
      <div className="space-y-5">
        <ChannelBar
          icon="envelope"
          label="Email Marketing"
          benchmark="Media setor: 12%"
          segments={channelEngagement.email.map((s, i) => ({
            ...s,
            colorInfo: getPersonaColor(i),
          }))}
        />
        <ChannelBar
          icon="camera"
          label="Instagram / Social"
          benchmark="Media setor: 4.5%"
          segments={channelEngagement.social.map((s, i) => ({
            ...s,
            colorInfo: getPersonaColor(i),
          }))}
        />
        <ChannelBar
          icon="document"
          label="Blog / Conteudo"
          benchmark="Media setor: 2%"
          segments={channelEngagement.blog.map((s, i) => ({
            ...s,
            colorInfo: getPersonaColor(i),
          }))}
        />
      </div>
    </Card>
  );
};

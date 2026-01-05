import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../../ui/card';
import { Icon } from '../../../../ui/icon';
import { Badge } from '../../../../ui/badge';
import { cn } from '../../../../../lib/utils';
import { ObsessionRing } from '../../../ui/ObsessionRing';
import { STUDIO_CARD_CLASSES } from '../../../studio-tokens';
import type { MindProfile as Mind } from '../../../../../hooks/useMind';

interface OverviewTabProps {
  mind: Mind;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({ mind }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Left Column */}
      <div className="lg:col-span-7 space-y-8">
        {/* Bio */}
        <Card className={STUDIO_CARD_CLASSES}>
          <CardHeader className="border-b border-border pb-3">
            <CardTitle className="text-base uppercase tracking-widest text-muted-foreground flex items-center gap-2">
              <Icon name="user" /> Sobre a Mente
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 font-serif text-muted-foreground leading-relaxed">
            <p>{mind.shortBio || 'Sem descricao disponivel.'}</p>
          </CardContent>
        </Card>

        {/* Values */}
        {mind.values.length > 0 && (
          <Card className={STUDIO_CARD_CLASSES}>
            <CardHeader className="border-b border-border pb-3">
              <CardTitle className="text-base uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                <Icon name="heart" /> Valores Centrais
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-3">
                {mind.values.slice(0, 5).map((value, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <span className="text-sm font-medium text-foreground w-40">{value.name}</span>
                    <div className="flex-1 h-2 bg-muted/50 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-studio-primary transition-all"
                        style={{ width: `${value.importance * 10}%` }}
                      />
                    </div>
                    <span className="text-xs font-mono font-bold w-8">{value.importance}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Right Column */}
      <div className="lg:col-span-5 space-y-8">
        {/* Skills/Proficiencies */}
        {mind.proficiencies.length > 0 && (
          <Card className={cn(STUDIO_CARD_CLASSES, 'bg-gradient-to-br from-card to-studio-primary/5')}>
            <CardHeader className="border-b border-border pb-3">
              <CardTitle className="text-base uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                <Icon name="chart-pie" className="text-studio-primary" /> Proficiencias
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-3">
                {mind.proficiencies.slice(0, 6).map((prof, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <span
                      className="text-xs font-bold text-muted-foreground w-32 text-right truncate"
                      title={prof.skillName}
                    >
                      {prof.skillName}
                    </span>
                    <div className="flex-1 h-2 bg-muted/50 rounded-full overflow-hidden">
                      <div className="h-full bg-studio-primary" style={{ width: `${prof.level * 10}%` }} />
                    </div>
                    <span className="text-xs font-mono font-bold w-8">{prof.level}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Communication Style */}
        <Card className={STUDIO_CARD_CLASSES}>
          <CardHeader className="border-b border-border pb-3">
            <CardTitle className="text-base uppercase tracking-widest text-muted-foreground flex items-center gap-2">
              <Icon name="comment-alt" /> Comunicacao
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <div className="flex gap-2 flex-wrap">
              {mind.communicationStyle.map((style, i) => (
                <Badge key={i} variant="outline" className="rounded-md">
                  {style}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Obsession */}
        {mind.obsession && (
          <Card className={STUDIO_CARD_CLASSES}>
            <CardHeader className="border-b border-border pb-3">
              <CardTitle className="text-base uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                <Icon name="target" /> Obsessao
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex flex-wrap gap-4 justify-center">
                <ObsessionRing name={mind.obsession} intensity={10} />
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

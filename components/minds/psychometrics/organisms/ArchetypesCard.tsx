import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';
import { getDiscTheme } from '@/utils/psychometrics';
import type { ArchetypesCardProps } from '../types';

export const ArchetypesCard: React.FC<ArchetypesCardProps> = ({
  mbtiType,
  mbtiRole,
  mbtiStack,
  enneagramType,
  enneagramWing,
  enneagramTriad,
  enneagramVariant,
  discPattern,
  discPatternName,
  cognitiveStratum,
}) => {
  return (
    <Card className="rounded-xl border-border bg-gradient-to-br from-card to-primary/5">
      <CardHeader className="border-b border-border pb-3">
        <CardTitle className="flex items-center gap-2 text-base uppercase tracking-widest text-muted-foreground">
          <Icon name="fingerprint" className="text-primary" /> Arquetipos Psicologicos
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid grid-cols-2 gap-6">
          {/* MBTI */}
          {mbtiType && (
            <div className="space-y-2">
              <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                MBTI
              </div>
              <div className="flex items-center gap-3">
                <Badge
                  variant="outline"
                  className="border-blue-600/30 px-3 py-1 font-mono text-2xl font-bold text-blue-500"
                >
                  {mbtiType}
                </Badge>
                {mbtiRole && (
                  <div className="text-sm text-muted-foreground">{mbtiRole}</div>
                )}
              </div>
              {mbtiStack.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {mbtiStack.map((fn, i) => (
                    <span
                      key={i}
                      className="rounded bg-blue-600/10 px-1.5 py-0.5 font-mono text-[10px] text-blue-500"
                    >
                      {fn}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Enneagram */}
          {enneagramType && (
            <div className="space-y-2">
              <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                Eneagrama
              </div>
              <div className="flex items-center gap-3">
                <Badge
                  variant="outline"
                  className="border-blue-500/30 px-3 py-1 font-mono text-2xl font-bold text-blue-400"
                >
                  {enneagramWing || enneagramType}
                </Badge>
                {enneagramTriad && (
                  <div className="text-sm text-muted-foreground">
                    {enneagramTriad} Triad
                  </div>
                )}
              </div>
              {enneagramVariant && (
                <div className="mt-2 text-xs text-muted-foreground">
                  Variante:{' '}
                  <span className="font-mono text-foreground">
                    {enneagramVariant}
                  </span>
                </div>
              )}
            </div>
          )}

          {/* DISC */}
          {discPattern && (
            <div className="space-y-2">
              <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                DISC
              </div>
              <div className="flex flex-col gap-1">
                <Badge
                  variant="outline"
                  className={`w-fit px-3 py-1 font-mono text-2xl font-bold ${getDiscTheme(discPattern).border} ${getDiscTheme(discPattern).color}`}
                >
                  {discPattern}
                </Badge>
                {discPatternName && (
                  <span className="text-xs text-muted-foreground">
                    {discPatternName}
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Cognitive Stratum */}
          {cognitiveStratum && (
            <div className="space-y-2">
              <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                Estrato Cognitivo
              </div>
              <div className="flex items-center gap-3">
                <Badge
                  variant="outline"
                  className="border-studio-primary/30 px-3 py-1 font-mono text-2xl font-bold text-studio-primary"
                >
                  {cognitiveStratum}
                </Badge>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ArchetypesCard;

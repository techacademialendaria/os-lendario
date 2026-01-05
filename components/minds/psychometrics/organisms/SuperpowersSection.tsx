import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';
import type { SuperpowersSectionProps } from '../types';

export const SuperpowersSection: React.FC<SuperpowersSectionProps> = ({
  superpowers,
  kryptonite,
  enneagramDetails,
}) => {
  return (
    <div className="space-y-6">
      {/* Superpowers */}
      {superpowers.length > 0 && (
        <Card className="rounded-xl border-border bg-gradient-to-br from-card to-studio-primary/5">
          <CardHeader className="border-b border-border pb-3">
            <CardTitle className="flex items-center gap-2 text-base uppercase tracking-widest text-studio-primary">
              <Icon name="bolt" /> Superpoderes
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <ul className="space-y-3">
              {superpowers.map((power, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-studio-primary/20">
                    <span className="text-xs font-bold text-studio-primary">{i + 1}</span>
                  </div>
                  <span className="text-sm font-medium">{power}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Kryptonite */}
      {kryptonite.length > 0 && (
        <Card className="rounded-xl border-red-500/20 bg-red-500/5">
          <CardHeader className="border-b border-red-500/10 pb-3">
            <CardTitle className="flex items-center gap-2 text-base uppercase tracking-widest text-red-400">
              <Icon name="shield" /> Kryptonita
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <ul className="space-y-2">
              {kryptonite.map((k, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <div className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-red-500" />
                  <span>{k}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Enneagram Details */}
      {enneagramDetails && (enneagramDetails.coreFear || enneagramDetails.coreDesire) && (
        <Card className="rounded-xl border-primary/20 bg-primary/5">
          <CardHeader className="border-b border-primary/10 pb-3">
            <CardTitle className="flex items-center gap-2 text-base uppercase tracking-widest text-primary">
              <Icon name="target" /> Motivacao Central
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 pt-4">
            {enneagramDetails.coreDesire && (
              <div>
                <div className="mb-1 text-[10px] font-bold uppercase tracking-widest text-green-400">
                  Desejo Central
                </div>
                <p className="text-sm text-muted-foreground">
                  {enneagramDetails.coreDesire}
                </p>
              </div>
            )}
            {enneagramDetails.coreFear && (
              <div>
                <div className="mb-1 text-[10px] font-bold uppercase tracking-widest text-red-400">
                  Medo Central
                </div>
                <p className="text-sm text-muted-foreground">
                  {enneagramDetails.coreFear}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SuperpowersSection;

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';
import type { ConvergenceSectionProps } from '../types';

export const ConvergenceSection: React.FC<ConvergenceSectionProps> = ({
  powerfulAlignments,
  productiveTensions,
}) => {
  // Don't render if no data
  if (
    (!powerfulAlignments || powerfulAlignments.length === 0) &&
    (!productiveTensions || productiveTensions.length === 0)
  ) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      {/* Powerful Alignments */}
      {powerfulAlignments && powerfulAlignments.length > 0 && (
        <Card className="rounded-xl border-border">
          <CardHeader className="border-b border-border pb-3">
            <CardTitle className="flex items-center gap-2 text-base uppercase tracking-widest text-green-400">
              <Icon name="link" /> Alinhamentos Poderosos
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <ul className="space-y-3">
              {powerfulAlignments.map((alignment, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm text-muted-foreground"
                >
                  <div className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-green-500" />
                  <span>{alignment}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Productive Tensions */}
      {productiveTensions && productiveTensions.length > 0 && (
        <Card className="rounded-xl border-border">
          <CardHeader className="border-b border-border pb-3">
            <CardTitle className="flex items-center gap-2 text-base uppercase tracking-widest text-amber-400">
              <Icon name="link" /> Tensoes Produtivas
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <ul className="space-y-3">
              {productiveTensions.map((tension, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm text-muted-foreground"
                >
                  <div className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                  <span>{tension}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ConvergenceSection;

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';
import type { DISCSectionProps } from '../types';

const DISC_METRICS = [
  {
    label: 'Dominancia (D)',
    key: 'd' as const,
    color: 'bg-red-500',
    textColor: 'text-red-400',
  },
  {
    label: 'Influencia (I)',
    key: 'i' as const,
    color: 'bg-yellow-500',
    textColor: 'text-yellow-400',
  },
  {
    label: 'Estabilidade (S)',
    key: 's' as const,
    color: 'bg-emerald-500',
    textColor: 'text-emerald-400',
  },
  {
    label: 'Conformidade (C)',
    key: 'c' as const,
    color: 'bg-blue-500',
    textColor: 'text-blue-400',
  },
];

export const DISCSection: React.FC<DISCSectionProps> = ({ disc }) => {
  return (
    <Card className="bg-studio-card rounded-xl border-border">
      <CardHeader className="border-b border-border pb-3">
        <CardTitle className="flex items-center gap-2 text-base uppercase tracking-widest text-muted-foreground">
          <Icon name="chart-pie" className="text-white" /> DISC - Comportamento Observavel
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
          {DISC_METRICS.map((metric) => (
            <div key={metric.key} className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className={`font-medium ${metric.textColor}`}>{metric.label}</span>
                <span className="font-mono font-bold text-white">{disc[metric.key]}%</span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-white/5">
                <div
                  className={`h-full rounded-full ${metric.color} transition-all duration-500`}
                  style={{ width: `${disc[metric.key]}%` }}
                />
              </div>
            </div>
          ))}
        </div>
        {/* DISC Specific Behaviors */}
        {disc.specificBehaviors && disc.specificBehaviors.length > 0 && (
          <div className="mt-6 border-t border-white/5 pt-6">
            <div className="mb-3 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              Comportamentos Especificos
            </div>
            <ul className="space-y-2">
              {disc.specificBehaviors.slice(0, 5).map((behavior, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <div className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span>{behavior}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DISCSection;

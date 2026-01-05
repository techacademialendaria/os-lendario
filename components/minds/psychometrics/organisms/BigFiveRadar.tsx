import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';
import RadarChart from '../../ui/RadarChart';
import type { BigFiveRadarProps } from '../types';

export const BigFiveRadar: React.FC<BigFiveRadarProps> = ({ bigFive }) => {
  return (
    <Card className="bg-studio-card rounded-xl border-border">
      <CardHeader className="border-b border-border pb-3">
        <CardTitle className="flex items-center gap-2 text-base uppercase tracking-widest text-muted-foreground">
          <Icon name="chart-histogram" className="text-indigo-400" /> Big Five (OCEAN)
        </CardTitle>
      </CardHeader>
      <CardContent className="flex min-h-[280px] items-center justify-center pt-6">
        <RadarChart
          data={[
            { skillName: 'Abertura', level: bigFive.openness / 10 },
            { skillName: 'Consc.', level: bigFive.conscientiousness / 10 },
            { skillName: 'Extrov.', level: bigFive.extraversion / 10 },
            { skillName: 'Amabil.', level: bigFive.agreeableness / 10 },
            { skillName: 'Neurot.', level: bigFive.neuroticism / 10 },
          ]}
          size={240}
          colors={{
            stroke: '#6366f1',
            fill: 'rgba(99, 102, 241, 0.2)',
            text: 'fill-zinc-400',
            grid: 'rgba(255,255,255,0.05)',
          }}
        />
      </CardContent>
    </Card>
  );
};

export default BigFiveRadar;

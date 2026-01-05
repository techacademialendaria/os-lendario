// Project Stats Component
// Displays epic and story counts

import React from 'react';
import { Card } from '@/components/ui/card';
import { STUDIO_TEAL } from '../types';

interface ProjectStatsProps {
  epicsCount: number;
  storiesCount: number;
}

export const ProjectStats: React.FC<ProjectStatsProps> = ({
  epicsCount,
  storiesCount,
}) => (
  <div className="mb-8 grid grid-cols-3 gap-4">
    <Card className="p-4 text-center">
      <div className="text-3xl font-bold" style={{ color: STUDIO_TEAL }}>
        {epicsCount}
      </div>
      <div className="text-sm text-muted-foreground">Epicos</div>
    </Card>
    <Card className="p-4 text-center">
      <div className="text-3xl font-bold" style={{ color: STUDIO_TEAL }}>
        {storiesCount}
      </div>
      <div className="text-sm text-muted-foreground">Stories</div>
    </Card>
    <Card className="p-4 text-center">
      <div className="text-3xl font-bold" style={{ color: STUDIO_TEAL }}>
        100%
      </div>
      <div className="text-sm text-muted-foreground">Completo</div>
    </Card>
  </div>
);

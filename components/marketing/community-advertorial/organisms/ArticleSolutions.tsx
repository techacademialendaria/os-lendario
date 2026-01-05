import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';
import { SOLUTIONS } from '../data';

export const ArticleSolutions: React.FC = () => (
  <div className="not-prose my-8 grid gap-6">
    {SOLUTIONS.map((solution, i) => (
      <Card key={i} className="border-l-4 border-l-primary bg-card">
        <CardContent className="p-6">
          <h4 className="mb-2 flex items-center gap-2 text-lg font-bold">
            <Icon name={solution.icon} className="text-primary" /> {solution.title}
          </h4>
          <p className="font-sans text-sm font-medium text-muted-foreground">
            {solution.description}
          </p>
        </CardContent>
      </Card>
    ))}
  </div>
);

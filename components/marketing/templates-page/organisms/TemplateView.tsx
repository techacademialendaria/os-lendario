import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Icon } from '@/components/ui/icon';
import { CodeBlock } from '@/components/ui/code-block';
import type { PrincipleItem } from '../types';

interface TemplateViewProps {
  title: string;
  template: string;
  principles: PrincipleItem[];
}

export const TemplateView: React.FC<TemplateViewProps> = ({
  title,
  template,
  principles,
}) => {
  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <CodeBlock title={title} language="bash">
          {template}
        </CodeBlock>
      </div>
      <div className="space-y-6">
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Icon name="lightbulb-on" /> Principios Ativos
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            {principles.map((principle, index) => (
              <div key={index}>
                <Badge variant="outline" className="mb-1">
                  {principle.badge}
                </Badge>
                <p className="text-muted-foreground">{principle.description}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TemplateView;

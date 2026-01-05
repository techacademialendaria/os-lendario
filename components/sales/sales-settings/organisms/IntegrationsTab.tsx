import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { Integration } from '../types';
import { STATUS_COLORS } from '../types';

interface IntegrationsTabProps {
  integrations: Integration[];
}

const getStatusLabel = (status: string): string => {
  switch (status) {
    case 'connected':
      return 'Conectado';
    case 'error':
      return 'Erro';
    default:
      return 'Pendente';
  }
};

export const IntegrationsTab: React.FC<IntegrationsTabProps> = ({ integrations }) => {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {integrations.map((app, i) => (
        <Card key={i} className="flex flex-col justify-between">
          <CardHeader className="pb-2">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                  <Icon name={app.icon} size="size-5" />
                </div>
                <CardTitle className="text-base">{app.name}</CardTitle>
              </div>
              <Badge
                variant="outline"
                className={cn(
                  'font-mono text-[10px] capitalize',
                  STATUS_COLORS[app.status] || 'text-muted-foreground'
                )}
              >
                {getStatusLabel(app.status)}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="mb-4 font-mono text-xs text-muted-foreground">
              Ultima sync: {app.lastSync}
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="h-8 w-full text-xs">
                Testar
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-full text-xs text-muted-foreground hover:text-foreground"
              >
                Reconfigurar
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

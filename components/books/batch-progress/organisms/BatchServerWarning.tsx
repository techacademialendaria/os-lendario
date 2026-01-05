import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';

export const BatchServerWarning: React.FC = () => (
  <Card className="border-warning/30 bg-warning/5">
    <CardContent className="pt-4">
      <div className="flex items-start gap-3">
        <Icon name="exclamation-triangle" size="size-6" className="mt-0.5 text-warning" />
        <div className="text-sm">
          <p className="font-medium text-foreground">Servidor de pipeline nao detectado</p>
          <p className="mt-1 text-muted-foreground">
            Para controlar o pipeline pela interface, inicie o servidor local:
          </p>
          <code className="mt-2 block rounded bg-muted px-3 py-2 font-mono text-xs">
            cd expansion-packs/book-summary && python -m uvicorn server.main:app --port 8001 --reload
          </code>
        </div>
      </div>
    </CardContent>
  </Card>
);

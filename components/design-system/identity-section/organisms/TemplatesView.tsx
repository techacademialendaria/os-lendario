import React from 'react';
import { Badge } from '../../../ui/badge';
import { Icon } from '../../../ui/icon';
import { manifestoTemplate, principleTemplate } from '../data';

export const TemplatesView: React.FC = () => (
  <section className="space-y-8">
    <h3 className="flex items-center gap-2 border-b border-border pb-2 font-sans text-2xl font-semibold">
      <Icon name="layout-fluid" /> 5. Organismos (Templates)
    </h3>
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <div className="rounded-xl border border-border bg-card p-6">
        <Badge className="mb-2">{manifestoTemplate.badge}</Badge>
        <p className="whitespace-pre-line font-sans text-sm font-medium leading-relaxed text-muted-foreground">
          {manifestoTemplate.content}
        </p>
      </div>
      <div className="rounded-xl border border-border bg-card p-6">
        <Badge className="mb-2">{principleTemplate.badge}</Badge>
        <p className="whitespace-pre-line font-sans text-sm font-medium leading-relaxed text-muted-foreground">
          {principleTemplate.content}
        </p>
      </div>
    </div>
  </section>
);

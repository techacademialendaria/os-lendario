import React from 'react';
import { Badge } from '../../../ui/badge';
import { CONTENT_PROJECTS_EXPLANATION } from '../../data/contents-content';
import { OPS_ACCENT } from '../../ops-tokens';
import {
  OpsCard,
  OpsCardHeader,
  OpsCardContent,
  OpsText,
  OpsCode
} from '../../ops-ui';

/**
 * ContentProjectsView - Content projects table explanation with project types
 */
export const ContentProjectsView: React.FC = () => {
  return (
    <OpsCard>
      <OpsCardHeader title={CONTENT_PROJECTS_EXPLANATION.title} />
      <OpsCardContent>
        <OpsText className="text-foreground mb-6">
          {CONTENT_PROJECTS_EXPLANATION.definition}
        </OpsText>

        {/* Project Types Grid */}
        <div className="mb-6">
          <h4 className="text-xs font-bold uppercase text-muted-foreground mb-4">Tipos de Projeto</h4>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(CONTENT_PROJECTS_EXPLANATION.projectTypes).map(([category, types]) => (
              <div key={category} className="p-4 rounded-lg bg-muted/20 border border-border/40 hover:border-border/60 transition-colors">
                <div className="text-xs font-bold uppercase mb-3 flex items-center gap-2" style={{ color: OPS_ACCENT }}>
                  <span className="w-1 h-3 rounded-full bg-current"></span>
                  {category}
                </div>
                <div className="space-y-2">
                  {types.map((type, i) => (
                    <div key={i} className="text-xs text-muted-foreground pl-3 border-l-2 border-border/20">
                      {type}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Example Project */}
        <div className="p-5 rounded-lg bg-muted/20 border border-border/40 shadow-sm">
          <h4 className="text-xs font-bold uppercase text-muted-foreground mb-4">Exemplo de Projeto</h4>
          <div className="mb-4 flex items-center gap-3">
            <OpsCode className="text-base">
              {CONTENT_PROJECTS_EXPLANATION.example.projectName}
            </OpsCode>
            <Badge variant="outline" className="text-xs px-2 py-0.5 border-border/40">
              {CONTENT_PROJECTS_EXPLANATION.example.projectType}
            </Badge>
          </div>
          <div className="space-y-3 pl-4 border-l-2 border-border/20">
            {CONTENT_PROJECTS_EXPLANATION.example.contents.map((content, i) => (
              <div key={i} className="flex items-center gap-3 text-sm">
                <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: OPS_ACCENT }} />
                <span className="text-foreground">{content.title}</span>
                <Badge variant="outline" className="text-[10px] opacity-70 border-border/30">
                  {content.contentType}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </OpsCardContent>
    </OpsCard>
  );
};

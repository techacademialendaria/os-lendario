import React from 'react';
import { Icon } from '../../../ui/icon';
import { OpsCard, OpsCardHeader, OpsCardContent } from '../../ops-ui';

export const ReferencesLinksView: React.FC = () => {
  return (
    <OpsCard>
      <OpsCardHeader title="Referencias & Aprofundamento" accentColor="text-muted-foreground" />
      <OpsCardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <a
            href="https://fs.blog/mental-models/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-lg bg-muted/20 border border-border/40 hover:border-border/60 transition-colors group"
          >
            <div className="flex items-start justify-between mb-2">
              <h4 className="font-bold text-sm text-foreground group-hover:text-primary transition-colors">
                Farnam Street
              </h4>
              <Icon name="link" size="size-3.5" className="text-muted-foreground" />
            </div>
            <p className="text-xs text-muted-foreground">
              Biblioteca abrangente de modelos mentais organizados por disciplina. Inclui
              explicacoes detalhadas e exemplos praticos.
            </p>
          </a>

          <a
            href="https://nesslabs.com/mental-models"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-lg bg-muted/20 border border-border/40 hover:border-border/60 transition-colors group"
          >
            <div className="flex items-start justify-between mb-2">
              <h4 className="font-bold text-sm text-foreground group-hover:text-primary transition-colors">
                Ness Labs
              </h4>
              <Icon name="link" size="size-3.5" className="text-muted-foreground" />
            </div>
            <p className="text-xs text-muted-foreground">
              Exploracao profunda de como modelos mentais funcionam, com foco em pensamento
              critico e tomada de decisao.
            </p>
          </a>
        </div>
      </OpsCardContent>
    </OpsCard>
  );
};

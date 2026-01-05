import React from 'react';
import { Icon } from '../../../ui/icon';
import { OpsCard, OpsCardHeader, OpsCardContent } from '../../ops-ui';
import { OPS_ACCENT, OPS_PRIMARY } from '../../ops-tokens';
import { MENTAL_MODELS_REFERENCES } from '../../data/mental-models-content';

export const ReferencesView: React.FC = () => {
  return (
    <OpsCard>
      <OpsCardHeader title="Referencias & Aprofundamento" accentColor="text-muted-foreground" />
      <OpsCardContent>
        <div className="space-y-6">
          {/* Books */}
          <div>
            <h4 className="font-bold text-sm mb-3" style={{ color: OPS_ACCENT }}>Livros Recomendados</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {MENTAL_MODELS_REFERENCES.books.map((book, i) => (
                <div key={i} className="p-3 rounded-lg bg-muted/20 border border-border/20">
                  <h5 className="font-bold text-xs text-foreground mb-1">{book.title}</h5>
                  <p className="text-[10px] text-muted-foreground mb-2">{book.author}</p>
                  <p className="text-[10px] text-muted-foreground">
                    <span className="font-medium">Foco:</span> {book.focus}
                  </p>
                  <p className="text-[9px] italic text-primary mt-1">{book.relevance}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Websites */}
          <div>
            <h4 className="font-bold text-sm mb-3" style={{ color: OPS_ACCENT }}>Websites & Recursos</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {MENTAL_MODELS_REFERENCES.websites.map((site, i) => (
                <a
                  key={i}
                  href={site.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg bg-muted/20 border border-border/40 hover:border-border/60 transition-colors group"
                >
                  <div className="flex items-start justify-between mb-1">
                    <h5 className="font-bold text-sm text-foreground group-hover:text-primary transition-colors">
                      {site.name}
                    </h5>
                    <Icon name="link" size="size-3.5" className="text-muted-foreground" />
                  </div>
                  <p className="text-[10px] text-muted-foreground">{site.focus}</p>
                </a>
              ))}
            </div>
          </div>

          {/* Key Thinkers */}
          <div>
            <h4 className="font-bold text-sm mb-3" style={{ color: OPS_ACCENT }}>Pensadores Influentes</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {MENTAL_MODELS_REFERENCES.key_thinkers.map((thinker, i) => (
                <div key={i} className="p-3 rounded-lg bg-muted/20 border-l-4" style={{ borderColor: OPS_PRIMARY }}>
                  <h5 className="font-bold text-xs text-foreground mb-1">{thinker.name}</h5>
                  <p className="text-[10px] text-muted-foreground mb-1">
                    <span className="font-medium">Especialidade:</span> {thinker.specialty}
                  </p>
                  <p className="text-[9px] italic text-primary">
                    <span className="font-medium">Modelo:</span> {thinker.model}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </OpsCardContent>
    </OpsCard>
  );
};

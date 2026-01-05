import React from 'react';
import { Icon } from '../../../ui/icon';
import { OpsCard, OpsCardHeader, OpsCardContent } from '../../ops-ui';
import { OPS_ACCENT, OPS_PRIMARY } from '../../ops-tokens';
import type { CategoriesViewProps } from '../types';

interface MentalModel {
  slug: string;
  name: string;
  desc: string;
  origin: string;
  complexity: number;
  applicability: number;
  useCase: string;
  example: string;
  driverAffinities: string[];
}

interface Category {
  name: string;
  icon: string;
  description: string;
  models: MentalModel[];
}

interface CategoriesViewFullProps extends CategoriesViewProps {
  categories: Category[];
}

export const CategoriesView: React.FC<CategoriesViewFullProps> = ({
  categories,
  expandedCategory,
  expandedModel,
  onToggleCategory,
  onToggleModel,
}) => {
  return (
    <OpsCard>
      <OpsCardHeader title="Categorias de Modelos Mentais" accentColor="text-muted-foreground" />
      <OpsCardContent>
        <div className="space-y-4">
          {categories.map((category, idx) => (
            <div
              key={idx}
              className="rounded-lg border border-border/40 overflow-hidden hover:border-border/60 transition-colors"
            >
              {/* Header */}
              <button
                onClick={() => onToggleCategory(category.name)}
                className="w-full p-4 bg-muted/10 hover:bg-muted/20 transition-colors flex items-center justify-between group"
              >
                <div className="flex items-center gap-3 flex-1">
                  <Icon
                    name={category.icon}
                    size="size-5"
                    style={{ color: OPS_ACCENT }}
                  />
                  <div className="text-left">
                    <h3 className="font-bold text-sm" style={{ color: OPS_ACCENT }}>
                      {category.name}
                    </h3>
                    <p className="text-xs text-muted-foreground">{category.description}</p>
                  </div>
                  <span className="text-xs bg-muted/50 px-2 py-1 rounded text-muted-foreground ml-auto">
                    {category.models.length} modelos
                  </span>
                </div>
                <Icon
                  name={expandedCategory === category.name ? 'angle-small-up' : 'angle-small-down'}
                  size="size-4"
                  className="text-muted-foreground group-hover:text-foreground ml-2"
                />
              </button>

              {/* Content */}
              {expandedCategory === category.name && (
                <div className="p-4 border-t border-border/20 bg-background space-y-3">
                  {category.models.map((model, i) => (
                    <button
                      key={i}
                      onClick={() => onToggleModel(model.slug)}
                      className="w-full text-left p-3 rounded-lg bg-muted/20 border-l-4 hover:bg-muted/30 transition-all"
                      style={{ borderColor: OPS_PRIMARY }}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-bold text-sm text-foreground mb-1">
                            {model.name}
                          </h4>
                          <p className="text-xs text-muted-foreground mb-2">
                            {model.desc}
                          </p>
                          <div className="flex flex-wrap gap-1">
                            <span className="text-[10px] bg-muted/50 px-1.5 py-0.5 rounded text-muted-foreground">
                              {model.origin}
                            </span>
                            <span className="text-[10px] bg-muted/50 px-1.5 py-0.5 rounded text-muted-foreground">
                              Complexidade: {model.complexity}/10
                            </span>
                            <span className="text-[10px] bg-muted/50 px-1.5 py-0.5 rounded text-muted-foreground">
                              Aplicabilidade: {model.applicability}/10
                            </span>
                          </div>
                        </div>
                        {expandedModel === model.slug && (
                          <Icon name="angle-small-up" size="size-4" className="text-muted-foreground ml-2 flex-shrink-0" />
                        )}
                      </div>

                      {/* Expanded Details */}
                      {expandedModel === model.slug && (
                        <div className="mt-3 pt-3 border-t border-border/20 space-y-2">
                          <div className="text-xs">
                            <span className="font-medium text-muted-foreground">Quando usar: </span>
                            <span className="text-foreground">{model.useCase}</span>
                          </div>
                          <div className="text-xs italic" style={{ color: OPS_PRIMARY }}>
                            <span className="font-medium">Exemplo: </span>
                            {model.example}
                          </div>
                          <div className="flex flex-wrap gap-1 pt-1">
                            {model.driverAffinities.map((affinity, j) => (
                              <span key={j} className="text-[9px] bg-primary/10 text-primary px-1.5 py-0.5 rounded">
                                {affinity}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </OpsCardContent>
    </OpsCard>
  );
};

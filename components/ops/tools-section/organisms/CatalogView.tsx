import React from 'react';
import { Icon } from '../../../ui/icon';
import { TOOL_CATALOG } from '../../data/tool-content';
import { OPS_ACCENT, OPS_PRIMARY } from '../../ops-tokens';
import {
  OpsCard,
  OpsCardHeader,
  OpsCardContent
} from '../../ops-ui';

interface CatalogViewProps {
  selectedCatalogType: string;
  onSelectType: (type: string) => void;
  catalogTypes: Array<keyof typeof TOOL_CATALOG>;
  selectedCatalog: typeof TOOL_CATALOG[keyof typeof TOOL_CATALOG];
}

export const CatalogView: React.FC<CatalogViewProps> = ({
  selectedCatalogType,
  onSelectType,
  catalogTypes,
  selectedCatalog
}) => {
  return (
    <OpsCard>
      <OpsCardHeader title="Catalogo de Tools - Deep Dive" accentColor="text-muted-foreground" />
      <OpsCardContent>
        {/* Type Selector */}
        <div className="flex flex-wrap gap-2 mb-4">
          {catalogTypes.map((type) => {
            const catalog = TOOL_CATALOG[type];
            const isSelected = type === selectedCatalogType;
            return (
              <button
                key={type}
                onClick={() => onSelectType(type)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${isSelected
                  ? 'bg-opacity-100 text-white'
                  : 'bg-muted/30 text-muted-foreground hover:bg-muted/50'
                }`}
                style={isSelected ? { backgroundColor: OPS_ACCENT } : {}}
              >
                <Icon name={catalog.icon} size="size-3" />
                {type.replace('_', ' ')}
              </button>
            );
          })}
        </div>

        {/* Selected Type Content */}
        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-muted/10 border-l-4" style={{ borderColor: OPS_ACCENT }}>
            <h4 className="font-bold text-sm mb-1" style={{ color: OPS_ACCENT }}>
              {selectedCatalog.title}
            </h4>
            <p className="text-xs text-muted-foreground">{selectedCatalog.description}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            {selectedCatalog.examples.map((tool, i) => (
              <div key={i} className="p-3 rounded-lg bg-muted/20 space-y-2">
                <div className="flex items-start justify-between">
                  <h5 className="font-bold text-sm" style={{ color: OPS_ACCENT }}>{tool.name}</h5>
                  <span className="text-[10px] text-muted-foreground bg-muted/20 px-1.5 py-0.5 rounded">
                    {tool.origin}
                  </span>
                </div>
                <p className="text-xs text-foreground">{tool.description}</p>
                <div className="space-y-1">
                  <p className="text-[10px] text-muted-foreground">
                    <span className="font-medium">Quando usar:</span> {tool.useCase}
                  </p>
                  <p className="text-[10px] italic" style={{ color: OPS_PRIMARY }}>
                    <span className="font-medium">Exemplo:</span> {tool.example}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </OpsCardContent>
    </OpsCard>
  );
};

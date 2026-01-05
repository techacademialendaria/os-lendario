// Export Format Selector Component
// Allows user to select export format destination

import React from 'react';
import { Icon } from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ExportFormat, EXPORT_FORMATS, STUDIO_TEAL } from '../types';

interface ExportFormatSelectorProps {
  selectedFormat: ExportFormat;
  onSelectFormat: (format: ExportFormat) => void;
  onDownloadAll: () => void;
}

export const ExportFormatSelector: React.FC<ExportFormatSelectorProps> = ({
  selectedFormat,
  onSelectFormat,
  onDownloadAll,
}) => (
  <div className="space-y-4 lg:col-span-4">
    <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-muted-foreground">
      Destino
    </h3>

    {(Object.keys(EXPORT_FORMATS) as ExportFormat[]).map((key) => {
      const format = EXPORT_FORMATS[key];
      const isSelected = selectedFormat === key;

      return (
        <button
          key={key}
          onClick={() => onSelectFormat(key)}
          className={cn(
            'flex w-full items-center gap-4 rounded-xl border-2 p-4 text-left transition-all',
            isSelected
              ? 'bg-[var(--studio-teal)]/5 border-[var(--studio-teal)] shadow-md'
              : 'border-border hover:border-muted-foreground/50'
          )}
          style={{ '--studio-teal': STUDIO_TEAL } as React.CSSProperties}
        >
          <div
            className={cn(
              'flex size-10 items-center justify-center rounded-lg',
              isSelected ? 'bg-[var(--studio-teal)] text-white' : 'bg-muted'
            )}
            style={isSelected ? { backgroundColor: STUDIO_TEAL } : {}}
          >
            <Icon name={format.icon} size="size-5" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h4 className="font-bold">{format.title}</h4>
              {key === 'lovable' && (
                <Badge className="text-[10px]" style={{ backgroundColor: STUDIO_TEAL }}>
                  {format.badge}
                </Badge>
              )}
            </div>
            <p className="text-xs text-muted-foreground">{format.desc}</p>
          </div>
        </button>
      );
    })}

    <Button
      variant="outline"
      className="mt-4 h-12 w-full gap-2 border-dashed"
      onClick={onDownloadAll}
    >
      <Icon name="download" size="size-4" />
      Baixar Tudo (.zip)
    </Button>
  </div>
);

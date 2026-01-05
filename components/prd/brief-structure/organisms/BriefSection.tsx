// BriefSection - Individual editable section of the brief
// Handles both text and array-based sections

import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { BriefSectionProps } from '../types';

export const BriefSection: React.FC<BriefSectionProps> = ({
  config,
  value,
  onChange,
  onRegenerate,
  isRegenerating,
}) => {
  const isEmpty = config.isArray
    ? (value as string[]).filter((v) => v.trim()).length === 0
    : !(value as string).trim();

  const handleArrayItemChange = (index: number, newValue: string) => {
    const arr = [...(value as string[])];
    arr[index] = newValue;
    onChange(arr);
  };

  const handleAddItem = () => {
    onChange([...(value as string[]), '']);
  };

  const handleRemoveItem = (index: number) => {
    const arr = (value as string[]).filter((_, i) => i !== index);
    onChange(arr);
  };

  return (
    <Card
      className={cn(
        'p-4 transition-all',
        config.required && isEmpty && 'border-amber-500/50 bg-amber-500/5'
      )}
    >
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon name={config.icon} className="text-muted-foreground" size="size-4" />
          <h3 className="font-bold text-foreground">{config.label}</h3>
          {config.required && (
            <Badge variant="outline" className="text-[10px]">
              Obrigatorio
            </Badge>
          )}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onRegenerate}
          disabled={isRegenerating}
          className="h-8"
        >
          <Icon
            name={isRegenerating ? 'spinner' : 'refresh'}
            className={cn('mr-1.5 size-3', isRegenerating && 'animate-spin')}
          />
          Regenerar
        </Button>
      </div>

      {config.isArray ? (
        <div className="space-y-2">
          {(value as string[]).map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">-</span>
              <Input
                value={item}
                onChange={(e) => handleArrayItemChange(i, e.target.value)}
                placeholder={config.placeholder}
                className="flex-1"
              />
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 shrink-0 text-muted-foreground hover:text-destructive"
                onClick={() => handleRemoveItem(i)}
              >
                <Icon name="cross" size="size-3" />
              </Button>
            </div>
          ))}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleAddItem}
            className="text-muted-foreground"
          >
            <Icon name="plus" className="mr-1.5 size-3" />
            Adicionar
          </Button>
        </div>
      ) : (
        <Textarea
          value={value as string}
          onChange={(e) => onChange(e.target.value)}
          className="min-h-[100px] resize-none"
          placeholder={config.placeholder}
        />
      )}
    </Card>
  );
};

export default BriefSection;

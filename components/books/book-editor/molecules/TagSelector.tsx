import React from 'react';
import { Icon } from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import type { TagSelectorProps } from '../types';

export const TagSelector: React.FC<TagSelectorProps> = ({
  label,
  selectedSlugs,
  options,
  onToggle,
  variant = 'category',
  singleSelect = false,
}) => {
  const isSelected = (slug: string) => selectedSlugs.includes(slug);

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">{label}</label>
      <div className="flex min-h-10 flex-wrap gap-2 rounded-md border border-input bg-muted/10 p-2">
        {selectedSlugs.map((slug) => {
          const option = options.find((o) => o.slug === slug);
          return (
            <Badge
              key={slug}
              variant={variant === 'collection' ? 'outline' : 'secondary'}
              className={cn(
                'cursor-pointer gap-1',
                variant === 'collection' && 'border-brand-gold/30 bg-brand-gold/5 text-brand-gold'
              )}
              onClick={() => onToggle(slug)}
            >
              {option?.name || slug} <Icon name="cross" size="size-2" />
            </Badge>
          );
        })}
        <DropdownMenu
          trigger={
            <Button
              variant="ghost"
              size="sm"
              className="h-6 px-2 text-[10px] font-bold uppercase text-primary hover:bg-primary/5"
            >
              + Adicionar
            </Button>
          }
        >
          {options.map((option) => (
            <DropdownMenuItem
              key={option.slug}
              onClick={() => onToggle(option.slug)}
              className={cn(isSelected(option.slug) && 'bg-primary/10')}
            >
              {isSelected(option.slug) && <Icon name="check" size="size-3" className="mr-2" />}
              {option.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenu>
      </div>
    </div>
  );
};

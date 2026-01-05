import React from 'react';
import { Button } from '../../../../ui/button';
import { Icon } from '../../../../ui/icon';
import { cn } from '../../../../../lib/utils';
import { CategorySelectorProps, CATEGORY_CONFIG, WOWCategory } from '../types';

const CATEGORIES: WOWCategory[] = ['insight', 'question', 'idea', 'risk'];

export const CategorySelector: React.FC<CategorySelectorProps> = ({ selected, onSelect }) => {
  return (
    <div className="flex gap-2">
      {CATEGORIES.map((cat) => {
        const config = CATEGORY_CONFIG[cat];
        const isSelected = selected === cat;
        return (
          <Button
            key={cat}
            type="button"
            variant={isSelected ? 'default' : 'outline'}
            size="sm"
            onClick={() => onSelect(cat)}
            className={cn(
              'flex items-center gap-1.5 transition-all',
              isSelected && config.bgColor,
              isSelected && config.color,
              isSelected && 'border-transparent'
            )}
          >
            <Icon name={config.icon} size="size-3" />
            <span className="hidden sm:inline">{config.label}</span>
          </Button>
        );
      })}
    </div>
  );
};

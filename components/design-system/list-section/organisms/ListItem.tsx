import React from 'react';
import { Icon } from '@/components/ui/icon';
import { cn } from '@/lib/utils';
import type { ListItemProps, ColorVariant } from '../types';
import { colorMap } from '../data';

export const ListItem: React.FC<ListItemProps> = ({
  style = 'standard',
  color = 'dark',
  shape = 'circle',
  label,
  className,
}) => {
  const colors = colorMap[color];
  const radius = shape === 'circle' ? 'rounded-full' : 'rounded-md';

  // Define Icon Container Styles based on style variant
  const getIconStyles = (): { container: string; icon: string } => {
    switch (style) {
      case 'standard':
        return {
          container: 'w-5 h-5 flex items-center justify-center shrink-0',
          icon: colors.text,
        };
      case 'white':
        return {
          container: cn(
            'w-5 h-5 flex items-center justify-center bg-card border border-border shadow-sm shrink-0',
            radius
          ),
          icon: colors.text,
        };
      case 'soft':
        return {
          container: cn('w-5 h-5 flex items-center justify-center shrink-0', colors.bg, radius),
          icon: colors.iconColor,
        };
      case 'soft-outlined':
        return {
          container: cn(
            'w-5 h-5 flex items-center justify-center border shrink-0',
            colors.bg,
            colors.border,
            radius
          ),
          icon: colors.iconColor,
        };
      case 'solid':
        return {
          container: cn('w-5 h-5 flex items-center justify-center shrink-0', colors.bgSolid, radius),
          icon: getSolidIconColor(color),
        };
      case 'outlined':
        return {
          container: cn(
            'w-5 h-5 flex items-center justify-center border bg-transparent shrink-0',
            colors.border,
            radius
          ),
          icon: colors.text,
        };
      default:
        return {
          container: 'w-5 h-5 flex items-center justify-center shrink-0',
          icon: colors.text,
        };
    }
  };

  const { container, icon } = getIconStyles();

  return (
    <div className={cn('flex items-start gap-3', className)}>
      <div className={cn(container, 'mt-0.5')}>
        <Icon name="check" className={cn('h-3 w-3', icon)} />
      </div>
      <span className="text-sm font-medium leading-tight text-foreground/90">{label}</span>
    </div>
  );
};

// Helper function for solid style contrast
function getSolidIconColor(color: ColorVariant): string {
  if (color === 'yellow' || color === 'primary') {
    return 'text-black';
  }
  if (color === 'dark') {
    return 'text-background';
  }
  return 'text-white dark:text-black';
}

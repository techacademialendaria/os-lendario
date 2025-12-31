import React from 'react';
import { Button } from '../../ui/button';
import { Icon, type IconName } from '../../ui/icon';
import { cn } from '../../../lib/utils';

interface SectionHeaderProps {
  title: string;
  icon?: IconName;
  iconClassName?: string;
  onViewAll?: () => void;
  viewAllLabel?: string;
  viewAllVariant?: 'primary' | 'secondary';
  className?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  icon,
  iconClassName,
  onViewAll,
  viewAllLabel = 'Ver todos',
  viewAllVariant = 'secondary',
  className,
}) => {
  return (
    <div className={cn('mb-6 flex items-center justify-between', className)}>
      <h2 className="flex items-center gap-2 font-sans text-2xl font-bold">
        {icon && <Icon name={icon} className={cn('text-brand-gold', iconClassName)} />}
        {title}
      </h2>
      {onViewAll && (
        <Button
          size="sm"
          variant={viewAllVariant === 'primary' ? 'secondary' : 'outline'}
          className={cn(
            'h-7 rounded-full px-4 text-xs font-bold',
            viewAllVariant === 'primary'
              ? 'bg-brand-gold text-black hover:bg-brand-gold/90'
              : 'border-muted-foreground/30 text-muted-foreground hover:text-foreground'
          )}
          onClick={onViewAll}
        >
          {viewAllLabel} <Icon name="angle-small-right" className="ml-1" />
        </Button>
      )}
    </div>
  );
};

export default SectionHeader;

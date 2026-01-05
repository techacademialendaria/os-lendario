import React from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { LanguageIndicatorProps } from '../types';

/**
 * LanguageIndicator - Shows which languages a book has content for
 */
export const LanguageIndicator: React.FC<LanguageIndicatorProps> = ({ book }) => (
  <div className="flex items-center gap-1">
    <Badge
      variant={book.languages.pt ? 'success' : 'outline'}
      size="sm"
      className={cn('px-1.5 text-[9px]', !book.languages.pt && 'opacity-30')}
    >
      PT
    </Badge>
    <Badge
      variant={book.languages.en ? 'info' : 'outline'}
      size="sm"
      className={cn('px-1.5 text-[9px]', !book.languages.en && 'opacity-30')}
    >
      EN
    </Badge>
    <Badge
      variant={book.languages.es ? 'warning' : 'outline'}
      size="sm"
      className={cn('px-1.5 text-[9px]', !book.languages.es && 'opacity-30')}
    >
      ES
    </Badge>
  </div>
);

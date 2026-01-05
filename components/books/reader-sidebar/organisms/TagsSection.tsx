import React from 'react';
import { Badge } from '@/components/ui/badge';
import type { TagsSectionProps } from '../types';

/**
 * TagsSection - Book tags with navigation
 */
export const TagsSection: React.FC<TagsSectionProps> = ({ tags, onNavigateToCategory }) => (
  <div className="pt-4">
    <p className="mb-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">
      Tags
    </p>
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <Badge
          key={tag.slug}
          variant="secondary"
          className="cursor-pointer text-xs hover:bg-muted"
          onClick={() => onNavigateToCategory(tag.slug)}
        >
          {tag.name}
        </Badge>
      ))}
    </div>
  </div>
);

export default TagsSection;

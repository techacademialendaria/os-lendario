import React, { useState } from 'react';
import { cn } from '../../../lib/utils';
import { Icon } from '../../ui/icon';

// DiceBear fallback for missing local images
const getDiceBearUrl = (slug: string): string => {
  return `https://api.dicebear.com/7.x/initials/svg?seed=${slug}&backgroundColor=0d9488`;
};

interface MindCardSelectProps {
  id: string;
  slug: string;
  name: string;
  shortBio: string;
  avatar: string;
  apexScore: number | null;
  selected: boolean;
  onClick: () => void;
}

const MindCardSelectComponent: React.FC<MindCardSelectProps> = ({
  name,
  shortBio,
  avatar,
  apexScore,
  selected,
  onClick,
  slug,
}) => {
  const [imgError, setImgError] = useState(false);
  const avatarSrc = imgError ? getDiceBearUrl(slug) : avatar;

  return (
    <div
      onClick={onClick}
      className={cn(
        'group relative cursor-pointer overflow-hidden rounded-xl border p-4 transition-all duration-300',
        selected ? 'border-primary bg-primary/10' : 'border-border bg-card hover:border-primary/50'
      )}
    >
      {selected && (
        <div className="absolute right-2 top-2 text-primary">
          <Icon name="check-circle" type="solid" />
        </div>
      )}
      <div className="flex flex-col items-center gap-3 text-center">
        <img
          src={avatarSrc}
          alt={name}
          className="h-16 w-16 rounded-full border-2 border-transparent bg-zinc-900 object-cover"
          onError={() => setImgError(true)}
        />
        <div>
          <h4 className="text-sm font-bold text-foreground">{name}</h4>
          <p className="line-clamp-2 text-xs text-muted-foreground">{shortBio}</p>
        </div>
        {apexScore && (
          <div className="flex gap-2 font-mono text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Icon name="crown" size="size-3" /> {Math.round(apexScore * 100)}%
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

/**
 * MindCardSelect with memoization
 * Prevents unnecessary re-renders in selection lists
 */
export const MindCardSelect = React.memo(MindCardSelectComponent);

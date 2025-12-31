import React from 'react';
import { cn } from '../../lib/utils';
import { Icon } from '../ui/icon';

// =============================================================================
// SIMPLE VARIANT - Books style (exact copy from BookCard.tsx)
// =============================================================================
const simpleGradients = [
  'from-amber-600 to-orange-800',
  'from-blue-600 to-indigo-800',
  'from-emerald-600 to-teal-800',
  'from-purple-600 to-violet-800',
  'from-rose-600 to-pink-800',
  'from-cyan-600 to-sky-800',
];

// =============================================================================
// LIQUID VARIANT - LMS style (Academia Lendaria brand)
// =============================================================================
const liquidPalettes = [
  { bg: 'bg-zinc-950', blobs: ['bg-brand-indigo', 'bg-brand-teal', 'bg-brand-gold'] },
  { bg: 'bg-zinc-950', blobs: ['bg-brand-pink', 'bg-brand-orange', 'bg-brand-gold'] },
  { bg: 'bg-zinc-950', blobs: ['bg-brand-teal', 'bg-brand-mint', 'bg-brand-blue'] },
  { bg: 'bg-zinc-950', blobs: ['bg-brand-gold', 'bg-brand-brown', 'bg-brand-orange'] },
  { bg: 'bg-zinc-950', blobs: ['bg-brand-blue', 'bg-brand-cyan', 'bg-brand-indigo'] },
  { bg: 'bg-zinc-950', blobs: ['bg-brand-pink', 'bg-brand-indigo', 'bg-brand-teal'] },
];

/**
 * Type-specific default icons for media items
 */
const typeDefaultIcons: Record<string, string> = {
  book: 'book',
  course: 'graduation-cap',
  article: 'page',
  default: 'image',
};

// =============================================================================
// HASH FUNCTIONS - Deterministic selection based on title
// =============================================================================

/**
 * Simple index from first char (Books style - exact match to BookCard.tsx)
 * Uses only first character for index selection.
 */
function getSimpleGradientIndex(str: string): number {
  return str.charCodeAt(0) % simpleGradients.length;
}

/**
 * Generates a deterministic hash from a string (LMS style).
 * Same input always produces the same output, ensuring consistent palette selection.
 */
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash);
}

/**
 * Get a color palette based on string hash for consistency.
 * The same title will always get the same palette.
 */
function getPalette(str: string) {
  const hash = hashString(str);
  return liquidPalettes[hash % liquidPalettes.length];
}

export interface MediaCoverProps {
  /** Image URL. If provided, renders an <img> element. */
  image?: string | null;
  /** Title used for alt text and palette generation. */
  title: string;
  /**
   * Visual variant:
   * - 'simple' = Books style (single gradient from-X to-Y with centered icon)
   * - 'liquid' = LMS style (organic blob background with optional title)
   * Default: 'liquid'
   */
  variant?: 'simple' | 'liquid';
  /** Media type - affects default icon if no categoryIcon provided. */
  type?: 'book' | 'course' | 'article' | 'default';
  /** Icon name to display as watermark on liquid background. */
  categoryIcon?: string;
  /** Whether to show the title overlay on liquid backgrounds. Default: true for liquid, false for simple */
  showTitle?: boolean;
  /** Whether to show the icon. Default: true for simple, depends on categoryIcon for liquid */
  showIcon?: boolean;
  /** Additional CSS classes for the container. */
  className?: string;
  /** Children to render on top of the cover */
  children?: React.ReactNode;
}

/**
 * MediaCover - A generalized cover component for media items (courses, books, articles).
 *
 * Supports two visual variants:
 * - 'simple' (Books): Single gradient background with centered icon
 * - 'liquid' (LMS): Organic blob background with optional title overlay
 *
 * The colors are deterministically generated from the title, ensuring
 * consistent appearance across renders.
 *
 * @example
 * // With image
 * <MediaCover image="/path/to/image.jpg" title="My Course" />
 *
 * @example
 * // Books style - simple gradient with book icon
 * <MediaCover title="Atomic Habits" variant="simple" type="book" />
 *
 * @example
 * // LMS style - liquid blobs with title
 * <MediaCover title="Introduction to AI" variant="liquid" />
 *
 * @example
 * // With custom icon watermark
 * <MediaCover title="Marketing Basics" categoryIcon="megaphone" showTitle={false} />
 */
export function MediaCover({
  image,
  title,
  variant = 'liquid',
  type = 'default',
  categoryIcon,
  showTitle,
  showIcon,
  className = '',
  children,
}: MediaCoverProps) {
  // If image is provided, render it directly
  if (image) {
    return (
      <>
        <img
          src={image}
          alt={title}
          className={cn('h-full w-full object-cover', className)}
        />
        {children}
      </>
    );
  }

  // =============================================================================
  // SIMPLE VARIANT (Books style - exact match to BookCard.tsx)
  // =============================================================================
  if (variant === 'simple') {
    const gradientIndex = getSimpleGradientIndex(title);
    const gradient = simpleGradients[gradientIndex];
    const shouldShowIcon = showIcon !== undefined ? showIcon : true;
    const iconToShow = categoryIcon || typeDefaultIcons[type] || typeDefaultIcons.default;

    return (
      <div
        className={cn(
          'flex h-full w-full items-center justify-center bg-gradient-to-br',
          gradient,
          className
        )}
      >
        {shouldShowIcon && iconToShow && (
          <Icon name={iconToShow} className="text-white/50" size="size-6" />
        )}
        {children}
      </div>
    );
  }

  // =============================================================================
  // LIQUID VARIANT (LMS style - default)
  // =============================================================================
  const palette = getPalette(title);
  const shouldShowTitle = showTitle !== undefined ? showTitle : true;
  const iconToShow = categoryIcon || (showIcon ? typeDefaultIcons[type] : null);

  return (
    <div className={cn('relative h-full w-full overflow-hidden', palette.bg, className)}>
      {/* Organic liquid blobs - three overlapping gradients */}
      <div
        className={cn(
          'absolute -left-1/4 -top-1/4 h-3/4 w-3/4 rounded-full opacity-60 blur-3xl',
          palette.blobs[0]
        )}
      />
      <div
        className={cn(
          'absolute -bottom-1/4 -right-1/4 h-2/3 w-2/3 rounded-full opacity-50 blur-3xl',
          palette.blobs[1]
        )}
      />
      <div
        className={cn(
          'absolute left-1/3 top-1/2 h-1/2 w-1/2 rounded-full opacity-40 blur-2xl',
          palette.blobs[2]
        )}
      />

      {/* Category icon watermark (centered, subtle) */}
      {iconToShow && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Icon name={iconToShow} className="text-6xl text-white/20" />
        </div>
      )}

      {/* Title overlay */}
      {shouldShowTitle && (
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <h3 className="line-clamp-3 text-center font-serif text-xl font-bold leading-tight text-white drop-shadow-lg">
            {title}
          </h3>
        </div>
      )}

      {children}
    </div>
  );
}

// =============================================================================
// HELPER EXPORTS (for cases that need just the gradient/palette)
// =============================================================================

/** Get simple gradient class by title (for inline Books usage) */
export function getSimpleGradient(title: string): string {
  return simpleGradients[getSimpleGradientIndex(title)];
}

/** Get liquid palette by title (for inline LMS usage) */
export function getLiquidPalette(title: string) {
  return getPalette(title);
}

export default MediaCover;

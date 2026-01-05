/**
 * Types for MarkdownRenderer component
 */

import type { ReactNode } from 'react';

// ============================================================================
// Main Component Props
// ============================================================================

export interface MarkdownRendererProps {
  content: string;
  className?: string;
  variant?: 'article' | 'compact' | 'lesson';
  /** Remove the first H1 heading from content (useful when title is already displayed) */
  skipFirstHeading?: boolean;
  /** When true, text inherits color from parent instead of using theme colors */
  inheritColors?: boolean;
  /** Enable lead paragraph styling (first paragraph larger) */
  leadParagraph?: boolean;
}

// ============================================================================
// Internal Component Props
// ============================================================================

export interface MermaidBlockProps {
  chart: string;
  id: string;
}

export interface HeadingProps {
  children: ReactNode;
  level: 1 | 2 | 3 | 4 | 5 | 6;
  textColor: string;
  textColorLight: string;
  paragraphCountRef?: React.MutableRefObject<number>;
}

export interface ParagraphProps {
  children: ReactNode;
  textColorMuted: string;
  leadParagraph: boolean;
  paragraphCountRef: React.MutableRefObject<number>;
}

export interface ListProps {
  children: ReactNode;
  textColorMuted: string;
  ordered?: boolean;
}

export interface ListItemProps {
  children: ReactNode;
  textColorMuted: string;
  className?: string;
}

export interface CodeBlockProps {
  children: ReactNode;
  className?: string;
  inheritColors: boolean;
  textColorMuted: string;
}

export interface TableProps {
  children: ReactNode;
  inheritColors: boolean;
  textColor: string;
  textColorMuted: string;
}

export interface LinkProps {
  href?: string;
  children: ReactNode;
}

export interface ImageProps {
  src?: string;
  alt?: string;
  textColorLight: string;
}

// ============================================================================
// Color Context
// ============================================================================

export interface ColorContext {
  textColor: string;
  textColorMuted: string;
  textColorLight: string;
  inheritColors: boolean;
}

// ============================================================================
// Variant Types
// ============================================================================

export type MarkdownVariant = 'article' | 'compact' | 'lesson';

export const VARIANT_CLASSES: Record<MarkdownVariant, string> = {
  article: 'prose-lg',
  compact: 'prose-sm',
  lesson: 'prose-base md:prose-lg',
};

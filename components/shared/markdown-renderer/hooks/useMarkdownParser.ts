/**
 * useMarkdownParser - Hook for markdown parsing configuration
 * Handles content processing, color context, and component generation
 */

import { useRef, useMemo } from 'react';
import { cn } from '@/lib/utils';
import {
  createHeadingComponents,
  createListComponents,
  createCodeComponents,
  createTableComponents,
  createMiscComponents,
} from '../organisms';
import type { ColorContext, MarkdownRendererProps, MarkdownVariant } from '../types';
import { VARIANT_CLASSES } from '../types';

/**
 * Remove the first H1 heading from markdown content
 */
const removeFirstH1 = (content: string): string => {
  return content.replace(/^#\s+[^\n]+\n*/, '').trim();
};

/**
 * Generate base prose classes for markdown container
 */
const getBaseClasses = (inheritColors: boolean, className?: string): string => {
  return cn(
    'prose max-w-none',
    !inheritColors && 'dark:prose-invert',
    'prose-headings:font-sans',
    inheritColors ? 'prose-headings:text-inherit' : 'prose-headings:text-foreground',
    'prose-p:leading-relaxed',
    inheritColors ? 'prose-p:text-inherit prose-p:opacity-90' : 'prose-p:text-foreground/90',
    inheritColors ? 'prose-strong:text-inherit' : 'prose-strong:text-foreground',
    'prose-strong:font-bold',
    inheritColors ? 'prose-em:text-inherit prose-em:opacity-80' : 'prose-em:text-foreground/80',
    'prose-em:italic',
    'prose-blockquote:border-l-4 prose-blockquote:border-primary/50 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r-lg prose-blockquote:not-italic',
    inheritColors ? 'prose-blockquote:bg-current/5' : 'prose-blockquote:bg-muted/20',
    'prose-ul:list-disc prose-ol:list-decimal',
    inheritColors ? 'prose-li:text-inherit prose-li:opacity-90' : 'prose-li:text-foreground/90',
    'prose-li:marker:text-primary',
    'prose-a:text-primary prose-a:underline prose-a:underline-offset-2 hover:prose-a:text-primary/80',
    'prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-mono',
    inheritColors ? 'prose-code:bg-current/10 prose-code:text-inherit' : 'prose-code:bg-muted prose-code:text-foreground',
    'prose-pre:border prose-pre:border-border prose-pre:rounded-lg',
    inheritColors ? 'prose-pre:bg-current/5' : 'prose-pre:bg-muted',
    'prose-table:border-collapse prose-table:w-full',
    'prose-th:border prose-th:border-border prose-th:px-4 prose-th:py-2 prose-th:text-left prose-th:font-semibold',
    inheritColors ? 'prose-th:bg-current/5' : 'prose-th:bg-muted',
    'prose-td:border prose-td:border-border prose-td:px-4 prose-td:py-2',
    'prose-img:rounded-lg prose-img:shadow-md',
    'prose-hr:border-border',
    className
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type MarkdownComponents = Record<string, React.ComponentType<any>>;

interface UseMarkdownParserResult {
  processedContent: string;
  containerClassName: string;
  components: MarkdownComponents;
  paragraphCountRef: React.MutableRefObject<number>;
}

export const useMarkdownParser = ({
  content,
  className,
  variant = 'article',
  skipFirstHeading = false,
  inheritColors = false,
  leadParagraph = false,
}: MarkdownRendererProps): UseMarkdownParserResult => {
  // Track paragraph count for lead paragraph styling
  const paragraphCountRef = useRef(0);

  // Process content
  const processedContent = useMemo(() => {
    if (!content) return '';
    return skipFirstHeading ? removeFirstH1(content) : content;
  }, [content, skipFirstHeading]);

  // Color context
  const colors: ColorContext = useMemo(
    () => ({
      textColor: inheritColors ? 'text-inherit' : 'text-foreground',
      textColorMuted: inheritColors ? 'text-inherit opacity-90' : 'text-foreground/90',
      textColorLight: inheritColors ? 'text-inherit opacity-80' : 'text-foreground/80',
      inheritColors,
    }),
    [inheritColors]
  );

  // Container classes
  const containerClassName = useMemo(
    () => cn(getBaseClasses(inheritColors, className), VARIANT_CLASSES[variant as MarkdownVariant]),
    [inheritColors, className, variant]
  );

  // Create component factories
  const components = useMemo(
    () => ({
      ...createHeadingComponents(colors, paragraphCountRef),
      ...createListComponents(colors),
      ...createCodeComponents(colors),
      ...createTableComponents(colors),
      ...createMiscComponents(colors, leadParagraph, paragraphCountRef),
    }),
    [colors, leadParagraph]
  );

  return {
    processedContent,
    containerClassName,
    components: components as MarkdownComponents,
    paragraphCountRef,
  };
};

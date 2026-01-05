/**
 * MarkdownRenderer - Reusable component for Markdown rendering
 *
 * Features:
 * - Headers (h1-h6) with optimized spacing hierarchy
 * - Paragraphs and formatted text (bold, italic, strikethrough)
 * - Lists (ordered, unordered, task lists) with generous spacing
 * - Blockquotes with highlight design
 * - Code blocks and inline code
 * - Tables (via remark-gfm)
 * - Links and images
 * - Mermaid diagrams and mindmaps
 * - Lead paragraph styling
 *
 * Reading Optimizations (based on studies):
 * - 1.5em paragraph spacing for visual breathing room
 * - Orphans/widows control to avoid isolated lines
 * - Automatic hyphenation for Portuguese
 * - Clear heading hierarchy with more space above than below
 */

import React, { memo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useMarkdownParser } from './hooks';
import type { MarkdownRendererProps } from './types';

const MarkdownRendererComponent: React.FC<MarkdownRendererProps> = (props) => {
  const { content } = props;
  const {
    processedContent,
    containerClassName,
    components,
    paragraphCountRef,
  } = useMarkdownParser(props);

  // Reset paragraph count on each render
  paragraphCountRef.current = 0;

  if (!content) {
    return (
      <p className="italic text-muted-foreground">Conteudo nao disponivel.</p>
    );
  }

  return (
    <div className={containerClassName}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {processedContent}
      </ReactMarkdown>
    </div>
  );
};

// memo prevents re-render when props don't change (e.g., parent scroll)
export const MarkdownRenderer = memo(MarkdownRendererComponent);
export default MarkdownRenderer;

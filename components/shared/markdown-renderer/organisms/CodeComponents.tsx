/**
 * CodeComponents - Markdown code block and inline code renderers
 * Includes Mermaid/Mindmap detection and rendering
 */

import React from 'react';
import { cn } from '@/lib/utils';
import { MindmapViewer } from '@/components/shared/MindmapViewer';
import { MermaidBlock } from './MermaidBlock';
import type { ColorContext } from '../types';

interface PreProps {
  children: React.ReactNode;
  node?: {
    children?: Array<{
      properties?: { className?: string[] };
      children?: Array<{ value?: string }>;
    }>;
  };
  colors: ColorContext;
}

interface CodeProps {
  children: React.ReactNode;
  className?: string;
  colors: ColorContext;
}

export const createPreBlock = ({ children, node, colors }: PreProps) => {
  // Check if this pre contains a mermaid/mindmap code block
  const codeElement = node?.children?.[0];
  const className = codeElement?.properties?.className?.[0] || '';
  const language = className.replace('language-', '');
  const codeContent = codeElement?.children?.[0]?.value || '';

  // Render mindmap with custom viewer (better UX)
  const isMindmap =
    language === 'mindmap' ||
    (language === 'mermaid' && codeContent.trim().startsWith('mindmap'));

  if (isMindmap) {
    // Stable key prevents re-mount on parent re-render
    const stableKey = `mindmap-${codeContent.slice(0, 50).replace(/\s/g, '')}`;
    return <MindmapViewer key={stableKey} content={codeContent} />;
  }

  // Render other mermaid diagrams with Mermaid
  if (language === 'mermaid') {
    return <MermaidBlock chart={codeContent} id={`pre-${Date.now()}`} />;
  }

  return (
    <pre
      className={cn(
        'my-6 overflow-x-auto rounded-lg border border-border p-4',
        colors.inheritColors ? 'bg-current/5' : 'bg-muted/50'
      )}
    >
      {children}
    </pre>
  );
};

export const createInlineCode = ({ children, className, colors }: CodeProps) => {
  // Check if it's inline code (no language class)
  const isInline = !className;

  if (isInline) {
    return (
      <code
        className={cn(
          'rounded px-1.5 py-0.5 font-mono text-sm',
          colors.inheritColors
            ? 'bg-current/10 text-inherit'
            : 'bg-muted text-primary'
        )}
      >
        {children}
      </code>
    );
  }

  // Check for mermaid - handled by pre, return null to avoid double render
  const language = className?.replace('language-', '');
  if (language === 'mermaid' || language === 'mindmap') {
    return null;
  }

  // Code block
  return (
    <code className={cn('block font-mono text-sm', colors.textColorMuted)}>
      {children}
    </code>
  );
};

/**
 * Creates code component factories for ReactMarkdown
 */
export const createCodeComponents = (colors: ColorContext) => ({
  pre: ({
    children,
    node,
  }: {
    children: React.ReactNode;
    node?: PreProps['node'];
  }) => createPreBlock({ children, node, colors }),
  code: ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => createInlineCode({ children, className, colors }),
});

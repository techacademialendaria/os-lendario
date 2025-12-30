/**
 * MarkdownRenderer - Componente reutilizável para renderização de Markdown
 *
 * Suporta:
 * - Headers (h1-h6)
 * - Parágrafos e texto formatado (bold, italic, strikethrough)
 * - Listas (ordenadas, não-ordenadas, task lists)
 * - Blockquotes
 * - Code blocks e inline code
 * - Tabelas (via remark-gfm)
 * - Links e imagens
 * - Emojis (renderizados nativamente)
 */

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { cn } from '../../lib/utils';

// Generate slug from text for heading IDs (enables anchor navigation)
const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove accents
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
};

interface MarkdownRendererProps {
  content: string;
  className?: string;
  variant?: 'article' | 'compact' | 'lesson';
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
  content,
  className,
  variant = 'article',
}) => {
  if (!content) {
    return <p className="italic text-muted-foreground">Conteúdo não disponível.</p>;
  }

  const baseClasses = cn(
    'prose dark:prose-invert max-w-none',
    'prose-headings:font-sans prose-headings:text-foreground',
    'prose-p:text-foreground/90 prose-p:leading-relaxed',
    'prose-strong:text-foreground prose-strong:font-bold',
    'prose-em:text-foreground/80 prose-em:italic',
    'prose-blockquote:border-l-4 prose-blockquote:border-primary/50 prose-blockquote:bg-muted/20 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r-lg prose-blockquote:not-italic',
    'prose-ul:list-disc prose-ol:list-decimal',
    'prose-li:text-foreground/90 prose-li:marker:text-primary',
    'prose-a:text-primary prose-a:underline prose-a:underline-offset-2 hover:prose-a:text-primary/80',
    'prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-mono prose-code:text-foreground',
    'prose-pre:bg-muted prose-pre:border prose-pre:border-border prose-pre:rounded-lg',
    'prose-table:border-collapse prose-table:w-full',
    'prose-th:border prose-th:border-border prose-th:bg-muted prose-th:px-4 prose-th:py-2 prose-th:text-left prose-th:font-semibold',
    'prose-td:border prose-td:border-border prose-td:px-4 prose-td:py-2',
    'prose-img:rounded-lg prose-img:shadow-md',
    'prose-hr:border-border',
    className
  );

  // Variant-specific sizing
  const variantClasses = {
    article: 'prose-lg',
    compact: 'prose-sm',
    lesson: 'prose-base md:prose-lg',
  };

  return (
    <div className={cn(baseClasses, variantClasses[variant])}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // Headers with anchors and IDs for navigation
          h1: ({ children }) => {
            const text = String(children);
            return (
              <h1
                id={slugify(text)}
                className="mb-6 mt-8 scroll-mt-20 text-3xl font-bold leading-tight text-foreground md:text-4xl"
              >
                {children}
              </h1>
            );
          },
          h2: ({ children }) => {
            const text = String(children);
            return (
              <h2
                id={slugify(text)}
                className="mb-4 mt-10 scroll-mt-20 border-b border-border pb-2 text-2xl font-bold text-foreground md:text-3xl"
              >
                {children}
              </h2>
            );
          },
          h3: ({ children }) => {
            const text = String(children);
            return (
              <h3
                id={slugify(text)}
                className="mb-3 mt-8 scroll-mt-20 text-xl font-bold text-foreground md:text-2xl"
              >
                {children}
              </h3>
            );
          },
          h4: ({ children }) => {
            const text = String(children);
            return (
              <h4
                id={slugify(text)}
                className="mb-2 mt-6 scroll-mt-20 text-lg font-semibold text-foreground md:text-xl"
              >
                {children}
              </h4>
            );
          },
          h5: ({ children }) => {
            const text = String(children);
            return (
              <h5
                id={slugify(text)}
                className="mb-2 mt-4 scroll-mt-20 text-base font-semibold text-foreground md:text-lg"
              >
                {children}
              </h5>
            );
          },
          h6: ({ children }) => {
            const text = String(children);
            return (
              <h6
                id={slugify(text)}
                className="mb-2 mt-4 scroll-mt-20 text-sm font-semibold uppercase tracking-wide text-muted-foreground md:text-base"
              >
                {children}
              </h6>
            );
          },

          // Paragraphs
          p: ({ children }) => (
            <p className="mb-4 leading-relaxed text-foreground/90">{children}</p>
          ),

          // Blockquotes (styled for lessons)
          blockquote: ({ children }) => (
            <blockquote className="my-6 rounded-r-lg border-l-4 border-primary/60 bg-primary/5 py-4 pl-6 pr-4 italic text-foreground/80">
              {children}
            </blockquote>
          ),

          // Lists
          ul: ({ children }) => (
            <ul className="my-4 ml-6 list-outside list-disc space-y-2 marker:text-primary">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="my-4 ml-6 list-outside list-decimal space-y-2 marker:font-bold marker:text-primary">
              {children}
            </ol>
          ),
          li: ({ children, ...props }) => {
            // Check if this is a task list item (has checkbox)
            const isTaskItem = props.className?.includes('task-list-item');
            return (
              <li
                className={cn(
                  'leading-relaxed text-foreground/90',
                  isTaskItem && '-ml-6 flex list-none items-start gap-2'
                )}
              >
                {children}
              </li>
            );
          },

          // Task list checkboxes
          input: ({ type, checked, ...props }) => {
            if (type === 'checkbox') {
              return (
                <input
                  type="checkbox"
                  checked={checked}
                  disabled
                  className="mt-1 h-4 w-4 cursor-default rounded border-border text-primary focus:ring-primary"
                  {...props}
                />
              );
            }
            return <input type={type} {...props} />;
          },

          // Code blocks
          pre: ({ children }) => (
            <pre className="my-6 overflow-x-auto rounded-lg border border-border bg-muted/50 p-4">
              {children}
            </pre>
          ),
          code: ({ className, children, ...props }) => {
            // Check if it's inline code (no language class)
            const isInline = !className;
            if (isInline) {
              return (
                <code
                  className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm text-primary"
                  {...props}
                >
                  {children}
                </code>
              );
            }
            // Code block
            return (
              <code className="block font-mono text-sm text-foreground/90" {...props}>
                {children}
              </code>
            );
          },

          // Tables (via remark-gfm)
          table: ({ children }) => (
            <div className="my-6 overflow-x-auto rounded-lg border border-border">
              <table className="w-full border-collapse text-sm">{children}</table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="border-b border-border bg-muted/50">{children}</thead>
          ),
          tbody: ({ children }) => <tbody className="divide-y divide-border">{children}</tbody>,
          tr: ({ children }) => <tr className="transition-colors hover:bg-muted/30">{children}</tr>,
          th: ({ children }) => (
            <th className="px-4 py-3 text-left font-semibold text-foreground">{children}</th>
          ),
          td: ({ children }) => <td className="px-4 py-3 text-foreground/90">{children}</td>,

          // Links
          a: ({ href, children }) => (
            <a
              href={href}
              target={href?.startsWith('http') ? '_blank' : undefined}
              rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="text-primary underline underline-offset-2 transition-colors hover:text-primary/80"
            >
              {children}
            </a>
          ),

          // Images
          img: ({ src, alt }) => (
            <figure className="my-6">
              <img
                src={src}
                alt={alt || ''}
                className="mx-auto h-auto max-w-full rounded-lg shadow-md"
                loading="lazy"
              />
              {alt && (
                <figcaption className="mt-2 text-center text-sm italic text-muted-foreground">
                  {alt}
                </figcaption>
              )}
            </figure>
          ),

          // Horizontal rule
          hr: () => <hr className="my-8 border-t border-border" />,

          // Strong/Bold
          strong: ({ children }) => (
            <strong className="font-bold text-foreground">{children}</strong>
          ),

          // Emphasis/Italic
          em: ({ children }) => <em className="italic text-foreground/80">{children}</em>,

          // Strikethrough (via remark-gfm)
          del: ({ children }) => (
            <del className="text-muted-foreground line-through">{children}</del>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;

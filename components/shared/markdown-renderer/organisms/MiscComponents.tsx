/**
 * MiscComponents - Other markdown element renderers
 * Includes: paragraph, blockquote, links, images, hr, strong, em, del
 */

import React from 'react';
import { cn } from '@/lib/utils';
import type { ColorContext } from '../types';

interface ParagraphProps {
  children: React.ReactNode;
  colors: ColorContext;
  leadParagraph: boolean;
  paragraphCountRef: React.MutableRefObject<number>;
}

interface BlockquoteProps {
  children: React.ReactNode;
  colors: ColorContext;
}

interface LinkProps {
  href?: string;
  children: React.ReactNode;
}

interface ImageProps {
  src?: string;
  alt?: string;
  colors: ColorContext;
}

interface TextProps {
  children: React.ReactNode;
  colors: ColorContext;
}

export const createParagraph = ({
  children,
  colors,
  leadParagraph,
  paragraphCountRef,
}: ParagraphProps) => {
  paragraphCountRef.current += 1;
  const isFirstParagraph = paragraphCountRef.current === 1;
  const isLeadParagraph = leadParagraph && isFirstParagraph;

  return (
    <p
      className={cn(
        'mb-6 leading-relaxed',
        colors.textColorMuted,
        isLeadParagraph &&
          'text-lg md:text-xl font-medium leading-relaxed first-letter:text-4xl first-letter:font-bold first-letter:mr-1 first-letter:float-left first-letter:leading-none'
      )}
      style={{
        orphans: 2,
        widows: 2,
        hyphens: 'auto',
        WebkitHyphens: 'auto',
      }}
    >
      {children}
    </p>
  );
};

export const createBlockquote = ({ children, colors }: BlockquoteProps) => (
  <blockquote
    className={cn(
      'my-8 relative rounded-lg border-l-4 border-primary bg-primary/5 py-6 pl-8 pr-6',
      'before:absolute before:left-4 before:top-4 before:text-4xl before:text-primary/30 before:font-serif before:content-["""]',
      colors.textColorLight
    )}
    style={{ fontStyle: 'normal' }}
  >
    <div className="relative z-10 font-serif text-lg italic leading-relaxed">
      {children}
    </div>
  </blockquote>
);

export const createLink = ({ href, children }: LinkProps) => (
  <a
    href={href}
    target={href?.startsWith('http') ? '_blank' : undefined}
    rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
    className="text-primary underline underline-offset-2 transition-colors hover:text-primary/80"
  >
    {children}
  </a>
);

export const createImage = ({ src, alt, colors }: ImageProps) => (
  <figure className="my-6">
    <img
      src={src}
      alt={alt || ''}
      className="mx-auto h-auto max-w-full rounded-lg shadow-md"
      loading="lazy"
    />
    {alt && (
      <figcaption
        className={cn('mt-2 text-center text-sm italic', colors.textColorLight)}
      >
        {alt}
      </figcaption>
    )}
  </figure>
);

export const createHorizontalRule = () => (
  <div className="my-12 flex items-center justify-center gap-4">
    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
    <div className="flex gap-1.5">
      <span className="h-1.5 w-1.5 rounded-full bg-primary/40" />
      <span className="h-1.5 w-1.5 rounded-full bg-primary/60" />
      <span className="h-1.5 w-1.5 rounded-full bg-primary/40" />
    </div>
    <div className="h-px flex-1 bg-gradient-to-l from-transparent via-border to-transparent" />
  </div>
);

export const createStrong = ({ children, colors }: TextProps) => (
  <strong className={cn('font-bold', colors.textColor)}>{children}</strong>
);

export const createEmphasis = ({ children, colors }: TextProps) => (
  <em className={cn('italic', colors.textColorLight)}>{children}</em>
);

export const createStrikethrough = ({ children, colors }: TextProps) => (
  <del className={cn('line-through', colors.textColorLight)}>{children}</del>
);

/**
 * Creates misc component factories for ReactMarkdown
 */
export const createMiscComponents = (
  colors: ColorContext,
  leadParagraph: boolean,
  paragraphCountRef: React.MutableRefObject<number>
) => ({
  p: ({ children }: { children: React.ReactNode }) =>
    createParagraph({ children, colors, leadParagraph, paragraphCountRef }),
  blockquote: ({ children }: { children: React.ReactNode }) =>
    createBlockquote({ children, colors }),
  a: ({ href, children }: { href?: string; children: React.ReactNode }) =>
    createLink({ href, children }),
  img: ({ src, alt }: { src?: string; alt?: string }) =>
    createImage({ src, alt, colors }),
  hr: createHorizontalRule,
  strong: ({ children }: { children: React.ReactNode }) =>
    createStrong({ children, colors }),
  em: ({ children }: { children: React.ReactNode }) =>
    createEmphasis({ children, colors }),
  del: ({ children }: { children: React.ReactNode }) =>
    createStrikethrough({ children, colors }),
});

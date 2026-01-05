/**
 * HeadingComponents - Markdown heading renderers (h1-h6)
 * Optimized with hierarchy-based spacing (more space above than below)
 */

import React from 'react';
import { cn } from '@/lib/utils';
import type { ColorContext } from '../types';

// Generate slug from text for heading IDs (enables anchor navigation)
export const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove accents
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
};

interface HeadingFactoryProps {
  children: React.ReactNode;
  colors: ColorContext;
  paragraphCountRef?: React.MutableRefObject<number>;
}

export const createH1 = ({ children, colors }: HeadingFactoryProps) => {
  const text = String(children);
  return (
    <h1
      id={slugify(text)}
      className={cn(
        'mb-6 mt-12 scroll-mt-20 text-3xl font-bold leading-tight md:text-4xl',
        'first:mt-0',
        colors.textColor
      )}
    >
      {children}
    </h1>
  );
};

export const createH2 = ({ children, colors, paragraphCountRef }: HeadingFactoryProps) => {
  const text = String(children);
  // Reset paragraph count after each major section
  if (paragraphCountRef) {
    paragraphCountRef.current = 0;
  }
  return (
    <h2
      id={slugify(text)}
      className={cn(
        'mb-5 mt-14 scroll-mt-20 border-b border-border pb-3 text-2xl font-bold md:text-3xl',
        'first:mt-0',
        colors.textColor
      )}
    >
      {children}
    </h2>
  );
};

export const createH3 = ({ children, colors }: HeadingFactoryProps) => {
  const text = String(children);
  return (
    <h3
      id={slugify(text)}
      className={cn(
        'mb-4 mt-10 scroll-mt-20 text-xl font-bold md:text-2xl',
        colors.textColor
      )}
    >
      {children}
    </h3>
  );
};

export const createH4 = ({ children, colors }: HeadingFactoryProps) => {
  const text = String(children);
  return (
    <h4
      id={slugify(text)}
      className={cn(
        'mb-3 mt-8 scroll-mt-20 text-lg font-semibold md:text-xl',
        colors.textColor
      )}
    >
      {children}
    </h4>
  );
};

export const createH5 = ({ children, colors }: HeadingFactoryProps) => {
  const text = String(children);
  return (
    <h5
      id={slugify(text)}
      className={cn(
        'mb-2 mt-6 scroll-mt-20 text-base font-semibold md:text-lg',
        colors.textColor
      )}
    >
      {children}
    </h5>
  );
};

export const createH6 = ({ children, colors }: HeadingFactoryProps) => {
  const text = String(children);
  return (
    <h6
      id={slugify(text)}
      className={cn(
        'mb-2 mt-6 scroll-mt-20 text-sm font-semibold uppercase tracking-wide md:text-base',
        colors.textColorLight
      )}
    >
      {children}
    </h6>
  );
};

/**
 * Creates heading component factories for ReactMarkdown
 */
export const createHeadingComponents = (
  colors: ColorContext,
  paragraphCountRef: React.MutableRefObject<number>
) => ({
  h1: ({ children }: { children: React.ReactNode }) =>
    createH1({ children, colors }),
  h2: ({ children }: { children: React.ReactNode }) =>
    createH2({ children, colors, paragraphCountRef }),
  h3: ({ children }: { children: React.ReactNode }) =>
    createH3({ children, colors }),
  h4: ({ children }: { children: React.ReactNode }) =>
    createH4({ children, colors }),
  h5: ({ children }: { children: React.ReactNode }) =>
    createH5({ children, colors }),
  h6: ({ children }: { children: React.ReactNode }) =>
    createH6({ children, colors }),
});

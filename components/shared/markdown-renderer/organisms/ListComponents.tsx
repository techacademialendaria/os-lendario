/**
 * ListComponents - Markdown list renderers (ul, ol, li, checkboxes)
 * Optimized spacing (space-y-3) for better readability
 */

import React from 'react';
import { cn } from '@/lib/utils';
import type { ColorContext } from '../types';

interface ListComponentsProps {
  children: React.ReactNode;
  colors: ColorContext;
}

interface ListItemComponentProps extends ListComponentsProps {
  className?: string;
}

export const createUnorderedList = ({ children }: ListComponentsProps) => (
  <ul className="my-6 ml-6 list-outside list-disc space-y-3 marker:text-primary">
    {children}
  </ul>
);

export const createOrderedList = ({ children }: ListComponentsProps) => (
  <ol className="my-6 ml-6 list-outside list-decimal space-y-3 marker:font-bold marker:text-primary">
    {children}
  </ol>
);

export const createListItem = ({ children, colors, className }: ListItemComponentProps) => {
  // Check if this is a task list item (has checkbox)
  const isTaskItem = className?.includes('task-list-item');
  return (
    <li
      className={cn(
        'leading-relaxed pl-2',
        colors.textColorMuted,
        isTaskItem && '-ml-6 flex list-none items-start gap-2'
      )}
    >
      {children}
    </li>
  );
};

interface CheckboxProps {
  type?: string;
  checked?: boolean;
}

export const createCheckbox = ({ type, checked, ...props }: CheckboxProps) => {
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
};

/**
 * Creates list component factories for ReactMarkdown
 */
export const createListComponents = (colors: ColorContext) => ({
  ul: ({ children }: { children: React.ReactNode }) =>
    createUnorderedList({ children, colors }),
  ol: ({ children }: { children: React.ReactNode }) =>
    createOrderedList({ children, colors }),
  li: ({ children, className }: { children: React.ReactNode; className?: string }) =>
    createListItem({ children, colors, className }),
  input: createCheckbox,
});

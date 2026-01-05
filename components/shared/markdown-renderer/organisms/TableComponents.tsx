/**
 * TableComponents - Markdown table renderers
 * Responsive with overflow handling
 */

import React from 'react';
import { cn } from '@/lib/utils';
import type { ColorContext } from '../types';

interface TableComponentProps {
  children: React.ReactNode;
  colors: ColorContext;
}

export const createTable = ({ children }: TableComponentProps) => (
  <div className="my-6 overflow-x-auto rounded-lg border border-border">
    <table className="w-full border-collapse text-sm">{children}</table>
  </div>
);

export const createTableHead = ({ children, colors }: TableComponentProps) => (
  <thead
    className={cn(
      'border-b border-border',
      colors.inheritColors ? 'bg-current/5' : 'bg-muted/50'
    )}
  >
    {children}
  </thead>
);

export const createTableBody = ({ children }: TableComponentProps) => (
  <tbody className="divide-y divide-border">{children}</tbody>
);

export const createTableRow = ({ children, colors }: TableComponentProps) => (
  <tr
    className={cn(
      'transition-colors',
      colors.inheritColors ? 'hover:bg-current/5' : 'hover:bg-muted/30'
    )}
  >
    {children}
  </tr>
);

export const createTableHeader = ({ children, colors }: TableComponentProps) => (
  <th className={cn('px-4 py-3 text-left font-semibold', colors.textColor)}>
    {children}
  </th>
);

export const createTableCell = ({ children, colors }: TableComponentProps) => (
  <td className={cn('px-4 py-3', colors.textColorMuted)}>{children}</td>
);

/**
 * Creates table component factories for ReactMarkdown
 */
export const createTableComponents = (colors: ColorContext) => ({
  table: ({ children }: { children: React.ReactNode }) =>
    createTable({ children, colors }),
  thead: ({ children }: { children: React.ReactNode }) =>
    createTableHead({ children, colors }),
  tbody: ({ children }: { children: React.ReactNode }) =>
    createTableBody({ children, colors }),
  tr: ({ children }: { children: React.ReactNode }) =>
    createTableRow({ children, colors }),
  th: ({ children }: { children: React.ReactNode }) =>
    createTableHeader({ children, colors }),
  td: ({ children }: { children: React.ReactNode }) =>
    createTableCell({ children, colors }),
});

import React from 'react';
import { StatusBadgeProps } from '../types';

/**
 * StatusBadge - Displays a colored status indicator with label
 */
export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, color }) => (
  <div
    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium"
    style={{ backgroundColor: `${color}20`, color }}
  >
    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
    {status}
  </div>
);

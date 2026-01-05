import React from 'react';
import { Icon } from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import type { SidebarFooterProps } from '../types';

/**
 * SidebarFooter - Navigation footer with back button
 */
export const SidebarFooter: React.FC<SidebarFooterProps> = ({ onNavigateBack }) => (
  <div className="shrink-0 border-t border-border bg-muted/10 p-4">
    <Button
      variant="outline"
      className="w-full gap-2 text-sm"
      onClick={onNavigateBack}
    >
      <Icon name="arrow-left" size="size-4" />
      Voltar aos Detalhes
    </Button>
  </div>
);

export default SidebarFooter;

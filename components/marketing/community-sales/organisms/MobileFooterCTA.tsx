import React from 'react';
import { Button } from '@/components/ui/button';

export const MobileFooterCTA: React.FC = () => (
  <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background p-4 md:hidden">
    <Button className="w-full font-bold shadow-lg" size="lg">
      Quero Participar
    </Button>
  </div>
);

import React from 'react';
import { Button } from '@/components/ui/button';

export const MobileFooterCTA: React.FC = () => (
  <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/90 p-4 backdrop-blur md:hidden">
    <Button className="w-full font-bold shadow-lg">Conhecer a Comunidade</Button>
  </div>
);

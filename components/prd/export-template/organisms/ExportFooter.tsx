// Export Footer Component
// Footer with complete button and back navigation

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { STUDIO_TEAL } from '../types';

interface ExportFooterProps {
  onComplete: () => void;
}

export const ExportFooter: React.FC<ExportFooterProps> = ({ onComplete }) => {
  const navigate = useNavigate();

  return (
    <>
      {/* Final CTA */}
      <div className="mt-12 text-center">
        <Button
          size="lg"
          onClick={onComplete}
          className="px-12 text-white shadow-lg"
          style={{ backgroundColor: STUDIO_TEAL }}
        >
          <Icon name="check-circle" className="mr-2 size-5" />
          Marcar como Concluido
        </Button>
        <p className="mt-4 text-sm text-muted-foreground">
          Seu projeto ficara salvo no dashboard para referencia futura.
        </p>
      </div>

      {/* Footer */}
      <footer className="border-t border-border p-6 text-center">
        <Button variant="ghost" onClick={() => navigate('/prd')}>
          <Icon name="arrow-left" className="mr-2 size-4" />
          Voltar ao Dashboard
        </Button>
      </footer>
    </>
  );
};

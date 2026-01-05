import React from 'react';
import { Card, CardContent } from '../../../ui/card';
import { Button } from '../../../ui/button';
import { Icon } from '../../../ui/icon';
import { Badge } from '../../../ui/badge';
import { CoursesHeader } from '../../ui';

interface ReformulationViewProps {
  onBack: () => void;
  onBreadcrumbClick: () => void;
  onGoToCurriculum: () => void;
}

export const ReformulationView: React.FC<ReformulationViewProps> = ({
  onBack,
  onBreadcrumbClick,
  onGoToCurriculum,
}) => {
  return (
    <div className="animate-fade-in space-y-8 pb-20">
      <CoursesHeader
        title="Reformulação do Brief"
        breadcrumb="Diff"
        showBackButton
        onBack={onBack}
        onBreadcrumbClick={onBreadcrumbClick}
      />

      <div className="grid grid-cols-2 gap-8">
        {/* Original Brief */}
        <div className="space-y-4">
          <h3 className="text-center text-sm font-bold uppercase tracking-widest text-muted-foreground">
            Seu Brief Original
          </h3>
          <Card className="border-dashed opacity-70">
            <CardContent className="p-6 font-serif text-sm">
              <p className="mb-2">
                <strong>Promessa:</strong> Ensinar vendas B2B.
              </p>
              <p>
                <strong>Público:</strong> Vendedores.
              </p>
              <p>
                <strong>Diferencial:</strong> Minha experiência.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* AI Suggested Brief */}
        <div className="space-y-4">
          <h3 className="text-center text-sm font-bold uppercase tracking-widest text-studio-primary">
            Sugestão da IA (Baseada em Dados)
          </h3>
          <Card
            className="relative border-primary shadow-lg"
            style={{ backgroundColor: 'hsl(var(--primary-color) / 0.05)' }}
          >
            <Badge className="absolute -top-3 right-4 bg-primary text-primary-foreground">
              Otimizado
            </Badge>
            <CardContent className="p-6 font-serif text-sm">
              <p className="mb-2">
                <strong>Promessa:</strong>{' '}
                <span
                  className="rounded px-1"
                  style={{ backgroundColor: 'hsl(var(--primary-color) / 0.2)' }}
                >
                  Dominar o ciclo de vendas B2B e fechar contratos High-Ticket em 30 dias.
                </span>
              </p>
              <p>
                <strong>Público:</strong>{' '}
                <span
                  className="rounded px-1"
                  style={{ backgroundColor: 'hsl(var(--primary-color) / 0.2)' }}
                >
                  Account Executives e SDRs buscando promoção.
                </span>
              </p>
              <p>
                <strong>Diferencial:</strong>{' '}
                <span
                  className="rounded px-1"
                  style={{ backgroundColor: 'hsl(var(--primary-color) / 0.2)' }}
                >
                  Único com templates de IA e foco em Social Selling.
                </span>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex justify-center gap-4 pt-8">
        <Button variant="outline">Manter Original</Button>
        <Button onClick={onGoToCurriculum} className="shadow-xl">
          Aceitar & Gerar Currículo <Icon name="check" className="ml-2" />
        </Button>
      </div>
    </div>
  );
};

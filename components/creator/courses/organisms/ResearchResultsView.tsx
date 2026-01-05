import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../ui/card';
import { Button } from '../../../ui/button';
import { Icon } from '../../../ui/icon';
import { Badge } from '../../../ui/badge';
import { Alert, AlertDescription, AlertTitle } from '../../../ui/alert';
import { CoursesHeader } from '../../ui';

interface ResearchResultsViewProps {
  onBack: () => void;
  onBreadcrumbClick: () => void;
  onGoToReformulation: () => void;
}

export const ResearchResultsView: React.FC<ResearchResultsViewProps> = ({
  onBack,
  onBreadcrumbClick,
  onGoToReformulation,
}) => {
  return (
    <div className="animate-fade-in space-y-8 pb-20">
      <CoursesHeader
        title="Inteligência de Mercado"
        breadcrumb="Pesquisa"
        showBackButton
        onBack={onBack}
        onBreadcrumbClick={onBreadcrumbClick}
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Análise de Concorrência</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <Icon name="info" className="size-4" />
              <AlertTitle>Insight Principal</AlertTitle>
              <AlertDescription>
                90% dos cursos focam em teoria. A maior reclamação é falta de templates práticos.
              </AlertDescription>
            </Alert>
            <div className="space-y-3">
              <div className="flex items-center justify-between rounded border bg-muted/10 p-3">
                <span>Curso A (Líder)</span>
                <Badge variant="outline">Muito Teórico</Badge>
              </div>
              <div className="flex items-center justify-between rounded border bg-muted/10 p-3">
                <span>Curso B</span>
                <Badge variant="outline">Desatualizado (2022)</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-studio-primary/20 bg-studio-primary/5">
          <CardHeader>
            <CardTitle className="text-studio-primary">Oportunidades (Gaps)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-2">
              <Icon name="check-circle" className="mt-1 size-4 text-studio-primary" />
              <span className="text-sm">Incluir módulo sobre IA aplicada</span>
            </div>
            <div className="flex items-start gap-2">
              <Icon name="check-circle" className="mt-1 size-4 text-studio-primary" />
              <span className="text-sm">Fornecer scripts prontos (Copy & Paste)</span>
            </div>
            <div className="flex items-start gap-2">
              <Icon name="check-circle" className="mt-1 size-4 text-studio-primary" />
              <span className="text-sm">Focar em Mobile-First learning</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end border-t border-border pt-4">
        <Button onClick={onGoToReformulation} size="lg" className="shadow-lg">
          Ver Sugestão de Reformulação <Icon name="arrow-right" className="ml-2" />
        </Button>
      </div>
    </div>
  );
};

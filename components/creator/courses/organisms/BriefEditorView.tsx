import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../ui/card';
import { Button } from '../../../ui/button';
import { Icon } from '../../../ui/icon';
import { Label } from '../../../ui/label';
import { Textarea } from '../../../ui/textarea';
import { cn } from '../../../../lib/utils';
import { CoursesHeader } from '../../ui';

interface BriefEditorViewProps {
  activeSection: number;
  setActiveSection: (section: number) => void;
  onBack: () => void;
  onBreadcrumbClick: () => void;
  onStartResearch: () => void;
}

const TOTAL_SECTIONS = 8;

export const BriefEditorView: React.FC<BriefEditorViewProps> = ({
  activeSection,
  setActiveSection,
  onBack,
  onBreadcrumbClick,
  onStartResearch,
}) => {
  return (
    <div className="animate-fade-in pb-20">
      <CoursesHeader
        title="Briefing Estratégico"
        breadcrumb="Brief"
        showBackButton
        onBack={onBack}
        onBreadcrumbClick={onBreadcrumbClick}
      />
      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Sidebar - Sections Navigation */}
        <div className="w-full shrink-0 space-y-6 lg:w-64">
          <Card className="border-border bg-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Seções
              </CardTitle>
            </CardHeader>
            <CardContent className="p-2">
              <nav className="space-y-1">
                {Array.from({ length: TOTAL_SECTIONS }, (_, i) => i + 1).map((id) => (
                  <Button
                    key={id}
                    variant="ghost"
                    size="sm"
                    onClick={() => setActiveSection(id)}
                    className={cn(
                      'w-full justify-between',
                      activeSection === id
                        ? 'bg-primary/10 font-medium text-primary'
                        : 'text-muted-foreground hover:bg-muted'
                    )}
                  >
                    <span className="truncate">Seção {id}</span>
                    {activeSection > id && (
                      <Icon name="check-circle" className="text-success size-3" type="solid" />
                    )}
                  </Button>
                ))}
              </nav>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="flex-1 space-y-6">
          <Card>
            <CardContent className="space-y-6 p-6">
              <div className="space-y-2">
                <Label>Qual é a promessa principal? (Dream Outcome)</Label>
                <Textarea
                  placeholder="Ex: Dominar vendas B2B em 30 dias..."
                  className="min-h-[100px]"
                />
              </div>
              <div className="space-y-2">
                <Label>Quem é o aluno ideal? (ICP)</Label>
                <Textarea placeholder="Ex: Gestores de vendas com equipe de 5+ pessoas..." />
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between border-t border-border pt-6">
            <Button
              variant="outline"
              disabled={activeSection === 1}
              onClick={() => setActiveSection(activeSection - 1)}
            >
              Anterior
            </Button>
            {activeSection < TOTAL_SECTIONS ? (
              <Button onClick={() => setActiveSection(activeSection + 1)}>Próxima Seção</Button>
            ) : (
              <Button onClick={onStartResearch} className="shadow-lg shadow-primary/20">
                Iniciar Pesquisa de Mercado <Icon name="search-alt" className="ml-2" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

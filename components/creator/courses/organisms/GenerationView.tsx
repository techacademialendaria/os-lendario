import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../ui/card';
import { Button } from '../../../ui/button';
import { Progress } from '../../../ui/progress';
import { Separator } from '../../../ui/separator';
import { CoursesHeader } from '../../ui';
import { GenerationLogCard } from '../molecules';
import type { GenerationLogEntry } from '../types';

interface GenerationViewProps {
  generationLog: GenerationLogEntry[];
  onBack: () => void;
  onBreadcrumbClick: () => void;
  onGoToLesson: () => void;
}

export const GenerationView: React.FC<GenerationViewProps> = ({
  generationLog,
  onBack,
  onBreadcrumbClick,
  onGoToLesson,
}) => {
  return (
    <div className="animate-fade-in space-y-8 pb-20">
      <CoursesHeader
        title="Gerando Aulas"
        breadcrumb="Geração"
        showBackButton
        onBack={onBack}
        onBreadcrumbClick={onBreadcrumbClick}
      />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Log / Terminal */}
        <div className="space-y-4 lg:col-span-2">
          {generationLog.map((log) => (
            <GenerationLogCard key={log.id} log={log} />
          ))}
        </div>

        {/* Progress Sidebar */}
        <Card className="h-fit">
          <CardHeader>
            <CardTitle>Progresso Total</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className="mb-2 font-mono text-4xl font-bold text-studio-primary">35%</div>
              <Progress value={35} className="h-2" />
              <p className="mt-2 text-xs text-muted-foreground">Estimativa: 4 min restantes</p>
            </div>
            <Separator />
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider">
                Quality Gate (Validação)
              </h4>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Framework GPS</span>
                <span className="font-bold text-success">Pass</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Didática Lendária</span>
                <span className="font-bold text-success">Pass</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Voice Consistency</span>
                <span className="font-bold text-brand-yellow">Checking...</span>
              </div>
            </div>
            <Button className="w-full" variant="outline" onClick={onGoToLesson}>
              Simular Finalização
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

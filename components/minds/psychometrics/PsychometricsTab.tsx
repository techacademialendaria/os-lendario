import React from 'react';
import { Icon } from '@/components/ui/icon';
import type { PsychometricsTabProps } from './types';
import {
  ArchetypesCard,
  BigFiveRadar,
  DISCSection,
  BigFiveDetails,
  SuperpowersSection,
  DarkTriadSection,
  ConvergenceSection,
  MetadataFooter,
} from './organisms';

export const PsychometricsTab: React.FC<PsychometricsTabProps> = ({ psychometrics, loading }) => {
  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!psychometrics) {
    return (
      <div className="py-12 text-center text-muted-foreground">
        <Icon name="chart-pie" size="size-12" className="mx-auto mb-4 opacity-50" />
        <p>Dados psicometricos nao disponiveis para esta mente.</p>
        <p className="mt-2 text-xs opacity-50">
          Execute o import de perfis psicometricos para popular os dados.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Row 1: Archetypes + Big Five Radar */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <ArchetypesCard
          mbtiType={psychometrics.mbtiType}
          mbtiRole={psychometrics.mbtiRole}
          mbtiStack={psychometrics.mbtiStack}
          enneagramType={psychometrics.enneagramType}
          enneagramWing={psychometrics.enneagramWing}
          enneagramTriad={psychometrics.enneagramTriad}
          enneagramVariant={psychometrics.enneagramVariant}
          discPattern={psychometrics.discPattern}
          discPatternName={psychometrics.disc?.patternName}
          cognitiveStratum={psychometrics.cognitiveStratum}
        />
        {psychometrics.bigFive && <BigFiveRadar bigFive={psychometrics.bigFive} />}
      </div>

      {/* Row 2: DISC Bars */}
      {psychometrics.disc && <DISCSection disc={psychometrics.disc} />}

      {/* Row 3: Big Five Details + Superpowers */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {psychometrics.bigFive && <BigFiveDetails bigFive={psychometrics.bigFive} />}
        <SuperpowersSection
          superpowers={psychometrics.superpowers}
          kryptonite={psychometrics.kryptonite}
          enneagramDetails={psychometrics.enneagramDetails}
        />
      </div>

      {/* Row 4: Dark Triad */}
      {psychometrics.darkTriad && <DarkTriadSection darkTriad={psychometrics.darkTriad} />}

      {/* Row 5: Convergence Analysis */}
      {psychometrics.convergence && (
        <ConvergenceSection
          powerfulAlignments={psychometrics.convergence.powerfulAlignments}
          productiveTensions={psychometrics.convergence.productiveTensions}
        />
      )}

      {/* Metadata Footer */}
      <MetadataFooter
        analysisDate={psychometrics.analysisDate}
        confidence={psychometrics.confidence}
      />
    </div>
  );
};

export default PsychometricsTab;

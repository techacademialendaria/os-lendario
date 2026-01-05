import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';
import { STUDIO_CARD_CLASSES } from '../../studio-tokens';
import type { BriefFormSectionProps } from '../types';
import {
  DreamOutcomeSection,
  TargetAudienceSection,
  PainPointsSection,
  PrerequisitesSection,
  UniqueValueSection,
  MethodologySection,
  ExpectedResultsSection,
  DurationSection,
} from './sections';

export const BriefFormSection: React.FC<BriefFormSectionProps> = ({
  section,
  activeSection,
  briefData,
  onInputChange,
  onAddPainPoint,
  onRemovePainPoint,
}) => {
  const renderSectionContent = () => {
    switch (activeSection) {
      case 1:
        return (
          <DreamOutcomeSection
            value={briefData.dreamOutcome}
            onChange={(val) => onInputChange('dreamOutcome', val)}
          />
        );
      case 2:
        return (
          <TargetAudienceSection
            value={briefData.targetAudience}
            onChange={(val) => onInputChange('targetAudience', val)}
          />
        );
      case 3:
        return (
          <PainPointsSection
            painPoints={briefData.painPoints}
            onAdd={onAddPainPoint}
            onRemove={onRemovePainPoint}
            onChange={(pts) => onInputChange('painPoints', pts)}
          />
        );
      case 4:
        return (
          <PrerequisitesSection
            value={briefData.prerequisites}
            onChange={(val) => onInputChange('prerequisites', val)}
          />
        );
      case 5:
        return (
          <UniqueValueSection
            value={briefData.uniqueValue}
            onChange={(val) => onInputChange('uniqueValue', val)}
          />
        );
      case 6:
        return (
          <MethodologySection
            value={briefData.methodology}
            onChange={(val) => onInputChange('methodology', val)}
          />
        );
      case 7:
        return (
          <ExpectedResultsSection
            value={briefData.expectedResults}
            onChange={(val) => onInputChange('expectedResults', val)}
          />
        );
      case 8:
        return (
          <DurationSection
            value={briefData.duration}
            onChange={(val) => onInputChange('duration', val)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Card className={STUDIO_CARD_CLASSES}>
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-studio-primary/10 text-studio-primary">
            <Icon name={section?.icon || 'document'} size="size-5" />
          </div>
          <div>
            <CardTitle>{section?.title}</CardTitle>
            <CardDescription>{section?.description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>{renderSectionContent()}</CardContent>
    </Card>
  );
};

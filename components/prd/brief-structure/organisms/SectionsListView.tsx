// SectionsListView - Container for all brief sections
// Renders all BriefSection components with classification card

import React from 'react';
import { BriefSection } from './BriefSection';
import { ClassificationCard } from './ClassificationCard';
import type { BriefStructure, SectionKey } from '../types';
import { SECTIONS } from '../types';

interface SectionsListViewProps {
  structure: BriefStructure;
  regeneratingSection: SectionKey | null;
  onSectionChange: (key: SectionKey, value: string | string[]) => void;
  onRegenerateSection: (key: SectionKey) => void;
}

export const SectionsListView: React.FC<SectionsListViewProps> = ({
  structure,
  regeneratingSection,
  onSectionChange,
  onRegenerateSection,
}) => {
  return (
    <div className="space-y-4">
      {SECTIONS.map((section) => (
        <BriefSection
          key={section.key}
          config={section}
          value={structure[section.key]}
          onChange={(v) => onSectionChange(section.key, v)}
          onRegenerate={() => onRegenerateSection(section.key)}
          isRegenerating={regeneratingSection === section.key}
        />
      ))}

      <ClassificationCard
        classification={structure.classification}
        complexity={structure.estimatedComplexity}
      />
    </div>
  );
};

export default SectionsListView;

import { useState, useMemo } from 'react';
import { MIND_PSYCHOMETRICS } from '../../data/minds-content';

export function useBigFiveSelection(defaultTrait = 'Openness') {
  const [selectedTrait, setSelectedTrait] = useState<string>(defaultTrait);

  const selectedTraitData = useMemo(() =>
    MIND_PSYCHOMETRICS.bigFive.find(t => t.trait === selectedTrait),
    [selectedTrait]
  );

  return {
    selectedTrait,
    setSelectedTrait,
    selectedTraitData,
    bigFiveTraits: MIND_PSYCHOMETRICS.bigFive,
    exampleProfile: MIND_PSYCHOMETRICS.exampleProfile
  };
}

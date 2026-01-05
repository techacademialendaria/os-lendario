import { useState, useMemo } from 'react';
import { MIND_PROFILES_DETAIL } from '../../data/minds-content';

export function useProfileTypeSelection(defaultType = 'generalista') {
  const [selectedType, setSelectedType] = useState<string>(defaultType);

  const selectedProfile = useMemo(() =>
    MIND_PROFILES_DETAIL.types.find(t => t.type === selectedType),
    [selectedType]
  );

  return {
    selectedType,
    setSelectedType,
    selectedProfile,
    profileTypes: MIND_PROFILES_DETAIL.types,
    storageFormats: MIND_PROFILES_DETAIL.storageFormats
  };
}

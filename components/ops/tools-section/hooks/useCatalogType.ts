import { useState, useCallback } from 'react';
import { TOOL_CATALOG } from '../../data/tool-content';

export function useCatalogType(initialType: string = 'mental_model') {
  const [selectedCatalogType, setSelectedCatalogType] = useState<string>(initialType);

  const catalogTypes = Object.keys(TOOL_CATALOG) as Array<keyof typeof TOOL_CATALOG>;
  const selectedCatalog = TOOL_CATALOG[selectedCatalogType as keyof typeof TOOL_CATALOG];

  const selectType = useCallback((type: string) => {
    setSelectedCatalogType(type);
  }, []);

  return {
    selectedCatalogType,
    setSelectedCatalogType: selectType,
    catalogTypes,
    selectedCatalog
  };
}

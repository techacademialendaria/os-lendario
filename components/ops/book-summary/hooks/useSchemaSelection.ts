import { useState, useCallback } from 'react';
import type { SchemaSelectionState } from '../types';

export function useSchemaSelection(initialSchema: string = 'contents'): SchemaSelectionState {
  const [selectedSchema, setSelectedSchema] = useState<string>(initialSchema);

  const handleSetSelectedSchema = useCallback((schema: string) => {
    setSelectedSchema(schema);
  }, []);

  return {
    selectedSchema,
    setSelectedSchema: handleSetSelectedSchema,
  };
}

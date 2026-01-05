import { useState, useCallback } from 'react';

export function useAxisHover() {
  const [hoveredTool, setHoveredTool] = useState<number | null>(null);

  const handleHover = useCallback((index: number | null) => {
    setHoveredTool(index);
  }, []);

  const clearHover = useCallback(() => {
    setHoveredTool(null);
  }, []);

  return {
    hoveredTool,
    setHoveredTool: handleHover,
    clearHover
  };
}

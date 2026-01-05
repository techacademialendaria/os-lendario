import { useState, useCallback, useMemo } from 'react';

export interface UseTreeNodeReturn {
  expanded: boolean;
  toggleExpanded: () => void;
  isObject: boolean;
  isArray: boolean;
  hasContent: boolean;
  isExpandable: boolean;
  isSimpleArray: boolean;
}

export function useTreeNode(value: any): UseTreeNodeReturn {
  const [expanded, setExpanded] = useState(true);

  const toggleExpanded = useCallback(() => {
    setExpanded((prev) => !prev);
  }, []);

  const isObject = value !== null && typeof value === 'object' && !Array.isArray(value);
  const isArray = Array.isArray(value);

  // Only expandable if it has actual content
  const hasContent = isObject
    ? Object.keys(value).length > 0
    : isArray
      ? value.length > 0
      : false;

  const isExpandable =
    hasContent && (isObject || (isArray && !value.every((i: any) => typeof i !== 'object')));

  // Identify if array is a simple list of strings/numbers (render as badges)
  const isSimpleArray =
    isArray && value.every((i: any) => typeof i === 'string' || typeof i === 'number');

  return {
    expanded,
    toggleExpanded,
    isObject,
    isArray,
    hasContent,
    isExpandable,
    isSimpleArray,
  };
}

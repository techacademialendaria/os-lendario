export interface YamlViewerProps {
  content: string;
  className?: string;
}

export interface TreeNodeProps {
  nodeKey: string;
  value: any;
  depth?: number;
  isLast?: boolean;
  parentExpanded?: boolean;
}

// Check if content looks like YAML
export const isYamlContent = (content: string, sourceFile?: string | null): boolean => {
  if (sourceFile) {
    const ext = sourceFile.split('.').pop()?.toLowerCase();
    if (ext === 'yaml' || ext === 'yml') return true;
  }

  if (!content || content.length > 50000) return false; // Safety limit
  const trimmed = content.trim();

  // Must have YAML structure indicators
  const hasYamlStructure = /^[\w-]+:\s/m.test(trimmed) || /^-\s/m.test(trimmed);
  if (!hasYamlStructure) return false;

  const yamlPatterns = [
    /^---\s*$/m,
    /^[\w-]+:\s*$/m,
    /^[\w-]+:\s+[|><]/m, // Block scalars
  ];

  return yamlPatterns.some((pattern) => pattern.test(trimmed));
};

// Check if content looks like JSON
export const isJsonContent = (content: string, sourceFile?: string | null): boolean => {
  if (sourceFile) {
    const ext = sourceFile.split('.').pop()?.toLowerCase();
    if (ext === 'json') return true;
  }

  if (!content || content.length > 50000) return false;
  const trimmed = content.trim();
  return (
    (trimmed.startsWith('{') && trimmed.endsWith('}')) ||
    (trimmed.startsWith('[') && trimmed.endsWith(']'))
  );
};

export const formatKey = (key: string): string => {
  return key
    .replace(/_/g, ' ')
    .replace(/-/g, ' ')
    .replace(/([A-Z])/g, ' $1') // Space before caps
    .replace(/^./, (str) => str.toUpperCase())
    .trim();
};

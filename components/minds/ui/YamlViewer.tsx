import React, { useMemo, useState } from 'react';
import YAML from 'yaml';
import { Icon } from '../../ui/icon';
import { Badge } from '../../ui/badge';
import { cn } from '../../../lib/utils';
import { Button } from '../../ui/button';

interface YamlViewerProps {
  content: string;
  className?: string;
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

const formatKey = (key: string): string => {
  return key
    .replace(/_/g, ' ')
    .replace(/-/g, ' ')
    .replace(/([A-Z])/g, ' $1') // Space before caps
    .replace(/^./, (str) => str.toUpperCase())
    .trim();
};

// --- NEURAL TREE COMPONENTS ---

const TreeLine: React.FC<{ isLast?: boolean }> = ({ isLast }) => (
  <div
    className={cn(
      'absolute bottom-0 left-0 top-0 w-px border-l border-white/5', // Subtle line
      isLast && 'h-[18px]' // Stop line exactly at connector
    )}
  />
);

const Connector: React.FC = () => (
  <div className="absolute left-0 top-[18px] h-px w-4 border-t border-white/5" />
);

const ExpandButton: React.FC<{ expanded: boolean; onClick: () => void }> = ({
  expanded,
  onClick,
}) => (
  <button
    onClick={(e) => {
      e.stopPropagation();
      onClick();
    }}
    className="bg-studio-card absolute -left-[5px] top-[13px] z-10 flex h-[11px] w-[11px] items-center justify-center rounded-[2px] border border-white/10 opacity-0 transition-all hover:border-studio-primary/50 group-hover/node:opacity-100"
  >
    <Icon name={expanded ? 'minus' : 'plus'} size="size-[6px]" className="text-zinc-500" />
  </button>
);

const KeyLabel: React.FC<{ label: string; icon?: string }> = ({ label, icon }) => (
  <span className="flex select-none items-center gap-2 text-sm font-medium text-zinc-400 transition-colors group-hover/node:text-zinc-200">
    {icon && (
      <Icon
        name={icon}
        size="size-3"
        className="opacity-40 transition-opacity group-hover/node:opacity-80"
      />
    )}
    <span className="opacity-90">{formatKey(label)}</span>
  </span>
);

const ValueBadge: React.FC<{ value: string | number }> = ({ value }) => (
  <span className="inline-flex items-center rounded-md border border-white/5 bg-white/5 px-1.5 py-0.5 font-mono text-[10px] text-zinc-400">
    {value}
  </span>
);

// Recursive Tree Node
// ... (TreeNode component remains similar but with updated styling hooks)

const TreeNode: React.FC<{
  nodeKey: string;
  value: any;
  depth?: number;
  isLast?: boolean;
  parentExpanded?: boolean;
}> = ({ nodeKey, value, depth = 0, isLast = false, parentExpanded = true }) => {
  const [expanded, setExpanded] = useState(true);

  const isObject = value !== null && typeof value === 'object' && !Array.isArray(value);
  const isArray = Array.isArray(value);
  // Only expandable if it has actual content
  const hasContent = isObject ? Object.keys(value).length > 0 : isArray ? value.length > 0 : false;
  const isExpandable =
    hasContent && (isObject || (isArray && !value.every((i: any) => typeof i !== 'object')));

  // Identify if array is a simple list of strings/numbers (render as badges)
  const isSimpleArray =
    isArray && value.every((i: any) => typeof i === 'string' || typeof i === 'number');

  if (!parentExpanded) return null;

  return (
    <div className="relative select-none pl-6">
      {/* Indentation Lines */}
      {depth > 0 && <TreeLine isLast={isLast} />}
      {depth > 0 && <Connector />}

      {/* Node Header/Content */}
      <div className="group/node relative py-1">
        {/* Toggle Button for Complex Objects */}
        {isExpandable && (
          <ExpandButton expanded={expanded} onClick={() => setExpanded(!expanded)} />
        )}

        <div
          className={cn(
            '-ml-1 flex flex-col gap-1 rounded-sm px-1 py-0.5 transition-colors',
            isExpandable && 'cursor-pointer hover:bg-white/5'
          )}
          onClick={(e) => {
            if (isExpandable) {
              e.stopPropagation();
              setExpanded(!expanded);
            }
          }}
        >
          {/* Key + Value Row */}
          <div className="flex min-h-[24px] items-start gap-2">
            <KeyLabel label={nodeKey} />

            {/* If simple primitive value, show inline */}
            {!isObject && !isArray && (
              <span className="pt-[1px] font-mono text-sm text-zinc-500">
                {String(value).length > 60 ? (
                  <span className="mt-1 block whitespace-pre-wrap rounded border border-white/5 bg-black/40 p-2 text-xs leading-relaxed text-zinc-400">
                    {String(value)}
                  </span>
                ) : (
                  <span className="text-studio-primary/80">{String(value)}</span>
                )}
              </span>
            )}

            {/* If Simple Array, show Badges */}
            {isSimpleArray && (
              <div className="mt-0.5 flex flex-wrap gap-1.5">
                {(value as any[]).map((item, i) => (
                  <Badge
                    key={i}
                    variant="secondary"
                    className="h-5 rounded-md border-zinc-800 bg-zinc-900 px-1.5 font-mono text-[10px] text-zinc-400"
                  >
                    {item}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Children (Nested Objects) */}
        {expanded && isObject && (
          <div className="relative">
            {Object.entries(value).map(([childKey, childValue], i, arr) => (
              <TreeNode
                key={childKey}
                nodeKey={childKey}
                value={childValue}
                depth={depth + 1}
                isLast={i === arr.length - 1}
              />
            ))}
          </div>
        )}

        {/* Children (Array of Objects) */}
        {expanded && isArray && !isSimpleArray && (
          <div className="relative">
            {(value as any[]).map((item, i, arr) => (
              <TreeNode
                key={i}
                nodeKey={`${nodeKey.replace(/s$/, '')} ${i + 1}`}
                value={item}
                depth={depth + 1}
                isLast={i === arr.length - 1}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Helper to render markdown fallback
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

const MarkdownFallback: React.FC<{ content: string; error?: string }> = ({ content, error }) => {
  return (
    <div className="space-y-4">
      {error && (
        <div className="flex items-center gap-2 rounded-md border border-red-500/20 bg-red-500/10 p-3 font-mono text-xs text-red-400">
          <Icon name="exclamation-triangle" size="size-3" />
          <span>Falha ao processar estrutura de dados. Exibindo texto bruto.</span>
        </div>
      )}
      <pre className="overflow-x-auto whitespace-pre-wrap rounded-lg border border-zinc-800 bg-zinc-950 p-4 font-mono text-sm leading-relaxed text-zinc-400">
        {content}
      </pre>
    </div>
  );
};

// Generic Tree Viewer Component (reused by YAML and JSON wrappers)
const NeuralTreeViewer: React.FC<{ data: any }> = ({ data }) => {
  if (data === null || typeof data !== 'object') {
    return (
      <div className="break-all rounded-lg border border-zinc-800 bg-zinc-900/30 p-4 font-mono text-sm text-zinc-300">
        {String(data)}
      </div>
    );
  }

  return (
    <div className="-ml-4 font-mono text-sm leading-relaxed">
      {Object.entries(data).map(([key, value], i, arr) => (
        <TreeNode key={key} nodeKey={key} value={value} isLast={i === arr.length - 1} />
      ))}
    </div>
  );
};

export const YamlViewer: React.FC<YamlViewerProps> = ({ content, className }) => {
  const [parseError, setParseError] = React.useState<string | null>(null);
  const [parsedData, setParsedData] = React.useState<any>(null);

  React.useEffect(() => {
    try {
      if (!content) {
        setParsedData(null);
        setParseError(null);
        return;
      }
      // Basic YAML safety check
      if (content.length > 200000) throw new Error('File too large to parse');

      // Handle multi-document YAML (e.g. from Jekyll/Frontmatter)
      // Split by --- and find the first valid YAML object
      const documents = content.split(/^---$/m).filter((doc) => doc.trim().length > 0);

      let data = null;
      if (documents.length > 0) {
        try {
          data = YAML.parse(documents[0]);
        } catch (e) {
          // If first doc fails, try the second (common in frontmatter files where first part is empty)
          if (documents.length > 1) {
            data = YAML.parse(documents[1]);
          } else {
            throw e;
          }
        }
      } else {
        data = YAML.parse(content);
      }

      setParsedData(data);
      setParseError(null);
    } catch (e: any) {
      console.warn('YAML Parse Warning:', e);
      setParseError(e.message || 'Unknown parsing error');
      setParsedData(null);
    }
  }, [content]);

  if (parseError) {
    return <MarkdownFallback content={content} error={parseError} />;
  }

  if (!parsedData) {
    return <div className="text-xs italic text-muted-foreground">Vazio ou carregando...</div>;
  }

  return (
    <div className={cn('relative', className)}>
      <NeuralTreeViewer data={parsedData} />
    </div>
  );
};

export const JsonViewer: React.FC<YamlViewerProps> = ({ content, className }) => {
  const [parseError, setParseError] = React.useState<string | null>(null);
  const [parsedData, setParsedData] = React.useState<any>(null);

  React.useEffect(() => {
    try {
      if (!content) {
        setParsedData(null);
        setParseError(null);
        return;
      }
      const data = JSON.parse(content);
      setParsedData(data);
      setParseError(null);
    } catch (e: any) {
      console.warn('JSON Parse Warning:', e);
      setParseError(e.message || 'Unknown parsing error');
      setParsedData(null);
    }
  }, [content]);

  if (parseError) {
    return <MarkdownFallback content={content} error={parseError} />;
  }

  if (!parsedData) {
    return <div className="text-xs italic text-muted-foreground">Vazio ou carregando...</div>;
  }

  return (
    <div className={cn('relative', className)}>
      <NeuralTreeViewer data={parsedData} />
    </div>
  );
};

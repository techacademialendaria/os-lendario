import React from 'react';
import { Badge } from '../../../../ui/badge';
import { cn } from '../../../../../lib/utils';
import { useTreeNode } from '../hooks';
import { TreeLine, Connector, ExpandButton, KeyLabel } from './TreeComponents';
import type { TreeNodeProps } from '../types';

export const TreeNode: React.FC<TreeNodeProps> = ({
  nodeKey,
  value,
  depth = 0,
  isLast = false,
  parentExpanded = true,
}) => {
  const {
    expanded,
    toggleExpanded,
    isObject,
    isArray,
    isExpandable,
    isSimpleArray,
  } = useTreeNode(value);

  if (!parentExpanded) return null;

  return (
    <div className="relative select-none pl-6">
      {/* Indentation Lines */}
      {depth > 0 && <TreeLine isLast={isLast} />}
      {depth > 0 && <Connector />}

      {/* Node Header/Content */}
      <div className="group/node relative py-1">
        {/* Toggle Button for Complex Objects */}
        {isExpandable && <ExpandButton expanded={expanded} onClick={toggleExpanded} />}

        <div
          className={cn(
            '-ml-1 flex flex-col gap-1 rounded-sm px-1 py-0.5 transition-colors',
            isExpandable && 'cursor-pointer hover:bg-white/5'
          )}
          onClick={(e) => {
            if (isExpandable) {
              e.stopPropagation();
              toggleExpanded();
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

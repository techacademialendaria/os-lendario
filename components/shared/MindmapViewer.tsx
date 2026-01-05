/**
 * MindmapViewer - Custom mindmap visualization component
 */

import React, { useState, useMemo, memo } from 'react';
import { Expand, Compress } from 'iconoir-react';
import { cn } from '../../lib/utils';

interface MindmapNode {
  id: string;
  label: string;
  children: MindmapNode[];
  depth: number;
}

interface MindmapViewerProps {
  content: string;
}

function parseMindmapSyntax(content: string): MindmapNode | null {
  const lines = content.split('\n').filter((line) => line.trim() && !line.trim().startsWith('mindmap'));
  if (lines.length === 0) return null;

  let rootLabel = lines[0].trim();
  const rootMatch = rootLabel.match(/root\(\((.+)\)\)/);
  if (rootMatch) {
    rootLabel = rootMatch[1];
  } else if (rootLabel.startsWith('root')) {
    rootLabel = rootLabel.replace('root', '').trim();
  }

  const root: MindmapNode = { id: 'root', label: rootLabel, children: [], depth: 0 };
  const stack: { node: MindmapNode; indent: number }[] = [{ node: root, indent: -1 }];
  let nodeId = 0;

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();
    if (!trimmed) continue;

    const indent = line.search(/\S/);
    const newNode: MindmapNode = { id: `node-${++nodeId}`, label: trimmed, children: [], depth: 0 };

    while (stack.length > 1 && stack[stack.length - 1].indent >= indent) {
      stack.pop();
    }

    const parent = stack[stack.length - 1].node;
    newNode.depth = parent.depth + 1;
    parent.children.push(newNode);
    stack.push({ node: newNode, indent });
  }

  return root;
}

const MindmapViewerComponent: React.FC<MindmapViewerProps> = ({ content }) => {
  const tree = useMemo(() => parseMindmapSyntax(content), [content]);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({ root: true });

  if (!tree) {
    return (
      <div className="my-6 rounded-xl border border-border/30 bg-muted/10 p-6 text-center text-sm text-muted-foreground">
        Não foi possível renderizar o mindmap.
      </div>
    );
  }

  const countNodes = (node: MindmapNode): number => {
    return 1 + node.children.reduce((sum, child) => sum + countNodes(child), 0);
  };

  const toggle = (id: string) => {
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const renderNode = (n: MindmapNode, isRoot = false) => {
    const hasChildren = n.children.length > 0;
    const isExpanded = expanded[n.id] ?? false;

    return (
      <div key={n.id} className={cn(isRoot ? '' : 'ml-4 border-l border-primary/10 pl-4')}>
        <div className={cn(
          'flex items-center gap-2 py-2 px-3 rounded-lg',
          isRoot && 'bg-primary/10 font-bold text-primary'
        )}>
          {hasChildren ? (
            <span
              onClick={() => toggle(n.id)}
              className={cn(
                'w-5 h-5 flex items-center justify-center rounded text-xs shrink-0 cursor-pointer select-none',
                'bg-primary/10 text-primary hover:bg-primary/20',
                isExpanded && 'rotate-90'
              )}
            >
              ›
            </span>
          ) : (
            <span className="w-5 h-5 flex items-center justify-center text-primary/40 shrink-0">•</span>
          )}
          <span className={cn(
            'text-sm',
            isRoot ? 'text-primary font-semibold' : 'text-foreground/80',
            n.depth === 1 && 'font-medium text-foreground'
          )}>
            {n.label}
          </span>
          {hasChildren && (
            <span className="ml-auto text-[10px] text-muted-foreground bg-muted/50 px-2 py-0.5 rounded-full shrink-0">
              {n.children.length}
            </span>
          )}
        </div>
        {hasChildren && isExpanded && (
          <div className="mt-1">{n.children.map((child) => renderNode(child))}</div>
        )}
      </div>
    );
  };

  return (
    <div className={isFullscreen ? 'fixed inset-0 z-50 flex flex-col bg-[#0c0b09]' : 'my-8 rounded-2xl border border-primary/10 bg-[#0c0b09] overflow-hidden'}>
      <div className="flex items-center justify-between px-6 py-4 border-b border-primary/10 bg-[#0a0908]">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-widest text-primary/80">Mapa Mental</span>
          <span className="text-[10px] text-muted-foreground">• {countNodes(tree)} conceitos</span>
        </div>
        <button
          onClick={() => setIsFullscreen(!isFullscreen)}
          className={cn(
            'p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10',
            isFullscreen && 'bg-primary/20 text-primary'
          )}
        >
          {isFullscreen ? <Compress className="w-4 h-4" /> : <Expand className="w-4 h-4" />}
        </button>
      </div>
      <div className={cn('p-6 overflow-auto', isFullscreen && 'flex-1')}>
        {renderNode(tree, true)}
      </div>
    </div>
  );
};

// memo previne re-render quando props não mudam
export const MindmapViewer = memo(MindmapViewerComponent);
export default MindmapViewer;

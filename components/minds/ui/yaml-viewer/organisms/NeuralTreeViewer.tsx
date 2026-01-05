import React from 'react';
import { TreeNode } from './TreeNode';

interface NeuralTreeViewerProps {
  data: any;
}

export const NeuralTreeViewer: React.FC<NeuralTreeViewerProps> = ({ data }) => {
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

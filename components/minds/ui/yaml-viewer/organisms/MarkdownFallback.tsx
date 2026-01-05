import React from 'react';
import { Icon } from '../../../../ui/icon';

interface MarkdownFallbackProps {
  content: string;
  error?: string;
}

export const MarkdownFallback: React.FC<MarkdownFallbackProps> = ({ content, error }) => {
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

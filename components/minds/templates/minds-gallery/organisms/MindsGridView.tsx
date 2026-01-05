import React from 'react';
import MindCard from '../../../ui/MindCard';
import { Icon } from '../../../../ui/icon';
import type { MindData as Mind } from '../../../ui/MindCard';

interface MindsGridViewProps {
  minds: Mind[];
  onMindClick: (slug: string) => void;
}

export const MindsGridView: React.FC<MindsGridViewProps> = ({ minds, onMindClick }) => {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      {minds.map((mind) => (
        <MindCard key={mind.id} mind={mind} onClick={() => onMindClick(mind.slug)} />
      ))}

      {/* Create New Mind Placeholder Card */}
      <button className="group flex h-full min-h-[320px] flex-col items-center justify-center rounded-xl border border-dashed border-studio-border transition-all duration-300 hover:border-studio-primary/50 hover:bg-studio-primary/5">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-studio-primary/5 text-zinc-600 transition-colors group-hover:bg-studio-primary/20 group-hover:text-studio-primary">
          <Icon name="plus" size="size-8" />
        </div>
        <span className="text-sm font-bold uppercase tracking-wide text-zinc-500 group-hover:text-studio-primary">
          Criar Nova Mente
        </span>
      </button>
    </div>
  );
};

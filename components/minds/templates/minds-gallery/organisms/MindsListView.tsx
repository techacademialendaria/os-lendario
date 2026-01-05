import React from 'react';
import { Button } from '../../../../ui/button';
import { Icon } from '../../../../ui/icon';
import type { MindData as Mind } from '../../../ui/MindCard';

interface MindsListViewProps {
  minds: Mind[];
  onMindClick: (slug: string) => void;
}

export const MindsListView: React.FC<MindsListViewProps> = ({ minds, onMindClick }) => {
  return (
    <div className="bg-studio-card w-full overflow-hidden rounded-xl border border-studio-border">
      {/* Table Header */}
      <div className="grid grid-cols-12 gap-4 border-b border-studio-border bg-studio-primary/5 px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
        <div className="col-span-3">Mente Sintetica</div>
        <div className="col-span-2">Habilidade Assinatura</div>
        <div className="col-span-3">Resumo</div>
        <div className="col-span-2">Expertise</div>
        <div className="col-span-1">Status</div>
        <div className="col-span-1 text-right">Acoes</div>
      </div>

      {/* Table Body */}
      <div className="divide-y divide-studio-border">
        {minds.map((mind) => (
          <div
            key={mind.id}
            className="group grid cursor-pointer grid-cols-12 items-center gap-4 px-6 py-4 transition-colors hover:bg-white/[0.01]"
            onClick={() => onMindClick(mind.slug)}
          >
            {/* Name & Avatar */}
            <div className="col-span-3 flex items-center gap-3">
              <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full border border-studio-primary/20 bg-zinc-800">
                <img
                  src={mind.avatar}
                  alt={mind.name}
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    // Fallback if image fails
                    (e.target as HTMLImageElement).style.display = 'none';
                    (e.target as HTMLImageElement).parentElement!.innerText = mind.name
                      .substring(0, 2)
                      .toUpperCase();
                    (e.target as HTMLImageElement).parentElement!.classList.add(
                      'flex',
                      'items-center',
                      'justify-center',
                      'text-xs',
                      'font-bold',
                      'text-zinc-500'
                    );
                  }}
                />
              </div>
              <div className="flex flex-col overflow-hidden">
                <span className="truncate text-sm font-bold text-white transition-colors group-hover:text-studio-primary">
                  {mind.name}
                </span>
                <span className="truncate font-mono text-[10px] text-zinc-500">@{mind.slug}</span>
              </div>
            </div>

            {/* Signature Skill (Superpower) */}
            <div className="col-span-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-studio-primary/90">
                  {mind.signatureSkill || 'Synthetic Mind'}
                </span>
              </div>
            </div>

            {/* Description (Truncated) */}
            <div className="col-span-3 pr-4">
              <p className="line-clamp-2 text-xs leading-relaxed text-zinc-400">
                {mind.description}
              </p>
            </div>

            {/* Expertise */}
            <div className="col-span-2">
              {mind.expertise && mind.expertise.length > 0 ? (
                <div className="flex flex-col gap-1">
                  <span className="inline-flex w-fit whitespace-nowrap rounded border border-studio-primary/10 bg-studio-primary/5 px-1.5 py-0.5 text-[10px] text-zinc-400">
                    {mind.expertise[0]}
                  </span>
                  {mind.expertise.length > 1 && (
                    <span className="pl-1 text-[10px] text-zinc-600">
                      +{mind.expertise.length - 1} areas
                    </span>
                  )}
                </div>
              ) : (
                <span className="text-xs text-zinc-700">-</span>
              )}
            </div>

            {/* Status */}
            <div className="col-span-1">
              <div
                className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-medium ${
                  mind.status === 'production'
                    ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-400'
                    : 'border-yellow-500/20 bg-yellow-500/10 text-yellow-400'
                }`}
              >
                {mind.status === 'production' ? 'Ativo' : 'Criando'}
              </div>
            </div>

            {/* Actions */}
            <div className="col-span-1 flex justify-end">
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 rounded-full text-zinc-500 hover:bg-white/10 hover:text-white"
              >
                <Icon name="arrow-right" size="size-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

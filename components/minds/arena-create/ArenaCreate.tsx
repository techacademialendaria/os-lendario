import React, { useMemo } from 'react';
import { Button } from '../../ui/button';
import { Icon } from '../../ui/icon';
import { Input } from '../../ui/input';
import { Select } from '../../ui/select';
import { Card } from '../../ui/card';
import { ScrollArea } from '../../ui/scroll-area';
import { CloneCardSelect } from '../templates/CloneCardSelect';
import { useToast } from '../../../hooks/use-toast';
import { cn } from '../../../lib/utils';
import { useArenaSelection, useArenaConfig } from './hooks';
import { PlayerStage } from './organisms';
import type { ArenaCreateProps } from './types';

/**
 * ArenaCreate - Orchestrator Component
 *
 * STATE MANAGEMENT (extracted to hooks):
 * - useArenaSelection: selectedClone1, selectedClone2, imgError1, imgError2, isRandomizing, searchQuery (6 useState -> 1 hook)
 * - useArenaConfig: topic, framework (2 useState -> 1 hook)
 * - imgError state moved to PlayerStage organism (2 useState -> moved to organism)
 *
 * TOTAL: 9 useState -> 2 custom hooks + local state in organism
 */
export const ArenaCreate: React.FC<ArenaCreateProps> = ({ minds, frameworks, onBack, onStart }) => {
  const { toast } = useToast();
  const selection = useArenaSelection();
  const config = useArenaConfig();

  const handleStart = () => {
    if (!selection.selectedClone1 || !selection.selectedClone2 || !config.topic) {
      toast({
        title: 'Configuracao incompleta',
        description: 'Selecione dois clones e um topico.',
        variant: 'destructive',
      });
      return;
    }
    if (selection.selectedClone1 === selection.selectedClone2) {
      toast({
        title: 'Erro',
        description: 'Um clone nao pode debater consigo mesmo.',
        variant: 'destructive',
      });
      return;
    }

    onStart({
      clone1Id: selection.selectedClone1,
      clone2Id: selection.selectedClone2,
      topic: config.topic,
      frameworkId: config.framework,
    });
  };

  // Filter Clones based on search
  const baseFiltered = useMemo(() => minds.filter(
    (clone) =>
      clone.name.toLowerCase().includes(selection.searchQuery.toLowerCase()) ||
      clone.role.toLowerCase().includes(selection.searchQuery.toLowerCase())
  ), [minds, selection.searchQuery]);

  // Filter for Player 1 (exclude Player 2 selection)
  const filteredClones1 = useMemo(() =>
    baseFiltered.filter((clone) => clone.id !== selection.selectedClone2),
    [baseFiltered, selection.selectedClone2]
  );

  // Filter for Player 2 (exclude Player 1 selection)
  const filteredClones2 = useMemo(() =>
    baseFiltered.filter((clone) => clone.id !== selection.selectedClone1),
    [baseFiltered, selection.selectedClone1]
  );

  // Get selected objects for display
  const c1 = minds.find((c) => c.id === selection.selectedClone1);
  const c2 = minds.find((c) => c.id === selection.selectedClone2);

  return (
    <div className="animate-in fade-in mx-auto max-w-6xl space-y-8 pb-12 duration-500">
      {/* Header Actions */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack} className="text-zinc-400 hover:text-white">
          <Icon name="arrow-left" className="mr-2" /> Voltar ao Lobby
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => selection.randomize(minds)}
          disabled={selection.isRandomizing || minds.length < 2}
          className="border-studio-primary/30 text-studio-primary hover:bg-studio-primary/10"
        >
          <Icon name="refresh" className={cn('mr-2', selection.isRandomizing && 'animate-spin')} /> Match Aleatorio
        </Button>
      </div>

      {/* VS STAGE AREA */}
      <div className="relative grid min-h-[400px] grid-cols-1 items-stretch gap-4 lg:grid-cols-5">
        {/* Player 1 Selection Area */}
        <div className="flex flex-col gap-4 lg:col-span-2">
          <PlayerStage
            player="player1"
            mind={c1}
            isSelected={!!selection.selectedClone1}
          />
        </div>

        {/* VS Badge & Settings (Center) */}
        <div className="relative flex flex-col items-center justify-center py-4 lg:col-span-1 lg:py-0">
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="hidden h-full w-px bg-gradient-to-b from-transparent via-white/10 to-transparent lg:block"></div>
          </div>

          <div className="bg-studio-card relative z-10 rounded-full border-4 border-zinc-800 p-4 shadow-2xl">
            <span className="bg-gradient-to-r from-cyan-500 via-white to-red-500 bg-clip-text pr-1 text-4xl font-black italic text-transparent">
              VS
            </span>
          </div>
        </div>

        {/* Player 2 Selection Area */}
        <div className="flex flex-col gap-4 lg:col-span-2">
          <PlayerStage
            player="player2"
            mind={c2}
            isSelected={!!selection.selectedClone2}
          />
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative z-10 -mb-4 flex justify-center">
        <div className="relative w-full max-w-md">
          <Icon
            name="search"
            className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
            size="size-4"
          />
          <Input
            placeholder="Buscar mente lendaria..."
            className="bg-studio-card h-10 rounded-full border-white/10 pl-10 text-white transition-colors focus:border-studio-primary/50"
            value={selection.searchQuery}
            onChange={(e) => selection.setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Selection Lists & Config */}
      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* List 1 */}
        <Card className="bg-studio-card flex h-[300px] flex-col border-white/10">
          <div className="border-b border-white/5 bg-zinc-900/50 p-3">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">
              Mentes Disponiveis
            </span>
          </div>
          <ScrollArea className="flex-1 p-2">
            <div className="grid grid-cols-1 gap-2">
              {filteredClones1.length > 0 ? (
                filteredClones1.map((clone) => (
                  <CloneCardSelect
                    key={`c1-list-${clone.id}`}
                    clone={clone}
                    selected={selection.selectedClone1 === clone.id}
                    onClick={() => selection.selectClone1(clone.id)}
                    compact
                  />
                ))
              ) : (
                <div className="py-8 text-center text-xs text-zinc-600">
                  Nenhuma mente encontrada.
                </div>
              )}
            </div>
          </ScrollArea>
        </Card>

        {/* Config Center */}
        <div className="flex flex-col justify-end space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">
              Topico da Batalha
            </label>
            <Input
              placeholder="Ex: A IA vai substituir criativos?"
              className="bg-studio-card h-12 border-white/10 text-center font-serif text-lg text-white focus:border-studio-primary"
              value={config.topic}
              onChange={(e) => config.setTopic(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">
              Regras (Framework)
            </label>
            <Select
              value={config.framework}
              onValueChange={config.setFramework}
              options={frameworks.map((f) => ({ label: f.name, value: f.id }))}
              className="bg-studio-card h-10 border-white/10 text-center text-white"
            />
          </div>
          <Button
            size="lg"
            className={cn(
              'h-14 w-full text-lg font-black uppercase tracking-wider shadow-lg transition-all duration-300',
              selection.selectedClone1 && selection.selectedClone2 && config.topic
                ? 'bg-studio-primary text-white hover:scale-105 hover:shadow-studio-primary/20'
                : 'cursor-not-allowed bg-zinc-800 text-zinc-500'
            )}
            onClick={handleStart}
          >
            <Icon name="flash" className="mr-2" /> Iniciar Combate
          </Button>
        </div>

        {/* List 2 */}
        <Card className="bg-studio-card flex h-[300px] flex-col border-white/10">
          <div className="border-b border-white/5 bg-zinc-900/50 p-3 text-right">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">
              Mentes Disponiveis
            </span>
          </div>
          <ScrollArea className="flex-1 p-2">
            <div className="grid grid-cols-1 gap-2">
              {filteredClones2.length > 0 ? (
                filteredClones2.map((clone) => (
                  <CloneCardSelect
                    key={`c2-list-${clone.id}`}
                    clone={clone}
                    selected={selection.selectedClone2 === clone.id}
                    onClick={() => selection.selectClone2(clone.id)}
                    compact
                  />
                ))
              ) : (
                <div className="py-8 text-center text-xs text-zinc-600">
                  Nenhuma mente encontrada.
                </div>
              )}
            </div>
          </ScrollArea>
        </Card>
      </div>
    </div>
  );
};

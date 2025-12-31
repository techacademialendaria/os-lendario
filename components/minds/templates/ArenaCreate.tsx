import React, { useState } from 'react';
import { Button } from '../../ui/button';
import { Icon } from '../../ui/icon';
import { Input } from '../../ui/input';
import { Select } from '../../ui/select';
import { Badge } from '../../ui/badge';
import { Card } from '../../ui/card';
import { CloneCardSelect, Mind } from './CloneCardSelect';
import { useToast } from '../../../hooks/use-toast';
import { cn } from '../../../lib/utils';
import { ScrollArea } from '../../ui/scroll-area';

// Helper: Extract initials from full name (e.g., "Steve Jobs" -> "SJ")
const getInitials = (name: string): string => {
  return name
    .trim()
    .split(/\s+/)
    .map((word) => word[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
};

export interface DebateConfig {
  clone1Id: string;
  clone2Id: string;
  topic: string;
  frameworkId: string;
}

export interface Framework {
  id: string;
  name: string;
  rounds: number;
  desc: string;
}

interface ArenaCreateProps {
  minds: Mind[];
  frameworks: Framework[];
  onBack: () => void;
  onStart: (config: DebateConfig) => void;
}

export const ArenaCreate: React.FC<ArenaCreateProps> = ({ minds, frameworks, onBack, onStart }) => {
  const { toast } = useToast();
  const [selectedClone1, setSelectedClone1] = useState<string | null>(null);
  const [selectedClone2, setSelectedClone2] = useState<string | null>(null);
  const [topic, setTopic] = useState('');
  const [framework, setFramework] = useState('oxford');
  const [isRandomizing, setIsRandomizing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [imgError1, setImgError1] = useState(false);
  const [imgError2, setImgError2] = useState(false);

  const handleStart = () => {
    if (!selectedClone1 || !selectedClone2 || !topic) {
      toast({
        title: 'Configuração incompleta',
        description: 'Selecione dois clones e um tópico.',
        variant: 'destructive',
      });
      return;
    }
    if (selectedClone1 === selectedClone2) {
      toast({
        title: 'Erro',
        description: 'Um clone não pode debater consigo mesmo.',
        variant: 'destructive',
      });
      return;
    }

    onStart({
      clone1Id: selectedClone1,
      clone2Id: selectedClone2,
      topic,
      frameworkId: framework,
    });
  };

  // Reset image error when selection changes
  const handleSetClone1 = (id: string) => {
    setSelectedClone1(id);
    setImgError1(false);
  };

  const handleSetClone2 = (id: string) => {
    setSelectedClone2(id);
    setImgError2(false);
  };

  const handleRandomize = () => {
    if (minds.length < 2) return;

    setIsRandomizing(true);
    // Simulate roulette effect
    let interval = setInterval(() => {
      const r1 = minds[Math.floor(Math.random() * minds.length)].id;
      const r2 = minds[Math.floor(Math.random() * minds.length)].id;
      handleSetClone1(r1);
      handleSetClone2(r2);
    }, 100);

    setTimeout(() => {
      clearInterval(interval);
      // Ensure they are different
      const final1 = minds[Math.floor(Math.random() * minds.length)];
      let final2 = minds[Math.floor(Math.random() * minds.length)];
      while (final2.id === final1.id) {
        final2 = minds[Math.floor(Math.random() * minds.length)];
      }
      handleSetClone1(final1.id);
      handleSetClone2(final2.id);
      setIsRandomizing(false);
    }, 800);
  };

  // Filter Clones based on search
  const baseFiltered = minds.filter(
    (clone) =>
      clone.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      clone.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter for Player 1 (exclude Player 2 selection)
  const filteredClones1 = baseFiltered.filter((clone) => clone.id !== selectedClone2);

  // Filter for Player 2 (exclude Player 1 selection)
  const filteredClones2 = baseFiltered.filter((clone) => clone.id !== selectedClone1);

  // Get selected objects for display
  const c1 = minds.find((c) => c.id === selectedClone1);
  const c2 = minds.find((c) => c.id === selectedClone2);

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
          onClick={handleRandomize}
          disabled={isRandomizing || minds.length < 2}
          className="border-studio-primary/30 text-studio-primary hover:bg-studio-primary/10"
        >
          <Icon name="refresh" className={cn('mr-2', isRandomizing && 'animate-spin')} /> Match
          Aleatório
        </Button>
      </div>

      {/* VS STAGE AREA */}
      <div className="relative grid min-h-[400px] grid-cols-1 items-stretch gap-4 lg:grid-cols-5">
        {/* Player 1 Selection Area */}
        <div className="flex flex-col gap-4 lg:col-span-2">
          <div
            className={cn(
              'bg-studio-card relative flex flex-1 flex-col items-center justify-center overflow-hidden rounded-2xl border-2 p-6 transition-all duration-500',
              selectedClone1
                ? 'border-cyan-500/50 shadow-[0_0_30px_-10px_rgba(34,211,238,0.2)]'
                : 'border-dashed border-white/5'
            )}
          >
            {c1 ? (
              <>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent"></div>
                <div className="relative z-10 mb-4 flex h-32 w-32 items-center justify-center overflow-hidden rounded-full border-4 border-cyan-500/20 bg-zinc-900 shadow-xl transition-transform duration-500 hover:scale-110">
                  {c1.avatar?.startsWith('/') && !imgError1 ? (
                    <img
                      src={c1.avatar}
                      alt={c1.name}
                      className="h-full w-full object-cover"
                      onError={() => setImgError1(true)}
                    />
                  ) : null}
                  {(imgError1 || !c1.avatar?.startsWith('/')) && (
                    <span className={cn('text-4xl font-black', c1.color)}>
                      {c1.avatar?.startsWith('/') ? getInitials(c1.name) : c1.avatar}
                    </span>
                  )}
                </div>
                <h2 className="z-10 text-center text-3xl font-black uppercase tracking-tight text-white">
                  {c1.name}
                </h2>
                <p className="z-10 font-serif text-zinc-400">{c1.role}</p>
                <Badge className="mt-4 border-cyan-500/20 bg-cyan-500/10 text-cyan-500">
                  PROPOSIÇÃO
                </Badge>
              </>
            ) : (
              <div className="text-center text-zinc-600">
                <Icon name="user" className="mb-4 text-6xl opacity-20" />
                <p className="font-mono text-sm uppercase tracking-widest">Selecione o Player 1</p>
              </div>
            )}
          </div>
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
          <div
            className={cn(
              'bg-studio-card relative flex flex-1 flex-col items-center justify-center overflow-hidden rounded-2xl border-2 p-6 transition-all duration-500',
              selectedClone2
                ? 'border-red-500/50 shadow-[0_0_30px_-10px_rgba(239,68,68,0.2)]'
                : 'border-dashed border-white/5'
            )}
          >
            {c2 ? (
              <>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-red-500/5 to-transparent"></div>
                <div className="relative z-10 mb-4 flex h-32 w-32 items-center justify-center overflow-hidden rounded-full border-4 border-red-500/20 bg-zinc-900 shadow-xl transition-transform duration-500 hover:scale-110">
                  {c2.avatar?.startsWith('/') && !imgError2 ? (
                    <img
                      src={c2.avatar}
                      alt={c2.name}
                      className="h-full w-full object-cover"
                      onError={() => setImgError2(true)}
                    />
                  ) : null}
                  {(imgError2 || !c2.avatar?.startsWith('/')) && (
                    <span className={cn('text-4xl font-black', c2.color)}>
                      {c2.avatar?.startsWith('/') ? getInitials(c2.name) : c2.avatar}
                    </span>
                  )}
                </div>
                <h2 className="z-10 text-center text-3xl font-black uppercase tracking-tight text-white">
                  {c2.name}
                </h2>
                <p className="z-10 font-serif text-zinc-400">{c2.role}</p>
                <Badge className="mt-4 border-red-500/20 bg-red-500/10 text-red-500">
                  OPOSIÇÃO
                </Badge>
              </>
            ) : (
              <div className="text-center text-zinc-600">
                <Icon name="user" className="mb-4 text-6xl opacity-20" />
                <p className="font-mono text-sm uppercase tracking-widest">Selecione o Player 2</p>
              </div>
            )}
          </div>
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
            placeholder="Buscar mente lendária..."
            className="bg-studio-card h-10 rounded-full border-white/10 pl-10 text-white transition-colors focus:border-studio-primary/50"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Selection Lists & Config */}
      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* List 1 */}
        <Card className="bg-studio-card flex h-[300px] flex-col border-white/10">
          <div className="border-b border-white/5 bg-zinc-900/50 p-3">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">
              Mentes Disponíveis
            </span>
          </div>
          <ScrollArea className="flex-1 p-2">
            <div className="grid grid-cols-1 gap-2">
              {filteredClones1.length > 0 ? (
                filteredClones1.map((clone) => (
                  <CloneCardSelect
                    key={`c1-list-${clone.id}`}
                    clone={clone}
                    selected={selectedClone1 === clone.id}
                    onClick={() => handleSetClone1(clone.id)}
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
              Tópico da Batalha
            </label>
            <Input
              placeholder="Ex: A IA vai substituir criativos?"
              className="bg-studio-card h-12 border-white/10 text-center font-serif text-lg text-white focus:border-studio-primary"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">
              Regras (Framework)
            </label>
            <Select
              value={framework}
              onValueChange={setFramework}
              options={frameworks.map((f) => ({ label: f.name, value: f.id }))}
              className="bg-studio-card h-10 border-white/10 text-center text-white"
            />
          </div>
          <Button
            size="lg"
            className={cn(
              'h-14 w-full text-lg font-black uppercase tracking-wider shadow-lg transition-all duration-300',
              selectedClone1 && selectedClone2 && topic
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
              Mentes Disponíveis
            </span>
          </div>
          <ScrollArea className="flex-1 p-2">
            <div className="grid grid-cols-1 gap-2">
              {filteredClones2.length > 0 ? (
                filteredClones2.map((clone) => (
                  <CloneCardSelect
                    key={`c2-list-${clone.id}`}
                    clone={clone}
                    selected={selectedClone2 === clone.id}
                    onClick={() => handleSetClone2(clone.id)}
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

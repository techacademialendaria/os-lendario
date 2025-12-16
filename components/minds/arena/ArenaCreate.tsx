
import React, { useState, useMemo } from 'react';
import { Button } from '../../ui/button';
import { Icon } from '../../ui/icon';
import { Input } from '../../ui/input';
import { Select } from '../../ui/select';
import { Separator } from '../../ui/separator';
import { Badge } from '../../ui/badge';
import { FRAMEWORKS } from './data';
import { MindCardSelect } from './MindCardSelect';
import { useToast } from '../../../hooks/use-toast';
import { usePublicMinds } from '../../../hooks/usePublicMinds';
import { DebateConfig } from './types';

interface ArenaCreateProps {
    onBack: () => void;
    onStart: (config: DebateConfig) => void;
}

export const ArenaCreate: React.FC<ArenaCreateProps> = ({ onBack, onStart }) => {
    const { toast } = useToast();
    const { minds, loading } = usePublicMinds();
    const [selectedClone1, setSelectedClone1] = useState<string | null>(null);
    const [selectedClone2, setSelectedClone2] = useState<string | null>(null);
    const [topic, setTopic] = useState("");
    const [framework, setFramework] = useState("oxford");
    const [search1, setSearch1] = useState("");
    const [search2, setSearch2] = useState("");

    // Filter minds based on search
    const getFilteredMinds = (searchTerm: string) => {
        if (!searchTerm.trim()) return minds.slice(0, 4); // Show first 4 by default
        return minds.filter(m =>
            m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            m.shortBio.toLowerCase().includes(searchTerm.toLowerCase())
        );
    };

    const filteredMinds1 = useMemo(() => getFilteredMinds(search1), [minds, search1]);
    const filteredMinds2 = useMemo(() => getFilteredMinds(search2), [minds, search2]);

    // Get selected mind data
    const selectedMind1 = minds.find(m => m.id === selectedClone1);
    const selectedMind2 = minds.find(m => m.id === selectedClone2);

    const handleStart = () => {
        if (!selectedClone1 || !selectedClone2 || !topic) {
            toast({ title: "Configuração incompleta", description: "Selecione dois clones e um tópico.", variant: "destructive" });
            return;
        }
        if (selectedClone1 === selectedClone2) {
             toast({ title: "Erro", description: "Um clone não pode debater consigo mesmo.", variant: "destructive" });
             return;
        }
        
        onStart({
            clone1Id: selectedClone1,
            clone2Id: selectedClone2,
            topic,
            frameworkId: framework
        });
    };

    return (
      <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <Icon name="arrow-left" />
          </Button>
          <h2 className="text-2xl font-bold text-foreground">Configurar Batalha</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Mind 1 Selector */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-widest text-center">
              Proponente (Thesis)
            </h3>
            <Input
              placeholder="Buscar mente..."
              value={search1}
              onChange={(e) => setSearch1(e.target.value)}
              className="bg-input border-border h-10"
              disabled={loading}
            />
            <div className="grid grid-cols-2 gap-4 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
              {loading ? (
                <div className="col-span-2 text-center py-8 text-muted-foreground">
                  Carregando mentes...
                </div>
              ) : filteredMinds1.length > 0 ? (
                filteredMinds1.map((mind) => (
                  <MindCardSelect
                    key={`c1-${mind.id}`}
                    id={mind.id}
                    slug={mind.slug}
                    name={mind.name}
                    shortBio={mind.shortBio}
                    avatar={mind.avatar}
                    apexScore={mind.apexScore}
                    selected={selectedClone1 === mind.id}
                    onClick={() => setSelectedClone1(mind.id)}
                  />
                ))
              ) : (
                <div className="col-span-2 text-center py-8 text-muted-foreground">
                  Nenhuma mente encontrada
                </div>
              )}
            </div>
            {selectedMind1 && (
              <div className="p-3 bg-primary/10 border border-primary rounded-lg text-sm text-foreground">
                ✓ {selectedMind1.name} selecionado
              </div>
            )}
          </div>

          {/* Mind 2 Selector */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-widest text-center">
              Oponente (Antithesis)
            </h3>
            <Input
              placeholder="Buscar mente..."
              value={search2}
              onChange={(e) => setSearch2(e.target.value)}
              className="bg-input border-border h-10"
              disabled={loading}
            />
            <div className="grid grid-cols-2 gap-4 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
              {loading ? (
                <div className="col-span-2 text-center py-8 text-muted-foreground">
                  Carregando mentes...
                </div>
              ) : filteredMinds2.length > 0 ? (
                filteredMinds2.map((mind) => (
                  <MindCardSelect
                    key={`c2-${mind.id}`}
                    id={mind.id}
                    slug={mind.slug}
                    name={mind.name}
                    shortBio={mind.shortBio}
                    avatar={mind.avatar}
                    apexScore={mind.apexScore}
                    selected={selectedClone2 === mind.id}
                    onClick={() => setSelectedClone2(mind.id)}
                  />
                ))
              ) : (
                <div className="col-span-2 text-center py-8 text-muted-foreground">
                  Nenhuma mente encontrada
                </div>
              )}
            </div>
            {selectedMind2 && (
              <div className="p-3 bg-primary/10 border border-primary rounded-lg text-sm text-foreground">
                ✓ {selectedMind2.name} selecionado
              </div>
            )}
          </div>
        </div>

        <Separator className="bg-border" />

        {/* Settings */}
        <div className="space-y-6 max-w-2xl mx-auto">
          <div className="space-y-2">
            <label className="text-sm font-bold text-foreground">Tópico do Debate</label>
            <Input
              placeholder="Ex: A Inteligência Artificial terá consciência?"
              className="bg-input border-border h-12 text-lg"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
            <div className="flex gap-2 mt-2">
              <Badge
                variant="outline"
                className="cursor-pointer hover:bg-muted"
                onClick={() => setTopic("O futuro do trabalho remoto")}
              >
                Futuro do Trabalho
              </Badge>
              <Badge
                variant="outline"
                className="cursor-pointer hover:bg-muted"
                onClick={() => setTopic("Universal Basic Income")}
              >
                UBI
              </Badge>
              <Badge
                variant="outline"
                className="cursor-pointer hover:bg-muted"
                onClick={() => setTopic("Colonização de Marte")}
              >
                Marte
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-foreground">Framework</label>
              <Select
                value={framework}
                onValueChange={setFramework}
                options={FRAMEWORKS.map((f) => ({ label: f.name, value: f.id }))}
                className="bg-input border-border"
              />
              <p className="text-xs text-muted-foreground">
                {FRAMEWORKS.find((f) => f.id === framework)?.desc}
              </p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-foreground">Visibilidade</label>
              <Select
                defaultValue="public"
                options={[
                  { label: 'Público', value: 'public' },
                  { label: 'Privado', value: 'private' },
                ]}
                className="bg-input border-border"
              />
            </div>
          </div>

          <Button
            size="lg"
            className="w-full h-14 text-lg font-bold bg-foreground text-background hover:bg-foreground/90 mt-8"
            onClick={handleStart}
          >
            <Icon name="play" className="mr-2" /> Iniciar Debate
          </Button>
        </div>
      </div>
    );
};

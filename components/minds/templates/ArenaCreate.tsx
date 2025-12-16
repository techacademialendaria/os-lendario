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
    const [topic, setTopic] = useState("");
    const [framework, setFramework] = useState("oxford");
    const [isRandomizing, setIsRandomizing] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

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

    const handleRandomize = () => {
        if (minds.length < 2) return;

        setIsRandomizing(true);
        // Simulate roulette effect
        let interval = setInterval(() => {
            const r1 = minds[Math.floor(Math.random() * minds.length)].id;
            const r2 = minds[Math.floor(Math.random() * minds.length)].id;
            setSelectedClone1(r1);
            setSelectedClone2(r2);
        }, 100);

        setTimeout(() => {
            clearInterval(interval);
            // Ensure they are different
            const final1 = minds[Math.floor(Math.random() * minds.length)];
            let final2 = minds[Math.floor(Math.random() * minds.length)];
            while (final2.id === final1.id) {
                final2 = minds[Math.floor(Math.random() * minds.length)];
            }
            setSelectedClone1(final1.id);
            setSelectedClone2(final2.id);
            setIsRandomizing(false);
        }, 800);
    };

    // Filter Clones
    const filteredClones = minds.filter(clone =>
        clone.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        clone.role.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Get selected objects for display
    const c1 = minds.find(c => c.id === selectedClone1);
    const c2 = minds.find(c => c.id === selectedClone2);

    return (
        <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500 pb-12">

            {/* Header Actions */}
            <div className="flex items-center justify-between">
                <Button variant="ghost" onClick={onBack} className="text-zinc-400 hover:text-white">
                    <Icon name="arrow-left" className="mr-2" /> Voltar ao Lobby
                </Button>
                <Button variant="outline" size="sm" onClick={handleRandomize} disabled={isRandomizing || minds.length < 2} className="border-brand-gold/30 text-brand-gold hover:bg-brand-gold/10">
                    <Icon name="refresh" className={cn("mr-2", isRandomizing && "animate-spin")} /> Match Aleatório
                </Button>
            </div>

            {/* VS STAGE AREA */}
            <div className="relative grid grid-cols-1 lg:grid-cols-5 gap-4 items-stretch min-h-[400px]">

                {/* Player 1 Selection Area */}
                <div className="lg:col-span-2 flex flex-col gap-4">
                    <div className={cn(
                        "flex-1 rounded-2xl border-2 p-6 flex flex-col items-center justify-center relative overflow-hidden transition-all duration-500 bg-[#0a0a0a]",
                        selectedClone1 ? "border-cyan-500/50 shadow-[0_0_30px_-10px_rgba(34,211,238,0.2)]" : "border-white/5 border-dashed"
                    )}>
                        {c1 ? (
                            <>
                                <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent pointer-events-none"></div>
                                <div className="w-32 h-32 rounded-full border-4 border-cyan-500/20 flex items-center justify-center bg-zinc-900 mb-4 shadow-xl z-10 transition-transform duration-500 hover:scale-110">
                                    <span className={cn("text-4xl font-black", c1.color)}>{c1.avatar}</span>
                                </div>
                                <h2 className="text-3xl font-black text-white uppercase tracking-tight z-10 text-center">{c1.name}</h2>
                                <p className="text-zinc-400 font-serif z-10">{c1.role}</p>
                                <Badge className="mt-4 bg-cyan-500/10 text-cyan-500 border-cyan-500/20">PROPOSIÇÃO</Badge>
                            </>
                        ) : (
                            <div className="text-center text-zinc-600">
                                <Icon name="user" className="text-6xl mb-4 opacity-20" />
                                <p className="font-mono text-sm uppercase tracking-widest">Selecione o Player 1</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* VS Badge & Settings (Center) */}
                <div className="lg:col-span-1 flex flex-col items-center justify-center relative py-4 lg:py-0">
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-px h-full bg-gradient-to-b from-transparent via-white/10 to-transparent hidden lg:block"></div>
                    </div>

                    <div className="relative z-10 bg-[#050505] p-4 rounded-full border-4 border-zinc-800 shadow-2xl">
                        <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-white to-red-500 italic pr-1">VS</span>
                    </div>
                </div>

                {/* Player 2 Selection Area */}
                <div className="lg:col-span-2 flex flex-col gap-4">
                    <div className={cn(
                        "flex-1 rounded-2xl border-2 p-6 flex flex-col items-center justify-center relative overflow-hidden transition-all duration-500 bg-[#0a0a0a]",
                        selectedClone2 ? "border-red-500/50 shadow-[0_0_30px_-10px_rgba(239,68,68,0.2)]" : "border-white/5 border-dashed"
                    )}>
                        {c2 ? (
                            <>
                                <div className="absolute inset-0 bg-gradient-to-b from-red-500/5 to-transparent pointer-events-none"></div>
                                <div className="w-32 h-32 rounded-full border-4 border-red-500/20 flex items-center justify-center bg-zinc-900 mb-4 shadow-xl z-10 transition-transform duration-500 hover:scale-110">
                                    <span className={cn("text-4xl font-black", c2.color)}>{c2.avatar}</span>
                                </div>
                                <h2 className="text-3xl font-black text-white uppercase tracking-tight z-10 text-center">{c2.name}</h2>
                                <p className="text-zinc-400 font-serif z-10">{c2.role}</p>
                                <Badge className="mt-4 bg-red-500/10 text-red-500 border-red-500/20">OPOSIÇÃO</Badge>
                            </>
                        ) : (
                            <div className="text-center text-zinc-600">
                                <Icon name="user" className="text-6xl mb-4 opacity-20" />
                                <p className="font-mono text-sm uppercase tracking-widest">Selecione o Player 2</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Search Bar */}
            <div className="flex justify-center -mb-4 relative z-10">
                <div className="relative w-full max-w-md">
                    <Icon name="search" className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size="size-4" />
                    <Input
                        placeholder="Buscar mente lendária..."
                        className="pl-10 bg-[#0a0a0a] border-white/10 text-white rounded-full h-10 focus:border-brand-gold/50 transition-colors"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            {/* Selection Lists & Config */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">

                {/* List 1 */}
                <Card className="bg-[#0a0a0a] border-white/10 h-[300px] flex flex-col">
                    <div className="p-3 border-b border-white/5 bg-zinc-900/50">
                        <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Mentes Disponíveis</span>
                    </div>
                    <ScrollArea className="flex-1 p-2">
                        <div className="grid grid-cols-1 gap-2">
                            {filteredClones.length > 0 ? (
                                filteredClones.map(clone => (
                                    <CloneCardSelect
                                        key={`c1-list-${clone.id}`}
                                        clone={clone}
                                        selected={selectedClone1 === clone.id}
                                        onClick={() => setSelectedClone1(clone.id)}
                                        compact
                                    />
                                ))
                            ) : (
                                <div className="text-center py-8 text-zinc-600 text-xs">
                                    Nenhuma mente encontrada.
                                </div>
                            )}
                        </div>
                    </ScrollArea>
                </Card>

                {/* Config Center */}
                <div className="flex flex-col justify-end space-y-4">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Tópico da Batalha</label>
                        <Input
                            placeholder="Ex: A IA vai substituir criativos?"
                            className="bg-[#0a0a0a] border-white/10 h-12 text-center font-serif text-lg focus:border-brand-gold text-white"
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Regras (Framework)</label>
                        <Select
                            value={framework}
                            onValueChange={setFramework}
                            options={frameworks.map(f => ({ label: f.name, value: f.id }))}
                            className="bg-[#0a0a0a] border-white/10 h-10 text-center text-white"
                        />
                    </div>
                    <Button
                        size="lg"
                        className={cn(
                            "w-full h-14 text-lg font-black uppercase tracking-wider shadow-lg transition-all duration-300",
                            (selectedClone1 && selectedClone2 && topic)
                                ? "bg-brand-gold text-black hover:scale-105 hover:shadow-brand-gold/20"
                                : "bg-zinc-800 text-zinc-500 cursor-not-allowed"
                        )}
                        onClick={handleStart}
                    >
                        <Icon name="swords" className="mr-2" /> Iniciar Combate
                    </Button>
                </div>

                {/* List 2 */}
                <Card className="bg-[#0a0a0a] border-white/10 h-[300px] flex flex-col">
                    <div className="p-3 border-b border-white/5 bg-zinc-900/50 text-right">
                        <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Mentes Disponíveis</span>
                    </div>
                    <ScrollArea className="flex-1 p-2">
                        <div className="grid grid-cols-1 gap-2">
                            {filteredClones.length > 0 ? (
                                filteredClones.map(clone => (
                                    <CloneCardSelect
                                        key={`c2-list-${clone.id}`}
                                        clone={clone}
                                        selected={selectedClone2 === clone.id}
                                        onClick={() => setSelectedClone2(clone.id)}
                                        compact
                                    />
                                ))
                            ) : (
                                <div className="text-center py-8 text-zinc-600 text-xs">
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

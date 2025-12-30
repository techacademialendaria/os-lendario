import React, { useState } from 'react';
import MindsTopbar from '../MindsTopbar';
import MindCard from '../ui/MindCard';
import { MindCardSkeleton } from '../ui/MindSkeletons';
import { Section } from '../../../types';
import { Button } from '../../ui/button';
import { Icon } from '../../ui/icon';
import { Input } from '../../ui/input';
import { Select } from '../../ui/select';
import { Tabs, TabsList, TabsTrigger } from '../../ui/tabs';
import { useMinds } from '../../../hooks/useMinds';
import { usePageTitle } from '../../../hooks/usePageTitle';

interface MindsGalleryProps {
  setSection: (s: Section) => void;
  onSelectMind?: (slug: string) => void;
}

const MindsGalleryTemplate: React.FC<MindsGalleryProps> = ({ setSection, onSelectMind }) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [statusFilter, setStatusFilter] = useState<'all' | 'production' | 'progress'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const { minds, loading, error, totalMinds } = useMinds();

  // Page title
  usePageTitle('Galeria de Mentes');

  // Filter minds by status and search, then sort: with avatar first, then alphabetically
  const filteredMinds = minds
    .filter((mind) => {
      const matchesStatus = statusFilter === 'all' || mind.status === statusFilter;
      const matchesSearch =
        !searchQuery ||
        mind.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mind.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mind.expertise.some((e) => e.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesStatus && matchesSearch;
    })
    .sort((a, b) => {
      // Prioritize minds with real avatar photos first
      if (a.hasRealAvatar && !b.hasRealAvatar) return -1;
      if (!a.hasRealAvatar && b.hasRealAvatar) return 1;

      // Then sort alphabetically by name
      return a.name.localeCompare(b.name, 'pt-BR');
    });

  const handleMindClick = (slug: string) => {
    if (onSelectMind) {
      onSelectMind(slug);
    } else {
      setSection(Section.APP_MINDS_PROFILE);
    }
  };

  const renderListView = () => (
    <div className="bg-studio-card w-full overflow-hidden rounded-xl border border-studio-border">
      {/* Table Header */}
      <div className="grid grid-cols-12 gap-4 border-b border-studio-border bg-studio-primary/5 px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
        <div className="col-span-3">Mente Sintética</div>
        <div className="col-span-2">Habilidade Assinatura</div>
        <div className="col-span-3">Resumo</div>
        <div className="col-span-2">Expertise</div>
        <div className="col-span-1">Status</div>
        <div className="col-span-1 text-right">Ações</div>
      </div>

      {/* Table Body */}
      <div className="divide-y divide-studio-border">
        {filteredMinds.map((mind) => (
          <div
            key={mind.id}
            className="group grid cursor-pointer grid-cols-12 items-center gap-4 px-6 py-4 transition-colors hover:bg-white/[0.01]"
            onClick={() => handleMindClick(mind.slug)}
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
                {/* <Icon name="lightning" size="size-3" className="text-studio-primary" /> */}
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
                      +{mind.expertise.length - 1} áreas
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
                className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-medium ${mind.status === 'production'
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

  return (
    <div className="flex min-h-screen flex-col bg-background pb-20 font-sans">
      <MindsTopbar currentSection={Section.APP_MINDS_GALLERY} setSection={setSection} />

      <main className="mx-auto w-full max-w-[1400px] flex-1 space-y-8 p-6">
        {/* --- FILTERS BAR --- */}
        <div className="bg-studio-card flex flex-col items-start justify-between gap-4 rounded-xl border border-studio-border p-2 shadow-sm xl:flex-row xl:items-center">
          {/* Search */}
          <div className="relative w-full xl:w-96">
            <Icon
              name="search"
              className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
              size="size-4"
            />
            <Input
              placeholder="Buscar por nome, tag ou categoria..."
              className="h-10 rounded-lg border-transparent bg-transparent pl-10 text-sm transition-all hover:bg-studio-primary/5 focus:border-studio-primary/20 focus:bg-studio-primary/5"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Filters Group */}
          <div className="flex w-full flex-wrap items-center gap-2 p-1 xl:w-auto">
            <Select
              placeholder="Categorias"
              options={[
                { label: 'Todas Categorias', value: 'all' },
                { label: 'Tecnologia', value: 'technology_innovation' },
                { label: 'Negócios', value: 'business_strategy' },
                { label: 'Filosofia', value: 'philosophy' },
              ]}
              className="h-9 w-[160px] border-studio-border bg-transparent text-xs hover:border-studio-primary/20"
            />

            <Tabs
              value={statusFilter}
              onValueChange={(v) => setStatusFilter(v as 'all' | 'production' | 'progress')}
              className="w-auto"
            >
              <TabsList className="h-9 rounded-lg border border-studio-border bg-studio-card p-1">
                <TabsTrigger
                  value="all"
                  className="h-7 rounded-sm text-[10px] text-zinc-500 data-[state=active]:bg-studio-primary/10 data-[state=active]:text-white"
                >
                  Todas
                </TabsTrigger>
                <TabsTrigger
                  value="production"
                  className="h-7 rounded-sm text-[10px] text-zinc-500 data-[state=active]:bg-emerald-500/10 data-[state=active]:text-emerald-400"
                >
                  Produção
                </TabsTrigger>
                <TabsTrigger
                  value="progress"
                  className="h-7 rounded-sm text-[10px] text-zinc-500 data-[state=active]:bg-yellow-500/10 data-[state=active]:text-yellow-400"
                >
                  Em Progresso
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="mx-2 hidden h-6 w-px bg-studio-border md:block"></div>

            <div className="flex gap-1 rounded-lg border border-studio-border bg-studio-card p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`rounded p-1.5 transition-all ${viewMode === 'grid' ? 'bg-studio-primary/10 text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-300'}`}
              >
                <Icon name="grid" size="size-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`rounded p-1.5 transition-all ${viewMode === 'list' ? 'bg-studio-primary/10 text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-300'}`}
              >
                <Icon name="list" size="size-4" />
              </button>
            </div>
          </div>
        </div>

        {/* --- CONTENT --- */}
        <div>
          <div className="mb-6 flex items-end justify-between">
            <div className="flex items-baseline gap-2">
              <h2 className="text-xl font-bold tracking-tight text-white">Mentes</h2>
              <span className="translate-y-[-2px] font-mono text-xs text-zinc-500">
                ({filteredMinds.length})
              </span>
            </div>
            <Button className="h-10 rounded-full border-0 bg-studio-primary px-6 text-xs font-bold tracking-wide text-white hover:bg-studio-primary/90">
              <Icon name="plus" size="size-4" className="mr-2" /> NOVA MENTE
            </Button>
          </div>

          {/* Loading / Error / Empty States */}
          {loading && (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <MindCardSkeleton key={i} />
              ))}
            </div>
          )}

          {error && !loading && (
            <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-8 text-center">
              <p className="text-sm text-red-400">Erro ao carregar dados</p>
            </div>
          )}

          {!loading && !error && filteredMinds.length === 0 && (
            <div className="rounded-xl border border-dashed border-studio-border py-20 text-center">
              <p className="text-sm text-zinc-500">Nenhuma mente encontrada.</p>
            </div>
          )}

          {/* Content Rendering */}
          {!loading && !error && filteredMinds.length > 0 && (
            <>
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {filteredMinds.map((mind) => (
                    <MindCard
                      key={mind.id}
                      mind={mind}
                      onClick={() => handleMindClick(mind.slug)}
                    />
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
              ) : (
                renderListView()
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default MindsGalleryTemplate;

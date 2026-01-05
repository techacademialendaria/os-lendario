import React from 'react';
import MindsTopbar from '../../MindsTopbar';
import { MindCardSkeleton } from '../../ui/MindSkeletons';
import { Section } from '../../../../types';
import { Button } from '../../../ui/button';
import { Icon } from '../../../ui/icon';
import { useMinds } from '../../../../hooks/useMinds';
import { usePageTitle } from '../../../../hooks/usePageTitle';
import { useGalleryFilters } from './hooks';
import { GalleryFiltersBar, MindsGridView, MindsListView } from './organisms';
import type { MindsGalleryProps } from './types';

const MindsGalleryTemplate: React.FC<MindsGalleryProps> = ({ setSection, onSelectMind }) => {
  const { minds, loading, error } = useMinds();
  const filters = useGalleryFilters(minds);

  // Page title
  usePageTitle('Galeria de Mentes');

  const handleMindClick = (slug: string) => {
    if (onSelectMind) {
      onSelectMind(slug);
    } else {
      setSection(Section.APP_MINDS_PROFILE);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background pb-20 font-sans">
      <MindsTopbar currentSection={Section.APP_MINDS_GALLERY} setSection={setSection} />

      <main className="mx-auto w-full max-w-[1400px] flex-1 space-y-8 p-6">
        {/* Filters Bar */}
        <GalleryFiltersBar
          searchQuery={filters.searchQuery}
          onSearchChange={filters.setSearchQuery}
          statusFilter={filters.statusFilter}
          onStatusFilterChange={filters.setStatusFilter}
          viewMode={filters.viewMode}
          onViewModeChange={filters.setViewMode}
        />

        {/* Content */}
        <div>
          <div className="mb-6 flex items-end justify-between">
            <div className="flex items-baseline gap-2">
              <h2 className="text-xl font-bold tracking-tight text-white">Mentes</h2>
              <span className="translate-y-[-2px] font-mono text-xs text-zinc-500">
                ({filters.filteredMinds.length})
              </span>
            </div>
            <Button className="h-10 rounded-full border-0 bg-studio-primary px-6 text-xs font-bold tracking-wide text-white hover:bg-studio-primary/90">
              <Icon name="plus" size="size-4" className="mr-2" /> NOVA MENTE
            </Button>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <MindCardSkeleton key={i} />
              ))}
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-8 text-center">
              <p className="text-sm text-red-400">Erro ao carregar dados</p>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && filters.filteredMinds.length === 0 && (
            <div className="rounded-xl border border-dashed border-studio-border py-20 text-center">
              <p className="text-sm text-zinc-500">Nenhuma mente encontrada.</p>
            </div>
          )}

          {/* Content Rendering */}
          {!loading && !error && filters.filteredMinds.length > 0 && (
            <>
              {filters.viewMode === 'grid' ? (
                <MindsGridView minds={filters.filteredMinds} onMindClick={handleMindClick} />
              ) : (
                <MindsListView minds={filters.filteredMinds} onMindClick={handleMindClick} />
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default MindsGalleryTemplate;

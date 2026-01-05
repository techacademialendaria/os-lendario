import React from 'react';
import { Icon } from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { IconoirLibraryViewProps } from '../types';

/**
 * Iconoir library section with search and categorized icons
 */
export const IconoirLibraryView: React.FC<IconoirLibraryViewProps> = ({
  searchTerm,
  setSearchTerm,
  filteredCategories,
  hasResults,
  clearSearch,
}) => {
  return (
    <section className="space-y-8">
      {/* Header with Search */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div className="flex items-center gap-4">
          <h3 className="flex items-center gap-2 font-sans text-2xl font-semibold">
            <Icon name="cube" /> Biblioteca UI (Iconoir)
          </h3>
          <Badge variant="secondary">SVG Based</Badge>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-64">
          <Icon
            name="search"
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground opacity-50"
            size="size-4"
          />
          <Input
            placeholder="Pesquisar icone..."
            className="h-10 pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Icon Grid or Empty State */}
      {hasResults ? (
        <div className="grid animate-fade-in gap-8">
          {Object.entries(filteredCategories).map(([category, icons]) => (
            <div key={category} className="space-y-3">
              <h4 className="pl-1 text-sm font-bold uppercase tracking-widest text-muted-foreground">
                {category}
              </h4>
              <div className="grid grid-cols-4 gap-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12">
                {icons.map((name) => (
                  <div
                    key={name}
                    className="group flex cursor-pointer flex-col items-center gap-2"
                    title={name}
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-border bg-card transition-all duration-200 group-hover:border-primary group-hover:bg-primary/5">
                      <Icon
                        name={name}
                        size="size-5"
                        className="text-muted-foreground transition-colors group-hover:text-primary"
                      />
                    </div>
                    <span className="w-full truncate text-center font-mono text-[10px] text-muted-foreground opacity-60 group-hover:opacity-100">
                      {name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-border py-12 text-center">
          <Icon
            name="search"
            className="mx-auto mb-4 text-6xl text-muted-foreground opacity-20"
          />
          <p className="font-serif text-muted-foreground">
            Nenhum icone encontrado para "{searchTerm}"
          </p>
          <Button variant="link" onClick={clearSearch} className="mt-2">
            Limpar busca
          </Button>
        </div>
      )}
    </section>
  );
};

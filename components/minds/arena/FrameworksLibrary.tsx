import React, { useState, useEffect } from 'react';
import { DebateFramework, frameworkService } from '../../../services/frameworkService';
import { FrameworkCard } from './FrameworkCard';
import { FrameworkDetailModal } from './FrameworkDetailModal';
import { Icon } from '../../ui/icon';

interface FrameworksLibraryProps {
  onSelectFramework?: (framework: DebateFramework) => void;
  showHeader?: boolean;
}

export const FrameworksLibrary: React.FC<FrameworksLibraryProps> = ({
  onSelectFramework,
  showHeader = true,
}) => {
  const [frameworks, setFrameworks] = useState<DebateFramework[]>([]);
  const [filteredFrameworks, setFilteredFrameworks] = useState<DebateFramework[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedFramework, setSelectedFramework] = useState<DebateFramework | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [complexityFilter, setComplexityFilter] = useState<string>('all');
  const [participantsFilter, setParticipantsFilter] = useState<string>('all');

  // Load frameworks
  useEffect(() => {
    loadFrameworks();
  }, []);

  // Apply filters
  useEffect(() => {
    let filtered = frameworks;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (fw) =>
          fw.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          fw.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          fw.framework_schema.best_for?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Complexity filter
    if (complexityFilter !== 'all') {
      filtered = filtered.filter((fw) => fw.framework_schema.complexity === complexityFilter);
    }

    // Participants filter
    if (participantsFilter !== 'all') {
      filtered = filtered.filter((fw) => {
        const p = fw.framework_schema.participants;
        if (!p) return participantsFilter === '2';
        if (participantsFilter === '2') return p.min === 2 && p.max === 2;
        if (participantsFilter === '3+') return p.max >= 3;
        return true;
      });
    }

    setFilteredFrameworks(filtered);
  }, [frameworks, searchQuery, complexityFilter, participantsFilter]);

  const loadFrameworks = async () => {
    try {
      setLoading(true);
      const data = await frameworkService.getDebateFrameworks();
      setFrameworks(data);
      setFilteredFrameworks(data);
    } catch (err) {
      console.error('Failed to load frameworks:', err);
      setError('Erro ao carregar frameworks de debate');
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (framework: DebateFramework) => {
    setSelectedFramework(framework);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedFramework(null);
  };

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Icon name="refresh" className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="text-center">
          <p className="mb-4 text-destructive">{error}</p>
          <button
            onClick={loadFrameworks}
            className="rounded-lg bg-primary px-4 py-2 text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in space-y-6">
      {/* Header */}
      {showHeader && (
        <div className="space-y-3 text-center">
          <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
            <Icon name="library" className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">Biblioteca de Frameworks</h1>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Explore {frameworks.length} frameworks de debate diferentes. Cada framework oferece uma
            estrutura única para conduzir debates produtivos e instigantes.
          </p>
        </div>
      )}

      {/* Filters */}
      <div className="space-y-4 rounded-xl border border-border bg-card p-6">
        {/* Search */}
        <div className="relative">
          <Icon name="search" className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar frameworks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-border bg-accent py-3 pl-10 pr-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-4">
          {/* Complexity Filter */}
          <div className="flex items-center gap-2">
            <Icon name="filter" className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">Complexidade:</span>
            <div className="flex gap-2">
              {['all', 'Baixa', 'Média', 'Alta', 'Muito Alta'].map((level) => (
                <button
                  key={level}
                  onClick={() => setComplexityFilter(level)}
                  className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${complexityFilter === level
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-border bg-card text-muted-foreground hover:border-primary/50'
                    }`}
                >
                  {level === 'all' ? 'Todas' : level}
                </button>
              ))}
            </div>
          </div>

          {/* Participants Filter */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-foreground">Participantes:</span>
            <div className="flex gap-2">
              {['all', '2', '3+'].map((count) => (
                <button
                  key={count}
                  onClick={() => setParticipantsFilter(count)}
                  className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${participantsFilter === count
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-border bg-card text-muted-foreground hover:border-primary/50'
                    }`}
                >
                  {count === 'all' ? 'Todos' : count}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Count */}
        <p className="text-sm text-muted-foreground">
          Mostrando {filteredFrameworks.length} de {frameworks.length} frameworks
        </p>
      </div>

      {/* Grid */}
      {filteredFrameworks.length === 0 ? (
        <div className="py-12 text-center">
          <p className="text-muted-foreground">
            Nenhum framework encontrado com os filtros selecionados.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredFrameworks.map((framework) => (
            <FrameworkCard
              key={framework.id}
              framework={framework}
              onSelect={onSelectFramework}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>
      )}

      {/* Detail Modal */}
      <FrameworkDetailModal
        framework={selectedFramework}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSelectFramework={onSelectFramework}
      />
    </div>
  );
};

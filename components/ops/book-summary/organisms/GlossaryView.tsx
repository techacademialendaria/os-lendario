import React, { useMemo } from 'react';
import { Badge } from '../../../ui/badge';
import { Icon } from '../../../ui/icon';
import { OPS_ACCENT } from '../../ops-tokens';
import {
  OpsCard,
  OpsCardHeader,
  OpsCardContent,
  OpsCode,
} from '../../ops-ui';
import { SearchInput } from '../../../shared/molecules';
import { BOOK_SUMMARY_GLOSSARY } from '../../data/book-summary-content';
import type { GlossaryViewProps } from '../types';

export const GlossaryView: React.FC<GlossaryViewProps> = ({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
}) => {
  const filteredCategories = useMemo(() => {
    return BOOK_SUMMARY_GLOSSARY.categories
      .map((cat) => ({
        ...cat,
        terms: cat.terms.filter(
          (t) =>
            searchTerm === '' ||
            t.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
            t.definition.toLowerCase().includes(searchTerm.toLowerCase())
        ),
      }))
      .filter((cat) => selectedCategory === 'all' || cat.id === selectedCategory);
  }, [searchTerm, selectedCategory]);

  return (
    <>
      <GlossarySearchCard
        searchTerm={searchTerm}
        onSearchChange={onSearchChange}
        selectedCategory={selectedCategory}
        onCategoryChange={onCategoryChange}
        filteredCategories={filteredCategories}
      />
      <PipelinePhasesReferenceCard />
    </>
  );
};

// ============================================================================
// Search & Filter Card
// ============================================================================

interface GlossarySearchCardProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  filteredCategories: typeof BOOK_SUMMARY_GLOSSARY.categories;
}

const GlossarySearchCard: React.FC<GlossarySearchCardProps> = ({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  filteredCategories,
}) => (
  <OpsCard>
    <OpsCardHeader title={BOOK_SUMMARY_GLOSSARY.title} />
    <OpsCardContent>
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <SearchInput
          value={searchTerm}
          onChange={onSearchChange}
          placeholder="Buscar termo..."
          className="flex-1"
        />

        <CategoryFilters
          selectedCategory={selectedCategory}
          onCategoryChange={onCategoryChange}
        />
      </div>

      <TermsTable categories={filteredCategories} />
    </OpsCardContent>
  </OpsCard>
);

interface CategoryFiltersProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryFilters: React.FC<CategoryFiltersProps> = ({ selectedCategory, onCategoryChange }) => (
  <div className="flex flex-wrap gap-2">
    <CategoryButton
      id="all"
      label="Todos"
      isSelected={selectedCategory === 'all'}
      onClick={() => onCategoryChange('all')}
      color={OPS_ACCENT}
    />
    {BOOK_SUMMARY_GLOSSARY.categories.map((cat) => (
      <CategoryButton
        key={cat.id}
        id={cat.id}
        label={cat.name}
        isSelected={selectedCategory === cat.id}
        onClick={() => onCategoryChange(cat.id)}
        color={cat.color}
      />
    ))}
  </div>
);

interface CategoryButtonProps {
  id: string;
  label: string;
  isSelected: boolean;
  onClick: () => void;
  color: string;
}

const CategoryButton: React.FC<CategoryButtonProps> = ({ label, isSelected, onClick, color }) => (
  <button
    onClick={onClick}
    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
      isSelected ? 'text-white' : 'bg-muted/30 text-muted-foreground hover:bg-muted/50'
    }`}
    style={isSelected ? { backgroundColor: color } : {}}
  >
    {label}
  </button>
);

interface TermsTableProps {
  categories: typeof BOOK_SUMMARY_GLOSSARY.categories;
}

const TermsTable: React.FC<TermsTableProps> = ({ categories }) => (
  <div className="space-y-6">
    {categories.map(
      (cat) =>
        cat.terms.length > 0 && (
          <div key={cat.id}>
            <h4
              className="text-xs font-bold uppercase tracking-widest mb-3 pb-2 border-b border-border/20"
              style={{ color: cat.color }}
            >
              {cat.name}
            </h4>
            <div className="overflow-x-auto rounded-lg border border-border/20">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/20 bg-muted/20">
                    <th className="text-left py-2 px-4 text-xs font-bold uppercase w-1/4" style={{ color: cat.color }}>
                      Termo
                    </th>
                    <th className="text-left py-2 px-4 text-xs font-bold uppercase" style={{ color: cat.color }}>
                      Definicao
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {cat.terms.map((item, i) => (
                    <tr key={i} className="border-b border-border/10 hover:bg-muted/10 transition-colors">
                      <td className="py-2 px-4">
                        <OpsCode className="text-xs" style={{ color: cat.color }}>
                          {item.term}
                        </OpsCode>
                      </td>
                      <td className="py-2 px-4 text-xs text-muted-foreground">{item.definition}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )
    )}
  </div>
);

// ============================================================================
// Pipeline Phases Reference Card
// ============================================================================

const PipelinePhasesReferenceCard: React.FC = () => (
  <OpsCard>
    <OpsCardHeader title="Referencia Rapida: Fases do Pipeline" accentColor="text-muted-foreground" />
    <OpsCardContent>
      <div className="overflow-x-auto rounded-lg border border-border/20">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border/20 bg-muted/20">
              <th className="text-left py-2 px-4 text-xs font-bold uppercase" style={{ color: OPS_ACCENT }}>
                Fase
              </th>
              <th className="text-left py-2 px-4 text-xs font-bold uppercase" style={{ color: OPS_ACCENT }}>
                Nome
              </th>
              <th className="text-left py-2 px-4 text-xs font-bold uppercase" style={{ color: OPS_ACCENT }}>
                Descricao
              </th>
            </tr>
          </thead>
          <tbody>
            {BOOK_SUMMARY_GLOSSARY.phases.map((phase, i) => (
              <tr key={i} className="border-b border-border/10 hover:bg-muted/10 transition-colors">
                <td className="py-2 px-4">
                  <Badge variant="outline" className="text-[10px]" style={{ borderColor: OPS_ACCENT, color: OPS_ACCENT }}>
                    {phase.phase}
                  </Badge>
                </td>
                <td className="py-2 px-4">
                  <OpsCode className="text-xs" style={{ color: OPS_ACCENT }}>
                    {phase.name}
                  </OpsCode>
                </td>
                <td className="py-2 px-4 text-xs text-muted-foreground">{phase.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </OpsCardContent>
  </OpsCard>
);

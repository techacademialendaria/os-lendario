import { useState, useMemo, useEffect } from 'react';
import type { SortOrder } from '../types';

interface UseTableStateProps {
  data: Record<string, unknown>[];
  searchField: string;
  itemsPerPage: number;
}

export function useTableState({ data, searchField, itemsPerPage }: UseTableStateProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({});
  const [currentPage, setCurrentPage] = useState(1);

  // Search and filter
  const filteredData = useMemo(() => {
    return data.filter(row => {
      // Search
      if (searchTerm && searchField) {
        const searchValue = row[searchField]?.toString().toLowerCase() || '';
        if (!searchValue.includes(searchTerm.toLowerCase())) return false;
      }

      // Filters
      for (const [filterKey, filterValue] of Object.entries(activeFilters)) {
        if (!filterValue) continue;

        // Special handling for array filters
        if (filterKey === 'domain_filter') {
          const domains = row['domains'];
          if (!Array.isArray(domains) || !domains.includes(filterValue)) return false;
        } else if (filterKey === 'assessment_filter') {
          const systems = row['assessment_systems'];
          if (!Array.isArray(systems) || !systems.includes(filterValue)) return false;
        } else {
          // Regular field comparison
          if (row[filterKey] !== filterValue) return false;
        }
      }

      return true;
    });
  }, [data, searchTerm, searchField, activeFilters]);

  // Sort
  const sortedData = useMemo(() => {
    if (!sortBy) return filteredData;

    const sorted = [...filteredData].sort((a, b) => {
      const aVal = a[sortBy];
      const bVal = b[sortBy];

      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortOrder === 'asc' ? aVal - bVal : bVal - aVal;
      }

      const aStr = String(aVal).toLowerCase();
      const bStr = String(bVal).toLowerCase();
      return sortOrder === 'asc' ? aStr.localeCompare(bStr) : bStr.localeCompare(aStr);
    });

    return sorted;
  }, [filteredData, sortBy, sortOrder]);

  // Pagination
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = sortedData.slice(startIndex, endIndex);

  // Reset to page 1 when filtering/sorting changes
  useEffect(() => {
    setCurrentPage(1);
  }, [sortBy, sortOrder, searchTerm, activeFilters]);

  const handleSort = (columnKey: string) => {
    if (sortBy === columnKey) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(columnKey);
      setSortOrder('asc');
    }
  };

  const handleFilterChange = (filterKey: string, value: string) => {
    setActiveFilters(prev => ({
      ...prev,
      [filterKey]: value
    }));
  };

  return {
    // State
    searchTerm,
    setSearchTerm,
    sortBy,
    sortOrder,
    activeFilters,
    currentPage,
    setCurrentPage,
    // Data
    filteredData,
    sortedData,
    paginatedData,
    // Pagination
    totalPages,
    startIndex,
    endIndex,
    // Actions
    handleSort,
    handleFilterChange
  };
}

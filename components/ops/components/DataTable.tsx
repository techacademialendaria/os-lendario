import React, { useState, useMemo } from 'react';
import { Icon } from '../../ui/icon';
import { Badge } from '../../ui/badge';
import { Input } from '../../ui/input';
import { cn } from '../../../lib/utils';

interface Column {
  key: string;
  header: string;
  width?: string;
  type?: 'text' | 'badge' | 'tags' | 'numeric' | 'progress' | 'custom';
  sortable?: boolean;
}

interface TableProps {
  columns: Column[];
  data: Record<string, unknown>[];
  searchPlaceholder?: string;
  searchField?: string;
  stats?: { label: string; value: string | number; icon?: string; color?: string }[];
  filters?: { label: string; key: string; options: { label: string; value: string }[] }[];
  onRowClick?: (row: Record<string, unknown>) => void;
  itemsPerPage?: number;
}

/**
 * DataTable - Reusable table component with pagination, search, filters, and sorting
 * 
 * @example
 * <DataTable
 *   columns={columns}
 *   data={data}
 *   stats={stats}
 *   filters={filters}
 *   searchField="name"
 * />
 */
const DataTable = React.forwardRef<HTMLDivElement, TableProps>(
  ({
    columns,
    data,
    searchPlaceholder = 'Search...',
    searchField = 'name',
    stats,
    filters,
    onRowClick,
    itemsPerPage = 10
  }, ref) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
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
  React.useEffect(() => {
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

  const renderCellContent = (value: any, column: Column) => {
    switch (column.type) {
      case 'badge':
        return (
          <Badge variant="secondary" className="text-[10px]">
            {value}
          </Badge>
        );
      case 'tags':
        return Array.isArray(value) ? (
          <div className="flex flex-wrap gap-1">
            {value.slice(0, 2).map((tag: any, idx: number) => (
              <Badge key={idx} variant="outline" className="text-[9px]">
                {tag}
              </Badge>
            ))}
            {value.length > 2 && (
              <Badge variant="outline" className="text-[9px]">
                +{value.length - 2}
              </Badge>
            )}
          </div>
        ) : null;
      case 'progress': {
        const val = Math.max(-1, Math.min(1, Number(value) || 0));
        const isPositive = val > 0;
        const absVal = Math.abs(val);
        return (
          <div className="flex items-center gap-2">
            <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
              <div
                className={cn(
                  'h-full',
                  isPositive ? 'bg-green-500' : val < 0 ? 'bg-red-500' : 'bg-gray-500'
                )}
                style={{ width: `${absVal * 100}%` }}
              />
            </div>
            <span className="text-[10px] font-mono w-10">{val.toFixed(2)}</span>
          </div>
        );
      }
      default:
        return value;
    }
  };

  return (
    <div ref={ref} className="space-y-6">
      {/* Stats Cards */}
      {stats && stats.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="p-4 rounded-lg border border-border/30 bg-muted/20 hover:bg-muted/40 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-bold text-foreground mt-2">{stat.value}</p>
                </div>
                {stat.icon && (
                  <div
                    className="p-2.5 rounded-lg"
                    style={{
                      backgroundColor: `${stat.color || '#3b82f6'}20`,
                      color: stat.color || '#3b82f6'
                    }}
                  >
                    <Icon name={stat.icon as any} size="size-5" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Search and Filters */}
      <div className="flex flex-col gap-3 p-4 rounded-lg bg-muted/10 border border-border/20 md:flex-row md:items-center md:gap-4">
        <div className="flex-1 relative">
          <Icon
            name="search"
            size="size-4"
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground opacity-50"
          />
          <Input
            placeholder={searchPlaceholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 bg-background/50 border-border/30"
            aria-label={`Search ${searchPlaceholder.toLowerCase()}`}
          />
        </div>

        {filters && filters.length > 0 && (
          <div className="flex flex-col gap-2 w-full md:w-auto md:flex-row md:items-center md:gap-2">
            {filters.map((filter, idx) => (
              <select
                key={idx}
                value={activeFilters[filter.key] || ''}
                onChange={(e) =>
                  setActiveFilters(prev => ({
                    ...prev,
                    [filter.key]: e.target.value
                  }))
                }
                className="px-3 py-2 rounded-lg bg-background/50 border border-border/30 text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                aria-label={`Filter by ${filter.label}`}
              >
                <option value="">{filter.label}</option>
                {filter.options.map((opt, idx) => (
                  <option key={idx} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            ))}
          </div>
        )}
      </div>

      {/* Table */}
      <div className="rounded-lg border border-border/30 bg-background/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            {/* Header */}
            <thead>
              <tr className="border-b border-border/20 bg-muted/30">
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className={cn(
                      'px-4 py-3 text-left font-semibold text-xs text-muted-foreground uppercase tracking-wider',
                      col.sortable && 'cursor-pointer hover:text-foreground transition-colors',
                      col.width && `w-[${col.width}]`
                    )}
                    onClick={() => col.sortable && handleSort(col.key)}
                  >
                    <div className="flex items-center gap-2">
                      {col.header}
                      {col.sortable && (
                        <Icon
                          name={
                            sortBy === col.key
                              ? sortOrder === 'asc'
                                ? 'arrow-up'
                                : 'arrow-down'
                              : 'arrow-up-down'
                          }
                          size="size-3"
                          className={cn(
                            'opacity-30',
                            sortBy === col.key && 'opacity-100'
                          )}
                        />
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            {/* Body */}
            <tbody>
              {paginatedData.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="px-4 py-8 text-center text-muted-foreground"
                  >
                    <Icon name="inbox" size="size-8" className="mx-auto mb-2 opacity-30" />
                    <p>No data found</p>
                  </td>
                </tr>
              ) : (
                paginatedData.map((row, rowIdx) => (
                  <tr
                    key={rowIdx}
                    className={cn(
                      'border-b border-border/20 hover:bg-muted/20 transition-colors',
                      onRowClick && 'cursor-pointer'
                    )}
                    onClick={() => onRowClick?.(row)}
                  >
                    {columns.map((col) => (
                      <td
                        key={col.key}
                        className="px-4 py-3 text-foreground"
                        style={{ width: col.width }}
                      >
                        {renderCellContent(row[col.key], col)}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination Controls */}
      {sortedData.length > itemsPerPage && (
        <div className="flex items-center justify-between px-4 py-4 border-t border-border/20">
          <div className="text-xs text-muted-foreground">
            Showing {startIndex + 1} to {Math.min(endIndex, sortedData.length)} of {sortedData.length} records
          </div>

          <div className="flex items-center gap-2">
            {/* Previous Button */}
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-border/30 hover:bg-muted/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label={`Go to previous page (page ${Math.max(1, currentPage - 1)})`}
              title="Previous page"
            >
              <Icon name="chevron-left" size="size-4" />
            </button>

            {/* Page Numbers */}
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                const isCurrentPage = page === currentPage;
                const isVisible = 
                  page === 1 || 
                  page === totalPages || 
                  (page >= currentPage - 1 && page <= currentPage + 1);

                if (!isVisible) {
                  if (page === currentPage - 2) {
                    return (
                      <span key="dots-before" className="px-2 text-muted-foreground">
                        ...
                      </span>
                    );
                  }
                  if (page === currentPage + 2) {
                    return (
                      <span key="dots-after" className="px-2 text-muted-foreground">
                        ...
                      </span>
                    );
                  }
                  return null;
                }

                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={cn(
                      'px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                      isCurrentPage
                        ? 'bg-primary text-primary-foreground'
                        : 'border border-border/30 hover:bg-muted/50'
                    )}
                  >
                    {page}
                  </button>
                );
              })}
            </div>

            {/* Next Button */}
            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg border border-border/30 hover:bg-muted/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label={`Go to next page (page ${Math.min(totalPages, currentPage + 1)})`}
              title="Next page"
            >
              <Icon name="chevron-right" size="size-4" />
            </button>
          </div>

          {/* Items Per Page Selector */}
          <div className="text-xs text-muted-foreground">
            Page {currentPage} of {totalPages}
          </div>
        </div>
      )}
    </div>
  );
  }
);

DataTable.displayName = 'DataTable';

export default DataTable;

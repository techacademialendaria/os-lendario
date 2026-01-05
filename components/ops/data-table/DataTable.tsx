import React from 'react';
import type { DataTableProps } from './types';
import { useTableState } from './hooks';
import {
  StatsCards,
  SearchAndFilters,
  TableHeader,
  TableBody,
  Pagination
} from './molecules';

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
const DataTable = React.forwardRef<HTMLDivElement, DataTableProps>(
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
    const {
      searchTerm,
      setSearchTerm,
      sortBy,
      sortOrder,
      activeFilters,
      currentPage,
      setCurrentPage,
      sortedData,
      paginatedData,
      totalPages,
      startIndex,
      endIndex,
      handleSort,
      handleFilterChange
    } = useTableState({ data, searchField, itemsPerPage });

    return (
      <div ref={ref} className="space-y-6">
        {/* Stats Cards */}
        {stats && <StatsCards stats={stats} />}

        {/* Search and Filters */}
        <SearchAndFilters
          searchPlaceholder={searchPlaceholder}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          filters={filters}
          activeFilters={activeFilters}
          onFilterChange={handleFilterChange}
        />

        {/* Table */}
        <div className="rounded-lg border border-border/30 bg-background/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <TableHeader
                columns={columns}
                sortBy={sortBy}
                sortOrder={sortOrder}
                onSort={handleSort}
              />
              <TableBody
                columns={columns}
                data={paginatedData}
                onRowClick={onRowClick}
              />
            </table>
          </div>
        </div>

        {/* Pagination Controls */}
        {sortedData.length > itemsPerPage && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            startIndex={startIndex}
            endIndex={endIndex}
            totalItems={sortedData.length}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    );
  }
);

DataTable.displayName = 'DataTable';

export default DataTable;

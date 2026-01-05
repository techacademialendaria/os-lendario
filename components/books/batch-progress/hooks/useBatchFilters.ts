import { useState, useMemo } from 'react';
import type { BatchBook } from '@/hooks/useBatchProgress';

export function useBatchFilters(books: BatchBook[] | undefined) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredBooks = useMemo(() => {
    if (!books) return [];

    return books.filter((book) => {
      const matchesSearch =
        searchQuery === '' ||
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.slug.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === 'all' || book.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [books, searchQuery, statusFilter]);

  return {
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    filteredBooks,
  };
}

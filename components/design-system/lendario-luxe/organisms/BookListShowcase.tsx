/**
 * BookListShowcase - Toolbar, StatsCards, EmptyState, BulkActionsBar
 */

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { StatsCards } from '@/components/books/book-list/organisms/StatsCards';
import { EmptyState } from '@/components/books/book-list/organisms/EmptyState';
import { BulkActionsBar } from '@/components/books/book-list/organisms/BulkActionsBar';
import { Toolbar } from '@/components/books/book-list/organisms/Toolbar';
import { MOCK_BOOK_LIST_STATS, MOCK_CATEGORIES } from '../data';

export const BookListShowcase: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [layoutMode, setLayoutMode] = useState<'grid' | 'list'>('grid');

  return (
    <>
      {/* StatsCards */}
      <section>
        <Card>
          <CardHeader>
            <CardTitle>StatsCards</CardTitle>
            <CardDescription>
              <code>components/books/book-list/organisms/StatsCards.tsx</code> — Dashboard stats
            </CardDescription>
          </CardHeader>
          <CardContent>
            <StatsCards stats={MOCK_BOOK_LIST_STATS} />
          </CardContent>
        </Card>
      </section>

      {/* Toolbar */}
      <section>
        <Card>
          <CardHeader>
            <CardTitle>Toolbar</CardTitle>
            <CardDescription>
              <code>components/books/book-list/organisms/Toolbar.tsx</code> — Search, filters, view toggle
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Toolbar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              statusFilter={statusFilter}
              onStatusFilterChange={setStatusFilter}
              categoryFilter={categoryFilter}
              onCategoryFilterChange={setCategoryFilter}
              categories={MOCK_CATEGORIES}
              layoutMode={layoutMode}
              onLayoutModeChange={setLayoutMode}
            />
          </CardContent>
        </Card>
      </section>

      {/* BulkActionsBar */}
      <section>
        <Card>
          <CardHeader>
            <CardTitle>BulkActionsBar</CardTitle>
            <CardDescription>
              <code>components/books/book-list/organisms/BulkActionsBar.tsx</code> — Bulk selection actions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <BulkActionsBar
              selectedCount={5}
              onBulkPublish={() => {}}
              onBulkArchive={() => {}}
              onClearSelection={() => {}}
            />
          </CardContent>
        </Card>
      </section>

      {/* EmptyState */}
      <section>
        <Card>
          <CardHeader>
            <CardTitle>EmptyState</CardTitle>
            <CardDescription>
              <code>components/books/book-list/organisms/EmptyState.tsx</code> — Estado vazio
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <p className="mb-4 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                Sem filtros ativos
              </p>
              <EmptyState hasFilters={false} onCreate={() => {}} />
            </div>
            <div>
              <p className="mb-4 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                Com filtros ativos
              </p>
              <EmptyState hasFilters={true} onCreate={() => {}} />
            </div>
          </CardContent>
        </Card>
      </section>
    </>
  );
};


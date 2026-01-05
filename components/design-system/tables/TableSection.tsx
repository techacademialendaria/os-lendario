import React from 'react';
import {
  TableSectionHeader,
  RankingTableView,
  FinancialHistoryView,
  UserListView,
  TechnicalSpecsView,
  TeamManagementView,
  PerformanceRankingView,
} from './organisms';

/**
 * TableSection - Design System Table Showcase
 *
 * Demonstrates various table patterns and layouts:
 * 1. Ranking Table (Classic) - Gamification style with position badges
 * 2. Financial History - Invoice/transaction table with status badges
 * 3. User List - Basic user table with actions dropdown
 * 4. Technical Specs - Key-value specification table
 * 5. Team Management - Full dashboard with KPIs, filters, and data table
 * 6. Performance Ranking - High-density score table
 *
 * Refactored from 920 lines to ~50 lines using Atomic Design.
 */
const TableSection: React.FC = () => {
  return (
    <div className="animate-fade-in space-y-24">
      {/* Hero Header */}
      <TableSectionHeader />

      {/* Section 1: Ranking Table */}
      <RankingTableView />

      {/* Section 2: Financial History */}
      <FinancialHistoryView />

      {/* Section 3: Grid Layout (User List + Technical Specs) */}
      <div className="grid grid-cols-1 gap-8 xl:grid-cols-2">
        <UserListView />
        <TechnicalSpecsView />
      </div>

      {/* Section 4: Team Management Dashboard */}
      <TeamManagementView />

      {/* Section 5: Performance Ranking */}
      <PerformanceRankingView />
    </div>
  );
};

export default TableSection;

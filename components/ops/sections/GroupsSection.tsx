import React, { useState } from 'react';
import { GroupsOverview } from '../groups/GroupsOverview';
import { GroupsDashboard } from '../groups-dashboard';
import { GroupsReports } from '../groups-reports';
import type { GroupsViewMode } from '../../../types/groups';

/**
 * GroupsSection - Main orchestrator for WhatsApp Groups Dashboard
 *
 * This section provides:
 * - Overview: Grid of all groups with KPIs
 * - Detail: Individual group analysis
 * - Reports: General reports across all groups (5 tabs)
 */
export function GroupsSection() {
  const [viewMode, setViewMode] = useState<GroupsViewMode>('overview');
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);

  const handleGroupSelect = (groupName: string) => {
    setSelectedGroup(groupName);
    setViewMode('detail');
  };

  const handleBackToOverview = () => {
    setSelectedGroup(null);
    setViewMode('overview');
  };

  const handleNavigateToReports = () => {
    setViewMode('reports');
  };

  // Render based on current view mode
  switch (viewMode) {
    case 'overview':
      return (
        <GroupsOverview
          onGroupSelect={handleGroupSelect}
          onNavigateToReports={handleNavigateToReports}
        />
      );

    case 'detail':
      return (
        <GroupsDashboard
          groupName={selectedGroup!}
          onBack={handleBackToOverview}
        />
      );

    case 'reports':
      return (
        <GroupsReports onBack={handleBackToOverview} />
      );

    default:
      return null;
  }
}

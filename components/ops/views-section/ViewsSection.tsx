import React from 'react';
import { DataTable } from '../data-table';
import { OpsPage } from '../ops-ui';
import type { ViewsSectionProps } from './types';
import { EMPTY_VIEW_DATA } from './types';
import {
  TOOLS_COLUMNS,
  DRIVERS_COLUMNS,
  MAPPING_COLUMNS,
  AFFINITY_COLUMNS,
  MINDS_COLUMNS,
  CONTENTS_COLUMNS,
  TOOLS_FILTERS,
  DRIVERS_FILTERS,
  MAPPING_FILTERS,
  AFFINITY_FILTERS,
  MINDS_FILTERS,
  CONTENTS_FILTERS,
} from './data';
import { useViewsData, useViewsStats } from './hooks';

/**
 * ViewsSection - Data Table Views for Various Entities
 *
 * Displays searchable, filterable, and sortable tables for:
 * - Tools
 * - Drivers
 * - Mapping Systems
 * - Affinities
 * - Minds
 * - Contents
 */
const ViewsSection: React.FC<ViewsSectionProps> = ({
  activeView = 'tools',
  data,
  loading = false
}) => {
  const viewData = data || EMPTY_VIEW_DATA;

  // Get transformed data
  const {
    toolsWithContext,
    driversWithContext,
    mindsWithContext,
    contentsWithContext,
    flattenedAffinities
  } = useViewsData(viewData);

  // Get stats for each view
  const {
    toolsStats,
    driversStats,
    mappingStats,
    affinityStats,
    mindsStats,
    contentsStats
  } = useViewsStats(viewData);

  return (
    <OpsPage>
      {activeView === 'minds' && (
        <DataTable
          columns={MINDS_COLUMNS}
          data={mindsWithContext}
          searchPlaceholder="Search mind by name..."
          searchField="name"
          stats={mindsStats}
          filters={MINDS_FILTERS}
          itemsPerPage={10}
        />
      )}

      {activeView === 'contents' && (
        <DataTable
          columns={CONTENTS_COLUMNS}
          data={contentsWithContext}
          searchPlaceholder="Search content by title..."
          searchField="title"
          stats={contentsStats}
          filters={CONTENTS_FILTERS}
          itemsPerPage={10}
        />
      )}

      {activeView === 'drivers' && (
        <DataTable
          columns={DRIVERS_COLUMNS}
          data={driversWithContext}
          searchPlaceholder="Search driver by name..."
          searchField="name"
          stats={driversStats}
          filters={DRIVERS_FILTERS}
          itemsPerPage={10}
        />
      )}

      {activeView === 'tools' && (
        <DataTable
          columns={TOOLS_COLUMNS}
          data={toolsWithContext}
          searchPlaceholder="Search tool by name..."
          searchField="name"
          stats={toolsStats}
          filters={TOOLS_FILTERS}
          itemsPerPage={10}
        />
      )}

      {activeView === 'mapping' && (
        <DataTable
          columns={MAPPING_COLUMNS}
          data={viewData.mappingSystems}
          searchPlaceholder="Search mapping system by name..."
          searchField="name"
          stats={mappingStats}
          filters={MAPPING_FILTERS}
          itemsPerPage={10}
        />
      )}

      {activeView === 'affinity' && (
        <DataTable
          columns={AFFINITY_COLUMNS}
          data={flattenedAffinities}
          searchPlaceholder="Search affinity by tool or driver..."
          searchField="tool_name"
          stats={affinityStats}
          filters={AFFINITY_FILTERS}
          itemsPerPage={10}
        />
      )}
    </OpsPage>
  );
};

export default ViewsSection;

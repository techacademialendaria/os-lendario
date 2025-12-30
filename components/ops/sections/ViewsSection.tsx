import React from 'react';
import DataTable from '../components/DataTable';
import {
  OpsPage,
} from '../ops-ui';
import { OPS_PRIMARY, OPS_ACCENT } from '../ops-tokens';

interface ViewData {
  minds: any[];
  contents: any[];
  fragments: any[];
  drivers: any[];
  driverRelationships: any[];
  tools: any[];
  toolAffinities: any[];
  mappingSystems: any[];
  inferenceBridges: any[];
  mentalModels: any[];
  toolStacks: any[];
  mindToolMappings: any[];
  assessmentProfiles: any[];
  systemConvergence: any[];
  jobExecutions: any[];
  processingQueue: any[];
}

interface ViewsSectionProps {
  activeView?: 'tools' | 'drivers' | 'mapping' | 'affinity' | 'minds' | 'contents';
  data?: ViewData;
  loading?: boolean;
}

const ViewsSection: React.FC<ViewsSectionProps> = ({ activeView = 'tools', data, loading = false }) => {
  // Use real data if provided, otherwise empty arrays
  const viewData = data || {
    minds: [],
    contents: [],
    fragments: [],
    drivers: [],
    driverRelationships: [],
    tools: [],
    toolAffinities: [],
    mappingSystems: [],
    inferenceBridges: [],
    mentalModels: [],
    toolStacks: [],
    mindToolMappings: [],
    assessmentProfiles: [],
    systemConvergence: [],
    jobExecutions: [],
    processingQueue: [],
  };
  // Tools Table
  const toolsColumns = [
    { key: 'name', header: 'Tool Name', width: '220px', sortable: true },
    { key: 'tool_type', header: 'Type', width: '120px', type: 'badge' as const, sortable: true },
    { key: 'evidence_level', header: 'Evidence', width: '100px', type: 'badge' as const, sortable: true },
    { key: 'year_originated', header: 'Year', width: '80px', type: 'numeric' as const, sortable: true },
    { key: 'driver_affinities_count', header: 'Drivers', width: '80px', type: 'numeric' as const, sortable: true }
  ];

  const toolsStats = [
    { label: 'Total Tools', value: viewData.tools.length, icon: 'settings-sliders', color: OPS_PRIMARY },
    { label: 'By Type', value: new Set(viewData.tools.map((t: any) => t.tool_type)).size, icon: 'layers', color: '#10b981' },
    { label: 'Avg Year', value: (viewData.tools.reduce((sum: number, t: any) => sum + (t.year_originated || 0), 0) / Math.max(viewData.tools.length, 1)).toFixed(0), icon: 'chart-pie', color: OPS_ACCENT }
  ];

  const toolsFilters = [
    {
      label: 'Type',
      key: 'tool_type',
      options: [
        { label: 'Framework', value: 'framework' },
        { label: 'Mental Model', value: 'mental_model' },
        { label: 'Methodology', value: 'methodology' },
        { label: 'Heuristic', value: 'heuristic' },
        { label: 'Principle', value: 'principle' },
        { label: 'Technique', value: 'technique' },
        { label: 'Protocol', value: 'protocol' },
        { label: 'Checklist', value: 'checklist' }
      ]
    },
    {
      label: 'Evidence',
      key: 'evidence_level',
      options: [
        { label: 'Level A', value: 'A' },
        { label: 'Level B', value: 'B' },
        { label: 'Level C', value: 'C' },
        { label: 'Anecdotal', value: 'anecdotal' },
        { label: 'Unknown', value: 'unknown' }
      ]
    }
  ];

  // Drivers Table
  const driversColumns = [
    { key: 'name', header: 'Driver Name', width: '200px', sortable: true },
    { key: 'driver_type', header: 'Type', width: '130px', type: 'badge' as const, sortable: true },
    { key: 'domain', header: 'Domain', width: '120px', sortable: true },
    { key: 'stability', header: 'Stability', width: '120px', type: 'badge' as const, sortable: true },
    { key: 'spectrum_range', header: 'Spectrum', width: '200px' }
  ];

  const driversStats = [
    { label: 'Total Drivers', value: viewData.drivers.length, icon: 'bolt', color: '#f59e0b' },
    { label: 'By Type', value: new Set(viewData.drivers.map((d: any) => d.driver_type)).size, icon: 'layers', color: '#8b5cf6' },
    { label: 'By Domain', value: new Set(viewData.drivers.map((d: any) => d.domain)).size, icon: 'grid-3x3', color: '#06b6d4' }
  ];

  const driversFilters = [
    {
      label: 'Type',
      key: 'driver_type',
      options: [
        { label: 'Trait', value: 'trait' },
        { label: 'Behavioral', value: 'behavioral' },
        { label: 'Cognitive', value: 'cognitive' },
        { label: 'Belief', value: 'belief' },
        { label: 'Mindset', value: 'mindset' },
        { label: 'Need', value: 'need' },
        { label: 'Value', value: 'value' }
      ]
    },
    {
      label: 'Stability',
      key: 'stability',
      options: [
        { label: 'Stable', value: 'stable' },
        { label: 'Unstable', value: 'unstable' }
      ]
    }
  ];

  // Mapping Systems Table
  const mappingColumns = [
    { key: 'name', header: 'System Name', width: '240px', sortable: true },
    { key: 'system_type', header: 'Type', width: '130px', type: 'badge' as const, sortable: true },
    { key: 'scientific_validity', header: 'Validity', width: '110px', type: 'badge' as const, sortable: true },
    { key: 'origin_year', header: 'Year', width: '80px', type: 'numeric' as const, sortable: true }
  ];

  const mappingStats = [
    { label: 'Total Systems', value: viewData.mappingSystems.length, icon: 'chart-pie', color: '#06b6d4' },
    { label: 'High Validity', value: viewData.mappingSystems.filter((s: any) => s.scientific_validity === 'high').length, icon: 'check-circle', color: '#10b981' },
    { label: 'By Type', value: new Set(viewData.mappingSystems.map((s: any) => s.system_type)).size, icon: 'lightbulb', color: '#f59e0b' }
  ];

  const mappingFilters = [
    {
      label: 'Type',
      key: 'system_type',
      options: [
        { label: 'Psychometric', value: 'psychometric' },
        { label: 'Typological', value: 'typological' },
        { label: 'Dimensional', value: 'dimensional' },
        { label: 'Behavioral', value: 'behavioral' },
        { label: 'Cognitive', value: 'cognitive' }
      ]
    },
    {
      label: 'Validity',
      key: 'scientific_validity',
      options: [
        { label: 'High', value: 'high' },
        { label: 'Moderate', value: 'moderate' },
        { label: 'Low', value: 'low' },
        { label: 'Unknown', value: 'unknown' }
      ]
    }
  ];

  // Affinity Table - Flatten data with tool/driver names
  const affinityColumns = [
    { key: 'tool_name', header: 'Tool', width: '180px', sortable: true },
    { key: 'driver_name', header: 'Driver', width: '150px', sortable: true },
    { key: 'affinity_type', header: 'Affinity', width: '130px', type: 'badge' as const, sortable: true },
    { key: 'strength_label', header: 'Strength', width: '130px', type: 'badge' as const, sortable: true }
  ];

  // Flatten affinities data to get tool and driver names + strength label
  const flattenedAffinities = viewData.toolAffinities.map((affinity: any) => {
    // Convert strength (-1 to 1) to human-readable label
    let strength_label = 'Neutral';
    if (affinity.strength > 0.6) {
      strength_label = 'Strong Synergy';
    } else if (affinity.strength > 0.3) {
      strength_label = 'Synergy';
    } else if (affinity.strength < -0.6) {
      strength_label = 'Strong Conflict';
    } else if (affinity.strength < -0.3) {
      strength_label = 'Conflict';
    }

    return {
      id: affinity.id,
      tool_id: affinity.tool_id,
      driver_id: affinity.driver_id,
      tool_name: affinity.tools?.name || affinity.tool_id || 'Unknown',
      driver_name: affinity.drivers?.name || affinity.driver_id || 'Unknown',
      affinity_type: affinity.affinity_type,
      strength: affinity.strength,
      strength_label: strength_label
    };
  });

  const affinityStats = [
    { label: 'Total Affinities', value: viewData.toolAffinities.length, icon: 'link', color: '#8b5cf6' },
    { label: 'Synergies', value: viewData.toolAffinities.filter((a: any) => a.strength && a.strength > 0.3).length, icon: 'check-circle', color: '#10b981' },
    { label: 'Conflicts', value: viewData.toolAffinities.filter((a: any) => a.strength && a.strength < -0.3).length, icon: 'alert-circle', color: '#ef4444' }
  ];

  const affinityFilters = [
    {
      label: 'Affinity Type',
      key: 'affinity_type',
      options: [
        { label: 'Enables', value: 'enables' },
        { label: 'Requires', value: 'requires' },
        { label: 'Develops', value: 'develops' },
        { label: 'Conflicts', value: 'conflicts' }
      ]
    }
  ];

  // Minds Table (Core Entities)
  const mindsColumns = [
    { key: 'name', header: 'Mind Name', width: '180px', sortable: true },
    { key: 'short_bio', header: 'Bio', width: '280px' },
    { key: 'primary_obsession', header: 'Primary Obsession', width: '200px' },
    { key: 'mmos_status', header: 'Status', width: '100px', type: 'badge' as const, sortable: true },
    { key: 'created_at_formatted', header: 'Created', width: '100px', sortable: true }
  ];

  // Helper to format names (convert "LastName, FirstName" to "FirstName LastName")
  const formatName = (name: string): string => {
    if (!name || !name.includes(',')) return name;
    const parts = name.split(',').map((p: string) => p.trim());
    if (parts.length === 2) {
      return `${parts[1]} ${parts[0]}`;
    }
    return name;
  };

  // Get mind stats (obsession is now a direct field on minds table)
  const mindsWithContext = viewData.minds.map((m: any) => {
    const date = new Date(m.created_at);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return {
      ...m,
      name: formatName(m.name),
      primary_obsession: m.obsession || 'N/A',
      mmos_status: m.metadata?.status || 'unknown',
      mmos_subject_type: m.metadata?.subject_type || 'N/A',
      created_at_formatted: `${day}/${month}/${year}`
    };
  });

  const mindsStats = [
    { label: 'Total Minds', value: viewData.minds.length, icon: 'brain', color: '#8b5cf6' },
    { label: 'With Prompts', value: viewData.minds.filter((m: any) => m.metadata?.has_prompts).length, icon: 'zap', color: '#f59e0b' },
    { label: 'Active', value: viewData.minds.filter((m: any) => m.metadata?.status === 'active').length, icon: 'check-circle', color: '#10b981' }
  ];

  const mindsFilters = [
    {
      label: 'Status',
      key: 'mmos_status',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Archived', value: 'archived' },
        { label: 'Draft', value: 'draft' }
      ]
    },
    {
      label: 'Subject Type',
      key: 'mmos_subject_type',
      options: [
        { label: 'Public Figure', value: 'public_figure' },
        { label: 'Creator', value: 'creator' },
        { label: 'Expert', value: 'expert' }
      ]
    }
  ];

  // Transform drivers data to include spectrum range
  const driversWithContext = viewData.drivers.map((d: any) => ({
    ...d,
    spectrum_range: d.spectrum_low && d.spectrum_high
      ? `${d.spectrum_low} ↔ ${d.spectrum_high}`
      : 'Not specified'
  }));

  // Transform tools data to include driver affinity count
  const toolsWithContext = viewData.tools.map((t: any) => ({
    ...t,
    driver_affinities_count: viewData.toolAffinities.filter((a: any) => a.tool_id === t.id).length
  }));

  // Transform contents data to include project and mind names
  const contentsWithContext = viewData.contents.map((c: any) => {
    const date = new Date(c.created_at);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    // Get project name from content_projects (it's an array due to FK relationship)
    const projectName = Array.isArray(c.content_projects) && c.content_projects[0]
      ? c.content_projects[0].name
      : 'Unassigned';

    // Get first mind name from content_minds
    const primaryMindName = Array.isArray(c.content_minds) && c.content_minds[0]
      ? c.content_minds[0].mind_id // This will be a UUID, ideally would have mind.name via join
      : 'No Mind';

    return {
      ...c,
      project_name: projectName,
      primary_mind_name: primaryMindName,
      created_at_formatted: `${day}/${month}/${year}`
    };
  });

  // Contents Table (Core Entities)
  const contentsColumns = [
    { key: 'title', header: 'Title', width: '250px', sortable: true },
    { key: 'project_name', header: 'Project', width: '150px', sortable: true },
    { key: 'primary_mind_name', header: 'Mind', width: '150px', sortable: true },
    { key: 'content_type', header: 'Type', width: '120px', type: 'badge' as const, sortable: true },
    { key: 'status', header: 'Status', width: '100px', type: 'badge' as const, sortable: true },
    { key: 'created_at_formatted', header: 'Created', width: '100px', sortable: true }
  ];

  const contentsStats = [
    { label: 'Total Contents', value: viewData.contents.length, icon: 'file-text', color: '#06b6d4' },
    { label: 'Published', value: viewData.contents.filter((c: any) => c.status === 'published').length, icon: 'check-circle', color: '#10b981' },
    { label: 'By Project', value: new Set(viewData.contents.map((c: any) => c.project_id)).size, icon: 'send', color: OPS_ACCENT }
  ];

  const contentsFilters = [
    {
      label: 'Status',
      key: 'status',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Reviewed', value: 'reviewed' },
        { label: 'Published', value: 'published' },
        { label: 'Archived', value: 'archived' }
      ]
    }
  ];

  return (
    <OpsPage>
      {activeView === 'minds' && (
        <DataTable
          columns={mindsColumns}
          data={mindsWithContext}
          searchPlaceholder="Search mind by name..."
          searchField="name"
          stats={mindsStats}
          filters={mindsFilters}
          itemsPerPage={10}
        />
      )}

      {activeView === 'contents' && (
        <DataTable
          columns={contentsColumns}
          data={contentsWithContext}
          searchPlaceholder="Search content by title..."
          searchField="title"
          stats={contentsStats}
          filters={contentsFilters}
          itemsPerPage={10}
        />
      )}

      {activeView === 'drivers' && (
        <DataTable
          columns={driversColumns}
          data={driversWithContext}
          searchPlaceholder="Search driver by name..."
          searchField="name"
          stats={driversStats}
          filters={driversFilters}
          itemsPerPage={10}
        />
      )}

      {activeView === 'tools' && (
        <DataTable
          columns={toolsColumns}
          data={toolsWithContext}
          searchPlaceholder="Search tool by name..."
          searchField="name"
          stats={toolsStats}
          filters={toolsFilters}
          itemsPerPage={10}
        />
      )}

      {activeView === 'mapping' && (
        <DataTable
          columns={mappingColumns}
          data={viewData.mappingSystems}
          searchPlaceholder="Search mapping system by name..."
          searchField="name"
          stats={mappingStats}
          filters={mappingFilters}
          itemsPerPage={10}
        />
      )}

      {activeView === 'affinity' && (
        <DataTable
          columns={affinityColumns}
          data={flattenedAffinities}
          searchPlaceholder="Search affinity by tool or driver..."
          searchField="tool_name"
          stats={affinityStats}
          filters={affinityFilters}
          itemsPerPage={10}
        />
      )}
    </OpsPage>
  );
};

export default ViewsSection;

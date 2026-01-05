import type { Column } from '../types';

// Tools Table Columns
export const TOOLS_COLUMNS: Column[] = [
  { key: 'name', header: 'Tool Name', width: '220px', sortable: true },
  { key: 'tool_type', header: 'Type', width: '120px', type: 'badge', sortable: true },
  { key: 'evidence_level', header: 'Evidence', width: '100px', type: 'badge', sortable: true },
  { key: 'year_originated', header: 'Year', width: '80px', type: 'numeric', sortable: true },
  { key: 'driver_affinities_count', header: 'Drivers', width: '80px', type: 'numeric', sortable: true }
];

// Drivers Table Columns
export const DRIVERS_COLUMNS: Column[] = [
  { key: 'name', header: 'Driver Name', width: '200px', sortable: true },
  { key: 'driver_type', header: 'Type', width: '130px', type: 'badge', sortable: true },
  { key: 'domain', header: 'Domain', width: '120px', sortable: true },
  { key: 'stability', header: 'Stability', width: '120px', type: 'badge', sortable: true },
  { key: 'spectrum_range', header: 'Spectrum', width: '200px' }
];

// Mapping Systems Table Columns
export const MAPPING_COLUMNS: Column[] = [
  { key: 'name', header: 'System Name', width: '240px', sortable: true },
  { key: 'system_type', header: 'Type', width: '130px', type: 'badge', sortable: true },
  { key: 'scientific_validity', header: 'Validity', width: '110px', type: 'badge', sortable: true },
  { key: 'origin_year', header: 'Year', width: '80px', type: 'numeric', sortable: true }
];

// Affinity Table Columns
export const AFFINITY_COLUMNS: Column[] = [
  { key: 'tool_name', header: 'Tool', width: '180px', sortable: true },
  { key: 'driver_name', header: 'Driver', width: '150px', sortable: true },
  { key: 'affinity_type', header: 'Affinity', width: '130px', type: 'badge', sortable: true },
  { key: 'strength_label', header: 'Strength', width: '130px', type: 'badge', sortable: true }
];

// Minds Table Columns
export const MINDS_COLUMNS: Column[] = [
  { key: 'name', header: 'Mind Name', width: '180px', sortable: true },
  { key: 'short_bio', header: 'Bio', width: '280px' },
  { key: 'primary_obsession', header: 'Primary Obsession', width: '200px' },
  { key: 'mmos_status', header: 'Status', width: '100px', type: 'badge', sortable: true },
  { key: 'created_at_formatted', header: 'Created', width: '100px', sortable: true }
];

// Contents Table Columns
export const CONTENTS_COLUMNS: Column[] = [
  { key: 'title', header: 'Title', width: '250px', sortable: true },
  { key: 'project_name', header: 'Project', width: '150px', sortable: true },
  { key: 'primary_mind_name', header: 'Mind', width: '150px', sortable: true },
  { key: 'content_type', header: 'Type', width: '120px', type: 'badge', sortable: true },
  { key: 'status', header: 'Status', width: '100px', type: 'badge', sortable: true },
  { key: 'created_at_formatted', header: 'Created', width: '100px', sortable: true }
];

import type { FilterConfig } from '../types';

// Tools Filters
export const TOOLS_FILTERS: FilterConfig[] = [
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

// Drivers Filters
export const DRIVERS_FILTERS: FilterConfig[] = [
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

// Mapping Systems Filters
export const MAPPING_FILTERS: FilterConfig[] = [
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

// Affinity Filters
export const AFFINITY_FILTERS: FilterConfig[] = [
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

// Minds Filters
export const MINDS_FILTERS: FilterConfig[] = [
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

// Contents Filters
export const CONTENTS_FILTERS: FilterConfig[] = [
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

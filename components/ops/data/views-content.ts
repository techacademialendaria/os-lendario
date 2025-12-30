// =============================================================================
// VIEWS CONTENT - Database Table Views & Relationships
// =============================================================================

export const VIEWS_EXPLANATION = {
  title: 'Database Views',
  definition: 'Structured visualization of the main database tables and their relationships.',
  views: [
    {
      id: 'tools',
      name: 'Tools Catalog',
      icon: 'settings-sliders',
      description: 'All cognitive artifacts (frameworks, methodologies, mental models)',
      tables: 1,
      columns: 37,
      records: 'Live count',
      keyFields: ['slug', 'name', 'tool_type', 'domains', 'axis_prescriptive', 'axis_externality', 'axis_rigidity'],
      purpose: 'Master catalog of cognitive tools used across the system',
      color: '#3b82f6'
    },
    {
      id: 'drivers',
      name: 'Drivers (Traits)',
      icon: 'bolt',
      description: 'Cognitive and personality drivers (Big Five, DISC, etc.)',
      tables: 1,
      columns: 18,
      records: 'Live count',
      keyFields: ['slug', 'name', 'short_description', 'assessment_systems'],
      purpose: 'Master catalog of personality traits and cognitive drivers',
      color: '#f59e0b'
    },
    {
      id: 'affinity',
      name: 'Tool & Driver Affinity',
      icon: 'network',
      description: 'Relationships between tools and drivers (enables/requires/conflicts/develops)',
      tables: 1,
      columns: 10,
      records: 'Live count',
      keyFields: ['tool_id', 'driver_id', 'affinity_type', 'strength', 'rationale'],
      purpose: 'Define which traits enable, require, conflict with, or are developed by tools',
      color: '#8b5cf6'
    }
  ]
};

export const TOOLS_VIEW = {
  title: 'Tools Catalog',
  description: 'Master catalog of cognitive artifacts (mental models, frameworks, methodologies, heuristics, principles, worldviews, biases, protocols, checklists, techniques)',
  columns: [
    { header: 'Slug', key: 'slug', width: '120px', type: 'text', sortable: true },
    { header: 'Name', key: 'name', width: '200px', type: 'text', sortable: true },
    { header: 'Type', key: 'tool_type', width: '130px', type: 'badge', sortable: true },
    { header: 'Domains', key: 'domains', width: '200px', type: 'tags', sortable: false },
    { header: 'Prescriptive', key: 'axis_prescriptive', width: '80px', type: 'numeric', sortable: true },
    { header: 'Externality', key: 'axis_externality', width: '80px', type: 'numeric', sortable: true },
    { header: 'Rigidity', key: 'axis_rigidity', width: '80px', type: 'numeric', sortable: true },
    { header: 'Evidence Level', key: 'evidence_level', width: '100px', type: 'badge', sortable: true },
    { header: 'Year Originated', key: 'year_originated', width: '80px', type: 'numeric', sortable: true },
  ],
  filters: [
    { name: 'Type', field: 'tool_type', type: 'select' },
    { name: 'Domain', field: 'domains', type: 'multi-select' },
    { name: 'Evidence Level', field: 'evidence_level', type: 'select' },
    { name: 'Prescriptive Range', field: 'axis_prescriptive', type: 'range' },
  ],
  stats: {
    title: 'Tools Overview',
    metrics: [
      { label: 'Total Tools', key: 'total' },
      { label: 'Avg Prescriptive', key: 'avgPrescriptive' },
      { label: 'By Type', key: 'byType' },
      { label: 'Evidence A/B', key: 'evidenceAB' }
    ]
  }
};

export const DRIVERS_VIEW = {
  title: 'Drivers & Traits',
  description: 'Personality and cognitive drivers used for mind profiling (Big Five, DISC, Enneagram, etc.)',
  columns: [
    { header: 'Slug', key: 'slug', width: '130px', type: 'text', sortable: true },
    { header: 'Name', key: 'name', width: '150px', type: 'text', sortable: true },
    { header: 'Short Description', key: 'short_description', width: '250px', type: 'text', sortable: false },
    { header: 'Assessment Systems', key: 'assessment_systems', width: '200px', type: 'tags', sortable: false },
    { header: 'Type', key: 'driver_type', width: '100px', type: 'badge', sortable: true },
    { header: 'Polarity', key: 'polarity', width: '80px', type: 'badge', sortable: true },
    { header: 'Evidence Level', key: 'evidence_level', width: '100px', type: 'badge', sortable: true },
  ],
  filters: [
    { name: 'Type', field: 'driver_type', type: 'select' },
    { name: 'Assessment System', field: 'assessment_systems', type: 'multi-select' },
    { name: 'Polarity', field: 'polarity', type: 'select' },
  ],
  stats: {
    title: 'Drivers Overview',
    metrics: [
      { label: 'Total Drivers', key: 'total' },
      { label: 'Assessment Systems', key: 'systems' },
      { label: 'By Type', key: 'byType' },
      { label: 'Tools Using', key: 'toolsUsing' }
    ]
  }
};

export const AFFINITY_VIEW = {
  title: 'Tool & Driver Affinities',
  description: 'Relationships mapping how traits enable, require, conflict with, or are developed by tools',
  columns: [
    { header: 'Tool', key: 'tool_name', width: '180px', type: 'text', sortable: true },
    { header: 'Driver', key: 'driver_name', width: '150px', type: 'text', sortable: true },
    { header: 'Type', key: 'affinity_type', width: '100px', type: 'badge', sortable: true },
    { header: 'Strength', key: 'strength', width: '80px', type: 'progress', sortable: true },
    { header: 'Rationale', key: 'rationale', width: '300px', type: 'text', sortable: false },
    { header: 'Evidence Level', key: 'evidence_level', width: '100px', type: 'badge', sortable: true },
  ],
  filters: [
    { name: 'Affinity Type', field: 'affinity_type', type: 'select' },
    { name: 'Tool', field: 'tool_id', type: 'searchable-select' },
    { name: 'Driver', field: 'driver_id', type: 'searchable-select' },
    { name: 'Strength Range', field: 'strength', type: 'range' },
  ],
  stats: {
    title: 'Affinity Overview',
    metrics: [
      { label: 'Total Affinities', key: 'total' },
      { label: 'By Type', key: 'byType' },
      { label: 'Avg Strength', key: 'avgStrength' },
      { label: 'Tools with Affinities', key: 'toolsWithAffinities' }
    ]
  },
  affinityTypes: [
    {
      type: 'enables',
      color: '#10b981',
      label: 'Enables',
      description: 'Driver facilitates effective use',
      example: 'High conscientiousness ENABLES GTD'
    },
    {
      type: 'requires',
      color: '#f59e0b',
      label: 'Requires',
      description: 'Tool demands minimum level',
      example: 'Meditation REQUIRES some openness'
    },
    {
      type: 'conflicts',
      color: '#ef4444',
      label: 'Conflicts',
      description: 'Driver impedes adoption',
      example: 'High impulsivity CONFLICTS with long-term planning'
    },
    {
      type: 'develops',
      color: '#8b5cf6',
      label: 'Develops',
      description: 'Using tool strengthens driver',
      example: 'Journaling DEVELOPS self-awareness'
    }
  ]
};

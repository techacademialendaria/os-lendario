// Mock data generator for large datasets
const TOOL_TYPES = ['mental_model', 'framework', 'methodology', 'heuristic', 'principle', 'worldview', 'bias', 'protocol', 'checklist', 'technique'];
const DOMAINS = [
  'Analysis', 'Diagnosis', 'Ideation', 'Decision', 'Planning', 
  'Prioritization', 'Execution', 'Communication', 'Learning', 'Focus'
];
const EVIDENCE_LEVELS = ['A', 'B', 'C', 'anecdotal', 'unknown'];

const DRIVER_TYPES = ['trait', 'behavioral', 'cognitive'];
const ASSESSMENT_SYSTEMS = ['Big Five', 'DISC', 'MBTI', 'Enneagram', 'StrengthsFinder', 'Custom'];

const MAPPING_SYSTEM_NAMES = [
  'Big Five Personality Model', 'Myers-Briggs Type Indicator', 'DISC Profile', 'Enneagram of Personality',
  'StrengthsFinder', 'VIA Character Strengths', 'Keirsey Temperament', 'Hogan Personality',
  'NEO Personality Inventory', 'Caliper Profile', 'Predictive Index', 'CliftonStrengths',
  'Emotional Intelligence Assessment', 'Grit Scale', 'Growth Mindset Inventory', 'Resilience Scale',
  'Values in Action', 'Holland Code', 'Career Anchors', 'Job Satisfaction Index'
];

const MAPPING_SYSTEM_TYPES = ['psychometric', 'typological', 'dimensional', 'behavioral', 'cognitive'];
const MAPPING_CATEGORIES = ['core', 'complementary', 'emerging', 'legacy'];
const STRUCTURE_TYPES = ['dimensional', 'typological', 'hierarchical', 'trait-based'];
const SCIENTIFIC_VALIDITY = ['high', 'moderate', 'low', 'unknown'];

const TOOL_NAMES = [
  'First Principles Thinking', 'Getting Things Done', 'SWOT Analysis', 'Eisenhower Matrix',
  'Business Model Canvas', 'Design Thinking', 'Scrum', 'Lean Startup', 'OKRs', 'Six Sigma',
  'Kanban', 'Agile', 'Jobs to be Done', 'Jobs To Be Done', 'Value Proposition Canvas',
  'Blue Ocean Strategy', 'Porter\'s Five Forces', 'VRIO Analysis', 'Ansoff Matrix', 'Boston Matrix',
  'GE McKinsey Matrix', 'ADL Matrix', 'Perceptual Mapping', 'PESTLE Analysis', 'CAGE Analysis',
  'Porter\'s Diamond', 'Scenario Planning', 'Delphi Method', 'Mind Mapping', 'Brainstorming',
  'SCAMPER', 'Six Thinking Hats', 'Lateral Thinking', 'Morphological Analysis', 'Analogy',
  'Clustering', 'Affinity Mapping', 'User Journey Mapping', 'Empathy Mapping', 'Stakeholder Analysis',
  'RACI Matrix', 'Gantt Chart', 'Critical Path Method', 'PERT Analysis', 'Resource Allocation',
  'Capacity Planning', 'Risk Assessment Matrix', 'Monte Carlo Simulation', 'Decision Tree', 'Payoff Matrix',
  'Pareto Analysis', 'Root Cause Analysis', 'Fishbone Diagram', 'Five Whys', 'FMEA',
  'Failure Tree Analysis', 'Fault Tree Analysis', 'Cause and Effect Diagram', 'Ishikawa Diagram',
  'Control Chart', 'Run Chart', 'Histogram', 'Scatter Plot', 'Box Plot', 'Normal Distribution',
  'Z-score', 'Regression Analysis', 'Correlation Analysis', 'Chi-Square Test', 'T-Test',
  'ANOVA', 'Standard Deviation', 'Variance', 'Probability', 'Bayes Theorem', 'Conditional Probability',
  'Expected Value', 'Sensitivity Analysis', 'Break-even Analysis', 'Cost-Benefit Analysis', 'ROI Calculation'
];

const DRIVER_NAMES = [
  'Openness to Experience', 'Conscientiousness', 'Extraversion', 'Agreeableness', 'Neuroticism',
  'Dominance', 'Influence', 'Steadiness', 'Compliance', 'Thinking', 'Feeling',
  'Judging', 'Perceiving', 'Sensing', 'Intuition', 'Introversion', 'Ambiversion',
  'Innovativeness', 'Risk Tolerance', 'Analytical Thinking', 'Creativity', 'Strategic Thinking',
  'Systems Thinking', 'Critical Thinking', 'Emotional Intelligence', 'Social Intelligence', 'Self-Awareness',
  'Self-Regulation', 'Motivation', 'Empathy', 'Social Skills', 'Resilience', 'Growth Mindset',
  'Fixed Mindset', 'Grit', 'Perseverance', 'Adaptability', 'Flexibility', 'Agility',
  'Leadership', 'Followership', 'Teamwork', 'Collaboration', 'Communication', 'Active Listening',
  'Public Speaking', 'Negotiation', 'Influence', 'Persuasion', 'Authenticity', 'Integrity',
  'Transparency', 'Accountability', 'Responsibility', 'Reliability', 'Dependability', 'Honesty',
  'Trustworthiness', 'Vulnerability', 'Humility', 'Confidence', 'Self-Esteem', 'Self-Worth'
];

// Generate tools
export const MOCK_TOOLS = Array.from({ length: 310 }, (_, i) => {
  const toolIndex = i % TOOL_NAMES.length;
  const typeIndex = i % TOOL_TYPES.length;
  const evidenceIndex = i % EVIDENCE_LEVELS.length;
  
  return {
    id: `tool-${i + 1}`,
    slug: `tool-${i + 1}`.toLowerCase(),
    name: `${TOOL_NAMES[toolIndex]} ${i > TOOL_NAMES.length ? `(v${Math.floor(i / TOOL_NAMES.length)})` : ''}`.trim(),
    tool_type: TOOL_TYPES[typeIndex],
    domains: DOMAINS.slice(0, Math.floor(Math.random() * 3) + 1),
    axis_prescriptive: Math.floor(Math.random() * 10) + 1,
    axis_externality: Math.floor(Math.random() * 10) + 1,
    axis_rigidity: Math.floor(Math.random() * 10) + 1,
    evidence_level: EVIDENCE_LEVELS[evidenceIndex],
    year_originated: 1950 + Math.floor(Math.random() * 75)
  };
});

// Generate drivers
export const MOCK_DRIVERS = Array.from({ length: 1050 }, (_, i) => {
  const driverIndex = i % DRIVER_NAMES.length;
  const typeIndex = i % DRIVER_TYPES.length;
  
  return {
    id: `driver-${i + 1}`,
    slug: `driver-${i + 1}`.toLowerCase(),
    name: `${DRIVER_NAMES[driverIndex]} ${i > DRIVER_NAMES.length ? `(${Math.floor(i / DRIVER_NAMES.length)})` : ''}`.trim(),
    short_description: `Driver trait or behavioral characteristic related to ${DRIVER_NAMES[driverIndex].toLowerCase()}`,
    assessment_systems: ASSESSMENT_SYSTEMS.slice(0, Math.floor(Math.random() * 3) + 1),
    driver_type: DRIVER_TYPES[typeIndex],
    polarity: Math.random() > 0.5 ? 'high' : 'low',
    evidence_level: EVIDENCE_LEVELS[Math.floor(Math.random() * 3)]
  };
});

// Generate affinities (limited to reasonable number)
export const MOCK_AFFINITIES = Array.from({ length: 500 }, (_, i) => {
  const affinity_types = ['enables', 'requires', 'conflicts', 'develops'];
  const toolIndex = Math.floor(Math.random() * MOCK_TOOLS.length);
  const driverIndex = Math.floor(Math.random() * MOCK_DRIVERS.length);
  const affTypeIndex = i % affinity_types.length;
  
  return {
    id: `affinity-${i + 1}`,
    tool_name: MOCK_TOOLS[toolIndex].name,
    driver_name: MOCK_DRIVERS[driverIndex].name,
    affinity_type: affinity_types[affTypeIndex],
    strength: (Math.random() * 2 - 1).toFixed(2), // -1.0 to 1.0
    rationale: `Relationship between ${MOCK_TOOLS[toolIndex].name} and ${MOCK_DRIVERS[driverIndex].name}`,
    evidence_level: EVIDENCE_LEVELS[Math.floor(Math.random() * 3)]
  };
});

// Generate mapping systems
export const MOCK_MAPPING_SYSTEMS = Array.from({ length: 250 }, (_, i) => {
  const systemIndex = i % MAPPING_SYSTEM_NAMES.length;
  const typeIndex = i % MAPPING_SYSTEM_TYPES.length;
  const categoryIndex = i % MAPPING_CATEGORIES.length;
  const structureIndex = i % STRUCTURE_TYPES.length;
  const validityIndex = i % SCIENTIFIC_VALIDITY.length;

  return {
    id: `system-${i + 1}`,
    slug: `system-${i + 1}`.toLowerCase(),
    name: `${MAPPING_SYSTEM_NAMES[systemIndex]} ${i > MAPPING_SYSTEM_NAMES.length ? `(${Math.floor(i / MAPPING_SYSTEM_NAMES.length)})` : ''}`.trim(),
    description: `Assessment system for measuring ${MAPPING_SYSTEM_NAMES[systemIndex].toLowerCase()}`,
    system_type: MAPPING_SYSTEM_TYPES[typeIndex],
    category: MAPPING_CATEGORIES[categoryIndex],
    structure_type: STRUCTURE_TYPES[structureIndex],
    is_detection_based: Math.random() > 0.5,
    detection_min_confidence: Math.random() * 0.3 + 0.6,
    scientific_validity: SCIENTIFIC_VALIDITY[validityIndex],
    origin_author: ['Jung', 'Briggs', 'Myers', 'Marston', 'Ichazo', 'Gallup', 'Dweck'][i % 7],
    origin_year: 1900 + Math.floor(Math.random() * 120),
    is_active: Math.random() > 0.1
  };
});

// Generate minds (Core Entities)
const MIND_NAMES = ['João Claude', 'Alice Navigator', 'Bob Architect', 'Carol Developer', 'David Designer', 'Eve Analyst', 'Frank Strategist', 'Grace Innovator', 'Henry Leader', 'Iris Creator'];
export const MOCK_MINDS = Array.from({ length: 42 }, (_, i) => {
  const nameIndex = i % MIND_NAMES.length;
  const statusList = ['active', 'archived', 'processing', 'draft'];
  return {
    id: `mind-${i + 1}`,
    slug: `mind-${i + 1}`.toLowerCase(),
    name: `${MIND_NAMES[nameIndex]} ${i > MIND_NAMES.length ? `#${Math.floor(i / MIND_NAMES.length)}` : ''}`.trim(),
    status: statusList[i % statusList.length],
    created_at: new Date(2024, Math.floor(i/10), (i % 28) + 1).toISOString().split('T')[0],
    updated_at: new Date(2024, Math.floor((i+5)/10), (i % 28) + 1).toISOString().split('T')[0],
    version: Math.floor(Math.random() * 5) + 1,
    completion_percentage: Math.floor(Math.random() * 100)
  };
});

// Generate contents (Core Entities)
const CONTENT_TYPES = ['course_module', 'lesson', 'guide', 'article', 'assessment', 'resource'];
export const MOCK_CONTENTS = Array.from({ length: 156 }, (_, i) => {
  const typeIndex = i % CONTENT_TYPES.length;
  const statusList = ['draft', 'reviewed', 'published', 'archived'];
  return {
    id: `content-${i + 1}`,
    slug: `content-${i + 1}`.toLowerCase(),
    title: `Content Module ${i + 1}: ${CONTENT_TYPES[typeIndex]}`,
    content_type: CONTENT_TYPES[typeIndex],
    status: statusList[Math.floor(i / 40)],
    project_id: `proj-${(i % 10) + 1}`,
    created_by: MIND_NAMES[i % MIND_NAMES.length],
    created_at: new Date(2024, Math.floor(i/50), (i % 28) + 1).toISOString().split('T')[0],
    word_count: Math.floor(Math.random() * 5000) + 500
  };
});

// Generate MIUs (Core Entities)
export const MOCK_MIUS = Array.from({ length: 89 }, (_, i) => {
  const typeList = ['identity', 'cognitive', 'behavioral', 'emotional', 'values'];
  return {
    id: `miu-${i + 1}`,
    slug: `miu-${i + 1}`.toLowerCase(),
    name: `MIU Unit ${i + 1}`,
    type: typeList[i % typeList.length],
    mind_id: `mind-${(i % 42) + 1}`,
    fragment_count: Math.floor(Math.random() * 50) + 1,
    validation_status: ['valid', 'needs_review', 'invalid'][i % 3],
    created_at: new Date(2024, Math.floor(i/30), (i % 28) + 1).toISOString().split('T')[0]
  };
});

// Generate inference bridges (Cognitive Engine)
export const MOCK_INFERENCE_BRIDGES = Array.from({ length: 73 }, (_, i) => {
  const bridgeTypes = ['tool_recommendation', 'trait_inference', 'assessment_mapping', 'context_inference'];
  return {
    id: `bridge-${i + 1}`,
    slug: `bridge-${i + 1}`.toLowerCase(),
    name: `Inference Bridge ${i + 1}`,
    bridge_type: bridgeTypes[i % bridgeTypes.length],
    source_system: MAPPING_SYSTEM_NAMES[i % MAPPING_SYSTEM_NAMES.length],
    target_system: MAPPING_SYSTEM_NAMES[(i + 3) % MAPPING_SYSTEM_NAMES.length],
    confidence_score: (Math.random() * 0.4 + 0.6).toFixed(2),
    is_bidirectional: Math.random() > 0.5,
    created_at: new Date(2024, Math.floor(i/25), (i % 28) + 1).toISOString().split('T')[0]
  };
});

// Generate driver relationships (Cognitive Engine)
export const MOCK_DRIVER_RELATIONSHIPS = Array.from({ length: 128 }, (_, i) => {
  const relTypes = ['correlates', 'opposes', 'influences', 'predicts', 'inhibits'];
  const driver1Index = i % MOCK_DRIVERS.length;
  const driver2Index = (i + Math.floor(Math.random() * 50) + 1) % MOCK_DRIVERS.length;
  return {
    id: `rel-${i + 1}`,
    driver1_id: `driver-${driver1Index + 1}`,
    driver1_name: MOCK_DRIVERS[driver1Index].name,
    driver2_id: `driver-${driver2Index + 1}`,
    driver2_name: MOCK_DRIVERS[driver2Index].name,
    relationship_type: relTypes[i % relTypes.length],
    strength: (Math.random() * 2 - 1).toFixed(2),
    evidence_level: EVIDENCE_LEVELS[i % 3],
    is_bidirectional: Math.random() > 0.3
  };
});

// Generate mental models (Cognitive Engine)
export const MOCK_MENTAL_MODELS = Array.from({ length: 94 }, (_, i) => {
  const modelTypes = ['decision_model', 'cognitive_framework', 'thinking_pattern', 'belief_system'];
  return {
    id: `model-${i + 1}`,
    slug: `model-${i + 1}`.toLowerCase(),
    name: `Mental Model ${i + 1}`,
    model_type: modelTypes[i % modelTypes.length],
    source_tool: MOCK_TOOLS[i % MOCK_TOOLS.length].name,
    complexity: ['simple', 'moderate', 'complex'][i % 3],
    use_frequency: Math.floor(Math.random() * 100),
    effectiveness_score: (Math.random() * 0.5 + 0.5).toFixed(2),
    created_at: new Date(2024, Math.floor(i/32), (i % 28) + 1).toISOString().split('T')[0]
  };
});

// Generate tool stacks (Cognitive Engine)
export const MOCK_TOOL_STACKS = Array.from({ length: 67 }, (_, i) => {
  const stackTypes = ['decision_stack', 'problem_solving_stack', 'learning_stack', 'creativity_stack'];
  return {
    id: `stack-${i + 1}`,
    slug: `stack-${i + 1}`.toLowerCase(),
    name: `Tool Stack ${i + 1}`,
    stack_type: stackTypes[i % stackTypes.length],
    tool_count: Math.floor(Math.random() * 10) + 2,
    domains: DOMAINS.slice(0, Math.floor(Math.random() * 3) + 1),
    effectiveness: (Math.random() * 0.5 + 0.5).toFixed(2),
    use_cases: Math.floor(Math.random() * 20) + 1,
    created_at: new Date(2024, Math.floor(i/23), (i % 28) + 1).toISOString().split('T')[0]
  };
});

// Generate mind-tool mappings (Cognitive Engine)
export const MOCK_MIND_TOOL_MAPPINGS = Array.from({ length: 156 }, (_, i) => {
  const mappingTypes = ['preference', 'proficiency', 'availability', 'relevance'];
  return {
    id: `mapping-${i + 1}`,
    mind_id: `mind-${(i % 42) + 1}`,
    tool_id: `tool-${(i % 310) + 1}`,
    tool_name: MOCK_TOOLS[i % MOCK_TOOLS.length].name,
    mapping_type: mappingTypes[i % mappingTypes.length],
    score: (Math.random() * 0.5 + 0.5).toFixed(2),
    usage_count: Math.floor(Math.random() * 100),
    last_used: new Date(2024, Math.floor(i/52), (i % 28) + 1).toISOString().split('T')[0]
  };
});

// Generate assessment profiles (Cognitive Engine)
export const MOCK_ASSESSMENT_PROFILES = Array.from({ length: 112 }, (_, i) => {
  return {
    id: `profile-${i + 1}`,
    mind_id: `mind-${(i % 42) + 1}`,
    assessment_system: MAPPING_SYSTEM_NAMES[i % MAPPING_SYSTEM_NAMES.length],
    profile_name: `Profile ${i + 1}`,
    completed_at: new Date(2024, Math.floor(i/37), (i % 28) + 1).toISOString().split('T')[0],
    result_summary: `${Math.floor(Math.random() * 5) + 1} primary traits`,
    confidence_level: ['high', 'medium', 'low'][i % 3],
    dimensions_mapped: Math.floor(Math.random() * 8) + 1
  };
});

// Generate system convergence (Cognitive Engine)
export const MOCK_SYSTEM_CONVERGENCE = Array.from({ length: 45 }, (_, i) => {
  const system1 = MAPPING_SYSTEM_NAMES[i % MAPPING_SYSTEM_NAMES.length];
  const system2 = MAPPING_SYSTEM_NAMES[(i + 2) % MAPPING_SYSTEM_NAMES.length];
  return {
    id: `convergence-${i + 1}`,
    system1_name: system1,
    system2_name: system2,
    convergence_percentage: Math.floor(Math.random() * 60) + 20,
    shared_dimensions: Math.floor(Math.random() * 6) + 1,
    validation_studies: Math.floor(Math.random() * 15) + 1,
    research_notes: `Convergence analysis between ${system1} and ${system2}`,
    last_updated: new Date(2024, Math.floor(i/15), (i % 28) + 1).toISOString().split('T')[0]
  };
});

// Generate jobs queue (Operations)
const JOB_TYPES = ['mind_creation', 'data_processing', 'system_sync', 'validation', 'export'];
export const MOCK_JOBS_QUEUE = Array.from({ length: 84 }, (_, i) => {
  const statusList = ['pending', 'running', 'completed', 'failed', 'queued'];
  const typeIndex = i % JOB_TYPES.length;
  return {
    id: `job-${i + 1}`,
    job_type: JOB_TYPES[typeIndex],
    status: statusList[Math.floor(i / 17)],
    resource_id: `res-${(i % 42) + 1}`,
    created_at: new Date(2024, Math.floor(i/28), (i % 28) + 1).toISOString().split('T')[0],
    started_at: Math.random() > 0.3 ? new Date(2024, Math.floor(i/28), (i % 28) + 1).toISOString().split('T')[0] : null,
    completed_at: Math.random() > 0.6 ? new Date(2024, Math.floor((i+1)/28), (i % 28) + 1).toISOString().split('T')[0] : null,
    progress_percentage: statusList[Math.floor(i / 17)] === 'running' ? Math.floor(Math.random() * 100) : (statusList[Math.floor(i / 17)] === 'completed' ? 100 : 0)
  };
});

// Generate knowledge tiers (Operations)
const TIER_NAMES = ['Foundation', 'Intermediate', 'Advanced', 'Expert', 'Master'];
export const MOCK_KNOWLEDGE_TIERS = Array.from({ length: 5 }, (_, i) => {
  return {
    id: `tier-${i + 1}`,
    tier_level: i + 1,
    tier_name: TIER_NAMES[i],
    description: `Knowledge tier level ${i + 1}: ${TIER_NAMES[i]} practitioners`,
    minds_at_tier: Math.floor(Math.random() * 20) + 1,
    tools_mastered_min: i * 10 + 5,
    tools_mastered_max: (i + 1) * 10 + 5,
    average_completion: Math.floor(Math.random() * 100),
    resources_available: Math.floor(Math.random() * 50) + 10,
    estimated_hours: Math.floor(Math.random() * 200) + 50
  };
});

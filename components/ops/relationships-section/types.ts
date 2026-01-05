// =============================================================================
// RELATIONSHIPS SECTION TYPES
// =============================================================================

// Re-export from data for convenience
export type {
  // Correlation metric type
} from '../data/relationships-content';

// Helper type for correlation color
export interface CorrelationColorConfig {
  color: string;
  bg: string;
}

// Props for organisms
export interface DefinitionCardProps {
  title: string;
  definition: string;
  importance: string[];
}

export interface CorrelationMetricsCardProps {
  title: string;
  desc: string;
  metrics: Array<{
    metric: string;
    symbol: string;
    range: string;
    desc: string;
    interpretation: string;
    color: string;
  }>;
  qualityTiers: Array<{
    tier: string;
    label: string;
    criteria: string;
    color: string;
    desc: string;
  }>;
}

export interface StatisticalGuideCardProps {
  title: string;
  desc: string;
  strengthLevels: Array<{
    range: string;
    label: string;
    desc: string;
    color: string;
    example: string;
  }>;
  directionExplanation: Array<{
    type: string;
    symbol: string;
    desc: string;
    example: string;
    color: string;
  }>;
  caveats: string[];
}

export interface RelationshipTypesCardProps {
  title: string;
  desc: string;
  types: Array<{
    type: string;
    label: string;
    symbol: string;
    desc: string;
    example: string;
    useCase: string;
    color: string;
  }>;
}

export interface CorrelationMatrixCardProps {
  title: string;
  desc: string;
  drivers: Array<{
    slug: string;
    abbrev: string;
    name: string;
  }>;
  matrix: number[][];
}

export interface ExampleRelationshipsCardProps {
  title: string;
  desc: string;
  examples: Array<{
    driverA: string;
    driverB: string;
    r: number;
    type: string;
    k: number;
    n: number;
    qualityTier: string;
    ci: number[];
    doi: string;
    interpretation: string;
  }>;
}

export interface DriverClustersCardProps {
  title: string;
  desc: string;
  clusters: Array<{
    id: string;
    name: string;
    color: string;
    coreDriver: string;
    drivers: Array<{
      slug: string;
      strength?: number;
      r?: number;
    }>;
    description: string;
  }>;
  interClusterRelations: Array<{
    from: string;
    to: string;
    r: number;
    type: string;
    desc: string;
  }>;
  networkDiagram: string;
}

export interface InferenceUseCasesCardProps {
  title: string;
  desc: string;
  useCases: Array<{
    name: string;
    icon: string;
    desc: string;
    example: string;
    formula: string;
    weight: number;
  }>;
  confidenceAdjustments: Array<{
    source: string;
    baseConfidence: number;
    desc: string;
  }>;
}

export interface SchemaCardProps {
  title: string;
  desc: string;
  columns: Array<{
    name: string;
    type: string;
    pk: boolean;
    desc: string;
  }>;
  constraints: Array<{
    name: string;
    type: string;
    target: string;
  }>;
  indexes: Array<{
    name: string;
    columns: string;
    reason: string;
  }>;
}

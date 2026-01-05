import type { OpsStats } from '@/hooks/useOpsStats';
import type {
  ModuleStats,
  CriticalGap,
  FieldGap,
  EnumInfo,
  CheckConstraint,
} from '../types';
import { OpsTableStatus } from '../../ops-tokens';

// =============================================================================
// HELPERS
// =============================================================================

export function calculateStatus(count: number, threshold: number = 0): OpsTableStatus {
  if (count === 0) return 'empty';
  if (count < threshold) return 'partial';
  return 'ok';
}

// =============================================================================
// MODULE DEFINITIONS
// =============================================================================

export function getModules(stats: OpsStats): ModuleStats[] {
  return [
    {
      title: 'Core',
      icon: 'user',
      description: 'Registro central de minds',
      tables: [
        { name: 'minds', records: stats.minds, status: calculateStatus(stats.minds, 1), description: 'Clone cognitivo central', fields: 12 },
        { name: 'tags', records: stats.tags, status: calculateStatus(stats.tags, 1), description: 'Tags genericas', fields: 3 },
        { name: 'mind_tags', records: stats.mindTags, status: calculateStatus(stats.mindTags, 1), description: 'Junction M:N', fields: 2 }
      ]
    },
    {
      title: 'Drivers',
      icon: 'bolt',
      description: 'Caracteristicas psicologicas (traits, beliefs, values)',
      tables: [
        { name: 'drivers', records: stats.drivers, status: calculateStatus(stats.drivers, 800), description: '80% completo - gaps em domain/spectrum', fields: 17 },
        { name: 'driver_relationships', records: stats.driverRels, status: calculateStatus(stats.driverRels, 100), description: 'Correlacoes cientificas (r, CI, k)', fields: 7 },
        { name: 'mind_drivers', records: stats.mindDrivers, status: calculateStatus(stats.mindDrivers, 1), description: 'Drivers por mind - CRITICO', fields: 11 },
        { name: 'miu_driver_evidence', records: stats.miuDriverEvidence, status: calculateStatus(stats.miuDriverEvidence, 1), description: 'Rastreabilidade MIU para Driver', fields: 6 }
      ]
    },
    {
      title: 'Mapping Systems',
      icon: 'chart-pie',
      description: 'Big Five, MBTI, DISC, Enneagram, etc.',
      tables: [
        { name: 'mapping_systems', records: stats.systems, status: calculateStatus(stats.systems, 5), description: 'Sistemas de assessment', fields: 26 },
        { name: 'system_components', records: stats.systemComponents, status: calculateStatus(stats.systemComponents, 50), description: 'Dimensoes/facetas', fields: 12 },
        { name: 'component_driver_map', records: stats.compMaps, status: calculateStatus(stats.compMaps, 100), description: '~60% sistemas mapeados', fields: 5 },
        { name: 'mind_system_mappings', records: stats.mindSystemMappings, status: calculateStatus(stats.mindSystemMappings, 1), description: 'Resultados assessment', fields: 10 },
        { name: 'mind_component_scores', records: stats.mindComponentScores, status: calculateStatus(stats.mindComponentScores, 1), description: 'Scores por componente - CRITICO', fields: 12 }
      ]
    },
    {
      title: 'Tools',
      icon: 'tools',
      description: 'Artefatos cognitivos (frameworks, mental models)',
      tables: [
        { name: 'tools', records: stats.tools, status: calculateStatus(stats.tools, 50), description: 'Gaps em question/when_to_use', fields: 37 },
        { name: 'tool_relations', records: stats.toolRels, status: calculateStatus(stats.toolRels, 10), description: 'Hierarquia (derived_from)', fields: 6 },
        { name: 'tool_driver_affinities', records: stats.toolAffinities, status: calculateStatus(stats.toolAffinities, 1), description: 'A PONTE tools-drivers', fields: 10 },
        { name: 'mind_tools', records: stats.mindTools, status: calculateStatus(stats.mindTools, 1), description: 'Ferramentas por mind', fields: 9 }
      ]
    },
    {
      title: 'Mind Mappings',
      icon: 'brain',
      description: 'Psicometrics e scores',
      tables: [
        { name: 'mind_psychometrics', records: stats.mindPsychometrics, status: calculateStatus(stats.mindPsychometrics, 1), description: 'Scores JSONB (legado)', fields: 5 }
      ]
    },
    {
      title: 'Creator OS',
      icon: 'folder',
      description: 'Projetos e conteudos',
      tables: [
        { name: 'content_projects', records: stats.projects, status: calculateStatus(stats.projects, 1), description: 'Cursos, ebooks, series', fields: 12 },
        { name: 'project_minds', records: stats.projectMinds, status: calculateStatus(stats.projectMinds, 1), description: 'Junction M:N com role', fields: 5 },
        { name: 'audience_profiles', records: stats.audienceProfiles, status: calculateStatus(stats.audienceProfiles, 1), description: 'Perfis de audiencia', fields: 9 },
        { name: 'contents', records: stats.contents, status: calculateStatus(stats.contents, 10), description: 'Conteudo universal', fields: 17 },
        { name: 'content_minds', records: stats.contentMinds, status: calculateStatus(stats.contentMinds, 1), description: 'Junction M:N', fields: 3 },
        { name: 'content_tags', records: stats.contentTags, status: calculateStatus(stats.contentTags, 1), description: 'Junction M:N', fields: 2 }
      ]
    },
    {
      title: 'Fragments',
      icon: 'puzzle',
      description: 'Chunks de conhecimento extraidos',
      tables: [
        { name: 'fragments', records: stats.fragments, status: calculateStatus(stats.fragments, 10), description: 'Chunks com FTS', fields: 14 },
        { name: 'fragment_relationships', records: stats.fragmentRels, status: calculateStatus(stats.fragmentRels, 1), description: 'Conexoes entre fragments', fields: 8 }
      ]
    },
    {
      title: 'Operations',
      icon: 'cog',
      description: 'Jobs, filas, rastreamento',
      tables: [
        { name: 'job_executions', records: stats.jobExecutions, status: calculateStatus(stats.jobExecutions, 1), description: 'Jobs LLM (tokens, cost)', fields: 14 },
        { name: 'ingestion_batches', records: stats.ingestionBatches, status: calculateStatus(stats.ingestionBatches, 1), description: 'Lotes de ingestao', fields: 5 },
        { name: 'processing_queue', records: stats.processingQueue, status: calculateStatus(stats.processingQueue, 1), description: 'Fila de tarefas', fields: 11 },
        { name: 'user_profiles', records: stats.userProfiles, status: calculateStatus(stats.userProfiles, 1), description: 'Usuarios autenticados', fields: 5 }
      ]
    }
  ];
}

// =============================================================================
// STATIC DATA
// =============================================================================

export const CRITICAL_GAPS: CriticalGap[] = [
  { table: 'tool_driver_affinities', impact: 'Bloqueia recomendacao de tools', solution: 'Popular ~500-1000 affinities conectando 305 tools com drivers', priority: 'P0' },
  { table: 'mind_drivers', impact: 'Bloqueia perfil psicologico', solution: 'Inferir de MIUs ou manual', priority: 'P0' },
  { table: 'mind_component_scores', impact: 'Bloqueia scores Big Five/MBTI', solution: 'Derivar de mind_drivers + component_driver_map', priority: 'P0' },
  { table: 'miu_driver_evidence', impact: 'Sem rastreabilidade MIU para Driver', solution: 'Criar tabela junction + popular', priority: 'P1' }
];

export const DRIVER_FIELD_GAPS: FieldGap[] = [
  { field: 'domain', filled: 763, missing: 182, pct: 81 },
  { field: 'spectrum_low', filled: 395, missing: 550, pct: 42 },
  { field: 'spectrum_high', filled: 713, missing: 232, pct: 75 },
  { field: 'indicators', filled: 852, missing: 93, pct: 90 }
];

export const TOOL_FIELD_GAPS: FieldGap[] = [
  { field: 'question_answered', filled: 215, missing: 90, pct: 70 },
  { field: 'when_to_use', filled: 213, missing: 92, pct: 70 },
  { field: 'axis_prescriptive', filled: 250, missing: 55, pct: 82 }
];

export const VIEWS: string[] = [
  'v_batch_costs', 'v_clustering_matrix', 'v_collected_contents', 'v_content_counts_by_category',
  'v_content_counts_by_project', 'v_content_hierarchy', 'v_contents_with_creators', 'v_cost_per_fragment',
  'v_courses_with_instructor', 'v_dashboard_stats', 'v_generated_contents', 'v_generation_costs',
  'v_mind_complete_profile', 'v_mind_content_stats', 'v_mind_portfolio', 'v_multi_mind_contents',
  'v_project_performance', 'v_projects_all_instructors', 'v_recent_activities', 'v_recent_contents',
  'v_system_measures_drivers', 'v_tools_by_lineage'
];

export const ENUMS: EnumInfo[] = [
  { name: 'tool_type_enum', values: ['mental_model', 'heuristic', 'principle', 'worldview', 'bias', 'framework', 'methodology', 'protocol', 'checklist', 'technique'] },
  { name: 'affinity_type_enum', values: ['enables', 'requires', 'conflicts', 'develops'] },
  { name: 'evidence_level_enum', values: ['A', 'B', 'C', 'anecdotal', 'unknown'] },
  { name: 'historical_era_enum', values: ['ancient', 'medieval', 'renaissance', 'enlightenment', 'industrial', 'early_20th', 'mid_20th', 'late_20th', 'early_21st', 'contemporary'] }
];

export const CHECK_CONSTRAINTS: CheckConstraint[] = [
  { table: 'minds', field: 'privacy_level', values: "'public', 'private'" },
  { table: 'contents', field: 'status', values: "'draft', 'reviewed', 'published', 'archived'" },
  { table: 'mind_drivers', field: 'strength', values: '1 - 10' },
  { table: 'mind_component_scores', field: 'confidence', values: '1 - 100' },
  { table: 'tools', field: 'quality_score', values: '0 - 10' },
  { table: 'tool_driver_affinities', field: 'strength', values: '-1.0 - 1.0' }
];

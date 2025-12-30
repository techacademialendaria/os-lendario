import React, { useState } from 'react';
import { Section } from '../../../types';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../ui/tabs';
import { Icon } from '../../ui/icon';
import { Button } from '../../ui/button';
import { cn } from '../../../lib/utils';
import OpsTopbar from '../OpsTopbar';
import { useOpsStats, OpsStats } from '../../../hooks/useOpsStats';
import { useSchema, DbPolicy } from '../../../hooks/useSchema';
import {
  OPS_PRIMARY,
  OPS_ACCENT,
  OPS_CARD_CLASSES,
  getTableStatusColors,
  OpsTableStatus,
  OPS_KPI_CLASSES
} from '../ops-tokens';

interface OpsSchemaTemplateProps {
  setSection: (s: Section) => void;
}

// =============================================================================
// TYPES
// =============================================================================

interface TableInfo {
  name: string;
  records: number | string;
  status: OpsTableStatus;
  description: string;
  fields?: number;
}

interface ModuleStats {
  title: string;
  icon: string;
  description: string;
  tables: TableInfo[];
}

// =============================================================================
// HELPERS
// =============================================================================

function calculateStatus(count: number, threshold: number = 0): OpsTableStatus {
  if (count === 0) return 'empty';
  if (count < threshold) return 'partial';
  return 'ok';
}

function getModules(stats: OpsStats): ModuleStats[] {
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

const CRITICAL_GAPS = [
  { table: 'tool_driver_affinities', impact: 'Bloqueia recomendacao de tools', solution: 'Popular ~500-1000 affinities conectando 305 tools com drivers', priority: 'P0' },
  { table: 'mind_drivers', impact: 'Bloqueia perfil psicologico', solution: 'Inferir de MIUs ou manual', priority: 'P0' },
  { table: 'mind_component_scores', impact: 'Bloqueia scores Big Five/MBTI', solution: 'Derivar de mind_drivers + component_driver_map', priority: 'P0' },
  { table: 'miu_driver_evidence', impact: 'Sem rastreabilidade MIU para Driver', solution: 'Criar tabela junction + popular', priority: 'P1' }
];

const GAPS = [
  { field: 'domain', filled: 763, missing: 182, pct: 81 },
  { field: 'spectrum_low', filled: 395, missing: 550, pct: 42 },
  { field: 'spectrum_high', filled: 713, missing: 232, pct: 75 },
  { field: 'indicators', filled: 852, missing: 93, pct: 90 }
];

const TOOL_GAPS = [
  { field: 'question_answered', filled: 215, missing: 90, pct: 70 },
  { field: 'when_to_use', filled: 213, missing: 92, pct: 70 },
  { field: 'axis_prescriptive', filled: 250, missing: 55, pct: 82 }
];

const VIEWS = [
  'v_batch_costs', 'v_clustering_matrix', 'v_collected_contents', 'v_content_counts_by_category',
  'v_content_counts_by_project', 'v_content_hierarchy', 'v_contents_with_creators', 'v_cost_per_fragment',
  'v_courses_with_instructor', 'v_dashboard_stats', 'v_generated_contents', 'v_generation_costs',
  'v_mind_complete_profile', 'v_mind_content_stats', 'v_mind_portfolio', 'v_multi_mind_contents',
  'v_project_performance', 'v_projects_all_instructors', 'v_recent_activities', 'v_recent_contents',
  'v_system_measures_drivers', 'v_tools_by_lineage'
];

const ENUMS = [
  { name: 'tool_type_enum', values: ['mental_model', 'heuristic', 'principle', 'worldview', 'bias', 'framework', 'methodology', 'protocol', 'checklist', 'technique'] },
  { name: 'affinity_type_enum', values: ['enables', 'requires', 'conflicts', 'develops'] },
  { name: 'evidence_level_enum', values: ['A', 'B', 'C', 'anecdotal', 'unknown'] },
  { name: 'historical_era_enum', values: ['ancient', 'medieval', 'renaissance', 'enlightenment', 'industrial', 'early_20th', 'mid_20th', 'late_20th', 'early_21st', 'contemporary'] }
];

// =============================================================================
// SUB-COMPONENTS
// =============================================================================

const StatCard: React.FC<{ number: number | string; label: string; icon: string; critical?: boolean }> = ({ number, label, icon, critical }) => (
  <Card className={cn(OPS_KPI_CLASSES, critical && "border-red-500/30 ring-1 ring-red-500/20")}>
    <CardContent className="p-4 flex items-start justify-between">
      <div>
        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">{label}</p>
        <h3 className={cn("text-2xl font-mono font-bold", critical ? "text-red-400" : "text-foreground")}>{number}</h3>
      </div>
      <div className="w-9 h-9 rounded-lg flex items-center justify-center backdrop-blur-sm"
        style={{ backgroundColor: critical ? 'rgba(239,68,68,0.1)' : `${OPS_PRIMARY}20`, color: critical ? '#f87171' : OPS_PRIMARY }}>
        <Icon name={icon} size="size-4" />
      </div>
    </CardContent>
  </Card>
);

const StatusBadge: React.FC<{ status: OpsTableStatus }> = ({ status }) => {
  const config = getTableStatusColors(status);
  const labels = { ok: 'OK', partial: 'PARCIAL', empty: 'VAZIO', proposed: 'PROPOSTO' };
  return (
    <Badge className={cn(config.bg, config.text, config.border, "border text-[10px] uppercase tracking-wider shadow-sm")}>
      <span className={cn("w-1.5 h-1.5 rounded-full mr-1.5 animate-pulse", config.dot)} />
      {labels[status]}
    </Badge>
  );
};

const ModuleCard: React.FC<{ module: ModuleStats }> = ({ module }) => (
  <Card className={OPS_CARD_CLASSES}>
    <CardHeader className="border-b border-border/40 pb-3 bg-muted/5">
      <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
        <Icon name={module.icon} size="size-4" className="text-muted-foreground/70" />
        {module.title}
        <span className="ml-auto text-xs font-normal normal-case opacity-50">{module.tables.length} tabelas</span>
      </CardTitle>
    </CardHeader>
    <CardContent className="p-0">
      <table className="w-full text-sm">
        <tbody>
          {module.tables.map((table, i) => (
            <tr key={i} className="border-b border-border/10 last:border-0 hover:bg-muted/10 transition-colors">
              <td className="py-3 px-4">
                <code className="text-xs font-mono font-medium text-foreground/90">{table.name}</code>
              </td>
              <td className="py-3 px-4 font-mono text-right text-muted-foreground/80">{table.records}</td>
              <td className="py-3 px-4 text-right"><StatusBadge status={table.status} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </CardContent>
  </Card>
);

const ProgressBar: React.FC<{ pct: number; label: string }> = ({ pct, label }) => (
  <div className="flex items-center gap-3">
    <span className="text-sm text-foreground w-32">{label}</span>
    <div className="flex-1 h-2 bg-muted/30 rounded-full overflow-hidden">
      <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: pct >= 80 ? '#10b981' : pct >= 50 ? '#f59e0b' : '#ef4444' }} />
    </div>
    <span className="text-sm font-mono w-12 text-right">{pct}%</span>
  </div>
);

// =============================================================================
// MAIN COMPONENT
// =============================================================================

const OpsSchemaTemplate: React.FC<OpsSchemaTemplateProps> = ({ setSection }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const { stats, loading, refetch } = useOpsStats();
  const { tables: schemaTables, policies, loading: schemaLoading } = useSchema();
  const modules = getModules(stats);

  const criticalIssues = [
    stats.mindDrivers === 0,
    stats.mindComponentScores === 0,
    stats.toolAffinities === 0
  ].filter(Boolean).length;

  return (
    <div className="flex flex-col min-h-screen bg-background font-sans">
      <OpsTopbar currentSection={Section.STUDIO_OPS_SCHEMA} setSection={setSection} />

      <main className="flex-1 w-full max-w-[1400px] mx-auto p-6 md:p-12">
        <div className="space-y-6 animate-fade-in">

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-2xl font-bold text-foreground">Database Health</h1>
                <Badge variant="outline" className="border-border bg-muted/20 font-mono text-xs">
                  v3.0 Live
                </Badge>
              </div>
              <p className="text-muted-foreground text-sm flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Monitoring {stats.tables} tables • Last updated {stats.lastUpdated}
              </p>
            </div>
            <div className="flex items-center gap-3">
              {criticalIssues > 0 && (
                <Badge variant="destructive" className="animate-pulse shadow-lg shadow-red-500/20">
                  {criticalIssues} Critical Gaps
                </Badge>
              )}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => refetch()}
                disabled={loading}
                className="h-9 w-9"
                title="Refresh Data"
              >
                <Icon name={loading ? "loader" : "refresh-cw"} size="size-4" className={loading ? "animate-spin" : ""} />
              </Button>
            </div>
          </div>

          {/* KPI Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            <StatCard number={stats.drivers} label="Drivers" icon="bolt" />
            <StatCard number={stats.tools} label="Tools" icon="tools" />
            <StatCard number={stats.driverRels + stats.toolRels + stats.fragmentRels} label="Total Rels" icon="link" />
            <StatCard number={stats.systems} label="Systems" icon="chart-pie" />
            <StatCard number={stats.toolAffinities} label="Affinities" icon="bridge" critical={stats.toolAffinities === 0} />
            <StatCard number={stats.mindDrivers} label="Mind Drivers" icon="brain" critical={stats.mindDrivers === 0} />
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="bg-transparent p-0 h-auto gap-2 flex-wrap">
              {[
                { value: 'overview', label: 'Overview', icon: 'grid' },
                { value: 'modules', label: 'Modules', icon: 'layer-group' },
                { value: 'gaps', label: 'Gaps', icon: 'warning' },
                { value: 'policies', label: 'RLS Policies', icon: 'shield-check' },
                { value: 'enums', label: 'Enums & Views', icon: 'list' }
              ].map((tab) => (
                <TabsTrigger key={tab.value} value={tab.value} className={cn(
                  "rounded-lg px-4 py-2 font-medium bg-muted/30 data-[state=active]:bg-primary/10 data-[state=active]:text-primary border border-transparent data-[state=active]:border-primary/20",
                  tab.value === 'gaps' && "data-[state=active]:bg-red-500/10 data-[state=active]:text-red-400"
                )}>
                  <Icon name={tab.icon} size="size-4" className="mr-2" />
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1 space-y-6">
                  {/* Critical Paths First */}
                  <ModuleCard module={modules[1]} /> {/* Drivers */}
                  <ModuleCard module={modules[3]} /> {/* Tools */}
                </div>
                <div className="lg:col-span-1 space-y-6">
                  <ModuleCard module={modules[2]} /> {/* Mapping */}
                  <ModuleCard module={modules[4]} /> {/* Mind Mappings */}
                </div>
                <div className="lg:col-span-1 space-y-6">
                  <ModuleCard module={modules[6]} /> {/* Fragments */}
                  <ModuleCard module={modules[5]} /> {/* Creator OS */}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="modules" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {modules.map((module, i) => (
                  <ModuleCard key={i} module={module} />
                ))}
              </div>
            </TabsContent>

            {/* Gaps */}
            <TabsContent value="gaps" className="space-y-6">
              <Card className={OPS_CARD_CLASSES} style={{ borderColor: 'rgba(239,68,68,0.3)' }}>
                <CardHeader className="border-b border-red-500/20 pb-3">
                  <CardTitle className="text-sm font-bold uppercase tracking-widest text-red-400">
                    Critical Gaps - Blocking Pipeline
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border/50">
                        <th className="text-left py-3 px-4 text-xs font-bold text-red-400 uppercase">Tabela</th>
                        <th className="text-left py-3 px-4 text-xs font-bold text-muted-foreground uppercase hidden md:table-cell">Impacto</th>
                        <th className="text-left py-3 px-4 text-xs font-bold text-muted-foreground uppercase hidden lg:table-cell">Solucao</th>
                        <th className="text-left py-3 px-4 text-xs font-bold text-muted-foreground uppercase">P</th>
                      </tr>
                    </thead>
                    <tbody>
                      {CRITICAL_GAPS.map((gap, i) => (
                        <tr key={i} className="border-b border-border/30 hover:bg-muted/30">
                          <td className="py-3 px-4"><code className="text-xs font-mono text-red-400">{gap.table}</code></td>
                          <td className="py-3 px-4 text-muted-foreground text-xs hidden md:table-cell">{gap.impact}</td>
                          <td className="py-3 px-4 text-muted-foreground text-xs hidden lg:table-cell">{gap.solution}</td>
                          <td className="py-3 px-4">
                            <Badge className={gap.priority === 'P0' ? 'bg-red-500/20 text-red-400' : 'bg-amber-500/20 text-amber-400'}>{gap.priority}</Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className={OPS_CARD_CLASSES}>
                  <CardHeader className="border-b border-border/50 pb-3">
                    <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
                      drivers (849 total) - Field Completeness
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4 space-y-3">
                    {GAPS.map((gap, i) => (
                      <ProgressBar key={i} label={gap.field} pct={gap.pct} />
                    ))}
                  </CardContent>
                </Card>

                <Card className={OPS_CARD_CLASSES}>
                  <CardHeader className="border-b border-border/50 pb-3">
                    <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
                      tools (200 total) - Field Completeness
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4 space-y-3">
                    {TOOL_GAPS.map((gap, i) => (
                      <ProgressBar key={i} label={gap.field} pct={gap.pct} />
                    ))}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* RLS Policies */}
            <TabsContent value="policies" className="space-y-6">
              <Card className={OPS_CARD_CLASSES}>
                <CardHeader className="border-b border-border/50 pb-3">
                  <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground flex justify-between items-center">
                    <span>Active Security Policies (RLS)</span>
                    <Badge variant="outline" className="text-[10px] font-mono">
                      {policies.length} Policies Detected
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border/50 bg-muted/5">
                          <th className="text-left py-3 px-4 text-xs font-bold text-muted-foreground uppercase">Table</th>
                          <th className="text-left py-3 px-4 text-xs font-bold text-muted-foreground uppercase">Policy Name</th>
                          <th className="text-left py-3 px-4 text-xs font-bold text-muted-foreground uppercase">Cmd</th>
                          <th className="text-left py-3 px-4 text-xs font-bold text-muted-foreground uppercase">Roles</th>
                          <th className="text-left py-3 px-4 text-xs font-bold text-muted-foreground uppercase hidden lg:table-cell">Using/Check</th>
                          <th className="text-right py-3 px-4 text-xs font-bold text-muted-foreground uppercase">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {policies.length === 0 ? (
                          <tr>
                            <td colSpan={6} className="py-20 text-center text-muted-foreground italic">
                              {schemaLoading ? 'Loading policies...' : 'No RLS policies found in public schema.'}
                            </td>
                          </tr>
                        ) : (
                          policies.map((policy, i) => (
                            <tr key={i} className="border-b border-border/20 last:border-0 hover:bg-muted/10 transition-colors group">
                              <td className="py-3 px-4">
                                <code className="text-xs font-mono text-emerald-400 group-hover:text-emerald-300">{policy.table_name}</code>
                              </td>
                              <td className="py-3 px-4 font-medium text-foreground/90">{policy.policy_name}</td>
                              <td className="py-3 px-4">
                                <Badge variant="secondary" className={cn(
                                  "text-[10px] px-1.5 py-0",
                                  policy.command === 'SELECT' && "bg-blue-500/10 text-blue-400",
                                  policy.command === 'INSERT' && "bg-green-500/10 text-green-400",
                                  policy.command === 'UPDATE' && "bg-amber-500/10 text-amber-400",
                                  policy.command === 'DELETE' && "bg-red-500/10 text-red-400",
                                  policy.command === 'ALL' && "bg-purple-500/10 text-purple-400"
                                )}>
                                  {policy.command}
                                </Badge>
                              </td>
                              <td className="py-3 px-4">
                                <span className="text-xs text-muted-foreground">{policy.roles}</span>
                              </td>
                              <td className="py-3 px-4 hidden lg:table-cell">
                                <div className="space-y-1">
                                  {policy.using_expression && (
                                    <div className="flex gap-2 items-start">
                                      <span className="text-[10px] font-bold text-muted-foreground mt-0.5">USING</span>
                                      <code className="text-[10px] font-mono text-muted-foreground/70 bg-muted/20 px-1 rounded block truncate max-w-[300px]" title={policy.using_expression}>
                                        {policy.using_expression}
                                      </code>
                                    </div>
                                  )}
                                  {policy.with_check_expression && (
                                    <div className="flex gap-2 items-start">
                                      <span className="text-[10px] font-bold text-muted-foreground mt-0.5">CHECK</span>
                                      <code className="text-[10px] font-mono text-muted-foreground/70 bg-muted/20 px-1 rounded block truncate max-w-[300px]" title={policy.with_check_expression}>
                                        {policy.with_check_expression}
                                      </code>
                                    </div>
                                  )}
                                </div>
                              </td>
                              <td className="py-3 px-4 text-right">
                                <Badge className={cn(
                                  "text-[10px] px-2 py-0",
                                  policy.is_enabled ? "bg-emerald-500/10 text-emerald-400" : "bg-muted text-muted-foreground"
                                )}>
                                  {policy.is_enabled ? 'ENABLED' : 'DISABLED'}
                                </Badge>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              {/* Security Best Practices Tip */}
              <div className="p-4 rounded-xl border-l-4 shadow-sm" style={{ borderColor: '#10b981', backgroundColor: 'rgba(16,185,129,0.05)' }}>
                <div className="flex items-start gap-3">
                  <Icon name="info" size="size-4" className="text-emerald-400 mt-1" />
                  <div>
                    <h4 className="text-sm font-bold text-emerald-400 uppercase tracking-widest mb-1">RLS Governance</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Row Level Security (RLS) is active for most tables in MMOS to ensure that users can only access data belonging to their own <code className="text-emerald-400/80">user_id</code>.
                      Tables marked as <strong>ENABLED</strong> enforce these rules at the database engine level, preventing accidental data leakage even if application logic fails.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Enums & Views */}
            <TabsContent value="enums" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className={OPS_CARD_CLASSES}>
                  <CardHeader className="border-b border-border/50 pb-3">
                    <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
                      Enums ({ENUMS.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4 space-y-4">
                    {ENUMS.map((e, i) => (
                      <div key={i}>
                        <p className="text-xs font-bold mb-2 text-foreground/80">{e.name}</p>
                        <div className="flex flex-wrap gap-1">
                          {e.values.map((v, j) => (
                            <span key={j} className="px-2 py-0.5 rounded text-[10px] bg-muted/30 text-muted-foreground border border-border/30">{v}</span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className={OPS_CARD_CLASSES}>
                  <CardHeader className="border-b border-border/50 pb-3">
                    <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
                      Views ({VIEWS.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="grid grid-cols-2 gap-1">
                      {VIEWS.map((v, i) => (
                        <code key={i} className="text-[10px] font-mono text-muted-foreground hover:text-foreground transition-colors cursor-pointer">{v}</code>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className={OPS_CARD_CLASSES}>
                <CardHeader className="border-b border-border/50 pb-3">
                  <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
                    CHECK Constraints (principais)
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
                    {[
                      { table: 'minds', field: 'privacy_level', values: "'public', 'private'" },
                      { table: 'contents', field: 'status', values: "'draft', 'reviewed', 'published', 'archived'" },
                      { table: 'mind_drivers', field: 'strength', values: '1 - 10' },
                      { table: 'mind_component_scores', field: 'confidence', values: '1 - 100' },
                      { table: 'tools', field: 'quality_score', values: '0 - 10' },
                      { table: 'tool_driver_affinities', field: 'strength', values: '-1.0 - 1.0' }
                    ].map((c, i) => (
                      <div key={i} className="p-2 rounded-lg bg-muted/10 border border-border/20">
                        <code className="text-muted-foreground font-semibold">{c.table}.</code>
                        <code className="text-foreground/90 ml-1">{c.field}</code>
                        <p className="text-muted-foreground mt-1 text-[10px] opacity-70">{c.values}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default OpsSchemaTemplate;

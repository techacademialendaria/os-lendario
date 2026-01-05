import type { Section } from '@/types';

// ============================================================
// Props Types
// ============================================================

export interface CourseOverviewProps {
  setSection: (s: Section) => void;
}

// ============================================================
// Pipeline Types
// ============================================================

export type PipelineStageStatus = 'pending' | 'current' | 'completed';

export interface PipelineStage {
  id: string;
  label: string;
  icon: string;
  status: PipelineStageStatus;
}

export interface PipelineStageData {
  hasResearch: boolean;
  hasModules: boolean;
  hasLessons: boolean;
  publishedLessons: number;
  totalLessons: number;
  courseStatus: string;
}

// ============================================================
// Stats Types
// ============================================================

export interface KpiStat {
  label: string;
  value: string | number;
  icon: string;
  detail: string;
  sparkline: string;
}

// ============================================================
// Quick Actions Types
// ============================================================

export interface QuickAction {
  label: string;
  icon: string;
  path: string;
}

// ============================================================
// Pipeline Stage Config
// ============================================================

export const PIPELINE_STAGES_CONFIG: Omit<PipelineStage, 'status'>[] = [
  { id: 'brief', label: 'BRIEFING', icon: 'file-edit' },
  { id: 'research', label: 'PESQUISA', icon: 'search' },
  { id: 'curriculum', label: 'CURRÍCULO', icon: 'list' },
  { id: 'generation', label: 'GERAÇÃO', icon: 'magic-wand' },
  { id: 'validation', label: 'VALIDAÇÃO', icon: 'check-circle' },
  { id: 'production', label: 'PRODUÇÃO', icon: 'video-camera' },
  { id: 'published', label: 'PUBLICADO', icon: 'rocket' },
];

// ============================================================
// Helper: Get Pipeline Stages with Status
// ============================================================

export function getPipelineStages(data: PipelineStageData): PipelineStage[] {
  const { hasResearch, hasModules, hasLessons, publishedLessons, totalLessons, courseStatus } = data;

  let currentIndex = 0;

  if (courseStatus === 'published' || courseStatus === 'completed') {
    currentIndex = 6;
  } else if (courseStatus === 'review' || courseStatus === 'in_review') {
    currentIndex = 5;
  } else if (publishedLessons > 0 && publishedLessons < totalLessons) {
    currentIndex = 5;
  } else if (hasLessons && publishedLessons === 0) {
    currentIndex = 4;
  } else if (hasModules && !hasLessons) {
    currentIndex = 3;
  } else if (hasResearch && !hasModules) {
    currentIndex = 2;
  } else if (hasResearch) {
    currentIndex = 1;
  }

  return PIPELINE_STAGES_CONFIG.map((stage, idx) => ({
    ...stage,
    status:
      idx < currentIndex
        ? 'completed'
        : idx === currentIndex
          ? 'current'
          : 'pending',
  }));
}

// ============================================================
// Helper: Build Quick Actions for Slug
// ============================================================

export function getQuickActions(slug: string): QuickAction[] {
  return [
    { label: 'Editar Brief', icon: 'file-edit', path: `/creator/cursos/${slug}/brief` },
    { label: 'Ver Pesquisa', icon: 'search', path: `/creator/cursos/${slug}/research` },
    { label: 'Editar Currículo', icon: 'list', path: `/creator/cursos/${slug}/curriculo` },
    { label: 'Validação de QA', icon: 'check-circle', path: `/creator/cursos/${slug}/validacao` },
  ];
}

// ============================================================
// Helper: Build KPI Stats
// ============================================================

export function buildKpiStats(data: {
  totalModules: number;
  totalLessons: number;
  publishedLessons: number;
  draftLessons: number;
  researchCount: number;
  avgFidelity: number | null;
  lessonsWithScoreCount: number;
}): KpiStat[] {
  const { totalModules, totalLessons, publishedLessons, draftLessons, researchCount, avgFidelity, lessonsWithScoreCount } = data;

  return [
    {
      label: 'Módulos',
      value: totalModules,
      icon: 'folder',
      detail: totalModules > 0 ? 'Todos com conteúdo' : 'Nenhum criado',
      sparkline: '0,20 10,15 20,25 30,18 40,22 50,10 60,15 70,5 80,10 90,0',
    },
    {
      label: 'Lições',
      value: totalLessons,
      icon: 'play-alt',
      detail: `${publishedLessons} publicadas · ${draftLessons} rascunhos`,
      sparkline: '0,25 10,22 20,20 30,15 40,18 50,12 60,10 70,8 80,5 90,2',
    },
    {
      label: 'Pesquisas',
      value: researchCount,
      icon: 'search',
      detail: 'documentos de apoio',
      sparkline: '0,15 10,15 20,15 30,15 40,15 50,15 60,15 70,15 80,15 90,15',
    },
    {
      label: 'Fidelidade Média',
      value: avgFidelity !== null ? `${Math.round(avgFidelity * 100)}%` : '--',
      icon: 'shield-check',
      detail: lessonsWithScoreCount > 0 ? `${lessonsWithScoreCount} lições avaliadas` : 'sem avaliações',
      sparkline: '0,28 10,25 20,22 30,20 40,15 50,10 60,12 70,8 80,5 90,0',
    },
  ];
}

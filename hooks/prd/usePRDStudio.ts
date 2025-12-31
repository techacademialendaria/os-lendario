/**
 * usePRDProject - Hook for PRD Studio v2 (Simplified Model)
 *
 * Manages the full lifecycle of a PRD project with 5 phases:
 * upload → brief → prd → plan → export
 */

import { useState, useEffect, useCallback, useMemo } from 'react';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';
import type { Database } from '../../types/database';
import {
  PRDProject,
  PRDProjectMetadata,
  PRDPhase,
  PRDRequirement,
  PRDEpic,
  PRDStory,
  PRDFile,
  PRDBrief,
  PRDMetrics,
  PhaseValidation,
  ProjectValidation,
  RequirementCategory,
  RequirementStatus,
  StoryPoints,
  getNextPhase,
  calculateMetrics,
  generateId,
  createRequirement,
  createEpic,
  createStory,
} from '../../types/prd-studio';

// ============================================
// TYPES
// ============================================

interface UsePRDStudioOptions {
  autoSave?: boolean;
  autoSaveDelay?: number;
}

interface UsePRDStudioResult {
  // State
  project: PRDProject | null;
  loading: boolean;
  saving: boolean;
  error: Error | null;

  // Computed
  metrics: PRDMetrics | null;
  validation: ProjectValidation | null;
  canAdvance: boolean;

  // Core actions
  refetch: () => Promise<void>;
  save: () => Promise<boolean>;
  advancePhase: () => Promise<boolean>;
  goToPhase: (phase: PRDPhase) => void;

  // Phase 1: Upload
  updateUploadContent: (content: string) => void;
  addFile: (file: PRDFile) => void;
  removeFile: (fileId: string) => void;

  // Phase 2: Brief
  updateBrief: (updates: Partial<PRDBrief>) => void;

  // Phase 3: Requirements
  addRequirement: (text: string, category: RequirementCategory) => void;
  updateRequirement: (id: string, updates: Partial<PRDRequirement>) => void;
  deleteRequirement: (id: string) => void;
  approveRequirement: (id: string) => void;
  rejectRequirement: (id: string) => void;
  setRequirements: (requirements: PRDRequirement[]) => void;

  // Phase 4: Plan
  addEpic: (title: string, description?: string) => void;
  updateEpic: (id: string, updates: Partial<PRDEpic>) => void;
  deleteEpic: (id: string) => void;
  addStory: (epicId: string, story: Omit<PRDStory, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateStory: (epicId: string, storyId: string, updates: Partial<PRDStory>) => void;
  deleteStory: (epicId: string, storyId: string) => void;
  setEpics: (epics: PRDEpic[]) => void;
  moveStory: (storyId: string, fromEpicId: string, toEpicId: string) => void;
}

// ============================================
// CONSTANTS
// ============================================

const PHASE_ORDER: PRDPhase[] = ['upload', 'brief', 'prd', 'plan', 'export'];

const MIN_UPLOAD_CHARS = 200;
const MIN_BRIEF_CHARS = 50;
const MIN_APPROVED_REQUIREMENTS_PERCENT = 50;

// ============================================
// VALIDATION HELPERS
// ============================================

function validateUpload(project: PRDProject): PhaseValidation {
  const errors: string[] = [];
  const warnings: string[] = [];

  const hasContent = project.uploadContent.length >= MIN_UPLOAD_CHARS;
  const hasFiles = project.files.length > 0;

  if (!hasContent && !hasFiles) {
    errors.push(`Adicione pelo menos ${MIN_UPLOAD_CHARS} caracteres ou faça upload de um arquivo`);
  }

  if (hasContent && project.uploadContent.length < MIN_UPLOAD_CHARS) {
    warnings.push(`Texto curto (${project.uploadContent.length}/${MIN_UPLOAD_CHARS} caracteres)`);
  }

  const completionPercent =
    hasContent || hasFiles
      ? 100
      : Math.min(Math.round((project.uploadContent.length / MIN_UPLOAD_CHARS) * 100), 99);

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    completionPercent,
  };
}

function validateBrief(project: PRDProject): PhaseValidation {
  const errors: string[] = [];
  const warnings: string[] = [];
  const { brief } = project;

  let filledFields = 0;
  const totalFields = 4;

  if (brief.problem.length < MIN_BRIEF_CHARS) {
    errors.push('Problema deve ter pelo menos 50 caracteres');
  } else {
    filledFields++;
  }

  if (brief.solution.length < MIN_BRIEF_CHARS) {
    errors.push('Solução deve ter pelo menos 50 caracteres');
  } else {
    filledFields++;
  }

  if (brief.scopeIn.length === 0) {
    warnings.push('Escopo incluído está vazio');
  } else {
    filledFields++;
  }

  if (brief.scopeOut.length === 0) {
    warnings.push('Escopo excluído está vazio');
  } else {
    filledFields++;
  }

  const completionPercent = Math.round((filledFields / totalFields) * 100);

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    completionPercent,
  };
}

function validatePRD(project: PRDProject): PhaseValidation {
  const errors: string[] = [];
  const warnings: string[] = [];
  const { requirements } = project;

  if (requirements.length === 0) {
    errors.push('Adicione pelo menos um requisito');
    return { isValid: false, errors, warnings, completionPercent: 0 };
  }

  const approved = requirements.filter((r) => r.status === 'approved').length;
  const approvedPercent = Math.round((approved / requirements.length) * 100);

  if (approvedPercent < MIN_APPROVED_REQUIREMENTS_PERCENT) {
    errors.push(
      `Aprove pelo menos ${MIN_APPROVED_REQUIREMENTS_PERCENT}% dos requisitos (atual: ${approvedPercent}%)`
    );
  }

  const mustHave = requirements.filter((r) => r.category === 'must');
  const approvedMust = mustHave.filter((r) => r.status === 'approved').length;

  if (mustHave.length > 0 && approvedMust < mustHave.length) {
    warnings.push(`${mustHave.length - approvedMust} requisito(s) MUST pendente(s)`);
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    completionPercent: approvedPercent,
  };
}

function validatePlan(project: PRDProject): PhaseValidation {
  const errors: string[] = [];
  const warnings: string[] = [];
  const { epics } = project;

  if (epics.length === 0) {
    errors.push('Adicione pelo menos um épico');
    return { isValid: false, errors, warnings, completionPercent: 0 };
  }

  const totalStories = epics.reduce((sum, e) => sum + e.stories.length, 0);

  if (totalStories === 0) {
    errors.push('Adicione pelo menos uma story');
    return { isValid: false, errors, warnings, completionPercent: 25 };
  }

  // Check for stories without points
  const storiesWithoutPoints = epics.flatMap((e) => e.stories.filter((s) => !s.points)).length;

  if (storiesWithoutPoints > 0) {
    warnings.push(`${storiesWithoutPoints} story(ies) sem pontuação`);
  }

  // Check for stories without criteria
  const storiesWithoutCriteria = epics.flatMap((e) =>
    e.stories.filter((s) => s.criteria.length === 0)
  ).length;

  if (storiesWithoutCriteria > 0) {
    warnings.push(`${storiesWithoutCriteria} story(ies) sem critérios de aceite`);
  }

  // Completion based on epics with stories
  const epicsWithStories = epics.filter((e) => e.stories.length > 0).length;
  const completionPercent = Math.round((epicsWithStories / epics.length) * 100);

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    completionPercent,
  };
}

function validateExport(project: PRDProject): PhaseValidation {
  // Export is always valid if we got here
  return {
    isValid: true,
    errors: [],
    warnings: [],
    completionPercent: project.status === 'completed' ? 100 : 0,
  };
}

function validateProject(project: PRDProject): ProjectValidation {
  const upload = validateUpload(project);
  const brief = validateBrief(project);
  const prd = validatePRD(project);
  const plan = validatePlan(project);
  const exportPhase = validateExport(project);

  const currentPhase = project.pipelineStep;
  const currentValidation = {
    upload,
    brief,
    prd,
    plan,
    export: exportPhase,
  }[currentPhase];

  return {
    upload,
    brief,
    prd,
    plan,
    export: exportPhase,
    canAdvance: currentValidation.isValid,
    currentPhase,
    nextPhase: getNextPhase(currentPhase),
  };
}

// ============================================
// MOCK DATA
// ============================================

const MOCK_PROJECT: PRDProject = {
  id: 'mock-v2-1',
  slug: 'app-fitness-v2',
  name: 'App de Fitness (v2)',
  status: 'draft',
  pipelineStep: 'upload',
  files: [],
  uploadContent: '',
  brief: {
    problem: '',
    solution: '',
    scopeIn: '',
    scopeOut: '',
  },
  requirements: [],
  epics: [],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

// ============================================
// DATABASE HELPERS
// ============================================

function projectToMetadata(project: PRDProject): PRDProjectMetadata {
  const metrics = calculateMetrics(project);

  return {
    pipelineStep: project.pipelineStep,
    upload: {
      content: project.uploadContent,
      files: project.files,
      completedAt:
        project.uploadContent.length >= MIN_UPLOAD_CHARS ? new Date().toISOString() : undefined,
    },
    brief: {
      ...project.brief,
      completedAt:
        project.brief.problem && project.brief.solution ? new Date().toISOString() : undefined,
    },
    requirements: project.requirements,
    plan: {
      totalEpics: metrics.totalEpics,
      totalStories: metrics.totalStories,
      totalPoints: metrics.totalPoints,
      completedAt: metrics.totalStories > 0 ? new Date().toISOString() : undefined,
    },
  };
}

function metadataToProject(
  id: string,
  slug: string,
  name: string,
  status: string,
  metadata: PRDProjectMetadata,
  createdAt: string,
  updatedAt: string
): PRDProject {
  return {
    id,
    slug,
    name,
    status: status as PRDProject['status'],
    pipelineStep: metadata.pipelineStep,
    files: metadata.upload?.files || [],
    uploadContent: metadata.upload?.content || '',
    brief: {
      problem: metadata.brief?.problem || '',
      solution: metadata.brief?.solution || '',
      scopeIn: metadata.brief?.scopeIn || '',
      scopeOut: metadata.brief?.scopeOut || '',
    },
    requirements: metadata.requirements || [],
    epics: [], // Loaded separately from contents table
    createdAt,
    updatedAt,
    completedAt: status === 'completed' ? updatedAt : undefined,
  };
}

// ============================================
// MAIN HOOK
// ============================================

export function usePRDStudio(slug: string, options: UsePRDStudioOptions = {}): UsePRDStudioResult {
  const { autoSave = true, autoSaveDelay = 30000 } = options;

  // State
  const [project, setProject] = useState<PRDProject | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [isDirty, setIsDirty] = useState(false);

  // Computed
  const metrics = useMemo(() => (project ? calculateMetrics(project) : null), [project]);

  const validation = useMemo(() => (project ? validateProject(project) : null), [project]);

  const canAdvance = validation?.canAdvance ?? false;

  // ==========================================
  // DATA FETCHING
  // ==========================================

  const fetchProject = useCallback(async () => {
    if (!slug) {
      setProject(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    if (!isSupabaseConfigured()) {
      // Mock mode
      if (slug === 'app-fitness-v2' || slug === MOCK_PROJECT.slug) {
        setProject({ ...MOCK_PROJECT });
      } else {
        setProject(null);
      }
      setLoading(false);
      return;
    }

    try {
      // Fetch project
      const { data: projectData, error: projectError } = await supabase
        .from('content_projects')
        .select('*')
        .eq('slug', slug)
        .eq('project_type', 'prd')
        .single() as { data: Database['public']['Tables']['content_projects']['Row'] | null; error: any };

      if (projectError) {
        if (projectError.code === 'PGRST116') {
          setProject(null);
        } else {
          throw new Error(projectError.message);
        }
        setLoading(false);
        return;
      }

      // Ensure projectData is not null (TypeScript guard)
      if (!projectData) {
        setProject(null);
        setLoading(false);
        return;
      }

      const metadata = (projectData.project_metadata || {}) as unknown as PRDProjectMetadata;

      // Fetch epics and stories from contents table
      const { data: contentsData } = await supabase
        .from('contents')
        .select('*')
        .eq('project_id', projectData.id)
        .in('content_type', ['prd_epic', 'prd_story'])
        .is('deleted_at', null)
        .order('sequence_order');

      // Transform to project structure
      const epics: PRDEpic[] = [];
      const storiesByEpic: Map<string, PRDStory[]> = new Map();

      (contentsData || []).forEach((content: any) => {
        if (content.content_type === 'prd_story') {
          const epicId = content.parent_content_id;
          if (!storiesByEpic.has(epicId)) {
            storiesByEpic.set(epicId, []);
          }
          storiesByEpic.get(epicId)!.push({
            id: content.id,
            title: content.title,
            description: content.content || '',
            criteria: content.metadata?.criteria || [],
            techNotes: content.metadata?.techNotes || '',
            points: content.metadata?.points || 3,
            createdAt: content.created_at,
            updatedAt: content.updated_at,
          });
        }
      });

      (contentsData || []).forEach((content: any) => {
        if (content.content_type === 'prd_epic') {
          epics.push({
            id: content.id,
            title: content.title,
            description: content.content || '',
            stories: storiesByEpic.get(content.id) || [],
            createdAt: content.created_at,
            updatedAt: content.updated_at,
          });
        }
      });

      const fullProject = metadataToProject(
        projectData.id,
        projectData.slug,
        projectData.name,
        projectData.status || 'planning',
        metadata,
        projectData.created_at,
        projectData.updated_at
      );

      fullProject.epics = epics;

      setProject(fullProject);
    } catch (err) {
      console.error('Error fetching PRD project:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch project'));
      setProject(null);
    } finally {
      setLoading(false);
    }
  }, [slug]);

  // Initial fetch
  useEffect(() => {
    fetchProject();
  }, [fetchProject]);

  // ==========================================
  // SAVE
  // ==========================================

  const save = useCallback(async (): Promise<boolean> => {
    if (!project) return false;

    setSaving(true);
    setError(null);

    if (!isSupabaseConfigured()) {
      // Mock save
      setSaving(false);
      setIsDirty(false);
      return true;
    }

    try {
      const metadata = projectToMetadata(project);

      // Update project
      const { error: updateError } = await (supabase
        .from('content_projects') as any)
        .update({
          project_metadata: metadata,
          status: project.status,
          updated_at: new Date().toISOString(),
        })
        .eq('id', project.id);

      if (updateError) throw new Error(updateError.message);

      // Save epics and stories to contents table
      for (const epic of project.epics) {
        // Upsert epic
        const { error: epicError } = await (supabase.from('contents') as any).upsert({
          id: epic.id,
          project_id: project.id,
          slug: epic.title.toLowerCase().replace(/\s+/g, '-'),
          title: epic.title,
          content: epic.description || '',
          content_type: 'prd_epic',
          sequence_order: project.epics.indexOf(epic),
          metadata: {},
          updated_at: new Date().toISOString(),
        });

        if (epicError) console.error('Error saving epic:', epicError);

        // Upsert stories
        for (const story of epic.stories) {
          const { error: storyError } = await (supabase.from('contents') as any).upsert({
            id: story.id,
            project_id: project.id,
            parent_content_id: epic.id,
            slug: story.title.toLowerCase().replace(/\s+/g, '-'),
            title: story.title,
            content: story.description,
            content_type: 'prd_story',
            sequence_order: epic.stories.indexOf(story),
            metadata: {
              criteria: story.criteria,
              techNotes: story.techNotes,
              points: story.points,
            },
            updated_at: new Date().toISOString(),
          });

          if (storyError) console.error('Error saving story:', storyError);
        }
      }

      setIsDirty(false);
      return true;
    } catch (err) {
      console.error('Error saving project:', err);
      setError(err instanceof Error ? err : new Error('Failed to save project'));
      return false;
    } finally {
      setSaving(false);
    }
  }, [project]);

  // Auto-save
  useEffect(() => {
    if (!autoSave || !isDirty || !project) return;

    const timer = setTimeout(() => {
      save();
    }, autoSaveDelay);

    return () => clearTimeout(timer);
  }, [autoSave, autoSaveDelay, isDirty, project, save]);

  // ==========================================
  // PHASE NAVIGATION
  // ==========================================

  const advancePhase = useCallback(async (): Promise<boolean> => {
    if (!project || !canAdvance) return false;

    const nextPhase = getNextPhase(project.pipelineStep);
    if (!nextPhase) return false;

    setProject((prev) =>
      prev
        ? {
            ...prev,
            pipelineStep: nextPhase,
            status: nextPhase === 'export' ? 'completed' : prev.status,
            updatedAt: new Date().toISOString(),
          }
        : null
    );

    setIsDirty(true);

    // Save immediately on phase change
    return save();
  }, [project, canAdvance, save]);

  const goToPhase = useCallback(
    (phase: PRDPhase) => {
      if (!project) return;

      // Only allow going to current or previous phases
      const currentIndex = PHASE_ORDER.indexOf(project.pipelineStep);
      const targetIndex = PHASE_ORDER.indexOf(phase);

      if (targetIndex <= currentIndex) {
        setProject((prev) =>
          prev
            ? {
                ...prev,
                pipelineStep: phase,
                updatedAt: new Date().toISOString(),
              }
            : null
        );
      }
    },
    [project]
  );

  // ==========================================
  // UPDATE HELPERS
  // ==========================================

  const updateProjectField = useCallback(
    <K extends keyof PRDProject>(field: K, value: PRDProject[K]) => {
      setProject((prev) =>
        prev
          ? {
              ...prev,
              [field]: value,
              updatedAt: new Date().toISOString(),
            }
          : null
      );
      setIsDirty(true);
    },
    []
  );

  // ==========================================
  // PHASE 1: UPLOAD
  // ==========================================

  const updateUploadContent = useCallback(
    (content: string) => {
      updateProjectField('uploadContent', content);
    },
    [updateProjectField]
  );

  const addFile = useCallback((file: PRDFile) => {
    setProject((prev) =>
      prev
        ? {
            ...prev,
            files: [...prev.files, file],
            updatedAt: new Date().toISOString(),
          }
        : null
    );
    setIsDirty(true);
  }, []);

  const removeFile = useCallback((fileId: string) => {
    setProject((prev) =>
      prev
        ? {
            ...prev,
            files: prev.files.filter((f) => f.id !== fileId),
            updatedAt: new Date().toISOString(),
          }
        : null
    );
    setIsDirty(true);
  }, []);

  // ==========================================
  // PHASE 2: BRIEF
  // ==========================================

  const updateBrief = useCallback((updates: Partial<PRDBrief>) => {
    setProject((prev) =>
      prev
        ? {
            ...prev,
            brief: { ...prev.brief, ...updates },
            updatedAt: new Date().toISOString(),
          }
        : null
    );
    setIsDirty(true);
  }, []);

  // ==========================================
  // PHASE 3: REQUIREMENTS
  // ==========================================

  const addRequirement = useCallback((text: string, category: RequirementCategory) => {
    const newReq = createRequirement(text, category);
    setProject((prev) =>
      prev
        ? {
            ...prev,
            requirements: [...prev.requirements, newReq],
            updatedAt: new Date().toISOString(),
          }
        : null
    );
    setIsDirty(true);
  }, []);

  const updateRequirement = useCallback((id: string, updates: Partial<PRDRequirement>) => {
    setProject((prev) =>
      prev
        ? {
            ...prev,
            requirements: prev.requirements.map((r) =>
              r.id === id ? { ...r, ...updates, updatedAt: new Date().toISOString() } : r
            ),
            updatedAt: new Date().toISOString(),
          }
        : null
    );
    setIsDirty(true);
  }, []);

  const deleteRequirement = useCallback((id: string) => {
    setProject((prev) =>
      prev
        ? {
            ...prev,
            requirements: prev.requirements.filter((r) => r.id !== id),
            updatedAt: new Date().toISOString(),
          }
        : null
    );
    setIsDirty(true);
  }, []);

  const approveRequirement = useCallback(
    (id: string) => {
      updateRequirement(id, { status: 'approved' });
    },
    [updateRequirement]
  );

  const rejectRequirement = useCallback(
    (id: string) => {
      updateRequirement(id, { status: 'rejected' });
    },
    [updateRequirement]
  );

  const setRequirements = useCallback(
    (requirements: PRDRequirement[]) => {
      updateProjectField('requirements', requirements);
    },
    [updateProjectField]
  );

  // ==========================================
  // PHASE 4: PLAN (EPICS + STORIES)
  // ==========================================

  const addEpic = useCallback((title: string, description?: string) => {
    const newEpic = createEpic(title, description);
    setProject((prev) =>
      prev
        ? {
            ...prev,
            epics: [...prev.epics, newEpic],
            updatedAt: new Date().toISOString(),
          }
        : null
    );
    setIsDirty(true);
  }, []);

  const updateEpic = useCallback((id: string, updates: Partial<PRDEpic>) => {
    setProject((prev) =>
      prev
        ? {
            ...prev,
            epics: prev.epics.map((e) =>
              e.id === id ? { ...e, ...updates, updatedAt: new Date().toISOString() } : e
            ),
            updatedAt: new Date().toISOString(),
          }
        : null
    );
    setIsDirty(true);
  }, []);

  const deleteEpic = useCallback((id: string) => {
    setProject((prev) =>
      prev
        ? {
            ...prev,
            epics: prev.epics.filter((e) => e.id !== id),
            updatedAt: new Date().toISOString(),
          }
        : null
    );
    setIsDirty(true);
  }, []);

  const addStory = useCallback(
    (epicId: string, story: Omit<PRDStory, 'id' | 'createdAt' | 'updatedAt'>) => {
      const newStory = createStory(
        story.title,
        story.description,
        story.criteria,
        story.points,
        story.techNotes
      );

      setProject((prev) =>
        prev
          ? {
              ...prev,
              epics: prev.epics.map((e) =>
                e.id === epicId
                  ? { ...e, stories: [...e.stories, newStory], updatedAt: new Date().toISOString() }
                  : e
              ),
              updatedAt: new Date().toISOString(),
            }
          : null
      );
      setIsDirty(true);
    },
    []
  );

  const updateStory = useCallback((epicId: string, storyId: string, updates: Partial<PRDStory>) => {
    setProject((prev) =>
      prev
        ? {
            ...prev,
            epics: prev.epics.map((e) =>
              e.id === epicId
                ? {
                    ...e,
                    stories: e.stories.map((s) =>
                      s.id === storyId
                        ? { ...s, ...updates, updatedAt: new Date().toISOString() }
                        : s
                    ),
                    updatedAt: new Date().toISOString(),
                  }
                : e
            ),
            updatedAt: new Date().toISOString(),
          }
        : null
    );
    setIsDirty(true);
  }, []);

  const deleteStory = useCallback((epicId: string, storyId: string) => {
    setProject((prev) =>
      prev
        ? {
            ...prev,
            epics: prev.epics.map((e) =>
              e.id === epicId
                ? {
                    ...e,
                    stories: e.stories.filter((s) => s.id !== storyId),
                    updatedAt: new Date().toISOString(),
                  }
                : e
            ),
            updatedAt: new Date().toISOString(),
          }
        : null
    );
    setIsDirty(true);
  }, []);

  const setEpics = useCallback(
    (epics: PRDEpic[]) => {
      updateProjectField('epics', epics);
    },
    [updateProjectField]
  );

  const moveStory = useCallback((storyId: string, fromEpicId: string, toEpicId: string) => {
    setProject((prev) => {
      if (!prev) return null;

      const fromEpic = prev.epics.find((e) => e.id === fromEpicId);
      const story = fromEpic?.stories.find((s) => s.id === storyId);

      if (!story) return prev;

      return {
        ...prev,
        epics: prev.epics.map((e) => {
          if (e.id === fromEpicId) {
            return {
              ...e,
              stories: e.stories.filter((s) => s.id !== storyId),
              updatedAt: new Date().toISOString(),
            };
          }
          if (e.id === toEpicId) {
            return {
              ...e,
              stories: [...e.stories, story],
              updatedAt: new Date().toISOString(),
            };
          }
          return e;
        }),
        updatedAt: new Date().toISOString(),
      };
    });
    setIsDirty(true);
  }, []);

  // ==========================================
  // RETURN
  // ==========================================

  return {
    // State
    project,
    loading,
    saving,
    error,

    // Computed
    metrics,
    validation,
    canAdvance,

    // Core actions
    refetch: fetchProject,
    save,
    advancePhase,
    goToPhase,

    // Phase 1: Upload
    updateUploadContent,
    addFile,
    removeFile,

    // Phase 2: Brief
    updateBrief,

    // Phase 3: Requirements
    addRequirement,
    updateRequirement,
    deleteRequirement,
    approveRequirement,
    rejectRequirement,
    setRequirements,

    // Phase 4: Plan
    addEpic,
    updateEpic,
    deleteEpic,
    addStory,
    updateStory,
    deleteStory,
    setEpics,
    moveStory,
  };
}

export default usePRDStudio;

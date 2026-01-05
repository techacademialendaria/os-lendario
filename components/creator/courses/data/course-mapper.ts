import type { Course as HookCourse } from '../../../../hooks/useCourses';
import type { Course, CoursePipeline } from '../types';

/**
 * Maps a course from the useCourses hook format to the template Course format
 */
export const mapHookCourseToTemplateCourse = (hookCourse: HookCourse): Course => {
  const statusToPipeline = (status: HookCourse['status']): CoursePipeline => {
    const pipelines: Record<HookCourse['status'], CoursePipeline> = {
      planning: {
        brief: 'current',
        research: 'pending',
        curriculum: 'pending',
        lessons: 'pending',
        validation: 'pending',
      },
      brief: {
        brief: 'current',
        research: 'pending',
        curriculum: 'pending',
        lessons: 'pending',
        validation: 'pending',
      },
      research: {
        brief: 'completed',
        research: 'current',
        curriculum: 'pending',
        lessons: 'pending',
        validation: 'pending',
      },
      curriculum: {
        brief: 'completed',
        research: 'completed',
        curriculum: 'current',
        lessons: 'pending',
        validation: 'pending',
      },
      generation: {
        brief: 'completed',
        research: 'completed',
        curriculum: 'completed',
        lessons: 'current',
        validation: 'pending',
      },
      validation: {
        brief: 'completed',
        research: 'completed',
        curriculum: 'completed',
        lessons: 'completed',
        validation: 'current',
      },
      published: {
        brief: 'completed',
        research: 'completed',
        curriculum: 'completed',
        lessons: 'completed',
        validation: 'completed',
      },
    };
    return pipelines[status] || pipelines.planning;
  };

  const getStatusLabel = (status: HookCourse['status']): string => {
    const labels: Record<HookCourse['status'], string> = {
      planning: 'Planejamento',
      brief: 'Brief',
      research: 'Pesquisa',
      curriculum: 'Currículo',
      generation: 'Produzindo',
      validation: 'Validação',
      published: 'Completo',
    };
    return labels[status] || 'Em Progresso';
  };

  const getIconFromSlug = (slug: string): string => {
    const iconMap: Record<string, string> = {
      'claude-code': 'terminal',
      'didatica-lendaria': 'presentation',
      vibecoding: 'magic-wand',
      'supabase-zero-backend': 'database',
      'dominando-obsidian': 'document',
      'metodo-mapa': 'map-marker',
      'meu-clone-ia': 'fingerprint',
      'prompt-engineer': 'comment-alt',
    };
    return iconMap[slug] || 'book';
  };

  const getCategoryFromMetadata = (metadata: HookCourse['metadata']): string => {
    const meta = metadata as Record<string, unknown> | undefined;
    if (meta?.category) return String(meta.category);
    if (meta?.course_type) return String(meta.course_type);
    return 'Geral';
  };

  const getFrameworksFromMetadata = (metadata: HookCourse['metadata']): string[] => {
    const frameworks: string[] = [];
    const meta = metadata as Record<string, unknown> | undefined;
    if (meta?.metodologia) frameworks.push(String(meta.metodologia));
    if (frameworks.length === 0) frameworks.push('GPS');
    return frameworks;
  };

  const contentCounts = hookCourse.contentCounts;

  return {
    id: hookCourse.id,
    title: hookCourse.title,
    slug: hookCourse.slug,
    icon: getIconFromSlug(hookCourse.slug),
    category: getCategoryFromMetadata(hookCourse.metadata),
    instructor: {
      name: hookCourse.instructor,
      avatar: hookCourse.instructorAvatar || 'https://i.pravatar.cc/150?u=' + hookCourse.slug,
      isMMOS: true,
    },
    lessonsCount: contentCounts?.lessons || hookCourse.lessons,
    modulesCount: contentCounts?.modules || hookCourse.modules,
    researchCount: contentCounts?.research || 0,
    assessmentsCount: contentCounts?.assessments || 0,
    duration: hookCourse.duration,
    type: (contentCounts?.research || 0) > 0 ? 'Brownfield' : 'Greenfield',
    frameworks: getFrameworksFromMetadata(hookCourse.metadata),
    fidelityScore: contentCounts?.avgFidelityScore || null,
    statusLabel: getStatusLabel(hookCourse.status),
    progress: hookCourse.progress,
    updatedAt: new Date(hookCourse.updatedAt).toLocaleDateString('pt-BR'),
    pipeline: statusToPipeline(hookCourse.status),
  };
};

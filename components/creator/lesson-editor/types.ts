/**
 * LessonEditor Types
 * Types, interfaces, and configurations for the lesson editor module.
 */

// =============================================================================
// PROPS INTERFACES
// =============================================================================

export interface LessonEditorProps {
  onBack: () => void;
  courseSlug?: string;
  lessonId?: string;
}

export interface EditorHeaderProps {
  lessonId: string;
  status: boolean;
  onBack: () => void;
  onStatusChange: (status: boolean) => void;
}

export interface EditorSidebarProps {
  collapsed: boolean;
  activeTab: 'index' | 'audit';
  modules: CourseModule[];
  aiAudit: AiAuditData;
  onCollapsedChange: (collapsed: boolean) => void;
  onTabChange: (tab: 'index' | 'audit') => void;
}

export interface EditorContentProps {
  title: string;
  script: string;
  activeTab: string;
  onTitleChange: (title: string) => void;
  onScriptChange: (script: string) => void;
  onActiveTabChange: (tab: string) => void;
}

export interface ModuleIndexProps {
  modules: CourseModule[];
}

export interface AuditPanelProps {
  aiAudit: AiAuditData;
}

// =============================================================================
// DATA INTERFACES
// =============================================================================

export interface CourseLesson {
  id: string;
  title: string;
  active: boolean;
}

export interface CourseModule {
  id: number;
  title: string;
  lessons: CourseLesson[];
}

export interface AiAuditMetric {
  label: string;
  score: number;
  status: string;
}

export interface AiAuditData {
  hasAnalysis: boolean;
  overallScore: number | null;
  metrics: AiAuditMetric[];
  suggestions: string[];
}

// =============================================================================
// HOOK RETURN TYPES
// =============================================================================

export interface UseLessonEditorStateReturn {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
  sidebarTab: 'index' | 'audit';
  setSidebarTab: (tab: 'index' | 'audit') => void;
}

export interface UseLessonContentReturn {
  title: string;
  setTitle: (title: string) => void;
  videoUrl: string | null;
  setVideoUrl: (url: string | null) => void;
  script: string;
  setScript: (script: string) => void;
  status: boolean;
  setStatus: (status: boolean) => void;
}

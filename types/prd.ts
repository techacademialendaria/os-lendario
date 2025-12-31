// PRD Studio Types
// Types específicos para PRD Studio usando estrutura existente

import { ContentProject, Content } from './database';

// ============================================
// ENUMS E TIPOS BASE
// ============================================

export type PRDStatus = 'upload' | 'brief' | 'prd' | 'epics' | 'stories' | 'exported';
export type PRDType = 'task' | 'project';
export type Complexity = 'P' | 'M' | 'G';
export type ExportFormat = 'lovable' | 'claude' | 'bolt' | 'cursor' | 'generic';
export type BlindSpotCategory = 'Técnico' | 'Mercado' | 'UX' | 'Viabilidade';
export type RequirementPriority = 'must' | 'should' | 'nice';

// ============================================
// METADATA TYPES (stored in project_metadata JSON)
// ============================================

export interface BlindSpot {
  id: string;
  title: string;
  description: string;
  category: BlindSpotCategory;
  selected: boolean;
}

export interface Research {
  blindSpotId: string;
  content: string;
  sources: string[];
  readConfirmed: boolean;
}

export interface ResearchTopic {
  id: string;
  title: string;
  summary: string;
  content: string;
  sources: string[];
  readingTimeMinutes: number;
  isRead: boolean;
}

export type WOWCategory = 'insight' | 'question' | 'idea' | 'risk';

export interface WOW {
  id: string;
  text: string;
  category: WOWCategory;
  createdAt: string;
}

export type BriefClassification = 'task' | 'project';
export type BriefComplexity = 'low' | 'medium' | 'high';

export interface BriefStructure {
  problem: string;
  solution: string;
  targetAudience: string;
  differentials: string[];
  risks: string[];
  successMetrics: string[];
  classification: BriefClassification;
  estimatedComplexity: BriefComplexity;
}

export interface UploadData {
  content: string;
  audioUrl?: string;
  audioDurationSeconds?: number;
  completedAt?: string;
}

export interface BriefData {
  blindSpots: BlindSpot[];
  research: Research[];
  researchTopics?: ResearchTopic[];
  researchSkipped?: boolean;
  wows: WOW[];
  structure?: BriefStructure;
  superProblem: string;
  solution: string;
  differentials: string[];
  scopeIn: string[];
  scopeOut: { item: string; reason: string }[];
  successMetrics: { metric: string; definition: string; target: string }[];
  completedAt?: string;
}

export interface Objective {
  id: string;
  description: string;
  measurable: boolean;
  approved: boolean;
}

export interface Requirement {
  id: string;
  description: string;
  priority: RequirementPriority;
  approved: boolean;
}

export interface DesignDecisions {
  screens: number;
  userFlow: string;
  colorPalette: string[];
  referenceImages: string[];
}

export interface TechnicalArchitecture {
  stack: string[];
  infrastructure: string;
  integrations: string[];
}

export type PRDSectionStatus = 'incomplete' | 'reviewing' | 'approved';

export interface PRDSection {
  content: string;
  status: PRDSectionStatus;
  lastModified?: string;
  lineCount: number;
}

export interface PRDDocument {
  objectives: PRDSection;
  scope: PRDSection;
  userStories: PRDSection;
  designDecisions: PRDSection;
  requirements: PRDSection;
  architecture: PRDSection;
}

export interface PRDDocumentData {
  objectives: Objective[];
  designDecisions: DesignDecisions;
  functionalRequirements: Requirement[];
  nonFunctionalRequirements: Requirement[];
  technicalArchitecture: TechnicalArchitecture;
  scopeBoundaries: { excluded: string; reason: string }[];
  document?: PRDDocument;
  lineCount: number;
  completedAt?: string;
  // Legacy/flexible fields for PRDDocumentTemplate
  requirements?: { id: string; text: string; status: 'pending' | 'approved' | 'rejected'; category: 'must' | 'should' | 'nice' }[];
  techStack?: { frontend: string; backend: string; ai: string; hosting: string };
  scopeLimits?: string;
  screens?: string;
  vibe?: string;
}

export interface PRDMetrics {
  totalEpics: number;
  totalStories: number;
  completionPercentage: number;
  timeToCompleteHours?: number;
}

// ============================================
// PROJECT METADATA (stored in content_projects.project_metadata)
// ============================================

// Epic structure for project_metadata.epics (flexible storage)
export interface EpicSummary {
  id: string;
  sequence_order: number;
  title: string;
  description?: string;
  storiesCount: number;
  status: string;
  stories: string[];
}

// Story structure for project_metadata.stories (flexible storage)
export interface StorySummary {
  id: string;
  epicId?: string;
  epic_id?: string; // Alternative naming
  sequence_order?: number | null;
  title: string;
  description?: string;
  userStory?: string;
  acceptanceCriteria?: string[];
  criteria?: string[];
  techNotes?: string;
  complexity?: 'P' | 'M' | 'G';
  points?: { effort: number; value: number; risk: number };
  status?: string;
  isValid?: boolean;
}

export interface PRDProjectMetadata {
  prdType: PRDType;
  prdPhase?: PRDStatus; // Current phase in PRD pipeline (upload, brief, prd, epics, stories, exported)
  upload?: UploadData;
  brief?: BriefData;
  prdDocument?: PRDDocumentData;
  metrics?: PRDMetrics;
  epics?: EpicSummary[];
  stories?: StorySummary[];
}

// ============================================
// CONTENT METADATA (stored in contents.metadata)
// ============================================

export interface EpicMetadata {
  objective: string;
  dependencies: string[];
  acceptanceCriteria: string[];
  storiesCount: number;
}

export interface StoryMetadata {
  acceptanceCriteria: string[];
  complexity: Complexity;
  dependencies: string[];
  isValidated: boolean;
}

export interface ExportMetadata {
  format: ExportFormat;
  fileSizeBytes?: number;
}

// ============================================
// TRANSFORMED TYPES (UI-friendly)
// ============================================

// PRD Project with typed metadata
export interface PRDProject extends Omit<ContentProject, 'project_metadata'> {
  project_metadata: PRDProjectMetadata;
}

// Epic from contents table
export interface PRDEpic extends Omit<Content, 'metadata'> {
  metadata: EpicMetadata;
  // Flat properties for UI convenience
  stories?: string[];
  storiesCount?: number;
  description?: string;
}

// Story from contents table
export interface PRDStory extends Omit<Content, 'metadata'> {
  metadata: StoryMetadata;
  // Flat properties for UI convenience (mirrors metadata)
  userStory?: string;
  acceptanceCriteria?: string[];
  complexity?: Complexity;
  epic_id?: string;
}

// Type aliases for backward compatibility
export type EpicData = PRDEpic;
export type StoryData = PRDStory;

// Export from contents table
export interface PRDExport extends Omit<Content, 'metadata'> {
  metadata: ExportMetadata;
}

// Full project with all related data
export interface FullPRDProject extends PRDProject {
  epics: PRDEpic[];
  stories: PRDStory[];
  exports: PRDExport[];
}

// ============================================
// INPUT TYPES
// ============================================

export interface CreatePRDProjectInput {
  name: string;
  prdType: PRDType;
}

export interface UpdateUploadInput {
  content?: string;
  audioUrl?: string;
  audioDurationSeconds?: number;
}

export interface UpdateBriefInput {
  blindSpots?: BlindSpot[];
  research?: Research[];
  researchTopics?: ResearchTopic[];
  researchSkipped?: boolean;
  wows?: WOW[];
  structure?: BriefStructure;
  superProblem?: string;
  solution?: string;
  differentials?: string[];
  scopeIn?: string[];
  scopeOut?: { item: string; reason: string }[];
  successMetrics?: { metric: string; definition: string; target: string }[];
}

export interface CreateEpicInput {
  name: string;
  objective: string;
  dependencies?: string[];
  acceptanceCriteria?: string[];
}

export interface CreateStoryInput {
  epicId: string;
  title: string;
  description?: string;
  acceptanceCriteria?: string[];
  complexity?: Complexity;
  dependencies?: string[];
}

// ============================================
// TRANSFORM FUNCTIONS
// ============================================

/**
 * Transform database ContentProject to PRDProject with correct status mapping.
 *
 * Database uses: 'planning' | 'in_progress' | 'completed'
 * PRD uses: 'upload' | 'brief' | 'prd' | 'epics' | 'stories' | 'exported'
 *
 * The actual PRD phase is stored in project_metadata.prdPhase
 */
export function transformToProject(raw: ContentProject): PRDProject {
  const metadata = (raw.project_metadata as unknown as PRDProjectMetadata) || {
    prdType: 'project' as PRDType,
  };

  // Get PRD phase from metadata, or derive from database status
  let prdStatus: PRDStatus;

  if (metadata.prdPhase) {
    // Use explicit prdPhase if set
    prdStatus = metadata.prdPhase;
  } else if (
    metadata.upload?.completedAt &&
    metadata.brief?.completedAt &&
    metadata.prdDocument?.completedAt
  ) {
    prdStatus = 'epics';
  } else if (metadata.upload?.completedAt && metadata.brief?.completedAt) {
    prdStatus = 'prd';
  } else if (metadata.upload?.completedAt) {
    prdStatus = 'brief';
  } else {
    // Default to upload for new projects
    prdStatus = 'upload';
  }

  // Map 'completed' database status to 'exported'
  if (raw.status === 'completed') {
    prdStatus = 'exported';
  }

  return {
    ...raw,
    status: prdStatus, // Override with PRD status
    project_metadata: metadata,
  };
}

export function transformToEpic(raw: Content): PRDEpic {
  return {
    ...raw,
    metadata: (raw.metadata as unknown as EpicMetadata) || {
      objective: '',
      dependencies: [],
      acceptanceCriteria: [],
      storiesCount: 0,
    },
  };
}

export function transformToStory(raw: Content): PRDStory {
  return {
    ...raw,
    metadata: (raw.metadata as unknown as StoryMetadata) || {
      acceptanceCriteria: [],
      complexity: 'M',
      dependencies: [],
      isValidated: false,
    },
  };
}

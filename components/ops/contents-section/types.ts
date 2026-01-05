// ContentsSection Types and Interfaces

export interface ContentsSectionProps {
  className?: string;
}

// Re-export types from data file for convenience
export type {
  ContentTypeInfo,
  ContentStatusInfo,
  IngestionStepInfo
} from '../data/contents-content';

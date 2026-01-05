import { Section } from '../../../../types';

export interface MindsGalleryProps {
  setSection: (s: Section) => void;
  onSelectMind?: (slug: string) => void;
}

export type ViewMode = 'grid' | 'list';
export type StatusFilter = 'all' | 'production' | 'progress';

export interface GalleryFiltersState {
  viewMode: ViewMode;
  statusFilter: StatusFilter;
  searchQuery: string;
}

export interface GalleryFiltersActions {
  setViewMode: (mode: ViewMode) => void;
  setStatusFilter: (filter: StatusFilter) => void;
  setSearchQuery: (query: string) => void;
}

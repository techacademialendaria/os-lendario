/**
 * Course Creator Views
 *
 * Extracted view components from CoursesTemplate for better modularity.
 */

// List View - re-exported from organisms
export { CoursesListView } from '../organisms';
export type { Course } from '../types';

// Workflow Views
export { CurriculumView } from './CurriculumView';
export type { CurriculumViewProps } from './CurriculumView';

export { GenerationView } from './GenerationView';
export type { GenerationViewProps } from './GenerationView';

export { ValidationView } from './ValidationView';
export type { ValidationViewProps } from './ValidationView';

// Wizard Views
export { default as NewCourseWizard } from './NewCourseWizard';
export { default as BriefEditorView } from './BriefEditorView';
export { default as ResearchResultsView } from './ResearchResultsView';
export { default as ReformulationView } from './ReformulationView';

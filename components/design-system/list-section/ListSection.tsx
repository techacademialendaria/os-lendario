import React from 'react';
import {
  ListSectionHeader,
  RealWorldView,
  StyleGalleryView,
  ShapesView,
  TypographyView,
  ListGroupsView,
} from './organisms';

/**
 * ListSection - Design System Showcase for Lists & Checklists
 *
 * Orchestrator component that composes all list-related views.
 * Each view is a self-contained organism with its own data and presentation.
 *
 * Views:
 * - RealWorldView: Pricing cards, checklists, pros/cons (real use cases)
 * - StyleGalleryView: Matrix of all style variants (solid, soft, outlined, minimal)
 * - ShapesView: Rounded vs circle shape variations
 * - TypographyView: Text lists, separators, metadata with icons
 * - ListGroupsView: Interactive menu patterns (vertical/horizontal)
 */
const ListSection: React.FC = () => {
  return (
    <div className="animate-fade-in space-y-20">
      {/* Header */}
      <ListSectionHeader />

      {/* Section 1: Real World Context (Hero) */}
      <RealWorldView />

      {/* Section 2: The Matrix (Styles & Colors) */}
      <StyleGalleryView />

      {/* Section 3: Shapes & Variants */}
      <ShapesView />

      {/* Section 4: Typography & Metadata */}
      <TypographyView />

      {/* Section 5: List Groups (Advanced) */}
      <ListGroupsView />
    </div>
  );
};

export default ListSection;

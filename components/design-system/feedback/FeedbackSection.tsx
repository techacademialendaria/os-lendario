import React from 'react';
import {
  FeedbackSectionHeader,
  CommandPaletteView,
  SheetsView,
  PopoversView,
  ModalsGalleryView,
  ToastsView,
  TooltipsView,
} from './organisms';

/**
 * FeedbackSection - Design System Feedback & Overlays showcase
 *
 * Orchestrates all feedback-related UI components:
 * - Command Palette (Cmd+K)
 * - Sheets/Drawers
 * - Popovers & Menus
 * - Modal Gallery
 * - Toasts & Notifications
 * - Tooltips
 */
const FeedbackSection: React.FC = () => {
  return (
    <div className="animate-fade-in space-y-16">
      <FeedbackSectionHeader />
      <CommandPaletteView />
      <SheetsView />
      <PopoversView />
      <ModalsGalleryView />
      <ToastsView />
      <TooltipsView />
    </div>
  );
};

export default FeedbackSection;

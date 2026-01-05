import React from 'react';
import {
  IdentityHeader,
  CoreIdentityView,
  PhilosophyView,
  PeopleCultureView,
  ExpressionView,
  TemplatesView,
  MarketingView,
  QuickRefCard,
} from './organisms';

/**
 * IdentitySection - FIVU Framework v2.0
 *
 * Orchestrator component for the Universal Verbal Identity design system section.
 * All content is organized into specialized view organisms.
 *
 * Structure:
 * - IdentityHeader: FIVU header with metadata
 * - CoreIdentityView: Mission, Vision, Positioning, Archetypes
 * - PhilosophyView: Beliefs, Enemies, Allies (tabbed)
 * - PeopleCultureView: Leader Attributes, Team Virtues, Tensions
 * - ExpressionView: Tone Matrix, Voice Dimensions, Vocabulary
 * - TemplatesView: Manifesto & Principle templates
 * - MarketingView: Authentic Marketing philosophy
 * - QuickRefCard: Quick reference summary card
 */
const IdentitySection: React.FC = () => {
  return (
    <div className="animate-fade-in space-y-16">
      <IdentityHeader />
      <CoreIdentityView />
      <PhilosophyView />
      <PeopleCultureView />
      <ExpressionView />
      <TemplatesView />
      <MarketingView />
      <QuickRefCard />
    </div>
  );
};

export default IdentitySection;

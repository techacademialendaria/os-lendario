/**
 * ComponentSection
 * Design System - Component Showcase Template
 *
 * Orchestrator component that composes all section organisms.
 * This template follows Atomic Design principles.
 *
 * @see organisms/ for individual section implementations
 */

import {
  HeroSectionView,
  LegendaryShowcaseView,
  InterfaceHeaderView,
  AvatarsSectionView,
  AccordionSectionView,
  ScrollAreaSectionView,
  BadgesSectionView,
  AlertsSectionView,
  CardsSectionView,
  GuidelinesSectionView,
} from './organisms';

export function ComponentSection() {
  return (
    <div className="animate-fade-in space-y-20">
      {/* Hero Example */}
      <HeroSectionView />

      {/* Legendary Elements (Spotlight & Liquid) */}
      <LegendaryShowcaseView />

      {/* Interface Components Header */}
      <InterfaceHeaderView />

      {/* Avatars & Groups */}
      <AvatarsSectionView />

      {/* Accordion / Collapsible Elements */}
      <AccordionSectionView />

      {/* Scroll Areas */}
      <ScrollAreaSectionView />

      {/* Badges & Tags */}
      <BadgesSectionView />

      {/* Alerts */}
      <AlertsSectionView />

      {/* Cards */}
      <CardsSectionView />

      {/* Guidelines (Do's & Don'ts) */}
      <GuidelinesSectionView />
    </div>
  );
}

export default ComponentSection;

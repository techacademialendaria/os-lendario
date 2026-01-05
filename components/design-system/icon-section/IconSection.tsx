import React from 'react';
import { Separator } from '@/components/ui/separator';
import { useIconSearch } from './hooks';
import { SOCIAL_ICONS } from './data';
import {
  IconSectionHeader,
  UsageGuideView,
  IconoirLibraryView,
  SocialIconsView,
  UnicodeSymbolsView,
  UsageRulesView,
} from './organisms';

/**
 * IconSection - Design System Icons & Symbols Documentation
 *
 * Orchestrator template that composes all icon-related views.
 * Contains only composition logic, no business logic.
 */
const IconSection: React.FC = () => {
  const { searchTerm, setSearchTerm, filteredCategories, hasResults, clearSearch } =
    useIconSearch();

  return (
    <div className="animate-fade-in space-y-20">
      {/* Header */}
      <IconSectionHeader />

      {/* Usage Guide - When to use each icon type */}
      <UsageGuideView />

      <Separator />

      {/* Iconoir Library with Search */}
      <IconoirLibraryView
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filteredCategories={filteredCategories}
        hasResults={hasResults}
        clearSearch={clearSearch}
      />

      <Separator />

      {/* Social Icons */}
      <SocialIconsView socialIcons={SOCIAL_ICONS} />

      <Separator />

      {/* Unicode Symbols */}
      <UnicodeSymbolsView />

      <Separator />

      {/* Usage Rules - Do's and Don'ts */}
      <UsageRulesView />
    </div>
  );
};

export default IconSection;

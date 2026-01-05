import { useState, useCallback } from 'react';
import type {
  SidebarSection,
  WriteChannel,
  Semantics,
  Linguistics,
  Catchphrase,
  SystemPrompt,
  BehavioralOS,
  RhetoricalDevice,
  Psycholinguistics,
} from '../types';

export interface UseWritingStylesStateReturn {
  // Section navigation
  activeSection: SidebarSection;
  setActiveSection: (section: SidebarSection) => void;
  navigateToSemantics: () => void;

  // Channel selection (for examples)
  writeChannel: WriteChannel;
  setWriteChannel: (channel: WriteChannel) => void;

  // Parsed profile data (with defaults applied)
  psycho: Psycholinguistics;
  arsenal: RhetoricalDevice[];
  contextMatrix: unknown[];
  systemPrompts: SystemPrompt[];
  catchphrases: Catchphrase[];
  semantics: Semantics;
  behavioralOS: BehavioralOS;
  linguistics: Linguistics;
}

/**
 * Hook for managing WritingStylesTab state
 *
 * Consolidates:
 * - Section navigation (sidebar)
 * - Channel selection (examples tab)
 * - Parsed profile data with defaults
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useWritingStylesState(profile: any): UseWritingStylesStateReturn {
  const [activeSection, setActiveSection] = useState<SidebarSection>('overview');
  const [writeChannel, setWriteChannel] = useState<WriteChannel>('twitter');

  const navigateToSemantics = useCallback(() => {
    setActiveSection('semantics');
  }, []);

  // Parse profile data with safe defaults
  const psycho = profile.psycholinguistics || { traits: [], archetype: 'Desconhecido' };
  const arsenal = profile.rhetoricalArsenal || [];
  const contextMatrix = profile.contextualMatrix || [];
  const systemPrompts = profile.systemPrompts || [];
  const catchphrases = profile.catchphrases || [];
  const semantics = profile.semantics || { tier1: {}, tier2: {}, tier3: {} };
  const behavioralOS = profile.behavioralOS || { traits: [] };
  const linguistics = profile.linguistics || { punctuation: [], antiPatterns: [] };

  return {
    activeSection,
    setActiveSection,
    navigateToSemantics,
    writeChannel,
    setWriteChannel,
    psycho,
    arsenal,
    contextMatrix,
    systemPrompts,
    catchphrases,
    semantics,
    behavioralOS,
    linguistics,
  };
}

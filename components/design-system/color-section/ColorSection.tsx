import React from 'react';
import type { ColorSectionProps } from './types';
import { SYSTEM_PALETTES, NICHE_REGISTRY } from './data';
import {
  IntroSection,
  GrayscaleSection,
  ActivePaletteSection,
  SystemColorsSection,
  NicheColorsSection,
  GuidelinesSection,
} from './organisms';

const ColorSection: React.FC<ColorSectionProps> = ({ isDark, currentTheme }) => {
  // Determine Active Palette dynamically
  const activePalette = NICHE_REGISTRY[currentTheme] || NICHE_REGISTRY['Gold'];

  // Other niche palettes to show in the list (excluding the active one)
  const otherNichePalettes = Object.entries(NICHE_REGISTRY)
    .filter(([key]) => key !== currentTheme)
    .map(([, palette]) => palette);

  return (
    <div className="animate-fade-in space-y-24 pb-20">
      <IntroSection />
      <GrayscaleSection />
      <ActivePaletteSection
        activePalette={activePalette}
        currentTheme={currentTheme}
        isDark={isDark}
      />
      <SystemColorsSection systemPalettes={SYSTEM_PALETTES} isDark={isDark} />
      <NicheColorsSection otherNichePalettes={otherNichePalettes} isDark={isDark} />
      <GuidelinesSection />
    </div>
  );
};

export default ColorSection;

import React from 'react';
import { MindCardsGrid } from './MindCardsGrid';
import { DISCComparison } from './DISCComparison';
import { BigFiveComparison } from './BigFiveComparison';
import { DarkTriadSection } from './DarkTriadSection';
import type { ComparisonGridViewProps } from '../types';

export const ComparisonGridView: React.FC<ComparisonGridViewProps> = ({ minds }) => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 space-y-12 duration-500">
      <MindCardsGrid minds={minds} />
      <DISCComparison minds={minds} />
      <BigFiveComparison minds={minds} />
      <DarkTriadSection minds={minds} />
    </div>
  );
};

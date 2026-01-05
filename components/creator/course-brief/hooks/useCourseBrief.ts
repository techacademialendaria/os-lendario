import { useState, useCallback, useMemo } from 'react';
import type { BriefData } from '../types';
import { BRIEF_SECTIONS, DEFAULT_BRIEF_DATA } from '../data';

export function useCourseBrief() {
  const [activeSection, setActiveSection] = useState(1);
  const [briefData, setBriefData] = useState<BriefData>(DEFAULT_BRIEF_DATA);
  const [isSaving, setIsSaving] = useState(false);

  const currentSectionData = useMemo(
    () => BRIEF_SECTIONS.find((s) => s.id === activeSection),
    [activeSection]
  );

  const completedSections = useMemo(
    () => BRIEF_SECTIONS.filter((_, index) => index < activeSection - 1).length,
    [activeSection]
  );

  const progressPercent = useMemo(
    () => Math.round((completedSections / BRIEF_SECTIONS.length) * 100),
    [completedSections]
  );

  const handleInputChange = useCallback((key: keyof BriefData, value: unknown) => {
    setBriefData((prev) => ({ ...prev, [key]: value }));
  }, []);

  const addPainPoint = useCallback(() => {
    setBriefData((prev) => ({
      ...prev,
      painPoints: [...prev.painPoints, { id: Date.now(), text: '', intensity: 5 }],
    }));
  }, []);

  const removePainPoint = useCallback((id: number) => {
    setBriefData((prev) => ({
      ...prev,
      painPoints: prev.painPoints.filter((p) => p.id !== id),
    }));
  }, []);

  const handleSave = useCallback(() => {
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 1000);
  }, []);

  const handleNext = useCallback(() => {
    if (activeSection < BRIEF_SECTIONS.length) {
      setActiveSection((prev) => prev + 1);
    }
  }, [activeSection]);

  const handlePrevious = useCallback(() => {
    if (activeSection > 1) {
      setActiveSection((prev) => prev - 1);
    }
  }, [activeSection]);

  return {
    // State
    activeSection,
    briefData,
    isSaving,
    currentSectionData,
    progressPercent,
    totalSections: BRIEF_SECTIONS.length,
    sections: BRIEF_SECTIONS,

    // Actions
    setActiveSection,
    handleInputChange,
    addPainPoint,
    removePainPoint,
    handleSave,
    handleNext,
    handlePrevious,
  };
}

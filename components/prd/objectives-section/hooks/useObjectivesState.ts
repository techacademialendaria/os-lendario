/**
 * Hook: useObjectivesState
 * Manages objectives content state and approval statuses
 */

import { useState, useCallback } from 'react';
import type { ObjectivesContent, ApprovalStatus } from '../types';
import { EMPTY_CONTENT } from '../types';

export interface UseObjectivesStateReturn {
  // State
  objectives: ObjectivesContent;
  mainStatus: ApprovalStatus;
  secondaryStatuses: Record<string, ApprovalStatus>;
  nonStatuses: Record<string, ApprovalStatus>;
  hasContent: boolean;

  // Status setters
  setMainStatus: (status: ApprovalStatus) => void;
  setSecondaryStatus: (index: number, status: ApprovalStatus) => void;
  setNonStatus: (index: number, status: ApprovalStatus) => void;

  // Content actions
  setObjectives: (content: ObjectivesContent) => void;
  updateMain: (text: string) => ObjectivesContent;
  updateSecondary: (index: number, text: string) => ObjectivesContent;
  deleteSecondary: (index: number) => ObjectivesContent;
  addSecondary: () => ObjectivesContent;
  updateNon: (index: number, text: string) => ObjectivesContent;
  deleteNon: (index: number) => ObjectivesContent;
  addNon: () => ObjectivesContent;
  updateNotes: (notes: string) => ObjectivesContent;
}

export function useObjectivesState(
  initialContent: ObjectivesContent | null
): UseObjectivesStateReturn {
  const [objectives, setObjectives] = useState<ObjectivesContent>(
    initialContent || EMPTY_CONTENT
  );
  const [mainStatus, setMainStatus] = useState<ApprovalStatus>('pending');
  const [secondaryStatuses, setSecondaryStatuses] = useState<Record<string, ApprovalStatus>>({});
  const [nonStatuses, setNonStatuses] = useState<Record<string, ApprovalStatus>>({});

  const hasContent =
    objectives.mainObjective.length > 0 || objectives.secondaryObjectives.length > 0;

  // Status setters
  const setSecondaryStatus = useCallback((index: number, status: ApprovalStatus) => {
    setSecondaryStatuses((prev) => ({ ...prev, [index]: status }));
  }, []);

  const setNonStatus = useCallback((index: number, status: ApprovalStatus) => {
    setNonStatuses((prev) => ({ ...prev, [index]: status }));
  }, []);

  // Content actions - return updated content for async save
  const updateMain = useCallback(
    (text: string): ObjectivesContent => {
      const updated = { ...objectives, mainObjective: text };
      setObjectives(updated);
      return updated;
    },
    [objectives]
  );

  const updateSecondary = useCallback(
    (index: number, text: string): ObjectivesContent => {
      const updated = {
        ...objectives,
        secondaryObjectives: objectives.secondaryObjectives.map((o, i) =>
          i === index ? text : o
        ),
      };
      setObjectives(updated);
      return updated;
    },
    [objectives]
  );

  const deleteSecondary = useCallback(
    (index: number): ObjectivesContent => {
      const updated = {
        ...objectives,
        secondaryObjectives: objectives.secondaryObjectives.filter((_, i) => i !== index),
      };
      setObjectives(updated);
      return updated;
    },
    [objectives]
  );

  const addSecondary = useCallback((): ObjectivesContent => {
    const updated = {
      ...objectives,
      secondaryObjectives: [...objectives.secondaryObjectives, ''],
    };
    setObjectives(updated);
    return updated;
  }, [objectives]);

  const updateNon = useCallback(
    (index: number, text: string): ObjectivesContent => {
      const updated = {
        ...objectives,
        nonObjectives: objectives.nonObjectives.map((o, i) => (i === index ? text : o)),
      };
      setObjectives(updated);
      return updated;
    },
    [objectives]
  );

  const deleteNon = useCallback(
    (index: number): ObjectivesContent => {
      const updated = {
        ...objectives,
        nonObjectives: objectives.nonObjectives.filter((_, i) => i !== index),
      };
      setObjectives(updated);
      return updated;
    },
    [objectives]
  );

  const addNon = useCallback((): ObjectivesContent => {
    const updated = {
      ...objectives,
      nonObjectives: [...objectives.nonObjectives, ''],
    };
    setObjectives(updated);
    return updated;
  }, [objectives]);

  const updateNotes = useCallback(
    (notes: string): ObjectivesContent => {
      const updated = { ...objectives, notes };
      setObjectives(updated);
      return updated;
    },
    [objectives]
  );

  return {
    objectives,
    mainStatus,
    secondaryStatuses,
    nonStatuses,
    hasContent,
    setMainStatus,
    setSecondaryStatus,
    setNonStatus,
    setObjectives,
    updateMain,
    updateSecondary,
    deleteSecondary,
    addSecondary,
    updateNon,
    deleteNon,
    addNon,
    updateNotes,
  };
}

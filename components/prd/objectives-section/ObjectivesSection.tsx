/**
 * ObjectivesSection - Orchestrator Template
 * Atomic Design Refactoring
 *
 * Before: 524 lines
 * After: ~70 lines (orchestrator only)
 */

import React, { useCallback } from 'react';
import { useObjectivesState, useObjectivesAI } from './hooks';
import {
  ObjectivesHeader,
  ObjectivesEmptyState,
  ObjectivesLoadingState,
  ObjectivesListView,
} from './organisms';
import type { ObjectivesSectionProps, ObjectivesContent } from './types';

export const ObjectivesSection: React.FC<ObjectivesSectionProps> = ({
  content,
  briefProblem,
  briefSolution,
  onUpdate,
}) => {
  const state = useObjectivesState(content);
  const ai = useObjectivesAI();

  // Generate objectives via AI
  const handleGenerate = useCallback(async () => {
    const result = await ai.generate(briefProblem, briefSolution);
    if (result) {
      state.setObjectives(result);
      await onUpdate(result);
    }
  }, [ai, briefProblem, briefSolution, state, onUpdate]);

  // Wrapper for async updates
  const withSave = useCallback(
    async (updater: () => ObjectivesContent) => {
      const updated = updater();
      await onUpdate(updated);
    },
    [onUpdate]
  );

  return (
    <div className="space-y-6">
      <ObjectivesHeader
        hasContent={state.hasContent}
        isGenerating={ai.isGenerating}
        onRegenerate={handleGenerate}
      />

      {!state.hasContent && !ai.isGenerating && (
        <ObjectivesEmptyState onGenerate={handleGenerate} />
      )}

      {ai.isGenerating && !state.hasContent && <ObjectivesLoadingState />}

      {state.hasContent && (
        <ObjectivesListView
          objectives={state.objectives}
          mainStatus={state.mainStatus}
          secondaryStatuses={state.secondaryStatuses}
          nonStatuses={state.nonStatuses}
          onMainUpdate={(text) => withSave(() => state.updateMain(text))}
          onMainStatusChange={state.setMainStatus}
          onSecondaryUpdate={(idx, text) => withSave(() => state.updateSecondary(idx, text))}
          onSecondaryStatusChange={state.setSecondaryStatus}
          onSecondaryDelete={(idx) => withSave(() => state.deleteSecondary(idx))}
          onSecondaryAdd={() => withSave(() => state.addSecondary())}
          onNonUpdate={(idx, text) => withSave(() => state.updateNon(idx, text))}
          onNonStatusChange={state.setNonStatus}
          onNonDelete={(idx) => withSave(() => state.deleteNon(idx))}
          onNonAdd={() => withSave(() => state.addNon())}
          onNotesUpdate={(notes) => withSave(() => state.updateNotes(notes))}
        />
      )}
    </div>
  );
};

export default ObjectivesSection;

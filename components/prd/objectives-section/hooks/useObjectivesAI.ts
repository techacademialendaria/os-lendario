/**
 * Hook: useObjectivesAI
 * Handles AI generation for objectives
 */

import { useCallback, useState } from 'react';
import { usePRDAI } from '@/hooks/prd/usePRDAI';
import type { ObjectivesContent } from '../types';
import { OBJECTIVES_SYSTEM, OBJECTIVES_PROMPT } from '../types';

export interface UseObjectivesAIReturn {
  isGenerating: boolean;
  regeneratingId: string | null;
  generate: (briefProblem: string, briefSolution: string) => Promise<ObjectivesContent | null>;
}

export function useObjectivesAI(): UseObjectivesAIReturn {
  const { generate: generateAI, isGenerating } = usePRDAI();
  const [regeneratingId, setRegeneratingId] = useState<string | null>(null);

  const generate = useCallback(
    async (
      briefProblem: string,
      briefSolution: string
    ): Promise<ObjectivesContent | null> => {
      try {
        const prompt = OBJECTIVES_PROMPT
          .replace('{problem}', briefProblem)
          .replace('{solution}', briefSolution);

        const result = await generateAI(prompt, {
          systemPrompt: OBJECTIVES_SYSTEM,
          temperature: 0.7,
        });

        let parsed: ObjectivesContent;
        try {
          const jsonMatch = result.content.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            parsed = JSON.parse(jsonMatch[0]);
            return parsed;
          } else {
            throw new Error('No JSON found');
          }
        } catch {
          console.error('Failed to parse objectives');
          return null;
        }
      } catch (err) {
        console.error('Failed to generate objectives:', err);
        return null;
      }
    },
    [generateAI]
  );

  return {
    isGenerating,
    regeneratingId,
    generate,
  };
}

// Brief Structure Data Hook
// Manages brief structure state and generation

import { useState, useCallback } from 'react';
import { usePRDAI } from '@/hooks/prd/usePRDAI';
import type { BriefStructure, PRDProject, SectionKey } from '../types';
import { SECTIONS, BRIEF_SYSTEM, BRIEF_PROMPT, SECTION_PROMPTS } from '../types';

interface UseBriefStructureDataProps {
  project: PRDProject;
  onUpdate: (structure: BriefStructure) => Promise<void>;
}

export function useBriefStructureData({ project, onUpdate }: UseBriefStructureDataProps) {
  const { generate, isGenerating, error, progress } = usePRDAI();
  const [structure, setStructure] = useState<BriefStructure | null>(
    project.project_metadata?.brief?.structure || null
  );
  const [regeneratingSection, setRegeneratingSection] = useState<SectionKey | null>(null);

  // Build context strings
  const brief = project.project_metadata?.brief;
  const uploadContent = project.project_metadata?.upload?.content || '';

  const blindSpotsContext =
    brief?.blindSpots
      ?.filter((bs) => bs.selected)
      .map((bs) => `- ${bs.title}: ${bs.description}`)
      .join('\n') || 'Nenhum ponto cego identificado';

  const researchContext =
    brief?.researchTopics
      ?.filter((t) => t.isRead)
      .map((t) => `- ${t.title}: ${t.summary}`)
      .join('\n') || 'Nenhuma pesquisa realizada';

  const wowsContext =
    brief?.wows?.map((w) => `- [${w.category}] ${w.text}`).join('\n') || 'Nenhum WOW registrado';

  // Check if all required sections are filled
  const isComplete =
    structure &&
    SECTIONS.filter((s) => s.required).every((s) => {
      const value = structure[s.key];
      if (s.isArray) {
        return (value as string[]).filter((v) => v.trim()).length > 0;
      }
      return (value as string).trim().length > 0;
    });

  // Generate full brief
  const handleGenerate = useCallback(async () => {
    try {
      const prompt = BRIEF_PROMPT.replace('{uploadContent}', uploadContent)
        .replace('{blindSpots}', blindSpotsContext)
        .replace('{research}', researchContext)
        .replace('{wows}', wowsContext);

      const result = await generate(prompt, {
        systemPrompt: BRIEF_SYSTEM,
        temperature: 0.7,
      });

      let parsed: BriefStructure;
      try {
        let jsonContent = result.content;
        const jsonMatch = jsonContent.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          jsonContent = jsonMatch[0];
        }
        parsed = JSON.parse(jsonContent);
      } catch {
        console.error('Failed to parse brief response:', result.content);
        return;
      }

      setStructure(parsed);
      await onUpdate(parsed);
    } catch (err) {
      console.error('Failed to generate brief:', err);
    }
  }, [generate, uploadContent, blindSpotsContext, researchContext, wowsContext, onUpdate]);

  // Regenerate single section
  const handleRegenerateSection = useCallback(
    async (key: SectionKey) => {
      if (!structure) return;

      setRegeneratingSection(key);
      try {
        const sectionConfig = SECTIONS.find((s) => s.key === key);
        const prompt = `${SECTION_PROMPTS[key]}

Contexto atual:
Problema: ${structure.problem}
Solucao: ${structure.solution}
Publico: ${structure.targetAudience}

Responda APENAS com ${sectionConfig?.isArray ? 'um array JSON de strings' : 'o texto da secao'}.`;

        const result = await generate(prompt, {
          systemPrompt: BRIEF_SYSTEM,
          temperature: 0.8,
        });

        let newValue: string | string[];
        if (sectionConfig?.isArray) {
          try {
            const jsonMatch = result.content.match(/\[[\s\S]*\]/);
            newValue = jsonMatch ? JSON.parse(jsonMatch[0]) : [result.content];
          } catch {
            newValue = [result.content];
          }
        } else {
          newValue = result.content.replace(/^["']|["']$/g, '').trim();
        }

        const updated = { ...structure, [key]: newValue };
        setStructure(updated);
        await onUpdate(updated);
      } catch (err) {
        console.error('Failed to regenerate section:', err);
      } finally {
        setRegeneratingSection(null);
      }
    },
    [structure, generate, onUpdate]
  );

  // Handle section value change
  const handleSectionChange = useCallback(
    async (key: SectionKey, value: string | string[]) => {
      if (!structure) return;
      const updated = { ...structure, [key]: value };
      setStructure(updated);
      await onUpdate(updated);
    },
    [structure, onUpdate]
  );

  return {
    structure,
    isGenerating,
    error,
    progress,
    regeneratingSection,
    isComplete: !!isComplete,
    handleGenerate,
    handleRegenerateSection,
    handleSectionChange,
  };
}

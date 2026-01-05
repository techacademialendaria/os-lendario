import { useCallback } from 'react';
import { GoogleGenAI, Type } from '@google/genai';
import { useToast } from '@/hooks/use-toast';
import type { PersonaData, WizardStep } from '../types';

interface UsePersonaGenerationProps {
  inputText: string;
  setGeneratedPersona: (persona: PersonaData) => void;
  goToStep: (step: WizardStep) => void;
}

/**
 * Hook for handling AI-powered persona generation
 */
export function usePersonaGeneration({
  inputText,
  setGeneratedPersona,
  goToStep,
}: UsePersonaGenerationProps) {
  const { toast } = useToast();

  const generatePersona = useCallback(async () => {
    if (!inputText.trim()) return;
    goToStep('processing');

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

      const schema = {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          icon: { type: Type.STRING },
          demographics: {
            type: Type.OBJECT,
            properties: {
              age: { type: Type.STRING },
              role: { type: Type.STRING },
              income: { type: Type.STRING },
              location: { type: Type.STRING },
            },
          },
          psychographics: {
            type: Type.OBJECT,
            properties: {
              mindset: { type: Type.STRING },
              values: { type: Type.ARRAY, items: { type: Type.STRING } },
              fears: { type: Type.ARRAY, items: { type: Type.STRING } },
            },
          },
          painPoints: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                superficial: { type: Type.STRING },
                deep: { type: Type.STRING },
              },
            },
          },
          desires: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                surface: { type: Type.STRING },
                hidden: { type: Type.STRING },
              },
            },
          },
          redFlags: { type: Type.ARRAY, items: { type: Type.STRING } },
          greenFlags: { type: Type.ARRAY, items: { type: Type.STRING } },
          definingQuote: { type: Type.STRING },
        },
      };

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Crie uma Buyer Persona profunda baseada em: "${inputText}". Seja especifico, criativo e use linguagem de marketing direto. Para o campo "icon", use um dos seguintes nomes: user, rocket, chart-line, laptop-code, sparkles, brain, briefcase, graduation-cap, lightbulb, target, star, users-alt.`,
        config: {
          responseMimeType: 'application/json',
          responseSchema: schema,
          temperature: 0.7,
        },
      });

      if (response.text) {
        const data = JSON.parse(response.text);
        const newPersona: PersonaData = {
          ...data,
          id: Date.now().toString(),
          createdAt: new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' }),
        };
        setGeneratedPersona(newPersona);
        goToStep('review');
      } else {
        throw new Error('Resposta vazia');
      }
    } catch (error) {
      console.error(error);
      toast({ title: 'Erro', description: 'Falha ao gerar persona.', variant: 'destructive' });
      goToStep('input');
    }
  }, [inputText, setGeneratedPersona, goToStep, toast]);

  return { generatePersona };
}

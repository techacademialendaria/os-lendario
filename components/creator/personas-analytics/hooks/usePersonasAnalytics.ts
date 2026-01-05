import { useState, useMemo } from 'react';
import type { Persona } from '@/hooks/useAudienceProfiles';
import type { SelectedPersona, AnalyticsData, MatrixCell } from '../types';
import { PERSONA_COLORS, getPersonaColor } from '../data';

export function usePersonasAnalytics(personas: Persona[]) {
  // Initialize with first 3 personas
  const [selectedPersonas, setSelectedPersonas] = useState<SelectedPersona[]>(() => {
    return personas.slice(0, 3).map((p, i) => ({
      id: p.id,
      name: p.name,
      color: PERSONA_COLORS[i % PERSONA_COLORS.length].bg,
    }));
  });

  const [period, setPeriod] = useState('30d');
  const [showPersonaSelector, setShowPersonaSelector] = useState(false);

  // Get selected persona objects with full data
  const selectedPersonaData = useMemo(() => {
    return selectedPersonas.map((sp, index) => {
      const persona = personas.find((p) => p.id === sp.id);
      return { ...sp, data: persona, colorInfo: getPersonaColor(index) };
    });
  }, [selectedPersonas, personas]);

  // Toggle persona selection
  const togglePersona = (persona: Persona) => {
    const exists = selectedPersonas.find((sp) => sp.id === persona.id);
    if (exists) {
      setSelectedPersonas((prev) => prev.filter((sp) => sp.id !== persona.id));
    } else if (selectedPersonas.length < 5) {
      const newIndex = selectedPersonas.length;
      setSelectedPersonas((prev) => [
        ...prev,
        {
          id: persona.id,
          name: persona.name,
          color: PERSONA_COLORS[newIndex % PERSONA_COLORS.length].bg,
        },
      ]);
    }
  };

  // Remove persona from selection
  const removePersona = (id: string) => {
    setSelectedPersonas((prev) => prev.filter((sp) => sp.id !== id));
  };

  // Mock analytics data (in production, would come from backend)
  const analyticsData: AnalyticsData = useMemo(
    () => ({
      ltv: selectedPersonaData.map((sp, i) => ({
        name: sp.name,
        value: [2400, 1100, 3800, 1900, 2200][i] || 1500,
        color: sp.colorInfo.bg,
      })),
      channelEngagement: {
        email: selectedPersonaData.map((sp, i) => ({
          name: sp.name,
          value: [45, 20, 35, 28, 32][i] || 25,
          colorInfo: getPersonaColor(i),
        })),
        social: selectedPersonaData.map((sp, i) => ({
          name: sp.name,
          value: [60, 15, 25, 40, 18][i] || 20,
          colorInfo: getPersonaColor(i),
        })),
        blog: selectedPersonaData.map((sp, i) => ({
          name: sp.name,
          value: [20, 50, 30, 25, 55][i] || 30,
          colorInfo: getPersonaColor(i),
        })),
      },
      consciousness: selectedPersonaData.map((sp, i) => ({
        name: sp.name,
        level: ['Alta', 'Media', 'Baixa', 'Alta', 'Media'][i] || 'Media',
        distribution: {
          unaware: [10, 40, 60, 15, 35][i] || 30,
          problem: [20, 30, 20, 25, 30][i] || 25,
          solution: [30, 20, 15, 25, 20][i] || 25,
          product: [40, 10, 5, 35, 15][i] || 20,
        },
      })),
      journeys: selectedPersonaData.slice(0, 2).map((sp, i) => ({
        name: sp.name,
        type: ['B2C', 'Enterprise'][i] || 'B2C',
        cycle: ['3 dias', '45 dias'][i] || '15 dias',
        color: sp.colorInfo,
        steps:
          i === 0
            ? [
                { step: 1, label: 'Anuncio Instagram (Reels)' },
                { step: 2, label: 'Visita Landing Page' },
                { step: 3, label: 'Compra no WhatsApp', final: true },
              ]
            : [
                { step: 1, label: 'Artigo LinkedIn / Blog' },
                { step: 2, label: 'Download E-book (Lead)' },
                { step: 3, label: 'Reuniao Demo', final: true },
              ],
      })),
      matrix: [
        {
          metric: 'Custo por Lead (CPL)',
          values: selectedPersonaData.map(
            (sp, i): MatrixCell => ({
              value: ['R$ 4.50', 'R$ 8.20', 'R$ 45.00', 'R$ 12.00', 'R$ 6.80'][i] || 'R$ 10.00',
              highlight: ['green', null, 'red', null, null][i] as 'green' | 'red' | null,
            })
          ),
        },
        {
          metric: 'Ticket Medio',
          values: selectedPersonaData.map(
            (sp, i): MatrixCell => ({
              value: ['R$ 197', 'R$ 97', 'R$ 5,000+', 'R$ 350', 'R$ 150'][i] || 'R$ 200',
              highlight: [null, null, 'green', null, null][i] as 'green' | 'red' | null,
            })
          ),
        },
        {
          metric: 'Canal Principal',
          values: selectedPersonaData.map(
            (sp, i): MatrixCell => ({
              value: ['Instagram', 'Youtube', 'LinkedIn', 'Email', 'Blog'][i] || 'Social',
              icon: ['camera', 'play', 'linkedin', 'envelope', 'document'][i] || 'globe',
              iconColor:
                [
                  'text-pink-500',
                  'text-red-500',
                  'text-blue-600',
                  'text-amber-500',
                  'text-emerald-500',
                ][i] || 'text-muted-foreground',
            })
          ),
        },
        {
          metric: 'Dor Principal',
          values: selectedPersonaData.map(
            (sp): MatrixCell => ({
              value: sp.data?.painPoints?.[0]?.superficial || 'Nao identificada',
              isQuote: true,
            })
          ),
        },
      ],
    }),
    [selectedPersonaData]
  );

  // Find max LTV for bar scaling
  const maxLtv = Math.max(...analyticsData.ltv.map((l) => l.value));

  return {
    // State
    selectedPersonas,
    period,
    showPersonaSelector,
    selectedPersonaData,
    analyticsData,
    maxLtv,
    // Actions
    setPeriod,
    setShowPersonaSelector,
    togglePersona,
    removePersona,
    getPersonaColor,
  };
}

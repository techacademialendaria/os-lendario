import type { BriefSection, PipelineStep, BriefData } from '../types';

export const BRIEF_SECTIONS: BriefSection[] = [
  {
    id: 1,
    key: 'dreamOutcome',
    title: 'Dream Outcome',
    description: 'Qual é a promessa principal do curso?',
    icon: 'star',
  },
  {
    id: 2,
    key: 'targetAudience',
    title: 'Público-Alvo (ICP)',
    description: 'Quem é o aluno ideal para este curso?',
    icon: 'users',
  },
  {
    id: 3,
    key: 'painPoints',
    title: 'Dores e Problemas',
    description: 'Quais problemas o curso resolve?',
    icon: 'heartbeat',
  },
  {
    id: 4,
    key: 'prerequisites',
    title: 'Pré-requisitos',
    description: 'O que o aluno precisa saber antes?',
    icon: 'list-check',
  },
  {
    id: 5,
    key: 'uniqueValue',
    title: 'Proposta de Valor Única',
    description: 'O que diferencia este curso?',
    icon: 'gem',
  },
  {
    id: 6,
    key: 'methodology',
    title: 'Metodologia',
    description: 'Como o conteúdo será ensinado?',
    icon: 'route',
  },
  {
    id: 7,
    key: 'expectedResults',
    title: 'Resultados Esperados',
    description: 'O que o aluno vai conseguir fazer?',
    icon: 'trophy',
  },
  {
    id: 8,
    key: 'duration',
    title: 'Duração e Formato',
    description: 'Estrutura geral do curso',
    icon: 'clock',
  },
];

export const DEFAULT_PIPELINE: PipelineStep[] = [
  { key: 'brief', label: 'Brief', status: 'current' },
  { key: 'research', label: 'Research', status: 'pending' },
  { key: 'curriculum', label: 'Currículo', status: 'pending' },
  { key: 'lessons', label: 'Lições', status: 'pending' },
  { key: 'validation', label: 'Validação', status: 'pending' },
];

export const DEFAULT_BRIEF_DATA: BriefData = {
  dreamOutcome: '',
  targetAudience: '',
  painPoints: [{ id: 1, text: '', intensity: 5 }],
  prerequisites: '',
  uniqueValue: '',
  methodology: '',
  expectedResults: '',
  duration: '',
};

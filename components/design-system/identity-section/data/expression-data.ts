import type { ToneRegister, VocabularyEntry, VoiceDimension } from '../types';

export const toneRegisters: ToneRegister[] = [
  {
    icon: 'megaphone',
    label: 'Formal-Inspirador (Manifesto)',
    quote:
      '"Este e um chamado aos inconformados. Aqueles que desafiam as tradicoes. Estes sao os lendarios."',
  },
  {
    icon: 'briefcase',
    label: 'Profissional-Direto (Interno)',
    quote: '"Lideres erram rapido, barato e diferente. Cultura lendaria e inegociavel."',
  },
  {
    icon: 'bolt',
    label: 'Informal-Intenso (Chat)',
    quote: '"Usa IA, porra! Antes de contratar, pergunta: da pra automatizar isso?"',
  },
];

export const voiceDimensions: VoiceDimension[] = [
  { left: 'Engracado', right: 'Serio', value: 4, description: 'Serio com leveza' },
  { left: 'Casual', right: 'Formal', value: 4, description: 'Casual-profissional' },
  { left: 'Irreverente', right: 'Respeitoso', value: 6, description: 'Rebelde fundamentado' },
  { left: 'Inspirador', right: 'Factual', value: 8, description: 'Epico e convocatorio' },
];

export const vocabularyEntries: VocabularyEntry[] = [
  { term: 'Lendario/a', neverUse: 'Usuario, Cliente' },
  { term: 'AI First', neverUse: 'Automatizacao' },
  { term: 'Forjando lendas', neverUse: 'Construindo equipes' },
  { term: 'Catalisadores de grandeza', neverUse: 'Bons gestores' },
  { term: 'Imortalizar seu legado', neverUse: 'Ter sucesso' },
];

export const metaphors = [
  '"Nao apontam o caminho; eles o pavimentam"',
  '"Danca na chuva de desafios"',
  '"Vulnerabilidade e sua armadura"',
  '"Metas como farois de possibilidades"',
  '"Saltos quanticos, nao melhorias incrementais"',
];

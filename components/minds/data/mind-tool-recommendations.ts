// Mind × Tool Stack Recommendations
// =============================================================================
// Mapeamento automático baseado em perfis psicométricos dos minds
// Cada mind é correlacionado com 2-3 Tool Stacks ideais

export interface MindToolRecommendation {
  mindSlug: string;
  mindName: string;
  mbti: string;
  enneagram: string;
  disc: string;
  primaryStack: string;
  secondaryStack: string;
  tertiaryStack?: string;
  rationale: string;
}

export const MIND_TOOL_RECOMMENDATIONS: MindToolRecommendation[] = [
  {
    mindSlug: 'elon_musk',
    mindName: 'Elon Musk',
    mbti: 'INTJ',
    enneagram: '5w6',
    disc: 'DC',
    primaryStack: 'The Strategic Leader',
    secondaryStack: 'The Data-Driven Decider',
    tertiaryStack: 'The Knowledge Architect',
    rationale:
      'INTJ com visão de longo prazo (50+ anos) gerenciando 6 organizações. Pensa em sistemas complexos (energia, transporte, espaço). Extremamente orientado a dados mas guiado por visão convergente de futuro.',
  },
  {
    mindSlug: 'naval_ravikant',
    mindName: 'Naval Ravikant',
    mbti: 'INTJ',
    enneagram: '5w4',
    disc: 'DI/DC',
    primaryStack: 'The Knowledge Architect',
    secondaryStack: 'The Strategic Leader',
    tertiaryStack: 'The Resilient Stoic',
    rationale:
      'Type 5 Investigator com obsessão por compreensão profunda. Síntese de conceitos complexos (filosofia + economia + tecnologia). Pratica meditação diária e desenvolveu própria filosofia de vida.',
  },
  {
    mindSlug: 'joao_lozano',
    mindName: 'João Gabriel Lozano',
    mbti: 'ENFP',
    enneagram: '3w2',
    disc: 'DI',
    primaryStack: 'The Creative Explorer',
    secondaryStack: 'The Change Catalyst',
    tertiaryStack: 'The Agile Builder',
    rationale:
      'ENFP com criatividade explosiva (Ne dominante). Type 3 focado em maestria técnica mas com asa 2 (helper) - missão de humanizar IA. DI (Captain Inspirer) - lidera com entusiasmo e comunicação cativante.',
  },
  {
    mindSlug: 'sam_altman',
    mindName: 'Sam Altman',
    mbti: 'ENTJ',
    enneagram: '3w2',
    disc: 'DC',
    primaryStack: 'The Strategic Leader',
    secondaryStack: 'The Agile Builder',
    tertiaryStack: 'The Change Catalyst',
    rationale:
      'ENTJ Commander com visão clara de futuro. Type 3 Achiever orientado a resultados e reconhecimento. CEO que consegue combinar estratégia de longo prazo com execução rápida.',
  },
  {
    mindSlug: 'paul_graham',
    mindName: 'Paul Graham',
    mbti: 'INTP',
    enneagram: '5w6',
    disc: 'CD',
    primaryStack: 'The Knowledge Architect',
    secondaryStack: 'The Deep Work Specialist',
    tertiaryStack: 'The Strategic Leader',
    rationale:
      'INTP Logician com pensamento analítico profundo. Type 5 que ganhou fortuna entendendo sistemas (Lisp, startups, venture capital). Escreve ensaios que revealam verdades não-óbvias.',
  },
  {
    mindSlug: 'dan_koe',
    mindName: 'Dan Koe',
    mbti: 'INTJ',
    enneagram: '5w4',
    disc: 'DC',
    primaryStack: 'The Knowledge Architect',
    secondaryStack: 'The Creative Explorer',
    tertiaryStack: 'The Content Creator',
    rationale:
      'INTJ com profunda curiosidade intelectual (5w4). Especialista em síntese de conhecimento (Neural Marketing, Content Strategy). Cria sistemas para pensar sobre sistemas.',
  },
  {
    mindSlug: 'mark_manson',
    mindName: 'Mark Manson',
    mbti: 'ENTP',
    enneagram: '8w7',
    disc: 'DI',
    primaryStack: 'The Change Catalyst',
    secondaryStack: 'The Creative Explorer',
    tertiaryStack: 'The Negotiator & Influencer',
    rationale:
      'ENTP Debater com foco em provocação intelectual. Type 8 Challenger questionador que desafia status quo. DI - comunica com autenticidade desconfortável. Autores de bestsellers que mudam perspectivas.',
  },
  {
    mindSlug: 'alex_hormozi',
    mindName: 'Alex Hormozi',
    mbti: 'INTJ',
    enneagram: '8w7',
    disc: 'DC',
    primaryStack: 'The Strategic Leader',
    secondaryStack: 'The Agile Builder',
    tertiaryStack: 'The Systems Optimizer',
    rationale:
      'INTJ com liderança assertiva. Type 8 Challenger que assume controle e decisão. Construiu múltiplos negócios escaláveis através de pensamento sistemático.',
  },
  {
    mindSlug: 'gary_vee',
    mindName: 'Gary Vaynerchuk',
    mbti: 'ESTP',
    enneagram: '3w2',
    disc: 'DI',
    primaryStack: 'The Agile Builder',
    secondaryStack: 'The Change Catalyst',
    tertiaryStack: 'The Negotiator & Influencer',
    rationale:
      'ESTP Entrepreneur com ação rápida e pragmatismo. Type 3 Achiever focado em resultados visíveis. DI - executa decisivamente e comunica com paixão viral. Mestre em adaptar-se a novas plataformas.',
  },
  {
    mindSlug: 'ray_kurzweil',
    mindName: 'Ray Kurzweil',
    mbti: 'INTJ',
    enneagram: '5w6',
    disc: 'DC',
    primaryStack: 'The Knowledge Architect',
    secondaryStack: 'The Strategic Leader',
    tertiaryStack: 'The Data-Driven Decider',
    rationale:
      'INTJ futurista com visão de décadas. Type 5 que sintetiza conhecimento de múltiplos domínios (IA, biologia, física). Famoso por prognósticos sobre Singularidade.',
  },
  {
    mindSlug: 'peter_thiel',
    mindName: 'Peter Thiel',
    mbti: 'INTJ',
    enneagram: '5w4',
    disc: 'DC',
    primaryStack: 'The Strategic Leader',
    secondaryStack: 'The Knowledge Architect',
    tertiaryStack: 'The Contrarian Thinker',
    rationale:
      'INTJ com perspectiva contrária sistemática (zero to one). Type 5w4 questionador que busca verdades não-óbvias. Filósofo que construiu impérios (PayPal, Palantir).',
  },
  {
    mindSlug: 'alan_nicolas',
    mindName: 'Alan Nicolas',
    mbti: 'ISTP',
    enneagram: '5w6',
    disc: 'DC',
    primaryStack: 'The Deep Work Specialist',
    secondaryStack: 'The Systems Optimizer',
    tertiaryStack: 'The Knowledge Architect',
    rationale:
      'ISTP Virtuoso com pragmatismo técnico. Type 5 que constróis sistemas e compreende mecanismos profundamente. DC - orientado a controle e consistência. Architect de AIOS-FULLSTACK.',
  },
  {
    mindSlug: 'adriano_de_marqui',
    mindName: 'Adriano de Marqui',
    mbti: 'ISFP',
    enneagram: '4w5',
    disc: 'SC',
    primaryStack: 'The Creative Explorer',
    secondaryStack: 'The Holistic Growth Seeker',
    tertiaryStack: 'The Resilient Stoic',
    rationale:
      'ISFP Adventurer com sensibilidade estética. Type 4w5 busca autenticidade e criatividade original. SC - gosto por harmonia e estabilidade emocional. Artista-pensador que integra arte e filosofia.',
  },
  {
    mindSlug: 'thiago_finch',
    mindName: 'Thiago Finch',
    mbti: 'ENFJ',
    enneagram: '2w3',
    disc: 'DI',
    primaryStack: 'The Change Catalyst',
    secondaryStack: 'The Negotiator & Influencer',
    tertiaryStack: 'The Customer-Centric Designer',
    rationale:
      'ENFJ Protagonist com foco em impacto humanista. Type 2w3 Helper motivado por servir (com asa de Achiever). DI - lidera com entusiasmo e atrai seguidores naturalmente.',
  },
  {
    mindSlug: 'jesus_cristo',
    mindName: 'Jesus Cristo',
    mbti: 'INFJ',
    enneagram: '1',
    disc: 'DI',
    primaryStack: 'The Change Catalyst',
    secondaryStack: 'The Holistic Growth Seeker',
    tertiaryStack: 'The Customer-Centric Designer',
    rationale:
      'INFJ Advocate com visão humanista profunda. Type 1 Reformer com missão moral - mudar mundo segundo princípios. DI - comunica com paixão que inspira transformação em seguidores.',
  },
  {
    mindSlug: 'jose_carlos_amorim',
    mindName: 'José Carlos Amorim',
    mbti: 'ESFJ',
    enneagram: '6w5',
    disc: 'DI',
    primaryStack: 'The Negotiator & Influencer',
    secondaryStack: 'The Customer-Centric Designer',
    tertiaryStack: 'The Structured Thinker',
    rationale:
      'ESFJ Consul com foco em harmonia e lealdade. Type 6w5 focado em segurança através de relacionamento confiável. DI - lidera colaborativamente e constrói confiança duradoura.',
  },
  {
    mindSlug: 'napoleon_hill',
    mindName: 'Napoleon Hill',
    mbti: 'ENTJ',
    enneagram: '8w7',
    disc: 'DI',
    primaryStack: 'The Strategic Leader',
    secondaryStack: 'The Change Catalyst',
    tertiaryStack: 'The Negotiator & Influencer',
    rationale:
      'ENTJ Commander com liderança assertiva. Type 8w7 Challenger que questiona e conquista. DI - inspira ação em massa. Fundador do movimento de autoajuda baseado em princípios psicológicos.',
  },

  // Adicionar mais minds conforme disponível
];

// Helper para buscar recomendações por mind
export function getMindToolRecommendations(
  mindSlug: string
): MindToolRecommendation | undefined {
  return MIND_TOOL_RECOMMENDATIONS.find((rec) => rec.mindSlug === mindSlug);
}

// Helper para listar todos os minds com recomendações
export function getAllMindRecommendations(): MindToolRecommendation[] {
  return MIND_TOOL_RECOMMENDATIONS;
}

// Helper para buscar minds por tool stack
export function getMindsByToolStack(
  stackName: string
): MindToolRecommendation[] {
  return MIND_TOOL_RECOMMENDATIONS.filter(
    (rec) =>
      rec.primaryStack === stackName ||
      rec.secondaryStack === stackName ||
      rec.tertiaryStack === stackName
  );
}

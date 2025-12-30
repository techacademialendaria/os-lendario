// TOOL STACKS REVERSE MAPPING
// =============================================================================
// Shows each Tool Stack with all personality types that fit it
// Inverted view: Stack → [All Types]

export const TOOL_STACK_PROFILES = {
  'The Knowledge Architect': {
    description: 'Para quem constroi sistemas de conhecimento e aprendizado',
    idealFor: 'Alto Need for Cognition, meticuloso, docente/comunicador',
    color: '#a855f7',
    icon: 'book-open',
    coreTools: ['Mental Models Latticework', 'Spaced Repetition', 'Concept Mapping', 'Teaching Method (Feynman)', 'Knowledge Graph'],
    
    enneagram: {
      primary: ['Type 5 - The Investigator'],
      secondary: ['Type 1 - The Reformer'],
      explanation: 'Type 5 prospera com compreensao profunda. Type 1 aprecia estrutura de conhecimento.'
    },
    
    mbti: {
      primary: ['INTJ - The Architect', 'INTP - The Logician'],
      secondary: ['INFJ - The Advocate'],
      explanation: 'INTx tipos buscam compreensao profunda e sistemica. INFJ combina inteligencia com humanismo.'
    },
    
    bigFive: {
      primary: ['Alta Openness (criatividade intelectual)', 'Alto Need for Cognition'],
      secondary: ['Alta Conscientiousness (rigor)'],
      explanation: 'Abertura a experiencias e curiosidade sao essenciais. Conscientiousness traz rigor.'
    },
    
    disc: {
      primary: ['C - Conscientiousness'],
      secondary: ['I - Influence (teaching)'],
      explanation: 'C analisa profundamente. I consegue comunicar descobertas.'
    },
    
    secondaryStacks: ['The Data-Driven Decider', 'The Strategic Leader'],
    avoidStacks: ['The Customer-Centric Designer', 'The Negotiator & Influencer'],
    strength: 'Pensamento critico, analise profunda, originalidade intelectual',
    challenge: 'Pode ficar preso em teoria, dificuldade em execucao pratica'
  },

  'The Strategic Leader': {
    description: 'Para quem precisa de visao e direcao estrategica',
    idealFor: 'Alto pensamento sistemico, alta tolerancia a ambiguidade',
    color: '#10b981',
    icon: 'compass',
    coreTools: ['SWOT', 'OKRs', 'Wardley Maps', 'Porters 5 Forces', 'Scenario Planning'],
    
    enneagram: {
      primary: ['Type 1 - The Reformer', 'Type 8 - The Challenger'],
      secondary: ['Type 3 - The Achiever'],
      explanation: 'Type 1 busca melhorar sistematicamente. Type 8 comanda e direciona. Type 3 quer resultados.'
    },
    
    mbti: {
      primary: ['INTJ - The Architect', 'ENTJ - The Commander'],
      secondary: ['ISTJ - The Logistician'],
      explanation: 'INTx e ENTJ pensam estrategicamente. ISTJ oferece execucao rigorosa.'
    },
    
    bigFive: {
      primary: ['Alta Conscientiousness', 'Alto pensamento sistemico'],
      secondary: ['Abertura moderada a alta'],
      explanation: 'Conscientiousness traz responsabilidade. Abertura permite visionar futuros.'
    },
    
    disc: {
      primary: ['D - Dominance', 'C - Conscientiousness'],
      secondary: [],
      explanation: 'D fornece comando decisivo. C fornece planejamento rigoroso.'
    },
    
    secondaryStacks: ['The Change Catalyst', 'The Agile Builder'],
    avoidStacks: ['The Creative Explorer', 'The Holistic Growth Seeker'],
    strength: 'Visao estrategica, planejamento sistemico, comando',
    challenge: 'Pode ser inflexivel, ignora nuancas humanas'
  },

  'The Structured Thinker': {
    description: 'Para quem precisa de ordem e clareza',
    idealFor: 'Alta Conscientiousness, baixa Abertura a Experiencia',
    color: '#3b82f6',
    icon: 'layout-grid',
    coreTools: ['GTD', 'Eisenhower Matrix', 'SMART Goals', 'Checklists', 'Time Blocking'],
    
    enneagram: {
      primary: ['Type 1 - The Reformer', 'Type 6 - The Loyalist'],
      secondary: [],
      explanation: 'Type 1 quer fazer certo. Type 6 quer seguranca atraves de processos.'
    },
    
    mbti: {
      primary: ['ISTJ - The Logistician', 'ESTJ - The Executive'],
      secondary: ['INTJ - The Architect'],
      explanation: 'ISTx sao naturalmente organizados. INTJ aprecia estrutura para executar ideias.'
    },
    
    bigFive: {
      primary: ['Alta Conscientiousness'],
      secondary: ['Baixa Abertura', 'Baixa Extraversion'],
      explanation: 'Conscientiousness e a pedra fundamental. Preferencia por estabilidade.'
    },
    
    disc: {
      primary: ['C - Conscientiousness', 'S - Steadiness'],
      secondary: [],
      explanation: 'C quer precisao. S quer previsibilidade e estabilidade.'
    },
    
    secondaryStacks: ['The Systems Optimizer', 'The Risk Manager'],
    avoidStacks: ['The Creative Explorer'],
    strength: 'Organizacao impecavel, responsabilidade, precisao',
    challenge: 'Over-engineering, rigidez, dificuldade com mudanca'
  },

  'The Creative Explorer': {
    description: 'Para quem precisa de inovacao e descoberta',
    idealFor: 'Alta Abertura, alto Need for Cognition, baixa Conscientiousness',
    color: '#f59e0b',
    icon: 'lightbulb',
    coreTools: ['Design Thinking', 'Mind Mapping', 'First Principles', 'Brainstorming', 'Rapid Prototyping'],
    
    enneagram: {
      primary: ['Type 4 - The Individualist', 'Type 7 - The Enthusiast'],
      secondary: ['Type 5 - The Investigator'],
      explanation: 'Type 4 quer expressar originalidade. Type 7 busca novidade. Type 5 explora ideias.'
    },
    
    mbti: {
      primary: ['ENTP - The Debater', 'INFP - The Mediator'],
      secondary: ['ENFP - The Campaigner', 'ISFP - The Adventurer'],
      explanation: 'ENxP adoram inovacao e debate. IxFP trazem autenticidade criativa.'
    },
    
    bigFive: {
      primary: ['Alta Openness (criatividade)', 'Alto Need for Cognition'],
      secondary: ['Baixa Conscientiousness (espontaneidade)'],
      explanation: 'Abertura permite exploracao. Baixa Conscientiousness permite experimentacao.'
    },
    
    disc: {
      primary: ['I - Influence', 'D - Dominance'],
      secondary: ['S - Steadiness (menos comum)'],
      explanation: 'I traz entusiasmo. D traz velocidade. S raramente se encaixa.'
    },
    
    secondaryStacks: ['The Data-Driven Decider', 'The Agile Builder'],
    avoidStacks: ['The Structured Thinker', 'The Systems Optimizer'],
    strength: 'Inovacao, adaptabilidade, pensamento divergente',
    challenge: 'Inconclusao, falta de foco, implementacao fraca'
  },

  'The Resilient Stoic': {
    description: 'Para quem precisa de resiliencia e paz interior',
    idealFor: 'Alta estabilidade emocional, introversao moderada',
    color: '#8b5cf6',
    icon: 'shield',
    coreTools: ['Stoic Dichotomy of Control', 'Negative Visualization', 'Journaling', 'Meditation', 'Memento Mori'],
    
    enneagram: {
      primary: ['Type 4 - The Individualist', 'Type 9 - The Peacemaker'],
      secondary: ['Type 2 - The Helper'],
      explanation: 'Type 4 busca profundidade emocional. Type 9 busca paz. Type 2 encontra paz em ajudar.'
    },
    
    mbti: {
      primary: ['INFJ - The Advocate', 'ISFP - The Adventurer'],
      secondary: ['INFP - The Mediator'],
      explanation: 'INFx trazem reflexao profunda. ISFx trazem sensibilidade estetica.'
    },
    
    bigFive: {
      primary: ['Baixa Neuroticism (estabilidade)', 'Alta Conscientiousness (disciplina)'],
      secondary: ['Alta Agreeableness (compaixao)'],
      explanation: 'Estabilidade e disciplina sao bases. Agreeableness traz compaixao consigo mesmo.'
    },
    
    disc: {
      primary: ['S - Steadiness'],
      secondary: ['C - Conscientiousness'],
      explanation: 'S oferece paz atraves de previsibilidade. C atraves de controle.'
    },
    
    secondaryStacks: ['The Holistic Growth Seeker', 'The Deep Work Specialist'],
    avoidStacks: ['The Change Catalyst', 'The Agile Builder'],
    strength: 'Resiliencia emocional, autoreflexao, sabedoria de longo prazo',
    challenge: 'Passividade excessiva, fuga de acao, isolamento'
  },

  'The Data-Driven Decider': {
    description: 'Para quem precisa de decisoes baseadas em evidencia',
    idealFor: 'Alto Need for Cognition, baixa impulsividade, alta tolerancia a complexidade',
    color: '#ec4899',
    icon: 'bar-chart-2',
    coreTools: ['Bayesian Thinking', 'RICE Scoring', 'Probabilistic Thinking', 'Decision Matrix', 'Pre-mortem Analysis'],
    
    enneagram: {
      primary: ['Type 5 - The Investigator', 'Type 3 - The Achiever'],
      secondary: ['Type 1 - The Reformer'],
      explanation: 'Type 5 quer rigor. Type 3 quer resultados otimizados. Type 1 quer precisao moral.'
    },
    
    mbti: {
      primary: ['INTJ - The Architect', 'INTP - The Logician'],
      secondary: ['ESTJ - The Executive'],
      explanation: 'INTx trazem analise profunda. ESTJ traz decisividade rapida.'
    },
    
    bigFive: {
      primary: ['Alta Conscientiousness', 'Alto Need for Cognition'],
      secondary: ['Baixa Neuroticism (calma sob pressao)'],
      explanation: 'Conscientiousness traz rigor. Need for Cognition traz analise. Estabilidade traz clareza.'
    },
    
    disc: {
      primary: ['C - Conscientiousness'],
      secondary: ['D - Dominance'],
      explanation: 'C analisa dados profundamente. D toma decisoes rapido com dados.'
    },
    
    secondaryStacks: ['The Strategic Leader', 'The Knowledge Architect'],
    avoidStacks: ['The Creative Explorer', 'The Holistic Growth Seeker'],
    strength: 'Analise rigorosa, precisao, decisoes otimizadas',
    challenge: 'Paralisia por analise, falta de intuicao, inflexibilidade'
  },

  'The Agile Builder': {
    description: 'Para quem precisa de execucao rapida e adaptavel',
    idealFor: 'Alta energia, tolerancia a mudanca, orientacao a resultados',
    color: '#06b6d4',
    icon: 'zap',
    coreTools: ['Lean Startup', 'SCRUM', 'Kanban', 'Pomodoro', 'Retrospectives'],
    
    enneagram: {
      primary: ['Type 3 - The Achiever', 'Type 7 - The Enthusiast'],
      secondary: ['Type 8 - The Challenger'],
      explanation: 'Type 3 quer resultados rapidos. Type 7 quer novidade. Type 8 quer velocidade.'
    },
    
    mbti: {
      primary: ['ENTJ - The Commander', 'ESTP - The Entrepreneur'],
      secondary: ['ENFP - The Campaigner'],
      explanation: 'ENTJ e ESTP combinam comando com acao. ENFP traz energia dinamica.'
    },
    
    bigFive: {
      primary: ['Alta Extraversion', 'Baixa Conscientiousness (experimentacao)'],
      secondary: ['Alta Abertura a mudanca'],
      explanation: 'Extraversion traz energia. Baixa Conscientiousness permite pivotar. Abertura traz adaptacao.'
    },
    
    disc: {
      primary: ['D - Dominance'],
      secondary: ['I - Influence'],
      explanation: 'D quer velocidade e controle. I traz energia e colaboracao.'
    },
    
    secondaryStacks: ['The Change Catalyst', 'The Data-Driven Decider'],
    avoidStacks: ['The Deep Work Specialist', 'The Knowledge Architect'],
    strength: 'Velocidade, adaptabilidade, momentum',
    challenge: 'Qualidade comprometida, falta de reflexao, burnout'
  },

  'The Systems Optimizer': {
    description: 'Para quem gerencia operacoes complexas e quer eficiencia',
    idealFor: 'Systemico, atencao a detalhes, orientacao a processos',
    color: '#14b8a6',
    icon: 'settings',
    coreTools: ['Lean Manufacturing', 'Six Sigma', 'Process Mapping', 'PDCA Cycle', 'Bottleneck Analysis'],
    
    enneagram: {
      primary: ['Type 1 - The Reformer', 'Type 6 - The Loyalist'],
      secondary: ['Type 3 - The Achiever'],
      explanation: 'Type 1 quer perfeicao. Type 6 quer seguranca. Type 3 quer eficiencia.'
    },
    
    mbti: {
      primary: ['ISTJ - The Logistician', 'ESTJ - The Executive'],
      secondary: ['ISTP - The Virtuoso'],
      explanation: 'ISTx sao naturalmente processualmente orientados. ISTP entende mecanismos.'
    },
    
    bigFive: {
      primary: ['Alta Conscientiousness', 'Atencao a detalhes'],
      secondary: ['Baixa Abertura (preferencia por processos comprovados)'],
      explanation: 'Conscientiousness traz responsabilidade por qualidade. Baixa Abertura traz foco.'
    },
    
    disc: {
      primary: ['C - Conscientiousness'],
      secondary: ['S - Steadiness'],
      explanation: 'C quer precisao. S quer estabilidade nos processos.'
    },
    
    secondaryStacks: ['The Structured Thinker', 'The Risk Manager'],
    avoidStacks: ['The Creative Explorer', 'The Change Catalyst'],
    strength: 'Eficiencia maxima, precisao operacional, consistencia',
    challenge: 'Inflexibilidade, perda de inovacao, slow to adapt'
  },

  'The Change Catalyst': {
    description: 'Para quem lidera transformacao organizacional',
    idealFor: 'Alta Abertura, carisma, conforto com ambiguidade',
    color: '#f97316',
    icon: 'trending-up',
    coreTools: ['Transformational Leadership', 'Stakeholder Mapping', 'Change Management', 'Narrative Design', 'Coalition Building'],
    
    enneagram: {
      primary: ['Type 8 - The Challenger', 'Type 2 - The Helper'],
      secondary: ['Type 3 - The Achiever'],
      explanation: 'Type 8 comanda transformacao. Type 2 engaja pessoas. Type 3 quer realizar.'
    },
    
    mbti: {
      primary: ['ENTJ - The Commander', 'ENTP - The Debater'],
      secondary: ['ESFJ - The Consul'],
      explanation: 'ENTJ comanda mudanca. ENTP questiona status quo. ESFJ traz empatia.'
    },
    
    bigFive: {
      primary: ['Alta Extraversion', 'Alta Abertura'],
      secondary: ['Carisma e presenca'],
      explanation: 'Extraversion traz influencia social. Abertura traz visao de futuros.'
    },
    
    disc: {
      primary: ['D - Dominance', 'I - Influence'],
      secondary: [],
      explanation: 'D fornece comando. I fornece persuasao e carisma.'
    },
    
    secondaryStacks: ['The Strategic Leader', 'The Negotiator & Influencer'],
    avoidStacks: ['The Resilient Stoic', 'The Deep Work Specialist'],
    strength: 'Lideranca inspiradora, persuasao, momentum de transformacao',
    challenge: 'Pode ser autocrático, ignora detalhes, deixa pessoas para tras'
  },

  'The Holistic Growth Seeker': {
    description: 'Para desenvolvimento pessoal integrado (corpo, mente, espirito)',
    idealFor: 'Abertura elevada, introversao moderada, busca de significado',
    color: '#e11d48',
    icon: 'heart',
    coreTools: ['Habit Stacking', 'Journaling Practice', 'Meditation/Mindfulness', 'Zone of Genius Framework', 'Ikigai Method'],
    
    enneagram: {
      primary: ['Type 4 - The Individualist', 'Type 9 - The Peacemaker', 'Type 2 - The Helper'],
      secondary: [],
      explanation: 'Type 4 busca autenticidade. Type 9 busca harmonizacao. Type 2 busca crescimento para servir.'
    },
    
    mbti: {
      primary: ['INFP - The Mediator', 'INFJ - The Advocate'],
      secondary: ['ISFP - The Adventurer'],
      explanation: 'INFP e INFJ combinam profundidade emocional com idealism. ISFP traz sensibilidade estetica.'
    },
    
    bigFive: {
      primary: ['Alta Abertura', 'Alta Agreeableness'],
      secondary: ['Equilibrio emocional'],
      explanation: 'Abertura permite exploracao integral. Agreeableness traz compaixao por si mesmo.'
    },
    
    disc: {
      primary: ['S - Steadiness'],
      secondary: ['C - Conscientiousness', 'I - Influence'],
      explanation: 'S oferece base estavel. C traz disciplina. I traz alegria e conexao.'
    },
    
    secondaryStacks: ['The Knowledge Architect', 'The Creative Explorer'],
    avoidStacks: ['The Systems Optimizer', 'The Risk Manager'],
    strength: 'Integracao pessoal, autenticidade, crescimento holistico',
    challenge: 'Vagueness espiritual, falta de metricas, evasao de problemas reais'
  },

  'The Risk Manager': {
    description: 'Para quem precisa de contingencia e preparo para cenarios adversos',
    idealFor: 'Cauteloso, sistemico, baixa impulsividade, planejamento rigoroso',
    color: '#0891b2',
    icon: 'shield-alert',
    coreTools: ['Risk Register', 'Pre-mortem Analysis', 'Scenario Planning', 'Decision Trees', 'Simulation/Stress Testing'],
    
    enneagram: {
      primary: ['Type 6 - The Loyalist', 'Type 1 - The Reformer'],
      secondary: [],
      explanation: 'Type 6 e motivado por seguranca. Type 1 quer responsabilidade maxima.'
    },
    
    mbti: {
      primary: ['ISTJ - The Logistician', 'INTJ - The Architect'],
      secondary: [],
      explanation: 'ISTJ planeja conservadoramente. INTJ antecipa cenarios complexos.'
    },
    
    bigFive: {
      primary: ['Alta Conscientiousness', 'Moderada Neuroticism (cautela)'],
      secondary: ['Baixa Abertura (preferencia por ambientes conhecidos)'],
      explanation: 'Conscientiousness traz rigor. Neuroticism moderado traz prudencia. Baixa Abertura traz foco.'
    },
    
    disc: {
      primary: ['C - Conscientiousness'],
      secondary: ['S - Steadiness'],
      explanation: 'C analisa riscos. S evita surpresas.'
    },
    
    secondaryStacks: ['The Structured Thinker', 'The Strategic Leader'],
    avoidStacks: ['The Agile Builder', 'The Change Catalyst'],
    strength: 'Preparacao excelente, antecipacao de problemas, robustez',
    challenge: 'Paralisia por fear, over-planning, falta de velocidade'
  },

  'The Customer-Centric Designer': {
    description: 'Para quem cria produtos centrados em necessidades reais do usuario',
    idealFor: 'Empatia elevada, curiosidade sobre comportamento, pensamento divergente',
    color: '#d946ef',
    icon: 'users',
    coreTools: ['Jobs To Be Done', 'User Research', 'Design Thinking', 'Prototyping & Testing', 'Empathy Mapping'],
    
    enneagram: {
      primary: ['Type 2 - The Helper', 'Type 4 - The Individualist'],
      secondary: ['Type 9 - The Peacemaker'],
      explanation: 'Type 2 quer entender necessidades alheias. Type 4 traz criatividade. Type 9 traz inclusividade.'
    },
    
    mbti: {
      primary: ['INFJ - The Advocate', 'ISFJ - The Defender'],
      secondary: ['ESFJ - The Consul'],
      explanation: 'INFx combinam empatia com insights. ISFJ e dedicado a satisfacao. ESFJ e socialmente conectado.'
    },
    
    bigFive: {
      primary: ['Alta Agreeableness', 'Alta Abertura'],
      secondary: ['Moderada Conscientiousness'],
      explanation: 'Agreeableness traz empatia profunda. Abertura traz criatividade. Conscientiousness traz rigor UX.'
    },
    
    disc: {
      primary: ['I - Influence', 'S - Steadiness'],
      secondary: [],
      explanation: 'I entende pessoas e persuade. S oferece escuta ativa e confiabilidade.'
    },
    
    secondaryStacks: ['The Creative Explorer', 'The Holistic Growth Seeker'],
    avoidStacks: ['The Data-Driven Decider', 'The Systems Optimizer'],
    strength: 'Empatia profunda, design inclusivo, user satisfaction',
    challenge: 'Design por comissao, scope creep, falta de rigor analítico'
  },

  'The Negotiator & Influencer': {
    description: 'Para quem precisa ganhar acordos e influenciar decisoes',
    idealFor: 'Alto carisma, empatia, persuasion, leitura social',
    color: '#fb923c',
    icon: 'handshake',
    coreTools: ['Interest-Based Negotiation (Fisher)', 'BATNA Analysis', 'Anchoring & Framing', 'Social Proof & Reciprocity', 'Principled Disagreement'],
    
    enneagram: {
      primary: ['Type 2 - The Helper', 'Type 3 - The Achiever', 'Type 8 - The Challenger'],
      secondary: [],
      explanation: 'Type 2 entende motivacoes. Type 3 quer ganhos. Type 8 quer poder.'
    },
    
    mbti: {
      primary: ['ENTJ - The Commander', 'ESTP - The Entrepreneur'],
      secondary: ['ESFJ - The Consul'],
      explanation: 'ENTJ e ESTP sao naturalmente persuasivos. ESFJ traz empatia genuina.'
    },
    
    bigFive: {
      primary: ['Alta Extraversion', 'Alta Agreeableness'],
      secondary: ['Carisma'],
      explanation: 'Extraversion traz presenca. Agreeableness traz confianca. Carisma traz persuasao.'
    },
    
    disc: {
      primary: ['I - Influence', 'D - Dominance'],
      secondary: [],
      explanation: 'I e persuasivo e engajador. D e assertivo e decisivo.'
    },
    
    secondaryStacks: ['The Change Catalyst', 'The Strategic Leader'],
    avoidStacks: ['The Deep Work Specialist', 'The Knowledge Architect'],
    strength: 'Persuasao, lideranca social, criar aliancas',
    challenge: 'Manipulacao, foco em ganhos proprios, superficialidade'
  },

  'The Deep Work Specialist': {
    description: 'Para quem precisa de concentracao profunda e output de qualidade',
    idealFor: 'Alto conscientiousness, baixa impulsividade, introversao moderada',
    color: '#6366f1',
    icon: 'focus',
    coreTools: ['Deep Work', 'Time Blocking', 'Pomodoro Technique', 'Distraction Matrix', 'Flow State Triggers'],
    
    enneagram: {
      primary: ['Type 5 - The Investigator', 'Type 1 - The Reformer'],
      secondary: [],
      explanation: 'Type 5 busca profundidade. Type 1 busca excelencia em execucao.'
    },
    
    mbti: {
      primary: ['INTJ - The Architect', 'INTP - The Logician'],
      secondary: ['ISFP - The Adventurer'],
      explanation: 'INTx trazem foco sistemico. ISFP traz sensibilidade estetica no trabalho.'
    },
    
    bigFive: {
      primary: ['Alta Conscientiousness', 'Introversao moderada'],
      secondary: ['Baixa Extraversion'],
      explanation: 'Conscientiousness traz disciplina. Introversao traz concentracao. Baixa Extraversion evita distracao social.'
    },
    
    disc: {
      primary: ['C - Conscientiousness'],
      secondary: ['S - Steadiness'],
      explanation: 'C oferece rigor. S oferece consistencia.'
    },
    
    secondaryStacks: ['The Knowledge Architect', 'The Resilient Stoic'],
    avoidStacks: ['The Change Catalyst', 'The Negotiator & Influencer'],
    strength: 'Foco profundo, output de qualidade, maestria',
    challenge: 'Isolamento social, falta de colaboracao, pode ser tedioso'
  }
};

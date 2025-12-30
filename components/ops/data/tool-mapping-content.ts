// TOOL STACKS X MAPPING SYSTEMS CORRELATIONS
// =============================================================================
// Conecta Tool Stacks com tipos de personalidade dos mapping systems
// Mostra qual stack eh ideal para cada tipo

export const TOOL_STACK_MAPPING = {
  title: 'Tool Stacks X Mapping Systems',
  description: 'Como diferentes tipos de personalidade se alinham com Tool Stacks especificos.',

  // =========================================================================
  // ENNEAGRAM CORRELATIONS
  // =========================================================================
  enneagram: {
    system: 'Enneagram',
    description: '9 tipos baseados em motivacoes fundamentais e mecanismos de defesa',
    correlations: [
      {
        type: 'Type 1 - The Reformer',
        tagline: 'Principios, integridade, melhoria',
        motivation: 'Ser correto e melhorar o mundo',
        defense: 'Raiva reprimida quando nao conseguem atingir ideal',
        primaryStacks: ['The Structured Thinker', 'The Systems Optimizer', 'The Risk Manager'],
        explanation: 'Tipo 1 prospera com sistemas de qualidade (Six Sigma), checklists e standards. GTD fornece estrutura para executar ideais. OKRs traduzem principios em metricas.',
        avoidStacks: ['The Creative Explorer', 'The Holistic Growth Seeker'],
        avoidanceReason: 'Criatividade sem estrutura e spiritualismo superficial conflitam com rigor de Type 1.'
      },
      {
        type: 'Type 2 - The Helper',
        tagline: 'Servico, relacionamento, reconhecimento',
        motivation: 'Ser amado e apreciado por ajudar',
        defense: 'Sacrificio de si mesmo e possessividade',
        primaryStacks: ['The Customer-Centric Designer', 'The Negotiator & Influencer', 'The Change Catalyst'],
        explanation: 'Tipo 2 prospera com JTBD (entender necessidade de outros), Empathy Mapping e User Research. Excele em Stakeholder Mapping e Coalition Building. Habilidade natural em persuasao.',
        avoidStacks: ['The Deep Work Specialist', 'The Knowledge Architect'],
        avoidanceReason: 'Isolamento de deep work e focagem em teoria distante de pessoas.'
      },
      {
        type: 'Type 3 - The Achiever',
        tagline: 'Excelencia, eficiencia, resultados',
        motivation: 'Ser bem-sucedido e admirado por realizacoes',
        defense: 'Falsidade e focagem excessiva em imagem',
        primaryStacks: ['The Agile Builder', 'The Data-Driven Decider', 'The Systems Optimizer'],
        explanation: 'Tipo 3 prospera com RICE Scoring (priorizacao baseada em impacto), SCRUM (execucao rapida) e OKRs (metas ambiciosas). Metricas e feedback rapido sao essenciais.',
        avoidStacks: ['The Resilient Stoic', 'The Holistic Growth Seeker'],
        avoidanceReason: 'Foco interno e reflexao lenta conflitam com velocidade de Type 3.'
      },
      {
        type: 'Type 4 - The Individualist',
        tagline: 'Autenticidade, criatividade, profundidade',
        motivation: 'Ser unico e criar algo significativo',
        defense: 'Melancolia e auto-compaixao dramatica',
        primaryStacks: ['The Creative Explorer', 'The Holistic Growth Seeker', 'The Knowledge Architect'],
        explanation: 'Tipo 4 prospera com Design Thinking (explorar criatividade), Journaling (profundidade emocional) e Mental Models Latticework (integracao profunda). Excelente em originality.',
        avoidStacks: ['The Structured Thinker', 'The Systems Optimizer'],
        avoidanceReason: 'Estrutura rigida mata criatividade e expressao individual de Type 4.'
      },
      {
        type: 'Type 5 - The Investigator',
        tagline: 'Conhecimento, compreensao, investigacao',
        motivation: 'Compreender tudo profundamente',
        defense: 'Isolamento e compartimentalizacao',
        primaryStacks: ['The Knowledge Architect', 'The Data-Driven Decider', 'The Strategic Leader'],
        explanation: 'Tipo 5 PROSPERA com The Knowledge Architect (Mental Models, Knowledge Graphs, Concept Mapping). Data-Driven Decider fornece rigor. Strategic Leader oferece aplicacao sistemica.',
        avoidStacks: ['The Customer-Centric Designer', 'The Negotiator & Influencer'],
        avoidanceReason: 'Foco em usuarios e persuasao desviam Type 5 de profundidade intelectual.'
      },
      {
        type: 'Type 6 - The Loyalist',
        tagline: 'Seguranca, confiabilidade, lealdade',
        motivation: 'Ser seguro e parte de um grupo seguro',
        defense: 'Paranoia e falha de confianca',
        primaryStacks: ['The Risk Manager', 'The Structured Thinker', 'The Systems Optimizer'],
        explanation: 'Tipo 6 prospera com Risk Register (mapeamento de exposicoes), Pre-mortem (antecipacao), Scenario Planning (preparacao). Checklists e processos comprovados sao reconfortantes.',
        avoidStacks: ['The Change Catalyst', 'The Agile Builder'],
        avoidanceReason: 'Mudanca rapida e ambiguidade aumentam ansiedade de Type 6.'
      },
      {
        type: 'Type 7 - The Enthusiast',
        tagline: 'Experiencia, variedade, diversao',
        motivation: 'Evitar dor atraves de experiencia positiva',
        defense: 'Distracao e fuga de dor',
        primaryStacks: ['The Agile Builder', 'The Creative Explorer', 'The Change Catalyst'],
        explanation: 'Tipo 7 prospera com Lean Startup (rapido, novo), Design Thinking (variedade de ideias) e SCRUM (mudanca dinamica). Precisa de velocidade e novidade.',
        avoidStacks: ['The Deep Work Specialist', 'The Resilient Stoic'],
        avoidanceReason: 'Foco profundo e reflexao interna sao dolorosos para Type 7.'
      },
      {
        type: 'Type 8 - The Challenger',
        tagline: 'Poder, justica, controle',
        motivation: 'Ter poder e nao ser controlado',
        defense: 'Agressividade e dominacao',
        primaryStacks: ['The Strategic Leader', 'The Change Catalyst', 'The Negotiator & Influencer'],
        explanation: 'Tipo 8 prospera com lideranca transformacional (visao e comando), Stakeholder Mapping (identificar aliados), decisoes rápidas. SWOT e Porter analise competitiva.',
        avoidStacks: ['The Deep Work Specialist', 'The Knowledge Architect'],
        avoidanceReason: 'Isolamento intelectual afasta Type 8 de acao e influencia.'
      },
      {
        type: 'Type 9 - The Peacemaker',
        tagline: 'Paz, harmonia, aceitacao',
        motivation: 'Manter paz e evitar conflito',
        defense: 'Apatia e sedacao',
        primaryStacks: ['The Holistic Growth Seeker', 'The Resilient Stoic', 'The Systems Optimizer'],
        explanation: 'Tipo 9 prospera com Meditation (paz interna), Habit Stacking (progresso sem luta), PDCA (melhoria suave). Precisa de processos nao-conflituosos.',
        avoidStacks: ['The Change Catalyst', 'The Negotiator & Influencer'],
        avoidanceReason: 'Mudanca turbulenta e negociacao agressiva causam stress a Type 9.'
      }
    ]
  },

  // =========================================================================
  // MBTI CORRELATIONS
  // =========================================================================
  mbti: {
    system: 'Myers-Briggs Type Indicator',
    description: '16 tipos baseados em 4 dimensoes: Extraversao, Sensacao/Intuicao, Pensamento/Sentimento, Julgamento/Percepcao',
    correlations: [
      {
        type: 'INTJ - The Architect',
        tagline: 'Visao estrategica, independencia, competencia',
        dimensions: 'Introvertido, Intuitivo, Pensador, Julgador',
        primaryStacks: ['The Strategic Leader', 'The Knowledge Architect', 'The Systems Optimizer'],
        explanation: 'INTJ prospera com visao de longo prazo (Strategic Leader), pensamento sistemico profundo (Knowledge Architect) e otimizacao de processos (Systems Optimizer). Naturalmente inclinado a big-picture strategy.',
        secondaryStacks: ['The Risk Manager', 'The Data-Driven Decider'],
        strengths: 'Pensamento estrategico, visao futura, independencia',
        challenges: 'Pode ser insensivel socialmente, overhead em execution'
      },
      {
        type: 'INTP - The Logician',
        tagline: 'Analise logica, precisao, teoria',
        dimensions: 'Introvertido, Intuitivo, Pensador, Perceptivo',
        primaryStacks: ['The Knowledge Architect', 'The Data-Driven Decider', 'The Deep Work Specialist'],
        explanation: 'INTP prospera com exploracoes intelectuais profundas (Knowledge Architect), rigor analítico (Data-Driven) e foco (Deep Work). Ama descobrir principios fundamentais.',
        secondaryStacks: ['The Researcher', 'The Systems Optimizer'],
        strengths: 'Pensamento critico, analise profunda, originalidade',
        challenges: 'Pode ficar preso em teoria, dificuldade em execucao'
      },
      {
        type: 'ENTJ - The Commander',
        tagline: 'Lideranca visonaria, eficiencia, poder',
        dimensions: 'Extravertido, Intuitivo, Pensador, Julgador',
        primaryStacks: ['The Strategic Leader', 'The Change Catalyst', 'The Agile Builder'],
        explanation: 'ENTJ prospera com estrategia transformacional (Strategic Leader), lideranca de mudanca (Change Catalyst) e execucao rapida (Agile Builder). Natural em command.',
        secondaryStacks: ['The Systems Optimizer', 'The Negotiator & Influencer'],
        strengths: 'Comando natural, visao estrategica, decisividade',
        challenges: 'Pode ser autocrático, ignora sentimentos dos outros'
      },
      {
        type: 'ENTP - The Debater',
        tagline: 'Inovacao, debate, possibilidades',
        dimensions: 'Extravertido, Intuitivo, Pensador, Perceptivo',
        primaryStacks: ['The Creative Explorer', 'The Data-Driven Decider', 'The Agile Builder'],
        explanation: 'ENTP prospera com inovacao aberta (Creative Explorer), exploracoes multiplas (Data-Driven testing) e mudanca rapida (Agile). Adora argumentacao e novas ideias.',
        secondaryStacks: ['The Negotiator & Influencer'],
        strengths: 'Inovacao, adaptabilidade, argumentacao',
        challenges: 'Inconclusao, dificuldade em foco, pode ser argumentativo demais'
      },
      {
        type: 'INFJ - The Advocate',
        tagline: 'Visao humanista, autenticidade, impacto',
        dimensions: 'Introvertido, Intuitivo, Sentimento, Julgador',
        primaryStacks: ['The Holistic Growth Seeker', 'The Customer-Centric Designer', 'The Change Catalyst'],
        explanation: 'INFJ prospera com proposito significativo (Holistic Growth), compreensao profunda de pessoas (Customer-Centric) e lideranca de mudanca humanista (Change Catalyst).',
        secondaryStacks: ['The Deep Work Specialist', 'The Knowledge Architect'],
        strengths: 'Visao humanista, empatia profunda, lideranca inspiradora',
        challenges: 'Idealismo excessivo, dificuldade em lidar com politica'
      },
      {
        type: 'INFP - The Mediator',
        tagline: 'Autenticidade, valores, criatividade',
        dimensions: 'Introvertido, Intuitivo, Sentimento, Perceptivo',
        primaryStacks: ['The Creative Explorer', 'The Holistic Growth Seeker', 'The Knowledge Architect'],
        explanation: 'INFP prospera com expressao criativa (Creative Explorer), alinhamento de valores (Holistic Growth) e exploracao profunda de ideias (Knowledge Architect).',
        secondaryStacks: ['The Customer-Centric Designer'],
        strengths: 'Criatividade, autenticidade, compreensao profunda',
        challenges: 'Indecisao, dificuldade com critica, pode ser avesso a confronto'
      },
      {
        type: 'ISTJ - The Logistician',
        tagline: 'Responsabilidade, ordem, dever',
        dimensions: 'Introvertido, Sensacao, Pensamento, Julgador',
        primaryStacks: ['The Structured Thinker', 'The Risk Manager', 'The Systems Optimizer'],
        explanation: 'ISTJ prospera com estrutura clara (Structured Thinker), gestao de risco (Risk Manager) e processos otimizados (Systems Optimizer). Lealdade a sistemas e procedimentos.',
        secondaryStacks: ['The Deep Work Specialist'],
        strengths: 'Confiabilidade, responsabilidade, atencao a detalhes',
        challenges: 'Inflexibilidade, dificuldade com mudanca, pode ser rigido demais'
      },
      {
        type: 'ISFJ - The Defender',
        tagline: 'Suporte, lealdade, cuidado',
        dimensions: 'Introvertido, Sensacao, Sentimento, Julgador',
        primaryStacks: ['The Structured Thinker', 'The Holistic Growth Seeker', 'The Customer-Centric Designer'],
        explanation: 'ISFJ prospera com estrutura que cuida de pessoas (Structured Thinker), desenvolvimento holistico (Holistic Growth) e design centrado em usuario (Customer-Centric).',
        secondaryStacks: ['The Risk Manager'],
        strengths: 'Lealdade, cuidado, consciencia de detalhes',
        challenges: 'Dificuldade em delegar, sacrificio de si mesmo, aversao a conflito'
      },
      {
        type: 'ESTJ - The Executive',
        tagline: 'Lideranca, ordem, eficiencia',
        dimensions: 'Extravertido, Sensacao, Pensamento, Julgador',
        primaryStacks: ['The Structured Thinker', 'The Systems Optimizer', 'The Change Catalyst'],
        explanation: 'ESTJ prospera com lideranca estruturada (Structured Thinker), otimizacao de processos (Systems Optimizer) e direcionamento de mudanca (Change Catalyst).',
        secondaryStacks: ['The Agile Builder', 'The Negotiator & Influencer'],
        strengths: 'Lideranca natural, organizacao, responsabilidade',
        challenges: 'Pode ser rigido, insensibilidade a emocoes, dificuldade com ambiguidade'
      },
      {
        type: 'ESFJ - The Consul',
        tagline: 'Armonia, servico, lealdade',
        dimensions: 'Extravertido, Sensacao, Sentimento, Julgador',
        primaryStacks: ['The Negotiator & Influencer', 'The Customer-Centric Designer', 'The Change Catalyst'],
        explanation: 'ESFJ prospera com influencia social (Negotiator), compreensao de pessoas (Customer-Centric) e lideranca colaborativa (Change Catalyst).',
        secondaryStacks: ['The Structured Thinker', 'The Holistic Growth Seeker'],
        strengths: 'Sociabilidade, organizacao, lealdade',
        challenges: 'Busca excessiva de aprovacao, dificuldade em critica, pode ser conformista'
      },
      {
        type: 'ISTP - The Virtuoso',
        tagline: 'Analise pratica, flexibilidade, acao',
        dimensions: 'Introvertido, Sensacao, Pensamento, Perceptivo',
        primaryStacks: ['The Agile Builder', 'The Systems Optimizer', 'The Deep Work Specialist'],
        explanation: 'ISTP prospera com acao pratica (Agile Builder), compreensao de mecanismos (Systems Optimizer) e foco em execucao (Deep Work).',
        secondaryStacks: ['The Data-Driven Decider'],
        strengths: 'Pragmatismo, flexibilidade, analise pratica',
        challenges: 'Dificuldade com planejamento longo prazo, pode ser insensivel socialmente'
      },
      {
        type: 'ISFP - The Adventurer',
        tagline: 'Harmonia, criatividade, presenca',
        dimensions: 'Introvertido, Sensacao, Sentimento, Perceptivo',
        primaryStacks: ['The Creative Explorer', 'The Holistic Growth Seeker', 'The Deep Work Specialist'],
        explanation: 'ISFP prospera com expressao criativa (Creative Explorer), crescimento pessoal (Holistic Growth) e imersao profunda (Deep Work).',
        secondaryStacks: ['The Customer-Centric Designer'],
        strengths: 'Criatividade, sensibilidade estetica, flexibilidade',
        challenges: 'Dificuldade com critica, falta de direcionamento, pode ser extremamente timido'
      },
      {
        type: 'ESTP - The Entrepreneur',
        tagline: 'Acao rapida, pragmatismo, adrenalina',
        dimensions: 'Extravertido, Sensacao, Pensamento, Perceptivo',
        primaryStacks: ['The Agile Builder', 'The Data-Driven Decider', 'The Negotiator & Influencer'],
        explanation: 'ESTP prospera com execucao rapida (Agile Builder), testes praticos (Data-Driven testing) e persuasao (Negotiator). Ama velocidade e resultados imediatos.',
        secondaryStacks: ['The Change Catalyst'],
        strengths: 'Pragmatismo, velocidade, persuasao, adaptabilidade',
        challenges: 'Falta de planejamento, impulsividade, pode ser insensivel'
      },
      {
        type: 'ESFP - The Entertainer',
        tagline: 'Entusiasmo, sociabilidade, presente',
        dimensions: 'Extravertido, Sensacao, Sentimento, Perceptivo',
        primaryStacks: ['The Change Catalyst', 'The Negotiator & Influencer', 'The Creative Explorer'],
        explanation: 'ESFP prospera com dinamica social (Change Catalyst), persuasao (Negotiator) e criatividade colaborativa (Creative Explorer). Energiza grupos.',
        secondaryStacks: ['The Agile Builder'],
        strengths: 'Sociabilidade, entusiasmo, criatividade social',
        challenges: 'Dificuldade em focar, impulsividade, planejamento pobre'
      }
    ]
  },

  // =========================================================================
  // BIG FIVE CORRELATIONS
  // =========================================================================
  bigFive: {
    system: 'Big Five Personality Model (OCEAN)',
    description: '5 dimensoes continuas: Openness, Conscientiousness, Extraversion, Agreeableness, Neuroticism',
    correlations: [
      {
        dimension: 'Openness (Alta)',
        traits: 'Criativo, curioso, aventureiro, imaginativo',
        primaryStacks: ['The Creative Explorer', 'The Knowledge Architect', 'The Change Catalyst'],
        explanation: 'Alta abertura prospera com exploracoes criativas e intelectuais. Busca novidade e complexidade. Ideal para inovacao.',
        avoidStacks: ['The Structured Thinker'],
        advice: 'Balance criatividade com execucao. Use Design Thinking + Agile para transformar ideias em realidade.'
      },
      {
        dimension: 'Conscientiousness (Alta)',
        traits: 'Organizado, disciplinado, responsavel, meticuloso',
        primaryStacks: ['The Structured Thinker', 'The Systems Optimizer', 'The Risk Manager'],
        explanation: 'Alta conscientiousness prospera com estrutura clara, processos rigorosos e gestao de qualidade. Excelente em execucao precisa.',
        avoidStacks: ['The Creative Explorer'],
        advice: 'Balance rigor com inovacao. GTD + Design Thinking = execucao criativa.'
      },
      {
        dimension: 'Extraversion (Alta)',
        traits: 'Sociavel, comunicativo, assertivo, energetico',
        primaryStacks: ['The Change Catalyst', 'The Negotiator & Influencer', 'The Agile Builder'],
        explanation: 'Alta extraversao prospera com influencia social, lideranca e colaboracao. Excelente em vendas, negocios e mudanca.',
        avoidStacks: ['The Deep Work Specialist', 'The Knowledge Architect'],
        advice: 'Balance sociabilidade com profundidade. Combine influencia com estudo para credibilidade.'
      },
      {
        dimension: 'Agreeableness (Alta)',
        traits: 'Cooperativo, empatico, compassivo, generoso',
        primaryStacks: ['The Customer-Centric Designer', 'The Holistic Growth Seeker', 'The Negotiator & Influencer'],
        explanation: 'Alta agreeableness prospera com enfoque em pessoas, compreensao de necessidades alheias e colaboracao.',
        avoidStacks: ['The Risk Manager', 'The Systems Optimizer'],
        advice: 'Balance altruismo com assertividade. Aprenda a dizer nao para proteger sua propria saude.'
      },
      {
        dimension: 'Neuroticism (Alta)',
        traits: 'Ansioso, emotivo, sensivel ao stress, auto-critico',
        primaryStacks: ['The Resilient Stoic', 'The Deep Work Specialist', 'The Risk Manager'],
        explanation: 'Alta neuroticism prospera com processos que reduzem ansiedade (Risk Management preve problemas), profundidade reflexiva (Deep Work estrutura) e filosofias que trazem paz (Stoicism).',
        avoidStacks: ['The Change Catalyst', 'The Agile Builder'],
        advice: 'Use Meditation + Stoicism para cultivar resiliencia. Estrutura reduz ansiedade.'
      }
    ]
  },

  // =========================================================================
  // DISC MODEL CORRELATIONS
  // =========================================================================
  disc: {
    system: 'DISC Model (Dominance, Influence, Steadiness, Conscientiousness)',
    description: '4 estilos de comunicacao comportamental focados em como pessoas interagem',
    correlations: [
      {
        type: 'D - Dominance (Dominador)',
        traits: 'Direciona, decide rapido, foca resultados, asertivo',
        primaryStacks: ['The Strategic Leader', 'The Change Catalyst', 'The Agile Builder'],
        explanation: 'D prospera com comando claro (Strategic Leader), transformacao rapida (Change Catalyst) e execucao acelerada (Agile Builder).',
        workingStyle: 'Orientado a resultados, lideranca autocrática, decisoes rapidas'
      },
      {
        type: 'I - Influence (Influenciador)',
        traits: 'Entusiasta, persuasivo, sociavel, orientado a pessoas',
        primaryStacks: ['The Negotiator & Influencer', 'The Change Catalyst', 'The Customer-Centric Designer'],
        explanation: 'I prospera com persuasao (Negotiator), lideranca inspiradora (Change Catalyst) e compreensao de pessoas (Customer-Centric).',
        workingStyle: 'Orientado a pessoas, lideranca carismática, colaboracao'
      },
      {
        type: 'S - Steadiness (Estavel)',
        traits: 'Paciente, cooperativo, confiavel, estavel',
        primaryStacks: ['The Structured Thinker', 'The Holistic Growth Seeker', 'The Resilient Stoic'],
        explanation: 'S prospera com estrutura previsivel (Structured Thinker), desenvolvimento pessoal balanceado (Holistic Growth) e paz interior (Resilient Stoic).',
        workingStyle: 'Orientado a processo, lideranca supportiva, estabilidade'
      },
      {
        type: 'C - Conscientiousness (Consciencioso)',
        traits: 'Exato, analitico, rigoroso, orientado a qualidade',
        primaryStacks: ['The Systems Optimizer', 'The Knowledge Architect', 'The Data-Driven Decider'],
        explanation: 'C prospera com otimizacao sistemica (Systems Optimizer), compreensao profunda (Knowledge Architect) e decisoes baseadas em dados (Data-Driven).',
        workingStyle: 'Orientado a qualidade, lideranca tecnica, analise profunda'
      }
    ]
  }
};

// =========================================================================
// QUICK MAPPING LOOKUP
// =========================================================================

export const TOOL_STACK_LOOKUP = {
  'The Knowledge Architect': {
    bestFor: ['Type 5 (Enneagram)', 'INTJ, INTP, INFJ (MBTI)', 'Alta Openness (Big Five)'],
    characteristics: 'Alto pensamento conceitual, curiosidade intelectual, sistemicidade',
    coreTool: 'Mental Models Latticework'
  },
  'The Strategic Leader': {
    bestFor: ['Type 1, Type 8 (Enneagram)', 'INTJ, ENTJ (MBTI)', 'Alta Conscientiousness (Big Five)'],
    characteristics: 'Visao estrategica, planejamento sistemico, comando',
    coreTool: 'Wardley Maps / Scenario Planning'
  },
  'The Structured Thinker': {
    bestFor: ['Type 1, Type 6 (Enneagram)', 'ISTJ, ESTJ (MBTI)', 'Alta Conscientiousness (Big Five)'],
    characteristics: 'Necessidade de ordem, responsabilidade, precisao',
    coreTool: 'GTD (Getting Things Done)'
  },
  'The Creative Explorer': {
    bestFor: ['Type 4, Type 7 (Enneagram)', 'ENTP, INFP (MBTI)', 'Alta Openness (Big Five)'],
    characteristics: 'Criatividade, inovacao, busca de novidade',
    coreTool: 'Design Thinking'
  },
  'The Resilient Stoic': {
    bestFor: ['Type 4, Type 9 (Enneagram)', 'INFJ, ISFP (MBTI)', 'Alta Neuroticism (Big Five)'],
    characteristics: 'Necessidade de paz interior, reflexao profunda, estabilidade',
    coreTool: 'Stoic Philosophy + Meditation'
  },
  'The Data-Driven Decider': {
    bestFor: ['Type 5, Type 3 (Enneagram)', 'INTJ, INTP, ESTJ (MBTI)', 'Alta Conscientiousness (Big Five)'],
    characteristics: 'Rigor analítico, precisao, aversao ao risco',
    coreTool: 'Bayesian Thinking / RICE Scoring'
  },
  'The Agile Builder': {
    bestFor: ['Type 3, Type 7 (Enneagram)', 'ENTJ, ESTP, ISTP (MBTI)', 'Alta Extraversion (Big Five)'],
    characteristics: 'Orientacao a resultados, velocidade, adaptabilidade',
    coreTool: 'Lean Startup / SCRUM'
  },
  'The Systems Optimizer': {
    bestFor: ['Type 1, Type 6 (Enneagram)', 'ISTJ, ESTJ, ISTP (MBTI)', 'Alta Conscientiousness (Big Five)'],
    characteristics: 'Pensamento sistemico, otimizacao, eficiencia',
    coreTool: 'Lean Manufacturing / Six Sigma'
  },
  'The Change Catalyst': {
    bestFor: ['Type 8, Type 2 (Enneagram)', 'ENTJ, ENTP, ESFJ (MBTI)', 'Alta Extraversion (Big Five)'],
    characteristics: 'Lideranca transformacional, carisma, persuasao',
    coreTool: 'Transformational Leadership'
  },
  'The Holistic Growth Seeker': {
    bestFor: ['Type 4, Type 9, Type 2 (Enneagram)', 'INFP, INFJ, ISFP (MBTI)', 'Equilibrio emocional (Big Five)'],
    characteristics: 'Desenvolvimento integrado, autenticidade, alinhamento de valores',
    coreTool: 'Ikigai + Habit Stacking'
  },
  'The Risk Manager': {
    bestFor: ['Type 6, Type 1 (Enneagram)', 'ISTJ, INTJ (MBTI)', 'Alta Conscientiousness (Big Five)'],
    characteristics: 'Planejamento rigoroso, aversao ao risco, contingencia',
    coreTool: 'Risk Register / Scenario Planning'
  },
  'The Customer-Centric Designer': {
    bestFor: ['Type 2, Type 4 (Enneagram)', 'INFJ, ISFJ, ENFP (MBTI)', 'Alta Agreeableness (Big Five)'],
    characteristics: 'Empatia profunda, compreensao de necessidades, design inclusivo',
    coreTool: 'Jobs To Be Done'
  },
  'The Negotiator & Influencer': {
    bestFor: ['Type 2, Type 3, Type 8 (Enneagram)', 'ENTJ, ESTP, ESFJ (MBTI)', 'Alta Extraversion + Agreeableness (Big Five)'],
    characteristics: 'Persuasao, influencia social, empatia tacita',
    coreTool: 'Interest-Based Negotiation'
  },
  'The Deep Work Specialist': {
    bestFor: ['Type 5, Type 1 (Enneagram)', 'INTJ, INTP, ISFP (MBTI)', 'Introversion (Big Five)'],
    characteristics: 'Foco profundo, concentracao, output de qualidade',
    coreTool: 'Deep Work (Newport)'
  }
};

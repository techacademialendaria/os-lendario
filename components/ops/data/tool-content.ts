// =============================================================================
// TOOL EDUCATIONAL CONTENT
// =============================================================================

export const TOOL_EXPLANATION = {
  title: 'Taxonomia de Artefatos Cognitivos',
  definition: 'Um sistema de cinco camadas para classificar ferramentas que aumentam, guiam ou descarregam o pensamento humano.',
  types: [
    { type: 'philosophy', desc: 'Sistema de crenças e valores (Orientação)', examples: ['Stoicism', 'Agile Manifesto', 'Essentialism'], icon: 'globe' },
    { type: 'mental_model', desc: 'Representação de como um sistema funciona (Explicação)', examples: ['First Principles', 'Inversion', 'Supply & Demand'], icon: 'brain' },
    { type: 'heuristic', desc: 'Regra prática para decisão rápida (Decisão)', examples: ['80/20 Rule', 'Two-Minute Rule', 'KISS'], icon: 'bolt' },
    { type: 'framework', desc: 'Template externo para organizar categorias (Análise)', examples: ['SWOT', 'Business Model Canvas', 'Eisenhower Matrix'], icon: 'grid' },
    { type: 'methodology', desc: 'Sistema completo de processos e papéis (Ação)', examples: ['Scrum', 'Six Sigma', 'GTD'], icon: 'list-check' }
  ],
  axes: [
    { name: 'Abstraction', low: 'Procedural (Way of doing)', high: 'Conceptual (Way of seeing)', example: 'Methodology (1) vs Philosophy (10)' },
    { name: 'Prescriptive', low: 'Descritivo (Explica)', high: 'Prescritivo (Comanda)', example: 'Mental Model (2) vs Checklist (10)' },
    { name: 'Externality', low: 'Interno (Mental)', high: 'Externo (Shared Artifact)', example: 'Heuristic (3) vs Kanban Board (10)' },
    { name: 'Rigidity', low: 'Flexível (Adapta)', high: 'Rígido (Fixado)', example: 'Design Thinking (4) vs Six Sigma (9)' }
  ],
  affinities: {
    desc: 'Cada tool tem afinidade com drivers especificos',
    types: [
      { type: 'enables', desc: 'Driver facilita uso efetivo', example: 'High conscientiousness ENABLES GTD', color: '#10b981' },
      { type: 'requires', desc: 'Tool exige nivel minimo', example: 'Meditation REQUIRES some openness', color: '#f59e0b' },
      { type: 'conflicts', desc: 'Driver dificulta adesao', example: 'High impulsivity CONFLICTS with long-term planning', color: '#ef4444' },
      { type: 'develops', desc: 'Uso da tool fortalece driver', example: 'Journaling DEVELOPS self-awareness', color: '#8b5cf6' }
    ]
  }
};

// =============================================================================
// TOOL CATALOG - DEEP DIVE WITH REAL EXAMPLES
// =============================================================================

export const TOOL_CATALOG = {
  mental_model: {
    title: 'Mental Models',
    description: 'Representacoes simplificadas da realidade que nos ajudam a entender como o mundo funciona. Sao lentes atraves das quais interpretamos informacoes e tomamos decisoes.',
    icon: 'brain',
    examples: [
      {
        name: 'First Principles Thinking',
        description: 'Decomponha problemas ate suas verdades fundamentais e reconstrua a partir delas',
        origin: 'Aristoteles / Elon Musk',
        useCase: 'Quando solucoes convencionais nao funcionam ou voce quer inovar radicalmente',
        example: 'Musk repensou baterias de carros: em vez de aceitar precos de mercado, calculou custo de materias-primas'
      },
      {
        name: 'Inversion',
        description: 'Pense no problema ao contrario - o que faria voce falhar?',
        origin: 'Carl Jacobi / Charlie Munger',
        useCase: 'Planejamento estrategico, gestao de riscos, resolucao de problemas complexos',
        example: 'Em vez de "como ter sucesso?", pergunte "como garantir que vou falhar?" e evite isso'
      },
      {
        name: 'Second-Order Thinking',
        description: 'Considere as consequencias das consequencias de suas decisoes',
        origin: 'Howard Marks',
        useCase: 'Decisoes estrategicas de longo prazo, investimentos, politicas publicas',
        example: 'Proibir alcool (1a ordem: menos alcoolismo) → (2a ordem: mafia, crime organizado)'
      },
      {
        name: 'Map vs Territory',
        description: 'O modelo nao e a realidade - mapas sao simplificacoes uteis mas limitadas',
        origin: 'Alfred Korzybski',
        useCase: 'Quando voce depende demais de modelos, metricas ou teorias',
        example: 'KPIs de vendas podem melhorar enquanto satisfacao do cliente despenca'
      },
      {
        name: 'Hanlons Razor',
        description: 'Nunca atribua a malicia o que pode ser explicado por incompetencia',
        origin: 'Robert Hanlon',
        useCase: 'Interpretacao de comportamento alheio, gestao de conflitos',
        example: 'Colega nao respondeu seu email: provavelmente esta sobrecarregado, nao te ignorando'
      },
      {
        name: 'Circle of Competence',
        description: 'Conheca os limites do seu conhecimento e opere dentro deles',
        origin: 'Warren Buffett',
        useCase: 'Investimentos, escolha de carreira, tomada de decisao',
        example: 'Buffett evita tech stocks porque esta fora do seu circulo de competencia'
      },
      {
        name: 'Probabilistic Thinking',
        description: 'Pense em termos de probabilidades, nao certezas absolutas',
        origin: 'Teoria Bayesiana',
        useCase: 'Previsoes, avaliacoes de risco, apostas na vida',
        example: 'Em vez de "vai chover", pense "70% de chance de chuva, levo guarda-chuva"'
      }
    ]
  },
  framework: {
    title: 'Frameworks',
    description: 'Estruturas organizacionais que fornecem um esqueleto para pensar sobre categorias de problemas. Sao mais prescritivos que mental models.',
    icon: 'grid',
    examples: [
      {
        name: 'SWOT Analysis',
        description: 'Strengths, Weaknesses, Opportunities, Threats',
        origin: 'Albert Humphrey (Stanford)',
        useCase: 'Planejamento estrategico, analise de mercado, autoavaliacao',
        example: 'Startup: S=tech inovadora, W=sem funding, O=mercado crescendo, T=big tech entrando'
      },
      {
        name: 'Porters Five Forces',
        description: 'Analise competitiva: rivalidade, poder de barganha, ameaca de entrantes/substitutos',
        origin: 'Michael Porter',
        useCase: 'Analise de industria, estrategia competitiva, decisoes de entrada em mercado',
        example: 'Industria de aviacao: alta rivalidade, alto poder de fornecedores (Boeing/Airbus), baixo poder do cliente'
      },
      {
        name: 'Jobs To Be Done',
        description: 'Pessoas "contratam" produtos para fazer um "trabalho" em suas vidas',
        origin: 'Clayton Christensen',
        useCase: 'Desenvolvimento de produto, inovacao, marketing',
        example: 'Milkshake vendido de manha: job = entretenimento no commute longo e chato'
      },
      {
        name: 'Wardley Maps',
        description: 'Mapeamento visual de componentes de negocio por maturidade e cadeia de valor',
        origin: 'Simon Wardley',
        useCase: 'Estrategia de plataforma, decisoes build vs buy, evolucao tecnologica',
        example: 'Mapear onde cada componente esta: genesis → custom → product → commodity'
      },
      {
        name: 'RICE Scoring',
        description: 'Reach x Impact x Confidence / Effort - priorizacao quantitativa',
        origin: 'Intercom',
        useCase: 'Priorizacao de backlog, roadmap de produto, alocacao de recursos',
        example: 'Feature A: (1000 x 3 x 0.8) / 2 = 1200 | Feature B: (500 x 2 x 0.9) / 1 = 900'
      },
      {
        name: 'Eisenhower Matrix',
        description: 'Urgente vs Importante - 4 quadrantes para priorizar tarefas',
        origin: 'Dwight Eisenhower',
        useCase: 'Gestao de tempo, priorizacao diaria, delegacao',
        example: 'Q1: Fazer agora | Q2: Agendar | Q3: Delegar | Q4: Eliminar'
      },
      {
        name: 'OKRs',
        description: 'Objectives and Key Results - metas ambiciosas com metricas claras',
        origin: 'Andy Grove (Intel)',
        useCase: 'Alinhamento organizacional, definicao de metas, acompanhamento de progresso',
        example: 'O: Dominar mercado de SaaS | KR1: 10k usuarios ativos | KR2: NPS > 50'
      }
    ]
  },
  methodology: {
    title: 'Metodologias',
    description: 'Processos sistematicos passo-a-passo para executar tipos especificos de trabalho. Sao altamente prescritivos e reprodutiveis.',
    icon: 'list-check',
    examples: [
      {
        name: 'GTD (Getting Things Done)',
        description: 'Sistema completo de produtividade: capturar, processar, organizar, revisar, executar',
        origin: 'David Allen',
        useCase: 'Produtividade pessoal, gestao de projetos complexos, clareza mental',
        example: 'Inbox zero: processe cada item → proximo passo, delegar, arquivar, ou lixo'
      },
      {
        name: 'Pomodoro Technique',
        description: '25 min de foco + 5 min de pausa, repetir. A cada 4, pausa longa de 15-30 min',
        origin: 'Francesco Cirillo',
        useCase: 'Trabalho que exige foco, combater procrastinacao, medir esforco',
        example: 'Escrever relatorio: 3 pomodoros = 1h30 de trabalho focado real'
      },
      {
        name: 'SCRUM',
        description: 'Framework agil com sprints, daily standups, retrospectivas e artefatos definidos',
        origin: 'Ken Schwaber / Jeff Sutherland',
        useCase: 'Desenvolvimento de software, projetos complexos adaptativos',
        example: 'Sprint 2 semanas: Planning → Dailies → Review → Retro → Repeat'
      },
      {
        name: 'Design Thinking',
        description: 'Empatizar, Definir, Idear, Prototipar, Testar - centrado no usuario',
        origin: 'IDEO / Stanford d.school',
        useCase: 'Inovacao de produto, resolucao de problemas complexos, UX design',
        example: 'Novo app: observar usuarios → definir problema real → brainstorm → MVP → testar'
      },
      {
        name: 'Lean Startup',
        description: 'Build-Measure-Learn: lancamento rapido, metricas de validacao, pivotar ou perseverar',
        origin: 'Eric Ries',
        useCase: 'Lancamento de produtos novos, validacao de ideias, reducao de risco',
        example: 'MVP em 2 semanas → medir engajamento → aprender → ajustar ou pivotar'
      },
      {
        name: 'Six Sigma',
        description: 'DMAIC: Define, Measure, Analyze, Improve, Control - melhoria de processos',
        origin: 'Motorola / Bill Smith',
        useCase: 'Manufatura, operacoes, qualidade, reducao de defeitos',
        example: 'Reducao de defeitos de 5% para 0.00034% (6 sigma = 3.4 defeitos por milhao)'
      },
      {
        name: 'Shape Up',
        description: 'Ciclos de 6 semanas com shaping, betting e building. Small teams, big autonomy',
        origin: 'Basecamp / Ryan Singer',
        useCase: 'Desenvolvimento de produto, times pequenos, projetos de escopo definido',
        example: '2 semanas shaping + 6 semanas building + 2 semanas cooldown'
      }
    ]
  },
  heuristic: {
    title: 'Heuristicas',
    description: 'Regras praticas que simplificam decisoes complexas. Nao sao perfeitas, mas funcionam bem na maioria dos casos com minimo esforco cognitivo.',
    icon: 'bolt',
    examples: [
      {
        name: '80/20 Rule (Pareto)',
        description: '80% dos resultados vem de 20% dos esforcos',
        origin: 'Vilfredo Pareto',
        useCase: 'Priorizacao, alocacao de recursos, foco estrategico',
        example: '20% dos clientes geram 80% da receita - foque neles'
      },
      {
        name: 'Two Pizza Rule',
        description: 'Times devem ser pequenos o suficiente para serem alimentados com 2 pizzas',
        origin: 'Jeff Bezos / Amazon',
        useCase: 'Estrutura organizacional, formacao de equipes, agilidade',
        example: 'Time de 5-7 pessoas: comunicacao eficiente, decisoes rapidas'
      },
      {
        name: 'KISS Principle',
        description: 'Keep It Simple, Stupid - simplicidade deve ser meta de design',
        origin: 'Kelly Johnson (Lockheed)',
        useCase: 'Design de sistemas, arquitetura de software, comunicacao',
        example: 'API com 3 endpoints claros bate API com 50 endpoints confusos'
      },
      {
        name: 'Occams Razor',
        description: 'A explicacao mais simples geralmente e a correta',
        origin: 'William of Ockham',
        useCase: 'Debug, diagnostico, investigacao, teorias cientificas',
        example: 'Servidor caiu: provavelmente disco cheio, nao ataque hacker sofisticado'
      },
      {
        name: 'Lindy Effect',
        description: 'Quanto mais tempo algo existe, mais tempo deve continuar existindo',
        origin: 'Nassim Taleb',
        useCase: 'Investimento em tecnologia, escolha de ferramentas, predicoes',
        example: 'Linux (30+ anos) vai durar mais que framework JavaScript da moda'
      },
      {
        name: 'Rule of Three',
        description: 'Coisas em tres sao mais memoraveis e persuasivas',
        origin: 'Retorica Classica',
        useCase: 'Apresentacoes, escrita, marketing, estruturacao de ideias',
        example: '"Sangue, suor e lagrimas" - 3 elementos criam ritmo e memorabilidade'
      },
      {
        name: '10x Rule',
        description: 'Para substituir algo, a alternativa precisa ser 10x melhor',
        origin: 'Silicon Valley / Peter Thiel',
        useCase: 'Inovacao de produto, decisoes de mudanca, adocao de tecnologia',
        example: 'Email substituiu fax porque era 10x+ mais facil e rapido'
      }
    ]
  },
  principle: {
    title: 'Principios',
    description: 'Diretrizes fundamentais que descrevem padroes observados na realidade. Sao descritivos (explicam o que acontece) mais que prescritivos.',
    icon: 'scale',
    examples: [
      {
        name: 'Pareto Principle',
        description: 'Distribuicao desigual - poucos fatores causam a maioria dos efeitos',
        origin: 'Vilfredo Pareto',
        useCase: 'Analise de causas, priorizacao estrategica, economia de esforco',
        example: '20% dos bugs causam 80% das falhas - foque nesses primeiro'
      },
      {
        name: 'Peter Principle',
        description: 'Pessoas sao promovidas ate seu nivel de incompetencia',
        origin: 'Laurence Peter',
        useCase: 'Gestao de carreiras, promocoes, estrutura organizacional',
        example: 'Otimo engenheiro promovido a gerente pode ser pessimo gerente'
      },
      {
        name: 'Goodharts Law',
        description: 'Quando uma metrica vira meta, deixa de ser boa metrica',
        origin: 'Charles Goodhart',
        useCase: 'Design de incentivos, OKRs, metricas de performance',
        example: 'Call center: meta de "resolver rapido" → atendentes desligam chamadas'
      },
      {
        name: 'Campbells Law',
        description: 'Quanto mais importante a metrica, mais sera corrompida',
        origin: 'Donald Campbell',
        useCase: 'Educacao, gestao publica, metricas corporativas',
        example: 'Escolas "ensinam para o teste" quando nota de exame determina verba'
      },
      {
        name: 'Conways Law',
        description: 'Sistemas refletem a estrutura de comunicacao das organizacoes que os criam',
        origin: 'Melvin Conway',
        useCase: 'Arquitetura de software, design organizacional, microservicos',
        example: '4 times trabalhando em 1 app = 4 modulos mal integrados'
      },
      {
        name: 'Parkinsons Law',
        description: 'Trabalho se expande para preencher o tempo disponivel',
        origin: 'Cyril Parkinson',
        useCase: 'Gestao de projetos, prazos, produtividade',
        example: 'Tarefa de 2h dada 1 semana = sera entregue em 1 semana'
      },
      {
        name: 'Murphys Law',
        description: 'Se algo pode dar errado, vai dar errado',
        origin: 'Edward Murphy',
        useCase: 'Engenharia, planejamento de contingencia, gestao de riscos',
        example: 'Sempre tenha backup, sempre teste em producao-like, sempre tenha rollback'
      }
    ]
  },
  worldview: {
    title: 'Worldviews (Filosofias)',
    description: 'Sistemas de pensamento abrangentes que moldam como interpretamos a realidade e tomamos decisoes na vida. Sao os frameworks mais fundamentais.',
    icon: 'globe',
    examples: [
      {
        name: 'Stoicism',
        description: 'Foque no que controla, aceite o que nao controla, desenvolva virtude',
        origin: 'Zenao de Citio / Marcus Aurelius / Seneca',
        useCase: 'Resiliencia emocional, lideranca sob pressao, paz interior',
        example: 'Perdi o emprego: nao controlo isso, mas controlo como reajo e proximo passo'
      },
      {
        name: 'Effectuation',
        description: 'Use os meios disponiveis para criar oportunidades, nao prever o futuro',
        origin: 'Saras Sarasvathy',
        useCase: 'Empreendedorismo, inovacao, incerteza extrema',
        example: 'Em vez de pesquisa de mercado, comece com quem voce conhece e o que sabe fazer'
      },
      {
        name: 'Antifragility',
        description: 'Sistemas que se beneficiam de estresse e desordem, nao apenas resistem',
        origin: 'Nassim Taleb',
        useCase: 'Design de sistemas, investimentos, resiliencia pessoal',
        example: 'Startup que aprende com cada falha fica mais forte - corpo com exercicio'
      },
      {
        name: 'Systems Thinking',
        description: 'Veja o todo, nao partes isoladas. Entenda loops, delays e emergencia',
        origin: 'Donella Meadows / Peter Senge',
        useCase: 'Problemas complexos, politicas publicas, organizacoes',
        example: 'Trafico: mais vias → mais carros → mais trafico (loop de reforco)'
      },
      {
        name: 'Bayesian Thinking',
        description: 'Atualize suas crencas continuamente baseado em novas evidencias',
        origin: 'Thomas Bayes',
        useCase: 'Tomada de decisao sob incerteza, predicoes, investigacao',
        example: 'Prior: 10% chance de chuva. Nova info: ceu nublado → atualizo para 40%'
      },
      {
        name: 'Growth Mindset',
        description: 'Habilidades podem ser desenvolvidas atraves de esforco e aprendizado',
        origin: 'Carol Dweck',
        useCase: 'Educacao, desenvolvimento pessoal, cultura organizacional',
        example: '"Ainda nao sei isso" em vez de "nao sou bom nisso"'
      },
      {
        name: 'Long-term Thinking',
        description: 'Otimize para decadas, nao trimestres. Construa legado',
        origin: 'Jeff Bezos / Long Now Foundation',
        useCase: 'Estrategia de negocios, decisoes de carreira, sustentabilidade',
        example: 'Amazon: "Day 1 thinking" - decisoes como se a empresa tivesse acabado de nascer'
      }
    ]
  }
};

// =============================================================================
// TOOL RELATIONS - HOW TOOLS CONNECT
// =============================================================================

export const TOOL_RELATIONS = {
  title: 'Relacionamentos entre Tools',
  description: 'Tools nao existem isoladas - elas derivam umas das outras, se complementam, ou ate conflitam.',
  relationTypes: [
    {
      type: 'derived_from',
      icon: 'git-branch',
      color: '#3b82f6',
      description: 'Tool derivada/inspirada em outra mais fundamental',
      examples: [
        { tool: 'GTD', derivedFrom: 'Eisenhower Matrix', explanation: 'GTD expandiu a priorizacao do Eisenhower em sistema completo de workflow' },
        { tool: 'Lean Startup', derivedFrom: 'Scientific Method', explanation: 'Build-Measure-Learn e o metodo cientifico aplicado a negocios' },
        { tool: 'SCRUM', derivedFrom: 'Lean Manufacturing', explanation: 'Sprints e iteracao vieram da producao enxuta da Toyota' },
        { tool: 'OKRs', derivedFrom: 'MBO (Drucker)', explanation: 'Andy Grove adaptou Management by Objectives em Key Results mensuraveis' }
      ]
    },
    {
      type: 'complements',
      icon: 'puzzle',
      color: '#10b981',
      description: 'Tools que funcionam bem juntas, amplificando resultados',
      examples: [
        { tools: ['Pomodoro', 'Deep Work'], explanation: 'Pomodoro implementa os blocos de tempo que Deep Work prescreve' },
        { tools: ['GTD', 'Eisenhower Matrix'], explanation: 'GTD organiza, Eisenhower prioriza - juntos cobrem captura e foco' },
        { tools: ['Jobs To Be Done', 'Design Thinking'], explanation: 'JTBD identifica o problema, Design Thinking cria a solucao' },
        { tools: ['First Principles', 'Inversion'], explanation: 'Decomponha o problema, depois inverta para ver armadilhas' },
        { tools: ['OKRs', 'RICE Scoring'], explanation: 'OKRs definem metas, RICE prioriza o que fazer para atingi-las' }
      ]
    },
    {
      type: 'conflicts',
      icon: 'alert-triangle',
      color: '#ef4444',
      description: 'Tools que tem premissas contraditorias ou interferem uma na outra',
      examples: [
        { tools: ['Multitasking', 'Deep Work'], explanation: 'Atencao fragmentada vs foco profundo - fisicamente incompativeis' },
        { tools: ['Perfectionism', 'Lean Startup'], explanation: 'Busca da perfeicao impede lancamento de MVPs' },
        { tools: ['Waterfall', 'Design Thinking'], explanation: 'Planejamento rigido vs iteracao baseada em feedback' },
        { tools: ['Analysis Paralysis', '80/20'], explanation: 'Esperar dados perfeitos vs agir com 80% de certeza' }
      ]
    },
    {
      type: 'requires',
      icon: 'lock',
      color: '#f59e0b',
      description: 'Tool que depende de outra como pre-requisito ou fundacao',
      examples: [
        { tool: 'Second-Order Thinking', requires: 'Basic Cause-Effect', explanation: 'Precisa entender consequencias diretas antes de ver consequencias indiretas' },
        { tool: 'Wardley Maps', requires: 'Value Chain Understanding', explanation: 'Mapear evolucao requer entender cadeia de valor primeiro' },
        { tool: 'Six Sigma', requires: 'Statistical Basics', explanation: 'DMAIC exige entendimento de media, desvio padrao, variancia' },
        { tool: 'Antifragility', requires: 'Risk Management Basics', explanation: 'Beneficiar-se de estresse requer entender exposicao a risco' }
      ]
    }
  ]
};

// =============================================================================
// AFFINITY ALGORITHM - DEEP DIVE
// =============================================================================

export const AFFINITY_ALGORITHM = {
  title: 'Algoritmo de Afinidade',
  description: 'Como calculamos o fit_score entre um mind e uma tool baseado em seus drivers.',

  formula: {
    title: 'Formula de Calculo',
    equation: 'fit_score = SUM(driver_value * affinity_weight * affinity_direction) / max_possible_score',
    components: [
      { name: 'driver_value', desc: 'Valor do driver no perfil (0-10)', example: 'Conscientiousness = 8' },
      { name: 'affinity_weight', desc: 'Peso da afinidade na tabela tool_driver_affinities (0.0-1.0)', example: 'GTD-Conscientiousness = 0.9' },
      { name: 'affinity_direction', desc: '+1 para enables/develops, -1 para conflicts', example: 'enables = +1' },
      { name: 'max_possible_score', desc: 'Soma maxima teorica para normalizacao', example: 'Se 3 drivers, max = 30' }
    ]
  },

  example: {
    title: 'Exemplo Completo: GTD para Joao',
    profile: {
      name: 'Joao',
      drivers: [
        { driver: 'Conscientiousness', value: 8, source: 'Big Five' },
        { driver: 'Need for Cognition', value: 7, source: 'Motivation' },
        { driver: 'Impulsivity', value: 6, source: 'Behavioral' }
      ]
    },
    toolAffinities: [
      { driver: 'Conscientiousness', type: 'enables', weight: 0.9, direction: 1 },
      { driver: 'Need for Cognition', type: 'enables', weight: 0.6, direction: 1 },
      { driver: 'Impulsivity', type: 'conflicts', weight: 0.7, direction: -1 }
    ],
    calculation: [
      { step: '8 * 0.9 * (+1) = 7.2', label: 'Conscientiousness contribuicao' },
      { step: '7 * 0.6 * (+1) = 4.2', label: 'Need for Cognition contribuicao' },
      { step: '6 * 0.7 * (-1) = -4.2', label: 'Impulsivity penalidade' },
      { step: 'Total = 7.2', label: 'Soma das contribuicoes' },
      { step: 'Max = 10*0.9 + 10*0.6 + 10*0.7 = 22', label: 'Score maximo teorico' },
      { step: 'fit_score = 7.2 / 22 = 0.327', label: 'Score normalizado' }
    ],
    result: {
      score: 0.327,
      interpretation: 'Fit moderado - GTD e viavel mas impulsividade pode dificultar adesao inicial'
    }
  },

  aggregationMethods: [
    { method: 'weighted_average', desc: 'Media ponderada das contribuicoes', useCase: 'Balanceamento geral' },
    { method: 'min_requirement', desc: 'Score minimo para drivers "requires"', useCase: 'Gatekeeping de pre-requisitos' },
    { method: 'conflict_penalty', desc: 'Penalidade multiplicativa para conflicts', useCase: 'Evitar mismatch severo' }
  ]
};

// =============================================================================
// TOOL RECOMMENDATION FLOW
// =============================================================================

export const RECOMMENDATION_FLOW = {
  title: 'Fluxo de Recomendacao de Tools',
  description: 'Como o sistema recomenda tools baseado no perfil cognitivo de um mind.',

  steps: [
    {
      step: 1,
      title: 'Input: Mind Profile',
      icon: 'user',
      description: 'Coletamos os drivers do mind com seus valores',
      data: 'mind_drivers: [{driver_id, dimension, factor, value}]'
    },
    {
      step: 2,
      title: 'Fetch: Tool Affinities',
      icon: 'database',
      description: 'Buscamos todas as afinidades da tabela tool_driver_affinities',
      data: 'tool_driver_affinities: [{tool_id, driver_id, affinity_type, weight}]'
    },
    {
      step: 3,
      title: 'Match: Driver Intersection',
      icon: 'git-merge',
      description: 'Cruzamos drivers do mind com drivers de cada tool',
      data: 'Para cada tool: quais drivers do mind tem afinidade definida?'
    },
    {
      step: 4,
      title: 'Calculate: Fit Scores',
      icon: 'calculator',
      description: 'Aplicamos a formula de afinidade para cada tool',
      data: 'fit_score = SUM(value * weight * direction) / max'
    },
    {
      step: 5,
      title: 'Rank: Sort by Score',
      icon: 'bar-chart',
      description: 'Ordenamos tools por fit_score descendente',
      data: 'Top 10 tools com maior fit para este mind'
    },
    {
      step: 6,
      title: 'Output: Recommendations',
      icon: 'sparkles',
      description: 'Retornamos tools rankeadas com explicacao',
      data: '[{tool, fit_score, reasoning, potential_challenges}]'
    }
  ],

  exampleOutput: {
    mind: 'charlie_munger',
    recommendations: [
      { tool: 'First Principles Thinking', score: 0.89, reason: 'Alto Need for Cognition e baixa impulsividade' },
      { tool: 'Inversion', score: 0.87, reason: 'Conscientiousness alta favorece analise rigorosa' },
      { tool: 'Checklists', score: 0.82, reason: 'Conscientiousness + aversao a erro' },
      { tool: 'Second-Order Thinking', score: 0.79, reason: 'Pensamento sistemico elevado' },
      { tool: 'Probabilistic Thinking', score: 0.76, reason: 'Abertura a experiencia + racionalidade' }
    ]
  }
};

// =============================================================================
// AXIS CLASSIFICATION - DETAILED EXAMPLES
// =============================================================================

export const AXIS_EXAMPLES = {
  title: 'Classificacao nos Eixos',
  description: 'Onde cada tool popular se posiciona nos 3 eixos de classificacao.',

  axes: [
    {
      name: 'Abstraction',
      description: 'Quanto a tool é conceitual (Way of seeing) vs procedimental (Way of doing)',
      low: { label: 'Procedimental', desc: 'Foca em passos, ações e "como fazer"' },
      high: { label: 'Conceitual', desc: 'Foca em ideias, princípios e "como ver"' },
      tools: [
        { name: 'Philosophy', score: 10, reason: 'Pura orientação e valores' },
        { name: 'Mental Model', score: 8, reason: 'Explicação sistêmica abstrata' },
        { name: 'Heuristic', score: 6, reason: 'Atalho cognitivo híbrido' },
        { name: 'Framework', score: 3, reason: 'Estruturação de dados externos' },
        { name: 'Methodology', score: 1, reason: 'Passos e processos rígidos' }
      ]
    },
    {
      name: 'Prescriptive',
      description: 'Quanto a tool diz O QUE fazer vs apenas descrever a realidade',
      low: { label: 'Descritivo', desc: 'Explica como as coisas sao, voce decide o que fazer' },
      high: { label: 'Prescritivo', desc: 'Diz exatamente os passos a seguir' },
      tools: [
        { name: 'Map vs Territory', score: 1, reason: 'Apenas descreve uma armadilha cognitiva' },
        { name: 'Pareto Principle', score: 2, reason: 'Observacao, nao instrucao' },
        { name: 'First Principles', score: 3, reason: 'Abordagem, mas flexivel' },
        { name: 'SWOT', score: 4, reason: 'Estrutura, mas nao diz o que fazer depois' },
        { name: 'Eisenhower Matrix', score: 6, reason: 'Categoriza e sugere acao por quadrante' },
        { name: 'OKRs', score: 7, reason: 'Define metas e metricas especificas' },
        { name: 'Pomodoro', score: 8, reason: '25+5 min e prescricao clara' },
        { name: 'GTD', score: 9, reason: 'Sistema completo com regras especificas' },
        { name: 'Checklist', score: 10, reason: 'Lista exata de passos obrigatorios' }
      ]
    },
    {
      name: 'Externality',
      description: 'Quanto a tool e interna (pensamento) vs externa (acao no mundo)',
      low: { label: 'Interno', desc: 'Acontece na mente, nao visivel externamente' },
      high: { label: 'Externo', desc: 'Manifesta-se em artefatos e acoes visiveis' },
      tools: [
        { name: 'Meditation', score: 1, reason: 'Puramente mental, sem output' },
        { name: 'Stoic Dichotomy', score: 2, reason: 'Reframe interno de perspectiva' },
        { name: 'Inversion', score: 3, reason: 'Exercicio mental, pode virar notas' },
        { name: 'Second-Order Thinking', score: 4, reason: 'Analise mental que pode ser documentada' },
        { name: 'Mind Mapping', score: 5, reason: 'Pensamento que se torna diagrama' },
        { name: 'SWOT', score: 6, reason: 'Analise que vira documento' },
        { name: 'OKRs', score: 7, reason: 'Documento publico e dashboards' },
        { name: 'Kanban Board', score: 9, reason: 'Artefato fisico/digital visivel' },
        { name: 'Standup Meeting', score: 10, reason: 'Acao social, totalmente externa' }
      ]
    },
    {
      name: 'Rigidity',
      description: 'Quanto a tool permite adaptacao vs exige seguir regras estritas',
      low: { label: 'Flexivel', desc: 'Adapta-se ao contexto, principios guia' },
      high: { label: 'Rigido', desc: 'Regras estritas, desvios nao permitidos' },
      tools: [
        { name: 'Design Thinking', score: 2, reason: 'Fases fluidas, iteracao livre' },
        { name: 'First Principles', score: 2, reason: 'Abordagem, nao processo' },
        { name: 'Effectuation', score: 3, reason: 'Use o que tiver, adapte sempre' },
        { name: 'Lean Startup', score: 4, reason: 'Build-Measure-Learn flexivel' },
        { name: 'SCRUM', score: 6, reason: 'Cerimonias estruturadas, mas adaptável' },
        { name: 'GTD', score: 7, reason: 'Sistema com regras claras mas customizavel' },
        { name: 'Pomodoro', score: 8, reason: '25 min e 25 min, pouca flexibilidade' },
        { name: 'Six Sigma', score: 9, reason: 'DMAIC rigido, certificacoes exigidas' },
        { name: 'Checklist', score: 10, reason: 'Zero desvio permitido' }
      ]
    }
  ]
};

// =============================================================================
// TOOL STACKS - COMBINATIONS THAT WORK
// =============================================================================

export const TOOL_STACKS = {
  title: 'Tool Stacks',
  description: 'Combinacoes de tools que funcionam bem juntas para perfis especificos.',

  stacks: [
    {
      name: 'The Structured Thinker',
      subtitle: 'Para quem precisa de ordem e clareza',
      icon: 'layout-grid',
      color: '#3b82f6',
      idealProfile: 'Alta Conscientiousness, baixa Abertura a Experiencia',
      tools: [
        { name: 'GTD', role: 'Sistema central de organizacao' },
        { name: 'Eisenhower Matrix', role: 'Priorizacao diaria' },
        { name: 'SMART Goals', role: 'Definicao de objetivos' },
        { name: 'Checklists', role: 'Execucao sem falhas' },
        { name: 'Time Blocking', role: 'Alocacao de foco' }
      ],
      synergy: 'GTD captura tudo, Eisenhower prioriza, SMART define metas claras, Checklists garantem execucao, Time Blocking protege foco.',
      warning: 'Risco de over-engineering. Comece simples, adicione complexidade conforme necessidade.'
    },
    {
      name: 'The Creative Explorer',
      subtitle: 'Para quem precisa de inovacao e descoberta',
      icon: 'lightbulb',
      color: '#f59e0b',
      idealProfile: 'Alta Abertura, alto Need for Cognition, baixa Conscientiousness',
      tools: [
        { name: 'Design Thinking', role: 'Processo de inovacao' },
        { name: 'Mind Mapping', role: 'Exploracao de ideias' },
        { name: 'First Principles', role: 'Questionamento fundamental' },
        { name: 'Brainstorming', role: 'Geracao divergente' },
        { name: 'Rapid Prototyping', role: 'Teste rapido de conceitos' }
      ],
      synergy: 'First Principles questiona premissas, Brainstorming gera opcoes, Mind Mapping organiza, Design Thinking estrutura a jornada, Prototyping valida.',
      warning: 'Risco de ficar so na ideacao. Force-se a prototipar e testar cedo.'
    },
    {
      name: 'The Strategic Leader',
      subtitle: 'Para quem precisa de visao e direcao',
      icon: 'compass',
      color: '#10b981',
      idealProfile: 'Alto pensamento sistemico, alta tolerancia a ambiguidade',
      tools: [
        { name: 'SWOT', role: 'Analise de situacao' },
        { name: 'OKRs', role: 'Alinhamento de objetivos' },
        { name: 'Wardley Maps', role: 'Estrategia de evolucao' },
        { name: 'Porters 5 Forces', role: 'Analise competitiva' },
        { name: 'Scenario Planning', role: 'Preparacao para futuros' }
      ],
      synergy: 'SWOT mapeia o presente, Porters analisa o mercado, Wardley mostra evolucao, Scenario Planning prepara futuros, OKRs traduzem em acoes.',
      warning: 'Risco de analysis paralysis. Limite o tempo de analise, force decisoes.'
    },
    {
      name: 'The Resilient Stoic',
      subtitle: 'Para quem precisa de resiliencia e paz interior',
      icon: 'shield',
      color: '#8b5cf6',
      idealProfile: 'Alta estabilidade emocional, introversao moderada',
      tools: [
        { name: 'Stoic Dichotomy of Control', role: 'Foco no que controla' },
        { name: 'Negative Visualization', role: 'Preparacao para adversidade' },
        { name: 'Journaling', role: 'Reflexao e autoconhecimento' },
        { name: 'Meditation', role: 'Clareza mental' },
        { name: 'Memento Mori', role: 'Perspectiva de longo prazo' }
      ],
      synergy: 'Meditacao acalma a mente, Journaling processa emocoes, Dichotomy foca energia, Negative Visualization prepara, Memento Mori da perspectiva.',
      warning: 'Pode virar escapismo. Balance reflexao com acao.'
    },
    {
      name: 'The Data-Driven Decider',
      subtitle: 'Para quem precisa de decisoes baseadas em evidencia',
      icon: 'bar-chart-2',
      color: '#ec4899',
      idealProfile: 'Alto Need for Cognition, baixa impulsividade, alta tolerancia a complexidade',
      tools: [
        { name: 'Bayesian Thinking', role: 'Atualizacao de crencas' },
        { name: 'RICE Scoring', role: 'Priorizacao quantitativa' },
        { name: 'Probabilistic Thinking', role: 'Decisao sob incerteza' },
        { name: 'Decision Matrix', role: 'Comparacao estruturada' },
        { name: 'Pre-mortem Analysis', role: 'Antecipacao de falhas' }
      ],
      synergy: 'Bayesian atualiza priors, Probabilistic quantifica incerteza, RICE prioriza, Decision Matrix compara, Pre-mortem identifica riscos.',
      warning: 'Risco de paralisia por dados. Defina criterio de "dados suficientes" antes de comecar.'
    },
    {
      name: 'The Agile Builder',
      subtitle: 'Para quem precisa de execucao rapida e adaptavel',
      icon: 'zap',
      color: '#06b6d4',
      idealProfile: 'Alta energia, tolerancia a mudanca, orientacao a resultados',
      tools: [
        { name: 'Lean Startup', role: 'Validacao rapida' },
        { name: 'SCRUM', role: 'Iteracao estruturada' },
        { name: 'Kanban', role: 'Fluxo visual de trabalho' },
        { name: 'Pomodoro', role: 'Foco em sprints curtos' },
        { name: 'Retrospectives', role: 'Melhoria continua' }
      ],
      synergy: 'Lean valida ideias, SCRUM estrutura sprints, Kanban visualiza fluxo, Pomodoro maximiza foco, Retrospectives melhoram processo.',
      warning: 'Risco de fazer rapido demais sem qualidade. Balance velocidade com reflexao.'
    },
    {
      name: 'The Deep Work Specialist',
      subtitle: 'Para quem precisa de concentracao profunda e output de qualidade',
      icon: 'focus',
      color: '#6366f1',
      idealProfile: 'Alto conscientiousness, baixa impulsividade, introversao moderada',
      tools: [
        { name: 'Deep Work', role: 'Mentalidade de foco ininterrupto' },
        { name: 'Time Blocking', role: 'Protecao de blocos de foco' },
        { name: 'Pomodoro Technique', role: 'Ritmo de trabalho sustentavel' },
        { name: 'Distraction Matrix', role: 'Eliminacao de interrupcoes' },
        { name: 'Flow State Triggers', role: 'Entrada em fluxo' }
      ],
      synergy: 'Deep Work define a mentalidade, Time Blocking protege espaco, Pomodoro estrutura o ritmo, Distraction Matrix elimina ruido, Flow Triggers otimizam entrada.',
      warning: 'Risco de isolamento social. Balance foco profundo com colaboracao.'
    },
    {
      name: 'The Systems Optimizer',
      subtitle: 'Para quem gerencia operacoes complexas e quer eficiencia',
      icon: 'settings',
      color: '#14b8a6',
      idealProfile: 'Systemico, atencao a detalhes, orientacao a processos',
      tools: [
        { name: 'Lean Manufacturing', role: 'Eliminacao de desperdicio' },
        { name: 'Six Sigma', role: 'Reducao de variancia' },
        { name: 'Process Mapping', role: 'Visualizacao de fluxo' },
        { name: 'PDCA Cycle', role: 'Melhoria continua' },
        { name: 'Bottleneck Analysis', role: 'Identificacao de restricoes' }
      ],
      synergy: 'Process Mapping revela fluxo, Bottleneck Analysis identifica restricoes, Lean elimina desperdicio, Six Sigma reduz variancia, PDCA sustenta melhoria.',
      warning: 'Risco de over-optimization e inflexibilidade. Deixe margem para inovacao.'
    },
    {
      name: 'The Change Catalyst',
      subtitle: 'Para quem lidera transformacao organizacional',
      icon: 'trending-up',
      color: '#f97316',
      idealProfile: 'Alta Abertura, charisma, conforto com ambiguidade',
      tools: [
        { name: 'Transformational Leadership', role: 'Visao e inspiracao' },
        { name: 'Stakeholder Mapping', role: 'Identificacao de influenciadores' },
        { name: 'Change Management', role: 'Gestao de transicao' },
        { name: 'Narrative Design', role: 'Criacao de story para buy-in' },
        { name: 'Coalition Building', role: 'Formacao de aliancas' }
      ],
      synergy: 'Visao inspira, Stakeholder Mapping identifica aliados, Coalition Building gera momentum, Change Management estrutura transicao, Narrative Design sustenta engajamento.',
      warning: 'Risco de resistencia organizacional. Comunique frequentemente e envolva cedo.'
    },
    {
      name: 'The Holistic Growth Seeker',
      subtitle: 'Para desenvolvimento pessoal integrado (corpo, mente, espirito)',
      icon: 'heart',
      color: '#e11d48',
      idealProfile: 'Abertura elevada, introversao moderada, busca de significado',
      tools: [
        { name: 'Habit Stacking', role: 'Integracao de habitos' },
        { name: 'Journaling Practice', role: 'Auto-reflexao profunda' },
        { name: 'Meditation/Mindfulness', role: 'Presenca e clareza' },
        { name: 'Zone of Genius Framework', role: 'Alinhamento com proposito' },
        { name: 'Ikigai Method', role: 'Convergencia de passao, talento, proposito, mercado' }
      ],
      synergy: 'Ikigai define direcao, Zone of Genius mapeia talentos, Habit Stacking constroi rotinas, Meditacao conecta com proposito, Journaling integra aprendizados.',
      warning: 'Risco de espiritualismo superficial. Mantenha rigor e validacao constante.'
    },
    {
      name: 'The Risk Manager',
      subtitle: 'Para quem precisa de contingencia e preparo para cenarios adversos',
      icon: 'shield-alert',
      color: '#0891b2',
      idealProfile: 'Cauteloso, sistemico, baixa impulsividade, planejamento rigoroso',
      tools: [
        { name: 'Risk Register', role: 'Inventario de riscos' },
        { name: 'Pre-mortem Analysis', role: 'Antecipacao de falhas' },
        { name: 'Scenario Planning', role: 'Preparacao para futuros' },
        { name: 'Decision Trees', role: 'Mapeamento de contingencias' },
        { name: 'Simulation/Stress Testing', role: 'Validacao de robustez' }
      ],
      synergy: 'Risk Register mapeia exposicoes, Pre-mortem antecipa falhas, Scenario Planning testa futuros, Decision Trees estrutura contingencias, Simulation valida planos.',
      warning: 'Risco de paralisia por fear. Defina "risco aceitavel" e execute.'
    },
    {
      name: 'The Customer-Centric Designer',
      subtitle: 'Para quem cria produtos centrados em necessidades reais do usuario',
      icon: 'users',
      color: '#d946ef',
      idealProfile: 'Empatia elevada, curiosidade sobre comportamento, pensamento divergente',
      tools: [
        { name: 'Jobs To Be Done', role: 'Identificacao de necessidade real' },
        { name: 'User Research', role: 'Entendimento profundo' },
        { name: 'Design Thinking', role: 'Processo de solucao iterativo' },
        { name: 'Prototyping & Testing', role: 'Validacao com usuarios' },
        { name: 'Empathy Mapping', role: 'Humanizacao do usuario' }
      ],
      synergy: 'User Research e Empathy Mapping revelam necessidade, JTBD a contextualiza, Design Thinking ideiza solucoes, Prototyping valida, Iteracao refina.',
      warning: 'Risco de design por comissao ao inves de dados. Confie em evidencia do usuario.'
    },
    {
      name: 'The Knowledge Architect',
      subtitle: 'Para quem constroi sistemas de conhecimento e aprendizado',
      icon: 'book-open',
      color: '#a855f7',
      idealProfile: 'Alto Need for Cognition, meticuloso, docente/comunicador',
      tools: [
        { name: 'Mental Models Latticework', role: 'Integracao de conhecimento' },
        { name: 'Spaced Repetition', role: 'Retencao de longo prazo' },
        { name: 'Concept Mapping', role: 'Estruturacao de ideias' },
        { name: 'Teaching Method (Feynman)', role: 'Simplificacao e validacao' },
        { name: 'Knowledge Graph', role: 'Conexoes entre dominios' }
      ],
      synergy: 'Mental Models fornece framework, Concept Mapping organiza, Spaced Repetition fixa, Feynman valida compreensao, Knowledge Graph integra dominios.',
      warning: 'Risco de knowledge sem aplicacao. Sempre teste pratica e aplicacao real.'
    },
    {
      name: 'The Negotiator & Influencer',
      subtitle: 'Para quem precisa ganhar acordos e influenciar decisoes',
      icon: 'handshake',
      color: '#fb923c',
      idealProfile: 'Alto carisma, empatia, persuasion, leitura social',
      tools: [
        { name: 'Interest-Based Negotiation (Fisher)', role: 'Identificacao de interesses reais' },
        { name: 'BATNA Analysis', role: 'Alternativa se falhar' },
        { name: 'Anchoring & Framing', role: 'Posicionamento inicial' },
        { name: 'Social Proof & Reciprocity', role: 'Influencia psicologica' },
        { name: 'Principled Disagreement', role: 'Discordia sem prejuizo relacional' }
      ],
      synergy: 'BATNA define posicao, Framing posiciona oferta, Interest-Based busca ganha-ganha, Psicologia amplifica, Principled preserva relacao.',
      warning: 'Risco de manipulacao. Use influencia para beneficio mutuo, nao predacao.'
    }
  ]
};

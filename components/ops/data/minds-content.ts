// =============================================================================
// MINDS EDUCATIONAL CONTENT
// =============================================================================

export const MIND_EXPLANATION = {
  title: 'O que e um Mind?',
  definition: 'Um Mind e o registro central de uma pessoa, mentor ou clone cognitivo no sistema. Ele agrega todos os dados sobre a pessoa: perfil psicologico, drivers, ferramentas usadas, conteudos criados e profiles gerados.',
  coreIdea: 'O Mind e a entidade central do MMOS - tudo gira em torno dele: sources viram contents, contents viram MIUs, MIUs viram drivers, drivers viram recomendacoes.',

  components: [
    {
      name: 'minds',
      desc: 'Tabela central com dados basicos: nome, slug, bio, avatar',
      color: '#64ffda',
      icon: 'circle-user'
    },
    {
      name: 'mind_drivers',
      desc: 'Drivers inferidos com strength e confidence',
      color: '#ff6b6b',
      icon: 'bolt'
    },
    {
      name: 'mind_psychometrics',
      desc: 'Scores Big Five, DISC, etc em JSONB',
      color: '#feca57',
      icon: 'chart-histogram'
    },
    {
      name: 'mind_tags',
      desc: 'Categorias e labels para organizacao',
      color: '#48dbfb',
      icon: 'tag'
    },
    {
      name: 'mind_tools',
      desc: 'Ferramentas que o mind usa e domina',
      color: '#10b981',
      icon: 'wrench-simple'
    }
  ]
};

// =============================================================================
// MIND LIFECYCLE - Fluxo de estados
// =============================================================================

export const MIND_LIFECYCLE = {
  title: 'Ciclo de Vida de um Mind',
  description: 'Um mind passa por fases desde a criacao ate estar pronto para uso em producao.',

  stages: [
    {
      stage: 1,
      name: 'Draft',
      slug: 'draft',
      color: '#64748B',
      icon: 'pencil',
      description: 'Mind recem-criado, sem dados suficientes',
      criteria: [
        'Registro basico criado (nome, slug)',
        'Sem contents associados',
        'Sem drivers inferidos',
        'Sem profiles gerados'
      ],
      nextAction: 'Coletar sources e criar contents'
    },
    {
      stage: 2,
      name: 'Collecting',
      slug: 'collecting',
      color: '#feca57',
      icon: 'download',
      description: 'Coletando materiais fonte (podcasts, artigos, tweets)',
      criteria: [
        'Contents sendo adicionados',
        'ETL pipeline processando sources',
        'Transcricoes em andamento',
        'Minimo: 3-5 contents substanciais'
      ],
      nextAction: 'Rodar extracao de MIUs'
    },
    {
      stage: 3,
      name: 'Extracting',
      slug: 'extracting',
      color: '#48dbfb',
      icon: 'filter',
      description: 'Extraindo MIUs e fragments dos contents',
      criteria: [
        'InnerLens extraction rodando',
        'MIUs sendo gerados e validados',
        'Fragments categorizados',
        'Minimo: 50-100 MIUs validados'
      ],
      nextAction: 'Inferir drivers psicologicos'
    },
    {
      stage: 4,
      name: 'Inferring',
      slug: 'inferring',
      color: '#a55eea',
      icon: 'microchip',
      description: 'Inferindo drivers a partir de MIUs',
      criteria: [
        'Motor de inferencia processando',
        'Drivers sendo atribuidos',
        'Evidence chain sendo construida',
        'Minimo: 10-20 drivers com confidence > 0.6'
      ],
      nextAction: 'Gerar profiles e system prompts'
    },
    {
      stage: 5,
      name: 'Profiling',
      slug: 'profiling',
      color: '#ff6b6b',
      icon: 'badge-check',
      description: 'Gerando profiles e validando identidade',
      criteria: [
        'Profiles sendo gerados',
        'Validacao com Psychologist agent',
        'Quality assurance checks',
        'Fidelity score calculado'
      ],
      nextAction: 'Revisar e aprovar para producao'
    },
    {
      stage: 6,
      name: 'Production',
      slug: 'production',
      color: '#64ffda',
      icon: 'check-circle',
      description: 'Mind completo e pronto para uso',
      criteria: [
        'Todos profiles gerados',
        'Fidelity score > 0.7',
        'Aprovado por QA',
        'Disponivel para recomendacoes'
      ],
      nextAction: 'Monitorar e atualizar continuamente'
    }
  ]
};

// =============================================================================
// MIND PROFILES - Tipos e formatos
// =============================================================================

export const MIND_PROFILES_DETAIL = {
  title: 'Tipos de Profiles',
  description: 'Cada mind pode ter multiplos profiles para diferentes casos de uso.',

  types: [
    {
      type: 'generalista',
      name: 'Profile Generalista',
      color: '#64ffda',
      description: 'System prompt principal para conversas gerais',
      format: 'markdown',
      useCase: 'Chat geral, brainstorming, discussao de ideias',
      example: 'Clone cognitivo completo do Charlie Munger para conversas abertas'
    },
    {
      type: 'specialist',
      name: 'Profile Especialista',
      color: '#a55eea',
      description: 'Focado em um dominio especifico de expertise',
      format: 'markdown',
      useCase: 'Consultoria especializada, revisao de trabalho',
      example: 'Charlie Munger especializado em decisoes de investimento'
    },
    {
      type: 'interviewer',
      name: 'Profile Entrevistador',
      color: '#feca57',
      description: 'Otimizado para fazer perguntas e extrair informacao',
      format: 'markdown',
      useCase: 'Entrevistas, discovery, research',
      example: 'Podcast host que faz perguntas profundas'
    },
    {
      type: 'mentor',
      name: 'Profile Mentor',
      color: '#ff6b6b',
      description: 'Focado em ensino e desenvolvimento',
      format: 'markdown',
      useCase: 'Coaching, feedback, desenvolvimento pessoal',
      example: 'Mentor que guia atraves de frameworks de decisao'
    },
    {
      type: 'debater',
      name: 'Profile Debatedor',
      color: '#48dbfb',
      description: 'Otimizado para confronto de ideias',
      format: 'markdown',
      useCase: 'Debates, stress-testing de ideias, devil advocate',
      example: 'Contrarian que desafia premissas'
    }
  ],

  storageFormats: [
    {
      format: 'md',
      name: 'Markdown',
      description: 'Texto formatado legivel',
      useCase: 'System prompts para LLMs',
      column: 'content_text'
    },
    {
      format: 'json',
      name: 'JSON',
      description: 'Dados estruturados',
      useCase: 'APIs, configuracoes programaticas',
      column: 'content_json'
    },
    {
      format: 'yaml',
      name: 'YAML',
      description: 'Configuracao legivel',
      useCase: 'Exportacao, versionamento',
      column: 'content_text'
    }
  ]
};

// =============================================================================
// MIND PSYCHOMETRICS - Big Five e outros
// =============================================================================

export const MIND_PSYCHOMETRICS = {
  title: 'Psychometrics (Big Five)',
  description: 'Scores psicometricos armazenados em JSONB, principalmente Big Five.',

  bigFive: [
    {
      trait: 'Openness',
      abbrev: 'O',
      color: '#a55eea',
      low: 'Tradicional, Pratico',
      high: 'Curioso, Criativo',
      facets: ['Fantasy', 'Aesthetics', 'Feelings', 'Actions', 'Ideas', 'Values'],
      desc: 'Abertura a novas experiencias, ideias e criatividade'
    },
    {
      trait: 'Conscientiousness',
      abbrev: 'C',
      color: '#10b981',
      low: 'Espontaneo, Flexivel',
      high: 'Organizado, Disciplinado',
      facets: ['Competence', 'Order', 'Dutifulness', 'Achievement', 'Self-Discipline', 'Deliberation'],
      desc: 'Organizacao, persistencia e confiabilidade'
    },
    {
      trait: 'Extraversion',
      abbrev: 'E',
      color: '#feca57',
      low: 'Reservado, Introspectivo',
      high: 'Sociavel, Energetico',
      facets: ['Warmth', 'Gregariousness', 'Assertiveness', 'Activity', 'Excitement-Seeking', 'Positive Emotions'],
      desc: 'Energia social, assertividade e busca por estimulos'
    },
    {
      trait: 'Agreeableness',
      abbrev: 'A',
      color: '#48dbfb',
      low: 'Competitivo, Cetico',
      high: 'Cooperativo, Empatico',
      facets: ['Trust', 'Straightforwardness', 'Altruism', 'Compliance', 'Modesty', 'Tender-Mindedness'],
      desc: 'Cooperacao, confianca e preocupacao com outros'
    },
    {
      trait: 'Neuroticism',
      abbrev: 'N',
      color: '#ff6b6b',
      low: 'Calmo, Resiliente',
      high: 'Ansioso, Reativo',
      facets: ['Anxiety', 'Hostility', 'Depression', 'Self-Consciousness', 'Impulsiveness', 'Vulnerability'],
      desc: 'Tendencia a emocoes negativas e instabilidade emocional'
    }
  ],

  exampleProfile: {
    mind: 'charlie_munger',
    scores: {
      openness: { score: 85, facets: { ideas: 95, actions: 80, values: 70 } },
      conscientiousness: { score: 92, facets: { deliberation: 98, competence: 95, order: 80 } },
      extraversion: { score: 35, facets: { assertiveness: 70, gregariousness: 20, warmth: 40 } },
      agreeableness: { score: 45, facets: { straightforwardness: 80, trust: 30, compliance: 25 } },
      neuroticism: { score: 25, facets: { anxiety: 20, vulnerability: 15, impulsiveness: 35 } }
    },
    interpretation: 'Muito aberto a ideias, extremamente consciencioso e deliberativo, introvertido mas assertivo, cetico mas direto, emocionalmente estavel.'
  }
};

// =============================================================================
// MIND RELATIONSHIPS - Como conecta com outras tabelas
// =============================================================================

export const MIND_RELATIONSHIPS = {
  title: 'Relacionamentos do Mind',
  description: 'Um mind e o centro de uma rede de dados interconectados.',

  inbound: [
    {
      table: 'contents',
      relationship: 'Conteudos sobre ou criados pelo mind',
      via: 'content_minds junction',
      cardinality: 'M:N',
      icon: 'document'
    },
    {
      table: 'fragments',
      relationship: 'Chunks de conhecimento extraidos',
      via: 'fragments.mind_id',
      cardinality: '1:N',
      icon: 'puzzle-piece'
    },
    {
      table: 'mius',
      relationship: 'MIUs extraidos dos contents do mind',
      via: 'mius.mind_id',
      cardinality: '1:N',
      icon: 'quote-right'
    }
  ],

  outbound: [
    {
      table: 'mind_drivers',
      relationship: 'Drivers inferidos para o mind',
      via: 'mind_drivers.mind_id',
      cardinality: '1:N',
      icon: 'bolt'
    },
    {
      table: 'mind_tools',
      relationship: 'Ferramentas que o mind usa',
      via: 'mind_tools.mind_id',
      cardinality: '1:N',
      icon: 'wrench-simple'
    },
    {
      table: 'mind_psychometrics',
      relationship: 'Scores Big Five e outros',
      via: 'mind_psychometrics.mind_id',
      cardinality: '1:N',
      icon: 'chart-histogram'
    },
    {
      table: 'mind_component_scores',
      relationship: 'Scores em componentes de sistemas',
      via: 'mind_component_scores.mind_id',
      cardinality: '1:N',
      icon: 'settings-sliders'
    },
    {
      table: 'mind_system_mappings',
      relationship: 'Resultados de assessments completos',
      via: 'mind_system_mappings.mind_id',
      cardinality: '1:N',
      icon: 'layers'
    },
    {
      table: 'mind_drivers',
      relationship: 'Valores fundamentais',
      via: 'mind_values.mind_id',
      cardinality: '1:N',
      icon: 'star'
    },
    {
      table: 'mind_tags',
      relationship: 'Tags para categorizacao',
      via: 'mind_tags junction',
      cardinality: 'M:N',
      icon: 'tag'
    }
  ]
};

// =============================================================================
// MIND VIEWS - Views uteis
// =============================================================================

export const MIND_VIEWS = {
  title: 'Views de Mind',
  description: 'Views pre-construidas para consultas comuns.',

  views: [
    {
      name: 'v_mind_complete_profile',
      purpose: 'Perfil completo agregado em JSONB',
      returns: 'JSONB com drivers, scores, tags, etc',
      useCase: 'API que precisa de tudo de uma vez'
    },
    {
      name: 'v_mind_content_stats',
      purpose: 'Estatisticas de conteudo por mind',
      returns: 'Contagem de contents, fragments, MIUs',
      useCase: 'Dashboard de progresso do mind'
    },
    {
      name: 'v_mind_portfolio',
      purpose: 'Portfolio de trabalhos do mind',
      returns: 'Cursos, artigos, projetos criados',
      useCase: 'Pagina publica do mind'
    },
    {
      name: 'v_clustering_matrix',
      purpose: 'Matriz para clustering de minds',
      returns: 'Scores normalizados para ML',
      useCase: 'Encontrar minds similares'
    }
  ]
};

// =============================================================================
// EXAMPLE MIND PROFILE
// =============================================================================

export const EXAMPLE_MIND = {
  title: 'Exemplo Completo: Charlie Munger',

  basic: {
    slug: 'charlie_munger',
    name: 'Charlie Munger',
    short_bio: 'Vice-chairman da Berkshire Hathaway, parceiro de Warren Buffett, conhecido por mental models e multidisciplinary thinking.',
    primary_language: 'en',
    privacy_level: 'public',
    apex_score: 92
  },

  drivers: [
    { driver: 'Openness (Ideas)', strength: 9, confidence: 0.92, evidence: 'Latticework of mental models' },
    { driver: 'Conscientiousness (Deliberation)', strength: 10, confidence: 0.95, evidence: 'Sit on your ass investing' },
    { driver: 'Need for Cognition', strength: 10, confidence: 0.90, evidence: 'Reading machine, 500+ pages/day' },
    { driver: 'Contrarianism', strength: 8, confidence: 0.85, evidence: 'Invert, always invert' },
    { driver: 'Long-term Orientation', strength: 10, confidence: 0.95, evidence: 'Never sell a good business' },
    { driver: 'Rationality', strength: 10, confidence: 0.92, evidence: 'Consistently rational decision-making' }
  ],

  tools: [
    { tool: 'Inversion', frequency: 'signature', proficiency: 'master' },
    { tool: 'First Principles', frequency: 'signature', proficiency: 'master' },
    { tool: 'Circle of Competence', frequency: 'frequent', proficiency: 'master' },
    { tool: 'Checklists', frequency: 'frequent', proficiency: 'expert' },
    { tool: 'Lollapalooza Effect', frequency: 'frequent', proficiency: 'master' }
  ],

  // Obsession is now a single text field consolidated from mind_obsessions
  obsession: 'Human Misjudgment',

  values: [
    { name: 'Rationality', importance: 10 },
    { name: 'Intellectual Honesty', importance: 10 },
    { name: 'Patience', importance: 9 },
    { name: 'Independence', importance: 9 }
  ],

  bigFive: {
    openness: 85,
    conscientiousness: 95,
    extraversion: 35,
    agreeableness: 45,
    neuroticism: 20
  }
};

// =============================================================================
// SCHEMA COLUMNS - Para referencia rapida
// =============================================================================

export const MIND_SCHEMA = {
  minds: [
    { column: 'id', type: 'UUID', desc: 'Primary key' },
    { column: 'slug', type: 'TEXT', desc: 'Identificador unico (charlie_munger)' },
    { column: 'name', type: 'TEXT', desc: 'Nome completo' },
    { column: 'primary_language', type: 'CHAR(2)', desc: 'Idioma principal (en, pt)' },
    { column: 'short_bio', type: 'TEXT', desc: 'Biografia curta' },
    { column: 'privacy_level', type: 'TEXT', desc: 'public ou private' },
    { column: 'apex_score', type: 'NUMERIC', desc: 'Score APEX geral' },
    { column: 'avatar_url', type: 'TEXT', desc: 'URL do avatar' },
    { column: 'mmos_metadata', type: 'JSONB', desc: 'Metadados adicionais' }
  ],

  mind_drivers: [
    { column: 'id', type: 'UUID', desc: 'Primary key' },
    { column: 'mind_id', type: 'UUID FK', desc: 'Referencia ao mind' },
    { column: 'driver_id', type: 'UUID FK', desc: 'Referencia ao driver' },
    { column: 'relationship', type: 'VARCHAR', desc: 'core, strong, moderate' },
    { column: 'strength', type: 'INTEGER', desc: 'Forca 1-10' },
    { column: 'evidence', type: 'TEXT', desc: 'Evidencia textual' },
    { column: 'confidence', type: 'NUMERIC', desc: 'Confianca 0.0-1.0' }
  ],

  mind_psychometrics: [
    { column: 'id', type: 'UUID', desc: 'Primary key' },
    { column: 'mind_id', type: 'UUID FK', desc: 'Referencia ao mind' },
    { column: 'psychometric_type', type: 'TEXT', desc: 'big_five, disc, mbti' },
    { column: 'scores', type: 'JSONB', desc: 'Scores estruturados' }
  ],

  mind_tags: [
    { column: 'mind_id', type: 'UUID FK', desc: 'Referencia ao mind' },
    { column: 'tag_id', type: 'UUID FK', desc: 'Referencia a tag' }
  ]
};

// =============================================================================
// PIPELINE EDUCATIONAL CONTENT
// =============================================================================

export interface PhaseDetail {
  phase: number;
  name: string;
  title: string;
  description: string;
  keyPoints: string[];
  tables: { name: string; role: string }[];
  icon: string;
}

export interface DataFlowStep {
  phase: number;
  phaseName: string;
  input: string;
  process: string;
  output: string;
  tables: string[];
}

// =============================================================================
// PHASE DETAILS - Educational content for each pipeline phase
// =============================================================================

export const PHASE_DETAILS: PhaseDetail[] = [
  {
    phase: 1,
    name: 'COLETA',
    title: 'ETL de Fontes Brutas',
    icon: 'download',
    description: 'O pipeline comeca com a coleta sistematica de conteudo bruto de multiplas fontes. Cada tipo de fonte passa por normalizacao especifica para garantir consistencia no processamento posterior.',
    keyPoints: [
      'Suporta podcasts (transcricoes automaticas), artigos, tweets, entrevistas e conversas',
      'Normalizacao: remove timestamps, marcadores de edicao, URLs',
      'Segmentacao: divide em chunks semanticos (paragrafos, turnos de fala)',
      'Metadados: captura data, fonte original, tipo de conteudo, autor',
      'Deduplicacao: evita processar conteudo repetido',
    ],
    tables: [
      { name: 'contents', role: 'Armazena o conteudo normalizado com metadados' },
      { name: 'content_projects', role: 'Agrupa conteudos relacionados (ex: todos os podcasts de uma serie)' },
    ],
  },
  {
    phase: 2,
    name: 'EXTRACAO',
    title: 'InnerLens - Extracao Zero-Inference',
    icon: 'scan',
    description: 'InnerLens extrai unidades minimas de significado (MIUs) aplicando o principio zero-inference: apenas o que esta EXPLICITAMENTE dito e capturado. Nenhuma interpretacao ou inferencia acontece nesta fase.',
    keyPoints: [
      'Verbatim: texto exato como foi dito, sem parafrasear',
      'Analise linguistica: pronomes (foco), verbos (acao), modais (certeza)',
      'Quality Gates: MIUs passam por validacao automatica (palavra minima, coerencia)',
      'Rejeitados: MIUs que nao passam na validacao sao marcados para revisao',
      'Rastreabilidade: cada MIU aponta para o content_id de origem',
    ],
    tables: [
      { name: 'mius', role: 'Unidades minimas interpretaveis com analise linguistica' },
      { name: 'fragments', role: 'Legado - contem campo insight (mistura observavel + inferencia)' },
    ],
  },
  {
    phase: 3,
    name: 'INFERENCIA',
    title: 'Motor Psicologico',
    icon: 'brain',
    description: 'O motor de inferencia transforma observacoes linguisticas (MIUs) em drivers psicologicos. Usa padroes estatisticos e correlacoes entre drivers para derivar um perfil cognitivo com niveis de confianca.',
    keyPoints: [
      'Pattern matching: identifica indicadores linguisticos que sugerem drivers',
      'Evidencia explicita: cada inferencia e conectada aos MIUs que a suportam',
      'Confidence scoring: quanto mais MIUs suportam um driver, maior a confianca',
      'Driver relationships: correlacoes entre drivers refinam o perfil (ex: Conscientiousness alto tende a acompanhar Orientacao a Metas)',
      'Spectrum positioning: posiciona o individuo no espectro bipolar de cada driver',
    ],
    tables: [
      { name: 'mind_drivers', role: 'Drivers atribuidos a cada mind com strength e confidence' },
      { name: 'miu_driver_evidence', role: 'Liga MIUs a drivers com peso de contribuicao' },
      { name: 'drivers', role: 'Catalogo de drivers com indicadores e espectro' },
      { name: 'driver_relationships', role: 'Correlacoes estatisticas entre drivers' },
    ],
  },
  {
    phase: 4,
    name: 'MAPEAMENTO',
    title: 'Drivers para Sistemas Psicometricos',
    icon: 'map',
    description: 'Os drivers internos sao mapeados para sistemas psicometricos conhecidos (Big Five, MBTI, Eneagrama) atraves de uma matriz de correlacao. Isso permite traducao entre nosso sistema proprietario e frameworks estabelecidos.',
    keyPoints: [
      'component_driver_map: define quais drivers influenciam cada componente',
      'Relevancia: cada mapeamento tem peso (high, medium, low)',
      'Scores agregados: combina multiplos drivers para calcular score de componente',
      'Multi-sistema: um mind pode ter scores em varios sistemas simultaneamente',
      'Validacao cruzada: consistencia entre sistemas indica perfil confiavel',
    ],
    tables: [
      { name: 'mapping_systems', role: 'Sistemas psicometricos suportados (Big Five, MBTI, etc)' },
      { name: 'system_components', role: 'Componentes de cada sistema (ex: Openness, Conscientiousness)' },
      { name: 'component_driver_map', role: 'Matriz de correlacao driver x componente' },
      { name: 'mind_component_scores', role: 'Scores calculados para cada mind em cada componente' },
      { name: 'mind_system_mappings', role: 'Tipo agregado (ex: INTJ) derivado dos scores' },
    ],
  },
  {
    phase: 5,
    name: 'PERFIL',
    title: 'Agregacao de Perfil',
    icon: 'user',
    description: 'Toda a informacao e consolidada na tabela minds, que serve como hub central. Alem dos drivers e scores, captura obsessoes (temas recorrentes) e valores fundamentais derivados do conteudo.',
    keyPoints: [
      'Consolidacao: minds e o ponto central que conecta todas as analises',
      'Obsessoes: temas que aparecem repetidamente no conteudo (extrai frequencia)',
      'Valores: principios fundamentais inferidos de padroes de decisao',
      'Biografia gerativa: resumo automatico baseado em todos os dados',
      'Evolucao temporal: permite rastrear mudancas ao longo do tempo',
    ],
    tables: [
      { name: 'minds', role: 'Entidade central com biografia, slug, obsession, metadados' },
    ],
  },
  {
    phase: 6,
    name: 'RECOMENDACAO',
    title: 'Match de Ferramentas',
    icon: 'target',
    description: 'O algoritmo de recomendacao cruza o perfil de drivers com afinidades de ferramentas. Cada ferramenta tem afinidades positivas e negativas com drivers especificos, permitindo calcular um fit_score personalizado.',
    keyPoints: [
      'tool_driver_affinities: define como cada tool se relaciona com drivers',
      'Affinity types: amplifies (potencializa), requires (exige), conflicts (conflita)',
      'fit_score = Sum(affinity_strength x driver_strength x match_weight)',
      'Gap identification: identifica areas onde o individuo precisa desenvolver',
      'Stack building: sugere combinacoes complementares de ferramentas',
    ],
    tables: [
      { name: 'tools', role: 'Catalogo de ferramentas mentais, frameworks, metodologias' },
      { name: 'tool_driver_affinities', role: 'Matriz de afinidade tool x driver' },
      { name: 'tool_relations', role: 'Relacoes entre ferramentas (prereq, complementa)' },
      { name: 'mind_tools', role: 'Ferramentas associadas a cada mind' },
    ],
  },
];

// =============================================================================
// DATA FLOW EXAMPLE - Concrete transformation through phases
// =============================================================================

export const DATA_FLOW_EXAMPLE = {
  originalInput: 'Eu sempre acordo cedo porque preciso de tempo para organizar meu dia',
  context: 'Podcast sobre habitos matinais',
  steps: [
    {
      phase: 1,
      phaseName: 'COLETA',
      input: 'Transcricao bruta do podcast com timestamps e marcadores',
      process: 'ETL normaliza: remove "[00:14:32]", limpa formatacao, segmenta por turnos',
      output: 'Registro em contents com content_type="podcast", status="published"',
      tables: ['contents'],
    },
    {
      phase: 2,
      phaseName: 'EXTRACAO',
      input: 'Texto: "Eu sempre acordo cedo porque preciso de tempo para organizar meu dia"',
      process: 'InnerLens extrai: pronouns=["Eu", "meu"], verbs=["acordo", "preciso", "organizar"], modal=["preciso"], pattern=habitual+necessidade',
      output: 'MIU validado com word_count=12, speaker="self", validation_status="approved"',
      tables: ['mius'],
    },
    {
      phase: 3,
      phaseName: 'INFERENCIA',
      input: 'MIU com padroes: "sempre" (habitual), "preciso" (necessidade), "organizar" (estrutura)',
      process: 'Motor identifica indicadores → Conscientiousness, Need for Structure, Self-Discipline, Orientacao a Metas',
      output: 'mind_drivers: conscientiousness(strength=8), need_for_structure(strength=7), com evidence linkada',
      tables: ['mind_drivers', 'miu_driver_evidence', 'drivers'],
    },
    {
      phase: 4,
      phaseName: 'MAPEAMENTO',
      input: 'Drivers: conscientiousness=8, need_for_structure=7, self_discipline=7',
      process: 'Consulta component_driver_map → drivers mapeiam para Big Five Conscientiousness, MBTI J-preference',
      output: 'mind_component_scores: big5_conscientiousness=75/100, mbti_judging=80/100',
      tables: ['mind_component_scores', 'component_driver_map'],
    },
    {
      phase: 5,
      phaseName: 'PERFIL',
      input: 'Scores de componentes + drivers + MIUs agregados',
      process: 'Consolida em minds: atualiza bio_generated, define obsession (texto consolidado)',
      output: 'minds.bio_generated atualizado, minds.obsession: "morning_routine"',
      tables: ['minds'],
    },
    {
      phase: 6,
      phaseName: 'RECOMENDACAO',
      input: 'Perfil: alto Conscientiousness, Need for Structure, Self-Discipline',
      process: 'Match com tool_driver_affinities → GTD (amplifies structure), Pomodoro (requires self-discipline)',
      output: 'Recommended: GTD (fit=0.89), Time Blocking (fit=0.85), Pomodoro (fit=0.82)',
      tables: ['tools', 'tool_driver_affinities', 'mind_tools'],
    },
  ] as DataFlowStep[],
};

// =============================================================================
// PIPELINE OVERVIEW STATS
// =============================================================================

export const PIPELINE_STATS = {
  totalTables: 22,
  corePathTables: 10,
  supportTables: 12,
  evidenceTables: 2,
  viewsAvailable: 8,
};

// =============================================================================
// BOOK SUMMARY PIPELINE - COMPLETE DOCUMENTATION
// =============================================================================
// This file contains comprehensive documentation for the Book Summary system
// including database schema, relationships, pipeline phases, and diagrams.
// =============================================================================

import { OPS_ACCENT, OPS_PRIMARY } from '../ops-tokens';

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

export interface BookSummaryPhase {
  phase: number | string;
  name: string;
  title: string;
  description: string;
  keyPoints: string[];
  model: 'PRO' | 'FLASH' | 'N/A';
  contextInjected?: string[];
  output?: string;
  icon: string;
}

export interface BookSummaryDataFlow {
  phase: number | string;
  phaseName: string;
  input: string;
  process: string;
  output: string;
  files: string[];
}

export interface DatabaseColumn {
  name: string;
  type: string;
  nullable: boolean;
  description: string;
}

export interface DatabaseRelationship {
  table: string;
  relationship: string;
  via: string;
  cardinality: string;
  icon: string;
  description: string;
}

// =============================================================================
// SECTION: OVERVIEW & DEFINITION
// =============================================================================

export const BOOK_SUMMARY_EXPLANATION = {
  title: 'Book Summary Pipeline',
  definition: 'Sistema de processamento de livros que gera resumos premium de 5000-7000 palavras com insights criticos, exercicios praticos e plano de 7 dias. O pipeline usa metadata enriquecido para adaptar cada fase ao contexto especifico do livro.',
  coreIdea: 'Cada livro e unico. Um livro controverso precisa de contexto critico; um livro popular precisa evitar o obvio; um livro cientifico precisa questionar claims. O metadata informa cada fase.',
  principle: 'Context Injection: Metadata do livro (controversy, scientific_validity, reviews) e injetado em cada fase do pipeline para personalizar o output.',
  stats: {
    totalPhases: 18,
    prePipelinePhases: 4,
    etlPhases: 3,
    corePhases: 11,
    proModelCalls: 8,
    flashModelCalls: 4,
    outputWordCount: '5000-7000',
    intermediateFiles: 10,
  },
  components: [
    {
      name: 'content_projects',
      desc: 'Biblioteca que agrupa todos os livros',
      color: '#8B5CF6',
      icon: 'folder',
    },
    {
      name: 'contents',
      desc: 'Cada livro/resumo como registro individual',
      color: '#06B6D4',
      icon: 'document-text',
    },
    {
      name: 'content_tags',
      desc: 'Categorias de livros (negocios, psicologia, etc)',
      color: '#F59E0B',
      icon: 'tag',
    },
    {
      name: 'content_minds',
      desc: 'Autores vinculados aos livros',
      color: '#10B981',
      icon: 'user',
    },
    {
      name: 'mind_content_interactions',
      desc: 'Favoritos, lidos, ratings dos usuarios',
      color: '#EF4444',
      icon: 'heart',
    },
    {
      name: 'metadata.yaml',
      desc: 'Dados enriquecidos do livro (45+ campos)',
      color: '#64748B',
      icon: 'database',
    },
  ],
};

// =============================================================================
// SECTION: DATABASE SCHEMA
// =============================================================================

export const BOOK_SUMMARY_SCHEMA = {
  contents: {
    title: 'contents',
    description: 'Tabela principal de conteudo. Cada livro e um registro com content_type especifico.',
    relevantColumns: [
      { name: 'id', type: 'UUID', nullable: false, description: 'Primary key' },
      { name: 'slug', type: 'TEXT', nullable: false, description: 'Identificador unico URL-friendly (ex: atomic_habits)' },
      { name: 'title', type: 'TEXT', nullable: true, description: 'Titulo do livro' },
      { name: 'content_type', type: 'TEXT', nullable: true, description: 'Tipo: book_summary, book_metadata, book_premium' },
      { name: 'content', type: 'TEXT', nullable: true, description: 'Conteudo do resumo em Markdown' },
      { name: 'project_id', type: 'UUID', nullable: true, description: 'FK -> content_projects (biblioteca)' },
      { name: 'parent_content_id', type: 'UUID', nullable: true, description: 'FK -> contents (self-reference para hierarquia)' },
      { name: 'sequence_order', type: 'SMALLINT', nullable: true, description: 'Ordem na sequencia' },
      { name: 'status', type: 'TEXT', nullable: true, description: 'draft | reviewed | published | archived' },
      { name: 'metadata', type: 'JSONB', nullable: true, description: 'Dados adicionais (author, year, isbn, etc)' },
      { name: 'image_url', type: 'TEXT', nullable: true, description: 'URL da capa do livro' },
      { name: 'file_path', type: 'TEXT', nullable: true, description: 'Caminho do arquivo no outputs/' },
      { name: 'ai_generated', type: 'BOOLEAN', nullable: true, description: 'Se foi gerado pelo pipeline' },
      { name: 'fidelity_score', type: 'NUMERIC(3,2)', nullable: true, description: 'Score de qualidade 0-1' },
      { name: 'published_at', type: 'TIMESTAMP', nullable: true, description: 'Data de publicacao' },
    ],
    checkConstraints: [
      { column: 'status', values: ['draft', 'reviewed', 'published', 'archived'] },
      { column: 'fidelity_score', values: ['0.00 - 1.00'] },
    ],
  },
  content_projects: {
    title: 'content_projects',
    description: 'Projetos que agrupam conteudos. A biblioteca de livros e um projeto.',
    relevantColumns: [
      { name: 'id', type: 'UUID', nullable: false, description: 'Primary key' },
      { name: 'slug', type: 'TEXT', nullable: false, description: 'Identificador unico (ex: book_library)' },
      { name: 'name', type: 'TEXT', nullable: true, description: 'Nome do projeto' },
      { name: 'project_type', type: 'TEXT', nullable: true, description: 'Tipo: book_library, book_collection, course, etc' },
      { name: 'status', type: 'TEXT', nullable: true, description: 'planning | in_progress | completed | archived' },
      { name: 'project_metadata', type: 'JSONB', nullable: true, description: 'Configuracoes do projeto' },
    ],
    checkConstraints: [
      { column: 'status', values: ['planning', 'in_progress', 'completed', 'archived'] },
    ],
  },
  tags: {
    title: 'tags',
    description: 'Tags genericas para categorizar entidades. Usada para categorias de livros.',
    relevantColumns: [
      { name: 'id', type: 'BIGINT', nullable: false, description: 'Primary key (auto-increment)' },
      { name: 'name', type: 'TEXT', nullable: false, description: 'Nome de exibicao (ex: Negocios, Psicologia)' },
      { name: 'slug', type: 'TEXT', nullable: true, description: 'Identificador URL-friendly (ex: negocios)' },
      { name: 'tag_type', type: 'TEXT', nullable: true, description: 'Discriminador: book_category, course_category, topic' },
      { name: 'tag_group', type: 'TEXT', nullable: true, description: 'Agrupamento opcional' },
      { name: 'description', type: 'TEXT', nullable: true, description: 'Descricao da categoria' },
    ],
    checkConstraints: [
      { column: 'tag_type', values: ['book_category', 'course_category', 'collection', 'topic'] },
    ],
  },
  content_tags: {
    title: 'content_tags',
    description: 'Junction table M:N entre contents e tags.',
    relevantColumns: [
      { name: 'content_id', type: 'UUID', nullable: false, description: 'FK -> contents' },
      { name: 'tag_id', type: 'BIGINT', nullable: false, description: 'FK -> tags' },
    ],
    checkConstraints: [],
  },
  content_minds: {
    title: 'content_minds',
    description: 'Junction table M:N entre contents e minds. Vincula autores aos livros.',
    relevantColumns: [
      { name: 'content_id', type: 'UUID', nullable: false, description: 'FK -> contents' },
      { name: 'mind_id', type: 'UUID', nullable: false, description: 'FK -> minds' },
      { name: 'role', type: 'TEXT', nullable: true, description: 'Papel: author, co_author, contributor' },
    ],
    checkConstraints: [
      { column: 'role', values: ['creator', 'author', 'co_author', 'host', 'guest', 'contributor', 'other'] },
    ],
  },
  mind_content_interactions: {
    title: 'mind_content_interactions',
    description: 'Interacoes de usuarios com livros: favoritos, lidos, ratings.',
    relevantColumns: [
      { name: 'id', type: 'UUID', nullable: false, description: 'Primary key' },
      { name: 'mind_id', type: 'UUID', nullable: false, description: 'FK -> minds (usuario)' },
      { name: 'content_id', type: 'UUID', nullable: false, description: 'FK -> contents (livro)' },
      { name: 'interaction_type', type: 'TEXT', nullable: false, description: 'Tipo da interacao' },
      { name: 'value', type: 'JSONB', nullable: true, description: 'Dados da interacao (stars, notes, etc)' },
    ],
    checkConstraints: [
      { column: 'interaction_type', values: ['favorite', 'read', 'reading', 'want_to_read', 'rating', 'comment', 'highlight', 'note'] },
    ],
  },
  collection_contents: {
    title: 'collection_contents',
    description: 'Junction table para colecoes curadas de livros.',
    relevantColumns: [
      { name: 'id', type: 'UUID', nullable: false, description: 'Primary key' },
      { name: 'collection_id', type: 'UUID', nullable: false, description: 'FK -> content_projects (project_type=book_collection)' },
      { name: 'content_id', type: 'UUID', nullable: false, description: 'FK -> contents (livro)' },
      { name: 'sequence_order', type: 'SMALLINT', nullable: true, description: 'Ordem na colecao' },
    ],
    checkConstraints: [],
  },
};

// =============================================================================
// SECTION: CONTENT TYPES FOR BOOKS
// =============================================================================

export const BOOK_CONTENT_TYPES = [
  {
    type: 'book_metadata',
    description: 'Metadados enriquecidos do livro (45+ campos)',
    example: 'metadata.yaml convertido para contents',
    ai_generated: false,
  },
  {
    type: 'book_summary',
    description: 'Resumo completo premium (5000-7000 palavras)',
    example: '{slug}-premium.md',
    ai_generated: true,
  },
  {
    type: 'book_summary_free',
    description: 'Versao gratuita do resumo (opcional)',
    example: '{slug}-free.md',
    ai_generated: true,
  },
  {
    type: 'book_scoring',
    description: 'Relatorio de scoring (0-100)',
    example: 'scoring-report.md',
    ai_generated: true,
  },
];

// =============================================================================
// SECTION: DATABASE RELATIONSHIPS
// =============================================================================

export const BOOK_SUMMARY_RELATIONSHIPS = {
  title: 'Relacionamentos de Dados',
  description: 'Como as tabelas se conectam para formar o sistema de Book Summary.',
  inbound: [
    {
      table: 'content_projects',
      relationship: 'Biblioteca que contem os livros',
      via: 'contents.project_id -> content_projects.id',
      cardinality: '1:N',
      icon: 'folder',
      description: 'Um projeto (book_library) tem muitos livros',
    },
    {
      table: 'minds',
      relationship: 'Autores dos livros',
      via: 'content_minds.mind_id -> minds.id',
      cardinality: 'N:M',
      icon: 'user',
      description: 'Um livro pode ter multiplos autores',
    },
    {
      table: 'tags',
      relationship: 'Categorias dos livros',
      via: 'content_tags.tag_id -> tags.id',
      cardinality: 'N:M',
      icon: 'tag',
      description: 'Um livro pode ter multiplas categorias',
    },
  ],
  outbound: [
    {
      table: 'mind_content_interactions',
      relationship: 'Interacoes de usuarios',
      via: 'mind_content_interactions.content_id -> contents.id',
      cardinality: '1:N',
      icon: 'heart',
      description: 'Favoritos, lidos, ratings',
    },
    {
      table: 'collection_contents',
      relationship: 'Colecoes curadas',
      via: 'collection_contents.content_id -> contents.id',
      cardinality: 'N:M',
      icon: 'collection',
      description: 'Livro pode estar em varias colecoes',
    },
    {
      table: 'contents (self)',
      relationship: 'Hierarquia de conteudo',
      via: 'contents.parent_content_id -> contents.id',
      cardinality: '1:N',
      icon: 'document-text',
      description: 'Resumo pode ter sub-conteudos',
    },
  ],
};

// =============================================================================
// SECTION: TAGS SYSTEM
// =============================================================================

export const BOOK_TAGS_SYSTEM = {
  title: 'Sistema de Tags para Livros',
  description: 'Como as categorias de livros funcionam no sistema.',
  tagTypes: [
    {
      type: 'book_category',
      description: 'Categorias principais de livros',
      examples: ['Negocios', 'Psicologia', 'Produtividade', 'Lideranca', 'Filosofia', 'Ciencia'],
      usage: 'Filtrar livros por categoria na biblioteca',
    },
    {
      type: 'collection',
      description: 'Colecoes curadas de livros',
      examples: ['Must Read 2024', 'Classics', 'For Beginners', 'Deep Dives'],
      usage: 'Agrupar livros em listas tematicas',
    },
    {
      type: 'topic',
      description: 'Topicos especificos dentro de categorias',
      examples: ['Habits', 'Decision Making', 'Creativity', 'Leadership'],
      usage: 'Tags granulares para busca',
    },
  ],
  workflow: [
    'Livro e criado em contents com content_type=book_summary',
    'Tag de categoria e criada em tags com tag_type=book_category',
    'Vinculo e feito em content_tags (content_id, tag_id)',
    'Frontend filtra por tag_type para mostrar categorias',
  ],
};

// =============================================================================
// SECTION: MINDS CONNECTION
// =============================================================================

export const BOOK_MINDS_CONNECTION = {
  title: 'Conexao com Minds',
  description: 'Como livros se conectam com minds (autores e leitores).',
  authorConnection: {
    title: 'Autores como Minds',
    description: 'Cada autor de livro pode ser um mind no sistema, permitindo criar clones cognitivos.',
    flow: [
      'Autor e criado em minds (ex: james_clear)',
      'Livro e vinculado via content_minds com role=author',
      'Mind pode ter multiplos livros como autor',
      'Possibilidade de criar cognitive clone do autor',
    ],
    benefits: [
      'Analise de estilo de escrita do autor',
      'Conexao entre livros do mesmo autor',
      'Criacao de system prompts baseados no autor',
      'Recomendacoes por similaridade de autor',
    ],
  },
  readerConnection: {
    title: 'Leitores como Minds',
    description: 'Usuarios sao minds que interagem com livros.',
    interactions: [
      { type: 'favorite', description: 'Marcar livro como favorito', value: 'boolean' },
      { type: 'read', description: 'Marcar como lido', value: 'finished_at, rating' },
      { type: 'reading', description: 'Lendo atualmente', value: 'progress, started_at' },
      { type: 'want_to_read', description: 'Lista de desejos', value: 'added_at' },
      { type: 'rating', description: 'Avaliacao 1-5 estrelas', value: 'stars' },
      { type: 'note', description: 'Notas pessoais', value: 'text, highlights' },
    ],
    rpcFunctions: [
      'toggle_favorite(content_id)',
      'set_reading_status(content_id, status, metadata)',
      'rate_content(content_id, stars)',
      'add_note(content_id, text, note_type)',
      'get_my_books(status, limit, offset)',
      'get_my_reading_stats()',
    ],
  },
};

// =============================================================================
// SECTION: PHASE COLORS
// =============================================================================

export const BOOK_SUMMARY_PHASES = {
  'PRE': { label: 'PRE-PIPELINE', color: '#8B5CF6', bg: 'bg-violet-500' },
  '0': { label: 'ETL', color: '#06B6D4', bg: 'bg-cyan-500' },
  '1': { label: 'CONTEXT', color: '#64748B', bg: 'bg-slate-500' },
  '2': { label: 'ENRICHER', color: '#F59E0B', bg: 'bg-amber-500' },
  '3': { label: 'EXTRACTOR', color: '#F59E0B', bg: 'bg-amber-500' },
  '4': { label: 'GAP', color: '#3B82F6', bg: 'bg-blue-500' },
  '5': { label: 'CURATOR', color: '#3B82F6', bg: 'bg-blue-500' },
  '6': { label: 'ARCHITECT', color: '#F59E0B', bg: 'bg-amber-500' },
  '7': { label: 'EDITOR', color: '#3B82F6', bg: 'bg-blue-500' },
  '8': { label: 'ACTION', color: '#F59E0B', bg: 'bg-amber-500' },
  '9': { label: 'WRITER', color: '#3B82F6', bg: 'bg-blue-500' },
  '10': { label: 'QUALITY', color: '#3B82F6', bg: 'bg-blue-500' },
  '11': { label: 'SCORING', color: '#3B82F6', bg: 'bg-blue-500' },
} as const;

// =============================================================================
// SECTION: PRE-PIPELINE PHASES
// =============================================================================

export const PRE_PIPELINE_PHASES: BookSummaryPhase[] = [
  {
    phase: 'PRE-1',
    name: 'ENRICH METADATA',
    title: 'Enriquecimento de Metadados',
    icon: 'sparkles',
    model: 'N/A',
    description: 'Gemini enriquece metadata.yaml com 45+ campos estruturados incluindo informacoes bibliograficas, metricas de mercado, contexto editorial e analise de controversias.',
    keyPoints: [
      'title_en, copies_sold, total_ratings, amazon_url, goodreads_url',
      'controversy_level, scientific_validity scores',
      'key_concepts, similar_books, competing_theories',
      'experts_in_field, awards, ted_talks',
      'author_interviews, wikipedia_url',
    ],
    output: 'metadata.yaml (45+ campos)',
  },
  {
    phase: 'PRE-2',
    name: 'PRIORITIZE',
    title: 'Priorizacao de Livros',
    icon: 'list-ol',
    model: 'N/A',
    description: 'Sistema opcional que prioriza livros baseado em popularidade, relevancia e completude do metadata para otimizar ordem de processamento.',
    keyPoints: [
      'Calcula priority_score baseado em multiplos fatores',
      'copies_sold + total_ratings = market impact',
      'metadata_completeness = readiness score',
      'Ordena fila de processamento',
    ],
    output: 'Lista priorizada de livros',
  },
  {
    phase: 'PRE-3',
    name: 'FETCH REVIEWS',
    title: 'Coleta de Reviews',
    icon: 'chat-bubble',
    model: 'N/A',
    description: 'Apify coleta 20-50 reviews de Amazon e Goodreads para analise posterior de padroes de feedback.',
    keyPoints: [
      'Usa Apify Actors para scraping',
      'Coleta de Amazon (amazon_url) e Goodreads (goodreads_url)',
      '20-50 reviews por livro',
      'Estrutura: rating, text, date, helpful_votes',
    ],
    output: 'reviews/*.json',
  },
  {
    phase: 'PRE-4',
    name: 'ANALYZE REVIEWS',
    title: 'Analise de Reviews',
    icon: 'bar-chart',
    model: 'PRO',
    description: 'Gemini Pro analisa padroes nas reviews para identificar strengths, weaknesses, gaps e surprises que informarao as fases subsequentes.',
    keyPoints: [
      'Strengths: o que leitores mais elogiam',
      'Weaknesses: criticas recorrentes',
      'Gaps: o que leitores sentiram falta',
      'Surprises: insights inesperados',
      'Applications: casos de uso praticos mencionados',
    ],
    output: 'review-analysis.json',
  },
];

// =============================================================================
// SECTION: ETL PHASES
// =============================================================================

export const ETL_PHASES: BookSummaryPhase[] = [
  {
    phase: '0A',
    name: 'URL DISCOVERY',
    title: 'Descoberta de URLs',
    icon: 'search',
    model: 'PRO',
    description: 'Gemini Pro com Grounding busca 50-80 URLs relevantes em 8 categorias, adaptando estrategia baseada no metadata do livro.',
    keyPoints: [
      'Gemini Pro + Google Grounding API',
      '8 categorias: summaries, reviews, author_interviews, etc',
      'Estrategia adaptativa baseada em metadata',
      'Livro controverso? - busca criticas',
      'Low sci_validity? - busca estudos cientificos',
    ],
    contextInjected: ['controversy_level', 'scientific_validity', 'key_concepts'],
    output: 'urls-to-fetch.json (~50-80 URLs)',
  },
  {
    phase: '0B',
    name: 'FETCH RESEARCH',
    title: 'Coleta de Pesquisa',
    icon: 'download',
    model: 'N/A',
    description: 'Node.js fetch paralelo de 20 URLs, extracao de conteudo com Readability e conversao para Markdown.',
    keyPoints: [
      'Parallel fetch (20 URLs simultaneos)',
      'Readability extraction para conteudo limpo',
      'Markdown conversion mantem estrutura',
      'Metadados: title, author, date, word_count',
      'Retry logic para URLs instaveis',
    ],
    output: 'research/sources/*.md (20-40 artigos)',
  },
  {
    phase: '0C',
    name: 'CURATE SOURCES',
    title: 'Curadoria de Fontes',
    icon: 'filter',
    model: 'PRO',
    description: 'Gemini Pro avalia relevancia de cada fonte, removendo conteudo generico e mantendo apenas as top 30 fontes mais valiosas.',
    keyPoints: [
      'Score de relevancia 1-10 por fonte',
      'Remove conteudo generico/repetitivo',
      'Mantem top 30 fontes',
      'Prioriza: author interviews, academic papers, expert reviews',
      'Descarta: SEO content, thin summaries',
    ],
    output: 'research/sources/*.md (curated 30)',
  },
];

// =============================================================================
// SECTION: CORE PIPELINE PHASES (1-11)
// =============================================================================

export const CORE_PHASES: BookSummaryPhase[] = [
  {
    phase: 1,
    name: 'CONTEXT CRITIC',
    title: 'Critico Contextual',
    icon: 'eye',
    model: 'PRO',
    description: 'Analisa contexto editorial do livro, questionando claims e identificando vieses baseado em metadata e review analysis.',
    keyPoints: [
      'Analisa controversy_level e scientific_validity',
      'Identifica experts_in_field e suas opinioes',
      'Mapeia awards e reconhecimentos',
      'Conecta com ted_talks e author_interviews',
      'Gera contexto critico para fases seguintes',
    ],
    contextInjected: ['controversy', 'scientific_validity', 'experts_in_field', 'awards', 'ted_talks', 'author_interviews'],
    output: '01-critical-context.md',
  },
  {
    phase: 2,
    name: 'DATA ENRICHER',
    title: 'Enriquecedor de Dados',
    icon: 'database',
    model: 'FLASH',
    description: 'Expande dados do livro com informacoes de similar_books, derivative_works e cursos relacionados.',
    keyPoints: [
      'Mapeia similar_books para comparacoes',
      'Identifica derivative_works (livros inspirados)',
      'Lista cursos e programas baseados no livro',
      'Conecta com competing_theories',
    ],
    contextInjected: ['similar_books', 'derivative_works', 'courses'],
    output: '02-enrichment-data.md',
  },
  {
    phase: 3,
    name: 'BRUTAL EXTRACTOR',
    title: 'Extrator Brutal',
    icon: 'eye',
    model: 'FLASH',
    description: 'Extrai 96+ itens do conteudo em 20 categorias distintas com protection markers para preservar integridade.',
    keyPoints: [
      'Extracao exaustiva: 96+ itens',
      '20 categorias: quotes, frameworks, stories, etc',
      'Protection markers: [QUOTE], [FRAMEWORK], etc',
      'Preserva contexto original',
      'Zero interpretacao nesta fase',
    ],
    output: '03-raw-extraction.md (96+ items)',
  },
  {
    phase: 4,
    name: 'GAP ANALYZER',
    title: 'Analisador de Gaps',
    icon: 'search',
    model: 'PRO',
    description: 'Reduz 96 itens para 31 essenciais, identificando gaps entre o livro e similar_books/competing_theories.',
    keyPoints: [
      'Cruza com similar_books para diferenciais',
      'Analisa competing_theories para gaps',
      'Incorpora review.weaknesses e review.gaps',
      'Filtra: 96 - 31 itens essenciais',
      'Prioriza originalidade sobre popularidade',
    ],
    contextInjected: ['similar_books', 'competing_theories', 'review.weaknesses', 'review.gaps'],
    output: '04-gap-analysis.md (31 items)',
  },
  {
    phase: 5,
    name: 'SURPRISE CURATOR',
    title: 'Curador de Surpresas',
    icon: 'sparkles',
    model: 'PRO',
    description: 'Seleciona insights surpreendentes em 3 tiers, evitando repeticao de key_concepts ja conhecidos.',
    keyPoints: [
      'Tier 1: Counter-intuitive insights (mais valioso)',
      'Tier 2: Unexpected connections',
      'Tier 3: Hidden gems',
      'EVITA repetir key_concepts do metadata',
      'Incorpora review.surprises',
    ],
    contextInjected: ['key_concepts', 'main_topics', 'one_sentence_summary', 'review.surprises'],
    output: '05-curated-insights.md (Tier 1, 2, 3)',
  },
  {
    phase: 6,
    name: 'LOGICAL ARCHITECT',
    title: 'Arquiteto Logico',
    icon: 'layout',
    model: 'FLASH',
    description: 'Estrutura o resumo em 5-8 secoes com headers standalone e fluxo logico.',
    keyPoints: [
      '5-8 secoes principais',
      'Headers que funcionam standalone',
      'Fluxo logico: problema - solucao - aplicacao',
      'Balanceamento entre teoria e pratica',
      'Preparacao para resumo de 5000-7000 palavras',
    ],
    output: '06-architecture.md (estrutura)',
  },
  {
    phase: 7,
    name: 'CRITICAL EDITOR',
    title: 'Editor Critico',
    icon: 'pencil',
    model: 'PRO',
    description: 'Gera 15+ notas editoriais criticas considerando controversias e validade cientifica.',
    keyPoints: [
      '15+ notas editoriais',
      'Considera controversy_level',
      'Questiona scientific_validity quando baixa',
      'Apresenta competing_theories',
      'Incorpora review.controversies',
    ],
    contextInjected: ['controversy', 'scientific_validity', 'competing_theories', 'review.controversies'],
    output: '07-editorial-commentary.md (15+ notas)',
  },
  {
    phase: 8,
    name: 'ACTION DESIGNER',
    title: 'Designer de Acao',
    icon: 'zap',
    model: 'FLASH',
    description: 'Cria 10+ exercicios praticos e plano de 7 dias adaptado ao publico-alvo.',
    keyPoints: [
      '10+ exercicios praticos',
      'Plano de implementacao de 7 dias',
      'Adaptado ao target_audience',
      'Considera difficulty_level',
      'Incorpora review.applications',
    ],
    contextInjected: ['actionability', 'target_audience', 'difficulty_level', 'review.applications'],
    output: '08-action-design.md (10+ exercicios, 7-day plan)',
  },
  {
    phase: 9,
    name: 'FINAL WRITER',
    title: 'Escritor Final',
    icon: 'file-text',
    model: 'PRO',
    description: 'Compoe o resumo final de 5000-7000 palavras integrando todos os outputs anteriores.',
    keyPoints: [
      '5000-7000 palavras',
      'Integra contexto critico + insights + acoes',
      'Inclui why_read e one_sentence_summary',
      'Links para wikipedia_url e author_wikipedia',
      'Tom adequado ao target_audience',
    ],
    contextInjected: ['why_read', 'one_sentence_summary', 'target_audience', 'wikipedia_url', 'author_wikipedia'],
    output: '{slug}-premium.md (5000-7000 words)',
  },
  {
    phase: 10,
    name: 'QUALITY GATE',
    title: 'Portao de Qualidade',
    icon: 'check-circle',
    model: 'PRO',
    description: 'Valida que o resumo atende todos os criterios de qualidade minimos.',
    keyPoints: [
      'Word count >= 5000',
      '15+ commentaries editoriais',
      '10+ exercicios praticos',
      '7-day implementation plan',
      'AI prompts para aprofundamento',
    ],
    output: '10-quality-gate.md (validacao)',
  },
  {
    phase: 11,
    name: 'SCORING',
    title: 'Pontuacao Final',
    icon: 'award',
    model: 'PRO',
    description: 'Calcula score final 0-100 com breakdown por categoria.',
    keyPoints: [
      'Score total: 0-100 pontos',
      'Breakdown: depth, actionability, criticality, etc',
      'Comparacao com benchmark de qualidade',
      'Identifica areas de melhoria',
    ],
    output: 'scoring-report.md (0-100)',
  },
];

// =============================================================================
// SECTION: DATA FLOW
// =============================================================================

export const BOOK_SUMMARY_DATA_FLOW = {
  originalInput: 'Livro: "Atomic Habits" por James Clear',
  context: 'Popular, high ratings, some scientific claims questioned',
  steps: [
    {
      phase: 'PRE',
      phaseName: 'PRE-PIPELINE',
      input: 'metadata.yaml basico (title, author, slug)',
      process: 'Enrich: Gemini adiciona 45+ campos, Apify coleta reviews, Gemini analisa padroes',
      output: 'metadata.yaml completo + review-analysis.json',
      files: ['metadata.yaml', 'review-analysis.json'],
    },
    {
      phase: '0',
      phaseName: 'ETL',
      input: 'metadata com key_concepts, controversy, etc',
      process: 'Discovery: busca URLs adaptativa - Fetch: 20 artigos - Curate: top 30 fontes',
      output: 'research/sources/*.md (30 artigos curados)',
      files: ['urls-to-fetch.json', 'research/sources/*.md'],
    },
    {
      phase: '1-3',
      phaseName: 'PESQUISA & EXTRACAO',
      input: 'Fontes curadas + metadata + review analysis',
      process: 'Context Critic analisa controversias - Enricher expande dados - Extractor puxa 96+ itens',
      output: '01-critical-context.md, 02-enrichment-data.md, 03-raw-extraction.md',
      files: ['intermediate/01*.md', 'intermediate/02*.md', 'intermediate/03*.md'],
    },
    {
      phase: '4-6',
      phaseName: 'ANALISE & CURADORIA',
      input: '96 itens extraidos + similar_books + reviews',
      process: 'Gap Analyzer: 96-31 - Surprise Curator: Tier 1,2,3 - Architect: 5-8 secoes',
      output: '04-gap-analysis.md, 05-curated-insights.md, 06-architecture.md',
      files: ['intermediate/04*.md', 'intermediate/05*.md', 'intermediate/06*.md'],
    },
    {
      phase: '7-8',
      phaseName: 'EDITORIAL & ACAO',
      input: 'Insights curados + controversy + target_audience',
      process: 'Editor: 15+ notas criticas - Action: 10+ exercicios + 7-day plan',
      output: '07-editorial-commentary.md, 08-action-design.md',
      files: ['intermediate/07*.md', 'intermediate/08*.md'],
    },
    {
      phase: '9-11',
      phaseName: 'OUTPUT FINAL',
      input: 'Todos os outputs intermediarios integrados',
      process: 'Writer: 5000-7000 palavras - Quality: validacao - Scoring: 0-100',
      output: '{slug}-premium.md + scoring-report.md',
      files: ['{slug}-premium.md', 'scoring-report.md', '10-quality-gate.md'],
    },
  ] as BookSummaryDataFlow[],
};

// =============================================================================
// SECTION: METADATA SCHEMA
// =============================================================================

export const METADATA_SCHEMA = {
  bibliographic: [
    'title', 'title_en', 'author', 'author_en', 'slug',
    'publication_year', 'publisher', 'isbn', 'pages', 'language',
  ],
  market: [
    'copies_sold', 'total_ratings', 'avg_rating',
    'amazon_url', 'goodreads_url', 'wikipedia_url', 'author_wikipedia',
  ],
  editorial: [
    'one_sentence_summary', 'why_read', 'target_audience',
    'difficulty_level', 'actionability', 'genre', 'subgenre',
  ],
  analysis: [
    'key_concepts', 'main_topics', 'similar_books', 'competing_theories',
    'derivative_works', 'courses', 'ted_talks', 'author_interviews',
  ],
  quality: [
    'controversy_level', 'scientific_validity', 'experts_in_field',
    'awards', 'notable_endorsements',
  ],
};

// =============================================================================
// SECTION: OUTPUT STRUCTURE
// =============================================================================

export const OUTPUT_STRUCTURE = {
  root: 'outputs/books/{slug}/',
  files: [
    { name: 'metadata.yaml', description: '45+ campos enriquecidos' },
    { name: '{slug}-premium.md', description: 'Resumo completo (5000-7000 palavras)' },
    { name: '{slug}-free.md', description: 'Versao gratuita (opcional)' },
    { name: 'scoring-report.md', description: 'Score final (0-100)' },
  ],
  folders: [
    {
      name: 'research/',
      files: [
        { name: 'urls-to-fetch.json', description: 'URLs descobertas' },
        { name: 'sources/*.md', description: 'Artigos coletados (30)' },
        { name: 'reviews/review-analysis.json', description: 'Padroes de reviews' },
      ],
    },
    {
      name: 'intermediate/',
      files: [
        { name: '01-critical-context.md', description: 'Phase 1 output' },
        { name: '02-enrichment-data.md', description: 'Phase 2 output' },
        { name: '03-raw-extraction.md', description: 'Phase 3 output' },
        { name: '04-gap-analysis.md', description: 'Phase 4 output' },
        { name: '05-curated-insights.md', description: 'Phase 5 output' },
        { name: '06-architecture.md', description: 'Phase 6 output' },
        { name: '07-editorial-commentary.md', description: 'Phase 7 output' },
        { name: '08-action-design.md', description: 'Phase 8 output' },
        { name: '10-quality-gate.md', description: 'Phase 10 output' },
      ],
    },
  ],
};

// =============================================================================
// SECTION: PARADIGM SHIFT
// =============================================================================

export const PARADIGM_SHIFT = {
  before: {
    title: 'Pipeline Generico',
    description: 'Todos os livros tratados da mesma forma',
    problems: [
      'Livro controverso nao recebe contexto critico',
      'Livro popular repete informacoes obvias',
      'Livro cientifico nao questiona claims',
      'Output generico sem diferenciacao',
    ],
  },
  after: {
    title: 'Pipeline Adaptativo',
    description: 'Cada livro recebe contexto personalizado baseado em seu metadata',
    solutions: [
      'Metadata informa cada fase do pipeline',
      'Estrategia de busca adaptada ao livro',
      'Insights filtrados para evitar obviedade',
      'Contexto critico quando necessario',
    ],
  },
  examples: [
    {
      book: 'Livro A (controverso)',
      metadata: 'controversy: high',
      adaptation: 'Phase 7 sabe da controversia e gera notas balanceadas',
      result: 'Resumo que apresenta todos os lados',
    },
    {
      book: 'Livro B (low sci validity)',
      metadata: 'sci_validity: low',
      adaptation: 'Phase 1 questiona claims, ETL busca estudos',
      result: 'Resumo critico com ressalvas cientificas',
    },
    {
      book: 'Livro C (popular)',
      metadata: 'reviews: many, key_concepts: known',
      adaptation: 'Phase 5 evita repetir o obvio',
      result: 'Resumo com insights surpreendentes',
    },
  ],
};

// =============================================================================
// SECTION: VIEWS (Database)
// =============================================================================

export const BOOK_SUMMARY_VIEWS = {
  title: 'Views do Banco de Dados',
  description: 'Views pre-definidas para consultas comuns.',
  views: [
    {
      name: 'v_popular_books',
      purpose: 'Livros mais populares (lidos, favoritados)',
      returns: 'contents + interaction counts',
      useCase: 'Homepage, rankings',
    },
    {
      name: 'v_mind_reading_stats',
      purpose: 'Estatisticas de leitura por usuario',
      returns: 'mind_id + counts by status',
      useCase: 'Dashboard do usuario',
    },
    {
      name: 'v_contents_with_creators',
      purpose: 'Conteudos com seus criadores/autores',
      returns: 'contents JOIN content_minds JOIN minds',
      useCase: 'Listagem com autores',
    },
  ],
};

// =============================================================================
// SECTION: MERMAID DIAGRAMS (Subtle colors)
// =============================================================================

/**
 * Database ER Diagram
 */
export const BOOK_SUMMARY_ER_DIAGRAM = `
erDiagram
    content_projects ||--o{ contents : contains
    contents ||--o{ content_tags : has
    contents ||--o{ content_minds : has
    contents ||--o{ mind_content_interactions : receives
    contents ||--o{ collection_contents : belongs_to
    tags ||--o{ content_tags : categorizes
    minds ||--o{ content_minds : authors
    minds ||--o{ mind_content_interactions : interacts

    content_projects {
        uuid id PK
        text slug
        text name
        text project_type
        text status
    }

    contents {
        uuid id PK
        text slug
        text title
        text content_type
        text content
        uuid project_id FK
        text status
        jsonb metadata
    }

    tags {
        bigint id PK
        text name
        text slug
        text tag_type
    }

    content_tags {
        uuid content_id FK
        bigint tag_id FK
    }

    content_minds {
        uuid content_id FK
        uuid mind_id FK
        text role
    }

    minds {
        uuid id PK
        text slug
        text name
    }

    mind_content_interactions {
        uuid id PK
        uuid mind_id FK
        uuid content_id FK
        text interaction_type
        jsonb value
    }

    collection_contents {
        uuid id PK
        uuid collection_id FK
        uuid content_id FK
        smallint sequence_order
    }
`;

/**
 * Complete Pipeline Overview (subtle colors)
 */
export const BOOK_SUMMARY_PIPELINE_DIAGRAM = `
flowchart TB
    subgraph PRE[PRE-PIPELINE]
        direction LR
        P1[1. Enrich Metadata] --> P2[2. Prioritize]
        P2 --> P3[3. Fetch Reviews]
        P3 --> P4[4. Analyze Reviews]
        P4 --> META[(metadata.yaml)]
    end

    subgraph ETL[PHASE 0 - ETL]
        direction LR
        E1[0A. URL Discovery] --> E2[0B. Fetch Research]
        E2 --> E3[0C. Curate Sources]
        E3 --> SRC[(sources/*.md)]
    end

    subgraph CORE[CORE PIPELINE - PHASES 1-11]
        direction TB

        subgraph BLOCK1[BLOCO 1 - PESQUISA]
            C1[Phase 1 - Context Critic] --> C2[Phase 2 - Data Enricher]
            C2 --> C3[Phase 3 - Brutal Extractor]
        end

        subgraph BLOCK2[BLOCO 2 - ANALISE]
            C4[Phase 4 - Gap Analyzer] --> C5[Phase 5 - Surprise Curator]
            C5 --> C6[Phase 6 - Logical Architect]
        end

        subgraph BLOCK3[BLOCO 3 - EDITORIAL]
            C7[Phase 7 - Critical Editor] --> C8[Phase 8 - Action Designer]
        end

        subgraph BLOCK4[BLOCO 4 - OUTPUT]
            C9[Phase 9 - Final Writer] --> C10[Phase 10 - Quality Gate]
            C10 --> C11[Phase 11 - Scoring]
        end

        BLOCK1 --> BLOCK2
        BLOCK2 --> BLOCK3
        BLOCK3 --> BLOCK4
    end

    subgraph OUTPUT[OUTPUT FINAL]
        OUT1[/premium.md/]
        OUT2[/scoring-report.md/]
    end

    PRE --> ETL
    META -.->|Context Injection| CORE
    ETL --> CORE
    SRC -.->|Research Input| CORE
    CORE --> OUTPUT
`;

/**
 * Pre-Pipeline Detail (subtle)
 */
export const BOOK_SUMMARY_PRE_PIPELINE_DIAGRAM = `
flowchart LR
    subgraph INPUT[INPUT]
        BOOK[/Livro/]
    end

    subgraph ENRICH[1. ENRICH METADATA]
        direction TB
        GEM1[Gemini Pro]
        GEM1 --> META1[45+ campos enriquecidos]
    end

    subgraph REVIEWS[3-4. REVIEWS]
        direction TB
        APIFY[Apify Scraper] --> REV[20-50 reviews]
        REV --> ANAL[Gemini Pro Analyze]
        ANAL --> PATTERNS[strengths, weaknesses, gaps]
    end

    subgraph OUTPUT[OUTPUT]
        YAML[(metadata.yaml)]
        JSON[(review-analysis.json)]
    end

    BOOK --> ENRICH
    ENRICH --> YAML
    BOOK --> REVIEWS
    REVIEWS --> JSON
    YAML -.->|informa| REVIEWS
`;

/**
 * ETL Phase Detail (subtle)
 */
export const BOOK_SUMMARY_ETL_DIAGRAM = `
flowchart TB
    subgraph INPUT[INPUT]
        META[(metadata.yaml)]
    end

    subgraph DISCOVERY[0A. URL DISCOVERY]
        direction TB
        GEM[Gemini Pro + Grounding]
        STRAT{Estrategia Adaptativa}

        GEM --> STRAT
        STRAT -->|controverso| S1[busca criticas]
        STRAT -->|low validity| S2[busca estudos]
        STRAT -->|popular| S3[busca analises]

        S1 --> URLS
        S2 --> URLS
        S3 --> URLS
        URLS[(urls-to-fetch.json)]
    end

    subgraph FETCH[0B. FETCH RESEARCH]
        direction TB
        NODE[Node.js Parallel Fetch]
        READ[Readability Extraction]
        MD[Markdown Conversion]

        NODE --> READ --> MD
        MD --> SOURCES[(sources/*.md)]
    end

    subgraph CURATE[0C. CURATE SOURCES]
        direction TB
        EVAL[Gemini Flash Score]
        FILTER[Keep top 30]

        EVAL --> FILTER
        FILTER --> FINAL[(sources curados)]
    end

    META --> DISCOVERY
    URLS --> FETCH
    SOURCES --> CURATE
`;

/**
 * Core Pipeline Phases Detail (subtle)
 */
export const BOOK_SUMMARY_CORE_PHASES_DIAGRAM = `
flowchart TB
    subgraph CONTEXT[METADATA CONTEXT INJECTION]
        META[(metadata.yaml)]
        REV[(review-analysis.json)]
        BUILD[build_phase_context]
        META --> BUILD
        REV --> BUILD
    end

    subgraph PHASE1[PHASE 1 - Context Critic]
        IN1[controversy, experts]
        OUT1[(01-critical-context.md)]
        IN1 --> OUT1
    end

    subgraph PHASE4[PHASE 4 - Gap Analyzer]
        IN4[similar_books, weaknesses]
        OUT4[(04-gap-analysis.md)]
        IN4 --> OUT4
    end

    subgraph PHASE5[PHASE 5 - Surprise Curator]
        IN5[key_concepts, surprises]
        OUT5[(05-curated-insights.md)]
        IN5 --> OUT5
    end

    subgraph PHASE7[PHASE 7 - Critical Editor]
        IN7[controversy, theories]
        OUT7[(07-editorial.md)]
        IN7 --> OUT7
    end

    subgraph PHASE9[PHASE 9 - Final Writer]
        IN9[all outputs]
        OUT9[(premium.md)]
        IN9 --> OUT9
    end

    BUILD -->|context| PHASE1
    BUILD -->|context| PHASE4
    BUILD -->|context| PHASE5
    BUILD -->|context| PHASE7
    BUILD -->|context| PHASE9

    PHASE1 --> PHASE4 --> PHASE5 --> PHASE7 --> PHASE9
`;

/**
 * Paradigm Shift Diagram (subtle)
 */
export const BOOK_SUMMARY_PARADIGM_DIAGRAM = `
flowchart LR
    subgraph BEFORE[ANTES - Generico]
        BA[Livro A] --> BP[Mesmo Processo]
        BB[Livro B] --> BP
        BC[Livro C] --> BP
        BP --> R[Resumos iguais]
    end

    subgraph AFTER[DEPOIS - Adaptativo]
        AA[Controverso] --> PA[Contexto critico]
        AB[Low validity] --> PB[Questiona claims]
        AC[Popular] --> PC[Evita obvio]
        PA --> RA[Balanceado]
        PB --> RB[Critico]
        PC --> RC[Surpresas]
    end
`;

/**
 * Output Structure Diagram (subtle)
 */
export const BOOK_SUMMARY_OUTPUT_DIAGRAM = `
flowchart TB
    subgraph ROOT[outputs/books/slug/]
        META[(metadata.yaml)]
        PREMIUM[(premium.md)]
        SCORE[(scoring-report.md)]

        subgraph RESEARCH[research/]
            URLS[(urls-to-fetch.json)]
            subgraph SOURCES[sources/]
                SRC1[(*.md - 30 artigos)]
            end
            subgraph REVIEWS[reviews/]
                REV1[(review-analysis.json)]
            end
        end

        subgraph INTERMEDIATE[intermediate/]
            I01[(01-critical-context.md)]
            I04[(04-gap-analysis.md)]
            I05[(05-curated-insights.md)]
            I07[(07-editorial.md)]
            I10[(10-quality-gate.md)]
        end
    end
`;

/**
 * Data Flow Sequence Diagram (subtle)
 */
export const BOOK_SUMMARY_SEQUENCE_DIAGRAM = `
sequenceDiagram
    autonumber
    participant BOOK as Livro
    participant PRE as Pre-Pipeline
    participant META as metadata.yaml
    participant ETL as ETL Phase 0
    participant SRC as sources/
    participant CORE as Core Pipeline
    participant OUT as Output

    BOOK->>PRE: titulo, autor
    PRE->>META: enrich-metadata.py
    Note over META: 45+ campos

    opt Reviews disponiveis
        PRE->>META: fetch-reviews + analyze
        Note over META: review-analysis.json
    end

    META->>ETL: url-discovery.py
    Note over ETL: Estrategia adaptativa
    ETL->>SRC: fetch-research.js
    SRC->>SRC: curate-sources.py
    Note over SRC: 30 fontes curadas

    META-->>CORE: Context Injection
    SRC->>CORE: Research Input

    loop Phases 1-11
        CORE->>CORE: Phase N com contexto
        Note over CORE: Gemini Pro/Flash
    end

    CORE->>OUT: premium.md
    CORE->>OUT: scoring-report.md
    Note over OUT: 5000-7000 palavras
`;

// =============================================================================
// SECTION: TABLE STATUS
// =============================================================================

export const BOOK_SUMMARY_TABLES = [
  { table: 'content_projects', records: 1, status: 'ok' as const, desc: 'Biblioteca de livros (book_library)' },
  { table: 'contents', records: 0, status: 'empty' as const, desc: 'Livros e resumos (content_type=book_*)' },
  { table: 'tags', records: 0, status: 'empty' as const, desc: 'Categorias de livros (tag_type=book_category)' },
  { table: 'content_tags', records: 0, status: 'empty' as const, desc: 'Vinculo livro-categoria' },
  { table: 'content_minds', records: 0, status: 'empty' as const, desc: 'Vinculo livro-autor' },
  { table: 'mind_content_interactions', records: 0, status: 'empty' as const, desc: 'Favoritos, lidos, ratings' },
  { table: 'collection_contents', records: 0, status: 'empty' as const, desc: 'Livros em colecoes' },
];

// =============================================================================
// SECTION: EXAMPLE BOOK
// =============================================================================

export const EXAMPLE_BOOK = {
  title: 'Exemplo: Atomic Habits',
  basic: {
    title: 'Atomic Habits',
    author: 'James Clear',
    slug: 'atomic_habits',
    content_type: 'book_summary',
    status: 'published',
  },
  metadata: {
    title_en: 'Atomic Habits',
    copies_sold: '15 million+',
    avg_rating: 4.38,
    controversy_level: 'low',
    scientific_validity: 'medium',
    key_concepts: ['1% better every day', 'habit stacking', 'environment design', 'identity-based habits'],
    similar_books: ['The Power of Habit', 'Tiny Habits', 'Deep Work'],
    target_audience: 'Anyone wanting to build better habits',
  },
  tags: ['Produtividade', 'Psicologia', 'Auto-ajuda'],
  author_mind: {
    slug: 'james_clear',
    name: 'James Clear',
    role: 'author',
  },
  interactions: [
    { type: 'read', count: 1250 },
    { type: 'favorite', count: 890 },
    { type: 'rating', avg: 4.5 },
  ],
};

// =============================================================================
// SECTION: PROJECT CONTEXT (INTRO TAB)
// =============================================================================

export const BOOK_SUMMARY_PROJECT_CONTEXT = {
  title: 'Contexto do Projeto',
  sections: [
    {
      id: 'mmos',
      title: 'O que e o MMOS?',
      icon: 'brain',
      color: '#8B5CF6',
      content: 'MMOS (Mind Mapping Operating System) e um sistema para criar "clones cognitivos" - representacoes digitais do pensamento de pessoas. O sistema coleta, analisa e estrutura informacoes sobre individuos para criar perfis psicologicos e de conhecimento.',
    },
    {
      id: 'pipeline',
      title: 'O que e o Book Summary Pipeline?',
      icon: 'book-open',
      color: '#06B6D4',
      content: 'O Book Summary Pipeline e um modulo do MMOS que gera resumos premium de livros de nao-ficcao. Os resumos sao usados para: biblioteca digital de alta qualidade, alimentar clones cognitivos de autores, e base de conhecimento para outras funcionalidades.',
    },
    {
      id: 'purpose',
      title: 'Por que este sistema existe?',
      icon: 'circle-question',
      color: '#F59E0B',
      content: 'Este sistema serve como referencia completa para desenvolvedores que precisam modificar ou debugar o pipeline, IAs que precisam entender o fluxo de geracao de resumos, operadores que precisam executar o pipeline manualmente, e integradores que precisam conectar com outros sistemas.',
    },
  ],
  techStack: [
    {
      name: 'Gemini Pro',
      description: 'LLM da Google via Vertex AI',
      reason: 'Melhor custo-beneficio para texto longo',
      icon: 'sparkles',
      color: '#4285F4',
    },
    {
      name: 'Vertex AI',
      description: 'Plataforma de ML da Google Cloud',
      reason: 'API empresarial com SLA',
      icon: 'cloud',
      color: '#34A853',
    },
    {
      name: 'Python',
      description: 'Linguagem de programacao',
      reason: 'Scripts de orquestracao',
      icon: 'code',
      color: '#3776AB',
    },
    {
      name: 'Node.js',
      description: 'Runtime JavaScript',
      reason: 'Fetch paralelo de URLs',
      icon: 'server',
      color: '#339933',
    },
    {
      name: 'Supabase',
      description: 'Banco PostgreSQL gerenciado',
      reason: 'Armazenamento e API',
      icon: 'database',
      color: '#3ECF8E',
    },
    {
      name: 'Apify',
      description: 'Plataforma de web scraping',
      reason: 'Coleta de reviews Amazon/Goodreads',
      icon: 'globe',
      color: '#FF9800',
    },
  ],
};

// =============================================================================
// SECTION: ARCHITECTURAL DECISIONS
// =============================================================================

export const BOOK_SUMMARY_DECISIONS = {
  title: 'Decisoes Arquiteturais',
  decisions: [
    {
      id: 'gemini',
      question: 'Por que Gemini e nao GPT-4/Claude?',
      icon: 'cpu',
      pros: [
        { label: 'Custo', value: '~$2.50/1M tokens', comparison: 'GPT-4: ~$30/1M' },
        { label: 'Contexto', value: '1M tokens', comparison: 'Claude: 200K' },
        { label: 'Grounding', value: 'Busca em tempo real', comparison: 'Outros: Nao tem' },
        { label: 'API', value: 'Vertex AI empresarial', comparison: 'Quotas generosas' },
      ],
    },
    {
      id: 'phases',
      question: 'Por que 11 fases separadas?',
      icon: 'grid',
      explanation: 'O pipeline usa decomposicao de tarefas em vez de um unico prompt gigante.',
      comparison: {
        before: {
          title: 'Prompt Unico',
          pros: ['Simples'],
          cons: ['Qualidade inconsistente', 'Dificil debugar'],
        },
        after: {
          title: '11 Fases',
          pros: ['Qualidade alta', 'Debugavel', 'Retry granular'],
          cons: ['Mais complexo', 'Mais tokens'],
        },
      },
    },
    {
      id: 'hybrid',
      question: 'Por que arquivos + banco de dados?',
      icon: 'layers',
      explanation: 'Usamos uma arquitetura hibrida onde arquivos sao fonte de verdade.',
      files: {
        title: 'Arquivos (Fonte de Verdade)',
        reasons: ['Versionaveis via Git', 'Debug facil', 'Reprocessamento sem perda', 'Funcionam offline'],
      },
      database: {
        title: 'Banco de Dados (Consumo)',
        reasons: ['API para frontend', 'Buscas e filtros', 'Relacionamentos (tags, autores)'],
      },
    },
    {
      id: 'stages',
      question: 'Por que Pre-Pipeline + ETL + Core?',
      icon: 'route',
      stages: [
        { name: 'Pre-Pipeline', desc: 'Coleta dados SOBRE o livro', example: 'ratings, autor, controversias' },
        { name: 'ETL', desc: 'Coleta conteudo DE TERCEIROS', example: 'artigos, reviews' },
        { name: 'Core Pipeline', desc: 'Gera o resumo', example: 'usando tudo acima' },
      ],
      benefit: 'Separar permite executar cada parte independentemente e paralelizar.',
    },
  ],
};

// =============================================================================
// SECTION: GLOSSARY
// =============================================================================

export const BOOK_SUMMARY_GLOSSARY = {
  title: 'Glossario',
  categories: [
    {
      id: 'pipeline',
      name: 'Termos do Pipeline',
      color: '#8B5CF6',
      terms: [
        { term: 'Pipeline', definition: 'Sequencia automatizada de processamento em etapas' },
        { term: 'Phase', definition: 'Uma etapa do pipeline com objetivo especifico' },
        { term: 'ETL', definition: 'Extract-Transform-Load - processo de coleta e transformacao de dados' },
        { term: 'Grounding', definition: 'Recurso do Gemini que busca informacoes em tempo real na web' },
        { term: 'Metadata', definition: 'Dados SOBRE o livro (autor, rating, genero) vs conteudo DO livro' },
        { term: 'Context Injection', definition: 'Inserir informacoes relevantes no prompt de cada fase' },
        { term: 'Curadoria', definition: 'Processo de selecionar e filtrar conteudo por qualidade' },
        { term: 'Batch Runner', definition: 'Script que processa multiplos livros em sequencia' },
      ],
    },
    {
      id: 'technical',
      name: 'Termos Tecnicos',
      color: '#06B6D4',
      terms: [
        { term: 'LLM', definition: 'Large Language Model - modelo de linguagem como Gemini, GPT' },
        { term: 'Vertex AI', definition: 'Plataforma de ML da Google Cloud para acessar Gemini' },
        { term: 'Token', definition: 'Unidade de texto (~4 caracteres). LLMs cobram por token' },
        { term: 'Prompt', definition: 'Instrucao enviada ao LLM' },
        { term: 'Temperature', definition: 'Parametro que controla criatividade (0=deterministico, 1=criativo)' },
        { term: 'Rate Limiting', definition: 'Limite de requisicoes por minuto imposto pela API' },
        { term: 'Backoff', definition: 'Estrategia de esperar mais tempo entre retries' },
      ],
    },
    {
      id: 'mmos',
      name: 'Termos MMOS',
      color: '#F59E0B',
      terms: [
        { term: 'MMOS', definition: 'Mind Mapping Operating System - sistema principal' },
        { term: 'Mind', definition: 'Representacao de uma pessoa no sistema' },
        { term: 'Clone Cognitivo', definition: 'IA que simula o pensamento de uma pessoa' },
        { term: 'Supabase', definition: 'Banco PostgreSQL gerenciado usado pelo projeto' },
        { term: 'Content', definition: 'Registro na tabela contents (livro, curso, artigo)' },
        { term: 'content_type', definition: 'Campo que indica tipo de conteudo (book_summary para livros)' },
        { term: 'Slug', definition: 'Identificador unico URL-friendly (ex: habitos_atomicos)' },
      ],
    },
    {
      id: 'gemini',
      name: 'Modelos Gemini',
      color: '#10B981',
      terms: [
        { term: 'gemini-3-pro', definition: 'Alta qualidade, reasoning avancado - fases criticas (1, 4, 5, 7, 9, 10, 11)' },
        { term: 'gemini-3-flash', definition: 'Rapido, barato, qualidade boa - fases de volume (2, 3, 6, 8)' },
        { term: 'gemini-2.0-flash', definition: 'Versao anterior, muito barata - fallback' },
      ],
    },
  ],
  phases: [
    { phase: '0', name: 'ETL', description: 'Coleta URLs e artigos externos' },
    { phase: '1', name: 'Context Critic', description: 'Estabelece contexto critico e credibilidade' },
    { phase: '2', name: 'Data Enricher', description: 'Enriquece com dados de fontes externas' },
    { phase: '3', name: 'Brutal Extractor', description: 'Extrai TODOS os insights do livro' },
    { phase: '4', name: 'Gap Analyzer', description: 'Identifica lacunas e comparacoes' },
    { phase: '5', name: 'Surprise Curator', description: 'Filtra apenas insights NAO-obvios' },
    { phase: '6', name: 'Logical Architect', description: 'Organiza em estrutura logica' },
    { phase: '7', name: 'Critical Editor', description: 'Adiciona perspectiva critica' },
    { phase: '8', name: 'Action Designer', description: 'Cria exercicios e plano de acao' },
    { phase: '9', name: 'Final Writer', description: 'Escreve o resumo premium final' },
    { phase: '9.5', name: 'Fact-Checker', description: 'Verifica claims contra fontes' },
    { phase: '10', name: 'Quality Gate', description: 'Valida requisitos minimos' },
    { phase: '11', name: 'Scoring', description: 'Atribui nota 0-100 ao resumo' },
  ],
};

// =============================================================================
// SECTION: RPC FUNCTIONS
// =============================================================================

export const BOOK_RPC_FUNCTIONS = {
  title: 'Funcoes RPC para Livros',
  description: 'Funcoes SQL chamadas via supabase.rpc() para operacoes comuns.',
  functions: [
    {
      name: 'toggle_favorite(content_id)',
      description: 'Alterna favorito de um livro',
      returns: 'boolean (novo estado)',
    },
    {
      name: 'set_reading_status(content_id, status, metadata)',
      description: 'Define status de leitura (read, reading, want_to_read)',
      returns: 'void',
    },
    {
      name: 'rate_content(content_id, stars)',
      description: 'Avalia livro com 1-5 estrelas',
      returns: 'void',
    },
    {
      name: 'get_my_books(status, limit, offset)',
      description: 'Lista livros do usuario por status',
      returns: 'contents[] com interacoes',
    },
    {
      name: 'get_my_reading_stats()',
      description: 'Estatisticas de leitura do usuario',
      returns: 'read_count, reading_count, want_to_read_count',
    },
    {
      name: 'get_book_details(content_id)',
      description: 'Detalhes do livro com interacoes do usuario',
      returns: 'contents + user interactions',
    },
  ],
};

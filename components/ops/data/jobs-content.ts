// =============================================================================
// JOBS & EXECUTION TRACKING EDUCATIONAL CONTENT
// =============================================================================

export interface JobFieldInfo {
  name: string;
  type: string;
  desc: string;
  example?: string;
}

export interface CostBreakdown {
  provider: string;
  model: string;
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
  costPerPromptToken: number;
  costPerCompletionToken: number;
  totalCost: number;
}

export interface JobLifecycleStep {
  status: string;
  label: string;
  description: string;
  color: string;
  nextStates: string[];
}

// =============================================================================
// JOB EXECUTIONS TABLE
// =============================================================================

export const JOB_EXECUTIONS_EXPLANATION = {
  title: 'job_executions - Rastreamento de Jobs AI',
  description: 'Tabela central para rastrear todas as execucoes de LLM no sistema. Cada chamada a um modelo de AI (Anthropic, OpenAI, etc.) gera um registro com metricas de custo, tokens e latencia.',
  keyInsights: [
    'Cada job tem um UUID unico para rastreabilidade completa',
    'Metricas de custo (USD) permitem analise de ROI por operacao',
    'Tokens separados (prompt vs completion) revelam eficiencia do prompt',
    'Latencia ajuda a identificar gargalos de performance',
    'Campo result armazena a saida estruturada do LLM',
  ],
  fields: [
    { name: 'id', type: 'UUID', desc: 'Identificador unico do job', example: 'a1b2c3d4-...' },
    { name: 'name', type: 'TEXT', desc: 'Nome descritivo do job', example: 'extract_mius_from_content' },
    { name: 'status', type: 'TEXT', desc: 'Estado atual do job', example: 'completed, failed, running' },
    { name: 'llm_provider', type: 'TEXT', desc: 'Provider do modelo', example: 'anthropic, openai' },
    { name: 'llm_model', type: 'TEXT', desc: 'Modelo utilizado', example: 'claude-3-5-sonnet-20241022' },
    { name: 'llm_version', type: 'TEXT', desc: 'Versao especifica', example: '20241022' },
    { name: 'tokens_prompt', type: 'INTEGER', desc: 'Tokens enviados no prompt', example: '2,450' },
    { name: 'tokens_completion', type: 'INTEGER', desc: 'Tokens gerados na resposta', example: '850' },
    { name: 'tokens_total', type: 'INTEGER', desc: 'Total de tokens (prompt + completion)', example: '3,300' },
    { name: 'cost_usd', type: 'NUMERIC', desc: 'Custo em dolares', example: '$0.0142' },
    { name: 'latency_ms', type: 'INTEGER', desc: 'Tempo de resposta em ms', example: '2,340' },
    { name: 'params', type: 'JSONB', desc: 'Parametros enviados (temperature, etc.)', example: '{"temperature": 0.3}' },
    { name: 'result', type: 'JSONB', desc: 'Resultado estruturado retornado', example: '{"mius": [...]}' },
    { name: 'error', type: 'TEXT', desc: 'Mensagem de erro (se houver)', example: 'Rate limit exceeded' },
    { name: 'executed_at', type: 'TIMESTAMP', desc: 'Quando o job foi executado', example: '2024-12-27 10:30:00' },
    { name: 'created_at', type: 'TIMESTAMP', desc: 'Quando o registro foi criado', example: '2024-12-27 10:29:55' },
  ] as JobFieldInfo[],
};

// =============================================================================
// INGESTION BATCHES TABLE
// =============================================================================

export const INGESTION_BATCHES_EXPLANATION = {
  title: 'ingestion_batches - Lotes de Ingestao',
  description: 'Agrupa multiplas operacoes de ingestao em lotes logicos. Usado para rastrear imports em massa de conteudo (ex: 50 episodios de podcast, 100 artigos).',
  keyInsights: [
    'batch_id permite agrupar operacoes relacionadas',
    'source_url indica a fonte original dos dados',
    'processed_count rastreia progresso do batch',
    'Permite rollback em caso de falha parcial',
    'Fragments e MIUs referenciam o batch via ingestion_batch_id',
  ],
  fields: [
    { name: 'id', type: 'UUID', desc: 'Identificador unico do batch', example: 'b1c2d3e4-...' },
    { name: 'batch_id', type: 'TEXT', desc: 'ID legivel do batch', example: 'podcast-2024-12-batch' },
    { name: 'source_url', type: 'TEXT', desc: 'URL da fonte de dados', example: 'https://api.spotify.com/...' },
    { name: 'status', type: 'TEXT', desc: 'Estado do batch', example: 'processing, completed, failed' },
    { name: 'processed_count', type: 'INTEGER', desc: 'Quantidade processada', example: '47' },
    { name: 'created_at', type: 'TIMESTAMP', desc: 'Data de criacao', example: '2024-12-27 09:00:00' },
  ] as JobFieldInfo[],
};

// =============================================================================
// PROCESSING QUEUE TABLE
// =============================================================================

export const PROCESSING_QUEUE_EXPLANATION = {
  title: 'processing_queue - Fila de Processamento',
  description: 'Sistema de filas para gerenciar tarefas de processamento assincronas. Permite priorização, retentativas automaticas e rastreamento de erros.',
  keyInsights: [
    'Prioridade (1-9) controla ordem de execucao',
    'Retentativas automaticas (attempts) com backoff',
    'last_error preserva contexto para debug',
    'scheduled_at permite agendamento futuro',
    'Integracao com ingestion_batches via batch_id',
  ],
  fields: [
    { name: 'id', type: 'UUID', desc: 'Identificador unico da tarefa' },
    { name: 'batch_id', type: 'UUID', desc: 'FK para ingestion_batches', example: 'Agrupa tarefas do mesmo batch' },
    { name: 'job_type', type: 'TEXT', desc: 'Tipo de job', example: 'extract_mius, infer_drivers' },
    { name: 'scope_type', type: 'TEXT', desc: 'Tipo de escopo', example: 'mind, content, fragment' },
    { name: 'scope_id', type: 'UUID', desc: 'ID do escopo alvo', example: 'ID do mind/content' },
    { name: 'priority', type: 'SMALLINT', desc: 'Prioridade (1=alta, 9=baixa)', example: '3' },
    { name: 'status', type: 'TEXT', desc: 'Estado da tarefa', example: 'queued, processing, done' },
    { name: 'attempts', type: 'SMALLINT', desc: 'Numero de tentativas', example: '2' },
    { name: 'scheduled_at', type: 'TIMESTAMP', desc: 'Quando executar' },
    { name: 'started_at', type: 'TIMESTAMP', desc: 'Inicio da execucao' },
    { name: 'finished_at', type: 'TIMESTAMP', desc: 'Fim da execucao' },
    { name: 'last_error', type: 'TEXT', desc: 'Ultimo erro', example: 'Connection timeout' },
  ] as JobFieldInfo[],
};

// =============================================================================
// JOB LIFECYCLE / STATUS WORKFLOW
// =============================================================================

export const JOB_LIFECYCLE: JobLifecycleStep[] = [
  {
    status: 'queued',
    label: 'Na Fila',
    description: 'Job aguardando execucao. Ordenado por prioridade e scheduled_at.',
    color: '#94a3b8', // slate-400
    nextStates: ['processing', 'cancelled'],
  },
  {
    status: 'processing',
    label: 'Processando',
    description: 'Job em execucao. Worker pegou a tarefa e esta chamando o LLM.',
    color: '#3b82f6', // blue-500
    nextStates: ['completed', 'failed', 'timeout'],
  },
  {
    status: 'completed',
    label: 'Completo',
    description: 'Job executado com sucesso. Resultado salvo em result.',
    color: '#22c55e', // green-500
    nextStates: [],
  },
  {
    status: 'failed',
    label: 'Falhou',
    description: 'Erro durante execucao. Detalhes em error. Pode ter retentativa.',
    color: '#ef4444', // red-500
    nextStates: ['queued', 'cancelled'],
  },
  {
    status: 'timeout',
    label: 'Timeout',
    description: 'Job excedeu tempo limite. Geralmente recolocado na fila.',
    color: '#f97316', // orange-500
    nextStates: ['queued', 'cancelled'],
  },
  {
    status: 'cancelled',
    label: 'Cancelado',
    description: 'Job cancelado manualmente. Nao sera reprocessado.',
    color: '#6b7280', // gray-500
    nextStates: [],
  },
];

// =============================================================================
// COST TRACKING & METRICS
// =============================================================================

export const COST_TRACKING = {
  title: 'Rastreamento de Custos',
  description: 'O sistema rastreia custos por job, permitindo analise detalhada de gastos por operacao, mind, ou periodo.',

  pricingReference: {
    title: 'Referencia de Precos (Dezembro 2024)',
    providers: [
      {
        name: 'Anthropic Claude',
        models: [
          { model: 'claude-3-5-sonnet', promptPrice: 3.00, completionPrice: 15.00, unit: 'per 1M tokens' },
          { model: 'claude-3-5-haiku', promptPrice: 0.80, completionPrice: 4.00, unit: 'per 1M tokens' },
          { model: 'claude-3-opus', promptPrice: 15.00, completionPrice: 75.00, unit: 'per 1M tokens' },
        ],
      },
      {
        name: 'OpenAI',
        models: [
          { model: 'gpt-4-turbo', promptPrice: 10.00, completionPrice: 30.00, unit: 'per 1M tokens' },
          { model: 'gpt-4o', promptPrice: 2.50, completionPrice: 10.00, unit: 'per 1M tokens' },
          { model: 'gpt-4o-mini', promptPrice: 0.15, completionPrice: 0.60, unit: 'per 1M tokens' },
        ],
      },
    ],
  },

  costFormulas: [
    {
      name: 'Custo por Job',
      formula: 'cost_usd = (tokens_prompt * price_prompt) + (tokens_completion * price_completion)',
      example: '(2,450 * $0.000003) + (850 * $0.000015) = $0.0074 + $0.0128 = $0.0202',
    },
    {
      name: 'Custo por Mind',
      formula: 'SUM(cost_usd) WHERE job references mind_id',
      example: 'Mind "joao-silva": 45 jobs = $2.34',
    },
    {
      name: 'Custo por Hora de Conteudo',
      formula: 'SUM(cost_usd) / hours_of_content',
      example: '10 horas de podcast: $15.40 = $1.54/hora',
    },
  ],

  aggregations: [
    { metric: 'Por Provider', query: 'GROUP BY llm_provider', insight: 'Comparar custo Anthropic vs OpenAI' },
    { metric: 'Por Modelo', query: 'GROUP BY llm_model', insight: 'Identificar modelos mais eficientes' },
    { metric: 'Por Tipo de Job', query: 'GROUP BY name', insight: 'Custo de extracao vs inferencia' },
    { metric: 'Por Periodo', query: 'GROUP BY DATE(executed_at)', insight: 'Tendencia de gastos' },
    { metric: 'Por Mind', query: 'JOIN com fragments/mius', insight: 'Custo por perfil processado' },
  ],
};

// =============================================================================
// EXAMPLE JOB EXECUTION WITH COST BREAKDOWN
// =============================================================================

export const EXAMPLE_JOB_EXECUTION = {
  title: 'Exemplo: Extracao de MIUs de Podcast',
  context: 'Processamento de 1 hora de podcast para extrair MIUs',

  job: {
    id: 'a1b2c3d4-5678-90ab-cdef-1234567890ab',
    name: 'extract_mius_from_content',
    status: 'completed',
    llm_provider: 'anthropic',
    llm_model: 'claude-3-5-sonnet-20241022',
    llm_version: '20241022',
    tokens_prompt: 15420,
    tokens_completion: 4230,
    tokens_total: 19650,
    cost_usd: 0.1098,
    latency_ms: 8450,
    params: {
      temperature: 0.2,
      max_tokens: 8000,
      system_prompt: 'Extract MIUs following zero-inference principle...',
    },
    result: {
      mius_extracted: 47,
      validation_passed: 42,
      validation_failed: 5,
      processing_time_s: 8.45,
    },
    error: null,
    executed_at: '2024-12-27T10:30:00Z',
  },

  costBreakdown: {
    promptTokens: 15420,
    promptCost: 0.0463, // 15,420 * $3/1M
    completionTokens: 4230,
    completionCost: 0.0635, // 4,230 * $15/1M
    totalCost: 0.1098,
    costPerMIU: 0.0023, // $0.1098 / 47 MIUs
  },

  linkedEntities: [
    { entity: 'content_id', value: 'podcast-ep-42', desc: 'Episodio fonte' },
    { entity: 'mind_id', value: 'joao-silva', desc: 'Mind alvo' },
    { entity: 'ingestion_batch_id', value: 'podcast-dec-2024', desc: 'Batch de ingestao' },
    { entity: 'mius (42 registros)', value: 'generation_execution_id = job.id', desc: 'MIUs gerados' },
    { entity: 'fragments (5 rejeitados)', value: 'generation_execution_id = job.id', desc: 'Fragmentos nao validados' },
  ],
};

// =============================================================================
// JOB -> ENTITY RELATIONSHIPS
// =============================================================================

export const JOB_ENTITY_RELATIONSHIPS = {
  title: 'Rastreabilidade: Job -> Entidades Geradas',
  description: 'O campo generation_execution_id conecta entidades geradas ao job que as criou.',

  linkedTables: [
    {
      table: 'fragments',
      field: 'generation_execution_id',
      desc: 'Chunks de conhecimento extraidos',
      example: 'Fragmento foi gerado por qual job?',
    },
    {
      table: 'mius',
      field: 'generation_execution_id',
      desc: 'Minimal Interpretable Units extraidas',
      example: 'MIU foi validado em qual execucao?',
    },
    {
      table: 'contents',
      field: 'generation_execution_id',
      desc: 'Conteudos gerados por AI (includes system prompts migrated from mind_profiles)',
      example: 'Artigo foi escrito por qual modelo?',
    },
  ],

  useCases: [
    {
      name: 'Auditoria de Qualidade',
      query: 'SELECT * FROM mius WHERE generation_execution_id = ?',
      benefit: 'Ver todos os MIUs de um job especifico',
    },
    {
      name: 'Rollback de Dados',
      query: 'DELETE FROM fragments WHERE generation_execution_id = ?',
      benefit: 'Reverter ingestao que deu problema',
    },
    {
      name: 'Analise de Modelo',
      query: 'Compare MIU quality across different llm_model values',
      benefit: 'Qual modelo gera MIUs de melhor qualidade?',
    },
    {
      name: 'Custo por Entidade',
      query: 'job.cost_usd / COUNT(fragments) WHERE job.id = ?',
      benefit: 'Quanto custou cada fragmento gerado?',
    },
  ],
};

// =============================================================================
// ERROR HANDLING & RETRIES
// =============================================================================

export const ERROR_HANDLING = {
  title: 'Tratamento de Erros e Retentativas',
  description: 'O sistema implementa retry automatico com backoff exponencial para falhas transientes.',

  retryStrategy: {
    maxAttempts: 3,
    initialDelay: 1000, // 1 segundo
    backoffMultiplier: 2, // 1s, 2s, 4s
    maxDelay: 30000, // 30 segundos max
  },

  errorCategories: [
    {
      category: 'Transiente',
      examples: ['Rate limit', 'Timeout', 'Network error', '503 Service Unavailable'],
      action: 'Retry automatico com backoff',
      recoverable: true,
    },
    {
      category: 'Validacao',
      examples: ['Invalid JSON response', 'Schema mismatch', 'Empty result'],
      action: 'Retry com parametros ajustados',
      recoverable: true,
    },
    {
      category: 'Permanente',
      examples: ['Invalid API key', '400 Bad Request', 'Content policy violation'],
      action: 'Marcar como failed, nao retry',
      recoverable: false,
    },
    {
      category: 'Custo',
      examples: ['Budget exceeded', 'Token limit hit'],
      action: 'Alertar admin, pausar processamento',
      recoverable: false,
    },
  ],

  errorFields: [
    { field: 'status', value: 'failed', desc: 'Job marcado como falho' },
    { field: 'error', value: 'Error message', desc: 'Detalhes do erro' },
    { field: 'attempts', value: 'N', desc: 'Quantas tentativas foram feitas' },
    { field: 'last_error', value: 'Latest error', desc: 'Ultimo erro (em processing_queue)' },
  ],
};

// =============================================================================
// METRICS & STATISTICS
// =============================================================================

export const JOB_METRICS = {
  title: 'Metricas Operacionais',
  description: 'KPIs para monitorar saude e eficiencia do sistema de jobs.',

  keyMetrics: [
    {
      name: 'Taxa de Sucesso',
      formula: 'completed / (completed + failed) * 100',
      target: '> 95%',
      alert: '< 90%',
    },
    {
      name: 'Latencia Media',
      formula: 'AVG(latency_ms)',
      target: '< 5000ms',
      alert: '> 10000ms',
    },
    {
      name: 'Custo por Token',
      formula: 'SUM(cost_usd) / SUM(tokens_total)',
      target: 'Depende do modelo',
      alert: 'Anomalia vs historico',
    },
    {
      name: 'Throughput',
      formula: 'jobs/hora',
      target: 'Depende da carga',
      alert: '< 50% da media',
    },
    {
      name: 'Queue Depth',
      formula: 'COUNT(*) WHERE status = queued',
      target: '< 100',
      alert: '> 500',
    },
    {
      name: 'Retry Rate',
      formula: 'SUM(attempts) / COUNT(*)',
      target: '< 1.2',
      alert: '> 2.0',
    },
  ],

  dashboardQueries: [
    {
      title: 'Jobs por Status (Ultimas 24h)',
      sql: `SELECT status, COUNT(*)
FROM job_executions
WHERE created_at > NOW() - INTERVAL '24 hours'
GROUP BY status`,
    },
    {
      title: 'Custo por Dia',
      sql: `SELECT DATE(executed_at) as day, SUM(cost_usd) as total_cost
FROM job_executions
WHERE executed_at > NOW() - INTERVAL '30 days'
GROUP BY day
ORDER BY day`,
    },
    {
      title: 'Top 10 Jobs Mais Caros',
      sql: `SELECT name, COUNT(*) as executions, SUM(cost_usd) as total_cost
FROM job_executions
GROUP BY name
ORDER BY total_cost DESC
LIMIT 10`,
    },
  ],
};

// =============================================================================
// DIAGRAM DATA
// =============================================================================

export const JOBS_DIAGRAM = `
flowchart TB
    subgraph INPUT[ENTRADA]
        SRC[/Conteudo Fonte/]
        BATCH[(ingestion_batches)]
    end

    subgraph QUEUE[FILA]
        PQ[(processing_queue)]
        WORKER[Worker Process]
    end

    subgraph EXECUTION[EXECUCAO]
        JOB[(job_executions)]
        LLM[[LLM Provider]]
    end

    subgraph OUTPUT[SAIDA]
        MIU[(mius)]
        FRAG[(fragments)]
        CONT[(contents)]
    end

    SRC --> BATCH
    BATCH --> PQ
    PQ --> WORKER
    WORKER --> JOB
    JOB --> LLM
    LLM --> JOB
    JOB -->|generation_execution_id| MIU
    JOB -->|generation_execution_id| FRAG
    JOB -->|generation_execution_id| CONT

    WORKER -->|success| DONE[Completo]
    WORKER -->|error| RETRY{Retry?}
    RETRY -->|sim| PQ
    RETRY -->|nao| FAIL[Falhou]

    style JOB fill:#22D3EE,stroke:#22D3EE,color:#000
    style LLM fill:#a855f7,stroke:#a855f7,color:#fff
    style PQ fill:#3b82f6,stroke:#3b82f6,color:#fff
    style BATCH fill:#64748b,stroke:#64748b,color:#fff
`;

export const JOB_LIFECYCLE_DIAGRAM = `
stateDiagram-v2
    [*] --> queued: Novo job
    queued --> processing: Worker pega
    queued --> cancelled: Cancelamento manual

    processing --> completed: Sucesso
    processing --> failed: Erro
    processing --> timeout: Tempo excedido

    failed --> queued: Retry
    failed --> cancelled: Max retries
    timeout --> queued: Retry
    timeout --> cancelled: Max retries

    completed --> [*]
    cancelled --> [*]

    note right of processing
        Chamando LLM
        Metricas sendo coletadas
    end note

    note right of completed
        result populado
        cost_usd calculado
    end note

    note right of failed
        error populado
        attempts incrementado
    end note
`;

export const JOB_ER_DIAGRAM = `
erDiagram
    ingestion_batches ||--o{ processing_queue : has_tasks
    ingestion_batches ||--o{ fragments : tracked_by

    job_executions ||--o{ fragments : generates
    job_executions ||--o{ mius : generates
    job_executions ||--o{ contents : generates

    ingestion_batches {
        uuid id PK
        text batch_id
        text source_url
        text status
        int processed_count
        timestamp created_at
    }

    processing_queue {
        uuid id PK
        uuid batch_id FK
        text job_type
        text scope_type
        uuid scope_id
        smallint priority
        text status
        smallint attempts
        text last_error
    }

    job_executions {
        uuid id PK
        text name
        text status
        text llm_provider
        text llm_model
        int tokens_prompt
        int tokens_completion
        numeric cost_usd
        int latency_ms
        jsonb result
        text error
    }

    fragments {
        uuid id PK
        uuid ingestion_batch_id FK
        uuid generation_execution_id FK
        text content
        text insight
    }

    mius {
        uuid id PK
        uuid generation_execution_id FK
        text verbatim
        varchar validation_status
    }
`;

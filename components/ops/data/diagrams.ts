// =============================================================================
// MERMAID DIAGRAMS
// =============================================================================

export const PIPELINE_DIAGRAM = `
flowchart TB
    subgraph PHASE1[FASE 1 - COLETA]
        direction TB
        SRC1[/Podcasts/]
        SRC2[/Artigos/]
        SRC3[/Tweets/]
        SRC4[/Entrevistas/]

        SRC1 --> ETL[ETL Pipeline]
        SRC2 --> ETL
        SRC3 --> ETL
        SRC4 --> ETL

        ETL --> CONTENTS[(contents)]
    end

    subgraph PHASE2[FASE 2 - EXTRACAO]
        direction TB
        CONTENTS --> EXTRACT[Extracao Linguistica]
        EXTRACT --> MIUS[(mius)]
        EXTRACT --> FRAG[(fragments)]

        MIUS --> VALID{Validacao}
        VALID -->|validated| MIUS_OK[(MIUs OK)]
        VALID -->|rejected| MIUS_REJ[(Rejeitados)]
    end

    subgraph PHASE3[FASE 3 - INFERENCIA]
        direction TB
        MIUS_OK --> INFER[Motor de Inferencia]

        INFER --> MD[(mind_drivers)]
        INFER --> MDE[(miu_driver_evidence)]

        MD <--> DR[(driver_relationships)]
        MD <--> DRIVERS[(drivers)]
    end

    subgraph PHASE4[FASE 4 - MAPEAMENTO]
        direction TB
        MD --> MAP[Mapeamento]
        CDM[(component_driver_map)]
        MS[(mapping_systems)]
        SC[(system_components)]

        MS --> SC
        SC --> CDM
        CDM --> MAP

        MAP --> MCS[(mind_component_scores)]
        MAP --> MSM[(mind_system_mappings)]
    end

    subgraph PHASE5[FASE 5 - PERFIL]
        direction TB
        MCS --> PROFILE[Perfil Agregado]
        MSM --> PROFILE
        MD --> PROFILE

        PROFILE --> MINDS[(minds)]
    end

    subgraph PHASE6[FASE 6 - RECOMENDACAO]
        direction TB
        MD --> TDA[(tool_driver_affinities)]
        TOOLS[(tools)] --> TDA
        TDA --> MATCH[Match Engine]
        TR[(tool_relations)] --> MATCH

        MATCH --> RECO[/Recommended Tools/]
        MATCH --> GAPS[/Development Gaps/]
    end

    MINDS --> MT[(mind_tools)]
    TOOLS --> MT

    style MIUS fill:#ff6b6b,stroke:#ff6b6b,color:#fff
    style MD fill:#ff6b6b,stroke:#ff6b6b,color:#fff
    style MCS fill:#ff6b6b,stroke:#ff6b6b,color:#fff
    style TDA fill:#ff6b6b,stroke:#ff6b6b,color:#fff
    style MDE fill:#a55eea,stroke:#a55eea,color:#fff
    style MINDS fill:#64ffda,stroke:#64ffda,color:#000
    style DRIVERS fill:#4ecdc4,stroke:#4ecdc4,color:#000
    style TOOLS fill:#45b7d1,stroke:#45b7d1,color:#000
`;

export const MIU_DIAGRAM = `
erDiagram
    contents ||--o{ mius : extracted_from
    contents ||--o{ fragments : extracted_from
    minds ||--o{ mius : about
    minds ||--o{ fragments : about

    mius ||--o{ miu_driver_evidence : supports
    mius ||--o{ miu_component_evidence : supports

    mind_drivers ||--o{ miu_driver_evidence : evidenced_by
    mind_component_scores ||--o{ miu_component_evidence : evidenced_by

    contents {
        uuid id
        uuid mind_id
        text title
        text content
        text content_type
    }

    mius {
        uuid id
        uuid mind_id
        uuid source_id
        text verbatim
        int word_count
        varchar speaker
        array pronouns
        array verbs
        varchar validation_status
    }

    fragments {
        uuid id
        uuid mind_id
        varchar type
        text content
        text insight
    }

    miu_driver_evidence {
        uuid id
        uuid miu_id
        uuid mind_driver_id
        varchar inference_type
        decimal contribution_weight
        text inference_reasoning
    }
`;

export const DRIVER_DIAGRAM = `
erDiagram
    drivers ||--o{ driver_relationships : relates_to
    drivers ||--o{ mind_drivers : assigned_to
    drivers ||--o{ component_driver_map : maps_to
    drivers ||--o{ tool_driver_affinities : affinity_with

    minds ||--o{ mind_drivers : has
    mind_drivers ||--o{ miu_driver_evidence : evidenced_by

    drivers {
        uuid id
        varchar slug
        varchar name
        text description
        varchar driver_type
        varchar domain
        varchar spectrum_low
        varchar spectrum_high
        jsonb indicators
    }

    driver_relationships {
        uuid id
        uuid driver_a_id
        uuid driver_b_id
        varchar relationship_type
        numeric strength
        numeric r
        int k
        varchar quality_tier
    }

    mind_drivers {
        uuid id
        uuid mind_id
        uuid driver_id
        varchar relationship
        int strength
        text evidence
        numeric confidence
    }
`;

export const MAPPING_DIAGRAM = `
erDiagram
    mapping_systems ||--o{ system_components : has
    mapping_systems ||--o{ mind_system_mappings : assessed_in
    system_components ||--o{ component_driver_map : maps_to
    system_components ||--o{ mind_component_scores : scored_in

    drivers ||--o{ component_driver_map : linked_from
    minds ||--o{ mind_system_mappings : has
    minds ||--o{ mind_component_scores : has

    mapping_systems {
        uuid id
        varchar slug
        varchar name
        varchar system_type
        varchar category
        text core_insight
        varchar scientific_validity
    }

    system_components {
        uuid id
        uuid system_id
        varchar slug
        varchar name
        varchar component_type
        varchar spectrum_low
        varchar spectrum_high
    }

    component_driver_map {
        uuid id
        uuid component_id
        uuid driver_id
        varchar relevance
    }

    mind_component_scores {
        uuid id
        uuid mind_id
        uuid component_id
        numeric score_numeric
        int confidence
    }
`;

export const TOOLS_DIAGRAM = `
erDiagram
    tools ||--o{ tool_relations : source
    tools ||--o{ tool_relations : target
    tools ||--o{ tool_driver_affinities : has
    tools ||--o{ mind_tools : used_by

    drivers ||--o{ tool_driver_affinities : linked_to
    minds ||--o{ mind_tools : uses

    tools {
        uuid id
        varchar slug
        varchar name
        text description
        enum tool_type
        smallint axis_prescriptive
        varchar question_answered
        text when_to_use
        enum evidence_level
    }

    tool_relations {
        uuid id
        uuid source_tool_id
        uuid target_tool_id
        varchar relation_type
        numeric strength
    }

    tool_driver_affinities {
        uuid id
        uuid tool_id
        uuid driver_id
        enum affinity_type
        numeric strength
        text rationale
    }

    mind_tools {
        uuid id
        uuid mind_id
        uuid tool_id
        varchar usage_frequency
        varchar proficiency
    }
`;

export const SEQUENCE_DIAGRAM = `
sequenceDiagram
    autonumber
    participant SRC as Sources
    participant CON as contents
    participant MIU as mius
    participant DRV as mind_drivers
    participant TDA as tool_driver_affinities
    participant TOOL as tools
    participant OUT as Output

    SRC->>CON: ETL (transcricoes, artigos)
    CON->>MIU: Extracao linguistica
    Note over MIU: Zero-inference - Apenas observaveis
    MIU->>MIU: Validacao (quality gate)
    MIU->>DRV: Inferencia psicologica
    Note over DRV: Usando driver_relationships e indicators
    DRV->>TDA: Match com afinidades
    TOOL->>TDA: Catalogo de tools
    TDA->>TDA: Calcular fit_score
    Note over TDA: fit = Sum(affinity x strength)
    TDA->>OUT: Ranking personalizado
    Note over OUT: + Cognitive stacks + Development gaps
`;

export const GAPS_DIAGRAM = `
flowchart LR
    subgraph OK[PRONTO]
        A1[(contents)]
        A2[(drivers)]
        A3[(tools)]
        A4[(driver_relationships)]
        A5[(component_driver_map)]
        A6[(mapping_systems)]
    end

    subgraph EMPTY[VAZIO CRITICO]
        B1[(mius)]
        B2[(mind_drivers)]
        B3[(mind_component_scores)]
        B4[(tool_driver_affinities)]
    end

    subgraph PROPOSED[PROPOSTO]
        C1[(miu_driver_evidence)]
        C2[(miu_component_evidence)]
    end

    A1 -.->|BLOQUEADO| B1
    B1 -.->|BLOQUEADO| B2
    A2 -.->|BLOQUEADO| B2
    B2 -.->|BLOQUEADO| B3
    B2 -.->|BLOQUEADO| B4
    A3 -.->|BLOQUEADO| B4

    B1 -.->|PRECISA| C1
    B2 -.->|PRECISA| C1

    style B1 fill:#ff6b6b,stroke:#ff6b6b,color:#fff
    style B2 fill:#ff6b6b,stroke:#ff6b6b,color:#fff
    style B3 fill:#ff6b6b,stroke:#ff6b6b,color:#fff
    style B4 fill:#ff6b6b,stroke:#ff6b6b,color:#fff
    style C1 fill:#a55eea,stroke:#a55eea,color:#fff
    style C2 fill:#a55eea,stroke:#a55eea,color:#fff
`;

import type { OpsStats } from '@/hooks/useOpsStats';

// =============================================================================
// DEPENDENCY CHAIN DIAGRAM
// =============================================================================

export const DEPENDENCY_CHAIN_DIAGRAM = `
flowchart LR
    subgraph INICIO[DISPONIVEL]
        C[(contents)]
        D[(drivers)]
        T[(tools)]
    end

    subgraph GAP1[GAP CRITICO 1]
        M[(mius = 0)]
    end

    subgraph GAP2[GAP CRITICO 2]
        MD[(mind_drivers = 0)]
    end

    subgraph GAP3[GAP CRITICO 3]
        TDA[(tool_driver_affinities = 0)]
    end

    subgraph GAP4[GAP CRITICO 4]
        MCS[(mind_component_scores = 0)]
    end

    subgraph FIM[RESULTADO FINAL]
        RECO[/Recomendacoes/]
        FIT[/Fit Score/]
        PROF[/Perfil Completo/]
    end

    C -->|BLOQUEADO| M
    M -->|BLOQUEADO| MD
    D -->|BLOQUEADO| MD
    MD -->|BLOQUEADO| MCS
    MD -->|BLOQUEADO| TDA
    T -->|BLOQUEADO| TDA
    TDA -->|BLOQUEADO| FIT
    MCS -->|BLOQUEADO| PROF
    MD & TDA -->|BLOQUEADO| RECO

    style M fill:#ff6b6b,stroke:#ff6b6b,color:#fff
    style MD fill:#ff6b6b,stroke:#ff6b6b,color:#fff
    style TDA fill:#ff6b6b,stroke:#ff6b6b,color:#fff
    style MCS fill:#ff6b6b,stroke:#ff6b6b,color:#fff
    style RECO fill:#64748b,stroke:#64748b,color:#fff
    style FIT fill:#64748b,stroke:#64748b,color:#fff
    style PROF fill:#64748b,stroke:#64748b,color:#fff
`;

// =============================================================================
// GAP COUNTS CALCULATOR
// =============================================================================

export interface GapCounts {
  critical: number;
  affinities: number;
  mius: number;
  fragments: number;
  mindDrivers: number;
  drivers: number;
  tools: number;
  driverRels: number;
  compMaps: number;
}

export function calculateGapCounts(stats?: OpsStats): GapCounts {
  return {
    critical: 3, // Hardcoded for now based on critical blocks
    affinities: stats?.toolAffinities ?? 0,
    mius: stats?.contents ?? 0,
    fragments: stats?.fragments ?? 0,
    mindDrivers: stats?.mindDrivers ?? 0,
    drivers: stats?.drivers ?? 0,
    tools: stats?.tools ?? 0,
    driverRels: stats?.driverRels ?? 0,
    compMaps: stats?.compMaps ?? 0,
  };
}

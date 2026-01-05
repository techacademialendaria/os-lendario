import React from 'react';
import { MermaidDiagram } from '../../components/MermaidDiagram';
import {
  OpsCard,
  OpsCardHeader,
  OpsCardContent
} from '../../ops-ui';

const MINDS_DIAGRAM = `
erDiagram
    minds ||--o{ mind_drivers : has
    minds ||--o{ mind_psychometrics : has
    minds ||--o{ mind_component_scores : has
    minds ||--o{ mind_system_mappings : has
    minds ||--o{ mind_tools : uses
    minds ||--o{ mind_tags : tagged_with
    minds ||--o{ contents : about
    minds ||--o{ fragments : extracted_from

    mind_drivers }o--|| drivers : references
    mind_tools }o--|| tools : references
    mind_tags }o--|| tags : references
    mind_component_scores }o--|| system_components : scores_in
    mind_system_mappings }o--|| mapping_systems : assessed_in

    minds {
        uuid id
        text slug
        text name
        text short_bio
        text privacy_level
        numeric apex_score
    }

    mind_drivers {
        uuid id
        uuid mind_id
        uuid driver_id
        int strength
        numeric confidence
        text evidence
    }

    mind_psychometrics {
        uuid id
        uuid mind_id
        text psychometric_type
        jsonb scores
    }
`;

export const SchemaDiagramView: React.FC = () => {
  return (
    <OpsCard>
      <OpsCardHeader title="Schema - Relacionamentos" accentColor="text-muted-foreground" />
      <OpsCardContent>
        <MermaidDiagram chart={MINDS_DIAGRAM} id="minds" />
      </OpsCardContent>
    </OpsCard>
  );
};

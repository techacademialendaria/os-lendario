import React from 'react';
import { Badge } from '../../../ui/badge';
import { MermaidDiagram } from '../../components/MermaidDiagram';
import { OPS_ACCENT } from '../../ops-tokens';
import {
  OpsCard,
  OpsCardHeader,
  OpsCardContent,
  OpsGrid,
  OpsText,
  OpsCode,
} from '../../ops-ui';
import {
  BOOK_SUMMARY_SCHEMA,
  BOOK_CONTENT_TYPES,
  BOOK_RPC_FUNCTIONS,
  BOOK_SUMMARY_VIEWS,
  BOOK_SUMMARY_ER_DIAGRAM,
} from '../../data/book-summary-content';
import type { DatabaseViewProps } from '../types';

export const DatabaseView: React.FC<DatabaseViewProps> = ({
  selectedSchema,
  onSchemaChange,
}) => {
  return (
    <>
      <SchemaCard selectedSchema={selectedSchema} onSchemaChange={onSchemaChange} />
      <ContentTypesCard />
      <RPCFunctionsCard />
      <ViewsCard />
      <ERDiagramCard />
    </>
  );
};

// ============================================================================
// Schema Card
// ============================================================================

interface SchemaCardProps {
  selectedSchema: string;
  onSchemaChange: (schema: string) => void;
}

const SchemaCard: React.FC<SchemaCardProps> = ({ selectedSchema, onSchemaChange }) => (
  <OpsCard>
    <OpsCardHeader title="Database Schema - Tabelas Relevantes" accentColor="text-muted-foreground" />
    <OpsCardContent>
      <div className="flex flex-wrap gap-2 mb-4">
        {Object.keys(BOOK_SUMMARY_SCHEMA).map((schema) => {
          const schemaData = BOOK_SUMMARY_SCHEMA[schema as keyof typeof BOOK_SUMMARY_SCHEMA];
          const isSelected = schema === selectedSchema;
          return (
            <button
              key={schema}
              onClick={() => onSchemaChange(schema)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                isSelected ? 'text-white' : 'bg-muted/30 text-muted-foreground hover:bg-muted/50'
              }`}
              style={isSelected ? { backgroundColor: OPS_ACCENT } : {}}
            >
              {schemaData.title}
            </button>
          );
        })}
      </div>

      {selectedSchema && <SchemaDetails schemaKey={selectedSchema} />}
    </OpsCardContent>
  </OpsCard>
);

interface SchemaDetailsProps {
  schemaKey: string;
}

const SchemaDetails: React.FC<SchemaDetailsProps> = ({ schemaKey }) => {
  const schema = BOOK_SUMMARY_SCHEMA[schemaKey as keyof typeof BOOK_SUMMARY_SCHEMA];
  if (!schema) return null;

  return (
    <div className="space-y-4">
      <div className="p-4 rounded-lg bg-muted/10 border-l-4" style={{ borderColor: OPS_ACCENT }}>
        <h4 className="font-bold text-sm mb-1" style={{ color: OPS_ACCENT }}>{schema.title}</h4>
        <p className="text-xs text-muted-foreground">{schema.description}</p>
      </div>

      <div className="overflow-x-auto rounded-lg border border-border/20">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border/20 bg-muted/20">
              <th className="text-left py-2 px-3 text-xs font-bold uppercase" style={{ color: OPS_ACCENT }}>Coluna</th>
              <th className="text-left py-2 px-3 text-xs font-bold uppercase" style={{ color: OPS_ACCENT }}>Tipo</th>
              <th className="text-left py-2 px-3 text-xs font-bold uppercase" style={{ color: OPS_ACCENT }}>Null</th>
              <th className="text-left py-2 px-3 text-xs font-bold uppercase" style={{ color: OPS_ACCENT }}>Descricao</th>
            </tr>
          </thead>
          <tbody>
            {schema.relevantColumns.map((col, i) => (
              <tr key={i} className="border-b border-border/10 hover:bg-muted/10">
                <td className="py-2 px-3">
                  <OpsCode className="text-xs" style={{ color: OPS_ACCENT }}>{col.name}</OpsCode>
                </td>
                <td className="py-2 px-3 font-mono text-xs text-muted-foreground">{col.type}</td>
                <td className="py-2 px-3">
                  {col.nullable ? (
                    <span className="text-[10px] text-muted-foreground">yes</span>
                  ) : (
                    <span className="text-[10px] text-amber-400">NOT NULL</span>
                  )}
                </td>
                <td className="py-2 px-3 text-xs text-muted-foreground">{col.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {schema.checkConstraints.length > 0 && (
        <div className="p-3 rounded-lg bg-muted/10">
          <h5 className="text-xs font-bold mb-2" style={{ color: OPS_ACCENT }}>CHECK Constraints</h5>
          <div className="space-y-1">
            {schema.checkConstraints.map((constraint, i) => (
              <div key={i} className="text-[10px]">
                <OpsCode className="text-muted-foreground">{constraint.column}</OpsCode>
                <span className="text-muted-foreground mx-2">IN</span>
                <span className="text-foreground">{constraint.values.join(' | ')}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// ============================================================================
// Content Types Card
// ============================================================================

const ContentTypesCard: React.FC = () => (
  <OpsCard>
    <OpsCardHeader title="Content Types para Livros" accentColor="text-muted-foreground" />
    <OpsCardContent>
      <OpsGrid columns={2}>
        {BOOK_CONTENT_TYPES.map((ct, i) => (
          <div
            key={i}
            className="p-4 rounded-lg bg-muted/20 border-l-4"
            style={{ borderColor: ct.ai_generated ? '#3B82F6' : '#64748B' }}
          >
            <div className="flex items-center gap-2 mb-2">
              <OpsCode className="text-xs font-bold" style={{ color: OPS_ACCENT }}>{ct.type}</OpsCode>
              {ct.ai_generated && (
                <Badge variant="outline" className="text-[9px] text-blue-400 border-blue-400/30">AI Generated</Badge>
              )}
            </div>
            <p className="text-xs text-muted-foreground mb-1">{ct.description}</p>
            <p className="text-[10px] font-mono text-muted-foreground/60">ex: {ct.example}</p>
          </div>
        ))}
      </OpsGrid>
    </OpsCardContent>
  </OpsCard>
);

// ============================================================================
// RPC Functions Card
// ============================================================================

const RPCFunctionsCard: React.FC = () => (
  <OpsCard>
    <OpsCardHeader title={BOOK_RPC_FUNCTIONS.title} accentColor="text-muted-foreground" />
    <OpsCardContent>
      <OpsText className="mb-4">{BOOK_RPC_FUNCTIONS.description}</OpsText>
      <div className="space-y-2">
        {BOOK_RPC_FUNCTIONS.functions.map((fn, i) => (
          <div key={i} className="p-3 rounded-lg bg-muted/10 flex items-start gap-4">
            <OpsCode className="text-xs font-mono flex-shrink-0" style={{ color: OPS_ACCENT }}>{fn.name}</OpsCode>
            <div className="flex-1">
              <p className="text-xs text-muted-foreground">{fn.description}</p>
              <p className="text-[10px] text-muted-foreground/60 mt-1">Returns: {fn.returns}</p>
            </div>
          </div>
        ))}
      </div>
    </OpsCardContent>
  </OpsCard>
);

// ============================================================================
// Views Card
// ============================================================================

const ViewsCard: React.FC = () => (
  <OpsCard>
    <OpsCardHeader title={BOOK_SUMMARY_VIEWS.title} accentColor="text-muted-foreground" />
    <OpsCardContent>
      <OpsText className="mb-4">{BOOK_SUMMARY_VIEWS.description}</OpsText>
      <OpsGrid columns={3}>
        {BOOK_SUMMARY_VIEWS.views.map((view, i) => (
          <div key={i} className="p-3 rounded-lg bg-muted/20">
            <OpsCode className="text-xs font-bold mb-2 block" style={{ color: OPS_ACCENT }}>{view.name}</OpsCode>
            <p className="text-[10px] text-muted-foreground mb-1">{view.purpose}</p>
            <p className="text-[10px] text-muted-foreground/60">Returns: {view.returns}</p>
            <p className="text-[10px] italic mt-1" style={{ color: OPS_ACCENT }}>Uso: {view.useCase}</p>
          </div>
        ))}
      </OpsGrid>
    </OpsCardContent>
  </OpsCard>
);

// ============================================================================
// ER Diagram Card
// ============================================================================

const ERDiagramCard: React.FC = () => (
  <OpsCard>
    <OpsCardHeader title="Schema - Relacionamentos ER" accentColor="text-muted-foreground" />
    <OpsCardContent>
      <MermaidDiagram chart={BOOK_SUMMARY_ER_DIAGRAM} id="book-summary-er" />
    </OpsCardContent>
  </OpsCard>
);

import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Icon } from '@/components/ui/icon';
import {
  OpsCard,
  OpsCardHeader,
  OpsCardContent,
  OpsCode,
} from '../../ops-ui';
import { PROPOSED_TABLES } from '../../data/tables';

export const ProposedTablesView: React.FC = () => {
  return (
    <OpsCard style={{ borderColor: 'rgba(168,85,247,0.3)' }}>
      <OpsCardHeader title="Tabelas Propostas - Schema Preview" accentColor="#c084fc" />
      <OpsCardContent>
        <div className="space-y-8">
          {PROPOSED_TABLES.map((table, i) => (
            <div
              key={i}
              className="p-6 rounded-xl border border-purple-500/20 bg-purple-500/5"
            >
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                <OpsCode className="text-base text-purple-400 bg-purple-500/10 px-2.5 py-1">
                  {table.name}
                </OpsCode>
                <Badge
                  variant="outline"
                  className={`px-2.5 py-0.5 border ${
                    table.priority === 'Alta'
                      ? 'bg-red-500/10 text-red-400 border-red-500/20'
                      : table.priority === 'Media'
                        ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                        : 'bg-gray-500/10 text-gray-400 border-gray-500/20'
                  }`}
                >
                  Prioridade {table.priority}
                </Badge>
              </div>

              <p className="text-sm md:text-base text-foreground mb-6 leading-relaxed max-w-4xl">
                {table.purpose}
              </p>

              <div className="mb-6 bg-background/50 p-4 rounded-lg border border-border/10">
                <h5 className="text-xs font-bold text-purple-400 uppercase mb-3 flex items-center gap-2">
                  <Icon name="check" size="size-3" className="text-purple-400" />
                  O que essa tabela habilita:
                </h5>
                <ul className="text-sm text-muted-foreground space-y-2 pl-1">
                  {table.enablesWhat.map((item, j) => (
                    <li key={j} className="flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-emerald-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h5 className="text-xs font-bold text-purple-400 uppercase mb-3">Schema:</h5>
                <div className="overflow-x-auto rounded-lg border border-purple-500/10">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-purple-500/20 bg-purple-500/5">
                        <th className="text-left py-3 px-4 text-purple-400 text-xs font-bold uppercase">Coluna</th>
                        <th className="text-left py-3 px-4 text-purple-400 text-xs font-bold uppercase">Tipo</th>
                        <th className="text-left py-3 px-4 text-purple-400 text-xs font-bold uppercase hidden md:table-cell">Descricao</th>
                      </tr>
                    </thead>
                    <tbody>
                      {table.schema.map((col, j) => (
                        <tr key={j} className="border-b border-purple-500/10 hover:bg-purple-500/5 transition-colors">
                          <td className="py-3 px-4">
                            <code className="text-foreground bg-muted/20 px-1.5 py-0.5 rounded text-xs">
                              {col.column}
                            </code>
                          </td>
                          <td className="py-3 px-4 text-muted-foreground text-xs font-mono">{col.type}</td>
                          <td className="py-3 px-4 text-muted-foreground text-xs hidden md:table-cell leading-relaxed">
                            {col.description}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ))}
        </div>
      </OpsCardContent>
    </OpsCard>
  );
};

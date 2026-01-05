import React from 'react';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { Card } from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';
import { technicalSpecs } from '../data';

export const TechnicalSpecsView: React.FC = () => {
  return (
    <section className="space-y-6">
      <h3 className="font-sans text-xl font-semibold">Especificações Técnicas</h3>
      <Card className="overflow-hidden rounded-xl border border-border bg-card">
        <Table>
          <TableBody>
            {technicalSpecs.map((spec, index) => (
              <TableRow
                key={spec.label}
                className={`hover:bg-transparent ${index === technicalSpecs.length - 1 ? 'border-0' : ''}`}
              >
                <TableCell className="w-1/3 border-r border-border bg-muted/20 font-medium text-muted-foreground">
                  {spec.label}
                </TableCell>
                <TableCell
                  className={`${spec.isStatus ? 'text-success flex items-center gap-2 font-semibold' : ''} ${spec.isItalic ? 'text-xs italic text-muted-foreground' : 'text-foreground'}`}
                >
                  {spec.isStatus && (
                    <span className="bg-success h-2 w-2 animate-pulse rounded-full"></span>
                  )}
                  {spec.icon ? (
                    <div className="flex items-center gap-2 text-foreground">
                      <Icon name={spec.icon} size="size-3" className="text-muted-foreground" />
                      {spec.value}
                    </div>
                  ) : (
                    spec.value
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </section>
  );
};

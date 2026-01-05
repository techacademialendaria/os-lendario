import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { CHECKLIST_ITEMS, QUICK_FORMULAS, IMPLEMENTATION_STEPS } from '../data';

export const ChecklistView: React.FC = () => {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Checklist de Validacao Cientifica</CardTitle>
          <CardDescription>Passe cada pagina por este crivo antes de publicar.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[150px]">Metodologia</TableHead>
                <TableHead>Criterio de Validacao</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {CHECKLIST_ITEMS.map((item) => (
                <TableRow key={item.methodology}>
                  <TableCell className="font-bold">{item.methodology}</TableCell>
                  <TableCell>{item.criterion}</TableCell>
                  <TableCell className="text-right">
                    <Icon name="check-circle" className="inline text-muted-foreground" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <Card className="border-dashed bg-muted/10">
          <CardHeader>
            <CardTitle className="text-base">Formulas Rapidas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 font-mono text-sm">
            {QUICK_FORMULAS.map((formula) => (
              <div key={formula.label} className="space-y-1">
                <span className="font-sans text-xs font-bold uppercase text-muted-foreground">
                  {formula.label}
                </span>
                <div className="rounded border bg-card p-2">{formula.formula}</div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-dashed bg-muted/10">
          <CardHeader>
            <CardTitle className="text-base">Ordem de Implementacao</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            {IMPLEMENTATION_STEPS.map((step) => (
              <div key={step.number} className="flex items-center gap-3">
                <span
                  className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                    step.isHighlighted
                      ? 'bg-primary/20 text-primary'
                      : 'bg-muted'
                  }`}
                >
                  {step.number}
                </span>
                {step.isHighlighted ? (
                  <>
                    <strong>{step.title}</strong> — {step.description}
                  </>
                ) : (
                  <>
                    {step.title} — {step.description}
                  </>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ChecklistView;

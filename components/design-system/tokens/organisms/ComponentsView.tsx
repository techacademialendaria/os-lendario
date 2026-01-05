import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../ui/table';
import { Button } from '../../../ui/button';
import { Badge } from '../../../ui/badge';
import { Separator } from '../../../ui/separator';
import { cn } from '../../../../lib/utils';
import type { DensityLevel } from '../types';

interface ComponentsViewProps {
  density: DensityLevel;
  setDensity: (d: DensityLevel) => void;
}

export const ComponentsView: React.FC<ComponentsViewProps> = ({ density, setDensity }) => {
  return (
    <div className="animate-fade-in space-y-8">
      {/* States Rule */}
      <Card>
        <CardHeader>
          <CardTitle>Estados Interativos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 text-center md:grid-cols-2 lg:grid-cols-4">
            <div className="cursor-pointer rounded border border-border bg-card p-4 transition-colors hover:bg-primary/90 hover:text-white">
              <p className="font-bold">Hover</p>
              <code className="text-xs">hover:bg-primary/90</code>
            </div>
            <div className="cursor-pointer rounded border border-border bg-card p-4 transition-colors active:bg-primary/80 active:text-white">
              <p className="font-bold">Active</p>
              <code className="text-xs">active:bg-primary/80</code>
            </div>
            <div className="cursor-not-allowed rounded border border-border bg-card p-4 opacity-50">
              <p className="font-bold">Disabled</p>
              <code className="text-xs">disabled:opacity-50</code>
            </div>
            <div
              className="rounded border border-border bg-card p-4 outline-none focus-visible:ring-2 focus-visible:ring-primary"
              tabIndex={0}
            >
              <p className="font-bold">Focus</p>
              <code className="text-xs">focus-visible:ring-2</code>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Shadcn Variants */}
      <Card>
        <CardHeader>
          <CardTitle>Mapeamento de Variantes (Shadcn)</CardTitle>
          <CardDescription>Button & Badge Presets</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Variant</TableHead>
                <TableHead>Tokens Usados</TableHead>
                <TableHead>Visual</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-bold">default</TableCell>
                <TableCell className="font-mono text-xs">bg-primary text-primary-foreground</TableCell>
                <TableCell><Button size="sm">Button</Button></TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-bold">secondary</TableCell>
                <TableCell className="font-mono text-xs">bg-secondary text-secondary-foreground</TableCell>
                <TableCell><Button size="sm" variant="secondary">Button</Button></TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-bold">destructive</TableCell>
                <TableCell className="font-mono text-xs">bg-destructive text-destructive-foreground</TableCell>
                <TableCell><Button size="sm" variant="destructive">Button</Button></TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-bold">outline</TableCell>
                <TableCell className="font-mono text-xs">border-input bg-background hover:bg-accent</TableCell>
                <TableCell><Button size="sm" variant="outline">Button</Button></TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-bold">ghost</TableCell>
                <TableCell className="font-mono text-xs">hover:bg-accent hover:text-accent-foreground</TableCell>
                <TableCell><Button size="sm" variant="ghost">Button</Button></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Density */}
      <Card>
        <CardHeader>
          <CardTitle>Densidade</CardTitle>
          <CardDescription>Adaptabilidade para diferentes contextos de uso.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6 flex gap-4">
            <Button
              variant={density === 'compact' ? 'default' : 'outline'}
              onClick={() => setDensity('compact')}
              size="sm"
            >
              Compact
            </Button>
            <Button
              variant={density === 'default' ? 'default' : 'outline'}
              onClick={() => setDensity('default')}
              size="sm"
            >
              Default
            </Button>
            <Button
              variant={density === 'comfortable' ? 'default' : 'outline'}
              onClick={() => setDensity('comfortable')}
              size="sm"
            >
              Comfortable
            </Button>
          </div>

          <div
            className={cn(
              'overflow-hidden rounded-lg border border-border transition-all',
              density === 'compact' && 'text-xs',
              density === 'default' && 'text-sm',
              density === 'comfortable' && 'text-base'
            )}
          >
            <div
              className={cn(
                'border-b border-border bg-muted font-bold',
                density === 'compact' && 'p-2',
                density === 'default' && 'p-4',
                density === 'comfortable' && 'p-6'
              )}
            >
              Header Exemplo ({density})
            </div>
            <div
              className={cn(
                'space-y-2',
                density === 'compact' && 'p-2',
                density === 'default' && 'p-4',
                density === 'comfortable' && 'p-6'
              )}
            >
              <div className="flex items-center justify-between">
                <span>Item 1</span>
                <Badge variant="outline">Ativo</Badge>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span>Item 2</span>
                <Badge variant="outline">Pendente</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

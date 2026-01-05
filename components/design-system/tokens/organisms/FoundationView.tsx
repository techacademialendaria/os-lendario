import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../ui/table';
import { cn } from '../../../../lib/utils';
import { colorPairs, shadowTokens } from '../data';

export const FoundationView: React.FC = () => {
  return (
    <div className="animate-fade-in space-y-8">
      {/* Colors */}
      <Card>
        <CardHeader>
          <CardTitle>Cores & Pareamento</CardTitle>
          <CardDescription>Sempre use o par Background + Foreground.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-hidden rounded-md border border-border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Background Token</TableHead>
                  <TableHead>Foreground Obrigatório</TableHead>
                  <TableHead className="text-right">Visualização</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {colorPairs.map((pair, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <code className="rounded bg-muted px-1">{pair.bg}</code>
                    </TableCell>
                    <TableCell>
                      <code className="rounded bg-muted px-1">{pair.text}</code>
                    </TableCell>
                    <TableCell className="text-right">
                      <div
                        className={cn(
                          'inline-flex items-center rounded border border-border/20 px-3 py-1 text-xs font-bold',
                          pair.bg,
                          pair.text
                        )}
                      >
                        {pair.label}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Shadows */}
        <Card>
          <CardHeader>
            <CardTitle>Shadow Tokens</CardTitle>
            <CardDescription>Profundidade adaptativa (Dark Mode safe).</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {shadowTokens.map((shadow, i) => (
              <div
                key={i}
                className={cn(
                  'flex items-center justify-between rounded-lg border border-border bg-card p-4',
                  shadow.token
                )}
              >
                <code className="text-xs font-bold">{shadow.token}</code>
                <span className="text-xs text-muted-foreground">{shadow.use}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Animations */}
        <Card>
          <CardHeader>
            <CardTitle>Animation Tokens</CardTitle>
            <CardDescription>Tempo e curvas de movimento.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { label: 'duration-fast', value: '150ms', duration: '1000ms' },
              { label: 'duration-normal', value: '200ms', duration: '1500ms' },
              { label: 'duration-slow', value: '300ms', duration: '2000ms' },
            ].map((anim, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between font-mono text-xs">
                  <span>{anim.label}</span> <span>{anim.value}</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded bg-muted">
                  <div
                    className="h-full w-full animate-[shimmer_1s_infinite] bg-primary"
                    style={{ animationDuration: anim.duration }}
                  ></div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Borders & Radius */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Radius</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 font-mono text-sm">
            <div className="flex items-center justify-between">
              <span className="font-bold text-primary">radius-md</span>
              <span>6px (Default)</span>
              <div className="h-8 w-8 rounded-md border border-primary"></div>
            </div>
            <div className="flex items-center justify-between">
              <span>radius-lg</span> <span>8px (Cards)</span>
              <div className="h-8 w-8 rounded-lg border border-border"></div>
            </div>
            <div className="flex items-center justify-between">
              <span>radius-xl</span> <span>12px (Modals)</span>
              <div className="h-8 w-8 rounded-xl border border-border"></div>
            </div>
            <div className="flex items-center justify-between">
              <span>radius-full</span> <span>9999px (Pills)</span>
              <div className="h-8 w-8 rounded-full border border-border"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../../ui/card';
import { Icon } from '../../../ui/icon';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../ui/table';
import { ToneSlider } from './ToneSlider';
import { toneRegisters, voiceDimensions, vocabularyEntries, metaphors } from '../data';

export const ExpressionView: React.FC = () => (
  <section className="space-y-8">
    <h3 className="flex items-center gap-2 border-b border-border pb-2 font-sans text-2xl font-semibold">
      <Icon name="quote-left" /> 4. Expressao & Vocabulario
    </h3>

    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      {/* Tones with Registers */}
      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Matriz de Tons (Registros)</CardTitle>
            <CardDescription>Adaptacao por contexto</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {toneRegisters.map((register, i) => (
              <div key={i}>
                <p className="mb-2 flex items-center gap-2 text-sm font-bold">
                  <Icon name={register.icon} size="size-3" /> {register.label}
                </p>
                <p className="border-l-2 border-primary pl-3 font-serif text-xs italic text-muted-foreground">
                  {register.quote}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="space-y-4 rounded-xl border border-border bg-card p-6">
          <h4 className="font-bold">Dimensoes de Voz</h4>
          {voiceDimensions.map((dim, i) => (
            <ToneSlider
              key={i}
              left={dim.left}
              right={dim.right}
              value={dim.value}
              description={dim.description}
            />
          ))}
        </div>
      </div>

      {/* Vocabulary Table & Metaphors */}
      <div className="space-y-8">
        <div className="overflow-hidden rounded-xl border border-border bg-card">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead>Termo (Proprietario)</TableHead>
                <TableHead className="text-right text-destructive">Nunca Usar</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vocabularyEntries.map((entry, i) => (
                <TableRow key={i}>
                  <TableCell className="font-bold text-primary">{entry.term}</TableCell>
                  <TableCell className="text-right text-muted-foreground line-through decoration-destructive">
                    {entry.neverUse}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <Card className="border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="text-base">Metaforas Recorrentes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 font-serif text-sm italic text-muted-foreground">
            {metaphors.map((metaphor, i) => (
              <p key={i}>* {metaphor}</p>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  </section>
);

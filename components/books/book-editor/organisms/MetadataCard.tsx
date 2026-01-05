import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { MetadataCardProps } from '../types';

export const MetadataCard: React.FC<MetadataCardProps> = ({ metadata, onUpdateMetadataField }) => {
  return (
    <Card className="border-border">
      <CardHeader className="border-b border-border/50 pb-3">
        <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
          Metadados Tecnicos
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-4 p-4">
        <div className="space-y-1.5">
          <Label className="text-[10px] font-bold uppercase text-muted-foreground">ISBN-13</Label>
          <Input
            value={metadata.isbn}
            onChange={(e) => onUpdateMetadataField('isbn', e.target.value)}
            className="h-8 font-mono text-xs"
          />
        </div>
        <div className="space-y-1.5">
          <Label className="text-[10px] font-bold uppercase text-muted-foreground">
            Ano Lancamento
          </Label>
          <Input
            value={metadata.year}
            onChange={(e) => onUpdateMetadataField('year', e.target.value)}
            className="h-8 font-mono text-xs"
          />
        </div>
        <div className="space-y-1.5">
          <Label className="text-[10px] font-bold uppercase text-muted-foreground">Paginas</Label>
          <Input
            type="number"
            value={metadata.pageCount}
            onChange={(e) => onUpdateMetadataField('pageCount', e.target.value)}
            className="h-8 font-mono text-xs"
          />
        </div>
        <div className="space-y-1.5">
          <Label className="text-[10px] font-bold uppercase text-muted-foreground">
            Tempo Leitura
          </Label>
          <div className="relative">
            <Input
              value={metadata.readingTime}
              onChange={(e) => onUpdateMetadataField('readingTime', e.target.value)}
              className="h-8 pr-8 font-mono text-xs"
            />
            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[9px] text-muted-foreground">
              min
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

import React from 'react';
import { Icon } from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileUpload } from '@/components/ui/file-upload';
import type { CoverUploadCardProps } from '../types';

export const CoverUploadCard: React.FC<CoverUploadCardProps> = ({ coverUrl, onCoverUpload }) => {
  return (
    <Card className="border-border">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-muted-foreground">
          <Icon name="picture" size="size-4" /> Capa do Livro (2:3)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="group relative mx-auto flex aspect-[2/3] w-full max-w-[200px] items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-border bg-muted">
            {coverUrl ? (
              <>
                <img
                  src={coverUrl}
                  className="h-full w-full object-cover transition-all group-hover:blur-sm"
                  alt="Capa"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                  <Button size="sm" variant="secondary" className="font-bold">
                    Alterar
                  </Button>
                </div>
              </>
            ) : (
              <div className="p-4 text-center">
                <Icon name="cloud-upload" size="size-8" className="mx-auto mb-2 text-muted-foreground" />
                <p className="text-[10px] font-bold text-muted-foreground">400x600px recomendado</p>
              </div>
            )}
          </div>
          <FileUpload className="h-10 min-h-0" accept="image/*" onFileSelect={onCoverUpload} />
        </div>
      </CardContent>
    </Card>
  );
};

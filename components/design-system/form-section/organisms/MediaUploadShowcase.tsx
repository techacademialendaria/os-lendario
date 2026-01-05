/**
 * MediaUploadShowcase - File upload demo
 */

import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { FileUpload } from '@/components/ui/file-upload';

export const MediaUploadShowcase: React.FC = () => {
  return (
    <section className="space-y-8">
      <h3 className="border-b border-border pb-2 font-sans text-xl font-semibold">
        Upload de Midia
      </h3>
      <Card>
        <CardHeader>
          <CardTitle>Anexar Documentos</CardTitle>
          <CardDescription>
            Faca upload de comprovantes ou imagens para o sistema.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label>Imagem de Capa</Label>
            <FileUpload accept="image/*" />
          </div>

          <div className="grid gap-2">
            <Label>Descricao do Arquivo</Label>
            <Textarea placeholder="Adicione notas sobre este anexo..." />
          </div>
        </CardContent>
        <CardFooter className="justify-end gap-2">
          <Button variant="ghost">Cancelar</Button>
          <Button>Enviar Arquivos</Button>
        </CardFooter>
      </Card>
    </section>
  );
};

// Design Tab Component
// Tab content for Design & UX configuration

import React from 'react';
import { Icon } from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AutosizeTextarea } from '@/components/ui/autosize-textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileUpload } from '@/components/ui/file-upload';
import { DesignState } from '../types';

interface DesignTabProps {
  design: DesignState;
  onFieldChange: (field: keyof DesignState, value: string) => void;
  onNext: () => void;
}

export const DesignTab: React.FC<DesignTabProps> = ({
  design,
  onFieldChange,
  onNext,
}) => (
  <div className="space-y-4">
    <h3 className="text-xl font-bold">Identidade Visual & Fluxo</h3>
    <p className="font-serif text-muted-foreground">
      A IA tende a criar designs genericos. Use esta secao para definir a
      personalidade visual do seu produto.
    </p>

    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Referencias Visuais</CardTitle>
          <p className="text-sm text-muted-foreground">
            Faca upload de prints de apps que voce gosta.
          </p>
        </CardHeader>
        <CardContent>
          <FileUpload className="h-32" />
        </CardContent>
      </Card>

      <div className="space-y-2">
        <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
          Perguntas Guiadas
        </h4>
        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">
              Quantas telas principais voce imagina?
            </label>
            <Input
              placeholder="Ex: Dashboard, Lista de Clientes, Perfil..."
              value={design.screens}
              onChange={(e) => onFieldChange('screens', e.target.value)}
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">
              Qual a "vibe" do design?
            </label>
            <AutosizeTextarea
              placeholder="Ex: Minimalista, Clean, Dark Mode, Corporativo, Colorido..."
              value={design.vibe}
              onChange={(e) => onFieldChange('vibe', e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>

    <div className="flex justify-end pt-4">
      <Button onClick={onNext}>
        Proximo: Funcionalidades <Icon name="arrow-right" className="ml-2" />
      </Button>
    </div>
  </div>
);

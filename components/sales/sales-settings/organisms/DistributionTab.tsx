import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';
import { Select } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';

export const DistributionTab: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Regras de Distribuicao</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 divide-y divide-border">
        {/* ActiveCampaign */}
        <div className="flex items-start justify-between pt-6 first:pt-0">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Icon name="envelope" className="text-primary" />
              <h4 className="text-sm font-bold">ActiveCampaign</h4>
            </div>
            <p className="max-w-md text-xs text-muted-foreground">
              Atualiza campos personalizados do contato e adiciona tags baseadas no status
              da call.
            </p>
            <div className="mt-2 inline-block rounded border border-border bg-muted/30 p-2 font-mono text-xs">
              Campos: ai_score, ai_summary, last_call_sentiment
            </div>
          </div>
          <Switch defaultChecked />
        </div>

        {/* ClickUp */}
        <div className="flex items-start justify-between pt-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Icon name="check-square" className="text-brand-blue" />
              <h4 className="text-sm font-bold">ClickUp</h4>
            </div>
            <p className="max-w-md text-xs text-muted-foreground">
              Cria tarefas automaticas para o time de marketing quando "Objecao de Conteudo"
              e detectada.
            </p>
            <div className="flex items-center gap-2">
              <span className="text-xs">Lista de Destino:</span>
              <Select
                className="h-7 w-[180px] text-xs"
                options={[{ label: 'Marketing / Conteudo', value: 'mkt' }]}
                value="mkt"
              />
            </div>
          </div>
          <Switch defaultChecked />
        </div>

        {/* Notion */}
        <div className="flex items-start justify-between pt-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Icon name="document" className="text-foreground" />
              <h4 className="text-sm font-bold">Notion</h4>
            </div>
            <p className="max-w-md text-xs text-muted-foreground">
              Salva o resumo e transcricao em uma base de conhecimento.
            </p>
            <div className="flex items-center gap-2">
              <span className="text-xs">Database:</span>
              <Select
                className="h-7 w-[180px] text-xs"
                options={[{ label: 'Sales Calls Knowledge', value: 'db' }]}
                value="db"
              />
            </div>
          </div>
          <Switch />
        </div>
      </CardContent>
    </Card>
  );
};

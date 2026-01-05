import React from 'react';
import { Select } from '../../../ui/select';
import { Button } from '../../../ui/button';
import { Icon } from '../../../ui/icon';
import { ExportButton } from '../../groups/ExportButton';
import { ChatTriggerButton } from '../../groups/chat';
import type { DashboardHeaderProps } from '../types';

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  groupName,
  dataSelecionada,
  datas,
  registros,
  onDataSelect,
  onBack,
  onChatOpen,
}) => {
  const dateOptions = [
    { label: 'Últimos registros', value: '__todas__' },
    ...datas.map((d) => ({ label: d, value: d })),
  ];

  return (
    <header className="space-y-4">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold text-primary flex items-center gap-3">
          <Icon name="trophy" className="text-primary" /> {groupName}
        </h1>
        <p className="text-muted-foreground text-sm font-serif">
          Monitoramento de saúde e engajamento da comunidade.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between bg-card p-2 rounded-xl border border-border">
        <div className="flex gap-2 w-full sm:w-auto">
          <Select
            placeholder="Data específica"
            value={dataSelecionada || '__todas__'}
            onValueChange={onDataSelect}
            options={dateOptions}
            className="w-full sm:w-48 bg-muted/20 border-border"
          />
          <Button variant="outline" className="gap-2 bg-muted/20 border-border" onClick={onBack}>
            <Icon name="arrow-left" size="size-4" /> Voltar
          </Button>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <ExportButton
            registros={registros}
            options={{ grupo: groupName, dataSelecionada }}
          />
          <ChatTriggerButton onClick={onChatOpen} />
        </div>
      </div>
    </header>
  );
};

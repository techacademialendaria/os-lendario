import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '../../../ui/dialog';
import { Button } from '../../../ui/button';
import { Icon } from '../../../ui/icon';
import { Select } from '../../../ui/select';
import { UserAvatar } from '../atoms/UserAvatar';
import type { UserManagementView, Mind, SelectOption } from '../types';

interface LinkMindDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedUser: UserManagementView | null;
  selectedMindId: string;
  onMindChange: (mindId: string) => void;
  minds: Mind[];
  saving: boolean;
  error: string | null;
  onSave: () => void;
  onCancel: () => void;
}

export const LinkMindDialog: React.FC<LinkMindDialogProps> = ({
  isOpen,
  onOpenChange,
  selectedUser,
  selectedMindId,
  onMindChange,
  minds,
  saving,
  error,
  onSave,
  onCancel,
}) => {
  const mindOptions: SelectOption[] = [
    { label: 'Nenhum (remover vínculo)', value: '' },
    ...minds.map((mind) => ({
      label: `${mind.name} (@${mind.slug})${mind.privacy_level === 'private' ? ' [privado]' : ''}`,
      value: mind.id,
    })),
  ];

  const selectedMind = minds.find((m) => m.id === selectedMindId);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Icon name="link" className="size-5 text-primary" />
            Vincular Mind ao Usuário
          </DialogTitle>
          <DialogDescription>
            {selectedUser && (
              <span>
                Selecione um Mind para vincular a{' '}
                <strong>{selectedUser.full_name || selectedUser.email}</strong>
              </span>
            )}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {error && (
            <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
              {error}
            </div>
          )}

          {selectedUser && (
            <div className="rounded-lg bg-muted/50 p-4">
              <div className="flex items-center gap-3">
                <UserAvatar
                  src={selectedUser.avatar_url}
                  name={selectedUser.full_name}
                  size="lg"
                />
                <div>
                  <p className="font-medium">{selectedUser.full_name || 'Sem nome'}</p>
                  <p className="text-sm text-muted-foreground">{selectedUser.email}</p>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-medium">Selecionar Mind</label>
            <Select
              placeholder="Escolha um Mind..."
              value={selectedMindId}
              onValueChange={onMindChange}
              options={mindOptions}
            />
            {selectedMindId && selectedMind && (
              <p className="text-xs text-muted-foreground">
                Mind selecionado: <strong>{selectedMind.name}</strong>
              </p>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onCancel} disabled={saving}>
            Cancelar
          </Button>
          <Button onClick={onSave} disabled={saving}>
            {saving ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Salvando...
              </>
            ) : (
              <>
                <Icon name="check" className="mr-2 size-4" />
                Salvar
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

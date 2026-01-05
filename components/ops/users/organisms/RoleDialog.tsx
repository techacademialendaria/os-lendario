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
import { RoleBadge } from '../molecules/RoleBadge';
import type { UserManagementView, Role, RoleId, AreaType, SelectOption } from '../types';
import { AREA_CONFIG, ALL_AREAS } from '../types';

interface RoleDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedUser: UserManagementView | null;
  selectedRoleId: RoleId | null;
  onRoleChange: (roleId: RoleId | null) => void;
  selectedAreas: AreaType[];
  onToggleArea: (area: AreaType) => void;
  roles: Role[];
  saving: boolean;
  error: string | null;
  onSave: () => void;
  onCancel: () => void;
}

export const RoleDialog: React.FC<RoleDialogProps> = ({
  isOpen,
  onOpenChange,
  selectedUser,
  selectedRoleId,
  onRoleChange,
  selectedAreas,
  onToggleArea,
  roles,
  saving,
  error,
  onSave,
  onCancel,
}) => {
  const roleOptions: SelectOption[] = [
    { label: 'Sem role (remover)', value: '' },
    ...roles.map((role) => ({
      label: `${role.display_name} (Nível ${role.hierarchy_level})`,
      value: role.id,
    })),
  ];

  const showAreasSelection = selectedRoleId === 'collaborator';

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Icon name="shield" className="size-5 text-primary" />
            Gerenciar Role do Usuário
          </DialogTitle>
          <DialogDescription>
            {selectedUser && (
              <span>
                Configure o role e áreas de acesso para{' '}
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
                <div className="flex-1">
                  <p className="font-medium">{selectedUser.full_name || 'Sem nome'}</p>
                  <p className="text-sm text-muted-foreground">{selectedUser.email}</p>
                </div>
                <RoleBadge roleId={selectedUser.role_id} />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-medium">Role</label>
            <Select
              placeholder="Selecione um role..."
              value={selectedRoleId || ''}
              onValueChange={(value) => onRoleChange((value || null) as RoleId | null)}
              options={roleOptions}
            />
            <p className="text-xs text-muted-foreground">
              {selectedRoleId === 'owner' && 'Acesso total ao sistema, incluindo áreas administrativas críticas.'}
              {selectedRoleId === 'admin' && 'Acesso amplo, sem poder deletar dados críticos ou gerenciar owners.'}
              {selectedRoleId === 'collaborator' && 'Acesso por áreas específicas. Configure as áreas abaixo.'}
              {selectedRoleId === 'student' && 'Acesso a área de consumo: books, LMS.'}
              {selectedRoleId === 'free_user' && 'Acesso limitado a conteúdo público.'}
              {!selectedRoleId && 'Selecione um role para definir as permissões do usuário.'}
            </p>
          </div>

          {showAreasSelection && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Áreas de Acesso</label>
              <div className="grid grid-cols-2 gap-2">
                {ALL_AREAS.map((area) => {
                  const config = AREA_CONFIG[area];
                  const isSelected = selectedAreas.includes(area);
                  return (
                    <button
                      key={area}
                      type="button"
                      onClick={() => onToggleArea(area)}
                      className={`flex items-center gap-2 rounded-lg border p-3 text-left text-sm transition-colors ${
                        isSelected
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <div
                        className={`flex size-5 items-center justify-center rounded border ${
                          isSelected
                            ? 'border-primary bg-primary text-primary-foreground'
                            : 'border-muted-foreground/30'
                        }`}
                      >
                        {isSelected && <Icon name="check" className="size-3" />}
                      </div>
                      <span className={isSelected ? 'font-medium' : ''}>{config.label}</span>
                    </button>
                  );
                })}
              </div>
              <p className="text-xs text-muted-foreground">
                Selecione as áreas que o colaborador terá acesso.
              </p>
            </div>
          )}

          {selectedRoleId && selectedRoleId !== 'collaborator' && (
            <div className="rounded-lg bg-blue-500/10 p-4">
              <div className="flex gap-3">
                <Icon name="info-circle" className="mt-0.5 size-5 shrink-0 text-blue-500" />
                <div className="text-sm text-blue-700 dark:text-blue-300">
                  {(selectedRoleId === 'owner' || selectedRoleId === 'admin') && (
                    <p>Este role tem acesso a todas as áreas automaticamente.</p>
                  )}
                  {(selectedRoleId === 'student' || selectedRoleId === 'free_user') && (
                    <p>Este role não utiliza o sistema de áreas.</p>
                  )}
                </div>
              </div>
            </div>
          )}
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

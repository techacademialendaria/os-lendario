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
import type {
  UserManagementView,
  Role,
  RoleId,
  AreaType,
  Mind,
  SelectOption,
} from '../types';
import { AREA_CONFIG, ALL_AREAS } from '../types';

interface EditUserDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  user: UserManagementView | null;
  // Role
  selectedRoleId: RoleId | null;
  onRoleChange: (roleId: RoleId | null) => void;
  selectedAreas: AreaType[];
  onToggleArea: (area: AreaType) => void;
  // Mind
  selectedMindId: string | null;
  onMindChange: (mindId: string | null) => void;
  // Options
  roles: Role[];
  minds: Mind[];
  // State
  saving: boolean;
  error: string | null;
  onSave: () => void;
  onCancel: () => void;
}

export const EditUserDialog: React.FC<EditUserDialogProps> = ({
  isOpen,
  onOpenChange,
  user,
  selectedRoleId,
  onRoleChange,
  selectedAreas,
  onToggleArea,
  selectedMindId,
  onMindChange,
  roles,
  minds,
  saving,
  error,
  onSave,
  onCancel,
}) => {
  const roleOptions: SelectOption[] = [
    { label: 'Sem role', value: '' },
    ...roles.map((role) => ({
      label: `${role.display_name} (Nível ${role.hierarchy_level})`,
      value: role.id,
    })),
  ];

  const mindOptions: SelectOption[] = [
    { label: 'Nenhuma mind vinculada', value: '' },
    ...minds.map((mind) => ({
      label: `${mind.name} (@${mind.slug})`,
      value: mind.id,
    })),
  ];

  const showAreasSelection = selectedRoleId === 'collaborator';

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Icon name="pencil" className="size-5 text-primary" />
            Editar Usuário
          </DialogTitle>
          <DialogDescription>
            Atualize as informações do usuário
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 py-4">
          {error && (
            <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
              {error}
            </div>
          )}

          {/* User Preview */}
          {user && (
            <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
              <UserAvatar
                src={user.mind_avatar_url || user.avatar_url}
                name={user.mind_name || user.full_name}
                size="lg"
              />
              <div className="flex-1">
                <p className="font-medium">{user.full_name || user.email}</p>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
              <RoleBadge roleId={user.role_id} />
            </div>
          )}

          {/* Role Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Role</label>
            <Select
              placeholder="Selecione um role..."
              value={selectedRoleId || ''}
              onValueChange={(value) => onRoleChange((value || null) as RoleId | null)}
              options={roleOptions}
            />
            <p className="text-xs text-muted-foreground">
              {selectedRoleId === 'owner' &&
                'Acesso total ao sistema, incluindo áreas administrativas críticas.'}
              {selectedRoleId === 'admin' &&
                'Acesso amplo, sem poder deletar dados críticos ou gerenciar owners.'}
              {selectedRoleId === 'collaborator' &&
                'Acesso por áreas específicas. Configure as áreas abaixo.'}
              {selectedRoleId === 'student' && 'Acesso a área de consumo: books, LMS.'}
              {selectedRoleId === 'free_user' && 'Acesso limitado a conteúdo público.'}
              {!selectedRoleId && 'Selecione um role para definir as permissões.'}
            </p>
          </div>

          {/* Areas Selection - Only for collaborator */}
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
            </div>
          )}

          {/* Mind Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Mind Vinculada</label>
            <Select
              placeholder="Selecione uma mind..."
              value={selectedMindId || ''}
              onValueChange={(value) => onMindChange(value || null)}
              options={mindOptions}
            />
            <p className="text-xs text-muted-foreground">
              Vincule este usuário a uma mind para personalização de conteúdo
            </p>
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
                Salvar Alterações
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

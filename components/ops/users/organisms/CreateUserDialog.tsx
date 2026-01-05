import React, { useState } from 'react';
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
import { Input } from '../../../ui/input';
import { Select } from '../../../ui/select';
import { Textarea } from '../../../ui/textarea';
import type { Mind, MindOption, SelectOption, RoleId, AreaType, Role } from '../types';
import { ROLE_CONFIG, AREA_CONFIG, ALL_AREAS } from '../types';

interface CreateUserDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  // Basic info
  email: string;
  onEmailChange: (email: string) => void;
  name: string;
  onNameChange: (name: string) => void;
  // Mind options
  mindOption: MindOption;
  onMindOptionChange: (option: MindOption) => void;
  selectedMindId: string;
  onMindIdChange: (id: string) => void;
  minds: Mind[];
  // RBAC
  selectedRoleId: RoleId;
  onRoleChange: (role: RoleId) => void;
  selectedAreas: AreaType[];
  onToggleArea: (area: AreaType) => void;
  roles: Role[];
  // Message
  message: string;
  onMessageChange: (message: string) => void;
  // State
  saving: boolean;
  error: string | null;
  inviteUrl: string | null;
  // Actions
  onSave: () => void;
  onCancel: () => void;
  onCopyUrl: () => void;
}

const mindBehaviorOptions: SelectOption[] = [
  { label: 'Criar Mind automaticamente', value: 'create_new' },
  { label: 'Vincular a Mind existente', value: 'link_existing' },
  { label: 'Sem Mind (vincular depois)', value: 'none' },
];

export const CreateUserDialog: React.FC<CreateUserDialogProps> = ({
  isOpen,
  onOpenChange,
  email,
  onEmailChange,
  name,
  onNameChange,
  mindOption,
  onMindOptionChange,
  selectedMindId,
  onMindIdChange,
  minds,
  selectedRoleId,
  onRoleChange,
  selectedAreas,
  onToggleArea,
  roles,
  message,
  onMessageChange,
  saving,
  error,
  inviteUrl,
  onSave,
  onCancel,
  onCopyUrl,
}) => {
  const [copied, setCopied] = useState(false);

  const mindOptions: SelectOption[] = minds.map((mind) => ({
    label: `${mind.name} (@${mind.slug})${mind.privacy_level === 'private' ? ' [privado]' : ''}`,
    value: mind.id,
  }));

  // Filter roles that current user can assign (based on hierarchy)
  // For now, show all except owner (only owner can assign owner via direct DB)
  const assignableRoles = roles.filter((r) => r.id !== 'owner');
  const roleOptions: SelectOption[] = assignableRoles.map((role) => ({
    label: role.display_name,
    value: role.id,
  }));

  const handleCopy = () => {
    onCopyUrl();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Success state - show invite URL
  if (inviteUrl) {
    return (
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Icon name="check-circle" className="size-5 text-green-500" />
              Convite Criado!
            </DialogTitle>
            <DialogDescription>
              Copie o link abaixo e envie para {email}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="rounded-lg border border-green-500/30 bg-green-500/5 p-4">
              <label className="mb-2 block text-xs font-medium text-muted-foreground">
                Link do Convite
              </label>
              <div className="flex gap-2">
                <Input
                  value={inviteUrl}
                  readOnly
                  className="font-mono text-xs"
                />
                <Button onClick={handleCopy} variant="outline" size="sm">
                  {copied ? (
                    <Icon name="check" className="size-4 text-green-500" />
                  ) : (
                    <Icon name="clipboard" className="size-4" />
                  )}
                </Button>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                O link expira em 7 dias
              </p>
            </div>

            <div className="rounded-lg bg-blue-500/10 p-4">
              <div className="flex gap-3">
                <Icon name="info-circle" className="mt-0.5 size-5 shrink-0 text-blue-500" />
                <div className="text-sm text-blue-700 dark:text-blue-300">
                  <p className="font-medium">Próximos passos:</p>
                  <ol className="mt-1 list-inside list-decimal space-y-1 text-blue-600 dark:text-blue-400">
                    <li>Envie o link para o usuário (email, slack, etc)</li>
                    <li>O usuário acessa o link e cria a senha</li>
                    <li>Após confirmação do email, o acesso é liberado</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button onClick={onCancel}>
              Fechar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Icon name="user-add" className="size-5 text-primary" />
            Convidar Novo Usuário
          </DialogTitle>
          <DialogDescription>
            Defina o nível de acesso e envie um convite por email.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {error && (
            <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
              {error}
            </div>
          )}

          {/* Basic Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Email <span className="text-destructive">*</span>
              </label>
              <Input
                type="email"
                placeholder="usuario@exemplo.com"
                value={email}
                onChange={(e) => onEmailChange(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Nome <span className="text-destructive">*</span>
              </label>
              <Input
                placeholder="João da Silva"
                value={name}
                onChange={(e) => onNameChange(e.target.value)}
              />
            </div>
          </div>

          {/* Role Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Nível de Acesso <span className="text-destructive">*</span>
            </label>
            <Select
              placeholder="Selecione o nível..."
              value={selectedRoleId}
              onValueChange={(value) => onRoleChange(value as RoleId)}
              options={roleOptions}
            />
            <p className="text-xs text-muted-foreground">
              {selectedRoleId === 'admin' && (
                <>Administrador: Acesso amplo ao sistema, pode gerenciar usuários e conteúdo.</>
              )}
              {selectedRoleId === 'collaborator' && (
                <>Colaborador: Acesso às áreas específicas selecionadas abaixo.</>
              )}
              {selectedRoleId === 'student' && (
                <>Aluno: Acesso à biblioteca de livros e futuramente ao LMS.</>
              )}
              {selectedRoleId === 'free_user' && (
                <>Usuário Free: Acesso limitado a conteúdo público.</>
              )}
            </p>
          </div>

          {/* Areas (only for collaborator) */}
          {selectedRoleId === 'collaborator' && (
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Áreas de Acesso <span className="text-destructive">*</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {ALL_AREAS.map((area) => {
                  const config = AREA_CONFIG[area];
                  const isSelected = selectedAreas.includes(area);
                  return (
                    <button
                      key={area}
                      type="button"
                      onClick={() => onToggleArea(area)}
                      className={`
                        rounded-full px-3 py-1 text-xs font-medium transition-all
                        ${isSelected
                          ? config.color + ' ring-2 ring-current ring-offset-2 ring-offset-background'
                          : 'bg-muted/50 text-muted-foreground hover:bg-muted'
                        }
                      `}
                    >
                      {config.label}
                    </button>
                  );
                })}
              </div>
              <p className="text-xs text-muted-foreground">
                Selecione as áreas que o colaborador terá acesso
              </p>
            </div>
          )}

          {/* Mind Association */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Associação com Mind</label>
            <Select
              placeholder="Selecione..."
              value={mindOption}
              onValueChange={(value) => onMindOptionChange(value as MindOption)}
              options={mindBehaviorOptions}
            />
            <p className="text-xs text-muted-foreground">
              {mindOption === 'create_new' && (
                <>Um Mind privado será criado automaticamente com o nome do usuário.</>
              )}
              {mindOption === 'link_existing' && (
                <>O usuário será vinculado a um Mind existente.</>
              )}
              {mindOption === 'none' && (
                <>O usuário não terá Mind. Você poderá vincular depois.</>
              )}
            </p>
          </div>

          {mindOption === 'link_existing' && (
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Selecionar Mind <span className="text-destructive">*</span>
              </label>
              <Select
                placeholder="Escolha um Mind..."
                value={selectedMindId}
                onValueChange={onMindIdChange}
                options={mindOptions}
              />
            </div>
          )}

          {/* Optional Message */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Mensagem (opcional)</label>
            <Textarea
              placeholder="Bem-vindo à equipe! Estamos felizes em tê-lo conosco..."
              value={message}
              onChange={(e) => onMessageChange(e.target.value)}
              rows={2}
            />
            <p className="text-xs text-muted-foreground">
              Mensagem personalizada que aparecerá na tela de cadastro
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
                Criando...
              </>
            ) : (
              <>
                <Icon name="paper-plane" className="mr-2 size-4" />
                Criar Convite
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

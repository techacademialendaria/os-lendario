import React, { useState, useMemo } from 'react';
import { Section } from '../../../types';
import OpsTopbar from '../OpsTopbar';

// Hooks
import {
  useUsersData,
  useLinkMindDialog,
  useCreateUserDialog,
  useRoleDialog,
} from './hooks';

// Molecules
import { SearchInput, AlertMessage } from './molecules';

// Organisms
import {
  UsersPageHeader,
  UsersStatsGrid,
  UsersTable,
  LinkMindDialog,
  CreateUserDialog,
  RoleDialog,
  PendingInvitesSection,
} from './organisms';

interface OpsUsersTemplateProps {
  setSection: (s: Section) => void;
}

const OpsUsersTemplate: React.FC<OpsUsersTemplateProps> = ({ setSection }) => {
  // Data
  const { users, minds, roles, loading, refetch } = useUsersData();

  // Search
  const [searchTerm, setSearchTerm] = useState('');

  // Success message
  const [success, setSuccess] = useState<string | null>(null);

  // Link Dialog
  const linkDialog = useLinkMindDialog(() => {
    refetch();
    setSuccess('Vínculo atualizado com sucesso!');
  });

  // Create Dialog
  const createDialog = useCreateUserDialog(() => {
    refetch();
  });

  // Role Dialog
  const roleDialog = useRoleDialog(() => {
    refetch();
    setSuccess('Role atualizado com sucesso!');
  });

  // Filtered users
  const filteredUsers = useMemo(() => {
    const search = searchTerm.toLowerCase();
    return users.filter(
      (user) =>
        user.email?.toLowerCase().includes(search) ||
        user.full_name?.toLowerCase().includes(search) ||
        user.mind_name?.toLowerCase().includes(search) ||
        user.role_display_name?.toLowerCase().includes(search)
    );
  }, [users, searchTerm]);

  // Stats
  const stats = useMemo(() => {
    const total = users.length;
    const linked = users.filter((u) => u.mind_id).length;
    const withRole = users.filter((u) => u.role_id).length;
    return {
      total,
      linked,
      unlinked: total - linked,
      withRole,
    };
  }, [users]);

  // Handlers
  const handleCreateUser = async () => {
    const successMessage = await createDialog.save(minds);
    if (successMessage) {
      setSuccess(successMessage);
    }
  };

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-background font-sans">
      {/* Top Bar */}
      <div className="z-10 flex-none border-b border-border/40 bg-background/80 backdrop-blur-md">
        <OpsTopbar currentSection={Section.STUDIO_OPS_USERS} setSection={setSection} />
      </div>

      <div className="flex flex-1 overflow-hidden">
        <main className="flex-1 overflow-y-auto bg-background/50">
          <div className="mx-auto max-w-[1400px] animate-fade-in space-y-6 p-6 md:p-10">
            {/* Header */}
            <UsersPageHeader
              onRefresh={refetch}
              onCreateUser={createDialog.open}
            />

            {/* Success/Error Messages */}
            {success && (
              <AlertMessage
                variant="success"
                message={success}
                onDismiss={() => setSuccess(null)}
              />
            )}

            {/* Pending Invites Section */}
            <PendingInvitesSection onRefresh={refetch} />

            {/* Stats */}
            <UsersStatsGrid
              totalUsers={stats.total}
              linkedUsers={stats.linked}
              unlinkedUsers={stats.unlinked}
            />

            {/* Search */}
            <div className="flex items-center gap-4">
              <SearchInput
                value={searchTerm}
                onChange={setSearchTerm}
                placeholder="Buscar por email, nome, mind ou role..."
              />
            </div>

            {/* Users Table */}
            <UsersTable
              users={filteredUsers}
              loading={loading}
              searchTerm={searchTerm}
              onLinkClick={linkDialog.open}
              onRoleClick={roleDialog.open}
              onCreateUser={createDialog.open}
            />
          </div>
        </main>
      </div>

      {/* Link Mind Dialog */}
      <LinkMindDialog
        isOpen={linkDialog.isOpen}
        onOpenChange={(open) => !open && linkDialog.close()}
        selectedUser={linkDialog.selectedUser}
        selectedMindId={linkDialog.selectedMindId}
        onMindChange={linkDialog.setSelectedMindId}
        minds={minds}
        saving={linkDialog.saving}
        error={linkDialog.error}
        onSave={linkDialog.save}
        onCancel={linkDialog.close}
      />

      {/* Create User Dialog */}
      <CreateUserDialog
        isOpen={createDialog.isOpen}
        onOpenChange={(open) => !open && createDialog.close()}
        // Basic info
        email={createDialog.email}
        onEmailChange={createDialog.setEmail}
        name={createDialog.name}
        onNameChange={createDialog.setName}
        // Mind options
        mindOption={createDialog.mindOption}
        onMindOptionChange={createDialog.setMindOption}
        selectedMindId={createDialog.selectedMindId}
        onMindIdChange={createDialog.setSelectedMindId}
        minds={minds}
        // RBAC
        selectedRoleId={createDialog.selectedRoleId}
        onRoleChange={createDialog.setSelectedRoleId}
        selectedAreas={createDialog.selectedAreas}
        onToggleArea={createDialog.toggleArea}
        roles={roles}
        // Message
        message={createDialog.message}
        onMessageChange={createDialog.setMessage}
        // State
        saving={createDialog.saving}
        error={createDialog.error}
        inviteUrl={createDialog.inviteUrl}
        // Actions
        onSave={handleCreateUser}
        onCancel={createDialog.close}
        onCopyUrl={createDialog.copyInviteUrl}
      />

      {/* Role Dialog */}
      <RoleDialog
        isOpen={roleDialog.isOpen}
        onOpenChange={(open) => !open && roleDialog.close()}
        selectedUser={roleDialog.selectedUser}
        selectedRoleId={roleDialog.selectedRoleId}
        onRoleChange={roleDialog.setSelectedRoleId}
        selectedAreas={roleDialog.selectedAreas}
        onToggleArea={roleDialog.toggleArea}
        roles={roles}
        saving={roleDialog.saving}
        error={roleDialog.error}
        onSave={roleDialog.save}
        onCancel={roleDialog.close}
      />
    </div>
  );
};

export default OpsUsersTemplate;

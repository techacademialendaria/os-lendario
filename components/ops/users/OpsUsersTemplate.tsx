import React, { useState, useMemo, useCallback } from 'react';
import { Section } from '../../../types';
import OpsTopbar from '../OpsTopbar';

// Hooks
import { useUsersData, useCreateUserDialog, useEditUserDialog } from './hooks';

// Molecules
import { SearchInput, AlertMessage } from './molecules';

// Organisms
import {
  UsersPageHeader,
  UsersStatsGrid,
  UsersTable,
  CreateUserDialog,
  EditUserDialog,
  PendingInvitesSection,
} from './organisms';

// Types
import type { UserSortKey, SortOrder } from './types';

interface OpsUsersTemplateProps {
  setSection: (s: Section) => void;
}

const OpsUsersTemplate: React.FC<OpsUsersTemplateProps> = ({ setSection }) => {
  // Data
  const { users, minds, roles, loading, refetch } = useUsersData();

  // Search
  const [searchTerm, setSearchTerm] = useState('');

  // Sorting
  const [sortBy, setSortBy] = useState<UserSortKey>('user');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  // Success message
  const [success, setSuccess] = useState<string | null>(null);

  // Create Dialog
  const createDialog = useCreateUserDialog(() => {
    refetch();
  });

  // Edit Dialog
  const editDialog = useEditUserDialog(() => {
    refetch();
    setSuccess('Usuário atualizado com sucesso!');
  });

  // Sort handler
  const handleSort = useCallback(
    (key: UserSortKey) => {
      if (sortBy === key) {
        setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
      } else {
        setSortBy(key);
        setSortOrder('asc');
      }
    },
    [sortBy]
  );

  // Filtered and sorted users
  const filteredUsers = useMemo(() => {
    const search = searchTerm.toLowerCase();

    // Filter
    const filtered = users.filter(
      (user) =>
        user.email?.toLowerCase().includes(search) ||
        user.full_name?.toLowerCase().includes(search) ||
        user.mind_name?.toLowerCase().includes(search) ||
        user.role_display_name?.toLowerCase().includes(search)
    );

    // Sort
    const sorted = [...filtered].sort((a, b) => {
      let comparison = 0;

      switch (sortBy) {
        case 'user': {
          const nameA = (a.full_name || a.email || '').toLowerCase();
          const nameB = (b.full_name || b.email || '').toLowerCase();
          comparison = nameA.localeCompare(nameB);
          break;
        }
        case 'role': {
          // Sort by hierarchy_level (higher = more important)
          const levelA = a.hierarchy_level ?? 0;
          const levelB = b.hierarchy_level ?? 0;
          comparison = levelB - levelA;
          break;
        }
        case 'last_login': {
          const dateA = a.last_sign_in_at ? new Date(a.last_sign_in_at).getTime() : 0;
          const dateB = b.last_sign_in_at ? new Date(b.last_sign_in_at).getTime() : 0;
          comparison = dateB - dateA;
          break;
        }
      }

      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return sorted;
  }, [users, searchTerm, sortBy, sortOrder]);

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
            <UsersPageHeader onRefresh={refetch} onCreateUser={createDialog.open} />

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
              sortBy={sortBy}
              sortOrder={sortOrder}
              onSort={handleSort}
              onEditClick={editDialog.open}
              onCreateUser={createDialog.open}
            />
          </div>
        </main>
      </div>

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

      {/* Edit User Dialog */}
      <EditUserDialog
        isOpen={editDialog.isOpen}
        onOpenChange={(open) => !open && editDialog.close()}
        user={editDialog.user}
        selectedRoleId={editDialog.selectedRoleId}
        onRoleChange={editDialog.setSelectedRoleId}
        selectedAreas={editDialog.selectedAreas}
        onToggleArea={editDialog.toggleArea}
        selectedMindId={editDialog.selectedMindId}
        onMindChange={editDialog.setSelectedMindId}
        roles={roles}
        minds={minds}
        saving={editDialog.saving}
        error={editDialog.error}
        onSave={editDialog.save}
        onCancel={editDialog.close}
      />
    </div>
  );
};

export default OpsUsersTemplate;

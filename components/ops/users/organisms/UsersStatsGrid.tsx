import React from 'react';
import { StatCard } from '../../../shared/molecules';

interface UsersStatsGridProps {
  totalUsers: number;
  linkedUsers: number;
  unlinkedUsers: number;
}

export const UsersStatsGrid: React.FC<UsersStatsGridProps> = ({
  totalUsers,
  linkedUsers,
  unlinkedUsers,
}) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <StatCard
        icon="users"
        iconColorClass="text-primary"
        bgColorClass="bg-primary/10"
        value={totalUsers}
        label="Total de Usuários"
      />
      <StatCard
        icon="link"
        iconColorClass="text-green-500"
        bgColorClass="bg-green-500/10"
        value={linkedUsers}
        label="Com Mind Vinculado"
      />
      <StatCard
        icon="exclamation-triangle"
        iconColorClass="text-amber-500"
        bgColorClass="bg-amber-500/10"
        value={unlinkedUsers}
        label="Sem Mind Vinculado"
      />
    </div>
  );
};

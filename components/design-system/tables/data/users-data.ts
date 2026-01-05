import type { User } from '../types';

export const users: User[] = [
  {
    id: '1',
    name: 'João Silva',
    email: 'joao@example.com',
    avatarUrl: 'https://i.pravatar.cc/150?u=js',
    initials: 'JS',
    status: 'active',
  },
  {
    id: '2',
    name: 'Maria Santos',
    email: 'maria@example.com',
    avatarUrl: 'https://i.pravatar.cc/150?u=ms',
    initials: 'MS',
    status: 'offline',
  },
];

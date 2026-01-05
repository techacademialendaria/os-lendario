import type { TeamMember, KPICard } from '../types';

export const teamKPIs: KPICard[] = [
  {
    icon: 'users-alt',
    iconBgColor: 'bg-brand-yellow/10',
    iconTextColor: 'text-brand-yellow dark:text-brand-yellow-dark',
    label: 'Com Time Atribuído',
    value: 110,
  },
  {
    icon: 'check',
    iconBgColor: 'bg-brand-green/10',
    iconTextColor: 'text-brand-green',
    label: 'Check Ins Realizados',
    value: 93,
  },
  {
    icon: 'user-delete',
    iconBgColor: 'bg-brand-pink/10',
    iconTextColor: 'text-brand-pink',
    label: 'Sem Time',
    sublabel: 'Com check-in realizado',
    value: 0,
  },
];

export const teamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Abel Gheller',
    initials: 'AG',
    avatarColor: 'bg-brand-pink',
    hasCheckin: true,
    city: 'Balneário Camboriú, SC',
    specialty: 'Estratégico',
    specialtyVariant: 'secondary',
    skills: ['Data Analysis', 'Business Knowledge'],
    permission: 'participant',
    team: 'Time 09',
  },
  {
    id: '2',
    name: 'Adavio Tittoni',
    initials: 'AT',
    avatarColor: 'bg-brand-indigo',
    city: 'Brasil',
    specialty: 'Estratégico',
    specialtyVariant: 'secondary',
    skills: [],
    permission: 'mentor',
  },
  {
    id: '3',
    name: 'Admin',
    initials: 'AD',
    avatarColor: 'bg-brand-cyan',
    city: 'Floripa',
    specialty: 'Estratégico',
    specialtyVariant: 'secondary',
    skills: [],
    permission: 'admin',
  },
  {
    id: '4',
    name: 'Adriano Rogowski',
    initials: 'AS',
    avatarColor: 'bg-brand-red',
    hasCheckin: true,
    city: 'Antônio Carlos, SC',
    specialty: 'Técnico',
    specialtyVariant: 'outline',
    skills: ['Prompt Engineering', 'Programming', 'Market Analysis'],
    permission: 'participant',
    team: 'Time 16',
  },
];

export const filterOptions = {
  permissions: [
    { label: 'Admin', value: 'admin' },
    { label: 'Mentor', value: 'mentor' },
    { label: 'Participante', value: 'participant' },
  ],
  teams: [
    { label: 'Time 09', value: 't9' },
    { label: 'Time 16', value: 't16' },
  ],
  status: [
    { label: 'Ativos', value: 'active' },
    { label: 'Inativos', value: 'inactive' },
  ],
};

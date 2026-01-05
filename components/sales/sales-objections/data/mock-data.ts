import type { ObjectionRanking, MatrixRow, ObjectionAlert } from '../types';

export const MOCK_OBJECTION_RANKING: ObjectionRanking[] = [
  {
    name: 'Preco muito alto',
    count: 245,
    trend: [10, 20, 15, 30, 45, 40, 55],
    color: 'bg-destructive',
    stroke: 'stroke-destructive',
  },
  {
    name: 'Concorrente X',
    count: 180,
    trend: [30, 25, 35, 20, 15, 20, 10],
    color: 'bg-brand-blue',
    stroke: 'stroke-brand-blue',
  },
  {
    name: 'Timing / Agora nao',
    count: 120,
    trend: [10, 12, 10, 15, 12, 18, 20],
    color: 'bg-brand-orange',
    stroke: 'stroke-brand-orange',
  },
  {
    name: 'Preciso falar com socio',
    count: 90,
    trend: [5, 5, 8, 10, 12, 15, 12],
    color: 'bg-brand-green',
    stroke: 'stroke-brand-green',
  },
  {
    name: 'Duvida Tecnica (API)',
    count: 65,
    trend: [20, 18, 15, 12, 10, 8, 5],
    color: 'bg-muted-foreground',
    stroke: 'stroke-muted-foreground',
  },
];

export const PRODUCTS = ['Enterprise', 'Pro Plan', 'Consultoria'];

export const MOCK_MATRIX_DATA: MatrixRow[] = [
  { objection: 'Preco', values: [80, 40, 20] },
  { objection: 'Concorrente', values: [20, 60, 10] },
  { objection: 'Timing', values: [30, 30, 30] },
  { objection: 'Socio', values: [50, 20, 80] },
  { objection: 'Tecnica', values: [90, 10, 0] },
];

export const MOCK_ALERTS: ObjectionAlert[] = [
  { objection: 'Concorrente Z (Novo)', freq: 12, growth: '+200%' },
  { objection: 'LGPD / Compliance', freq: 8, growth: '+50%' },
];

import type { Invoice } from '../types';

export const invoices: Invoice[] = [
  {
    id: 'INV001',
    status: 'paid',
    method: 'credit-card',
    methodLabel: 'Cartão de Crédito',
    methodIcon: 'credit-card',
    date: '22/10/2023',
    amount: 'R$ 250,00',
  },
  {
    id: 'INV002',
    status: 'pending',
    method: 'pix',
    methodLabel: 'PIX',
    methodIcon: 'university',
    date: '23/10/2023',
    amount: 'R$ 1.500,00',
  },
  {
    id: 'INV003',
    status: 'cancelled',
    method: 'boleto',
    methodLabel: 'Boleto',
    methodIcon: 'document',
    date: '15/10/2023',
    amount: 'R$ 50,00',
    isCancelled: true,
  },
];

export const financialTotal = 'R$ 1.750,00';

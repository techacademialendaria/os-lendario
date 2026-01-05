import type { ToastVariant } from '../types';

export const toastVariants: ToastVariant[] = [
  {
    label: 'Disparar Sucesso',
    title: 'Sucesso!',
    description: 'Seu arquivo foi enviado com seguranca.',
    variant: 'success',
  },
  {
    label: 'Disparar Aviso',
    title: 'Atencao',
    description: 'Sua sessao vai expirar em 5 minutos.',
    variant: 'warning',
  },
  {
    label: 'Disparar Erro',
    title: 'Erro de Conexao',
    description: 'Nao foi possivel salvar as alteracoes.',
    variant: 'destructive',
  },
  {
    label: 'Disparar Padrao',
    title: 'Atualizacao',
    description: 'Novos recursos disponiveis no sistema.',
    variant: 'default',
  },
];

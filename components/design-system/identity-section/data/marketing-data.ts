import type { MarketingCharacteristic, ValueAlignment, PracticalApplication } from '../types';

export const marketingDefinition = {
  mainParagraph:
    'Marketing Autentico e o unico tipo de marketing que nao reserva um lugar para voce no inferno; ele se dedica a impulsionar mensagens autenticas e transparentes.',
  secondaryParagraph:
    'Enquanto outros se escondem atras de fachadas brilhantes e promessas vazias, criando um mundo superficial cheio de pessoas frustradas, o Marketing Autentico se ergue como um farol de integridade.',
  quote:
    '"Nao e apenas uma estrategia; e uma revolucao etica. Um chamado para rejeitarmos o que e superficial e abracarmos o que e autentico e humano."',
};

export const marketingCharacteristics: MarketingCharacteristic[] = [
  {
    title: 'Transparencia',
    icon: 'eye',
    desc: 'Abertura total sobre praticas e origens.',
  },
  {
    title: 'Autenticidade',
    icon: 'fingerprint',
    desc: 'Comunicacao honesta, sem falsas promessas.',
  },
  { title: 'Valor Real', icon: 'diamond', desc: 'Foco no cliente, nao apenas na venda.' },
  {
    title: 'Engajamento',
    icon: 'users-alt',
    desc: 'Criar comunidade, nao apenas base de clientes.',
  },
  { title: 'Responsabilidade', icon: 'globe', desc: 'Compromisso etico e sustentavel.' },
];

export const valueAlignments: ValueAlignment[] = [
  {
    val: 'Consciencia & Sabedoria',
    desc: 'Abordagem consciente e emocionalmente inteligente.',
  },
  {
    val: 'Evolucao (Progresso)',
    desc: 'Melhoria continua da marca e da experiencia.',
  },
  { val: 'Coerencia', desc: 'Alinhamento total entre a promessa e a entrega.' },
  { val: 'Clareza', desc: 'Comunicacao direta e um pilar fundamental.' },
  { val: 'Simplicidade', desc: 'Mensagens simples, mas profundas e eficazes.' },
];

export const practicalApplications: PracticalApplication[] = [
  {
    icon: 'book-alt',
    title: 'Storytelling Alinhado',
    desc: 'Sua missao de vida traduzida no negocio.',
  },
  {
    icon: 'share',
    title: 'Big Picture Content',
    desc: 'Estrategias que educam usando suas zonas de genialidade.',
  },
  {
    icon: 'comment-alt',
    title: 'Comunidade de Valor',
    desc: 'Um espaco onde as pessoas se sentem realizadas.',
  },
];

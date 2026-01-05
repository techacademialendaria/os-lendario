import type { StatItem, SolutionCard, TestimonialItem } from '../types';

export const ALAN_AVATAR =
  'https://yt3.googleusercontent.com/JNCtRSKK2aMQOmEroyBWmdbiaq_uTlFn-h_RuhGakkxBHW14e9u4yMZk884Espvk8he9GIYjrPE=s900-c-k-c0x00ffffff-no-rj';

export const STATS: StatItem[] = [
  { value: '80%', description: 'tem seu tempo sugado por tarefas repetitivas que nao geram resultado.' },
  { value: '65%', description: 'vivem no loop de "muitas ideias, pouca execucao".' },
  { value: '60%', description: 'estao em burnout declarado ou em desenvolvimento.' },
  { value: '55%', description: 'tem renda estagnada ha anos.' },
];

export const SOLUTIONS: SolutionCard[] = [
  {
    icon: 'brain',
    title: '1. Sistema unico de organizacao mental',
    description: 'Nao 47 apps. Um "Segundo Cerebro" que libera a mente para o que importa.',
  },
  {
    icon: 'target',
    title: '2. Foco radical em uma direcao',
    description: 'Nao 5 projetos simultaneos. Uma oferta clara que une experiencia com demanda real.',
  },
  {
    icon: 'users-alt',
    title: '3. Comunidade de accountability',
    description: 'Nao isolamento heroico. Pares que cobram execucao, nao aplaudem procrastinacao.',
  },
];

export const TESTIMONIALS: TestimonialItem[] = [
  { text: 'Segundo cerebro foi fora de serie.', author: 'KR' },
  { text: 'Sensacao de pertencimento absurdo. Como se tivesse encontrado minha tribo.', author: 'Lucas' },
  { text: 'Entrei pra aprender IA, aprendi sobre mim.', author: 'Rodrigo' },
  { text: 'Entregam muito mais do que prometem.', author: 'Cristina' },
  { text: 'PS destrava o que voce esta travado.', author: 'Raphael' },
];

export const WORKS_FOR = [
  'Profissionais 35-55 anos com experiencia real acumulada',
  'Quem ja tentou de tudo e sabe que o problema nao e falta de conhecimento',
  'Quem quer construir algo proprio antes que seja tarde demais',
  'Quem busca comunidade de iguais, nao mais um guru',
];

export const NOT_WORKS_FOR = [
  'Quem busca formula magica sem implementacao',
  'Quem quer que facam por ele',
  'Quem ainda acha que IA e modinha',
];

export const RELATED_ARTICLES = [
  { title: 'O fim das agencias tradicionais?', category: 'Mercado', readTime: '4 min' },
  { title: '3 Prompts para dobrar sua produtividade', category: 'Tatica', readTime: '2 min' },
];

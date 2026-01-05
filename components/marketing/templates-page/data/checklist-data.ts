import type { ChecklistItem, QuickFormula, ImplementationStep } from '../types';

export const CHECKLIST_ITEMS: ChecklistItem[] = [
  {
    methodology: 'HOPKINS',
    criterion: 'Headline tem numero/dado especifico e mensuravel?',
  },
  {
    methodology: 'REEVES',
    criterion: 'USP aparece pelo menos 3x (inicio, meio, fim)?',
  },
  {
    methodology: 'SCHWARTZ',
    criterion:
      'Nivel de sofisticacao identificado e objecoes inoculadas antes do preco?',
  },
  {
    methodology: 'HORMOZI',
    criterion: 'Time Delay e Effort & Sacrifice minimizados explicitamente?',
  },
  {
    methodology: 'GEORGI',
    criterion: 'Inimigo (UMP) e Mecanismo (UMS) nomeados?',
  },
  {
    methodology: 'DUNFORD',
    criterion: 'Alternativas competitivas desqualificadas logicamente?',
  },
];

export const QUICK_FORMULAS: QuickFormula[] = [
  {
    label: 'Headline Hopkins',
    formula:
      '[Avatar] [verbo de descoberta] [mecanismo] que [resultado + numero] em [tempo]',
  },
  {
    label: 'Bullet Hormozi',
    formula:
      'Como [resultado especifico] para que [pessoas importantes] [reacao desejada]',
  },
  {
    label: 'Depoimento',
    formula: '"[Resultado] + [timeline exata] + [emocao]" - [Nome]',
  },
];

export const IMPLEMENTATION_STEPS: ImplementationStep[] = [
  {
    number: 1,
    title: 'Pagina de Vendas Long Form',
    description: 'Fundacao',
    isHighlighted: true,
  },
  {
    number: 2,
    title: 'Pagina de Captura',
    description: 'Topo de funil',
    isHighlighted: true,
  },
  {
    number: 3,
    title: 'Advertorial',
    description: 'Trafego frio',
    isHighlighted: true,
  },
  {
    number: 4,
    title: 'VSL',
    description: 'Versao em video da PV',
    isHighlighted: false,
  },
  {
    number: 5,
    title: 'Webinario',
    description: 'Leads aquecidos',
    isHighlighted: false,
  },
  {
    number: 6,
    title: 'Obrigado',
    description: 'Otimizacao final',
    isHighlighted: false,
  },
];

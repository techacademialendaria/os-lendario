import type { Archetype } from '../types';

export const mission = {
  icon: 'target',
  title: 'Missao',
  text: '"Unir e potencializar pessoas lendarias com IA para construirem solucoes e negocios que imortalizam seu legado."',
};

export const vision = {
  icon: 'eye',
  title: 'Visao',
  text: 'Ser referencia global em educacao de IA generativa aplicada a negocios, com um portfolio de startups de sucesso internacional.',
};

export const positioning = {
  icon: 'map-marker',
  title: 'Posicionamento',
  text: 'Somos um ecossistema de educacao & inovacao que potencializa pessoas e negocios com inteligencia artificial generativa.',
};

export const archetypes: Archetype[] = [
  {
    name: 'Rebelde',
    icon: 'flame',
    colorClass: 'text-primary',
    borderClass: 'border-primary/20 hover:border-primary',
    bgClass: 'from-card to-primary/5',
    badgeBorderClass: 'border-primary/20',
    badgeBgClass: 'bg-primary/10',
    badgeTextClass: 'text-primary',
    level: 'Arquetipo Primario',
    motivation: 'Desafiar o status quo e recusar a mediocridade.',
    manifestation: '"Enquanto muitos os chamam de loucos, nos os reconhecemos como genios."',
  },
  {
    name: 'Mago',
    icon: 'magic-wand',
    colorClass: 'text-brand-indigo',
    borderClass: 'border-brand-indigo/20 hover:border-brand-indigo',
    bgClass: 'from-card to-brand-indigo/5',
    badgeBorderClass: 'border-brand-indigo/20',
    badgeBgClass: 'bg-brand-indigo/10',
    badgeTextClass: 'text-brand-indigo',
    level: 'Arquetipo Secundario',
    motivation: 'Transformar realidade e conhecimento em revolucao.',
    manifestation: '"Alquimistas do conhecimento, arquitetos do impossivel."',
  },
  {
    name: 'Sabio',
    icon: 'book-alt',
    colorClass: 'text-brand-blue',
    borderClass: 'border-brand-blue/20 hover:border-brand-blue',
    bgClass: 'from-card to-brand-blue/5',
    badgeBorderClass: 'border-brand-blue/20',
    badgeBgClass: 'bg-brand-blue/10',
    badgeTextClass: 'text-brand-blue',
    level: 'Arquetipo Terciario',
    motivation: 'Buscar a verdade atraves da transparencia radical.',
    manifestation: '"Contexto, nao controle. Verdade, bondade e utilidade."',
  },
];

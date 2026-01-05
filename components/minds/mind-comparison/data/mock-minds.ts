import type { MindData } from '../types';

export const mindsData: MindData[] = [
  {
    id: 'mark-manson',
    name: 'Mark Manson',
    title: 'The Philosopher',
    avatar:
      'https://yt3.googleusercontent.com/ytc/AIdro_k6E7jSjX6K3y6n5x5o5f5q5z5x5o5f5q5z5x5o=s900-c-k-c0x00ffffff-no-rj',
    superpower: 'Traduzir complexidade em simplicidade vulgar memoravel',
    kryptonite: 'Impaciencia com processos lentos e burocracia',
    archetypes: { mbti: 'ENTP', enneagram: '8w7', disc: 'DI' },
    strat: 'IV-V',
    disc: { d: 85, i: 80, s: 25, c: 55 },
    bigFive: [92, 65, 78, 35, 45],
    darkTriad: { narc: 4, mach: 4, psych: 1 },
    radar: [
      { skillName: 'Abertura', level: 9 },
      { skillName: 'Consc.', level: 6 },
      { skillName: 'Extrov.', level: 8 },
      { skillName: 'Amabil.', level: 3 },
      { skillName: 'Neurot.', level: 4 },
    ],
  },
  {
    id: 'naval-ravikant',
    name: 'Naval Ravikant',
    title: 'The Sage',
    avatar: 'https://pbs.twimg.com/profile_images/1256841238298292232/ycqwh5u4_400x400.jpg',
    superpower: 'Sintese de complexidade em simplicidade (Tweets/Aforismos)',
    kryptonite: 'Impaciencia com ineficiencia e desperdicio de tempo',
    archetypes: { mbti: 'INTJ', enneagram: '5w4', disc: 'DI/DC' },
    strat: 'VI-VII',
    disc: { d: 85, i: 55, s: 25, c: 65 },
    bigFive: [92, 75, 35, 45, 25],
    darkTriad: { narc: 2, mach: 4, psych: 2 },
    radar: [
      { skillName: 'Abertura', level: 9 },
      { skillName: 'Consc.', level: 8 },
      { skillName: 'Extrov.', level: 3 },
      { skillName: 'Amabil.', level: 4 },
      { skillName: 'Neurot.', level: 2 },
    ],
  },
  {
    id: 'steve-jobs',
    name: 'Steve Jobs',
    title: 'The Visionary',
    avatar:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Steve_Jobs_Headshot_2010-CROP_%28cropped_2%29.jpg/800px-Steve_Jobs_Headshot_2010-CROP_%28cropped_2%29.jpg',
    superpower: 'Reality Distortion Field (fazer outros acreditarem no impossivel)',
    kryptonite: 'Incapacidade de aceitar mediocridade (perfeccionismo toxico)',
    archetypes: { mbti: 'INTJ', enneagram: '7w8', disc: 'DI' },
    strat: 'VI-VII',
    disc: { d: 85, i: 90, s: 15, c: 45 },
    bigFive: [99, 45, 60, 15, 70],
    darkTriad: { narc: 9, mach: 7, psych: 3 },
    radar: [
      { skillName: 'Abertura', level: 10 },
      { skillName: 'Consc.', level: 5 },
      { skillName: 'Extrov.', level: 6 },
      { skillName: 'Amabil.', level: 1 },
      { skillName: 'Neurot.', level: 7 },
    ],
  },
];

export const bigFiveLabels = [
  'Abertura (Openness)',
  'Conscienciosidade',
  'Extroversao',
  'Agradabilidade',
  'Neuroticismo',
];

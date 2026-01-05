import type { Module, FaqItem, Stat, AuthorityMetric } from '../types';

export const ALAN_AVATAR =
  'https://yt3.googleusercontent.com/JNCtRSKK2aMQOmEroyBWmdbiaq_uTlFn-h_RuhGakkxBHW14e9u4yMZk884Espvk8he9GIYjrPE=s900-c-k-c0x00ffffff-no-rj';

export const DIAGNOSIS_ITEMS = [
  'Tem 15-20+ anos de experiencia, mas sente que esta operando em fracao do seu potencial',
  'Ja comprou dezenas de cursos. Nenhum gerou resultado consistente.',
  'Comeca projetos empolgado. Abandona antes de ver resultado.',
  'Trabalha demais. Renda estagnada ha anos.',
  'O tempo esta passando. Voce nao esta construindo nada proprio.',
  'Medo real de ser substituido por alguem 20 anos mais novo usando IA basica.',
  'Quer sair do CLT mas tem medo de destruir o padrao de vida da familia.',
];

export const STATS: Stat[] = [
  { value: '80%', label: 'Tempo Sugado', sublabel: 'por tarefas repetitivas' },
  { value: '65%', label: 'Loop Infinito', sublabel: 'muitas ideias, pouca execucao' },
  { value: '60%', label: 'Burnout', sublabel: 'declarado ou em desenvolvimento' },
  { value: '60%', label: 'Caos Mental', sublabel: 'conhecimento desorganizado' },
  { value: '55%', label: 'Renda Estagnada', sublabel: 'ha anos sem crescimento real' },
  { value: '50%', label: 'Medo', sublabel: 'de ficar obsoleto' },
];

export const AUTHORITY_METRICS: AuthorityMetric[] = [
  { value: 'R$ 200M+', label: 'Faturados' },
  { value: '20.000+', label: 'Alunos Formados' },
  { value: '40+', label: 'Paises' },
  { value: '98%', label: 'Retencao Inicial' },
];

export const MODULES: Module[] = [
  { icon: 'brain', title: 'Fluencia em IA', desc: 'Fundamentos que 99% ignora. Entenda IA de verdade, sem tecniques.' },
  { icon: 'layers', title: 'Segundo Cerebro', desc: 'Sistema de organizacao que libera sua mente. Chega de guardar tudo na cabeca.' },
  { icon: 'terminal', title: 'Engenharia de Prompt', desc: 'A diferenca entre prompts genericos e comandos que geram dinheiro.' },
  { icon: 'briefcase', title: 'Negocios com IA', desc: 'Estrategias de monetizacao e novos modelos de receita.' },
  { icon: 'code-simple', title: 'VibeCoding', desc: 'Crie aplicativos e automacoes sem saber uma linha de codigo.' },
  { icon: 'rocket', title: 'Prospeccao & Vendas', desc: 'Automatize sua maquina de vendas e multiplique conversoes.' },
  { icon: 'target', title: 'Zona de Genialidade', desc: 'Identifique sua area de maior impacto e escale seu talento.' },
  { icon: 'shield-check', title: 'Mente Lendaria', desc: 'Mentalidade para era da IA. Navegue mudancas sem perder o rumo.' },
  { icon: 'users-alt', title: 'Clones IA Express', desc: 'Crie versoes de voce que trabalham 24/7. Escala sem burnout.' },
];

export const AI_TOOLS = [
  'GPT-5',
  'GPT-4o',
  'Claude 3.5',
  'Grok 3',
  'Gemini Pro',
  'Llama 3',
  'Mistral',
  'Perplexity',
  'R1',
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: '1',
    question: 'R$ 98/mes e muito para testar?',
    answer:
      'R$ 3 por dia. Menos que um cafe. Para acesso a 9 IAs premium (valor R$ 8.400/ano) + treinamento completo + comunidade. Alem disso: garantia de 30 dias. Se nao valer, pede o dinheiro de volta.',
  },
  {
    id: '2',
    question: 'Nao tenho tempo.',
    answer:
      '80% dos profissionais tem tempo sugado por tarefas repetitivas. O Segundo Cerebro foi criado para resolver exatamente isso. O sistema libera tempo - nao consome.',
  },
  {
    id: '3',
    question: 'IA e complexo para minha idade?',
    answer:
      '95% dos membros nao tem background tecnico. Temos membros de 56 a 69 anos. Experiencia + IA = vantagem, nao desvantagem.',
  },
  {
    id: '4',
    question: 'Posso aprender sozinho?',
    answer:
      'Pode. Vai levar 3-5 anos. Sem sistema. Sem accountability. Ou pode acessar o que 20.000+ alunos ja validaram agora.',
  },
];

/**
 * LessonEditor Mock Data
 * Mock data for modules and AI audit.
 */

import type { CourseModule, AiAuditData } from '../types';

// =============================================================================
// MOCK MODULES (Course Index)
// =============================================================================

export const MOCK_MODULES: CourseModule[] = [
  {
    id: 4,
    title: 'Conexoes e Grafo',
    lessons: [
      { id: '4.1', title: 'Links Internos - A Alma do Segundo Cerebro', active: false },
      { id: '4.3', title: 'Canvas - Pensamento Visual', active: false },
      { id: '4.2', title: 'O Grafo do Conhecimento', active: false },
    ],
  },
  {
    id: 5,
    title: 'Superpoderes com IA',
    lessons: [
      { id: '5.2', title: 'Integrando ChatGPT no Obsidian', active: false },
      { id: '5.4', title: 'Templates Inteligentes com IA', active: false },
      { id: '5.1', title: 'Plugins Essenciais da Comunidade', active: false },
      { id: '5.3', title: 'Smart Connections - Converse com Seu Cerebro', active: false },
    ],
  },
  {
    id: 6,
    title: 'Execucao e Maestria',
    lessons: [
      { id: '6.3', title: 'Importando de Outras Ferramentas', active: false },
      { id: '6.4', title: 'Os 4 Niveis de Maestria e Proximos Passos', active: false },
      { id: '6.2', title: 'Casos de Uso por Arquetipo', active: false },
      { id: '6.1', title: 'Workflows Diarios - Do Caos a Clareza', active: false },
    ],
  },
  {
    id: 1,
    title: 'Fundamentos e Instalacao',
    lessons: [
      { id: '1.4', title: 'Configuracoes Essenciais e Interface', active: false },
      { id: '1.1', title: 'Por Que Voce Precisa de um Segundo Cerebro (Agora)', active: false },
      { id: '1.2', title: 'Por Que Obsidian e a Escolha Definitiva', active: false },
      { id: '1.3', title: 'Instalacao Multi-Plataforma Completa', active: false },
    ],
  },
  {
    id: 2,
    title: 'Escrita e Formatacao',
    lessons: [
      { id: '2.2', title: 'Tipos de Notas e Quando Usar Cada Uma', active: false },
      { id: '2.3', title: 'Trabalhando com Arquivos e Anexos', active: false },
      { id: '2.1', title: 'Markdown em 30 Minutos (O Essencial)', active: false },
    ],
  },
  {
    id: 3,
    title: 'Organizacao Inteligente',
    lessons: [
      { id: '3.2', title: 'Tags e Hierarquias de Tags', active: false },
      { id: '3.1', title: 'Pastas - Estrutura Minimalista que Funciona', active: true },
      { id: '3.3', title: 'Combinando Pastas + Tags + Links', active: false },
      { id: '3.4', title: 'Migrando Conteudo Existente', active: false },
    ],
  },
];

// =============================================================================
// MOCK AI AUDIT DATA
// =============================================================================

export const MOCK_AI_AUDIT: AiAuditData = {
  hasAnalysis: false,
  overallScore: null,
  metrics: [],
  suggestions: [],
};

// =============================================================================
// DEFAULT LESSON CONTENT
// =============================================================================

export const DEFAULT_TITLE = '3.1 - Pastas - Estrutura Minimalista que Funciona';

export const DEFAULT_SCRIPT = `**Fala, Lendario!**

Bem-vindo ao **Modulo 3: Organizacao Inteligente!**
Essa e uma das partes mais criticas do curso. Por que?
**Porque 90% das pessoas que abandonam sistemas de segundo cerebro abandonam por causa de organizacao errada.**

Voce ja viveu isso? Comeca super empolgado, cria pastas, subpastas, sub-subpastas... e depois de 2 meses, nao encontra mais nada. Vira um caos. Voce desiste.

**Nao vai acontecer com voce.** Porque nessa aula eu vou te ensinar a estrutura minimalista que **escala**.
Funciona com 50 notas. Funciona com 5.000 notas.
Vamos la!

## Objetivos da Aula

Ao final dessa aula, voce vai:
- **Implementar** estrutura de pastas minimalista e escalavel
- **Entender** quando usar pastas vs. tags vs. links
- **Evitar** anti-padroes que quebram sistemas
- **Organizar** 20+ notas na estrutura definitiva

## Os Erros Que Voce NAO Pode Cometer

Antes de mostrar o que fazer, deixa eu te mostrar o que **nao fazer.**

### Erro #1: Organizacao Prematura

Voce tem 5 notas e ja cria:
\`\`\`
vault/
├── Trabalho/
│   ├── Projetos/
│   │   ├── 2024/
\`\`\``;

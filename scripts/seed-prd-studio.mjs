/**
 * PRD Studio Demo Seed Script
 * Insere dados de demonstração no Supabase
 *
 * Uso: node scripts/seed-prd-studio.mjs
 */

import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Load .env from app directory
const __dirname = dirname(fileURLToPath(import.meta.url));
config({ path: join(__dirname, '../.env.local') });
config({ path: join(__dirname, '../../.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Supabase credentials not found in .env');
  console.log('Required: VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// ============================================================================
// DATA DEFINITIONS
// ============================================================================

const PROJECT = {
  slug: 'prd-studio',
  name: 'PRD Studio',
  description: 'Módulo que transforma ideias vagas em documentação técnica completa através de um wizard de 6 fases',
  project_type: 'documentation', // Using 'documentation' until 'prd' type is added to constraint
  status: 'completed', // Valid values: planning, in_progress, completed, archived
  project_metadata: {
    prdType: 'project',
    currentPhase: 'exported',
    upload: {
      content: 'PRD Studio é um módulo do LendárIAOS que automatiza a criação de PRDs. Pipeline: Upload → Brief → PRD → Épicos → Stories → Export. Framework Puxadinho → Mansão.',
      completedAt: '2024-12-13T10:00:00Z'
    },
    brief: {
      superProblem: 'Criar PRDs de qualidade é demorado e requer expertise técnica que muitos criadores não têm',
      solution: 'Wizard guiado com AI que estrutura ideias brutas em documentação técnica completa',
      differentials: [
        'Framework Puxadinho → Mansão',
        'Export multi-formato (Lovable, Claude, Generic)',
        'Validação automática de stories'
      ],
      scopeIn: ['Wizard de 6 fases', 'Geração AI de épicos e stories', 'Export para 3 formatos'],
      scopeOut: [
        { item: 'Push direto para GitHub', reason: 'v2.0' },
        { item: 'Colaboração multi-usuário', reason: 'v2.0' }
      ],
      successMetrics: [
        { metric: 'Time to PRD', definition: 'Tempo do upload ao export', target: '< 30 min' },
        { metric: 'Completion Rate', definition: '% que completa todas fases', target: '> 80%' }
      ],
      completedAt: '2024-12-13T11:00:00Z'
    },
    prdDocument: {
      objectives: [
        { id: 'obj-1', title: 'Reduzir tempo de criação de PRD', description: 'De dias para minutos', status: 'approved' },
        { id: 'obj-2', title: 'Garantir qualidade consistente', description: 'Validação automática de stories', status: 'approved' }
      ],
      designDecisions: {
        screens: ['Dashboard', 'Upload', 'Brief', 'PRD', 'Epics', 'Stories', 'Export'],
        flow: 'linear-wizard',
        colors: { primary: '#538096', accent: '#C9B298' }
      },
      functionalRequirements: [
        { id: 'fr-1', title: 'Upload de texto livre', priority: 'must' },
        { id: 'fr-2', title: 'Geração AI de épicos', priority: 'must' },
        { id: 'fr-3', title: 'Export multi-formato', priority: 'must' }
      ],
      nonFunctionalRequirements: [
        { id: 'nfr-1', title: 'Performance < 2s por tela', priority: 'should' },
        { id: 'nfr-2', title: 'Mobile responsive', priority: 'should' }
      ],
      technicalArchitecture: {
        frontend: 'React + TypeScript',
        backend: 'Supabase',
        ai: 'Claude API',
        storage: 'Existing content_projects + contents tables'
      },
      lineCount: 1640,
      completedAt: '2024-12-13T14:00:00Z'
    },
    metrics: {
      totalEpics: 6,
      totalStories: 41,
      completionPercentage: 100
    }
  }
};

// Using 'other' as content_type until 'prd_epic' is added to constraint
const EPICS = [
  { slug: 'prd-studio-epic-1', title: 'Infrastructure & Setup', content: 'Estabelecer a base técnica do módulo PRD Studio com types, routing, hooks e design tokens.', sequence_order: 1, metadata: { contentCategory: 'prd_epic', objective: 'Estabelecer base técnica', dependencies: [], storiesCount: 7 } },
  { slug: 'prd-studio-epic-2', title: 'Dashboard + Upload Phase', content: 'Implementar a tela inicial (lista de projetos) e a primeira fase do wizard (Upload).', sequence_order: 2, metadata: { contentCategory: 'prd_epic', objective: 'Dashboard e fase 1 do wizard', dependencies: ['prd-studio-epic-1'], storiesCount: 6 } },
  { slug: 'prd-studio-epic-3', title: 'Brief Phase', content: 'Implementar a fase 2 do wizard com Quality Assurance, pesquisas, WOWs e estruturação do brief.', sequence_order: 3, metadata: { contentCategory: 'prd_epic', objective: 'Fase 2 com AI', dependencies: ['prd-studio-epic-2'], storiesCount: 8 } },
  { slug: 'prd-studio-epic-4', title: 'PRD Document Phase', content: 'Implementar a fase 3 do wizard com detalhamento técnico, decisões de design e requisitos.', sequence_order: 4, metadata: { contentCategory: 'prd_epic', objective: 'Fase 3 com documento PRD', dependencies: ['prd-studio-epic-3'], storiesCount: 6 } },
  { slug: 'prd-studio-epic-5', title: 'Épicos + Stories Phase', content: 'Implementar fases 4 e 5 com geração de épicos, drag-drop, stories e validação automática.', sequence_order: 5, metadata: { contentCategory: 'prd_epic', objective: 'Geração AI de épicos e stories', dependencies: ['prd-studio-epic-4'], storiesCount: 7 } },
  { slug: 'prd-studio-epic-6', title: 'Export Phase', content: 'Implementar a fase final com exportação para múltiplos formatos e preview.', sequence_order: 6, metadata: { contentCategory: 'prd_epic', objective: 'Export multi-formato', dependencies: ['prd-studio-epic-5'], storiesCount: 7 } }
];

const STORIES = [
  // Epic 1
  { epic: 1, slug: 'prd-studio-story-1-1', title: 'Criar Types PRD', content: 'Como desenvolvedor, quero types TypeScript bem definidos para todas as entidades PRD, para que o código seja type-safe', sequence_order: 1, metadata: { acceptanceCriteria: ['Arquivo prd.ts criado', 'Types base definidos', 'Transform functions implementadas'], complexity: 'P', isValidated: true } },
  { epic: 1, slug: 'prd-studio-story-1-2', title: 'Adicionar Section Enums', content: 'Como desenvolvedor, quero Section enums para PRD, para que o routing funcione corretamente', sequence_order: 2, metadata: { acceptanceCriteria: ['Enums adicionados em types.ts', 'Routes configuradas'], complexity: 'P', isValidated: true } },
  { epic: 1, slug: 'prd-studio-story-1-3', title: 'Criar PRD Tokens', content: 'Como desenvolvedor, quero design tokens específicos do PRD Studio, para manter consistência visual', sequence_order: 3, metadata: { acceptanceCriteria: ['prd-tokens.ts criado', 'Cores Petróleo definidas'], complexity: 'P', isValidated: true } },
  { epic: 1, slug: 'prd-studio-story-1-4', title: 'Implementar PRDRouter', content: 'Como desenvolvedor, quero um router dedicado para PRD, para que as rotas sejam organizadas', sequence_order: 4, metadata: { acceptanceCriteria: ['PRDRouter.tsx criado', '6 rotas configuradas'], complexity: 'M', isValidated: true } },
  { epic: 1, slug: 'prd-studio-story-1-5', title: 'Implementar PRDTopbar', content: 'Como usuário, quero uma topbar customizada, para navegar facilmente no PRD Studio', sequence_order: 5, metadata: { acceptanceCriteria: ['PRDTopbar.tsx criado', 'Logo PRD Studio'], complexity: 'M', isValidated: true } },
  { epic: 1, slug: 'prd-studio-story-1-6', title: 'Criar usePRDProjects Hook', content: 'Como desenvolvedor, quero um hook para listar projetos PRD, para usar no dashboard', sequence_order: 6, metadata: { acceptanceCriteria: ['Hook criado', 'Filtra por project_type prd'], complexity: 'M', isValidated: true } },
  { epic: 1, slug: 'prd-studio-story-1-7', title: 'Criar usePRDProject Hook', content: 'Como desenvolvedor, quero um hook para carregar um projeto PRD específico, para usar nas fases', sequence_order: 7, metadata: { acceptanceCriteria: ['Hook criado', 'Carrega por slug'], complexity: 'M', isValidated: true } },

  // Epic 2
  { epic: 2, slug: 'prd-studio-story-2-1', title: 'Criar PRDDashboardTemplate', content: 'Como usuário, quero ver meus projetos PRD em uma lista, para acessar rapidamente', sequence_order: 1, metadata: { acceptanceCriteria: ['Lista de projetos renderiza', 'Card com status'], complexity: 'M', isValidated: true } },
  { epic: 2, slug: 'prd-studio-story-2-2', title: 'Criar PRDNewTemplate', content: 'Como usuário, quero escolher entre tarefa ou projeto ao criar, para definir o escopo', sequence_order: 2, metadata: { acceptanceCriteria: ['Tela de seleção', 'Opção Tarefa/Projeto'], complexity: 'P', isValidated: true } },
  { epic: 2, slug: 'prd-studio-story-2-3', title: 'Criar PRDUploadTemplate', content: 'Como usuário, quero uma tela para despejar minhas ideias sem filtro, para iniciar o processo', sequence_order: 3, metadata: { acceptanceCriteria: ['Textarea grande', 'Auto-save'], complexity: 'M', isValidated: true } },
  { epic: 2, slug: 'prd-studio-story-2-4', title: 'Implementar PRDTimer', content: 'Como usuário, quero ver quanto tempo estou escrevendo, para ter noção do esforço', sequence_order: 4, metadata: { acceptanceCriteria: ['Timer visível', 'Formato mm:ss'], complexity: 'P', isValidated: true } },
  { epic: 2, slug: 'prd-studio-story-2-5', title: 'Implementar PRDEffortIndicator', content: 'Como usuário, quero ver o indicador 90/10, para entender que 90% do esforço é agora', sequence_order: 5, metadata: { acceptanceCriteria: ['Indicador visual 90/10'], complexity: 'P', isValidated: true } },
  { epic: 2, slug: 'prd-studio-story-2-6', title: 'Adicionar Upload Áudio', content: 'Como usuário, quero poder gravar áudio ao invés de escrever, para facilitar brainstorm', sequence_order: 6, metadata: { acceptanceCriteria: ['Botão gravar', 'Salva URL do áudio'], complexity: 'M', isValidated: true } },

  // Epic 3
  { epic: 3, slug: 'prd-studio-story-3-1', title: 'Criar usePRDAI Hook', content: 'Como desenvolvedor, quero um hook para interagir com Claude API, para gerar conteúdo', sequence_order: 1, metadata: { acceptanceCriteria: ['Hook criado', 'Integra Claude API'], complexity: 'M', isValidated: true } },
  { epic: 3, slug: 'prd-studio-story-3-2', title: 'Implementar BlindSpotsView', content: 'Como usuário, quero ver pontos cegos identificados pela AI, para melhorar minha ideia', sequence_order: 2, metadata: { acceptanceCriteria: ['Lista de blind spots', 'Categorização'], complexity: 'M', isValidated: true } },
  { epic: 3, slug: 'prd-studio-story-3-3', title: 'Criar PRDBlindSpotCard', content: 'Como usuário, quero cards visuais para cada ponto cego, para facilitar a análise', sequence_order: 3, metadata: { acceptanceCriteria: ['Card component', 'Ícone por categoria'], complexity: 'P', isValidated: true } },
  { epic: 3, slug: 'prd-studio-story-3-4', title: 'Implementar ResearchView', content: 'Como usuário, quero ver pesquisas relacionadas à minha ideia, para ter contexto', sequence_order: 4, metadata: { acceptanceCriteria: ['Lista de pesquisas', 'Links clicáveis'], complexity: 'G', isValidated: true } },
  { epic: 3, slug: 'prd-studio-story-3-5', title: 'Criar WOWsInput', content: 'Como usuário, quero registrar insights (WOWs) durante a leitura, para capturar ideias', sequence_order: 5, metadata: { acceptanceCriteria: ['Input de WOW', 'Lista de WOWs salvos'], complexity: 'M', isValidated: true } },
  { epic: 3, slug: 'prd-studio-story-3-6', title: 'Implementar BriefStructureView', content: 'Como usuário, quero ver o brief estruturado, para validar antes de prosseguir', sequence_order: 6, metadata: { acceptanceCriteria: ['Seções do brief', 'Edição inline'], complexity: 'M', isValidated: true } },
  { epic: 3, slug: 'prd-studio-story-3-7', title: 'Criar generateBlindSpots Function', content: 'Como desenvolvedor, quero uma função AI para gerar pontos cegos, para automatizar', sequence_order: 7, metadata: { acceptanceCriteria: ['Função em ai-functions.ts', 'Zod validation'], complexity: 'M', isValidated: true } },
  { epic: 3, slug: 'prd-studio-story-3-8', title: 'Criar generateBrief Function', content: 'Como desenvolvedor, quero uma função AI para gerar o brief estruturado, para automatizar', sequence_order: 8, metadata: { acceptanceCriteria: ['Função em ai-functions.ts', 'Fallback data'], complexity: 'M', isValidated: true } },

  // Epic 4
  { epic: 4, slug: 'prd-studio-story-4-1', title: 'Criar PRDDocumentTemplate', content: 'Como usuário, quero ver todas seções do PRD em uma tela, para ter visão geral', sequence_order: 1, metadata: { acceptanceCriteria: ['Layout com 6 seções', 'Navegação por tabs'], complexity: 'M', isValidated: true } },
  { epic: 4, slug: 'prd-studio-story-4-2', title: 'Implementar ObjectivesSection', content: 'Como usuário, quero definir objetivos do projeto, para clarear o propósito', sequence_order: 2, metadata: { acceptanceCriteria: ['Lista de objetivos', 'Adicionar/remover'], complexity: 'M', isValidated: true } },
  { epic: 4, slug: 'prd-studio-story-4-3', title: 'Implementar DesignDecisionsSection', content: 'Como usuário, quero definir decisões de design, para guiar implementação', sequence_order: 3, metadata: { acceptanceCriteria: ['Telas listadas', 'Cores escolhidas'], complexity: 'G', isValidated: true } },
  { epic: 4, slug: 'prd-studio-story-4-4', title: 'Implementar RequirementsSection', content: 'Como usuário, quero listar requisitos funcionais e não-funcionais, para especificar', sequence_order: 4, metadata: { acceptanceCriteria: ['Requisitos FR/NFR', 'Priorização MoSCoW'], complexity: 'M', isValidated: true } },
  { epic: 4, slug: 'prd-studio-story-4-5', title: 'Implementar ArchitectureSection', content: 'Como usuário, quero definir arquitetura técnica, para guiar desenvolvimento', sequence_order: 5, metadata: { acceptanceCriteria: ['Stack definida', 'Integrações listadas'], complexity: 'M', isValidated: true } },
  { epic: 4, slug: 'prd-studio-story-4-6', title: 'Criar Sistema de Aprovação', content: 'Como usuário, quero aprovar/ajustar/rejeitar cada seção, para controlar qualidade', sequence_order: 6, metadata: { acceptanceCriteria: ['Botões 1-2-3', 'Feedback visual'], complexity: 'M', isValidated: true } },

  // Epic 5
  { epic: 5, slug: 'prd-studio-story-5-1', title: 'Criar PRDEpicsTemplate', content: 'Como usuário, quero ver épicos gerados pela AI, para organizar o desenvolvimento', sequence_order: 1, metadata: { acceptanceCriteria: ['Grid de épicos', 'Botão gerar AI'], complexity: 'M', isValidated: true } },
  { epic: 5, slug: 'prd-studio-story-5-2', title: 'Implementar Drag-Drop Épicos', content: 'Como usuário, quero reordenar épicos arrastando, para priorizar', sequence_order: 2, metadata: { acceptanceCriteria: ['@dnd-kit implementado', 'Persiste ordem'], complexity: 'M', isValidated: true } },
  { epic: 5, slug: 'prd-studio-story-5-3', title: 'Criar generateEpics Function', content: 'Como desenvolvedor, quero gerar épicos via AI, para automatizar', sequence_order: 3, metadata: { acceptanceCriteria: ['Função em ai-functions.ts', '3-7 épicos gerados'], complexity: 'M', isValidated: true } },
  { epic: 5, slug: 'prd-studio-story-5-4', title: 'Criar PRDStoriesTemplate', content: 'Como usuário, quero ver stories organizadas por épico, para detalhar trabalho', sequence_order: 4, metadata: { acceptanceCriteria: ['Accordion por épico', 'Lista de stories'], complexity: 'M', isValidated: true } },
  { epic: 5, slug: 'prd-studio-story-5-5', title: 'Implementar PRDStoryCard', content: 'Como usuário, quero cards visuais para cada story, para facilitar gestão', sequence_order: 5, metadata: { acceptanceCriteria: ['Card component', 'Mostra complexidade'], complexity: 'P', isValidated: true } },
  { epic: 5, slug: 'prd-studio-story-5-6', title: 'Criar generateStories Function', content: 'Como desenvolvedor, quero gerar stories via AI, para automatizar', sequence_order: 6, metadata: { acceptanceCriteria: ['Função em ai-functions.ts', '3-10 stories por épico'], complexity: 'M', isValidated: true } },
  { epic: 5, slug: 'prd-studio-story-5-7', title: 'Implementar Validation Service', content: 'Como desenvolvedor, quero validar stories automaticamente, para garantir qualidade', sequence_order: 7, metadata: { acceptanceCriteria: ['validation-service.ts criado', 'Verifica verbo inicial'], complexity: 'M', isValidated: true } },

  // Epic 6
  { epic: 6, slug: 'prd-studio-story-6-1', title: 'Criar PRDExportTemplate', content: 'Como usuário, quero escolher formato de export, para usar na ferramenta desejada', sequence_order: 1, metadata: { acceptanceCriteria: ['Grid de opções', '3 formatos disponíveis'], complexity: 'M', isValidated: true } },
  { epic: 6, slug: 'prd-studio-story-6-2', title: 'Implementar ExportOptionCard', content: 'Como usuário, quero cards visuais para cada formato, para comparar opções', sequence_order: 2, metadata: { acceptanceCriteria: ['Card component', 'Ícone por formato'], complexity: 'P', isValidated: true } },
  { epic: 6, slug: 'prd-studio-story-6-3', title: 'Criar generateLovableExport', content: 'Como usuário, quero export otimizado para Lovable, para criar projeto lá', sequence_order: 3, metadata: { acceptanceCriteria: ['Markdown otimizado', 'Vision + Features'], complexity: 'M', isValidated: true } },
  { epic: 6, slug: 'prd-studio-story-6-4', title: 'Criar generateClaudeExport', content: 'Como usuário, quero export otimizado para Claude Code, para usar no CLI', sequence_order: 4, metadata: { acceptanceCriteria: ['CLAUDE.md gerado', 'Estrutura .claude/'], complexity: 'M', isValidated: true } },
  { epic: 6, slug: 'prd-studio-story-6-5', title: 'Criar generateGenericExport', content: 'Como usuário, quero export genérico em Markdown, para usar em qualquer lugar', sequence_order: 5, metadata: { acceptanceCriteria: ['Markdown completo', 'TOC automático'], complexity: 'P', isValidated: true } },
  { epic: 6, slug: 'prd-studio-story-6-6', title: 'Implementar Preview Modal', content: 'Como usuário, quero ver preview antes de baixar, para verificar conteúdo', sequence_order: 6, metadata: { acceptanceCriteria: ['Modal fullscreen', 'Botão copiar'], complexity: 'M', isValidated: true } },
  { epic: 6, slug: 'prd-studio-story-6-7', title: 'Implementar Download ZIP', content: 'Como usuário, quero baixar como ZIP, para ter arquivos organizados', sequence_order: 7, metadata: { acceptanceCriteria: ['JSZip integrado', 'file-saver para download'], complexity: 'P', isValidated: true } }
];

// ============================================================================
// SEED FUNCTIONS
// ============================================================================

async function seedProject() {
  console.log('📦 Inserindo projeto PRD Studio...');

  const { data, error } = await supabase
    .from('content_projects')
    .upsert(PROJECT, { onConflict: 'slug' })
    .select('id')
    .single();

  if (error) {
    console.error('❌ Erro ao inserir projeto:', error.message);
    throw error;
  }

  console.log('✅ Projeto inserido:', data.id);
  return data.id;
}

async function seedEpics(projectId) {
  console.log('📚 Inserindo 6 épicos...');

  const epicsWithProject = EPICS.map(epic => ({
    ...epic,
    content_type: 'other', // Using 'other' until 'prd_epic' is added to constraint
    project_id: projectId,
    status: 'published' // Valid values: draft, reviewed, published, archived
  }));

  const { data, error } = await supabase
    .from('contents')
    .upsert(epicsWithProject, { onConflict: 'slug' })
    .select('id, slug, sequence_order');

  if (error) {
    console.error('❌ Erro ao inserir épicos:', error.message);
    throw error;
  }

  console.log('✅ Épicos inseridos:', data.length);
  return data;
}

async function seedStories(projectId, epics) {
  console.log('📝 Inserindo 41 stories...');

  // Map epic sequence_order to epic id
  const epicMap = {};
  epics.forEach(e => {
    epicMap[e.sequence_order] = e.id;
  });

  const storiesWithRefs = STORIES.map(story => ({
    content_type: 'other', // Using 'other' until 'prd_story' is added to constraint
    parent_content_id: epicMap[story.epic],
    slug: story.slug,
    title: story.title,
    content: story.content,
    project_id: projectId,
    sequence_order: story.sequence_order,
    status: 'published', // Valid values: draft, reviewed, published, archived
    metadata: { ...story.metadata, contentCategory: 'prd_story' }
  }));

  const { data, error } = await supabase
    .from('contents')
    .upsert(storiesWithRefs, { onConflict: 'slug' })
    .select('id');

  if (error) {
    console.error('❌ Erro ao inserir stories:', error.message);
    throw error;
  }

  console.log('✅ Stories inseridas:', data.length);
  return data;
}

async function verifyData(projectId) {
  console.log('\n🔍 Verificando dados inseridos...');

  // Count epics
  const { count: epicCount } = await supabase
    .from('contents')
    .select('*', { count: 'exact', head: true })
    .eq('project_id', projectId)
    .eq('content_type', 'prd_epic');

  // Count stories
  const { count: storyCount } = await supabase
    .from('contents')
    .select('*', { count: 'exact', head: true })
    .eq('project_id', projectId)
    .eq('content_type', 'prd_story');

  console.log(`   📊 Épicos: ${epicCount}`);
  console.log(`   📊 Stories: ${storyCount}`);

  return { epicCount, storyCount };
}

// ============================================================================
// MAIN
// ============================================================================

async function main() {
  console.log('🚀 PRD Studio Seed Script');
  console.log('='.repeat(50));
  console.log(`📡 Supabase URL: ${supabaseUrl}`);
  console.log('');

  try {
    const projectId = await seedProject();
    const epics = await seedEpics(projectId);
    await seedStories(projectId, epics);
    const { epicCount, storyCount } = await verifyData(projectId);

    console.log('\n' + '='.repeat(50));
    console.log('✅ Seed concluído com sucesso!');
    console.log(`   - 1 projeto PRD Studio`);
    console.log(`   - ${epicCount} épicos`);
    console.log(`   - ${storyCount} stories`);
    console.log('\n🌐 Acesse: http://localhost:5174/prd');

  } catch (err) {
    console.error('\n❌ Seed falhou:', err.message);
    process.exit(1);
  }
}

main();

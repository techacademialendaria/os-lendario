/**
 * Script: Import AIOS Course to Database
 * Purpose: Registrar o curso AIOS completo no Supabase
 * Usage: node app/scripts/import-aios-course.mjs
 */

import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import { readdir, readFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Load environment variables
dotenv.config({ path: path.join(rootDir, '.env.local') });
dotenv.config({ path: path.join(rootDir, '.env') });

// Config
const SUPABASE_URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('❌ Missing SUPABASE_URL or SUPABASE_KEY');
  console.log('Set: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (or SUPABASE_ANON_KEY)');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const projectRoot = path.resolve(__dirname, '../..');
const COURSE_DIR = path.join(projectRoot, 'outputs/courses/aios');
const LESSONS_DIR = path.join(COURSE_DIR, 'lessons');

// Course metadata
const courseData = {
  slug: 'aios_framework_course',
  name: 'AIOS: Framework Universal de Agentes IA',
  description: 'Curso completo sobre o Synkra AIOS - um framework de desenvolvimento auto-modificável alimentado por IA. 19 módulos, 73 aulas.',
  project_type: 'course',
  status: 'completed',
  project_metadata: {
    version: '1.0.0',
    total_modules: 19,
    total_lessons: 73,
    estimated_duration_hours: 12,
    language: 'pt-BR',
    source: 'github.com/SynkraAI/aios-core',
    generated_by: 'Course Architect Agent',
    generated_at: new Date().toISOString(),
    qa_score: 88.5,
    instructor_persona: 'Pedro Valério Lopez'
  }
};

// Module order map
const moduleOrder = {
  '01-introducao': 1,
  '02-os-agentes': 2,
  '03-user-guide': 3,
  '04-instalacao': 4,
  '05-arquitetura-core': 5,
  '06-arquitetura-agentes': 6,
  '07-infraestrutura': 7,
  '08-guias-sistema': 8,
  '09-template-engine': 9,
  '10-brownfield': 10,
  '11-squads': 11,
  '12-exemplos-squads': 12,
  '13-git-workflow': 13,
  '14-versionamento': 14,
  '15-boas-praticas': 15,
  '16-meta-commands': 16,
  '17-framework-standards': 17,
  '18-comunidade': 18,
  '19-specs': 19
};

async function main() {
  console.log('🚀 Importing AIOS Course to Database...\n');

  // Step 1: Insert or update the course project
  console.log('📦 Step 1: Creating course project...');

  const { data: existingProject, error: fetchError } = await supabase
    .from('content_projects')
    .select('id')
    .eq('slug', courseData.slug)
    .single();

  let projectId;

  if (existingProject) {
    // Update existing
    const { data: updated, error: updateError } = await supabase
      .from('content_projects')
      .update({
        ...courseData,
        updated_at: new Date().toISOString()
      })
      .eq('slug', courseData.slug)
      .select('id')
      .single();

    if (updateError) {
      console.error('❌ Failed to update project:', updateError);
      process.exit(1);
    }
    projectId = updated.id;
    console.log(`   ✅ Updated existing project: ${projectId}`);
  } else {
    // Insert new
    const { data: inserted, error: insertError } = await supabase
      .from('content_projects')
      .insert(courseData)
      .select('id')
      .single();

    if (insertError) {
      console.error('❌ Failed to insert project:', insertError);
      process.exit(1);
    }
    projectId = inserted.id;
    console.log(`   ✅ Created new project: ${projectId}`);
  }

  // Step 2: Delete existing lessons for this project
  console.log('\n🧹 Step 2: Clearing existing lessons...');

  const { error: deleteError } = await supabase
    .from('contents')
    .delete()
    .eq('project_id', projectId);

  if (deleteError) {
    console.error('❌ Failed to delete existing lessons:', deleteError);
  } else {
    console.log('   ✅ Cleared existing lessons');
  }

  // Step 3: Create modules first
  console.log('\n📁 Step 3: Creating modules...');

  const modules = await readdir(LESSONS_DIR);
  const sortedModules = modules.sort((a, b) => {
    const orderA = moduleOrder[a] || 999;
    const orderB = moduleOrder[b] || 999;
    return orderA - orderB;
  });

  // Module name mapping for prettier titles
  const moduleNames = {
    '01-introducao': 'Introdução ao AIOS',
    '02-os-agentes': 'Os Agentes',
    '03-user-guide': 'Guia do Usuário',
    '04-instalacao': 'Instalação e Setup',
    '05-arquitetura-core': 'Arquitetura Core',
    '06-arquitetura-agentes': 'Arquitetura de Agentes',
    '07-infraestrutura': 'Infraestrutura e Integrações',
    '08-guias-sistema': 'Guias de Sistema',
    '09-template-engine': 'Template Engine',
    '10-brownfield': 'Projetos Existentes (Brownfield)',
    '11-squads': 'Sistema de Squads',
    '12-exemplos-squads': 'Exemplos de Squads',
    '13-git-workflow': 'Workflow Git',
    '14-versionamento': 'Versionamento e Migração',
    '15-boas-praticas': 'Boas Práticas',
    '16-meta-commands': 'Meta-Agent Commands',
    '17-framework-standards': 'Padrões do Framework',
    '18-comunidade': 'Comunidade',
    '19-specs': 'Especificações Técnicas'
  };

  const moduleIdMap = {}; // Map module name -> UUID

  for (const moduleName of sortedModules) {
    const moduleNum = moduleOrder[moduleName] || 0;
    const moduleSlug = `aios_module_${moduleName}`.replace(/-/g, '_');
    const moduleTitle = moduleNames[moduleName] || moduleName;

    const moduleData = {
      slug: moduleSlug,
      title: `Módulo ${moduleNum}: ${moduleTitle}`,
      content_type: 'course_module',
      content: null,
      sequence_order: moduleNum,
      project_id: projectId,
      ai_generated: true,
      status: 'published',
      file_path: path.join(LESSONS_DIR, moduleName),
      metadata: {
        module_name: moduleName,
        module_number: moduleNum,
        display_name: moduleTitle
      }
    };

    const { data: moduleRecord, error: moduleError } = await supabase
      .from('contents')
      .insert(moduleData)
      .select('id')
      .single();

    if (moduleError) {
      console.error(`   ❌ Failed to create module ${moduleName}:`, moduleError);
    } else {
      moduleIdMap[moduleName] = moduleRecord.id;
      console.log(`   ✅ Módulo ${moduleNum}: ${moduleTitle} (${moduleRecord.id})`);
    }
  }

  // Step 4: Read and insert all lessons with parent_content_id
  console.log('\n📚 Step 4: Importing lessons...');

  let totalLessons = 0;
  const allLessons = [];

  for (const moduleName of sortedModules) {
    const modulePath = path.join(LESSONS_DIR, moduleName);
    const moduleNum = moduleOrder[moduleName] || 0;
    const parentModuleId = moduleIdMap[moduleName];

    try {
      const files = await readdir(modulePath);
      const mdFiles = files.filter(f => f.endsWith('.md')).sort();

      for (let i = 0; i < mdFiles.length; i++) {
        const filePath = path.join(modulePath, mdFiles[i]);
        const content = await readFile(filePath, 'utf-8');

        // Extract title from first line
        const titleMatch = content.match(/^#\s+(.+)/);
        const title = titleMatch ? titleMatch[1].trim() : mdFiles[i].replace('.md', '');

        // Create slug from filename
        const lessonSlug = `aios_${moduleName}_${mdFiles[i].replace('.md', '')}`.replace(/-/g, '_');

        // Calculate sequence order (e.g., 1.1, 1.2, 2.1, etc.)
        const sequenceOrder = moduleNum * 100 + (i + 1);

        allLessons.push({
          slug: lessonSlug,
          title: title,
          content_type: 'course_lesson',
          content: content,
          parent_content_id: parentModuleId, // Link to module
          sequence_order: sequenceOrder,
          project_id: projectId,
          ai_generated: true,
          status: 'published',
          file_path: filePath,
          metadata: {
            module: moduleName,
            module_number: moduleNum,
            lesson_number: i + 1,
            filename: mdFiles[i]
          }
        });

        totalLessons++;
      }

      console.log(`   📁 ${moduleName}: ${mdFiles.length} lessons → parent: ${parentModuleId?.substring(0, 8)}...`);
    } catch (err) {
      console.log(`   ⚠️ Skipping ${moduleName}: ${err.message}`);
    }
  }

  // Batch insert lessons (in chunks of 50)
  console.log(`\n💾 Inserting ${totalLessons} lessons...`);

  const chunkSize = 50;
  let inserted = 0;

  for (let i = 0; i < allLessons.length; i += chunkSize) {
    const chunk = allLessons.slice(i, i + chunkSize);

    const { error: batchError } = await supabase
      .from('contents')
      .insert(chunk);

    if (batchError) {
      console.error(`❌ Failed to insert lessons ${i}-${i + chunk.length}:`, batchError);
    } else {
      inserted += chunk.length;
      console.log(`   ✅ Inserted ${inserted}/${totalLessons} lessons`);
    }
  }

  // Summary
  const modulesCreated = Object.keys(moduleIdMap).length;

  console.log('\n' + '='.repeat(50));
  console.log('📊 IMPORT COMPLETE');
  console.log('='.repeat(50));
  console.log(`   Project ID: ${projectId}`);
  console.log(`   Course: ${courseData.name}`);
  console.log(`   Modules: ${modulesCreated} (content_type: course_module)`);
  console.log(`   Lessons: ${inserted}/${totalLessons} (content_type: course_lesson)`);
  console.log(`   Parent links: ${inserted} lessons → ${modulesCreated} modules`);
  console.log(`   Status: ${inserted === totalLessons && modulesCreated === sortedModules.length ? '✅ SUCCESS' : '⚠️ PARTIAL'}`);
  console.log('='.repeat(50));
}

main().catch(console.error);

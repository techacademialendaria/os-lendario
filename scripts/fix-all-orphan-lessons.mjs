#!/usr/bin/env node
/**
 * Fix orphan lessons for ALL courses
 *
 * Strategy:
 * 1. For each course, get modules ordered by sequence_order
 * 2. For each lesson, extract module number from title (e.g., "1.2" -> module 1)
 * 3. Map lesson to correct module by sequence_order
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '../..');

dotenv.config({ path: path.join(rootDir, '.env') });

const supabase = createClient(
  process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL,
  process.env.SUPABASE_Secret_key
);

/**
 * Extract module number from lesson title or slug
 * Examples:
 *   "1.2 - Title" -> 1
 *   "Aula 2.5 - Title" -> 2
 *   "Lesson 3.1: Title" -> 3
 *   "Dia 3: Title" -> 3
 *   "licao-1-2-title" -> 1
 */
function extractModuleNumber(title, slug) {
  // Try title first - various patterns
  const patterns = [
    /^(\d+)\.\d+/,                    // "1.2 - Title"
    /^Aula\s+(\d+)\.\d+/i,            // "Aula 1.2 - Title"
    /^Lesson\s+(\d+)\.\d+/i,          // "Lesson 1.2: Title"
    /^Lição\s+(\d+)\.\d+/i,           // "Lição 1.2 - Title"
    /^Dia\s+(\d+)/i,                  // "Dia 3: Title"
    /^Módulo\s+(\d+)/i,               // "Módulo 1 - Title"
    /^M(\d+)/i,                       // "M1 - Title"
  ];

  for (const pattern of patterns) {
    const match = title?.match(pattern);
    if (match) {
      return parseInt(match[1], 10);
    }
  }

  // Try slug - patterns like "course-licao-1-2" or "course-1-2-title"
  const slugPatterns = [
    /-licao-(\d+)-\d+/i,              // "-licao-1-2"
    /-lesson-(\d+)-\d+/i,             // "-lesson-1-2"
    /-(\d+)-\d+-[a-z]/i,              // "-1-2-title"
    /-modulo-(\d+)-/i,                // "-modulo-1-"
  ];

  for (const pattern of slugPatterns) {
    const match = slug?.match(pattern);
    if (match) {
      return parseInt(match[1], 10);
    }
  }

  return null;
}

async function fixCourse(project) {
  console.log(`\n📚 ${project.name}`);
  console.log('─'.repeat(50));

  // Get modules for this project
  const { data: modules, error: modErr } = await supabase
    .from('contents')
    .select('id, title, sequence_order')
    .eq('project_id', project.id)
    .eq('content_type', 'course_module')
    .is('deleted_at', null)
    .order('sequence_order');

  if (modErr || !modules?.length) {
    console.log('  ⚠️  No modules found - skipping');
    return { fixed: 0, skipped: 0, errors: 0 };
  }

  // Create map: sequence_order -> module_id
  const moduleMap = {};
  modules.forEach(m => {
    moduleMap[m.sequence_order] = m.id;
  });
  console.log(`  📦 ${modules.length} modules found`);

  // Get lessons
  const { data: lessons, error: lesErr } = await supabase
    .from('contents')
    .select('id, title, slug, parent_content_id')
    .eq('project_id', project.id)
    .eq('content_type', 'course_lesson')
    .is('deleted_at', null);

  if (lesErr || !lessons?.length) {
    console.log('  ⚠️  No lessons found - skipping');
    return { fixed: 0, skipped: 0, errors: 0 };
  }

  // Check which lessons are orphans
  const moduleIds = new Set(modules.map(m => m.id));
  const orphans = lessons.filter(l => !moduleIds.has(l.parent_content_id));

  if (orphans.length === 0) {
    console.log(`  ✅ ${lessons.length} lessons - all OK`);
    return { fixed: 0, skipped: lessons.length, errors: 0 };
  }

  console.log(`  📄 ${lessons.length} lessons, ${orphans.length} orphans to fix`);

  let fixed = 0;
  let skipped = 0;
  let errors = 0;

  for (const lesson of orphans) {
    const moduleNum = extractModuleNumber(lesson.title, lesson.slug);

    if (!moduleNum) {
      console.log(`  ⚠️  Could not determine module for: ${lesson.title}`);
      skipped++;
      continue;
    }

    const correctParentId = moduleMap[moduleNum];

    if (!correctParentId) {
      console.log(`  ⚠️  Module ${moduleNum} not found for: ${lesson.title}`);
      skipped++;
      continue;
    }

    // Update
    const { error: updateErr } = await supabase
      .from('contents')
      .update({ parent_content_id: correctParentId })
      .eq('id', lesson.id);

    if (updateErr) {
      console.log(`  ❌ ${lesson.title}: ${updateErr.message}`);
      errors++;
    } else {
      console.log(`  ✅ ${lesson.title} -> módulo ${moduleNum}`);
      fixed++;
    }
  }

  return { fixed, skipped, errors };
}

async function main() {
  console.log('🔧 Fixing orphan lessons for ALL courses\n');
  console.log('═'.repeat(60));

  // Get all projects
  const { data: projects, error: projErr } = await supabase
    .from('content_projects')
    .select('id, slug, name')
    .order('name');

  if (projErr || !projects?.length) {
    console.error('❌ Could not fetch projects:', projErr?.message);
    return;
  }

  console.log(`Found ${projects.length} projects\n`);

  let totalFixed = 0;
  let totalSkipped = 0;
  let totalErrors = 0;

  for (const project of projects) {
    const stats = await fixCourse(project);
    totalFixed += stats.fixed;
    totalSkipped += stats.skipped;
    totalErrors += stats.errors;
  }

  console.log('\n' + '═'.repeat(60));
  console.log('📊 SUMMARY');
  console.log('═'.repeat(60));
  console.log(`   Fixed:   ${totalFixed}`);
  console.log(`   Skipped: ${totalSkipped}`);
  console.log(`   Errors:  ${totalErrors}`);
  console.log('═'.repeat(60));
}

main();

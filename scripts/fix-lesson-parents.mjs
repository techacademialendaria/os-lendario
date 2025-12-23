#!/usr/bin/env node
/**
 * Fix parent_content_id for lessons in Dominando Obsidian course
 *
 * Problem: All 22 lessons have parent_content_id pointing to wrong ID
 * Solution: Map lessons to correct modules based on curriculum.yaml lesson IDs
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

// Mapping from curriculum.yaml: lesson ID prefix -> module sequence_order
const LESSON_MODULE_MAP = {
  '1': 1, // 1.1, 1.2, 1.3, 1.4 -> Módulo 1
  '2': 2, // 2.1, 2.2, 2.3 -> Módulo 2
  '3': 3, // 3.1, 3.2, 3.3, 3.4 -> Módulo 3
  '4': 4, // 4.1, 4.2, 4.3 -> Módulo 4
  '5': 5, // 5.1, 5.2, 5.3, 5.4 -> Módulo 5
  '6': 6, // 6.1, 6.2, 6.3, 6.4 -> Módulo 6
};

async function fix() {
  console.log('🔧 Fixing lesson parent_content_id...\n');

  // 1. Get project
  const { data: project, error: projErr } = await supabase
    .from('content_projects')
    .select('id, slug, name')
    .eq('slug', 'dominando-obsidian')
    .single();

  if (projErr || !project) {
    console.error('❌ Project not found:', projErr?.message);
    return;
  }
  console.log('📚 Project:', project.name, '(id:', project.id, ')');

  // 2. Get modules with their slugs
  const { data: modules, error: modErr } = await supabase
    .from('contents')
    .select('id, slug, title, sequence_order')
    .eq('project_id', project.id)
    .eq('content_type', 'course_module')
    .is('deleted_at', null)
    .order('sequence_order');

  if (modErr || !modules?.length) {
    console.error('❌ Modules not found:', modErr?.message);
    return;
  }

  console.log('\n📦 Modules found:');
  const moduleMap = {}; // sequence_order -> id
  modules.forEach(m => {
    console.log(`  ${m.sequence_order}. ${m.title} (id: ${m.id})`);
    moduleMap[m.sequence_order] = m.id;
  });

  // 3. Get lessons
  const { data: lessons, error: lesErr } = await supabase
    .from('contents')
    .select('id, slug, title, parent_content_id, sequence_order')
    .eq('project_id', project.id)
    .eq('content_type', 'course_lesson')
    .is('deleted_at', null)
    .order('sequence_order');

  if (lesErr || !lessons?.length) {
    console.error('❌ Lessons not found:', lesErr?.message);
    return;
  }

  console.log(`\n📄 ${lessons.length} lessons to fix:\n`);

  // 4. Fix each lesson
  let fixed = 0;
  let skipped = 0;
  let errors = 0;

  for (const lesson of lessons) {
    // Extract lesson number from slug (e.g., "1-1-por-que-voce-precisa" -> "1")
    // or from title (e.g., "1.1 - Por Que Você Precisa..." -> "1")
    let moduleNum = null;

    // Try slug first (format: "1-1-title" or "1.1-title")
    const slugMatch = lesson.slug?.match(/^(\d+)[-.]?\d*/);
    if (slugMatch) {
      moduleNum = slugMatch[1];
    }

    // Try title if slug didn't work (format: "1.1 - Title" or "5.3 - Title")
    if (!moduleNum) {
      const titleMatch = lesson.title?.match(/^(\d+)\.\d+/);
      if (titleMatch) {
        moduleNum = titleMatch[1];
      }
    }

    if (!moduleNum) {
      console.log(`  ⚠️  ${lesson.title} - Could not determine module`);
      skipped++;
      continue;
    }

    const moduleSeq = LESSON_MODULE_MAP[moduleNum];
    const correctParentId = moduleMap[moduleSeq];

    if (!correctParentId) {
      console.log(`  ⚠️  ${lesson.title} - Module ${moduleSeq} not found in DB`);
      skipped++;
      continue;
    }

    // Check if already correct
    if (lesson.parent_content_id === correctParentId) {
      console.log(`  ✓  ${lesson.title} - Already correct`);
      skipped++;
      continue;
    }

    // Update
    const { error: updateErr } = await supabase
      .from('contents')
      .update({ parent_content_id: correctParentId })
      .eq('id', lesson.id);

    if (updateErr) {
      console.log(`  ❌ ${lesson.title} - Error: ${updateErr.message}`);
      errors++;
    } else {
      console.log(`  ✅ ${lesson.title} -> módulo ${moduleSeq}`);
      fixed++;
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log('📊 Summary:');
  console.log(`   Fixed: ${fixed}`);
  console.log(`   Skipped: ${skipped}`);
  console.log(`   Errors: ${errors}`);
  console.log('='.repeat(60));

  // 5. Verify by re-checking
  if (fixed > 0) {
    console.log('\n🔍 Verification - Lessons by module:');
    for (const mod of modules) {
      const { count } = await supabase
        .from('contents')
        .select('*', { count: 'exact', head: true })
        .eq('project_id', project.id)
        .eq('content_type', 'course_lesson')
        .eq('parent_content_id', mod.id)
        .is('deleted_at', null);

      console.log(`   ${mod.title}: ${count} lições`);
    }
  }
}

fix();

#!/usr/bin/env node
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

async function check() {
  const { data: projects } = await supabase
    .from('content_projects')
    .select('id, slug, name')
    .order('name');

  console.log('📚 Checking all courses for orphan lessons:\n');

  for (const proj of projects) {
    const { data: modules } = await supabase
      .from('contents')
      .select('id')
      .eq('project_id', proj.id)
      .eq('content_type', 'course_module')
      .is('deleted_at', null);

    const moduleIds = modules?.map(m => m.id) || [];

    const { data: lessons } = await supabase
      .from('contents')
      .select('id, parent_content_id, title')
      .eq('project_id', proj.id)
      .eq('content_type', 'course_lesson')
      .is('deleted_at', null);

    if (!lessons?.length) {
      console.log(`  ${proj.name}: 0 lições`);
      continue;
    }

    const orphans = lessons.filter(l => !moduleIds.includes(l.parent_content_id));

    if (orphans.length > 0) {
      console.log(`❌ ${proj.name}: ${lessons.length} lições, ${orphans.length} ORPHANS`);
      orphans.slice(0, 3).forEach(o => console.log(`     - ${o.title}`));
      if (orphans.length > 3) console.log(`     ... and ${orphans.length - 3} more`);
    } else {
      console.log(`✅ ${proj.name}: ${lessons.length} lições OK`);
    }
  }
}

check();

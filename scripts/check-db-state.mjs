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
  console.log('🔍 Checking database state...\n');

  // 1. fragments.relevance (20251027100000)
  const { error: fragErr } = await supabase.from('fragments').select('relevance').limit(1);
  console.log('✓ fragments.relevance:', fragErr ? '❌ ' + fragErr.message : '✅ exists');

  // 2. content_projects.creator_mind_id (20251028120000)
  const { error: cpErr } = await supabase.from('content_projects').select('creator_mind_id').limit(1);
  console.log('✓ content_projects.creator_mind_id:', cpErr ? '❌ ' + cpErr.message : '✅ exists');

  // 3. project_minds table (20251210190000)
  const { error: pmErr } = await supabase.from('project_minds').select('*').limit(1);
  console.log('✓ project_minds table:', pmErr ? '❌ ' + pmErr.message : '✅ exists');

  // 4. agent_scans table (20251028_v0_9_0)
  const { error: asErr } = await supabase.from('agent_scans').select('*').limit(1);
  console.log('✓ agent_scans table:', asErr ? '❌ ' + asErr.message : '✅ exists');

  // 5. v_content_counts_by_category view (20251211170000)
  const { error: vErr } = await supabase.from('v_content_counts_by_category').select('*').limit(1);
  console.log('✓ v_content_counts_by_category:', vErr ? '❌ ' + vErr.message : '✅ exists');

  // 6. v_content_counts_by_project view
  const { error: v2Err } = await supabase.from('v_content_counts_by_project').select('*').limit(1);
  console.log('✓ v_content_counts_by_project:', v2Err ? '❌ ' + v2Err.message : '✅ exists');

  // 7. v_dashboard_stats view
  const { error: v3Err } = await supabase.from('v_dashboard_stats').select('*').limit(1);
  console.log('✓ v_dashboard_stats:', v3Err ? '❌ ' + v3Err.message : '✅ exists');

  console.log('\n📋 Summary of migrations needed:');
  if (vErr) console.log('   → 20251211170000_content_counts_view.sql needs to be applied');
  if (pmErr) console.log('   → 20251210190000_project_minds.sql needs to be applied');
  if (asErr) console.log('   → 20251028_v0_9_0_agent_scans.sql needs to be applied');
}

check();

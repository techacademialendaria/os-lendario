#!/usr/bin/env node
/**
 * Apply content_type constraint migration via Supabase REST API
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const appDir = path.resolve(__dirname, '..');
const rootDir = path.resolve(appDir, '..');

dotenv.config({ path: path.join(rootDir, '.env.local') });
dotenv.config({ path: path.join(rootDir, '.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_Secret_key || process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey || supabaseKey === 'your-service-role-key') {
  console.error('❌ Need SUPABASE_SERVICE_ROLE_KEY (or SUPABASE_Secret_key) for DDL operations');
  console.error('   Found URL:', supabaseUrl ? 'yes' : 'no');
  console.error('   Found Service Key:', supabaseKey && supabaseKey !== 'your-service-role-key' ? 'yes' : 'no');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Test: try inserting with new content_type to see if constraint exists
async function testConstraint() {
  const testRecord = {
    id: crypto.randomUUID(),
    project_id: '00000000-0000-0000-0000-000000000000', // Will fail FK but let's see the error
    content_type: 'course_planning',
    slug: 'test-constraint-' + Date.now(),
    title: 'Test',
    content: 'test',
  };

  const { error } = await supabase.from('contents').insert(testRecord);

  if (error) {
    if (error.message.includes('content_type_check')) {
      console.log('❌ Constraint still blocks new types. Need to update it.');
      return false;
    } else if (error.message.includes('foreign key') || error.message.includes('project_id')) {
      console.log('✅ Constraint allows new types (FK error expected)');
      return true;
    } else {
      console.log('⚠️  Unexpected error:', error.message);
      return null;
    }
  }

  // Should not reach here, but clean up if it does
  await supabase.from('contents').delete().eq('id', testRecord.id);
  console.log('✅ Insert succeeded (unexpected but good)');
  return true;
}

async function main() {
  console.log('🔍 Testing content_type constraint...\n');

  const result = await testConstraint();

  if (result === true) {
    console.log('\n✅ Constraint already supports new types. No migration needed.');
    console.log('   You can run the document migration now.');
  } else if (result === false) {
    console.log('\n📋 To fix, run this SQL in Supabase Dashboard > SQL Editor:\n');
    console.log(`
-- Drop existing constraint
ALTER TABLE contents DROP CONSTRAINT IF EXISTS contents_content_type_check;

-- Add new constraint with expanded types
ALTER TABLE contents
ADD CONSTRAINT contents_content_type_check CHECK (
    content_type IN (
        'course_module', 'course_lesson', 'course_outline',
        'assessment_quiz', 'assessment_exercise', 'assessment_project', 'assessment_certification',
        'resource_template', 'resource_checklist', 'resource_guide', 'resource_tool', 'resource_reading',
        'course_planning', 'course_output', 'course_report', 'course_qa',
        'course_brief', 'course_curriculum', 'market_intelligence', 'learning_objectives',
        'blog_post', 'video_script', 'social_post', 'email_sequence', 'lead_magnet',
        'sales_page', 'webinar_script', 'podcast_episode', 'newsletter'
    )
);
    `);
  }
}

main().catch(console.error);

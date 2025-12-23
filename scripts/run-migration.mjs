/**
 * Run SQL migration directly via Supabase client
 * Usage: node app/scripts/run-migration.mjs
 */
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

// Use service role key for schema changes
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function runMigration() {
  console.log('Running migration to add mind_sources and prd project types...\n');

  // Drop existing constraint
  const { error: dropError } = await supabase.rpc('exec_sql', {
    sql: `
      DO $$
      DECLARE
          v_constraint_name TEXT;
      BEGIN
          SELECT conname INTO v_constraint_name
          FROM pg_constraint
          WHERE conrelid = 'content_projects'::regclass
            AND conname LIKE '%project_type%';

          IF v_constraint_name IS NOT NULL THEN
              EXECUTE format('ALTER TABLE content_projects DROP CONSTRAINT %I', v_constraint_name);
              RAISE NOTICE 'Dropped constraint: %', v_constraint_name;
          END IF;
      END $$;
    `
  });

  if (dropError) {
    console.log('Note: Could not drop constraint via RPC (expected if no exec_sql function)');
    console.log('Please run the migration manually via Supabase dashboard SQL editor:');
    console.log('File: supabase/migrations/20251216151000_add_mind_sources_project_type.sql');
    return;
  }

  console.log('Constraint dropped. Adding new constraint...');

  // Add new constraint
  const { error: addError } = await supabase.rpc('exec_sql', {
    sql: `
      ALTER TABLE content_projects
      ADD CONSTRAINT content_projects_project_type_check CHECK (
          project_type IN (
              'mind_artifacts', 'mind_prompts', 'mind_sources',
              'course', 'webinar_series', 'ebook', 'book', 'documentation', 'research',
              'blog_series', 'video_series', 'podcast_series', 'newsletter_series', 'social_campaign',
              'landing_page', 'sales_page',
              'ad_campaign', 'launch_campaign', 'evergreen_funnel', 'pr_campaign',
              'email_sequence', 'upsell_sequence', 'sales_funnel',
              'brand_kit', 'media_kit', 'testimonial_collection', 'swipe_file',
              'prd'
          )
      );
    `
  });

  if (addError) {
    console.error('Error adding constraint:', addError.message);
    return;
  }

  console.log('Migration completed successfully!');
}

runMigration();

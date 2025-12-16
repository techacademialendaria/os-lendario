/**
 * Import Mind History to Supabase
 *
 * Imports history YAML from outputs/minds/{slug}/history.yaml
 * to the contents table with content_type = 'mind_history'
 *
 * Usage: node app/scripts/import-mind-history.mjs alan_nicolas
 *    or: node app/scripts/import-mind-history.mjs alan_nicolas /path/to/history.yaml
 */

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env
import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function getMindBySlug(slug) {
  const { data, error } = await supabase
    .from('minds')
    .select('id, display_name, slug')
    .eq('slug', slug)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return null;
    }
    throw error;
  }

  return data;
}

async function getOrCreateProject(mindId, mindSlug) {
  // Check if project exists
  const { data: existing, error: findError } = await supabase
    .from('content_projects')
    .select('id, slug')
    .eq('persona_mind_id', mindId)
    .eq('project_type', 'mind_artifacts')
    .single();

  if (findError && findError.code !== 'PGRST116') {
    throw findError;
  }

  if (existing) {
    console.log(`  Found existing project: ${existing.slug}`);
    return existing;
  }

  // Create new project
  const projectSlug = `${mindSlug}-artifacts`;
  const { data: created, error: createError } = await supabase
    .from('content_projects')
    .insert({
      persona_mind_id: mindId,
      project_type: 'mind_artifacts',
      slug: projectSlug,
      name: `${mindSlug} Mind Artifacts`,
      status: 'in_progress'
    })
    .select()
    .single();

  if (createError) {
    throw createError;
  }

  console.log(`  Created new project: ${projectSlug}`);
  return created;
}

async function upsertHistoryContent(projectId, mindSlug, yamlContent, sourceFile) {
  const slug = `history-timeline-${mindSlug}`;
  const title = 'Historia e Timeline';

  // Check if content exists
  const { data: existing, error: findError } = await supabase
    .from('contents')
    .select('id')
    .eq('project_id', projectId)
    .eq('content_type', 'mind_history')
    .single();

  if (findError && findError.code !== 'PGRST116') {
    throw findError;
  }

  const contentData = {
    project_id: projectId,
    content_type: 'mind_history',
    slug,
    title,
    content: yamlContent,
    status: 'published',
    metadata: {
      source_file: sourceFile,
      imported_at: new Date().toISOString(),
      format: 'yaml'
    }
  };

  if (existing) {
    // Update existing
    const { error: updateError } = await supabase
      .from('contents')
      .update(contentData)
      .eq('id', existing.id);

    if (updateError) {
      throw updateError;
    }

    console.log(`  Updated existing history content`);
  } else {
    // Insert new
    const { error: insertError } = await supabase
      .from('contents')
      .insert(contentData);

    if (insertError) {
      throw insertError;
    }

    console.log(`  Inserted new history content`);
  }
}

async function main() {
  const mindSlug = process.argv[2];
  let yamlPath = process.argv[3];

  if (!mindSlug) {
    console.error('Usage: node app/scripts/import-mind-history.mjs <mind_slug> [yaml_path]');
    console.error('Example: node app/scripts/import-mind-history.mjs alan_nicolas');
    process.exit(1);
  }

  // Default YAML path
  if (!yamlPath) {
    yamlPath = path.resolve(__dirname, `../../outputs/minds/${mindSlug}/history.yaml`);
  }

  console.log(`\nImporting history for mind: ${mindSlug}`);
  console.log(`YAML path: ${yamlPath}`);

  // Check if YAML file exists
  if (!fs.existsSync(yamlPath)) {
    console.error(`\nError: YAML file not found: ${yamlPath}`);
    console.error('Create a history.yaml file or specify the path as second argument.');
    process.exit(1);
  }

  // Read YAML content
  const yamlContent = fs.readFileSync(yamlPath, 'utf-8');
  console.log(`  Read ${yamlContent.length} bytes from YAML file`);

  // Get mind
  const mind = await getMindBySlug(mindSlug);
  if (!mind) {
    console.error(`\nError: Mind not found with slug: ${mindSlug}`);
    process.exit(1);
  }
  console.log(`  Found mind: ${mind.display_name} (${mind.id})`);

  // Get or create project
  const project = await getOrCreateProject(mind.id, mindSlug);

  // Upsert history content
  await upsertHistoryContent(project.id, mindSlug, yamlContent, yamlPath);

  console.log(`\nDone! History imported successfully.`);
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});

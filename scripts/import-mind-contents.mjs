/**
 * Import Mind Contents to Supabase
 *
 * Imports artifacts, system_prompts, and kb files from outputs/minds/{slug}/
 * to the contents table with ai_generated = false
 *
 * Usage: node app/scripts/import-mind-contents.mjs alan_nicolas
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

// Category mapping based on file location/name
const getCategoryFromPath = (filePath) => {
  if (filePath.includes('system_prompts')) return 'system_prompt';
  if (filePath.includes('identity-core')) return 'identity';
  if (filePath.includes('cognitive-spec')) return 'cognitive';
  if (filePath.includes('frameworks')) return 'framework';
  if (filePath.includes('communication')) return 'communication';
  if (filePath.includes('decision')) return 'decision';
  if (filePath.includes('values') || filePath.includes('layer-6')) return 'values';
  if (filePath.includes('obsessions') || filePath.includes('layer-7')) return 'obsessions';
  if (filePath.includes('paradoxes') || filePath.includes('layer-8')) return 'paradoxes';
  if (filePath.includes('mental-models') || filePath.includes('layer-5')) return 'mental_models';
  if (filePath.includes('memory')) return 'memory';
  if (filePath.includes('tools')) return 'tools';
  if (filePath.includes('psychometric')) return 'psychometric';
  if (filePath.includes('kb/')) return 'knowledge_base';
  return 'other';
};

// Content type based on file location
const getContentType = (filePath) => {
  if (filePath.includes('system_prompts')) return 'mind_prompts';
  return 'other'; // Using 'other' since mind_artifacts might not be in DB yet
};

// Generate slug from filename
const generateSlug = (filename) => {
  return filename
    .replace(/\.(md|yaml|json)$/, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
};

// Generate title from filename
const generateTitle = (filename) => {
  return filename
    .replace(/\.(md|yaml|json)$/, '')
    .split(/[-_]/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

// Read file content
const readFileContent = (filePath) => {
  try {
    return fs.readFileSync(filePath, 'utf-8');
  } catch (err) {
    console.error(`Error reading ${filePath}:`, err.message);
    return null;
  }
};

// Get all content files from a directory recursively
const getContentFiles = (dir, baseDir = dir) => {
  const files = [];

  if (!fs.existsSync(dir)) {
    return files;
  }

  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      // Skip certain directories
      if (['sources', 'logs', 'docs'].includes(entry.name)) continue;
      files.push(...getContentFiles(fullPath, baseDir));
    } else if (entry.isFile()) {
      // Only include md, yaml, json files
      if (/\.(md|yaml|json)$/.test(entry.name)) {
        // Skip hidden files and temp files
        if (entry.name.startsWith('.') || entry.name.startsWith('!')) continue;
        files.push({
          fullPath,
          relativePath: path.relative(baseDir, fullPath),
          filename: entry.name
        });
      }
    }
  }

  return files;
};

async function importMindContents(mindSlug) {
  console.log(`\n🧠 Importing contents for mind: ${mindSlug}\n`);

  // 1. Get mind from database
  const { data: mind, error: mindError } = await supabase
    .from('minds')
    .select('id, slug, display_name')
    .eq('slug', mindSlug)
    .is('deleted_at', null)
    .single();

  if (mindError || !mind) {
    console.error(`Mind "${mindSlug}" not found:`, mindError?.message);
    process.exit(1);
  }

  console.log(`✓ Found mind: ${mind.display_name} (${mind.id})`);

  // 2. Get or create content_project for this mind's artifacts
  let { data: project, error: projectError } = await supabase
    .from('content_projects')
    .select('id, slug')
    .eq('persona_mind_id', mind.id)
    .eq('project_type', 'mind_artifacts')
    .single();

  if (projectError?.code === 'PGRST116') {
    // Create new project
    const { data: newProject, error: createError } = await supabase
      .from('content_projects')
      .insert({
        persona_mind_id: mind.id,
        project_type: 'mind_artifacts',
        slug: `mind-artifacts-${mindSlug}`,
        name: `${mind.display_name} Artifacts`,
        status: 'active',
      })
      .select('id, slug')
      .single();

    if (createError) {
      console.error('Error creating project:', createError.message);
      process.exit(1);
    }

    project = newProject;
    console.log(`✓ Created project: ${project.slug}`);
  } else if (projectError) {
    console.error('Error fetching project:', projectError.message);
    process.exit(1);
  } else {
    console.log(`✓ Using existing project: ${project.slug}`);
  }

  // 3. Get content files
  const mindsDir = path.resolve(__dirname, '../../outputs/minds', mindSlug);

  // Collect files from artifacts and system_prompts
  const artifactsDir = path.join(mindsDir, 'artifacts');
  const promptsDir = path.join(mindsDir, 'system_prompts');
  const kbDir = path.join(mindsDir, 'kb');

  const allFiles = [
    ...getContentFiles(artifactsDir).map(f => ({ ...f, source: 'artifacts' })),
    ...getContentFiles(promptsDir).map(f => ({ ...f, source: 'system_prompts' })),
    ...getContentFiles(kbDir).map(f => ({ ...f, source: 'kb' })),
  ];

  console.log(`\n📁 Found ${allFiles.length} files to import\n`);

  // 4. Import each file
  let imported = 0;
  let skipped = 0;
  let errors = 0;

  for (const file of allFiles) {
    const content = readFileContent(file.fullPath);
    if (!content) {
      errors++;
      continue;
    }

    const slug = generateSlug(file.filename);
    const title = generateTitle(file.filename);
    const category = getCategoryFromPath(file.relativePath);
    const contentType = getContentType(file.relativePath);

    // Check if already exists
    const { data: existing } = await supabase
      .from('contents')
      .select('id')
      .eq('project_id', project.id)
      .eq('slug', slug)
      .single();

    if (existing) {
      console.log(`⏭️  Skip (exists): ${file.relativePath}`);
      skipped++;
      continue;
    }

    // Insert content
    const { error: insertError } = await supabase
      .from('contents')
      .insert({
        project_id: project.id,
        slug,
        title,
        content,
        content_type: contentType,
        ai_generated: false, // IMPORTANT: Original content, not AI generated
        status: 'published',
        metadata: {
          category,
          source_file: file.relativePath,
          source_dir: file.source,
          imported_at: new Date().toISOString(),
          file_extension: path.extname(file.filename),
        },
      });

    if (insertError) {
      console.error(`❌ Error importing ${file.relativePath}:`, insertError.message);
      errors++;
    } else {
      console.log(`✅ Imported: ${file.relativePath} -> ${slug}`);
      imported++;
    }
  }

  // 5. Summary
  console.log(`\n${'='.repeat(50)}`);
  console.log(`📊 Import Summary for ${mind.display_name}`);
  console.log(`${'='.repeat(50)}`);
  console.log(`✅ Imported: ${imported}`);
  console.log(`⏭️  Skipped:  ${skipped}`);
  console.log(`❌ Errors:   ${errors}`);
  console.log(`📁 Total:    ${allFiles.length}`);
  console.log(`${'='.repeat(50)}\n`);
}

// Main
const mindSlug = process.argv[2];
if (!mindSlug) {
  console.error('Usage: node app/scripts/import-mind-contents.mjs <mind_slug>');
  console.error('Example: node app/scripts/import-mind-contents.mjs alan_nicolas');
  process.exit(1);
}

importMindContents(mindSlug);

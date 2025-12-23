/**
 * Import Mind Sources to Supabase
 *
 * Imports original source files from outputs/minds/{slug}/sources/
 * to the contents table with appropriate content_type
 *
 * Usage: node app/scripts/import-mind-sources.mjs alan_nicolas [--dry-run]
 */
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Content type mapping based on directory and filename patterns
const getContentType = (relativePath, filename) => {
  const lowerPath = relativePath.toLowerCase();
  const lowerName = filename.toLowerCase();

  // Cursos - map to specific course subtypes
  if (lowerPath.includes('cursos/')) {
    if (lowerName.includes('q&a') || lowerName.includes('qa')) return 'course_qa';
    if (lowerName.includes('módulos') || lowerName.includes('modulos') || lowerName.includes('aulas')) return 'course_lesson';
    if (lowerName.includes('glossário') || lowerName.includes('glossario')) return 'resource_guide';
    if (lowerName.includes('resumo')) return 'course_outline';
    if (lowerName.includes('material')) return 'resource_reading';
    if (lowerName.includes('documentação') || lowerName.includes('documentacao')) return 'resource_guide';
    return 'course_module';
  }

  // Newsletter
  if (lowerPath.includes('newsletter/')) return 'newsletter';

  // Podcast
  if (lowerPath.includes('podcast/')) return 'podcast_episode';

  // Videos (transcripts)
  if (lowerPath.includes('videos/')) return 'video_transcript';

  // Interviews
  if (lowerPath.includes('interviews/')) return 'interview';

  // Articles
  if (lowerPath.includes('articles/')) return 'article';

  // Self-analysis
  if (lowerPath.includes('self-analysis/') || lowerPath.includes('self_analysis/')) return 'essay';

  // Profile JSON
  if (lowerName.includes('profile') && lowerName.endsWith('.json')) return 'other';

  // Default
  return 'other';
};

// Generate slug from filename
const generateSlug = (filename, parentDir) => {
  const base = filename
    .replace(/\.(md|yaml|json|srt|txt)$/i, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 80); // Limit length

  // Add parent dir prefix for uniqueness
  const prefix = parentDir
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 20);

  return prefix ? `${prefix}-${base}` : base;
};

// Generate title from filename
const generateTitle = (filename) => {
  return filename
    .replace(/\.(md|yaml|json|srt|txt)$/i, '')
    .replace(/[_-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 200);
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

// Get category from path
const getCategoryFromPath = (relativePath) => {
  const parts = relativePath.split('/');
  return parts[0] || 'other';
};

// Get all source files recursively
const getSourceFiles = (dir, baseDir = dir) => {
  const files = [];

  if (!fs.existsSync(dir)) {
    return files;
  }

  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      files.push(...getSourceFiles(fullPath, baseDir));
    } else if (entry.isFile()) {
      // Include md, yaml, json, srt, txt files
      if (/\.(md|yaml|json|srt|txt)$/i.test(entry.name)) {
        // Skip hidden files, temp files, and system files
        if (entry.name.startsWith('.') || entry.name.startsWith('!')) continue;
        if (entry.name === 'sources_master.yaml') continue; // Skip index file
        if (entry.name.includes('inventory')) continue;

        const relativePath = path.relative(baseDir, fullPath);
        const parentDir = path.dirname(relativePath).split('/').pop() || '';

        files.push({
          fullPath,
          relativePath,
          filename: entry.name,
          parentDir,
        });
      }
    }
  }

  return files;
};

async function importMindSources(mindSlug, dryRun = false) {
  console.log(`\n🧠 Importing sources for mind: ${mindSlug}${dryRun ? ' (DRY RUN)' : ''}\n`);

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

  // 2. Get or create content_project for sources
  let { data: project, error: projectError } = await supabase
    .from('content_projects')
    .select('id, slug')
    .eq('persona_mind_id', mind.id)
    .eq('project_type', 'mind_sources')
    .single();

  if (projectError?.code === 'PGRST116') {
    if (dryRun) {
      console.log(`Would create project: mind-sources-${mindSlug}`);
      project = { id: 'dry-run-id', slug: `mind-sources-${mindSlug}` };
    } else {
      const { data: newProject, error: createError } = await supabase
        .from('content_projects')
        .insert({
          persona_mind_id: mind.id,
          project_type: 'mind_sources',
          slug: `mind-sources-${mindSlug}`,
          name: `${mind.display_name} - Original Sources`,
          status: 'completed',
        })
        .select('id, slug')
        .single();

      if (createError) {
        console.error('Error creating project:', createError.message);
        process.exit(1);
      }

      project = newProject;
      console.log(`✓ Created project: ${project.slug}`);
    }
  } else if (projectError) {
    console.error('Error fetching project:', projectError.message);
    process.exit(1);
  } else {
    console.log(`✓ Using existing project: ${project.slug}`);
  }

  // 3. Get source files
  const sourcesDir = path.resolve(__dirname, '../../outputs/minds', mindSlug, 'sources');

  if (!fs.existsSync(sourcesDir)) {
    console.error(`Sources directory not found: ${sourcesDir}`);
    process.exit(1);
  }

  const allFiles = getSourceFiles(sourcesDir);
  console.log(`\n📁 Found ${allFiles.length} source files\n`);

  // 4. Group by content type for summary
  const byType = {};
  allFiles.forEach(f => {
    const type = getContentType(f.relativePath, f.filename);
    byType[type] = (byType[type] || 0) + 1;
  });

  console.log('📂 By content_type:');
  Object.entries(byType).sort((a, b) => b[1] - a[1]).forEach(([type, count]) => {
    console.log(`  - ${type}: ${count}`);
  });
  console.log('');

  // 5. Import each file
  let imported = 0;
  let skipped = 0;
  let errors = 0;

  for (const file of allFiles) {
    const content = readFileContent(file.fullPath);
    if (!content) {
      errors++;
      continue;
    }

    const slug = generateSlug(file.filename, file.parentDir);
    const title = generateTitle(file.filename);
    const contentType = getContentType(file.relativePath, file.filename);
    const category = getCategoryFromPath(file.relativePath);

    if (dryRun) {
      console.log(`Would import: [${contentType}] ${file.relativePath} -> ${slug}`);
      imported++;
      continue;
    }

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
        ai_generated: false,
        status: 'published',
        metadata: {
          category,
          source_file: file.relativePath,
          source_type: 'original',
          imported_at: new Date().toISOString(),
          file_extension: path.extname(file.filename),
        },
      });

    if (insertError) {
      console.error(`❌ Error: ${file.relativePath}:`, insertError.message);
      errors++;
    } else {
      console.log(`✅ [${contentType}] ${file.relativePath}`);
      imported++;
    }
  }

  // 6. Summary
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
const dryRun = process.argv.includes('--dry-run');

if (!mindSlug) {
  console.error('Usage: node app/scripts/import-mind-sources.mjs <mind_slug> [--dry-run]');
  console.error('Example: node app/scripts/import-mind-sources.mjs alan_nicolas --dry-run');
  process.exit(1);
}

importMindSources(mindSlug, dryRun);

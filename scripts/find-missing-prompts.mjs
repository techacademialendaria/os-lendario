/**
 * Find prompt files in outputs that are not in the DB
 */

import { createClient } from "@supabase/supabase-js";
import { readdir, lstat } from 'fs/promises';
import { join, basename, dirname } from 'path';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const OUTPUTS_DIR = '../outputs/minds';
const META_FILES = ['CHANGELOG', 'DEPRECATED', 'VALIDATION', 'README'];

// Mapping from folder names to DB slugs
const SLUG_MAP = {
  'adriano_de_marqui': 'adriano-de-marqui',
  'jose_amorim': 'jose-carlos-amorim'
};

async function getAllPromptFiles() {
  const files = [];
  const entries = await readdir(OUTPUTS_DIR, { withFileTypes: true });

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const mindSlug = entry.name;
    const systemPromptsDir = join(OUTPUTS_DIR, mindSlug, 'system_prompts');

    try {
      await scanDir(systemPromptsDir, mindSlug, '', files);
    } catch {
      // No system_prompts dir
    }
  }

  return files;
}

async function scanDir(dir, mindSlug, relativePath, files) {
  const entries = await readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    const relPath = relativePath ? `${relativePath}/${entry.name}` : entry.name;

    if (entry.isDirectory()) {
      await scanDir(fullPath, mindSlug, relPath, files);
    } else if (entry.name.endsWith('.md')) {
      // Skip meta files
      if (META_FILES.some(m => entry.name.includes(m))) continue;

      // Check if symlink
      const stats = await lstat(fullPath);
      if (stats.isSymbolicLink()) continue;

      files.push({
        mindSlug,
        sourcePath: `system_prompts/${relPath}`,
        fullPath
      });
    }
  }
}

async function main() {
  const files = await getAllPromptFiles();
  console.log(`Found ${files.length} prompt files in outputs`);
  console.log();

  // Get all prompts from DB
  const { data: prompts } = await supabase
    .from('contents')
    .select('id, title, metadata')
    .eq('content_type', 'mind_prompts');

  // Create set of source paths in DB
  const dbPaths = new Set();
  for (const p of prompts) {
    if (p.metadata?.source_file && p.metadata?.mind_slug) {
      dbPaths.add(`${p.metadata.mind_slug}:${p.metadata.source_file}`);
    }
  }

  console.log(`Found ${prompts.length} prompts in DB`);
  console.log();

  // Find missing
  const missing = files.filter(f => !dbPaths.has(`${f.mindSlug}:${f.sourcePath}`));

  if (missing.length > 0) {
    console.log(`=== ${missing.length} MISSING FILES ===`);
    for (const m of missing) {
      console.log(`- ${m.mindSlug}/${m.sourcePath}`);
    }
  } else {
    console.log('All files are in DB!');
  }
}

main().catch(console.error);

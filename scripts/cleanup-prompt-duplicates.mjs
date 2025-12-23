/**
 * Cleanup duplicate prompts in contents table
 * - Removes entries with same source_file path (keeps newest)
 * - Removes entries from symlinks
 */

import { createClient } from "@supabase/supabase-js";
import { lstat } from 'fs/promises';
import { join } from 'path';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const OUTPUTS_DIR = '../outputs/minds';

async function isSymlink(mindSlug, sourceFile) {
  try {
    const fullPath = join(OUTPUTS_DIR, mindSlug, sourceFile);
    const stats = await lstat(fullPath);
    return stats.isSymbolicLink();
  } catch {
    return false;
  }
}

async function main() {
  console.log('='.repeat(60));
  console.log('CLEANUP: Duplicate prompts in contents table');
  console.log('='.repeat(60));
  console.log();

  // Get all prompts
  const { data: prompts, error } = await supabase
    .from('contents')
    .select('id, title, metadata, created_at')
    .eq('content_type', 'mind_prompts')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching prompts:', error);
    return;
  }

  console.log(`Found ${prompts.length} total prompts`);
  console.log();

  // Group by source_file
  const bySourceFile = new Map();
  const toDelete = [];

  for (const prompt of prompts) {
    const sourceFile = prompt.metadata?.source_file;
    const mindSlug = prompt.metadata?.mind_slug;

    if (!sourceFile) {
      console.log(`[SKIP] No source_file: ${prompt.title}`);
      continue;
    }

    // Check if symlink
    if (mindSlug && await isSymlink(mindSlug, sourceFile)) {
      console.log(`[SYMLINK] ${prompt.title} → DELETE`);
      toDelete.push(prompt.id);
      continue;
    }

    const key = `${mindSlug}:${sourceFile}`;
    if (bySourceFile.has(key)) {
      // This is a duplicate (older one since we sorted by created_at desc)
      console.log(`[DUPLICATE] ${prompt.title}`);
      console.log(`            keeping: ${bySourceFile.get(key).title}`);
      toDelete.push(prompt.id);
    } else {
      bySourceFile.set(key, prompt);
    }
  }

  console.log();
  console.log(`Found ${toDelete.length} entries to delete`);

  if (toDelete.length > 0) {
    console.log();
    console.log('Deleting duplicates...');

    const { error: deleteError } = await supabase
      .from('contents')
      .delete()
      .in('id', toDelete);

    if (deleteError) {
      console.error('Error deleting:', deleteError);
    } else {
      console.log(`Deleted ${toDelete.length} entries`);
    }
  }

  // Final count
  const { count } = await supabase
    .from('contents')
    .select('id', { count: 'exact' })
    .eq('content_type', 'mind_prompts');

  console.log();
  console.log('='.repeat(60));
  console.log(`Prompts remaining: ${count}`);
  console.log('='.repeat(60));
}

main().catch(console.error);

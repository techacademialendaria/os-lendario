#!/usr/bin/env node

/**
 * Batch Import Mind Histories to Supabase
 *
 * Validates and imports all history.yaml files to Supabase database.
 * Supports parallel and sequential modes.
 *
 * Usage: node app/scripts/import-all-histories.mjs
 *    or: node app/scripts/import-all-histories.mjs --parallel [concurrency]
 *    or: node app/scripts/import-all-histories.mjs --dry-run
 *    or: node app/scripts/import-all-histories.mjs [pattern]
 */

import { createClient } from '@supabase/supabase-js';
import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env
import dotenv from 'dotenv';
dotenv.config();

const MINDS_DIR = path.resolve(__dirname, '../../outputs/minds');
const DRY_RUN = process.argv.includes('--dry-run');
const PARALLEL = process.argv.includes('--parallel');
const CONCURRENCY = parseInt(process.argv[process.argv.indexOf('--parallel') + 1]) || 5;
const PATTERN = process.argv.slice(2).find(arg =>
  !arg.startsWith('--') && !arg.match(/^\d+$/)
) || '*';

let stats = {
  total: 0,
  completed: 0,
  failed: 0,
  skipped: 0,
  errors: [],
  start_time: new Date()
};

async function getMindBySlug(supabase, slug) {
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

async function importSingleMind(mindSlug) {
  return new Promise((resolve) => {
    const script = path.resolve(__dirname, 'import-mind-history.mjs');
    const child = spawn('node', [script, mindSlug], {
      cwd: __dirname,
      stdio: 'pipe',
      env: process.env
    });

    let output = '';
    let errorOutput = '';

    child.stdout.on('data', (data) => {
      output += data.toString();
    });

    child.stderr.on('data', (data) => {
      errorOutput += data.toString();
    });

    child.on('close', (code) => {
      resolve({
        mindSlug,
        success: code === 0,
        output,
        error: errorOutput,
        code
      });
    });
  });
}

async function processSequential(minds) {
  console.log(`Processing ${minds.length} minds sequentially...\n`);

  for (const mindSlug of minds) {
    const result = await importSingleMind(mindSlug);

    if (result.success) {
      stats.completed++;
      console.log(`✅ ${mindSlug} (${stats.completed}/${minds.length})`);
    } else {
      stats.failed++;
      console.log(`❌ ${mindSlug} (${stats.completed}/${minds.length})`);
      console.log(`   Error: ${result.error || 'Unknown error'}`);
      stats.errors.push({ mind: mindSlug, error: result.error });
    }
  }
}

async function processParallel(minds, concurrency) {
  console.log(`Processing ${minds.length} minds in parallel (concurrency: ${concurrency})...\n`);

  let queue = [...minds];
  let running = 0;
  let completed = 0;

  return new Promise((resolve) => {
    const processNext = async () => {
      if (queue.length === 0 && running === 0) {
        resolve();
        return;
      }

      if (queue.length > 0 && running < concurrency) {
        running++;
        const mindSlug = queue.shift();

        try {
          const result = await importSingleMind(mindSlug);
          completed++;

          if (result.success) {
            stats.completed++;
            console.log(`✅ ${mindSlug} (${stats.completed}/${minds.length})`);
          } else {
            stats.failed++;
            console.log(`❌ ${mindSlug}`);
            stats.errors.push({ mind: mindSlug, error: result.error });
          }
        } catch (error) {
          stats.failed++;
          console.log(`❌ ${mindSlug} - Exception: ${error.message}`);
          stats.errors.push({ mind: mindSlug, error: error.message });
        } finally {
          running--;
          processNext();
        }
      }

      setTimeout(processNext, 100);
    };

    processNext();
  });
}

async function main() {
  console.log(`\n🚀 BATCH IMPORT Mind Histories`);
  console.log(`Mode: ${DRY_RUN ? 'DRY-RUN (no changes)' : PARALLEL ? `PARALLEL (concurrency: ${CONCURRENCY})` : 'SEQUENTIAL'}`);
  console.log(`Pattern: ${PATTERN}`);
  console.log(`---\n`);

  // Find minds with history.yaml
  const mindDirs = fs.readdirSync(MINDS_DIR).filter(dir => {
    const fullPath = path.join(MINDS_DIR, dir);
    const historyPath = path.join(fullPath, 'history.yaml');
    return fs.statSync(fullPath).isDirectory() &&
           fs.existsSync(historyPath) &&
           (PATTERN === '*' || dir.includes(PATTERN));
  }).sort();

  if (mindDirs.length === 0) {
    console.log(`❌ No minds found with history.yaml matching pattern: ${PATTERN}`);
    process.exit(1);
  }

  stats.total = mindDirs.length;

  console.log(`Found ${mindDirs.length} minds with history.yaml\n`);

  if (DRY_RUN) {
    console.log('📋 DRY-RUN: Would import these minds:');
    mindDirs.forEach((mind, idx) => {
      console.log(`  ${idx + 1}. ${mind}`);
    });
    console.log(`\nRun without --dry-run to actually import.\n`);
    process.exit(0);
  }

  // Process minds
  if (PARALLEL) {
    await processParallel(mindDirs, CONCURRENCY);
  } else {
    await processSequential(mindDirs);
  }

  // Summary
  const duration = Math.round((new Date() - stats.start_time) / 1000);
  console.log(`\n---\n`);
  console.log(`📊 IMPORT SUMMARY`);
  console.log(`Total:    ${stats.total}`);
  console.log(`✅ Completed: ${stats.completed}/${stats.total} (${Math.round(stats.completed/stats.total*100)}%)`);
  console.log(`❌ Failed:    ${stats.failed}/${stats.total}`);
  console.log(`Duration: ${duration}s`);

  if (stats.errors.length > 0) {
    console.log(`\n❌ IMPORT FAILED\n`);
    console.log('Errors:');
    stats.errors.forEach(err => {
      console.log(`  - ${err.mind}: ${err.error}`);
    });
    process.exit(1);
  } else {
    console.log(`\n✅ ALL IMPORTS COMPLETED\n`);
    process.exit(0);
  }
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});

#!/usr/bin/env node
/**
 * CreatorOS Migration Script - Course Documents to Supabase
 *
 * Migrates course planning, output, report, and QA documents
 * from local filesystem to Supabase contents table.
 *
 * Usage:
 *   node scripts/migrate-course-docs.mjs [--dry-run] [--course=slug]
 *
 * Options:
 *   --dry-run    Show what would be migrated without inserting
 *   --course=X   Only migrate specific course
 */

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import yaml from 'yaml';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import crypto from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const appDir = path.resolve(__dirname, '..');
const rootDir = path.resolve(appDir, '..');

// Load environment variables
dotenv.config({ path: path.join(rootDir, '.env.local') });
dotenv.config({ path: path.join(rootDir, '.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
// Prefer service role for writes, fallback to anon key
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_PUBLISHABLE_KEY || process.env.SUPABASE_ANON_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Parse CLI args
const args = process.argv.slice(2);
const DRY_RUN = args.includes('--dry-run');
const courseArg = args.find(a => a.startsWith('--course='));
const SPECIFIC_COURSE = courseArg ? courseArg.split('=')[1] : null;

// Migration timestamp for rollback
const MIGRATION_ID = new Date().toISOString().split('T')[0];

// ============================================================================
// File Pattern Mappings
// ============================================================================

const FILE_MAPPINGS = [
  // Planning docs
  { pattern: /^COURSE-BRIEF.*\.md$/i, type: 'course_planning', subtype: 'brief' },
  { pattern: /^curriculum\.yaml$/i, type: 'course_planning', subtype: 'curriculum' },
  { pattern: /^course-outline\.md$/i, type: 'course_planning', subtype: 'outline' },

  // Output docs
  { pattern: /^CURSO-COMPLETO.*\.md$/i, type: 'course_output', subtype: 'compiled' },
  { pattern: /^CURSO-PRONTO.*\.md$/i, type: 'course_output', subtype: 'compiled' },
  { pattern: /^FINAL-SUMMARY.*\.md$/i, type: 'course_output', subtype: 'summary' },
  { pattern: /^SUMARIO-EXECUTIVO.*\.md$/i, type: 'course_output', subtype: 'summary' },
  { pattern: /^README\.md$/i, type: 'course_output', subtype: 'readme' },
  { pattern: /^modulo-.*\.md$/i, type: 'course_output', subtype: 'module_content' },

  // Report docs
  { pattern: /^GENERATION-STATUS.*\.md$/i, type: 'course_report', subtype: 'progress' },
  { pattern: /^PROGRESS-REPORT.*\.md$/i, type: 'course_report', subtype: 'progress' },
  { pattern: /^RELATORIO_.*\.md$/i, type: 'course_report', subtype: 'module_report' },
  { pattern: /^CONTEXTO_.*\.md$/i, type: 'course_report', subtype: 'context' },
  { pattern: /^PROMPT_.*\.md$/i, type: 'course_report', subtype: 'prompt' },
  { pattern: /^SESSAO_.*\.md$/i, type: 'course_report', subtype: 'session' },

  // QA docs
  { pattern: /^VALIDACAO.*\.md$/i, type: 'course_qa', subtype: 'validation' },
  { pattern: /^VALIDATION-REPORT.*\.md$/i, type: 'course_qa', subtype: 'validation' },
  { pattern: /^avaliacao-.*\.md$/i, type: 'course_qa', subtype: 'review' },
];

// ============================================================================
// Helper Functions
// ============================================================================

function generateSlug(courseSlug, filename, subtype) {
  const baseName = filename.replace(/\.[^.]+$/, '').toLowerCase().replace(/[^a-z0-9]+/g, '-');
  return `${courseSlug}-${subtype}-${baseName}`.replace(/-+/g, '-').replace(/-$/, '');
}

function generateTitle(filename, subtype) {
  // Remove extension and clean up
  const baseName = filename.replace(/\.[^.]+$/, '');

  // Map subtypes to readable titles
  const subtypeTitles = {
    'brief': 'Course Brief',
    'curriculum': 'Curriculum',
    'outline': 'Course Outline',
    'compiled': 'Full Course Content',
    'summary': 'Executive Summary',
    'readme': 'README',
    'module_content': 'Module Content',
    'progress': 'Progress Report',
    'module_report': 'Module Report',
    'context': 'Context Document',
    'prompt': 'Generation Prompt',
    'session': 'Session Notes',
    'validation': 'Validation Report',
    'review': 'Review Document',
  };

  return subtypeTitles[subtype] || baseName.replace(/[-_]/g, ' ');
}

function matchFile(filename) {
  for (const mapping of FILE_MAPPINGS) {
    if (mapping.pattern.test(filename)) {
      return mapping;
    }
  }
  return null;
}

async function findFilesToMigrate(coursePath) {
  const files = [];

  function scanDirectory(dir, relativePath = '') {
    if (!fs.existsSync(dir)) return;

    const entries = fs.readdirSync(dir);
    for (const entry of entries) {
      const fullPath = path.join(dir, entry);
      const relPath = relativePath ? `${relativePath}/${entry}` : entry;
      const stat = fs.statSync(fullPath);

      if (stat.isFile()) {
        const mapping = matchFile(entry);
        if (mapping) {
          files.push({
            filename: entry,
            fullPath,
            relativePath: relPath,
            ...mapping,
          });
        }
      } else if (stat.isDirectory() && entry !== 'lessons' && entry !== 'assessments' && entry !== 'resources' && entry !== 'research') {
        // Recurse into subdirectories (except core content folders)
        scanDirectory(fullPath, relPath);
      }
    }
  }

  scanDirectory(coursePath);
  return files;
}

async function checkExistingContent(projectId, slug) {
  const { data } = await supabase
    .from('contents')
    .select('id')
    .eq('project_id', projectId)
    .eq('slug', slug)
    .is('deleted_at', null)
    .limit(1);

  return data && data.length > 0;
}

async function insertContent(projectId, file, courseSlug, content) {
  const slug = generateSlug(courseSlug, file.filename, file.subtype);

  // Check if already exists
  const exists = await checkExistingContent(projectId, slug);
  if (exists) {
    return { status: 'skipped', reason: 'already exists', slug };
  }

  const record = {
    id: crypto.randomUUID(),
    project_id: projectId,
    content_type: file.type,
    slug,
    title: generateTitle(file.filename, file.subtype),
    content,
    metadata: {
      subtype: file.subtype,
      source_file: file.relativePath,
      migrated_at: MIGRATION_ID,
    },
    ai_generated: false,
    status: 'published',
    file_path: `outputs/courses/${courseSlug}/${file.relativePath}`,
  };

  if (DRY_RUN) {
    return { status: 'dry-run', record };
  }

  const { error } = await supabase.from('contents').insert(record);

  if (error) {
    return { status: 'error', error: error.message, slug };
  }

  return { status: 'inserted', slug };
}

// ============================================================================
// Main Migration
// ============================================================================

async function migrateCourse(courseSlug) {
  const coursePath = path.join(rootDir, 'outputs/courses', courseSlug);

  if (!fs.existsSync(coursePath)) {
    console.log(`   ⚠️  Course path not found: ${coursePath}`);
    return { migrated: 0, skipped: 0, errors: 0 };
  }

  // Get project ID
  const { data: projects, error: projectError } = await supabase
    .from('content_projects')
    .select('id, slug')
    .eq('slug', courseSlug);

  if (projectError) {
    console.log(`   ⚠️  Error fetching project: ${projectError.message}`);
    return { migrated: 0, skipped: 0, errors: 0 };
  }

  if (!projects || projects.length === 0) {
    console.log(`   ⚠️  Project not found in Supabase: ${courseSlug}`);
    return { migrated: 0, skipped: 0, errors: 0 };
  }

  const project = projects[0];

  const files = await findFilesToMigrate(coursePath);
  let migrated = 0, skipped = 0, errors = 0;

  for (const file of files) {
    const content = fs.readFileSync(file.fullPath, 'utf-8');
    const result = await insertContent(project.id, file, courseSlug, content);

    if (result.status === 'inserted' || result.status === 'dry-run') {
      console.log(`      ✅ ${file.type}/${file.subtype}: ${file.filename}`);
      migrated++;
    } else if (result.status === 'skipped') {
      console.log(`      ⏭️  ${file.filename} (${result.reason})`);
      skipped++;
    } else if (result.status === 'error') {
      console.log(`      ❌ ${file.filename}: ${result.error}`);
      errors++;
    }
  }

  // Also migrate embedded data from curriculum.yaml
  const curriculumPath = path.join(coursePath, 'curriculum.yaml');
  if (fs.existsSync(curriculumPath)) {
    const curriculumContent = fs.readFileSync(curriculumPath, 'utf-8');
    let curriculum;
    try {
      curriculum = yaml.parse(curriculumContent);
    } catch (e) {
      if (e.code === 'MULTIPLE_DOCS') {
        const docs = yaml.parseAllDocuments(curriculumContent);
        curriculum = docs[0]?.toJSON();
      }
    }

    // Migrate market_intelligence if exists
    if (curriculum?.market_intelligence) {
      const miContent = yaml.stringify(curriculum.market_intelligence);
      const miFile = {
        filename: 'market-intelligence.yaml',
        relativePath: 'market-intelligence.yaml',
        type: 'course_planning',
        subtype: 'market_intelligence',
      };
      const result = await insertContent(project.id, miFile, courseSlug, miContent);
      if (result.status === 'inserted' || result.status === 'dry-run') {
        console.log(`      ✅ ${miFile.type}/${miFile.subtype}: extracted from curriculum`);
        migrated++;
      } else if (result.status === 'skipped') {
        skipped++;
      }
    }

    // Migrate learning_objectives if exists
    if (curriculum?.learning_objectives?.length > 0) {
      const loContent = yaml.stringify(curriculum.learning_objectives);
      const loFile = {
        filename: 'learning-objectives.yaml',
        relativePath: 'learning-objectives.yaml',
        type: 'course_planning',
        subtype: 'learning_objectives',
      };
      const result = await insertContent(project.id, loFile, courseSlug, loContent);
      if (result.status === 'inserted' || result.status === 'dry-run') {
        console.log(`      ✅ ${loFile.type}/${loFile.subtype}: extracted from curriculum`);
        migrated++;
      } else if (result.status === 'skipped') {
        skipped++;
      }
    }
  }

  return { migrated, skipped, errors };
}

async function main() {
  console.log('🚀 CreatorOS Document Migration\n');

  if (DRY_RUN) {
    console.log('📋 DRY RUN MODE - No changes will be made\n');
  }

  console.log(`Migration ID: ${MIGRATION_ID}\n`);
  console.log('='.repeat(60));

  const coursesDir = path.join(rootDir, 'outputs/courses');
  const SKIP_FOLDERS = ['no-migration', '.DS_Store'];

  let courseSlugs = fs.readdirSync(coursesDir).filter(f =>
    fs.statSync(path.join(coursesDir, f)).isDirectory() && !SKIP_FOLDERS.includes(f)
  );

  if (SPECIFIC_COURSE) {
    courseSlugs = courseSlugs.filter(s => s === SPECIFIC_COURSE);
    if (courseSlugs.length === 0) {
      console.error(`❌ Course not found: ${SPECIFIC_COURSE}`);
      process.exit(1);
    }
  }

  let totalMigrated = 0, totalSkipped = 0, totalErrors = 0;

  for (const slug of courseSlugs) {
    console.log(`\n📚 ${slug}`);
    const result = await migrateCourse(slug);
    totalMigrated += result.migrated;
    totalSkipped += result.skipped;
    totalErrors += result.errors;
  }

  console.log('\n' + '='.repeat(60));
  console.log('\n📊 Migration Summary\n');
  console.log(`   ✅ Migrated: ${totalMigrated}`);
  console.log(`   ⏭️  Skipped:  ${totalSkipped}`);
  console.log(`   ❌ Errors:   ${totalErrors}`);

  if (DRY_RUN) {
    console.log('\n📋 This was a dry run. Run without --dry-run to apply changes.');
  } else if (totalMigrated > 0) {
    console.log(`\n💡 To rollback, run:`);
    console.log(`   DELETE FROM contents WHERE metadata->>'migrated_at' = '${MIGRATION_ID}';`);
  }
}

main().catch(console.error);

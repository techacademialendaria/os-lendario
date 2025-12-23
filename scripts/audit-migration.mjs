#!/usr/bin/env node
/**
 * CreatorOS Migration Audit Script
 *
 * Compares curriculum.yaml files with Supabase data to verify migration completeness.
 *
 * Usage (from app/ directory):
 *   node scripts/audit-migration.mjs
 */

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import yaml from 'yaml';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const appDir = path.resolve(__dirname, '..');
const rootDir = path.resolve(appDir, '..');

// Load environment variables
dotenv.config({ path: path.join(rootDir, '.env.local') });
dotenv.config({ path: path.join(rootDir, '.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_PUBLISHABLE_KEY || process.env.SUPABASE_Publishable_key || process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials.');
  console.error('   Set SUPABASE_URL and one of: SUPABASE_Publishable_key, SUPABASE_ANON_KEY');
  console.error('   Found URL:', supabaseUrl ? 'yes' : 'no');
  console.error('   Found Key:', supabaseKey ? 'yes' : 'no');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// ============================================================================
// Audit Functions
// ============================================================================

async function loadCurriculumYaml(coursePath) {
  const yamlPath = path.join(coursePath, 'curriculum.yaml');
  if (!fs.existsSync(yamlPath)) {
    return null;
  }
  const content = fs.readFileSync(yamlPath, 'utf-8');
  try {
    // Try single document first
    return yaml.parse(content);
  } catch (e) {
    if (e.code === 'MULTIPLE_DOCS') {
      // Handle multiple documents - return first one
      const docs = yaml.parseAllDocuments(content);
      return docs[0]?.toJSON() || null;
    }
    throw e;
  }
}

// Helper to count files matching patterns
function countFilesMatching(dir, patterns) {
  if (!fs.existsSync(dir)) return 0;
  let count = 0;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isFile()) {
      for (const pattern of patterns) {
        if (pattern instanceof RegExp ? pattern.test(file) : file === pattern) {
          count++;
          break;
        }
      }
    } else if (stat.isDirectory()) {
      // Recurse into subdirectories
      count += countFilesMatching(filePath, patterns);
    }
  }
  return count;
}

async function auditCourse(courseSlug) {
  const coursePath = path.join(rootDir, 'outputs/courses', courseSlug);
  const curriculum = await loadCurriculumYaml(coursePath);

  const result = {
    courseSlug,
    courseTitle: curriculum?.title || courseSlug,
    local: {
      // Core content
      modules: 0,
      lessons: 0,
      assessments: 0,
      resources: 0,
      // Planning docs
      planning: {
        brief: false,
        curriculum: false,
        outline: false,
      },
      // Output docs
      output: {
        compiled: 0,    // CURSO-COMPLETO.md, CURSO-PRONTO-PARA-USAR.md
        summary: 0,     // FINAL-SUMMARY.md, SUMARIO-EXECUTIVO.md
        readme: false,
      },
      // Report docs
      report: {
        progress: 0,    // GENERATION-STATUS.md, PROGRESS-REPORT.md, RELATORIO_*.md
        context: 0,     // CONTEXTO_*.md
        prompt: 0,      // PROMPT_*.md
        session: 0,     // SESSAO_*.md
      },
      // QA docs
      qa: {
        validation: 0,  // VALIDACAO-*.md, VALIDATION-REPORT.md
        review: 0,      // avaliacao-*.md
      },
      hasInstructor: false,
      hasMarketIntelligence: false,
      learningObjectives: 0,
    },
    supabase: {
      projectExists: false,
      modules: 0,
      lessons: 0,
      assessments: 0,
      resources: 0,
      planning: 0,
      output: 0,
      report: 0,
      qa: 0,
      hasInstructorLinked: false,
      metadataFields: [],
    },
    gaps: [],
    score: 0,
  };

  // Analyze curriculum YAML
  if (curriculum) {
    result.local.modules = curriculum.modules?.length || 0;
    result.local.lessons = curriculum.modules?.reduce((sum, m) => sum + (m.lessons?.length || 0), 0) || 0;
    result.local.assessments = curriculum.assessments?.length || 0;
    result.local.resources =
      (curriculum.resources?.templates?.length || 0) +
      (curriculum.resources?.checklists?.length || 0) +
      (curriculum.resources?.guides?.length || 0) +
      (curriculum.resources?.tools?.length || 0);
    result.local.learningObjectives = curriculum.learning_objectives?.length || 0;
    result.local.hasMarketIntelligence = !!curriculum.market_intelligence;
    result.local.hasInstructor = !!curriculum.instructor?.name;
    result.local.planning.curriculum = true;
  }

  // Check local files - Planning
  const briefPatterns = [/^COURSE-BRIEF.*\.md$/i];
  result.local.planning.brief = countFilesMatching(coursePath, briefPatterns) > 0;
  result.local.planning.outline = fs.existsSync(path.join(coursePath, 'course-outline.md'));

  // Check local files - Output
  result.local.output.compiled = countFilesMatching(coursePath, [/^CURSO-COMPLETO.*\.md$/i, /^CURSO-PRONTO.*\.md$/i]);
  result.local.output.summary = countFilesMatching(coursePath, [/^FINAL-SUMMARY.*\.md$/i, /^SUMARIO-EXECUTIVO.*\.md$/i]);
  result.local.output.readme = fs.existsSync(path.join(coursePath, 'README.md'));

  // Check local files - Reports (including reports/ subdirectory)
  result.local.report.progress = countFilesMatching(coursePath, [/^GENERATION-STATUS.*\.md$/i, /^PROGRESS-REPORT.*\.md$/i, /^RELATORIO_.*\.md$/i]);
  result.local.report.context = countFilesMatching(coursePath, [/^CONTEXTO_.*\.md$/i]);
  result.local.report.prompt = countFilesMatching(coursePath, [/^PROMPT_.*\.md$/i]);
  result.local.report.session = countFilesMatching(coursePath, [/^SESSAO_.*\.md$/i]);

  // Check local files - QA
  result.local.qa.validation = countFilesMatching(coursePath, [/^VALIDACAO.*\.md$/i, /^VALIDATION-REPORT.*\.md$/i]);
  result.local.qa.review = countFilesMatching(coursePath, [/^avaliacao-.*\.md$/i]);

  // Query Supabase
  const { data: project, error: projectError } = await supabase
    .from('content_projects')
    .select('id, slug, name, project_metadata')
    .eq('slug', courseSlug)
    .single();

  if (projectError || !project) {
    result.gaps.push('Project not found in Supabase');
    return result;
  }

  result.supabase.projectExists = true;

  // Check metadata fields (legacy - kept for backwards compatibility)
  const metadata = project.project_metadata || {};
  result.supabase.metadataFields = Object.keys(metadata);

  // Count all contents by type
  const { data: contents } = await supabase
    .from('contents')
    .select('content_type, metadata')
    .eq('project_id', project.id)
    .is('deleted_at', null);

  if (contents) {
    contents.forEach(c => {
      // Core content types
      if (c.content_type === 'course_module') result.supabase.modules++;
      else if (c.content_type === 'course_lesson') result.supabase.lessons++;
      else if (c.content_type?.startsWith('assessment_')) result.supabase.assessments++;
      else if (c.content_type?.startsWith('resource_')) result.supabase.resources++;
      // New aggregated types
      else if (c.content_type === 'course_planning') result.supabase.planning++;
      else if (c.content_type === 'course_output') result.supabase.output++;
      else if (c.content_type === 'course_report') result.supabase.report++;
      else if (c.content_type === 'course_qa') result.supabase.qa++;
      // Legacy types (map to new)
      else if (c.content_type === 'course_brief' || c.content_type === 'course_curriculum') result.supabase.planning++;
      else if (c.content_type === 'market_intelligence' || c.content_type === 'learning_objectives') result.supabase.planning++;
    });
  }

  // Check instructor link
  const { data: projectMinds } = await supabase
    .from('project_minds')
    .select('role')
    .eq('project_id', project.id)
    .eq('role', 'instructor');

  result.supabase.hasInstructorLinked = (projectMinds?.length || 0) > 0;

  // Calculate local totals
  const localPlanningCount = (result.local.planning.brief ? 1 : 0) +
    (result.local.planning.curriculum ? 1 : 0) +
    (result.local.planning.outline ? 1 : 0) +
    (result.local.hasMarketIntelligence ? 1 : 0) +
    (result.local.learningObjectives > 0 ? 1 : 0);

  const localOutputCount = result.local.output.compiled +
    result.local.output.summary +
    (result.local.output.readme ? 1 : 0);

  const localReportCount = result.local.report.progress +
    result.local.report.context +
    result.local.report.prompt +
    result.local.report.session;

  const localQaCount = result.local.qa.validation + result.local.qa.review;

  // Identify gaps
  if (result.local.modules > result.supabase.modules) {
    result.gaps.push(`Missing modules: ${result.local.modules - result.supabase.modules}`);
  }
  if (result.local.lessons > result.supabase.lessons) {
    result.gaps.push(`Missing lessons: ${result.local.lessons - result.supabase.lessons}`);
  }
  if (result.local.assessments > result.supabase.assessments) {
    result.gaps.push(`Missing assessments: ${result.local.assessments - result.supabase.assessments}`);
  }
  if (result.local.resources > result.supabase.resources) {
    result.gaps.push(`Missing resources: ${result.local.resources - result.supabase.resources}`);
  }
  if (result.local.hasInstructor && !result.supabase.hasInstructorLinked) {
    result.gaps.push('Instructor not linked');
  }
  if (localPlanningCount > result.supabase.planning) {
    result.gaps.push(`Missing planning docs: ${localPlanningCount - result.supabase.planning}`);
  }
  if (localOutputCount > result.supabase.output) {
    result.gaps.push(`Missing output docs: ${localOutputCount - result.supabase.output}`);
  }
  if (localReportCount > result.supabase.report) {
    result.gaps.push(`Missing report docs: ${localReportCount - result.supabase.report}`);
  }
  if (localQaCount > result.supabase.qa) {
    result.gaps.push(`Missing QA docs: ${localQaCount - result.supabase.qa}`);
  }

  // Calculate score
  let totalChecks = 0;
  let passedChecks = 0;

  // Project exists
  totalChecks++; if (result.supabase.projectExists) passedChecks++;

  // Core content
  totalChecks++; if (result.supabase.modules >= result.local.modules) passedChecks++;
  totalChecks++; if (result.supabase.lessons >= result.local.lessons) passedChecks++;

  if (result.local.assessments > 0) {
    totalChecks++; if (result.supabase.assessments >= result.local.assessments) passedChecks++;
  }
  if (result.local.resources > 0) {
    totalChecks++; if (result.supabase.resources >= result.local.resources) passedChecks++;
  }

  // Instructor
  if (result.local.hasInstructor) {
    totalChecks++; if (result.supabase.hasInstructorLinked) passedChecks++;
  }

  // Planning docs
  if (localPlanningCount > 0) {
    totalChecks++; if (result.supabase.planning >= localPlanningCount) passedChecks++;
  }

  // Output docs
  if (localOutputCount > 0) {
    totalChecks++; if (result.supabase.output >= localOutputCount) passedChecks++;
  }

  // Report docs
  if (localReportCount > 0) {
    totalChecks++; if (result.supabase.report >= localReportCount) passedChecks++;
  }

  // QA docs
  if (localQaCount > 0) {
    totalChecks++; if (result.supabase.qa >= localQaCount) passedChecks++;
  }

  result.score = totalChecks > 0 ? Math.round((passedChecks / totalChecks) * 100) : 0;

  // Add summary counts for display
  result.localTotals = { planning: localPlanningCount, output: localOutputCount, report: localReportCount, qa: localQaCount };

  return result;
}

// ============================================================================
// Main
// ============================================================================

async function main() {
  console.log('🔍 CreatorOS Migration Audit\n');
  console.log('Comparing curriculum.yaml files with Supabase data...\n');

  const coursesDir = path.join(rootDir, 'outputs/courses');
  // Folders to skip (not real courses)
  const SKIP_FOLDERS = ['no-migration', '.DS_Store'];

  const courseSlugs = fs.readdirSync(coursesDir).filter(f =>
    fs.statSync(path.join(coursesDir, f)).isDirectory() && !SKIP_FOLDERS.includes(f)
  );

  console.log(`Found ${courseSlugs.length} courses to audit\n`);
  console.log('='.repeat(80));

  const results = [];
  let totalScore = 0;

  for (const slug of courseSlugs) {
    const result = await auditCourse(slug);
    results.push(result);
    totalScore += result.score;

    const icon = result.score === 100 ? '✅' : result.score >= 70 ? '⚠️' : '❌';
    console.log(`\n${icon} ${result.courseTitle} (${result.courseSlug})`);
    console.log(`   Score: ${result.score}%`);
    console.log(`   Core:     Local ${result.local.modules}M/${result.local.lessons}L/${result.local.assessments}A/${result.local.resources}R → Supabase ${result.supabase.modules}M/${result.supabase.lessons}L/${result.supabase.assessments}A/${result.supabase.resources}R`);
    console.log(`   Docs:     Local P:${result.localTotals.planning} O:${result.localTotals.output} R:${result.localTotals.report} Q:${result.localTotals.qa} → Supabase P:${result.supabase.planning} O:${result.supabase.output} R:${result.supabase.report} Q:${result.supabase.qa}`);

    if (result.gaps.length > 0) {
      console.log(`   Gaps:`);
      result.gaps.forEach(gap => console.log(`     - ${gap}`));
    }
  }

  console.log('\n' + '='.repeat(80));
  console.log('\n📊 Summary\n');

  const avgScore = Math.round(totalScore / results.length);
  const perfect = results.filter(r => r.score === 100).length;
  const partial = results.filter(r => r.score >= 70 && r.score < 100).length;
  const failing = results.filter(r => r.score < 70).length;

  console.log(`Average Score: ${avgScore}%`);
  console.log(`✅ Complete (100%): ${perfect}`);
  console.log(`⚠️ Partial (70-99%): ${partial}`);
  console.log(`❌ Incomplete (<70%): ${failing}`);

  // Aggregate gaps
  const allGaps = {};
  results.forEach(r => {
    r.gaps.forEach(gap => {
      const key = gap.replace(/\d+/g, 'N');
      allGaps[key] = (allGaps[key] || 0) + 1;
    });
  });

  if (Object.keys(allGaps).length > 0) {
    console.log('\n🔧 Common Gaps to Fix:');
    Object.entries(allGaps)
      .sort((a, b) => b[1] - a[1])
      .forEach(([gap, count]) => {
        console.log(`   ${count}x ${gap}`);
      });
  }

  // Write detailed report
  const reportPath = path.join(rootDir, 'docs/reports/migration-audit.json');
  fs.mkdirSync(path.dirname(reportPath), { recursive: true });
  fs.writeFileSync(reportPath, JSON.stringify({
    timestamp: new Date().toISOString(),
    summary: { avgScore, perfect, partial, failing, total: results.length },
    commonGaps: allGaps,
    results,
  }, null, 2));

  console.log(`\n📄 Detailed report saved to: ${reportPath}`);
}

main().catch(console.error);

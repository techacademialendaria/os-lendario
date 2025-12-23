/**
 * Import synthetic data from outputs/minds to contents table
 *
 * Structure:
 * - content_projects: one per mind with project_type='mind_artifacts'
 *   - creator_mind_id = Alan Nicolas (who created the synthesis)
 *   - persona_mind_id = the mind being synthesized
 * - contents: artifacts linked via project_id
 *
 * Run: node --env-file=.env app/scripts/import-synthetic-to-contents.mjs
 */

import { createClient } from '@supabase/supabase-js';
import { readdir, readFile, stat } from 'fs/promises';
import { join } from 'path';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const OUTPUTS_DIR = './outputs/minds';

// Alan Nicolas ID (creator of all synthetic minds)
const CREATOR_MIND_ID = '2ad2fe23-4ebc-4399-be9f-81274af1acb6';

// Content types to import from outputs/minds
// Priority order: artifacts/ > analysis/ > synthesis/ (first match wins per title)
const CONTENT_FILES = {
  // ===== IDENTITY CORE =====
  // artifacts/ variants (newer structure)
  'artifacts/identity-core.yaml': { type: 'mind_artifacts', title: 'Identity Core' },
  'artifacts/identity_core.yaml': { type: 'mind_artifacts', title: 'Identity Core' },
  'artifacts/identity-core.md': { type: 'mind_artifacts', title: 'Identity Core' },
  // analysis/ variants (older structure)
  'analysis/identity-core.yaml': { type: 'mind_artifacts', title: 'Identity Core' },

  // ===== COGNITIVE SPEC =====
  'artifacts/cognitive-spec.yaml': { type: 'mind_artifacts', title: 'Cognitive Spec' },
  'artifacts/cognitive_architecture.yaml': { type: 'mind_artifacts', title: 'Cognitive Spec' },
  'artifacts/cognitive-architecture.yaml': { type: 'mind_artifacts', title: 'Cognitive Spec' },
  'analysis/cognitive-spec.yaml': { type: 'mind_artifacts', title: 'Cognitive Spec' },

  // ===== VALUES =====
  'artifacts/values_hierarchy.yaml': { type: 'mind_artifacts', title: 'Values Hierarchy' },
  'artifacts/layer-6-values-hierarchy.yaml': { type: 'mind_artifacts', title: 'Values Hierarchy' },
  'artifacts/layer6_values_hierarchy.yaml': { type: 'mind_artifacts', title: 'Values Hierarchy' },
  'artifacts/valores.md': { type: 'mind_artifacts', title: 'Values Hierarchy' },
  'analysis/values-analysis.yaml': { type: 'mind_artifacts', title: 'Values Hierarchy' },
  'analysis/layer-5-values-hierarchy.md': { type: 'mind_artifacts', title: 'Values Hierarchy' },

  // ===== OBSESSIONS =====
  'artifacts/core_obsessions.yaml': { type: 'mind_artifacts', title: 'Core Obsessions' },
  'artifacts/layer-7-core-obsessions.yaml': { type: 'mind_artifacts', title: 'Core Obsessions' },
  'artifacts/layer7_core_obsessions.yaml': { type: 'mind_artifacts', title: 'Core Obsessions' },
  'analysis/obsessions-map.yaml': { type: 'mind_artifacts', title: 'Core Obsessions' },
  'analysis/layer-6-obsessions.md': { type: 'mind_artifacts', title: 'Core Obsessions' },

  // ===== COMMUNICATION STYLE =====
  'artifacts/communication-style.md': { type: 'mind_artifacts', title: 'Communication Style' },
  'artifacts/communication_templates.md': { type: 'mind_artifacts', title: 'Communication Style' },
  'synthesis/communication-style.md': { type: 'mind_artifacts', title: 'Communication Style' },
  'analysis/layer-3-language-communication.md': { type: 'mind_artifacts', title: 'Communication Style' },

  // ===== FRAMEWORKS =====
  'artifacts/frameworks.md': { type: 'mind_artifacts', title: 'Mental Frameworks' },
  'artifacts/core_frameworks.md': { type: 'mind_artifacts', title: 'Mental Frameworks' },
  'artifacts/frameworks_synthesized.md': { type: 'mind_artifacts', title: 'Mental Frameworks' },
  'artifacts/frameworks-communication.yaml': { type: 'mind_artifacts', title: 'Mental Frameworks' },
  'synthesis/frameworks.md': { type: 'mind_artifacts', title: 'Mental Frameworks' },

  // ===== MENTAL MODELS =====
  'artifacts/mental_models.md': { type: 'mind_artifacts', title: 'Mental Models' },
  'artifacts/layer-5-mental-models.yaml': { type: 'mind_artifacts', title: 'Mental Models' },
  'artifacts/layer5_mental_models.md': { type: 'mind_artifacts', title: 'Mental Models' },
  'artifacts/layer-5-mental-models.md': { type: 'mind_artifacts', title: 'Mental Models' },
  'analysis/layer-1-mental-models.md': { type: 'mind_artifacts', title: 'Mental Models' },
  'analysis/layer-5-6-mental-models-values.md': { type: 'mind_artifacts', title: 'Mental Models' },

  // ===== PARADOXES =====
  'artifacts/layer-8-productive-paradoxes.yaml': { type: 'mind_artifacts', title: 'Paradoxes' },
  'artifacts/layer8_productive_paradoxes.yaml': { type: 'mind_artifacts', title: 'Paradoxes' },
  'artifacts/contradictions.yaml': { type: 'mind_artifacts', title: 'Paradoxes' },
  'artifacts/contradictions_synthesized.md': { type: 'mind_artifacts', title: 'Paradoxes' },
  'synthesis/paradoxes.md': { type: 'mind_artifacts', title: 'Paradoxes' },
  'analysis/layer-8-paradoxes.md': { type: 'mind_artifacts', title: 'Paradoxes' },
  'analysis/layer-7-8-singularity-paradoxes.md': { type: 'mind_artifacts', title: 'Paradoxes' },

  // ===== SINGULARITY =====
  'synthesis/singularity.md': { type: 'mind_artifacts', title: 'Singularity' },
  'analysis/layer-7-singularity.md': { type: 'mind_artifacts', title: 'Singularity' },

  // ===== DECISION MAKING =====
  'artifacts/decision-matrix.yaml': { type: 'mind_artifacts', title: 'Decision Framework' },
  'artifacts/decision_making_patterns.md': { type: 'mind_artifacts', title: 'Decision Framework' },
  'artifacts/decision_patterns.md': { type: 'mind_artifacts', title: 'Decision Framework' },
  'artifacts/decision-framework.md': { type: 'mind_artifacts', title: 'Decision Framework' },
  'artifacts/decision-playbooks.md': { type: 'mind_artifacts', title: 'Decision Framework' },
  'synthesis/decision-trees.md': { type: 'mind_artifacts', title: 'Decision Framework' },
  'analysis/layer-4-decision-architecture.md': { type: 'mind_artifacts', title: 'Decision Framework' },

  // ===== BEHAVIORAL PATTERNS =====
  'artifacts/behavioral_patterns.yaml': { type: 'mind_artifacts', title: 'Behavioral Patterns' },
  'artifacts/layer-1-behavioral-patterns.md': { type: 'mind_artifacts', title: 'Behavioral Patterns' },
  'artifacts/layer_1_behavioral_patterns.md': { type: 'mind_artifacts', title: 'Behavioral Patterns' },
  'artifacts/layer1_behavioral_patterns.md': { type: 'mind_artifacts', title: 'Behavioral Patterns' },
  'artifacts/layers-1-4-observable.yaml': { type: 'mind_artifacts', title: 'Behavioral Patterns' },
  'artifacts/layers_1-4_observable.yaml': { type: 'mind_artifacts', title: 'Behavioral Patterns' },
  'analysis/layer-1-2-behavioral-communication.md': { type: 'mind_artifacts', title: 'Behavioral Patterns' },

  // ===== RECOGNITION PATTERNS =====
  'artifacts/recognition_patterns.yaml': { type: 'mind_artifacts', title: 'Recognition Patterns' },
  'artifacts/layer-4-recognition-patterns.yaml': { type: 'mind_artifacts', title: 'Recognition Patterns' },
  'artifacts/layer4_recognition_patterns.yaml': { type: 'mind_artifacts', title: 'Recognition Patterns' },

  // ===== TOOLS =====
  'artifacts/tools.md': { type: 'mind_artifacts', title: 'Tools & Methods' },

  // ===== PSYCHOMETRICS =====
  'artifacts/psychometric_profile.yaml': { type: 'mind_artifacts', title: 'Psychometric Profile' },
  'artifacts/psychometrics.md': { type: 'mind_artifacts', title: 'Psychometric Profile' },
  'artifacts/psychological_profile.md': { type: 'mind_artifacts', title: 'Psychometric Profile' },

  // ===== WORLDVIEW =====
  'artifacts/worldview.md': { type: 'mind_artifacts', title: 'Worldview' },
  'artifacts/beliefs_core.yaml': { type: 'mind_artifacts', title: 'Worldview' },

  // ===== WRITING STYLE =====
  'artifacts/writing_style.md': { type: 'mind_artifacts', title: 'Writing Style' },
  'artifacts/writing_style.yaml': { type: 'mind_artifacts', title: 'Writing Style' },
  'artifacts/voice_guide.md': { type: 'mind_artifacts', title: 'Writing Style' },
  'artifacts/linguistic_patterns.yaml': { type: 'mind_artifacts', title: 'Writing Style' },

  // ===== SIGNATURE PHRASES =====
  'artifacts/signature_phrases.md': { type: 'mind_artifacts', title: 'Signature Phrases' },
  'artifacts/signature_phrases.yaml': { type: 'mind_artifacts', title: 'Signature Phrases' },
  'artifacts/quotes.md': { type: 'mind_artifacts', title: 'Signature Phrases' },
  'artifacts/quotes_database.yaml': { type: 'mind_artifacts', title: 'Signature Phrases' },

  // ===== META AXIOMS =====
  'artifacts/meta_axioms.yaml': { type: 'mind_artifacts', title: 'Meta Axioms' },
  'artifacts/meta-axioms.md': { type: 'mind_artifacts', title: 'Meta Axioms' },

  // ===== MEMORY SYSTEM =====
  'artifacts/memory-system.yaml': { type: 'mind_artifacts', title: 'Memory System' },

  // ===== LIFE TIMELINE =====
  'artifacts/life_timeline.yaml': { type: 'mind_artifacts', title: 'Life Timeline' },

  // ===== ROUTINE =====
  'artifacts/routine.md': { type: 'mind_artifacts', title: 'Routine & Habits' },
  'artifacts/routine_analysis.yaml': { type: 'mind_artifacts', title: 'Routine & Habits' },
  'analysis/layer-3-4-routines-recognition.md': { type: 'mind_artifacts', title: 'Routine & Habits' },
};

// Slug mapping (outputs folder → db slug)
const SLUG_MAP = {
  'adriano_de_marqui': 'adriano-de-marqui',
  'jose_amorim': 'jose-carlos-amorim'
};

async function getMindsFromDb() {
  const { data, error } = await supabase
    .from('minds')
    .select('id, slug, display_name');

  if (error) throw error;
  return new Map(data.map(m => [m.slug, m]));
}

async function getExistingProjects() {
  const { data, error } = await supabase
    .from('content_projects')
    .select('id, slug, persona_mind_id')
    .eq('project_type', 'mind_artifacts');

  if (error) throw error;
  return new Map(data?.map(p => [p.persona_mind_id, p]) || []);
}

async function getExistingContents(projectId) {
  const { data, error } = await supabase
    .from('contents')
    .select('id, title')
    .eq('project_id', projectId);

  if (error) throw error;
  return new Set(data?.map(c => c.title) || []);
}

async function fileExists(path) {
  try {
    await stat(path);
    return true;
  } catch {
    return false;
  }
}

async function readTextFile(path) {
  try {
    return await readFile(path, 'utf-8');
  } catch {
    return null;
  }
}

async function getOrCreateProject(mind) {
  // Check if project exists
  const { data: existing } = await supabase
    .from('content_projects')
    .select('id, slug')
    .eq('persona_mind_id', mind.id)
    .eq('project_type', 'mind_artifacts')
    .single();

  if (existing) {
    return existing;
  }

  // Create new project
  const slug = `${mind.slug}-synthetic-mind`;
  const { data: created, error } = await supabase
    .from('content_projects')
    .insert({
      slug,
      name: `${mind.display_name} - Synthetic Mind`,
      description: `Artefatos da mente sintética de ${mind.display_name}`,
      project_type: 'mind_artifacts',
      status: 'completed',
      creator_mind_id: CREATOR_MIND_ID,
      persona_mind_id: mind.id
    })
    .select('id, slug')
    .single();

  if (error) throw error;
  return created;
}

// Convert filename to readable title
function fileNameToTitle(filename) {
  return filename
    // Remove extension
    .replace(/\.(md|yaml|yml)$/, '')
    // Remove numbered prefixes (01_, 1_, 1. etc.)
    .replace(/^\d+[_.\s-]*/g, '')
    // Remove Layer X patterns (layer-5-, layer_6_, etc.)
    .replace(/layer[_-]?\d+[_-]?/gi, '')
    // Remove layers-X-Y patterns
    .replace(/layers[_-]?\d+[_-]?\d*[_-]?/gi, '')
    // Replace underscores and hyphens with spaces
    .replace(/[_-]/g, ' ')
    // Remove double asterisks
    .replace(/\*+/g, '')
    // Remove parentheses content like (twitter)
    .replace(/\([^)]*\)/g, '')
    // Capitalize words
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
    // Clean up extra spaces
    .replace(/\s+/g, ' ')
    .trim();
}

// Scan artifacts directory and return all importable files
async function scanArtifactsDirectory(dir) {
  const artifactsDir = join(dir, 'artifacts');
  const files = [];

  try {
    const entries = await readdir(artifactsDir);
    for (const entry of entries) {
      if (entry.endsWith('.md') || entry.endsWith('.yaml') || entry.endsWith('.yml')) {
        // Skip index files and JSON
        if (entry === 'index.yaml' || entry.endsWith('.json')) continue;

        files.push({
          path: `artifacts/${entry}`,
          fullPath: join(artifactsDir, entry),
          title: fileNameToTitle(entry)
        });
      }
    }
  } catch {
    // Directory doesn't exist
  }

  return files;
}

// Scan ALL system prompts in a mind directory
async function scanAllSystemPrompts(dir) {
  const prompts = [];
  const systemPromptsDir = join(dir, 'system_prompts');

  try {
    const entries = await readdir(systemPromptsDir, { withFileTypes: true });

    // Process root-level files
    for (const entry of entries) {
      if (entry.isFile() && entry.name.endsWith('.md')) {
        // Skip meta files
        if (entry.name.includes('CHANGELOG') ||
            entry.name.includes('DEPRECATED') ||
            entry.name.includes('VALIDATION') ||
            entry.name.includes('README')) continue;

        const title = systemPromptFileToTitle(entry.name);
        prompts.push({
          path: `system_prompts/${entry.name}`,
          fullPath: join(systemPromptsDir, entry.name),
          title
        });
      }
    }

    // Process subdirectories (e.g., specialists/, generalista/)
    for (const entry of entries) {
      if (!entry.isDirectory()) continue;

      const subdirPath = join(systemPromptsDir, entry.name);
      try {
        const subEntries = await readdir(subdirPath, { withFileTypes: true });

        for (const subEntry of subEntries) {
          if (subEntry.isFile() && subEntry.name.endsWith('.md')) {
            // Title: "Subdir Name" or "Subdir Name vX.X"
            const title = systemPromptFileToTitle(entry.name, subEntry.name);
            prompts.push({
              path: `system_prompts/${entry.name}/${subEntry.name}`,
              fullPath: join(subdirPath, subEntry.name),
              title
            });
          }

          // Check for nested subdirs (e.g., specialists/startup_advisor/v1.0.0.md)
          if (subEntry.isDirectory()) {
            const nestedPath = join(subdirPath, subEntry.name);
            try {
              const nestedEntries = await readdir(nestedPath);
              for (const nestedFile of nestedEntries) {
                if (nestedFile.endsWith('.md')) {
                  const title = systemPromptFileToTitle(subEntry.name, nestedFile);
                  prompts.push({
                    path: `system_prompts/${entry.name}/${subEntry.name}/${nestedFile}`,
                    fullPath: join(nestedPath, nestedFile),
                    title
                  });
                }
              }
            } catch {
              // Nested dir read failed
            }
          }
        }
      } catch {
        // Subdir read failed
      }
    }
  } catch {
    // Directory doesn't exist
  }

  return prompts;
}

// Convert system prompt filename to readable title
function systemPromptFileToTitle(filename, versionFile = null) {
  let baseName = filename
    .replace(/\.(md|yaml|yml)$/, '')
    // Remove date prefixes (20251018-060227-)
    .replace(/^\d{8}-\d{6}-/, '')
    // Remove version prefixes (v1.0-, v1.0.0-)
    .replace(/^v\d+\.\d+(\.\d+)?-?/, '')
    // Replace underscores and hyphens
    .replace(/[_-]/g, ' ')
    .trim();

  // Capitalize words
  baseName = baseName
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');

  // Add version info if from versioned file
  if (versionFile) {
    const versionMatch = versionFile.match(/v?(\d+\.\d+(\.\d+)?)/);
    if (versionMatch && !baseName.toLowerCase().includes(versionMatch[1])) {
      baseName = `${baseName} v${versionMatch[1]}`;
    }
  }

  // Prefix with "System Prompt:" for clarity
  return `System Prompt: ${baseName}`;
}

async function importMindContents(mindSlug, mind) {
  const dir = join(OUTPUTS_DIR, mindSlug);
  const imported = [];
  const importedTitles = new Set();

  // Get or create project for this mind
  const project = await getOrCreateProject(mind);

  // Get existing contents for this project
  const existingTitles = await getExistingContents(project.id);

  // Import artifact files (first match wins per title)
  for (const [filePath, config] of Object.entries(CONTENT_FILES)) {
    // Skip if we already imported this title
    if (importedTitles.has(config.title)) continue;

    const fullPath = join(dir, filePath);

    if (!await fileExists(fullPath)) continue;

    // Skip if already exists in DB
    if (existingTitles.has(config.title)) {
      importedTitles.add(config.title);
      continue;
    }

    const content = await readTextFile(fullPath);
    if (!content || content.length < 50) continue;

    const slug = `${mind.slug}-${config.title.toLowerCase().replace(/\s+/g, '-')}`;

    // Insert content
    const { error } = await supabase
      .from('contents')
      .insert({
        slug,
        title: config.title,
        content_type: config.type,
        content,
        ai_generated: true,
        status: 'published',
        project_id: project.id,
        metadata: {
          source_file: filePath,
          imported_at: new Date().toISOString(),
          mind_slug: mind.slug
        }
      });

    if (error) {
      // Try with timestamp suffix if slug conflict
      const { error: retryError } = await supabase
        .from('contents')
        .insert({
          slug: `${slug}-${Date.now()}`,
          title: config.title,
          content_type: config.type,
          content,
          ai_generated: true,
          status: 'published',
          project_id: project.id,
          metadata: {
            source_file: filePath,
            imported_at: new Date().toISOString(),
            mind_slug: mind.slug
          }
        });

      if (retryError) {
        console.log(`    ERROR ${config.title}: ${retryError.message}`);
        continue;
      }
    }

    imported.push(config.title);
    importedTitles.add(config.title);
  }

  // Import ALL remaining files from artifacts/ directory
  const artifactFiles = await scanArtifactsDirectory(dir);
  for (const file of artifactFiles) {
    // Skip if we already imported this title (from canonical mapping)
    if (importedTitles.has(file.title)) continue;

    // Skip if already exists in DB
    if (existingTitles.has(file.title)) {
      importedTitles.add(file.title);
      continue;
    }

    const content = await readTextFile(file.fullPath);
    if (!content || content.length < 50) continue;

    const slug = `${mind.slug}-${file.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`;

    const { error } = await supabase
      .from('contents')
      .insert({
        slug,
        title: file.title,
        content_type: 'mind_artifacts',
        content,
        ai_generated: true,
        status: 'published',
        project_id: project.id,
        metadata: {
          source_file: file.path,
          imported_at: new Date().toISOString(),
          mind_slug: mind.slug
        }
      });

    if (error) {
      // Try with timestamp suffix if slug conflict
      const { error: retryError } = await supabase
        .from('contents')
        .insert({
          slug: `${slug}-${Date.now()}`,
          title: file.title,
          content_type: 'mind_artifacts',
          content,
          ai_generated: true,
          status: 'published',
          project_id: project.id,
          metadata: {
            source_file: file.path,
            imported_at: new Date().toISOString(),
            mind_slug: mind.slug
          }
        });

      if (retryError) {
        console.log(`    ERROR ${file.title}: ${retryError.message}`);
        continue;
      }
    }

    imported.push(file.title);
    importedTitles.add(file.title);
  }

  // Import ALL system prompts
  const systemPrompts = await scanAllSystemPrompts(dir);
  for (const prompt of systemPrompts) {
    // Skip if already imported this title
    if (existingTitles.has(prompt.title) || importedTitles.has(prompt.title)) continue;

    const content = await readTextFile(prompt.fullPath);
    if (!content || content.length < 50) continue;

    const slugBase = prompt.title
      .toLowerCase()
      .replace(/system prompt:\s*/i, '')
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');
    const slug = `${mind.slug}-prompt-${slugBase}`;

    const { error } = await supabase
      .from('contents')
      .insert({
        slug,
        title: prompt.title,
        content_type: 'mind_prompts',
        content,
        ai_generated: true,
        status: 'published',
        project_id: project.id,
        metadata: {
          source_file: prompt.path,
          imported_at: new Date().toISOString(),
          mind_slug: mind.slug
        }
      });

    if (error) {
      // Try with timestamp suffix if slug conflict
      const { error: retryError } = await supabase
        .from('contents')
        .insert({
          slug: `${slug}-${Date.now()}`,
          title: prompt.title,
          content_type: 'mind_prompts',
          content,
          ai_generated: true,
          status: 'published',
          project_id: project.id,
          metadata: {
            source_file: prompt.path,
            imported_at: new Date().toISOString(),
            mind_slug: mind.slug
          }
        });

      if (retryError) {
        console.log(`    ERROR ${prompt.title}: ${retryError.message}`);
        continue;
      }
    }

    imported.push(prompt.title);
    importedTitles.add(prompt.title);
  }

  return { project, imported };
}

async function main() {
  console.log('='.repeat(70));
  console.log('IMPORT: Synthetic Data → contents table');
  console.log('='.repeat(70));
  console.log();
  console.log('Creator:', CREATOR_MIND_ID, '(Alan Nicolas)');
  console.log();

  const dbMinds = await getMindsFromDb();
  console.log(`Found ${dbMinds.size} minds in DB`);

  // Get output directories
  const entries = await readdir(OUTPUTS_DIR, { withFileTypes: true });
  const outputDirs = entries
    .filter(e => e.isDirectory() && !e.name.startsWith('.'))
    .map(e => e.name);

  console.log(`Found ${outputDirs.length} minds in outputs/`);
  console.log();

  const stats = { projects: 0, contents: 0, skipped: 0 };

  for (const slug of outputDirs) {
    const dbSlug = SLUG_MAP[slug] || slug;
    const mind = dbMinds.get(dbSlug);

    if (!mind) {
      continue;
    }

    try {
      const { project, imported } = await importMindContents(slug, mind);

      if (imported.length > 0) {
        console.log(`${mind.slug}: +${imported.length} contents`);
        imported.forEach(t => console.log(`    + ${t}`));
        stats.contents += imported.length;
        stats.projects++;
      }
    } catch (e) {
      console.log(`${mind.slug}: ERROR - ${e.message}`);
    }
  }

  console.log();
  console.log('='.repeat(70));
  console.log('SUMMARY');
  console.log('='.repeat(70));
  console.log(`  Projects created/used: ${stats.projects}`);
  console.log(`  Contents imported: ${stats.contents}`);
}

main().catch(console.error);

/**
 * Normalize psychometric profiles to standard schema v1.0
 *
 * - Reads all JSON files from mapeamento-cognitivo/
 * - Normalizes to standard schema
 * - Outputs to mapeamento-cognitivo/normalized/
 */

import { readdir, readFile, writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

const INPUT_DIR = '../outputs/minds/mapeamento-cognitivo';
const OUTPUT_DIR = '../outputs/minds/mapeamento-cognitivo/normalized';

const SCHEMA_VERSION = '1.0';

// Normalize ID to slug format
function normalizeId(id, name) {
  if (id) {
    return id.toLowerCase().replace(/\s+/g, '_').replace(/-/g, '_');
  }
  return name.toLowerCase().replace(/\s+/g, '_').replace(/-/g, '_');
}

// Ensure array
function ensureArray(value) {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  return [value];
}

// Normalize DISC structure
function normalizeDisc(disc) {
  if (!disc) return null;

  return {
    D: disc.D ?? null,
    I: disc.I ?? null,
    S: disc.S ?? null,
    C: disc.C ?? null,
    pattern: disc.pattern ?? null,
    pattern_name: disc.pattern_name ?? null,
    natural_profile: disc.natural_profile ?? null,
    adapted_profile: disc.adapted_profile ?? null,
    stress_profile: disc.stress_profile ?? null,
    specific_behaviors: ensureArray(disc.specific_behaviors)
  };
}

// Normalize Enneagram structure
function normalizeEnneagram(enneagram) {
  if (!enneagram) return null;

  // Merge behavioral_evidence and repetitive_patterns
  const behaviors = [
    ...ensureArray(enneagram.behavioral_evidence),
    ...ensureArray(enneagram.repetitive_patterns)
  ];

  return {
    type: enneagram.type ?? null,
    type_name: enneagram.type_name ?? null,
    core_fear: enneagram.core_fear ?? null,
    core_desire: enneagram.core_desire ?? null,
    development_level: enneagram.development_level ?? null,
    stress_direction: enneagram.stress_direction ?? null,
    stress_behaviors: ensureArray(enneagram.stress_behaviors),
    growth_direction: enneagram.growth_direction ?? null,
    growth_behaviors: enneagram.growth_behaviors ?? null,
    instinct_stack: enneagram.instinct_stack ?? null,
    instinct_descriptions: enneagram.instinct_descriptions ?? null,
    behavioral_evidence: behaviors.length > 0 ? behaviors : null,
    // Preserve extras if present
    ...(enneagram.childhood_message && { childhood_message: enneagram.childhood_message }),
    ...(enneagram.levels_timeline && { levels_timeline: enneagram.levels_timeline })
  };
}

// Normalize MBTI structure
function normalizeMbti(mbti) {
  if (!mbti) return null;

  // Handle flat function format (peter-thiel style)
  let cognitiveStack = mbti.cognitive_stack;
  if (!cognitiveStack && mbti.dominant_function) {
    cognitiveStack = {
      dominant: { function: mbti.dominant_function },
      auxiliary: { function: mbti.auxiliary_function },
      tertiary: { function: mbti.tertiary_function },
      inferior: { function: mbti.inferior_function }
    };
  }

  return {
    type: mbti.type ?? null,
    type_name: mbti.type_name ?? null,
    E_percentage: mbti.E_percentage ?? null,
    N_percentage: mbti.N_percentage ?? null,
    T_percentage: mbti.T_percentage ?? null,
    J_percentage: mbti.J_percentage ?? null,
    cognitive_stack: cognitiveStack ?? null
  };
}

// Normalize Cognitive Stratum
function normalizeCognitiveStratum(cs) {
  if (!cs) return null;

  return {
    level: cs.level ?? null,
    level_name: cs.level_name ?? null,
    time_horizon: cs.time_horizon ?? null,
    processing_type: cs.processing_type ?? null,
    transitioning_to: cs.transitioning_to ?? null,
    evidence: ensureArray(cs.evidence),
    temporal_horizons: cs.temporal_horizons ?? null,
    cognitive_capabilities: cs.cognitive_capabilities ?? null
  };
}

// Normalize Big Five
function normalizeBigFive(bf) {
  if (!bf) return null;

  const normalizeTraitWithFacets = (trait, traitName) => {
    if (trait === null || trait === undefined) return null;

    // Handle flat number format (peter-thiel style: openness: 94)
    if (typeof trait === 'number') {
      return {
        total: trait,
        percentile: null,
        facets: null
      };
    }

    // Handle object format
    return {
      total: trait.total ?? null,
      percentile: trait.percentile ?? null,
      facets: trait.facets ?? null
    };
  };

  return {
    openness: normalizeTraitWithFacets(bf.openness, 'openness'),
    conscientiousness: normalizeTraitWithFacets(bf.conscientiousness, 'conscientiousness'),
    extraversion: normalizeTraitWithFacets(bf.extraversion, 'extraversion'),
    agreeableness: normalizeTraitWithFacets(bf.agreeableness, 'agreeableness'),
    neuroticism: normalizeTraitWithFacets(bf.neuroticism, 'neuroticism')
  };
}

// Normalize Dark Triad
function normalizeDarkTriad(dt) {
  if (!dt) return null;

  const normalizeTrait = (trait, flatValue) => {
    // Handle flat number format (peter-thiel style: narcissism: 5.0)
    if (typeof flatValue === 'number') {
      return {
        score: flatValue,
        max_scale: dt.scale_max ?? 7,
        percentile: null,
        evidence: []
      };
    }

    if (!trait) return null;

    // Handle object format
    return {
      score: trait.score ?? null,
      max_scale: trait.max_scale ?? dt.scale_max ?? 7,
      percentile: trait.percentile ?? null,
      evidence: ensureArray(trait.evidence)
    };
  };

  // Check if flat format (peter-thiel style)
  const isFlat = typeof dt.narcissism === 'number';

  return {
    narcissism: normalizeTrait(dt.narcissism, isFlat ? dt.narcissism : null),
    machiavellianism: normalizeTrait(dt.machiavellianism, isFlat ? dt.machiavellianism : null),
    psychopathy: normalizeTrait(dt.psychopathy, isFlat ? dt.psychopathy : null)
  };
}

// Normalize Intelligence
function normalizeIntelligence(intel) {
  if (!intel) return null;

  // Handle flat IQ format (peter-thiel style: iq_estimated: "145-155")
  let iqEstimated = null;
  if (typeof intel.iq_estimated === 'string') {
    iqEstimated = {
      range: intel.iq_estimated,
      methodologies: [],
      evidence: []
    };
  } else if (intel.iq_estimated && typeof intel.iq_estimated === 'object') {
    iqEstimated = {
      range: intel.iq_estimated.range ?? null,
      methodologies: ensureArray(intel.iq_estimated.methodologies),
      evidence: ensureArray(intel.iq_estimated.evidence)
    };
  }

  // Handle flat EQ format (peter-thiel style: eq_estimated: 35)
  let eqEstimated = intel.eq_estimated;
  if (typeof eqEstimated === 'number') {
    eqEstimated = {
      total: eqEstimated,
      components: null
    };
  }

  // Preserve all extra fields (dominant_intelligence, gardner_types, etc.)
  const extras = {};
  for (const [key, value] of Object.entries(intel)) {
    if (!['iq_estimated', 'eq_estimated', 'gardner_intelligences'].includes(key)) {
      extras[key] = value;
    }
  }

  return {
    iq_estimated: iqEstimated,
    eq_estimated: eqEstimated,
    gardner_intelligences: intel.gardner_intelligences ?? intel.gardner_types ?? null,
    ...extras
  };
}

// Normalize unique characteristics - PRESERVE ALL FIELDS
function normalizeUniqueCharacteristics(uc) {
  if (!uc) return null;

  // Start with normalized core fields
  const normalized = {
    superpower: ensureArray(uc.superpower),
    kryptonite: ensureArray(uc.kryptonite),
    work_hours_per_day: uc.work_hours_per_day ?? null,
    companies_founded: ensureArray(uc.companies_founded),
    daily_routine: ensureArray(uc.daily_routine),
    main_focus: uc.main_focus ?? null,
    statistical_rarity: uc.statistical_rarity ?? null,
    key_relationships: uc.key_relationships ?? null,
    philosophy: uc.philosophy ?? null
  };

  // Preserve ALL extra fields (platforms_dominated, companies, daily_output, etc.)
  const coreFields = [
    'superpower', 'kryptonite', 'work_hours_per_day', 'companies_founded',
    'daily_routine', 'main_focus', 'statistical_rarity', 'key_relationships', 'philosophy'
  ];

  for (const [key, value] of Object.entries(uc)) {
    if (!coreFields.includes(key)) {
      normalized[key] = value;
    }
  }

  return normalized;
}

// Normalize full profile
function normalizeProfile(data, filename) {
  const profile = data.profile || data;
  const metadata = data.metadata || {};

  const normalized = {
    profile: {
      id: normalizeId(profile.id, profile.name),
      name: profile.name,
      disc: normalizeDisc(profile.disc),
      enneagram: normalizeEnneagram(profile.enneagram),
      mbti: normalizeMbti(profile.mbti),
      cognitive_stratum: normalizeCognitiveStratum(profile.cognitive_stratum),
      big_five: normalizeBigFive(profile.big_five),
      hexaco: profile.hexaco ?? null,
      dark_triad: normalizeDarkTriad(profile.dark_triad),
      intelligence: normalizeIntelligence(profile.intelligence),
      additional_assessments: profile.additional_assessments ?? null,
      unique_characteristics: normalizeUniqueCharacteristics(profile.unique_characteristics),
      behavioral_patterns: ensureArray(profile.behavioral_patterns),  // Standalone (peter-thiel style)
      crisis_patterns: profile.crisis_patterns ?? null,
      convergence_analysis: profile.convergence_analysis ?? null,
      predictions: profile.predictions ?? null,
      comparative_analysis: profile.comparative_analysis ?? null,
      interaction_guide: profile.interaction_guide ?? null,
      development_roadmap: profile.development_roadmap ?? null,
      data_sources: profile.data_sources ?? null
    },
    metadata: {
      schema_version: SCHEMA_VERSION,
      original_file: filename,
      normalized_at: new Date().toISOString(),
      analysis_date: metadata.analysis_date ?? metadata.last_updated ?? null,
      analyzer: metadata.analyzer ?? null,
      version: metadata.version ?? null,
      confidence: metadata.confidence ?? null,
      special_notes: metadata.special_notes ?? null,
      disclaimer: metadata.disclaimer ?? null,
      assessment_scales: metadata.assessment_scales ?? null,
      data_sources: ensureArray(metadata.data_sources),
      limitations: ensureArray(metadata.limitations)
    }
  };

  return normalized;
}

// Calculate completeness score
function calculateCompleteness(profile) {
  const coreFields = [
    'disc', 'enneagram', 'mbti', 'cognitive_stratum',
    'big_five', 'dark_triad', 'intelligence', 'unique_characteristics'
  ];

  let filled = 0;
  for (const field of coreFields) {
    if (profile[field]) filled++;
  }

  return Math.round((filled / coreFields.length) * 100);
}

async function main() {
  console.log('='.repeat(70));
  console.log('NORMALIZAÇÃO DE PERFIS PSICOMÉTRICOS');
  console.log('='.repeat(70));
  console.log();

  // Create output directory
  await mkdir(OUTPUT_DIR, { recursive: true });

  const files = await readdir(INPUT_DIR);
  const jsonFiles = files.filter(f => f.endsWith('.json') && !f.startsWith('_'));

  const results = [];

  for (const file of jsonFiles) {
    try {
      const content = await readFile(join(INPUT_DIR, file), 'utf-8');
      const data = JSON.parse(content);

      const normalized = normalizeProfile(data, file);
      const completeness = calculateCompleteness(normalized.profile);

      // Generate output filename
      const outputFile = `${normalized.profile.id}.json`;
      await writeFile(
        join(OUTPUT_DIR, outputFile),
        JSON.stringify(normalized, null, 2),
        'utf-8'
      );

      results.push({
        original: file,
        normalized: outputFile,
        id: normalized.profile.id,
        name: normalized.profile.name,
        completeness
      });

      console.log(`✓ ${file} → ${outputFile} (${completeness}% completo)`);

    } catch (e) {
      console.log(`✗ ${file}: ${e.message}`);
    }
  }

  // Summary
  console.log();
  console.log('='.repeat(70));
  console.log('RESUMO');
  console.log('='.repeat(70));
  console.log(`Arquivos processados: ${results.length}`);
  console.log(`Output: ${OUTPUT_DIR}/`);
  console.log();
  console.log('ID'.padEnd(30), 'Nome'.padEnd(25), 'Completude');
  console.log('-'.repeat(70));
  for (const r of results.sort((a, b) => b.completeness - a.completeness)) {
    console.log(r.id.padEnd(30), r.name.padEnd(25), `${r.completeness}%`);
  }

  // Create index file
  const index = {
    schema_version: SCHEMA_VERSION,
    generated_at: new Date().toISOString(),
    profiles: results.map(r => ({
      id: r.id,
      name: r.name,
      file: r.normalized,
      completeness: r.completeness
    }))
  };

  await writeFile(
    join(OUTPUT_DIR, '_index.json'),
    JSON.stringify(index, null, 2),
    'utf-8'
  );

  console.log();
  console.log(`Índice gerado: ${OUTPUT_DIR}/_index.json`);
}

main().catch(console.error);

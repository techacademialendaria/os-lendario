/**
 * Verify no data was lost during normalization
 * Compares original vs normalized files
 */

import { readdir, readFile } from 'fs/promises';
import { join } from 'path';

const ORIGINAL_DIR = '../outputs/minds/mapeamento-cognitivo';
const NORMALIZED_DIR = '../outputs/minds/mapeamento-cognitivo/normalized';

// Deep count of all values (strings, numbers, booleans) in an object
function countValues(obj, path = '') {
  let count = 0;
  let details = [];

  if (obj === null || obj === undefined) return { count: 0, details: [] };

  if (Array.isArray(obj)) {
    for (let i = 0; i < obj.length; i++) {
      const result = countValues(obj[i], `${path}[${i}]`);
      count += result.count;
      details.push(...result.details);
    }
  } else if (typeof obj === 'object') {
    for (const [key, value] of Object.entries(obj)) {
      const newPath = path ? `${path}.${key}` : key;
      const result = countValues(value, newPath);
      count += result.count;
      details.push(...result.details);
    }
  } else {
    // Primitive value
    count = 1;
    if (typeof obj === 'string' && obj.length > 50) {
      details.push({ path, type: typeof obj, preview: obj.slice(0, 50) + '...' });
    } else {
      details.push({ path, type: typeof obj, value: obj });
    }
  }

  return { count, details };
}

// Extract all text content for comparison
function extractTextContent(obj) {
  const texts = [];

  function walk(o) {
    if (o === null || o === undefined) return;
    if (Array.isArray(o)) {
      o.forEach(walk);
    } else if (typeof o === 'object') {
      Object.values(o).forEach(walk);
    } else if (typeof o === 'string' && o.length > 20) {
      texts.push(o);
    }
  }

  walk(obj);
  return texts;
}

// Map original filename to normalized filename
function mapFilename(original) {
  const mapping = {
    'alan-nicolas-profile.json': 'alan_nicolas.json',
    'alex-hormozi-json.json': 'alex_hormozi.json',
    'dan koe.json': 'dan_koe.json',
    'elon-musk-json.json': 'elon_musk.json',
    'gary-vaynerchuk-json.json': 'gary_vaynerchuk.json',
    'jose_amorim_perfil_psicometrico.json': 'jose_amorim.json',
    'mark-manson.json': 'mark_manson.json',
    'naval.json': 'naval_ravikant.json',
    'peter-thiel-json-fixed.json': 'peter_thiel.json',
    'steve-jobs.json': 'steve_jobs.json',
    'warren-buffett-profile.json': 'warren_buffett.json'
  };
  return mapping[original];
}

async function compareFile(originalFile) {
  const normalizedFile = mapFilename(originalFile);
  if (!normalizedFile) return null;

  const originalContent = await readFile(join(ORIGINAL_DIR, originalFile), 'utf-8');
  const normalizedContent = await readFile(join(NORMALIZED_DIR, normalizedFile), 'utf-8');

  const original = JSON.parse(originalContent);
  const normalized = JSON.parse(normalizedContent);

  const originalProfile = original.profile || original;
  const normalizedProfile = normalized.profile;

  // Count values
  const origCount = countValues(originalProfile);
  const normCount = countValues(normalizedProfile);

  // Extract text for comparison
  const origTexts = extractTextContent(originalProfile);
  const normTexts = extractTextContent(normalizedProfile);

  // Find missing texts (in original but not in normalized)
  const missingTexts = origTexts.filter(t => !normTexts.some(nt => nt.includes(t) || t.includes(nt)));

  // Check specific important fields
  const importantFields = [
    'disc.D', 'disc.I', 'disc.S', 'disc.C',
    'enneagram.type', 'enneagram.core_fear', 'enneagram.instinct_stack',
    'mbti.type', 'mbti.cognitive_stack',
    'cognitive_stratum.level',
    'big_five.openness.total', 'big_five.conscientiousness.total',
    'dark_triad.narcissism.score',
    'unique_characteristics.superpower'
  ];

  const fieldCheck = [];
  for (const field of importantFields) {
    const parts = field.split('.');
    let origVal = originalProfile;
    let normVal = normalizedProfile;

    for (const part of parts) {
      origVal = origVal?.[part];
      normVal = normVal?.[part];
    }

    if (origVal !== undefined && normVal === undefined) {
      fieldCheck.push({ field, status: 'MISSING', original: origVal });
    } else if (JSON.stringify(origVal) !== JSON.stringify(normVal)) {
      fieldCheck.push({ field, status: 'CHANGED', original: origVal, normalized: normVal });
    }
  }

  return {
    file: originalFile,
    normalizedFile,
    originalValues: origCount.count,
    normalizedValues: normCount.count,
    valueDiff: normCount.count - origCount.count,
    originalTexts: origTexts.length,
    normalizedTexts: normTexts.length,
    missingTexts: missingTexts.length,
    missingTextSamples: missingTexts.slice(0, 3),
    fieldIssues: fieldCheck
  };
}

async function main() {
  console.log('='.repeat(80));
  console.log('VERIFICAÇÃO DE INTEGRIDADE - Original vs Normalizado');
  console.log('='.repeat(80));
  console.log();

  const files = await readdir(ORIGINAL_DIR);
  const jsonFiles = files.filter(f => f.endsWith('.json') && !f.startsWith('_'));

  let totalIssues = 0;

  for (const file of jsonFiles) {
    const result = await compareFile(file);
    if (!result) continue;

    const hasIssues = result.missingTexts > 0 || result.fieldIssues.length > 0;
    const status = hasIssues ? '⚠️' : '✅';

    console.log(`${status} ${result.file}`);
    console.log(`   Valores: ${result.originalValues} → ${result.normalizedValues} (${result.valueDiff >= 0 ? '+' : ''}${result.valueDiff})`);
    console.log(`   Textos: ${result.originalTexts} → ${result.normalizedTexts}`);

    if (result.missingTexts > 0) {
      console.log(`   ⚠️  Textos possivelmente perdidos: ${result.missingTexts}`);
      result.missingTextSamples.forEach(t => {
        console.log(`      - "${t.slice(0, 60)}..."`);
      });
      totalIssues++;
    }

    if (result.fieldIssues.length > 0) {
      console.log(`   ⚠️  Campos alterados:`);
      result.fieldIssues.forEach(i => {
        console.log(`      - ${i.field}: ${i.status}`);
      });
      totalIssues++;
    }

    console.log();
  }

  console.log('='.repeat(80));
  if (totalIssues === 0) {
    console.log('✅ VERIFICAÇÃO OK - Nenhuma perda de dados detectada');
  } else {
    console.log(`⚠️  ${totalIssues} arquivo(s) com possíveis alterações - revisar manualmente`);
  }
}

main().catch(console.error);

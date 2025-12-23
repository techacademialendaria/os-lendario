/**
 * Analyze psychometric profile files to identify structure differences
 */

import { readdir, readFile } from 'fs/promises';
import { join } from 'path';

const DIR = '../outputs/minds/mapeamento-cognitivo';

async function analyzeFile(filename) {
  const content = await readFile(join(DIR, filename), 'utf-8');

  if (filename.endsWith('.jsonl')) {
    const lines = content.trim().split('\n');
    return {
      file: filename,
      type: 'jsonl',
      records: lines.length,
      sample: JSON.parse(lines[0])
    };
  }

  if (filename.endsWith('.yaml')) {
    return {
      file: filename,
      type: 'yaml',
      size: content.length
    };
  }

  const data = JSON.parse(content);
  const profile = data.profile || data;

  return {
    file: filename,
    type: 'json',
    id: profile.id || profile.name || 'unknown',
    name: profile.name,
    topKeys: Object.keys(profile),
    hasDisc: !!profile.disc,
    hasEnneagram: !!profile.enneagram,
    hasMbti: !!profile.mbti,
    hasCognitiveStratum: !!profile.cognitive_stratum || !!profile.stratified_systems,
    hasBigFive: !!profile.big_five,
    hasDarkTriad: !!profile.dark_triad,
    hasIntelligence: !!profile.intelligence,
    hasHexaco: !!profile.hexaco,
    hasMetadata: !!data.metadata,
    discKeys: profile.disc ? Object.keys(profile.disc) : [],
    enneagramKeys: profile.enneagram ? Object.keys(profile.enneagram) : [],
    mbtiKeys: profile.mbti ? Object.keys(profile.mbti) : []
  };
}

async function main() {
  const files = await readdir(DIR);
  const dataFiles = files.filter(f => f.endsWith('.json') || f.endsWith('.yaml') || f.endsWith('.jsonl'));

  console.log('='.repeat(80));
  console.log('ANÁLISE DE ESTRUTURA - mapeamento-cognitivo');
  console.log('='.repeat(80));
  console.log();

  const results = [];

  for (const file of dataFiles) {
    if (file === '.DS_Store') continue;
    try {
      const analysis = await analyzeFile(file);
      results.push(analysis);
    } catch (e) {
      console.log(`ERROR ${file}: ${e.message}`);
    }
  }

  // Summary table
  console.log('=== COBERTURA DE FRAMEWORKS ===\n');
  console.log('Arquivo'.padEnd(35), 'DISC', 'ENEA', 'MBTI', 'STRAT', 'BIG5', 'DARK', 'INTL', 'HEXA');
  console.log('-'.repeat(95));

  for (const r of results) {
    if (r.type !== 'json') continue;
    console.log(
      r.file.slice(0, 34).padEnd(35),
      r.hasDisc ? '✓' : '-',
      r.hasEnneagram ? '✓' : '-',
      r.hasMbti ? '✓' : '-',
      r.hasCognitiveStratum ? '✓' : '-',
      r.hasBigFive ? '✓' : '-',
      r.hasDarkTriad ? '✓' : '-',
      r.hasIntelligence ? '✓' : '-',
      r.hasHexaco ? '✓' : '-'
    );
  }

  // DISC structure comparison
  console.log('\n=== ESTRUTURA DISC ===\n');
  const discStructures = new Map();
  for (const r of results) {
    if (r.type !== 'json' || !r.hasDisc) continue;
    const key = r.discKeys.sort().join(',');
    if (!discStructures.has(key)) discStructures.set(key, []);
    discStructures.get(key).push(r.file);
  }
  for (const [keys, files] of discStructures) {
    console.log(`Estrutura: ${keys}`);
    console.log(`  Arquivos: ${files.join(', ')}\n`);
  }

  // Enneagram structure comparison
  console.log('=== ESTRUTURA ENNEAGRAM ===\n');
  const enneagramStructures = new Map();
  for (const r of results) {
    if (r.type !== 'json' || !r.hasEnneagram) continue;
    const key = r.enneagramKeys.sort().join(',');
    if (!enneagramStructures.has(key)) enneagramStructures.set(key, []);
    enneagramStructures.get(key).push(r.file);
  }
  for (const [keys, files] of enneagramStructures) {
    console.log(`Estrutura: ${keys}`);
    console.log(`  Arquivos: ${files.join(', ')}\n`);
  }

  // Top-level keys comparison
  console.log('=== CAMPOS TOP-LEVEL ===\n');
  const allKeys = new Set();
  for (const r of results) {
    if (r.type !== 'json') continue;
    r.topKeys.forEach(k => allKeys.add(k));
  }

  console.log('Campo'.padEnd(30), 'Presente em');
  console.log('-'.repeat(80));
  for (const key of [...allKeys].sort()) {
    const count = results.filter(r => r.type === 'json' && r.topKeys.includes(key)).length;
    const total = results.filter(r => r.type === 'json').length;
    console.log(key.padEnd(30), `${count}/${total} arquivos`);
  }
}

main().catch(console.error);

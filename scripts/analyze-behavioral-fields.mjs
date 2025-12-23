/**
 * Analyze behavioral fields across all psychometric profiles
 * Identify what's replicable vs unique
 */

import { readdir, readFile } from 'fs/promises';
import { join } from 'path';

const DIR = '../outputs/minds/mapeamento-cognitivo';

async function main() {
  const files = await readdir(DIR);
  const jsonFiles = files.filter(f => f.endsWith('.json') && !f.startsWith('_'));

  console.log('='.repeat(80));
  console.log('ANÁLISE DE DADOS COMPORTAMENTAIS - Replicabilidade');
  console.log('='.repeat(80));
  console.log();

  const allFields = new Map();
  const results = [];

  for (const file of jsonFiles) {
    const content = await readFile(join(DIR, file), 'utf-8');
    const data = JSON.parse(content);
    const p = data.profile || data;

    const behavioral = {
      file: file.replace('.json', ''),
      // DISC behaviors
      disc_specific_behaviors: p.disc?.specific_behaviors?.length || 0,
      // Enneagram
      enneagram_behavioral_evidence: p.enneagram?.behavioral_evidence?.length || 0,
      enneagram_repetitive_patterns: p.enneagram?.repetitive_patterns?.length || 0,
      enneagram_stress_behaviors: Array.isArray(p.enneagram?.stress_behaviors)
        ? p.enneagram.stress_behaviors.length
        : (p.enneagram?.stress_behaviors ? 1 : 0),
      enneagram_growth_behaviors: p.enneagram?.growth_behaviors ? 1 : 0,
      // MBTI cognitive manifestations
      mbti_manifestations: (
        (p.mbti?.cognitive_stack?.dominant?.manifestations?.length || 0) +
        (p.mbti?.cognitive_stack?.auxiliary?.manifestations?.length || 0) +
        (p.mbti?.cognitive_stack?.tertiary?.manifestations?.length || 0) +
        (p.mbti?.cognitive_stack?.inferior?.manifestations?.length || 0)
      ),
      // Crisis patterns
      crisis_patterns: p.crisis_patterns ? Object.keys(p.crisis_patterns).length : 0,
      // Standalone behavioral_patterns (peter-thiel style)
      behavioral_patterns: p.behavioral_patterns?.length || 0,
      // Convergence analysis
      convergence_alignments: p.convergence_analysis?.powerful_alignments?.length || 0,
      convergence_tensions: p.convergence_analysis?.productive_tensions?.length || 0,
      convergence_limitations: p.convergence_analysis?.compound_limitations?.length || 0,
      // Unique characteristics
      superpower: Array.isArray(p.unique_characteristics?.superpower)
        ? p.unique_characteristics.superpower.length
        : (p.unique_characteristics?.superpower ? 1 : 0),
      kryptonite: Array.isArray(p.unique_characteristics?.kryptonite)
        ? p.unique_characteristics.kryptonite.length
        : (p.unique_characteristics?.kryptonite ? 1 : 0),
      // Predictions
      predictions: p.predictions?.high_probability?.length || 0,
      // Interaction guide
      interaction_guide: p.interaction_guide ? 1 : 0,
      // Development roadmap
      development_roadmap: p.development_roadmap ? 1 : 0
    };

    results.push(behavioral);

    // Track all fields
    for (const [key, value] of Object.entries(behavioral)) {
      if (key === 'file') continue;
      if (!allFields.has(key)) allFields.set(key, { total: 0, count: 0 });
      allFields.get(key).total += value;
      if (value > 0) allFields.get(key).count++;
    }
  }

  // Print table
  console.log('COBERTURA POR ARQUIVO:');
  console.log();

  const headers = ['Arquivo', 'DISC', 'ENEA', 'MBTI', 'Crisis', 'Conv', 'Super', 'Krypt', 'Pred'];
  console.log(headers.map((h, i) => i === 0 ? h.padEnd(25) : h.padStart(6)).join(''));
  console.log('-'.repeat(80));

  for (const r of results) {
    const row = [
      r.file.slice(0, 24).padEnd(25),
      String(r.disc_specific_behaviors).padStart(6),
      String(r.enneagram_behavioral_evidence + r.enneagram_repetitive_patterns).padStart(6),
      String(r.mbti_manifestations).padStart(6),
      String(r.crisis_patterns).padStart(6),
      String(r.convergence_alignments).padStart(6),
      String(r.superpower).padStart(6),
      String(r.kryptonite).padStart(6),
      String(r.predictions).padStart(6)
    ];
    console.log(row.join(''));
  }

  console.log();
  console.log('='.repeat(80));
  console.log('RESUMO - CAMPOS COMPORTAMENTAIS REPLICÁVEIS:');
  console.log('='.repeat(80));
  console.log();

  const sorted = [...allFields.entries()].sort((a, b) => b[1].count - a[1].count);

  console.log('Campo'.padEnd(35), 'Presente em', 'Total items');
  console.log('-'.repeat(60));

  for (const [field, stats] of sorted) {
    const coverage = `${stats.count}/${results.length}`;
    const status = stats.count === results.length ? '✅' : stats.count >= 8 ? '⚠️' : '❌';
    console.log(`${status} ${field.padEnd(33)} ${coverage.padStart(8)} ${String(stats.total).padStart(10)}`);
  }

  console.log();
  console.log('='.repeat(80));
  console.log('RECOMENDAÇÃO:');
  console.log('='.repeat(80));
  console.log();
  console.log('✅ CORE (11/11) - Padronizar obrigatoriamente:');
  console.log('   - disc.specific_behaviors');
  console.log('   - enneagram.behavioral_evidence (+ repetitive_patterns)');
  console.log('   - mbti.cognitive_stack.*.manifestations');
  console.log('   - unique_characteristics.superpower/kryptonite');
  console.log();
  console.log('⚠️  COMUM (8-10/11) - Padronizar se disponível:');
  console.log('   - crisis_patterns');
  console.log('   - convergence_analysis');
  console.log('   - predictions');
  console.log('   - development_roadmap');
  console.log();
  console.log('❌ ESPECÍFICO - Preservar mas não exigir:');
  console.log('   - behavioral_patterns (standalone, peter-thiel style)');
  console.log('   - campos únicos em unique_characteristics');
}

main().catch(console.error);

#!/usr/bin/env node

/**
 * Validate Mind History YAML Files
 *
 * Checks all history.yaml files in outputs/minds for:
 * - Valid YAML syntax
 * - Required fields (version, quote, events, achievements)
 * - Event structure (id, year, title, type, relevance)
 * - No duplicate event IDs
 *
 * Usage: node app/scripts/validate-histories.mjs
 *    or: node app/scripts/validate-histories.mjs [pattern]
 *    or: node app/scripts/validate-histories.mjs --fix
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import yaml from 'js-yaml';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MINDS_DIR = path.resolve(__dirname, '../../outputs/minds');
const FIX_MODE = process.argv[2] === '--fix';
const PATTERN = process.argv[2] && process.argv[2] !== '--fix'
  ? process.argv[2]
  : '*';

let stats = {
  total: 0,
  valid: 0,
  invalid: 0,
  warnings: 0,
  errors: [],
  warnings_list: []
};

function validateHistoryYaml(filePath, mindSlug) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');

    // Parse YAML
    let data;
    try {
      data = yaml.load(content);
    } catch (e) {
      return {
        valid: false,
        error: `YAML Parse Error: ${e.message}`
      };
    }

    if (!data) {
      return {
        valid: false,
        error: 'Empty YAML file'
      };
    }

    const issues = [];

    // Check required fields
    if (!data.version) issues.push('Missing: version');
    if (!data.quote) issues.push('Missing: quote');
    if (!data.events || !Array.isArray(data.events)) issues.push('Missing or invalid: events (must be array)');
    if (!data.achievements || !Array.isArray(data.achievements)) issues.push('Warning: missing achievements array');

    // Validate events
    if (data.events && Array.isArray(data.events)) {
      const eventIds = new Set();
      const eventTypes = ['origin', 'milestone', 'pivot', 'crisis', 'learning'];

      data.events.forEach((event, idx) => {
        const eventPath = `events[${idx}]`;

        if (!event.id) issues.push(`${eventPath}: Missing id`);
        if (event.id && eventIds.has(event.id)) {
          issues.push(`${eventPath}: Duplicate event id: ${event.id}`);
        }
        if (event.id) eventIds.add(event.id);

        if (!event.year) issues.push(`${eventPath}: Missing year`);
        if (!event.title) issues.push(`${eventPath}: Missing title`);
        if (!event.description) issues.push(`${eventPath}: Missing description`);
        if (!event.type) issues.push(`${eventPath}: Missing type`);
        if (event.type && !eventTypes.includes(event.type)) {
          issues.push(`${eventPath}: Invalid type "${event.type}" (must be one of: ${eventTypes.join(', ')})`);
        }

        // Relevance should be 1-10
        if (event.relevance !== undefined) {
          if (typeof event.relevance !== 'number' || event.relevance < 1 || event.relevance > 10) {
            issues.push(`${eventPath}: Invalid relevance "${event.relevance}" (must be 1-10)`);
          }
        }

        if (!event.details || !Array.isArray(event.details)) {
          issues.push(`${eventPath}: Missing or invalid details (must be array)`);
        }
      });

      if (data.events.length === 0) {
        issues.push('events array is empty');
      }
    }

    // Check journey themes
    if (data.journey_themes && Array.isArray(data.journey_themes)) {
      data.journey_themes.forEach((theme, idx) => {
        if (!theme.theme) issues.push(`journey_themes[${idx}]: Missing theme name`);
        if (!theme.description) issues.push(`journey_themes[${idx}]: Missing description`);
      });
    }

    // Categorize issues
    const errors = issues.filter(i => !i.startsWith('Warning:'));
    const warnings = issues.filter(i => i.startsWith('Warning:'));

    return {
      valid: errors.length === 0,
      errors,
      warnings,
      stats: {
        events: data.events?.length || 0,
        achievements: data.achievements?.length || 0,
        themes: data.journey_themes?.length || 0
      }
    };
  } catch (error) {
    return {
      valid: false,
      error: `Unexpected error: ${error.message}`
    };
  }
}

async function main() {
  console.log(`\n🔍 Validating Mind History YAML Files`);
  console.log(`Pattern: ${PATTERN}`);
  console.log(`Mode: ${FIX_MODE ? 'FIX (fixing issues)' : 'CHECK (validation only)'}`);
  console.log(`---\n`);

  // Find all mind directories
  const mindDirs = fs.readdirSync(MINDS_DIR).filter(dir => {
    const fullPath = path.join(MINDS_DIR, dir);
    return fs.statSync(fullPath).isDirectory() &&
           (PATTERN === '*' || dir.includes(PATTERN));
  });

  if (mindDirs.length === 0) {
    console.log(`❌ No minds found matching pattern: ${PATTERN}`);
    process.exit(1);
  }

  console.log(`Found ${mindDirs.length} minds to validate:\n`);

  // Validate each mind
  for (const mindSlug of mindDirs.sort()) {
    const historyPath = path.join(MINDS_DIR, mindSlug, 'history.yaml');

    if (!fs.existsSync(historyPath)) {
      console.log(`⏭️  ${mindSlug}: No history.yaml`);
      continue;
    }

    stats.total++;
    const result = validateHistoryYaml(historyPath, mindSlug);

    if (result.valid) {
      stats.valid++;
      console.log(`✅ ${mindSlug}`);
      console.log(`   Events: ${result.stats.events} | Achievements: ${result.stats.achievements} | Themes: ${result.stats.themes}`);
    } else {
      stats.invalid++;
      console.log(`❌ ${mindSlug}`);

      if (result.error) {
        console.log(`   Error: ${result.error}`);
        stats.errors.push({ mind: mindSlug, error: result.error });
      }

      if (result.errors && result.errors.length > 0) {
        result.errors.forEach(err => {
          console.log(`   ❌ ${err}`);
        });
        stats.errors.push({ mind: mindSlug, issues: result.errors });
      }

      if (result.warnings && result.warnings.length > 0) {
        stats.warnings += result.warnings.length;
        result.warnings.forEach(warn => {
          console.log(`   ⚠️  ${warn}`);
        });
      }
    }
  }

  // Summary
  console.log(`\n---\n`);
  console.log(`📊 VALIDATION SUMMARY`);
  console.log(`Total:   ${stats.total}`);
  console.log(`✅ Valid:   ${stats.valid}/${stats.total} (${Math.round(stats.valid/stats.total*100)}%)`);
  console.log(`❌ Invalid: ${stats.invalid}/${stats.total}`);
  console.log(`⚠️  Warnings: ${stats.warnings}`);

  if (stats.errors.length > 0) {
    console.log(`\n❌ VALIDATION FAILED\n`);
    process.exit(1);
  } else {
    console.log(`\n✅ ALL VALIDATIONS PASSED\n`);
    process.exit(0);
  }
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});

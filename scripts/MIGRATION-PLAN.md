# CreatorOS Migration Plan - Course Documents to Supabase

## Overview

Migrate all course documents from local filesystem (`outputs/courses/`) to Supabase `contents` table.

## Content Type Structure

| Content Type | Files | metadata.subtype |
|--------------|-------|------------------|
| `course_planning` | `COURSE-BRIEF*.md` | `brief` |
| | `curriculum.yaml` | `curriculum` |
| | `course-outline.md` | `outline` |
| | (from YAML) market_intelligence | `market_intelligence` |
| | (from YAML) learning_objectives | `learning_objectives` |
| `course_output` | `CURSO-COMPLETO*.md`, `CURSO-PRONTO*.md` | `compiled` |
| | `FINAL-SUMMARY*.md`, `SUMARIO-EXECUTIVO*.md` | `summary` |
| | `README.md` | `readme` |
| | `modulo-*.md` (standalone) | `module_content` |
| `course_report` | `GENERATION-STATUS*.md`, `PROGRESS-REPORT*.md` | `progress` |
| | `RELATORIO_*.md` | `module_report` |
| | `CONTEXTO_*.md` | `context` |
| | `PROMPT_*.md` | `prompt` |
| | `SESSAO_*.md` | `session` |
| `course_qa` | `VALIDACAO*.md`, `VALIDATION-REPORT*.md` | `validation` |
| | `avaliacao-*.md` | `review` |

## File Pattern Mapping

```javascript
const FILE_MAPPINGS = {
  // Planning
  { pattern: /^COURSE-BRIEF.*\.md$/i, type: 'course_planning', subtype: 'brief' },
  { pattern: /^curriculum\.yaml$/i, type: 'course_planning', subtype: 'curriculum' },
  { pattern: /^course-outline\.md$/i, type: 'course_planning', subtype: 'outline' },

  // Output
  { pattern: /^CURSO-COMPLETO.*\.md$/i, type: 'course_output', subtype: 'compiled' },
  { pattern: /^CURSO-PRONTO.*\.md$/i, type: 'course_output', subtype: 'compiled' },
  { pattern: /^FINAL-SUMMARY.*\.md$/i, type: 'course_output', subtype: 'summary' },
  { pattern: /^SUMARIO-EXECUTIVO.*\.md$/i, type: 'course_output', subtype: 'summary' },
  { pattern: /^README\.md$/i, type: 'course_output', subtype: 'readme' },
  { pattern: /^modulo-.*\.md$/i, type: 'course_output', subtype: 'module_content' },

  // Reports
  { pattern: /^GENERATION-STATUS.*\.md$/i, type: 'course_report', subtype: 'progress' },
  { pattern: /^PROGRESS-REPORT.*\.md$/i, type: 'course_report', subtype: 'progress' },
  { pattern: /^RELATORIO_.*\.md$/i, type: 'course_report', subtype: 'module_report' },
  { pattern: /^CONTEXTO_.*\.md$/i, type: 'course_report', subtype: 'context' },
  { pattern: /^PROMPT_.*\.md$/i, type: 'course_report', subtype: 'prompt' },
  { pattern: /^SESSAO_.*\.md$/i, type: 'course_report', subtype: 'session' },

  // QA
  { pattern: /^VALIDACAO.*\.md$/i, type: 'course_qa', subtype: 'validation' },
  { pattern: /^VALIDATION-REPORT.*\.md$/i, type: 'course_qa', subtype: 'validation' },
  { pattern: /^avaliacao-.*\.md$/i, type: 'course_qa', subtype: 'review' },
};
```

## Insert Structure

```javascript
{
  project_id: '<uuid>',           // From content_projects
  content_type: 'course_planning', // One of the 4 types
  slug: 'claude-code-course-brief', // Generated: {course}-{subtype}
  title: 'Course Brief',          // From file or generated
  content: '<file contents>',     // Raw markdown/yaml
  metadata: {
    subtype: 'brief',             // Specific subtype
    source_file: 'COURSE-BRIEF.md', // Original filename
    migrated_at: '2025-12-11',    // Migration timestamp
  },
  ai_generated: false,            // These are human-created docs
  status: 'published',
  file_path: 'outputs/courses/claude-code/COURSE-BRIEF.md',
}
```

## Migration Steps

### Phase 1: Audit (DONE)
- [x] Update audit script with new content types
- [x] Run audit to identify gaps

### Phase 2: Migrate Planning Docs
1. For each course with `planning` gaps:
   - Read COURSE-BRIEF*.md → insert as `course_planning` (subtype: brief)
   - Read curriculum.yaml → insert as `course_planning` (subtype: curriculum)
   - Read course-outline.md → insert as `course_planning` (subtype: outline)
   - Extract market_intelligence from YAML → insert as `course_planning` (subtype: market_intelligence)
   - Extract learning_objectives from YAML → insert as `course_planning` (subtype: learning_objectives)

### Phase 3: Migrate Output Docs
1. For each course with `output` gaps:
   - Read CURSO-COMPLETO*.md, CURSO-PRONTO*.md → insert as `course_output` (subtype: compiled)
   - Read FINAL-SUMMARY*.md, SUMARIO-EXECUTIVO*.md → insert as `course_output` (subtype: summary)
   - Read README.md → insert as `course_output` (subtype: readme)

### Phase 4: Migrate Report Docs
1. For each course with `report` gaps:
   - Read reports/*.md files → insert as `course_report` with appropriate subtype

### Phase 5: Migrate QA Docs
1. For each course with `qa` gaps:
   - Read VALIDACAO*.md, VALIDATION-REPORT*.md → insert as `course_qa` (subtype: validation)
   - Read avaliacao-*.md → insert as `course_qa` (subtype: review)

### Phase 6: Verify
1. Re-run audit script
2. Verify 100% score for all courses

## Rollback Plan

If migration fails:
```sql
-- Delete migrated docs by timestamp
DELETE FROM contents
WHERE metadata->>'migrated_at' = '2025-12-11'
  AND content_type IN ('course_planning', 'course_output', 'course_report', 'course_qa');
```

## Current Gaps Summary

| Course | Planning | Output | Report | QA |
|--------|----------|--------|--------|-----|
| claude-code | 2 | 5 | 2 | 1 |
| didatica-lendaria | 1 | 0 | 1 | 0 |
| dominando-obsidian | 1 | 2 | 0 | 0 |
| metodo-mapa | 1 | 1 | 0 | 0 |
| meu-clone-ia | 1 | 1 | 0 | 0 |
| prompt-engineer | 1 | 0 | 0 | 0 |
| supabase-zero-backend | 2 | 1 | 14 | 2 |
| vibecoding | 1 | 1 | 0 | 1 |

**Total docs to migrate: ~40 documents**

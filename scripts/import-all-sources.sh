#!/bin/bash
# Load environment variables from .env.local
set -a
source "$(dirname "$0")/../.env.local" 2>/dev/null || {
  echo "Error: .env.local not found. Create it with VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY"
  exit 1
}
set +a

cd "$(dirname "$0")/.."

minds=(
  naval_ravikant
  marty_cagan
  thiago_finch
  sam_altman
  steven_pinker
  academia_lendaria
  kapil_gupta
  cadu_souza
  steve_jobs
  jon_benson
  abilio_diniz
  gary_halbert
  pedro_valerio
  rafa_medeiros
  jesus_cristo
  alex_hormozi
  seth_godin
  cagan_patton
  dan_kennedy
  eugene_schwartz
  russel_brunson
  yuval_harari
  gary_vee
  peter_thiel
  jeff_patton
  napoleon_hill
  mark_manson
  daniel_kahneman
  leonardo_da_vinci
  dan_koe
  ray_kurzweil
  alan_nicolas
  roger_medke
  paul_graham
  joao_lozano
)

for slug in "${minds[@]}"; do
  echo "=== Processing: $slug ==="
  node scripts/import-mind-sources.mjs "$slug" 2>&1 | grep -E "(Found|Created|Imported|Skipped|Errors|not found|Total)" || true
  echo ""
done

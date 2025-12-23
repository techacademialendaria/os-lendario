/**
 * Check Mind Sources/Contents in Supabase
 * Usage:
 *   node app/scripts/check-mind-contents.mjs alan_nicolas sources
 *   node app/scripts/check-mind-contents.mjs alan_nicolas contents
 */
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

async function checkSources(mindSlug) {
  // Get mind
  const { data: mind, error: mindErr } = await supabase
    .from('minds')
    .select('id, slug, display_name')
    .eq('slug', mindSlug)
    .is('deleted_at', null)
    .single();

  if (mindErr || !mind) {
    console.log('❌ Mind "' + mindSlug + '" não encontrada');
    return;
  }

  console.log('🧠 Mind:', mind.display_name, '(' + mind.id + ')');

  // Get sources
  const { data: sources, error } = await supabase
    .from('sources')
    .select('id, title, type, author, published_date, quality, language, url, created_at')
    .eq('mind_id', mind.id)
    .order('published_date', { ascending: false });

  if (error) {
    console.error('Erro:', error.message);
    return;
  }

  console.log('\n📊 Total de sources:', sources.length);

  if (sources.length === 0) {
    console.log('\n⚠️  Nenhuma source encontrada para esta mind');
    return;
  }

  // Group by type
  const byType = {};
  sources.forEach(s => {
    byType[s.type] = (byType[s.type] || 0) + 1;
  });

  console.log('\n📂 Por tipo:');
  Object.entries(byType).sort((a, b) => b[1] - a[1]).forEach(([type, count]) => {
    console.log('  -', type + ':', count);
  });

  // Group by quality
  const byQuality = {};
  sources.forEach(s => {
    byQuality[s.quality] = (byQuality[s.quality] || 0) + 1;
  });

  console.log('\n⭐ Por qualidade:');
  Object.entries(byQuality).sort((a, b) => b[1] - a[1]).forEach(([q, count]) => {
    console.log('  -', q + ':', count);
  });

  // List sources
  console.log('\n📝 Lista de sources:');
  sources.forEach((s, i) => {
    console.log((i+1) + '. [' + s.type + '] ' + s.title);
    console.log('   Autor:', s.author || '-', '| Data:', s.published_date, '| Qualidade:', s.quality);
    if (s.url) console.log('   URL:', s.url);
  });
}

async function checkContents(mindSlug) {
  // Get mind
  const { data: mind, error: mindErr } = await supabase
    .from('minds')
    .select('id, slug, display_name')
    .eq('slug', mindSlug)
    .is('deleted_at', null)
    .single();

  if (mindErr || !mind) {
    console.log('❌ Mind "' + mindSlug + '" não encontrada');
    return;
  }

  console.log('🧠 Mind:', mind.display_name, '(' + mind.id + ')');

  // Get project
  const { data: project } = await supabase
    .from('content_projects')
    .select('id, slug, name, project_type')
    .eq('persona_mind_id', mind.id)
    .eq('project_type', 'mind_artifacts')
    .single();

  if (!project) {
    console.log('❌ Nenhum projeto mind_artifacts encontrado');
    return;
  }

  console.log('\n📁 Projeto:', project.name, '(' + project.slug + ')');

  // Get contents
  const { data: contents, error } = await supabase
    .from('contents')
    .select('id, slug, title, content_type, ai_generated, status, metadata, created_at')
    .eq('project_id', project.id)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Erro:', error.message);
    return;
  }

  console.log('\n📊 Total de conteúdos importados:', contents.length);

  // Group by category
  const byCategory = {};
  contents.forEach(c => {
    const cat = c.metadata?.category || 'unknown';
    byCategory[cat] = (byCategory[cat] || 0) + 1;
  });

  console.log('\n📂 Por categoria:');
  Object.entries(byCategory).sort((a, b) => b[1] - a[1]).forEach(([cat, count]) => {
    console.log('  -', cat + ':', count);
  });

  // Group by source dir
  const bySource = {};
  contents.forEach(c => {
    const src = c.metadata?.source_dir || 'unknown';
    bySource[src] = (bySource[src] || 0) + 1;
  });

  console.log('\n📂 Por diretório fonte:');
  Object.entries(bySource).sort((a, b) => b[1] - a[1]).forEach(([src, count]) => {
    console.log('  -', src + ':', count);
  });

  // List all contents
  console.log('\n📝 Lista completa de conteúdos:');
  contents.forEach((c, i) => {
    const cat = c.metadata?.category || 'unknown';
    const srcFile = c.metadata?.source_file || '';
    console.log((i+1) + '. [' + cat + '] ' + c.title);
    console.log('   -> ' + srcFile);
  });
}

async function checkContentTypes() {
  const { data, error } = await supabase
    .from('contents')
    .select('content_type')
    .limit(1000);

  if (error) {
    console.error('Error:', error.message);
    return;
  }

  const types = [...new Set(data.map(d => d.content_type))];
  console.log('📊 Content types in use:', types);

  // Count per type
  const counts = {};
  data.forEach(d => {
    counts[d.content_type] = (counts[d.content_type] || 0) + 1;
  });
  console.log('\n📂 Count per type:');
  Object.entries(counts).sort((a,b) => b[1] - a[1]).forEach(([t, c]) => {
    console.log('  -', t + ':', c);
  });
}

async function checkProjectTypes() {
  const { data, error } = await supabase
    .from('content_projects')
    .select('project_type, status')
    .limit(1000);

  if (error) {
    console.error('Error:', error.message);
    return;
  }

  const types = [...new Set(data.map(d => d.project_type))];
  console.log('📊 Project types in use:', types);

  const statuses = [...new Set(data.map(d => d.status))];
  console.log('📊 Statuses in use:', statuses);

  // Count per type
  const counts = {};
  data.forEach(d => {
    counts[d.project_type] = (counts[d.project_type] || 0) + 1;
  });
  console.log('\n📂 Count per type:');
  Object.entries(counts).sort((a,b) => b[1] - a[1]).forEach(([t, c]) => {
    console.log('  -', t + ':', c);
  });
}

const mindSlug = process.argv[2] || 'alan_nicolas';
const mode = process.argv[3] || 'sources';

if (mode === 'types') {
  checkContentTypes();
} else if (mode === 'project-types') {
  checkProjectTypes();
} else if (mode === 'sources') {
  checkSources(mindSlug);
} else {
  checkContents(mindSlug);
}

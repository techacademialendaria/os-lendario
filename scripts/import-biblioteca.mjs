/**
 * Script: import-biblioteca.mjs
 * Importa resumos de livros do Obsidian para o Supabase
 *
 * Operações:
 * 1. Cria content_project "biblioteca"
 * 2. Parseia arquivos markdown da pasta de livros
 * 3. Cria minds para autores que não existem
 * 4. Cria contents para cada livro
 * 5. Vincula autores aos livros via content_minds
 */

import { config } from 'dotenv';
import { createClient } from '@supabase/supabase-js';

// Load .env.local
config({ path: '.env.local' });
import { readdir, readFile } from 'fs/promises';
import { join } from 'path';

// Config
const LIVROS_PATH = '/Users/alan/Library/Mobile Documents/iCloud~md~obsidian/Documents/mentelendaria/Livros';
const DRY_RUN = process.argv.includes('--dry-run');

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

// Helpers
function slugify(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove acentos
    .replace(/[^a-z0-9]+/g, '_')     // Substitui não-alfanuméricos por _
    .replace(/^_+|_+$/g, '')         // Remove _ do início/fim
    .replace(/_+/g, '_');            // Remove _ duplicados
}

function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return { frontmatter: {}, body: content };

  const frontmatterText = match[1];
  const body = content.slice(match[0].length).trim();

  const frontmatter = {};
  const lines = frontmatterText.split('\n');

  for (const line of lines) {
    const colonIndex = line.indexOf(':');
    if (colonIndex === -1) continue;

    const key = line.slice(0, colonIndex).trim();
    let value = line.slice(colonIndex + 1).trim();

    // Remove aspas
    if ((value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }

    frontmatter[key] = value;
  }

  return { frontmatter, body };
}

function mapStatus(obsidianStatus) {
  const statusMap = {
    'read': 'published',
    'completed': 'published',
    'unread': 'draft',
    'reading': 'draft',
    'to-read': 'draft'
  };
  return statusMap[obsidianStatus?.toLowerCase()] || 'draft';
}

function parseRating(rating) {
  if (!rating) return null;
  // Count stars ⭐ or numbers
  const starCount = (rating.match(/⭐/g) || []).length;
  if (starCount > 0) return starCount;
  const num = parseInt(rating);
  return isNaN(num) ? null : num;
}

// Main
async function main() {
  console.log('📚 Importação da Biblioteca de Livros');
  console.log('=====================================');
  if (DRY_RUN) console.log('🔍 MODO DRY-RUN - Nenhuma alteração será feita\n');

  // 1. Buscar minds existentes
  console.log('1️⃣ Buscando minds existentes...');
  const { data: existingMinds, error: mindsError } = await supabase
    .from('minds')
    .select('id, slug, name');

  if (mindsError) throw new Error(`Erro ao buscar minds: ${mindsError.message}`);

  const mindsByName = new Map();
  const mindsBySlug = new Map();
  existingMinds.forEach(m => {
    mindsByName.set(m.name.toLowerCase(), m);
    mindsBySlug.set(m.slug, m);
  });
  console.log(`   ✓ ${existingMinds.length} minds encontrados\n`);

  // 2. Criar/buscar content_project "biblioteca"
  console.log('2️⃣ Configurando projeto "biblioteca"...');
  let projectId;

  const { data: existingProject } = await supabase
    .from('content_projects')
    .select('id')
    .eq('slug', 'biblioteca')
    .single();

  if (existingProject) {
    projectId = existingProject.id;
    console.log(`   ✓ Projeto já existe (${projectId})\n`);
  } else if (!DRY_RUN) {
    const { data: newProject, error: projectError } = await supabase
      .from('content_projects')
      .insert({
        slug: 'biblioteca',
        name: 'Biblioteca de Livros',
        description: 'Resumos e notas de livros do segundo cérebro',
        project_type: 'documentation',
        status: 'in_progress'
      })
      .select('id')
      .single();

    if (projectError) throw new Error(`Erro ao criar projeto: ${projectError.message}`);
    projectId = newProject.id;
    console.log(`   ✓ Projeto criado (${projectId})\n`);
  } else {
    console.log('   [DRY-RUN] Projeto seria criado\n');
    projectId = 'dry-run-id';
  }

  // 3. Ler arquivos de livros
  console.log('3️⃣ Lendo arquivos de livros...');
  const files = await readdir(LIVROS_PATH);
  const mdFiles = files.filter(f => f.endsWith('.md') && f !== 'Livros.md');
  console.log(`   ✓ ${mdFiles.length} arquivos encontrados\n`);

  // 4. Processar cada livro
  console.log('4️⃣ Processando livros...\n');

  const stats = {
    processed: 0,
    skipped: 0,
    mindsCreated: 0,
    contentsCreated: 0,
    linksCreated: 0,
    errors: []
  };

  const newMinds = [];
  const newContents = [];
  const newLinks = [];

  for (const file of mdFiles) {
    const filePath = join(LIVROS_PATH, file);
    const content = await readFile(filePath, 'utf-8');
    const { frontmatter, body } = parseFrontmatter(content);

    const title = frontmatter.title || file.replace('.md', '');
    const author = frontmatter.author;
    const slug = slugify(title);

    // Check if content already exists
    const { data: existingContent } = await supabase
      .from('contents')
      .select('id')
      .eq('slug', slug)
      .single();

    if (existingContent) {
      console.log(`   ⏭️  ${title} (já existe)`);
      stats.skipped++;
      continue;
    }

    // Resolve author mind
    let authorMindId = null;
    if (author) {
      // Clean author name (remove wiki links, trim)
      let cleanAuthor = author
        .replace(/\[\[([^\]]+)\]\]/g, '$1')  // Remove [[wiki links]]
        .replace(/\s*,\s*[A-Z\s]+$/i, '')    // Remove ", TRANSLATOR NAME"
        .split(',')[0]                        // Take first author if multiple
        .trim();

      const authorLower = cleanAuthor.toLowerCase();
      const authorSlug = slugify(cleanAuthor);

      // Try to find by name or slug
      let authorMind = mindsByName.get(authorLower) || mindsBySlug.get(authorSlug);

      if (!authorMind) {
        // Create new mind for author
        if (!DRY_RUN) {
          const { data: newMind, error: mindError } = await supabase
            .from('minds')
            .insert({
              slug: authorSlug,
              name: cleanAuthor,
              short_bio: `Autor de "${title}"`,
              privacy_level: 'public'
            })
            .select('id, slug, name')
            .single();

          if (mindError) {
            console.log(`   ⚠️  Erro ao criar mind para ${cleanAuthor}: ${mindError.message}`);
          } else {
            authorMind = newMind;
            mindsByName.set(authorLower, newMind);
            mindsBySlug.set(newMind.slug, newMind);
            stats.mindsCreated++;
            console.log(`   👤 Novo autor: ${cleanAuthor} (${newMind.slug})`);
          }
        } else {
          console.log(`   [DRY-RUN] Criaria mind: ${cleanAuthor}`);
          stats.mindsCreated++;
        }
      }

      authorMindId = authorMind?.id;
    }

    // Create content
    const contentData = {
      slug,
      title,
      content_type: 'book_summary',
      content: body,
      project_id: projectId,
      status: mapStatus(frontmatter.status),
      image_url: frontmatter.cover || null,
      metadata: {
        author,
        category: frontmatter.category,
        rating: parseRating(frontmatter.rating),
        total_pages: frontmatter.total ? parseInt(frontmatter.total) : null,
        publish_date: frontmatter.publish,
        aliases: frontmatter.aliases,
        obsidian_created: frontmatter.created,
        obsidian_updated: frontmatter.updated,
        source_file: file
      }
    };

    if (!DRY_RUN) {
      const { data: newContent, error: contentError } = await supabase
        .from('contents')
        .insert(contentData)
        .select('id')
        .single();

      if (contentError) {
        console.log(`   ❌ Erro ao criar ${title}: ${contentError.message}`);
        stats.errors.push({ file, error: contentError.message });
        continue;
      }

      // Create content_minds link
      if (authorMindId) {
        const { error: linkError } = await supabase
          .from('content_minds')
          .insert({
            content_id: newContent.id,
            mind_id: authorMindId,
            role: 'author'
          });

        if (linkError) {
          console.log(`   ⚠️  Erro ao vincular autor: ${linkError.message}`);
        } else {
          stats.linksCreated++;
        }
      }

      stats.contentsCreated++;
      console.log(`   ✅ ${title}`);
    } else {
      console.log(`   [DRY-RUN] Criaria: ${title}`);
      stats.contentsCreated++;
    }

    stats.processed++;
  }

  // 5. Resumo
  console.log('\n=====================================');
  console.log('📊 RESUMO DA IMPORTAÇÃO');
  console.log('=====================================');
  console.log(`   Arquivos processados: ${stats.processed}`);
  console.log(`   Conteúdos criados:    ${stats.contentsCreated}`);
  console.log(`   Minds criados:        ${stats.mindsCreated}`);
  console.log(`   Vínculos criados:     ${stats.linksCreated}`);
  console.log(`   Já existentes:        ${stats.skipped}`);
  console.log(`   Erros:                ${stats.errors.length}`);

  if (stats.errors.length > 0) {
    console.log('\n❌ ERROS:');
    stats.errors.forEach(e => console.log(`   - ${e.file}: ${e.error}`));
  }

  if (DRY_RUN) {
    console.log('\n🔍 Execute sem --dry-run para aplicar as alterações');
  }
}

main().catch(console.error);

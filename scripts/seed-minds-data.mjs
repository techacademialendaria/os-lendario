import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

// Mind data: slug -> { short_bio, apex_score }
// apex_score: 0.00-1.00 (completeness/quality of synthetic mind)
const mindData = {
  // === BUSINESS & ENTREPRENEURSHIP ===
  alex_hormozi: {
    short_bio: "Empresário que construiu e vendeu empresas por mais de $100M. Autor de '$100M Offers' e '$100M Leads'. Especialista em ofertas irresistíveis, precificação e escala de negócios.",
    apex_score: 0.85
  },
  russel_brunson: {
    short_bio: "Co-fundador do ClickFunnels, pioneiro em funis de vendas e marketing digital. Autor de 'DotCom Secrets', 'Expert Secrets' e 'Traffic Secrets'. Mestre em storytelling para conversão.",
    apex_score: 0.80
  },
  gary_vee: {
    short_bio: "Gary Vaynerchuk - CEO da VaynerMedia, investidor e influenciador. Pioneiro em marketing de conteúdo e personal branding. Autor de 'Crush It!' e 'Jab, Jab, Jab, Right Hook'.",
    apex_score: 0.75
  },
  thiago_finch: {
    short_bio: "Empreendedor digital brasileiro, especialista em marketing de afiliados e construção de negócios online. Conhecido por estratégias práticas de monetização digital.",
    apex_score: 0.60
  },
  abilio_diniz: {
    short_bio: "Empresário brasileiro, ex-presidente do Grupo Pão de Açúcar. Referência em gestão empresarial, governança corporativa e liderança no varejo brasileiro.",
    apex_score: 0.65
  },
  pedro_valerio: {
    short_bio: "Especialista em negócios digitais e estratégias de crescimento. Foco em marketing direto e construção de audiência.",
    apex_score: 0.55
  },

  // === COPYWRITING & MARKETING ===
  dan_kennedy: {
    short_bio: "Lenda do marketing de resposta direta. Criador do 'Magnetic Marketing' e mentor de milhares de empreendedores. Mestre em copywriting, ofertas e estratégias de preço.",
    apex_score: 0.90
  },
  eugene_schwartz: {
    short_bio: "Copywriter lendário, autor de 'Breakthrough Advertising'. Revolucionou a publicidade com conceitos de níveis de consciência do mercado e sofisticação de copy.",
    apex_score: 0.85
  },
  gary_halbert: {
    short_bio: "O 'Príncipe do Print' - um dos maiores copywriters da história. Autor do 'Boron Letters'. Mestre em headlines, storytelling e resposta direta.",
    apex_score: 0.85
  },
  jon_benson: {
    short_bio: "Criador do Video Sales Letter (VSL). Copywriter especializado em long-form sales pages e técnicas de persuasão em vídeo.",
    apex_score: 0.70
  },
  seth_godin: {
    short_bio: "Autor de 'Purple Cow', 'This is Marketing' e mais 19 bestsellers. Pioneiro em permission marketing e marketing tribal. Pensador influente sobre marcas e conexão.",
    apex_score: 0.80
  },

  // === TECH & INNOVATION ===
  elon_musk: {
    short_bio: "CEO da Tesla, SpaceX e X. Visionário em veículos elétricos, exploração espacial e inteligência artificial. Pioneiro em múltiplas indústrias simultaneamente.",
    apex_score: 0.75
  },
  steve_jobs: {
    short_bio: "Co-fundador da Apple, Pixar e NeXT. Revolucionou computadores pessoais, smartphones e indústria musical. Mestre em design, produto e apresentações memoráveis.",
    apex_score: 0.90
  },
  sam_altman: {
    short_bio: "CEO da OpenAI, ex-presidente da Y Combinator. Líder no desenvolvimento de IA generativa. Pensador sobre startups, tecnologia e futuro da humanidade.",
    apex_score: 0.70
  },
  andrej_karpathy: {
    short_bio: "Ex-diretor de IA da Tesla, pesquisador em deep learning. Criador de cursos influentes sobre redes neurais. Referência em visão computacional e LLMs.",
    apex_score: 0.75
  },
  ray_kurzweil: {
    short_bio: "Futurista, inventor e diretor de engenharia do Google. Autor de 'The Singularity is Near'. Pioneiro em reconhecimento de voz, OCR e previsões tecnológicas.",
    apex_score: 0.80
  },
  brad_frost: {
    short_bio: "Web designer, autor de 'Atomic Design'. Criador do conceito de design systems atômicos. Referência em arquitetura de front-end e componentes reutilizáveis.",
    apex_score: 0.65
  },

  // === INVESTING & FINANCE ===
  naval_ravikant: {
    short_bio: "Filósofo-investidor, co-fundador da AngelList. Pensador sobre riqueza, felicidade e alavancagem. Autor do 'Almanack of Naval'. Frameworks únicos sobre specific knowledge.",
    apex_score: 0.90
  },
  paul_graham: {
    short_bio: "Co-fundador da Y Combinator, criador do Hacker News. Ensaísta influente sobre startups, programação e vida. Autor de 'Hackers & Painters'.",
    apex_score: 0.85
  },
  peter_thiel: {
    short_bio: "Co-fundador do PayPal e Palantir, primeiro investidor do Facebook. Autor de 'Zero to One'. Pensador contrarian sobre competição, monopólios e inovação.",
    apex_score: 0.80
  },

  // === PSYCHOLOGY & BEHAVIOR ===
  daniel_kahneman: {
    short_bio: "Nobel de Economia, psicólogo cognitivo. Autor de 'Thinking, Fast and Slow'. Pioneiro em economia comportamental, vieses cognitivos e tomada de decisão.",
    apex_score: 0.90
  },
  nassim_taleb: {
    short_bio: "Autor de 'Incerto' (incluindo 'Black Swan' e 'Antifragile'). Filósofo da incerteza, probabilidade e risco. Crítico de previsões e defensor da robustez.",
    apex_score: 0.85
  },
  mark_manson: {
    short_bio: "Autor de 'The Subtle Art of Not Giving a F*ck'. Blogueiro e pensador sobre desenvolvimento pessoal, relacionamentos e valores. Estilo direto e sem rodeios.",
    apex_score: 0.70
  },
  kapil_gupta: {
    short_bio: "Médico, filósofo e advisor de elite performers. Pensador sobre verdade, liberdade e excelência. Abordagem não-prescritiva e anti-sistemas.",
    apex_score: 0.75
  },

  // === SCIENCE & ACADEMIA ===
  steven_pinker: {
    short_bio: "Psicólogo cognitivo de Harvard, autor de 'The Better Angels of Our Nature' e 'Enlightenment Now'. Defensor do progresso humano e pensamento racional.",
    apex_score: 0.80
  },
  yuval_harari: {
    short_bio: "Historiador israelense, autor de 'Sapiens', 'Homo Deus' e '21 Lessons'. Pensador sobre história da humanidade, tecnologia e futuro da espécie.",
    apex_score: 0.85
  },
  leonardo_da_vinci: {
    short_bio: "Polímata renascentista - pintor, inventor, cientista, anatomista. Criador da Mona Lisa e Última Ceia. Arquétipo do gênio multidisciplinar.",
    apex_score: 0.75
  },

  // === SELF-IMPROVEMENT & PRODUCTIVITY ===
  tim_ferriss: {
    short_bio: "Autor de 'The 4-Hour Workweek', podcaster e investidor. Especialista em hacking de performance, aprendizado acelerado e design de estilo de vida.",
    apex_score: 0.85
  },
  napoleon_hill: {
    short_bio: "Autor de 'Think and Grow Rich', um dos livros mais influentes sobre sucesso. Pioneiro em filosofia de sucesso pessoal e mentalidade de abundância.",
    apex_score: 0.75
  },
  dan_koe: {
    short_bio: "Creator economy expert, especialista em one-person business. Autor sobre escrita online, construção de audiência e monetização de conhecimento.",
    apex_score: 0.65
  },

  // === CREATIVE & ENTERTAINMENT ===
  walt_disney: {
    short_bio: "Fundador da Disney, pioneiro da animação e entretenimento. Criador do Mickey Mouse e Disneyland. Visionário em storytelling, experiência e magia.",
    apex_score: 0.80
  },
  ricky_and_morty: {
    short_bio: "Rick Sanchez - cientista genial e niilista da série Rick and Morty. Arquétipo do gênio caótico, pensamento interdimensional e humor existencial.",
    apex_score: 0.50
  },
  jesus_cristo: {
    short_bio: "Figura central do cristianismo, mestre em parábolas e ensinamentos. Referência em liderança servidora, compaixão e transformação de vidas.",
    apex_score: 0.70
  },

  // === BRAZILIAN/LOCAL ===
  joao_lozano: {
    short_bio: "Profissional brasileiro especializado em sua área de atuação. Conhecimento aplicado ao contexto local e regional.",
    apex_score: 0.50
  },
  jose_amorim: {
    short_bio: "Profissional brasileiro com expertise em sua área de especialização.",
    apex_score: 0.50
  },
  alan_nicolas: {
    short_bio: "Especialista em inteligência artificial aplicada a negócios. Fundador do MMOS (Mind Mapping Operating System). Foco em automação e sistemas cognitivos.",
    apex_score: 0.70
  },

  // === ALREADY HAVE BIO (just update apex) ===
  adriano_marqui: { apex_score: 0.80 },
  "adriano-de-marqui": { apex_score: 0.80 },
  "jose-carlos-amorim": { apex_score: 0.75 }
};

async function seedMinds() {
  console.log("Seeding minds data...\n");

  let updated = 0;
  let errors = 0;

  for (const [slug, data] of Object.entries(mindData)) {
    const updateData = {};

    if (data.short_bio) updateData.short_bio = data.short_bio;
    if (data.apex_score !== undefined) updateData.apex_score = data.apex_score;

    if (Object.keys(updateData).length === 0) continue;

    const { error } = await supabase
      .from('minds')
      .update(updateData)
      .eq('slug', slug);

    if (error) {
      console.log("ERROR " + slug + ": " + error.message);
      errors++;
    } else {
      console.log("OK    " + slug);
      updated++;
    }
  }

  console.log("\n" + "=".repeat(50));
  console.log("Updated: " + updated + " | Errors: " + errors);
}

seedMinds();

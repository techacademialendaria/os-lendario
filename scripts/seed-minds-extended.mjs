import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

// Use service role key to bypass RLS
const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY
);

// Mind extended data: slug -> { proficiencies, obsessions, values }
// proficiencies: [{ skill_code, level_10 }] - level 1-10
// obsessions: [{ name, intensity_10, notes }] - intensity 1-10
// values: [{ name, importance_10, notes }] - importance 1-10

const mindExtendedData = {
  // === BUSINESS & ENTREPRENEURSHIP ===
  alex_hormozi: {
    proficiencies: [
      { skill: 'business_strategy', level: 10 },
      { skill: 'scaling_operations', level: 10 },
      { skill: 'value_creation', level: 10 },
      { skill: 'closing', level: 9 },
      { skill: 'leadership', level: 8 }
    ],
    obsessions: [
      { name: 'Criação de ofertas irresistíveis', intensity: 10, notes: 'Grand Slam Offers framework' },
      { name: 'Value Equation', intensity: 9, notes: 'Maximizar valor percebido, minimizar fricção' },
      { name: 'Escalar negócios de serviço', intensity: 9, notes: 'Gym Launch, Prestige Labs, Acquisition.com' }
    ],
    values: [
      { name: 'Execução acima de tudo', importance: 10, notes: 'Volume negates luck' },
      { name: 'Transparência radical', importance: 9, notes: 'Compartilhar números reais' },
      { name: 'Criar valor real', importance: 9, notes: 'Não vender hype, entregar resultado' }
    ]
  },

  russel_brunson: {
    proficiencies: [
      { skill: 'direct_response_copywriting', level: 9 },
      { skill: 'brand_storytelling', level: 10 },
      { skill: 'content_marketing', level: 9 },
      { skill: 'sales_letters', level: 9 },
      { skill: 'product_development', level: 8 }
    ],
    obsessions: [
      { name: 'Funis de vendas', intensity: 10, notes: 'ClickFunnels, funnel hacking' },
      { name: 'Storytelling para conversão', intensity: 9, notes: 'Epiphany Bridge, Hero Journey' },
      { name: 'Expert positioning', intensity: 9, notes: 'Tornar experts em líderes de movimento' }
    ],
    values: [
      { name: 'Servir primeiro', importance: 10, notes: 'Ajudar empreendedores a crescer' },
      { name: 'Inovação em marketing', importance: 9, notes: 'Criar novas formas de vender' },
      { name: 'Comunidade', importance: 8, notes: 'Construir tribos de seguidores leais' }
    ]
  },

  gary_vee: {
    proficiencies: [
      { skill: 'content_creation', level: 10 },
      { skill: 'brand_identity', level: 10 },
      { skill: 'growth_marketing', level: 9 },
      { skill: 'public_speaking', level: 9 },
      { skill: 'leadership', level: 8 }
    ],
    obsessions: [
      { name: 'Atenção como moeda', intensity: 10, notes: 'Day trading attention' },
      { name: 'Documentar vs criar', intensity: 9, notes: 'Autenticidade acima de produção' },
      { name: 'Paciência de longo prazo', intensity: 9, notes: 'Clouds and dirt mentality' }
    ],
    values: [
      { name: 'Autenticidade', importance: 10, notes: 'Ser você mesmo sem filtros' },
      { name: 'Hustle com propósito', importance: 9, notes: 'Trabalho duro com direção' },
      { name: 'Gratidão', importance: 9, notes: 'Apreciar o que tem' }
    ]
  },

  thiago_finch: {
    proficiencies: [
      { skill: 'growth_marketing', level: 9 },
      { skill: 'paid_advertising', level: 9 },
      { skill: 'content_marketing', level: 8 },
      { skill: 'business_strategy', level: 7 }
    ],
    obsessions: [
      { name: 'Marketing de afiliados', intensity: 9, notes: 'Monetização digital' },
      { name: 'Tráfego pago', intensity: 9, notes: 'Facebook Ads, Google Ads' },
      { name: 'Liberdade financeira', intensity: 8, notes: 'Estilo de vida digital nomad' }
    ],
    values: [
      { name: 'Liberdade', importance: 10, notes: 'Trabalhar de qualquer lugar' },
      { name: 'Resultados mensuráveis', importance: 9, notes: 'ROI comprovado' },
      { name: 'Simplicidade', importance: 8, notes: 'Estratégias práticas e aplicáveis' }
    ]
  },

  abilio_diniz: {
    proficiencies: [
      { skill: 'business_strategy', level: 10 },
      { skill: 'leadership', level: 10 },
      { skill: 'stakeholder_management', level: 9 },
      { skill: 'financial_management', level: 9 }
    ],
    obsessions: [
      { name: 'Excelência operacional', intensity: 10, notes: 'Varejo como ciência' },
      { name: 'Governança corporativa', intensity: 9, notes: 'Estruturas de gestão' },
      { name: 'Legado empresarial', intensity: 8, notes: 'Construir para durar' }
    ],
    values: [
      { name: 'Disciplina', importance: 10, notes: 'Rotina e consistência' },
      { name: 'Família', importance: 9, notes: 'Equilíbrio vida-trabalho' },
      { name: 'Meritocracia', importance: 9, notes: 'Resultados determinam sucesso' }
    ]
  },

  pedro_valerio: {
    proficiencies: [
      { skill: 'direct_response_copywriting', level: 8 },
      { skill: 'content_marketing', level: 8 },
      { skill: 'growth_marketing', level: 7 }
    ],
    obsessions: [
      { name: 'Copy que converte', intensity: 8, notes: 'Resposta direta' },
      { name: 'Construção de audiência', intensity: 8, notes: 'Newsletter, comunidades' }
    ],
    values: [
      { name: 'Clareza', importance: 9, notes: 'Comunicação direta' },
      { name: 'Entrega de valor', importance: 8, notes: 'Conteúdo que transforma' }
    ]
  },

  // === COPYWRITING & MARKETING ===
  dan_kennedy: {
    proficiencies: [
      { skill: 'direct_response_copywriting', level: 10 },
      { skill: 'sales_letters', level: 10 },
      { skill: 'persuasion_psychology', level: 10 },
      { skill: 'positioning', level: 9 },
      { skill: 'value_creation', level: 9 }
    ],
    obsessions: [
      { name: 'Resposta direta', intensity: 10, notes: 'Tudo deve ser mensurável' },
      { name: 'Magnetic Marketing', intensity: 10, notes: 'Atrair clientes ideais' },
      { name: 'Proteção do tempo', intensity: 9, notes: 'No BS time management' }
    ],
    values: [
      { name: 'Pragmatismo', importance: 10, notes: 'O que funciona, funciona' },
      { name: 'Independência', importance: 10, notes: 'Não depender de ninguém' },
      { name: 'Resultados mensuráveis', importance: 10, notes: 'ROI acima de tudo' }
    ]
  },

  eugene_schwartz: {
    proficiencies: [
      { skill: 'direct_response_copywriting', level: 10 },
      { skill: 'persuasion_psychology', level: 10 },
      { skill: 'research_methodology', level: 9 },
      { skill: 'writing_styles', level: 10 }
    ],
    obsessions: [
      { name: 'Níveis de consciência do mercado', intensity: 10, notes: '5 stages of awareness' },
      { name: 'Canalizar desejos existentes', intensity: 10, notes: 'Mass desire concept' },
      { name: 'Headline como porta de entrada', intensity: 9, notes: 'Primeira impressão é tudo' }
    ],
    values: [
      { name: 'Pesquisa profunda', importance: 10, notes: 'Conhecer o mercado melhor que ele mesmo' },
      { name: 'Precisão na linguagem', importance: 10, notes: 'Cada palavra conta' },
      { name: 'Elegância na copy', importance: 9, notes: 'Sofisticação sem complexidade' }
    ]
  },

  gary_halbert: {
    proficiencies: [
      { skill: 'direct_response_copywriting', level: 10 },
      { skill: 'sales_letters', level: 10 },
      { skill: 'persuasion_psychology', level: 9 },
      { skill: 'content_creation', level: 9 }
    ],
    obsessions: [
      { name: 'A-pile vs B-pile', intensity: 10, notes: 'Fazer a carta ser aberta' },
      { name: 'Listas de mailing', intensity: 10, notes: 'A list is everything' },
      { name: 'Simplicidade brutal', intensity: 9, notes: 'Copy clara e direta' }
    ],
    values: [
      { name: 'Honestidade na venda', importance: 9, notes: 'Prometer só o que pode entregar' },
      { name: 'Conexão humana', importance: 9, notes: 'Escrever como se fala' },
      { name: 'Testar tudo', importance: 10, notes: 'Dados sobre opiniões' }
    ]
  },

  jon_benson: {
    proficiencies: [
      { skill: 'direct_response_copywriting', level: 9 },
      { skill: 'video_production', level: 9 },
      { skill: 'sales_letters', level: 9 },
      { skill: 'persuasion_psychology', level: 8 }
    ],
    obsessions: [
      { name: 'Video Sales Letters', intensity: 10, notes: 'Criador do formato VSL' },
      { name: 'Conversão em vídeo', intensity: 9, notes: 'Storytelling visual' },
      { name: 'Automação de vendas', intensity: 8, notes: 'Vender enquanto dorme' }
    ],
    values: [
      { name: 'Inovação em formatos', importance: 9, notes: 'Criar novos veículos de venda' },
      { name: 'Eficiência', importance: 8, notes: 'Máximo resultado, mínimo esforço' }
    ]
  },

  seth_godin: {
    proficiencies: [
      { skill: 'brand_storytelling', level: 10 },
      { skill: 'positioning', level: 10 },
      { skill: 'writing_styles', level: 9 },
      { skill: 'strategic_thinking', level: 9 },
      { skill: 'public_speaking', level: 9 }
    ],
    obsessions: [
      { name: 'Purple Cow thinking', intensity: 10, notes: 'Ser notável ou ser ignorado' },
      { name: 'Permission marketing', intensity: 10, notes: 'Ganhar atenção, não comprar' },
      { name: 'Tribes e liderança', intensity: 9, notes: 'Conectar pessoas com propósito comum' }
    ],
    values: [
      { name: 'Generosidade', importance: 10, notes: 'Dar antes de receber' },
      { name: 'Arte no trabalho', importance: 9, notes: 'Fazer trabalho que importa' },
      { name: 'Coragem de ser diferente', importance: 10, notes: 'Ship it, be remarkable' }
    ]
  },

  // === TECH & INNOVATION ===
  elon_musk: {
    proficiencies: [
      { skill: 'product_strategy', level: 10 },
      { skill: 'strategic_thinking', level: 10 },
      { skill: 'leadership', level: 9 },
      { skill: 'execution', level: 10 },
      { skill: 'fundraising', level: 9 }
    ],
    obsessions: [
      { name: 'First principles thinking', intensity: 10, notes: 'Questionar todas as premissas' },
      { name: 'Humanidade multiplanetária', intensity: 10, notes: 'SpaceX e colonização de Marte' },
      { name: 'Aceleração sustentável', intensity: 9, notes: 'Tesla e energia limpa' }
    ],
    values: [
      { name: 'Missão acima de lucro', importance: 10, notes: 'Resolver problemas da humanidade' },
      { name: 'Velocidade de execução', importance: 10, notes: 'Move fast, break things' },
      { name: 'Pensamento de longo prazo', importance: 9, notes: 'Décadas, não trimestres' }
    ]
  },

  steve_jobs: {
    proficiencies: [
      { skill: 'product_strategy', level: 10 },
      { skill: 'visual_design', level: 10 },
      { skill: 'brand_identity', level: 10 },
      { skill: 'presentation_design', level: 10 },
      { skill: 'leadership', level: 9 }
    ],
    obsessions: [
      { name: 'Intersecção de tecnologia e humanidades', intensity: 10, notes: 'Liberal arts + technology' },
      { name: 'Simplicidade obsessiva', intensity: 10, notes: 'Less is more' },
      { name: 'Experiência do usuário', intensity: 10, notes: 'Design is how it works' }
    ],
    values: [
      { name: 'Excelência', importance: 10, notes: 'Insanely great products' },
      { name: 'Foco radical', importance: 10, notes: 'Dizer não a 1000 coisas' },
      { name: 'Deixar uma marca', importance: 9, notes: 'Put a dent in the universe' }
    ]
  },

  sam_altman: {
    proficiencies: [
      { skill: 'strategic_thinking', level: 9 },
      { skill: 'fundraising', level: 10 },
      { skill: 'leadership', level: 9 },
      { skill: 'product_strategy', level: 8 },
      { skill: 'machine_learning', level: 7 }
    ],
    obsessions: [
      { name: 'AGI (Inteligência Geral Artificial)', intensity: 10, notes: 'OpenAI mission' },
      { name: 'Startups e crescimento', intensity: 9, notes: 'Y Combinator legacy' },
      { name: 'Futuro da humanidade', intensity: 9, notes: 'AI safety e benefícios' }
    ],
    values: [
      { name: 'Otimismo pragmático', importance: 9, notes: 'Acreditar mas executar' },
      { name: 'Impacto em escala', importance: 10, notes: 'Mudar bilhões de vidas' },
      { name: 'Responsabilidade', importance: 9, notes: 'AI segura e benéfica' }
    ]
  },

  andrej_karpathy: {
    proficiencies: [
      { skill: 'machine_learning', level: 10 },
      { skill: 'deep_learning', level: 10 },
      { skill: 'programming', level: 10 },
      { skill: 'wisdom_transmission', level: 9 }
    ],
    obsessions: [
      { name: 'Neural networks', intensity: 10, notes: 'Deep learning research' },
      { name: 'Ensinar ML de forma acessível', intensity: 9, notes: 'Cursos e tutoriais' },
      { name: 'Autonomous driving', intensity: 8, notes: 'Tesla Autopilot' }
    ],
    values: [
      { name: 'Clareza na explicação', importance: 10, notes: 'Tornar complexo simples' },
      { name: 'First principles', importance: 9, notes: 'Entender do zero' },
      { name: 'Open source', importance: 8, notes: 'Compartilhar conhecimento' }
    ]
  },

  ray_kurzweil: {
    proficiencies: [
      { skill: 'strategic_thinking', level: 10 },
      { skill: 'machine_learning', level: 9 },
      { skill: 'research_methodology', level: 9 },
      { skill: 'writing_styles', level: 8 }
    ],
    obsessions: [
      { name: 'Singularidade tecnológica', intensity: 10, notes: 'Previsões para 2045' },
      { name: 'Extensão da vida', intensity: 10, notes: 'Longevidade e transcendência' },
      { name: 'Lei dos retornos acelerados', intensity: 9, notes: 'Crescimento exponencial' }
    ],
    values: [
      { name: 'Progresso tecnológico', importance: 10, notes: 'Tecnologia como salvação' },
      { name: 'Previsão rigorosa', importance: 9, notes: 'Dados e tendências' },
      { name: 'Otimismo sobre o futuro', importance: 10, notes: 'Humanidade vai prosperar' }
    ]
  },

  brad_frost: {
    proficiencies: [
      { skill: 'ui_design', level: 10 },
      { skill: 'architecture', level: 9 },
      { skill: 'visual_design', level: 8 },
      { skill: 'writing_styles', level: 8 }
    ],
    obsessions: [
      { name: 'Atomic Design', intensity: 10, notes: 'Átomos, moléculas, organismos' },
      { name: 'Design Systems', intensity: 10, notes: 'Consistência em escala' },
      { name: 'Componentização', intensity: 9, notes: 'Reutilização inteligente' }
    ],
    values: [
      { name: 'Consistência', importance: 10, notes: 'Padrões claros e repetíveis' },
      { name: 'Colaboração', importance: 9, notes: 'Design + Dev trabalhando juntos' },
      { name: 'Manutenibilidade', importance: 9, notes: 'Código que escala' }
    ]
  },

  // === INVESTING & FINANCE ===
  naval_ravikant: {
    proficiencies: [
      { skill: 'strategic_thinking', level: 10 },
      { skill: 'philosophy', level: 10 },
      { skill: 'deal_evaluation', level: 9 },
      { skill: 'wisdom_transmission', level: 10 }
    ],
    obsessions: [
      { name: 'Specific knowledge', intensity: 10, notes: 'Conhecimento insubstituível' },
      { name: 'Leverage (alavancagem)', intensity: 10, notes: 'Code, capital, labor, media' },
      { name: 'Felicidade como skill', intensity: 10, notes: 'Happiness is a choice' }
    ],
    values: [
      { name: 'Liberdade', importance: 10, notes: 'Acima de riqueza' },
      { name: 'Verdade', importance: 10, notes: 'Buscar realidade, não conforto' },
      { name: 'Criação de riqueza ética', importance: 9, notes: 'Win-win games' }
    ]
  },

  paul_graham: {
    proficiencies: [
      { skill: 'programming', level: 10 },
      { skill: 'writing_styles', level: 10 },
      { skill: 'deal_evaluation', level: 9 },
      { skill: 'strategic_thinking', level: 9 }
    ],
    obsessions: [
      { name: 'Startups e fundadores', intensity: 10, notes: 'Y Combinator methodology' },
      { name: 'Essays como pensamento', intensity: 10, notes: 'Escrever para clarificar' },
      { name: 'Hackers e makers', intensity: 9, notes: 'Cultura de construir' }
    ],
    values: [
      { name: 'Fazer algo que as pessoas querem', importance: 10, notes: 'Make something people want' },
      { name: 'Honestidade intelectual', importance: 10, notes: 'Não se enganar' },
      { name: 'Simplicidade', importance: 9, notes: 'Menos é mais' }
    ]
  },

  peter_thiel: {
    proficiencies: [
      { skill: 'strategic_thinking', level: 10 },
      { skill: 'deal_evaluation', level: 10 },
      { skill: 'philosophy', level: 9 },
      { skill: 'leadership', level: 8 }
    ],
    obsessions: [
      { name: 'Monopólios e competição', intensity: 10, notes: 'Competition is for losers' },
      { name: 'Zero to One', intensity: 10, notes: 'Criar algo novo vs copiar' },
      { name: 'Segredos', intensity: 9, notes: 'Verdades que poucos acreditam' }
    ],
    values: [
      { name: 'Contrarian thinking', importance: 10, notes: 'Ir contra o consenso' },
      { name: 'Definição de futuro', importance: 10, notes: 'Determinist vs indefinite' },
      { name: 'Coragem intelectual', importance: 9, notes: 'Dizer o impopular' }
    ]
  },

  // === PSYCHOLOGY & BEHAVIOR ===
  daniel_kahneman: {
    proficiencies: [
      { skill: 'research_methodology', level: 10 },
      { skill: 'critical_thinking', level: 10 },
      { skill: 'writing_styles', level: 9 },
      { skill: 'wisdom_transmission', level: 9 }
    ],
    obsessions: [
      { name: 'Sistema 1 e Sistema 2', intensity: 10, notes: 'Pensamento rápido e lento' },
      { name: 'Vieses cognitivos', intensity: 10, notes: 'Heurísticas e erros' },
      { name: 'Economia comportamental', intensity: 9, notes: 'Irracionalidade previsível' }
    ],
    values: [
      { name: 'Rigor científico', importance: 10, notes: 'Evidência acima de intuição' },
      { name: 'Humildade epistêmica', importance: 10, notes: 'Reconhecer limitações' },
      { name: 'Colaboração', importance: 9, notes: 'Parceria com Amos Tversky' }
    ]
  },

  nassim_taleb: {
    proficiencies: [
      { skill: 'strategic_thinking', level: 10 },
      { skill: 'critical_thinking', level: 10 },
      { skill: 'writing_styles', level: 9 },
      { skill: 'philosophy', level: 9 }
    ],
    obsessions: [
      { name: 'Antifragilidade', intensity: 10, notes: 'Ganhar com o caos' },
      { name: 'Black Swans', intensity: 10, notes: 'Eventos de alto impacto' },
      { name: 'Skin in the game', intensity: 10, notes: 'Risco pessoal nas decisões' }
    ],
    values: [
      { name: 'Robustez', importance: 10, notes: 'Sobreviver antes de otimizar' },
      { name: 'Honestidade', importance: 10, notes: 'Praticar o que prega' },
      { name: 'Ceticismo', importance: 9, notes: 'Duvidar de previsões' }
    ]
  },

  mark_manson: {
    proficiencies: [
      { skill: 'writing_styles', level: 9 },
      { skill: 'philosophy', level: 8 },
      { skill: 'content_creation', level: 9 },
      { skill: 'brand_storytelling', level: 8 }
    ],
    obsessions: [
      { name: 'Escolher problemas dignos', intensity: 9, notes: 'Life is about problems' },
      { name: 'Responsabilidade pessoal', intensity: 9, notes: 'Fault vs responsibility' },
      { name: 'Anti-positividade tóxica', intensity: 8, notes: 'Not everything is awesome' }
    ],
    values: [
      { name: 'Autenticidade', importance: 10, notes: 'Ser honesto consigo mesmo' },
      { name: 'Aceitar limitações', importance: 9, notes: 'Você não pode ter tudo' },
      { name: 'Compromisso', importance: 8, notes: 'Escolher e aceitar tradeoffs' }
    ]
  },

  kapil_gupta: {
    proficiencies: [
      { skill: 'philosophy', level: 10 },
      { skill: 'coaching_skills', level: 9 },
      { skill: 'wisdom_transmission', level: 10 }
    ],
    obsessions: [
      { name: 'Verdade absoluta', intensity: 10, notes: 'Sem compromissos nem atalhos' },
      { name: 'Anti-prescrição', intensity: 10, notes: 'Não dar conselhos, provocar insight' },
      { name: 'Liberdade total', intensity: 10, notes: 'Freedom from all things' }
    ],
    values: [
      { name: 'Sinceridade', importance: 10, notes: 'Truth above all' },
      { name: 'Não-conformidade', importance: 10, notes: 'Reject all systems' },
      { name: 'Excelência genuína', importance: 9, notes: 'Not goals, but being' }
    ]
  },

  // === SCIENCE & ACADEMIA ===
  steven_pinker: {
    proficiencies: [
      { skill: 'research_methodology', level: 10 },
      { skill: 'writing_styles', level: 10 },
      { skill: 'critical_thinking', level: 10 },
      { skill: 'public_speaking', level: 9 }
    ],
    obsessions: [
      { name: 'Progresso humano', intensity: 10, notes: 'Better Angels, Enlightenment Now' },
      { name: 'Racionalidade', intensity: 10, notes: 'Pensamento claro e baseado em dados' },
      { name: 'Linguagem e mente', intensity: 9, notes: 'Cognitive science' }
    ],
    values: [
      { name: 'Iluminismo', importance: 10, notes: 'Razão, ciência, humanismo' },
      { name: 'Otimismo fundamentado', importance: 10, notes: 'Dados mostram progresso' },
      { name: 'Clareza na comunicação', importance: 9, notes: 'Escrever bem é pensar bem' }
    ]
  },

  yuval_harari: {
    proficiencies: [
      { skill: 'writing_styles', level: 10 },
      { skill: 'strategic_thinking', level: 9 },
      { skill: 'research_methodology', level: 9 },
      { skill: 'public_speaking', level: 9 }
    ],
    obsessions: [
      { name: 'Narrativas coletivas', intensity: 10, notes: 'Ficções que unem humanos' },
      { name: 'Futuro da espécie', intensity: 10, notes: 'Homo Deus, AI, biotech' },
      { name: 'Meditação e clareza', intensity: 9, notes: 'Vipassana practice' }
    ],
    values: [
      { name: 'Verdade histórica', importance: 10, notes: 'Entender de onde viemos' },
      { name: 'Compaixão', importance: 9, notes: 'Reduzir sofrimento' },
      { name: 'Perspectiva de longo prazo', importance: 10, notes: 'Milhares de anos, não décadas' }
    ]
  },

  leonardo_da_vinci: {
    proficiencies: [
      { skill: 'visual_design', level: 10 },
      { skill: 'research_methodology', level: 9 },
      { skill: 'architecture', level: 9 },
      { skill: 'critical_thinking', level: 10 }
    ],
    obsessions: [
      { name: 'Observação da natureza', intensity: 10, notes: 'Aprender da realidade' },
      { name: 'Conexão entre disciplinas', intensity: 10, notes: 'Arte + ciência + engenharia' },
      { name: 'Perfeição nos detalhes', intensity: 10, notes: 'Nunca terminar, sempre melhorar' }
    ],
    values: [
      { name: 'Curiosidade infinita', importance: 10, notes: 'Questionar tudo' },
      { name: 'Excelência artística', importance: 10, notes: 'Masterpiece or nothing' },
      { name: 'Aprendizado contínuo', importance: 10, notes: 'Lifetime student' }
    ]
  },

  // === SELF-IMPROVEMENT & PRODUCTIVITY ===
  tim_ferriss: {
    proficiencies: [
      { skill: 'research_methodology', level: 9 },
      { skill: 'writing_styles', level: 9 },
      { skill: 'content_creation', level: 10 },
      { skill: 'time_management', level: 10 },
      { skill: 'mindset_development', level: 9 }
    ],
    obsessions: [
      { name: 'Deconstruction de skills', intensity: 10, notes: 'DiSSS framework' },
      { name: 'Lifestyle design', intensity: 10, notes: '4-Hour philosophy' },
      { name: 'Entrevistar world-class performers', intensity: 9, notes: 'Tools of Titans' }
    ],
    values: [
      { name: 'Eficiência radical', importance: 10, notes: 'Pareto em tudo' },
      { name: 'Experimentação', importance: 10, notes: 'Test everything' },
      { name: 'Liberdade de tempo', importance: 10, notes: 'Time > money' }
    ]
  },

  napoleon_hill: {
    proficiencies: [
      { skill: 'writing_styles', level: 9 },
      { skill: 'mindset_development', level: 10 },
      { skill: 'goal_achievement', level: 10 },
      { skill: 'persuasion_psychology', level: 8 }
    ],
    obsessions: [
      { name: 'Filosofia do sucesso', intensity: 10, notes: '13 principles' },
      { name: 'Mastermind groups', intensity: 9, notes: 'Poder da aliança' },
      { name: 'Desejo ardente', intensity: 10, notes: 'Burning desire' }
    ],
    values: [
      { name: 'Persistência', importance: 10, notes: 'Never give up' },
      { name: 'Fé', importance: 9, notes: 'Belief in the invisible' },
      { name: 'Propósito definido', importance: 10, notes: 'Clarity of purpose' }
    ]
  },

  dan_koe: {
    proficiencies: [
      { skill: 'content_creation', level: 9 },
      { skill: 'writing_styles', level: 9 },
      { skill: 'brand_identity', level: 8 },
      { skill: 'growth_marketing', level: 8 }
    ],
    obsessions: [
      { name: 'One-person business', intensity: 10, notes: 'Solopreneurship' },
      { name: 'Escrita online', intensity: 10, notes: 'Writing as leverage' },
      { name: 'Curiosidade monetizada', intensity: 9, notes: 'Learn, build, teach' }
    ],
    values: [
      { name: 'Autenticidade', importance: 10, notes: 'Build from who you are' },
      { name: 'Liberdade criativa', importance: 10, notes: 'No boss, no clients' },
      { name: 'Crescimento pessoal', importance: 9, notes: 'Evolve publicly' }
    ]
  },

  // === CREATIVE & ENTERTAINMENT ===
  walt_disney: {
    proficiencies: [
      { skill: 'brand_storytelling', level: 10 },
      { skill: 'visual_design', level: 9 },
      { skill: 'product_development', level: 10 },
      { skill: 'leadership', level: 9 }
    ],
    obsessions: [
      { name: 'Magia e encantamento', intensity: 10, notes: 'Creating magic' },
      { name: 'Storytelling visual', intensity: 10, notes: 'Animation innovation' },
      { name: 'Experiência imersiva', intensity: 10, notes: 'Theme parks' }
    ],
    values: [
      { name: 'Imaginação', importance: 10, notes: 'If you can dream it' },
      { name: 'Qualidade sem compromisso', importance: 10, notes: 'Plus it!' },
      { name: 'Alegria', importance: 10, notes: 'Make people happy' }
    ]
  },

  ricky_and_morty: {
    proficiencies: [
      { skill: 'critical_thinking', level: 10 },
      { skill: 'research_methodology', level: 9 },
      { skill: 'philosophy', level: 8 }
    ],
    obsessions: [
      { name: 'Ciência interdimensional', intensity: 10, notes: 'Portal gun adventures' },
      { name: 'Niilismo cósmico', intensity: 9, notes: 'Nothing matters' },
      { name: 'Genialidade caótica', intensity: 9, notes: 'Wubba lubba dub dub' }
    ],
    values: [
      { name: 'Inteligência acima de tudo', importance: 9, notes: 'Being smart is everything' },
      { name: 'Liberdade absoluta', importance: 10, notes: 'No rules apply' },
      { name: 'Família (contraditoriamente)', importance: 7, notes: 'Despite everything' }
    ]
  },

  jesus_cristo: {
    proficiencies: [
      { skill: 'wisdom_transmission', level: 10 },
      { skill: 'leadership', level: 10 },
      { skill: 'public_speaking', level: 10 },
      { skill: 'coaching_skills', level: 10 }
    ],
    obsessions: [
      { name: 'Amor incondicional', intensity: 10, notes: 'Amar o próximo' },
      { name: 'Parábolas como ensino', intensity: 10, notes: 'Stories that transform' },
      { name: 'Redenção', intensity: 10, notes: 'Salvation for all' }
    ],
    values: [
      { name: 'Amor', importance: 10, notes: 'Greatest commandment' },
      { name: 'Perdão', importance: 10, notes: 'Forgive 70x7' },
      { name: 'Humildade', importance: 10, notes: 'Servant leadership' }
    ]
  },

  // === BRAZILIAN/LOCAL ===
  joao_lozano: {
    proficiencies: [
      { skill: 'business_strategy', level: 7 },
      { skill: 'leadership', level: 7 }
    ],
    obsessions: [
      { name: 'Desenvolvimento profissional', intensity: 8, notes: 'Crescimento contínuo' }
    ],
    values: [
      { name: 'Comprometimento', importance: 8, notes: 'Entregar resultados' }
    ]
  },

  jose_amorim: {
    proficiencies: [
      { skill: 'business_strategy', level: 7 },
      { skill: 'strategic_thinking', level: 7 }
    ],
    obsessions: [
      { name: 'Excelência profissional', intensity: 8, notes: 'Melhoria contínua' }
    ],
    values: [
      { name: 'Integridade', importance: 9, notes: 'Fazer o certo' }
    ]
  },

  alan_nicolas: {
    proficiencies: [
      { skill: 'machine_learning', level: 8 },
      { skill: 'programming', level: 8 },
      { skill: 'product_strategy', level: 8 },
      { skill: 'systems_building', level: 9 }
    ],
    obsessions: [
      { name: 'IA aplicada a negócios', intensity: 10, notes: 'Practical AI implementation' },
      { name: 'Sistemas cognitivos', intensity: 10, notes: 'MMOS - Mind Mapping OS' },
      { name: 'Automação inteligente', intensity: 9, notes: 'AI-powered workflows' }
    ],
    values: [
      { name: 'Inovação prática', importance: 10, notes: 'Technology that works' },
      { name: 'Democratização da IA', importance: 9, notes: 'AI for everyone' },
      { name: 'Excelência técnica', importance: 9, notes: 'Quality engineering' }
    ]
  },

  // === ALREADY HAVE BIO (complete with extended data) ===
  adriano_marqui: {
    proficiencies: [
      { skill: 'wisdom_transmission', level: 10 },
      { skill: 'frameworks', level: 10 },
      { skill: 'content_creation', level: 9 },
      { skill: 'coaching_skills', level: 9 }
    ],
    obsessions: [
      { name: 'Didática Lendária', intensity: 10, notes: 'GPS, Semiótica, Estrutura de Aula' },
      { name: 'Knowledge Management', intensity: 9, notes: 'PKM, Obsidian, ATLAS' },
      { name: 'Ensino transformador', intensity: 9, notes: 'Educação que muda vidas' }
    ],
    values: [
      { name: 'Excelência no ensino', importance: 10, notes: 'Transmitir conhecimento com maestria' },
      { name: 'Generosidade', importance: 9, notes: 'Compartilhar sem reservas' },
      { name: 'Clareza', importance: 9, notes: 'Simplificar o complexo' }
    ]
  },

  'adriano-de-marqui': {
    proficiencies: [
      { skill: 'wisdom_transmission', level: 10 },
      { skill: 'frameworks', level: 10 },
      { skill: 'content_creation', level: 9 }
    ],
    obsessions: [
      { name: 'Didática Lendária', intensity: 10, notes: 'GPS framework' },
      { name: 'Estruturação de conhecimento', intensity: 9, notes: 'Metodologias de ensino' }
    ],
    values: [
      { name: 'Excelência pedagógica', importance: 10, notes: 'Ensino de qualidade' },
      { name: 'Impacto', importance: 9, notes: 'Transformar vidas' }
    ]
  },

  'jose-carlos-amorim': {
    proficiencies: [
      { skill: 'strategic_thinking', level: 9 },
      { skill: 'machine_learning', level: 8 },
      { skill: 'content_creation', level: 8 },
      { skill: 'writing_styles', level: 8 }
    ],
    obsessions: [
      { name: 'ESPIRAL EXPANSIVA', intensity: 10, notes: 'Framework de insights viscerais' },
      { name: 'AI Strategy', intensity: 9, notes: 'Traduzir complexidade técnica' },
      { name: 'TDAH como vantagem', intensity: 8, notes: 'Neurodivergência na era da IA' }
    ],
    values: [
      { name: 'Autenticidade', importance: 10, notes: 'Ser genuíno' },
      { name: 'Transformação', importance: 9, notes: 'Reinvenção contínua' },
      { name: 'Impacto', importance: 9, notes: 'Fazer diferença' }
    ]
  }
};

async function seedExtendedData() {
  console.log('Seeding extended mind data...\n');

  // Debug: check connection
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY;
  if (!serviceKey) {
    console.error('ERROR: No service role key found in env');
    process.exit(1);
  }
  console.log('Using service key: ' + serviceKey.substring(0, 20) + '...');

  // Get all minds
  const { data: minds, error: mindsError } = await supabase
    .from('minds')
    .select('id, slug');

  if (mindsError) {
    console.error('Error fetching minds:', mindsError.message);
    process.exit(1);
  }

  console.log('Found ' + minds.length + ' minds\n');

  const mindMap = {};
  minds.forEach(m => { mindMap[m.slug] = m.id; });

  // Get all skills
  const { data: skills } = await supabase
    .from('skills')
    .select('id, code');

  const skillMap = {};
  skills.forEach(s => { skillMap[s.code] = s.id; });

  let profCount = 0, obsCount = 0, valCount = 0;
  let errors = 0;

  for (const [slug, data] of Object.entries(mindExtendedData)) {
    const mindId = mindMap[slug];
    if (!mindId) {
      console.log('SKIP  ' + slug + ' (not found)');
      continue;
    }

    // Insert proficiencies
    if (data.proficiencies) {
      for (const prof of data.proficiencies) {
        const skillId = skillMap[prof.skill];
        if (!skillId) {
          console.log('WARN  Skill not found: ' + prof.skill);
          continue;
        }

        const { error } = await supabase
          .from('mind_proficiencies')
          .upsert({
            mind_id: mindId,
            skill_id: skillId,
            level_10: prof.level
          }, { onConflict: 'mind_id,skill_id' });

        if (error) {
          console.log('ERR   proficiency ' + slug + '/' + prof.skill + ': ' + error.message);
          errors++;
        } else {
          profCount++;
        }
      }
    }

    // Insert obsessions
    if (data.obsessions) {
      for (const obs of data.obsessions) {
        const { error } = await supabase
          .from('mind_obsessions')
          .insert({
            mind_id: mindId,
            name: obs.name,
            intensity_10: obs.intensity,
            notes: obs.notes
          });

        if (error && !error.message.includes('duplicate')) {
          console.log('ERR   obsession ' + slug + '/' + obs.name + ': ' + error.message);
          errors++;
        } else {
          obsCount++;
        }
      }
    }

    // NOTE: Values have been consolidated into mind_drivers table
    // Values are now mapped to drivers and stored in mind_drivers table
    // To add values for a mind, use mind_drivers with driver_id + strength + evidence
    // Original values data is preserved but not inserted here
    // if (data.values) {
    //   // This would require mapping Portuguese values to English drivers
    //   // See: docs/mmos/MIGRATION_MIND_VALUES_COMPLETE.md
    // }

    console.log('OK    ' + slug);
  }

  console.log('\n' + '='.repeat(50));
  console.log('Proficiencies: ' + profCount);
  console.log('Obsessions: ' + obsCount);
  console.log('Values: ' + valCount);
  console.log('Errors: ' + errors);
}

seedExtendedData();

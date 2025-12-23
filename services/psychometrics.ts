import { PsychometricProfile } from '../types/psychometrics';

export const MOCK_PSYCHOMETRICS: Record<string, PsychometricProfile> = {
    'alan_nicolas': {
        name: "Alan Nicolas",
        mbti: {
            type: "ISTP",
            role: "Virtuoso",
            function_stack: ["Ti", "Se", "Ni", "Fe"]
        },
        enneagram: {
            type: "Type 5",
            wing: "5w6",
            triad: "Head",
            variant: "sp/sx"
        },
        disc: {
            pattern: "DC",
            d: 75,
            i: 35,
            s: 30,
            c: 85
        },
        bigFive: {
            openness: 88,
            conscientiousness: 82,
            extraversion: 35,
            agreeableness: 45,
            neuroticism: 30
        },
        darkTriad: {
            narcissism: 3,
            machiavellianism: 4,
            psychopathy: 2
        },
        cognitiveStratum: "VI-VII",
        philosophy: {
            core: "Clareza Radical como caminho para liberdade e impacto",
            mantra: "Perdas limitadas, ganhos ilimitados"
        },
        aptitudes: {
            superpowers: ["Visão de Raio-X de Sistemas", "Síntese de Modelos Complexos", "Engenharia de Prompt Avançada"],
            kryptonite: "Paciência com processos burocráticos e reuniões improdutivas",
            zone_of_genius: {
                title: "Arquiteto de Sistemas Cognitivos",
                description: "Capacidade única de traduzir intuição abstrata em frameworks lógicos executáveis."
            }
        },
        interaction_guide: {
            communication_style: {
                optimal: "Direto, econômico, focado em ideias e sistemas. Sem small talk",
                avoid: "Redundância, reuniões longas, discussão de problemas sem soluções"
            }
        }
    },
    'steve_jobs': {
        name: "Steve Jobs",
        mbti: {
            type: "ENTJ",
            role: "Comandante",
            function_stack: ["Te", "Ni", "Se", "Fi"]
        },
        enneagram: {
            type: "Type 8",
            wing: "8w7",
            triad: "Gut",
            variant: "sx/so"
        },
        disc: {
            pattern: "DI",
            d: 95,
            i: 85,
            s: 15,
            c: 45
        },
        bigFive: {
            openness: 99,
            conscientiousness: 45,
            extraversion: 65,
            agreeableness: 15,
            neuroticism: 70
        },
        darkTriad: {
            narcissism: 7,
            machiavellianism: 6,
            psychopathy: 3
        },
        cognitiveStratum: "VI-VII",
        philosophy: {
            core: "Interseção de tecnologia e artes liberais",
            mantra: "Stay hungry, stay foolish"
        },
        aptitudes: {
            superpowers: ["Reality Distortion Field", "Simplificação Radical", "Visão de Produto"],
            kryptonite: "Incapacidade de aceitar mediocridade (perfeccionismo tóxico)",
            zone_of_genius: {
                title: "Visionário de Produto",
                description: "Capacidade de ver o futuro e trazê-lo para o presente com perfeição estética."
            }
        },
        interaction_guide: {
            communication_style: {
                optimal: "Direto, visual (whiteboard), demonstrações concretas, sem PowerPoints",
                avoid: "Detalhes burocráticos, processos longos, comitês, mediocridade"
            }
        }
    },
    'naval_ravikant': {
        name: "Naval Ravikant",
        mbti: {
            type: "INTJ",
            role: "Arquiteto",
            function_stack: ["Ni", "Te", "Fi", "Se"]
        },
        enneagram: {
            type: "Type 5",
            wing: "5w4",
            triad: "Head",
            variant: "sp/sx"
        },
        disc: {
            pattern: "DC",
            d: 85,
            i: 55,
            s: 25,
            c: 65
        },
        bigFive: {
            openness: 92,
            conscientiousness: 75,
            extraversion: 35,
            agreeableness: 45,
            neuroticism: 25
        },
        darkTriad: {
            narcissism: 2,
            machiavellianism: 4,
            psychopathy: 2
        },
        cognitiveStratum: "VI-VII",
        philosophy: {
            core: "Riqueza específica através de alavancagem e conhecimento",
            mantra: "Seek wealth, not money or status"
        },
        aptitudes: {
            superpowers: ["Síntese de Complexidade", "Pensamento de Primeiros Princípios", "Aforismos Memoráveis"],
            kryptonite: "Impaciência com ineficiência e desperdício de tempo",
            zone_of_genius: {
                title: "Filósofo do Capitalismo",
                description: "Traduzir sabedoria antiga em princípios de criação de riqueza moderna."
            }
        },
        interaction_guide: {
            communication_style: {
                optimal: "Conciso, filosófico, baseado em princípios. Tweets e aforismos",
                avoid: "Conversas superficiais, drama, política tribal"
            }
        }
    },
    'mark_manson': {
        name: "Mark Manson",
        mbti: {
            type: "ENTP",
            role: "Debatedor",
            function_stack: ["Ne", "Ti", "Fe", "Si"]
        },
        enneagram: {
            type: "Type 8",
            wing: "8w7",
            triad: "Gut",
            variant: "sx/sp"
        },
        disc: {
            pattern: "DI",
            d: 85,
            i: 80,
            s: 25,
            c: 55
        },
        bigFive: {
            openness: 92,
            conscientiousness: 65,
            extraversion: 78,
            agreeableness: 35,
            neuroticism: 45
        },
        darkTriad: {
            narcissism: 4,
            machiavellianism: 4,
            psychopathy: 1
        },
        cognitiveStratum: "IV-V",
        philosophy: {
            core: "A arte sutil de não dar a mínima",
            mantra: "Choose your struggles wisely"
        },
        aptitudes: {
            superpowers: ["Traduzir Complexidade em Simplicidade Vulgar", "Storytelling Irreverente", "Psicologia Prática"],
            kryptonite: "Impaciência com processos lentos e burocracia",
            zone_of_genius: {
                title: "Filósofo Pop",
                description: "Capacidade de tornar filosofia acessível através de linguagem direta e humor."
            }
        },
        interaction_guide: {
            communication_style: {
                optimal: "Direto, com humor, sem rodeios. Exemplos práticos da vida real",
                avoid: "Positivismo tóxico, auto-ajuda genérica, abstrações sem aplicação"
            }
        }
    },
    'elon_musk': {
        name: "Elon Musk",
        mbti: {
            type: "INTJ",
            role: "Arquiteto",
            function_stack: ["Ni", "Te", "Fi", "Se"]
        },
        enneagram: {
            type: "Type 5",
            wing: "5w6",
            triad: "Head",
            variant: "so/sp"
        },
        disc: {
            pattern: "DC",
            d: 90,
            i: 60,
            s: 20,
            c: 75
        },
        bigFive: {
            openness: 95,
            conscientiousness: 85,
            extraversion: 55,
            agreeableness: 25,
            neuroticism: 60
        },
        darkTriad: {
            narcissism: 5,
            machiavellianism: 5,
            psychopathy: 2
        },
        cognitiveStratum: "VII",
        philosophy: {
            core: "Tornar a humanidade multiplanetária",
            mantra: "When something is important enough, you do it even if the odds are not in your favor"
        },
        aptitudes: {
            superpowers: ["Pensamento de Primeiros Princípios", "Capacidade de Execução Massiva", "Visão de Longo Prazo"],
            kryptonite: "Impulsividade em comunicação pública e microgerenciamento",
            zone_of_genius: {
                title: "Engenheiro Visionário",
                description: "Integrar visão de futuro com execução técnica em escala."
            }
        },
        interaction_guide: {
            communication_style: {
                optimal: "Técnico, baseado em dados, focado em problemas de engenharia",
                avoid: "Política corporativa, burocracia, impossibilidades sem justificativa"
            }
        }
    },
    'leonardo_da_vinci': {
        name: "Leonardo da Vinci",
        mbti: {
            type: "ENTP",
            role: "Inovador",
            function_stack: ["Ne", "Ti", "Fe", "Si"]
        },
        enneagram: {
            type: "Type 5",
            wing: "5w4",
            triad: "Head",
            variant: "sx/sp"
        },
        disc: {
            pattern: "IC",
            d: 55,
            i: 75,
            s: 40,
            c: 90
        },
        bigFive: {
            openness: 99,
            conscientiousness: 70,
            extraversion: 60,
            agreeableness: 65,
            neuroticism: 45
        },
        darkTriad: {
            narcissism: 3,
            machiavellianism: 2,
            psychopathy: 1
        },
        cognitiveStratum: "VII",
        philosophy: {
            core: "Saper vedere - saber ver além do óbvio",
            mantra: "Learning never exhausts the mind"
        },
        aptitudes: {
            superpowers: ["Conexão Interdisciplinar", "Observação Extrema", "Imaginação Visual"],
            kryptonite: "Dificuldade em finalizar projetos (muitos interesses simultâneos)",
            zone_of_genius: {
                title: "Polímata Universal",
                description: "Integração única de arte, ciência e engenharia em uma visão unificada."
            }
        },
        interaction_guide: {
            communication_style: {
                optimal: "Visual, experimental, baseado em observação direta da natureza",
                avoid: "Dogmas, limitações artificiais de disciplinas, pressa"
            }
        }
    }
};

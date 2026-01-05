import type { PrincipleItem } from '../types';

// Advertorial Template
export const ADVERTORIAL_TEMPLATE = `# HEADLINE DE NOTICIA/DESCOBERTA
[Profissional/Pessoa comum] de [Localizacao] descobre [metodo/sistema] que [resultado especifico + NUMERO] em [tempo]

---
**[Autor] | [Data recente] | Leitura: X min**
---

## SECAO 1: LEAD (Gancho Emocional)
[Paragrafo que descreve situacao comum e frustrante do avatar]
[Use linguagem EXATA do avatar - coletada em pesquisa]

[Pergunta retorica que conecta com a dor]

## SECAO 2: O PROBLEMA + O INIMIGO
1. [Estatistica chocante sobre o problema]
2. "Se voce ja tentou X, Y, Z... voce nao esta sozinho"
3. [Explicacao de por que solucoes tradicionais falham]

### O VERDADEIRO CULPADO:
"O problema nao e [culpa comum que avatar assume].
O verdadeiro culpado e [NOME DO INIMIGO/MECANISMO FALHO] — e e por isso que [consequencia negativa]."

## SECAO 3: A DESCOBERTA (Storytelling)
"Depois de [X] tentativas fracassadas, [protagonista] descobriu que [mecanismo especifico] aumentava [resultado] em [%/numero] — documentado em [X] casos/testes."

## SECAO 4: O MECANISMO (UMS)
- [Nome proprietario do mecanismo]
- [Explicacao pseudo-cientifica de por que funciona]
- [Diagrama ou ilustracao simples]
- [Citacao de especialista ou estudo]

## SECAO 5: PROVA SOCIAL
"[Resultado especifico + timeline + emocao]" - [Nome], [Cidade]

## SECAO 6: MOMENTO DE DECISAO
"Se [resultado] e possivel para [pessoas dos depoimentos], o que esta impedindo VOCE de [alcancar o mesmo]?
A unica diferenca entre voce e [nome do depoimento] e que [ele/ela] descobriu [mecanismo] antes."

## SECAO 7: TRANSICAO PARA OFERTA
"Depois de [X pessoas/casos], [criador] decidiu disponibilizar [solucao] para o publico..."

## SECAO 8: CTA
[Nome do Produto/Servico]
- [Bullet 1 - beneficio enquadrado por status externo]
- [Bullet 2 - beneficio enquadrado por status externo]
- [Bullet 3 - beneficio enquadrado por status externo]

[BOTAO: "Quero Saber Mais" / "Ver Como Funciona"]
[Elemento de urgencia com justificativa real]`;

export const ADVERTORIAL_PRINCIPLES: PrincipleItem[] = [
  {
    badge: 'SCHWARTZ Nivel 3-4',
    description: 'Formato editorial reduz resistencia de mercados sofisticados.',
  },
  {
    badge: 'HOPKINS',
    description: 'Especifico mensuravel obrigatorio na headline.',
  },
  {
    badge: 'GEORGI (UMP)',
    description:
      'O inimigo deve ser NOMEADO explicitamente para externalizar a culpa.',
  },
];

// Sales Page Template
export const SALESPAGE_TEMPLATE = `# HEADLINE PRINCIPAL
[Resultado especifico] + [Tempo] + [Sem objecao comum]

### USP EM UMA LINHA (1a aparicao):
[Frase unica que sera repetida 3x na pagina - inicio, meio, fim]

## SECAO 1: IDENTIFICACAO DO PROBLEMA (Agitar a Dor)
### Voce ja sentiu...
- [Dor especifica 1 - linguagem do avatar]
- [Dor especifica 2 - linguagem do avatar]
- [Dor especifica 3 - linguagem do avatar]

### A verdade que ninguem te conta:
[Paragrafo que invalida as solucoes anteriores tentadas pelo avatar]

### E se voce continuar assim...
[Consequencia de nao resolver - future pacing negativo]

## SECAO 2: PROVA (Autoridade)
### Por que me ouvir?
- [Numero de clientes/alunos]
- [Resultado mensuravel alcancado]
### Admissao Danosa:
"[Vulnerabilidade estrategica que humaniza]"

## SECAO 3: POR QUE ALTERNATIVAS FALHAM (Dunford)
| Alternativa | Por que falha | Consequencia |
|-------------|---------------|--------------|
| [Opcao A]   | [Limitacao]   | [Negativo]   |

### [Seu produto] e diferente porque:
[Atributo unico que alternativas nao tem]

## SECAO 4: PROMESSA (Dream Outcome)
### Imagine se voce pudesse...
- [Beneficio 1] para que [pessoas importantes] [reacao desejada]
- [Beneficio 2] para que [pessoas importantes] [reacao desejada]

## SECAO 5: PLANO (Mecanismo Unico)
### Apresentando: [NOME DO PRODUTO/METODO]
**Passo 1: [Nome do Modulo]** ⏱️ [X minutos/dia]
[O que vai fazer + resultado] - Sem necessidade de: [esforco]

**Passo 2: [Nome do Modulo]** ⏱️ [X minutos/dia]
[O que vai fazer + resultado] - Sem necessidade de: [esforco]

## SECAO 6: EMPILHAMENTO DE VALOR (Stack)
| Componente | Valor | O que resolve |
|------------|-------|---------------|
| [Principal] | R$ X.XXX | [Problema] |
| [Bonus 1]   | R$ XXX   | [Problema] |
**VALOR TOTAL: R$ XX.XXX**

## SECAO 7: INOCULACAO DE OBJECOES (Antes do preco)
**"E se eu nao tiver [recurso]?"**
[Resposta que minimiza esforco + exemplo]
**"Quanto tempo ate ver resultados?"**
[Resposta especifica com timeline]

## SECAO 8: PRECO + ANCORAGEM
### Quanto vale [resolver esse problema]?
[Paragrafo sobre o custo de NAO resolver - quantificado]

### USP REPETIDA (2a aparicao):
[Mesma frase da headline]

**Seu investimento hoje:**
# R$ [PRECO]
*ou [X]x de R$ [PARCELA]*
**[BOTAO CTA PRINCIPAL]**

## SECAO 9: GARANTIA (Risk Reversal)
### Garantia [Nome Criativo] de [X] Dias
[Explicacao da garantia - incondicional ou condicional]
Se [condicao], eu [acao de reversao].

## SECAO 10: PROVA SOCIAL EXPANDIDA
[Depoimentos especificos com resultado + timeline]

## SECAO 11: FAQ (Logistica)
[Perguntas sobre acesso, suporte e pagamento]

## SECAO 12: URGENCIA + CTA FINAL
[Elemento de Escassez Genuina] + [Justificativa Real]
**[BOTAO CTA PRINCIPAL]**

### P.S.: [Resumo do beneficio]
### P.P.S.: [Consequencia de nao agir] + USP (3a aparicao)`;

export const SALESPAGE_PRINCIPLES: PrincipleItem[] = [
  {
    badge: 'REEVES (USP)',
    description: 'Single Selling Proposition repetida 3x para fixacao.',
  },
  {
    badge: 'DUNFORD (Positioning)',
    description: 'Quadro comparativo de alternativas competitivas.',
  },
  {
    badge: 'HORMOZI (Value Equation)',
    description: 'Minimizar esforco e tempo em cada passo do plano.',
  },
  {
    badge: 'SCHWARTZ',
    description:
      'Admissao danosa aumenta credibilidade; Objecoes tratadas ANTES do preco.',
  },
];

// Capture Template
export const CAPTURE_TEMPLATE = `# HEADLINE
[RESULTADO ESPECIFICO] em [TEMPO]

## SUB-HEADLINE
O guia [gratuito/completo] de [X] paginas para [avatar especifico]

---
[Imagem do ebook/mockup]
---

## REASON-WHY GRATUITO (Hopkins)
"Por que estou dando isso de graca?"
[Razao logica - ex: "Porque depois de ajudar X pessoas, percebi que muitos travavam aqui."]

## DENTRO DESTE [EBOOK/GUIA], VOCE VAI DESCOBRIR:
✓ Como [resultado especifico] para que [pessoas importantes] [reacao desejada]
✓ O erro #1 que [avatar] comete e que [consequencia negativa] — e como evitar
✓ A tecnica de [X] minutos que [resultado] sem [objecao comum]
✓ Por que [crenca comum] esta errada e o que fazer em vez disso
✓ **BONUS:** [Beneficio extra inesperado que aumenta percepcao de valor]

## PARA QUEM E ESTE MATERIAL:
- [Avatar descricao 1 - com dor especifica]
- [Avatar descricao 2 - com situacao especifica]

## PARA QUEM NAO E:
- [Anti-avatar 1 - filtra curiosos]
- [Anti-avatar 2 - aumenta percepcao de valor]
- Quem busca [resultado] sem [esforco minimo necessario]

## [FORMULARIO]
**Nome:** | **Email:** | **WhatsApp:** (opcional)
**[BOTAO: "QUERO MEU EBOOK GRATIS"]**

### +[X.XXX] pessoas ja baixaram
[Logos de empresas ou fotos de avatares]

**100% Gratuito | Acesso Imediato | Sem Spam**`;

export const CAPTURE_PRINCIPLES: PrincipleItem[] = [
  {
    badge: 'SCHWARTZ',
    description: 'Topo de funil - consciencia Problem Aware → Solution Aware.',
  },
  {
    badge: 'HOPKINS',
    description:
      'Reason-why gratuito (justificativa logica) aumenta credibilidade.',
  },
  {
    badge: 'SCHWARTZ Nivel 5',
    description:
      'Anti-avatar aumenta identificacao tribal ("isso e para mim, nao para eles").',
  },
];

// VSL Template
export const VSL_TEMPLATE = `# HEADLINE CURIOSIDADE/CHOQUE
[Afirmacao contraintuitiva ou revelacao chocante]

## SUB-HEADLINE
[Promessa de revelacao no video - cria loop aberto]

---
## [PLAYER DE VIDEO]
[Thumbnail com: Rosto emotivo + Texto curto chocante + Elemento visual]
[Duracao: XX:XX]
---

*Assista ate o final para descobrir [gancho especifico que so aparece no fim]*

## TIMESTAMPS (Abaixo do Video - Otimizado)
- [00:00] - O erro #1 que [resultado negativo]
- [XX:XX] - Por que [crenca comum] esta destruindo seu [area]
- [XX:XX] - A descoberta acidental que mudou tudo
- [XX:XX] - O que fazer agora (passo a passo)
*(NAO revele a solucao ou o metodo nos timestamps!)*

---
## [SECAO ABAIXO DO VIDEO - DELAYED]
### Pronto para [resultado]?
**[BOTAO CTA]**

### Quem e [Nome do Apresentador]
[Mini bio com credenciais quantificadas]
[Foto]

### Depoimentos rapidos:
> "[Resultado curto + timeline]" - [Nome]
> "[Resultado curto + timeline]" - [Nome]

**[BOTAO CTA FINAL]**
[Elemento de urgencia com justificativa]`;

export const VSL_PRINCIPLES: PrincipleItem[] = [
  {
    badge: 'SCHWARTZ',
    description: 'Misterio e o motor da VSL. Loop aberto na headline.',
  },
  {
    badge: 'GEORGI',
    description: 'Pattern interrupt visual obrigatorio na thumbnail.',
  },
];

// Webinar Template
export const WEBINAR_TEMPLATE = `## FRAME DE MERCADO (Dunford)
"Este NAO e mais um webinario sobre [categoria saturada].
E o primeiro [NOME DE NOVA CATEGORIA] para [avatar especifico]."

# WEBINARIO GRATUITO
## [Resultado especifico] em [tempo] usando [metodo unico]

### 📅 [Data] as [Hora] | ⏱️ Duracao: [X] min | 💻 100% Online

## [FORMULARIO DE REGISTRO]
**Nome** | **Email** | **WhatsApp**
**[BOTAO: "GARANTIR MINHA VAGA GRATUITA"]**

---
## O QUE VOCE VAI APRENDER:
✓ [Aprendizado 1 - resultado especifico]
✓ [Aprendizado 2 - resultado especifico]
✓ BONUS: [Aprendizado surpresa para quem ficar ate o final]

## PARA QUEM E (Tribal):
- Voce ja tentou [X, Y] e sabe que algo esta faltando
- Voce se identifica como [identidade tribal] — nao [anti-identidade]
- Voce quer [resultado] mas nao quer [sacrificio inaceitavel]

## QUEM VAI APRESENTAR:
[Nome] - [Credenciais quantificadas: Clientes, Anos, Resultados]

## PROVA SOCIAL:
"[Feedback especifico sobre conteudo + resultado]" - [Nome]

## VAGAS LIMITADAS (Hormozi)
Limitado a [X] participantes porque:
(1) [Razao tecnica real]
(2) [Razao de qualidade/interacao]
**[X] vagas restantes**

**[BOTAO CTA FINAL]**

## FAQ RAPIDO:
"Vai ficar gravado?" -> [Incentivo ao ao vivo]
"Precisa pagar?" -> 100% gratuito. Zero pegadinhas.`;

export const WEBINAR_PRINCIPLES: PrincipleItem[] = [
  {
    badge: 'DUNFORD',
    description:
      'Criar categoria nova antes de apresentar conteudo (New Category Framing).',
  },
  {
    badge: 'SCHWARTZ Nivel 5',
    description: 'Identificacao tribal para mercado sofisticado.',
  },
  {
    badge: 'HORMOZI',
    description: 'Escassez genuina com razao tecnica.',
  },
];

// Thank You Template
export const THANKYOU_TEMPLATE = `## ✅ Seu [cadastro/compra] foi confirmado!

---
## PROXIMOS PASSOS:
1️⃣ [Acao imediata - ex: Checar email/spam]
2️⃣ [Acao de preparacao - ex: Anotar duvidas]
3️⃣ [Acao de engajamento - ex: Grupo VIP]

---
## MICRO-COMPROMISSO (Hormozi)
### Antes de sair, me diga:
[Pergunta que gera micro-compromisso publico]
Ex: "Qual e o maior desafio que voce espera resolver com [produto]?"
[Campo de texto]
**[BOTAO: "ENVIAR RESPOSTA"]**

---
## IMPORTANTE: Nao perca esta oportunidade (Upsell)
### Enquanto voce espera...
[Oferta de upsell relevante OU conteudo de aquecimento]
Ex: "Garanta [bonus exclusivo] com 50% OFF apenas para quem acabou de se cadastrar"
**[BOTAO CTA SECUNDARIO]**

---
## ENQUANTO ISSO, ASSISTA:
[Video de aquecimento/preparacao - 5-10 minutos]
- "3 coisas para fazer antes do webinario"
- "O erro #1 que voce NAO pode cometer"

---
## DUVIDAS?
[Email/WhatsApp de suporte]`;

export const THANKYOU_PRINCIPLES: PrincipleItem[] = [
  {
    badge: 'HORMOZI',
    description: 'Real estate desperdicado = oportunidade perdida.',
  },
  {
    badge: 'HORMOZI',
    description: 'Micro-compromisso publico aumenta show-up/consumo.',
  },
  {
    badge: 'UPSALE',
    description: 'Melhor momento para upsell e imediatamente apos o "Sim".',
  },
];

# Template - Adicionar Novo Studio (Pattern Proven)

**Baseado em:** Synthetic Minds tokenization (✅ 100% testado)
**Tempo esperado:** 45-60 minutos
**Reusabilidade:** 90%+

---

## 🚀 Checklist Rápido

```bash
# 1. Criar estrutura
mkdir -p app/components/{studio-name}/{ui,templates}

# 2. Copiar studio-tokens.ts
cp app/components/minds/studio-tokens.ts \
   app/components/{studio-name}/studio-tokens.ts

# 3. Adaptar colors
# Edit: STUDIO_PRIMARY, STUDIO_SECONDARY, etc

# 4. Copiar componentes genéricas (se precisar)
cp app/components/minds/ui/RadarChart.tsx \
   app/components/{studio-name}/ui/RadarChart.tsx

# 5. Criar primeira view
# Usar padrão: import { STUDIO_CARD_CLASSES } from '../studio-tokens'

# 6. Testar
npm run dev
# Navegar para /studio-name
# Verificar cores (deve estar em primary color)

# 7. Commit
git add . && git commit -m "feat: tokenize {STUDIO_NAME} Studio"
```

---

## 📋 Step-by-Step Guia

### STEP 1: Preparar Colors

**Paleta de cores:**

| Studio | Primary | Secondary | Accent | Hex Primary | Hex Secondary |
|--------|---------|-----------|--------|-------------|---------------|
| Course Creator | Indigo | Purple | Gold | #5856D6 | #9D4EDD |
| Synthetic Minds | Teal | Mint | Gold | #30B0C7 | #00D084 |
| Sales Intelligence | Red | Coral | Gold | #FF3B30 | #FF6B6B |
| PRD Studio | Petróleo | Light Blue | Gold | #538096 | #6FA3C1 |
| Marketing | Orange | Amber | Gold | #FF9500 | #FFB84D |
| Design System | Gold | Cream | Gold | #C9B298 | #F2EBE4 |

**Para novo Studio:**
1. Escolha 2 cores primárias
2. Converta para HSL (use https://htmlcolorcodes.com)
3. Copie para studio-tokens.ts

### STEP 2: Estrutura Padrão

```typescript
// app/components/{studio-name}/studio-tokens.ts

export const STUDIO_PRIMARY = "#HEX";
export const STUDIO_SECONDARY = "#HEX";
export const STUDIO_ACCENT = "#C9B298";  // Gold (padrão cross-studio)

export const STUDIO_STATUS = {
  // Adapte para contexto do Studio
  active: { ... },
  warning: { ... },
  complete: { ... },
};

export const STUDIO_CARD_CLASSES = "bg-studio-card border-studio-primary/20 rounded-xl";
export const STUDIO_BUTTON_PRIMARY = "bg-studio-primary hover:bg-studio-primary-dark text-white";

// Studio-specific
export const CATEGORY_COLORS = {
  // Seu domínio
};
```

### STEP 3: Primeira View

```typescript
// app/components/{studio-name}/views/StudioHome.tsx

import React from 'react';
import { STUDIO_CARD_CLASSES, STUDIO_BUTTON_PRIMARY } from '../studio-tokens';

export const StudioHome: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative bg-studio-bg border-b border-white/5 p-10">
        <h1 className="text-white text-3xl font-bold">
          Welcome to {StudioName}
        </h1>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className={STUDIO_CARD_CLASSES}>
          <h2 className="text-studio-primary font-bold">
            Primary Color Test
          </h2>
          <p className="text-white">
            If you see color above, dynamic tokens are working!
          </p>
          <button className={STUDIO_BUTTON_PRIMARY}>
            Test Button
          </button>
        </div>
      </main>
    </div>
  );
};
```

### STEP 4: Testar CSS Variables

```bash
# 1. Abra browser DevTools
npm run dev

# 2. Navigate to http://localhost:5173/studio-name

# 3. Em DevTools Console:
console.log(getComputedStyle(document.documentElement).getPropertyValue('--primary-color'))
# Deve retornar: "HUE SATURATION LIGHTNESS"

# 4. Inspecione elemento com bg-studio-card
# Deve ter: background-color: hsl(var(--studio-card-bg))
```

### STEP 5: Adicionar ao App.tsx

```typescript
// app/App.tsx - Adicionar Studio ao router

import { StudioHome } from './components/{studio-name}/views/StudioHome';

// No router:
<Route path="/studio-name" element={<StudioHome />} />

// Ou em layout:
{currentStudio === '{studio-name}' && <StudioHome />}
```

### STEP 6: Verificar Mudança de Studio

```typescript
// App.tsx - Testar que cores mudam

// Teste 1: Mudar Studio
setCurrentStudio('app_minds');  // Deve ver Teal
setCurrentStudio('{studio-name}');  // Deve ver sua cor

// Teste 2: Verificar CSS
document.documentElement.getAttribute('data-studio')
// Deve retornar: {studio-name}
```

---

## 🎯 Componentes Reutilizáveis

### Copiar Direto (100% reusável)

```bash
# Gráficos
cp app/components/minds/ui/RadarChart.tsx \
   app/components/{studio-name}/ui/

# Viewers
cp app/components/minds/ui/YamlViewer.tsx \
   app/components/{studio-name}/ui/

# UI Utilities
cp app/components/minds/ui/Badge.tsx \
   app/components/{studio-name}/ui/
```

### Adaptar (90% reusável)

```bash
# Copiar e renomear
cp app/components/minds/ui/MindCard.tsx \
   app/components/{studio-name}/ui/StudioCard.tsx

# Depois:
# 1. Renomear interface: MindCardProps → StudioCardProps
# 2. Trocar: mind: MindData → item: StudioData
# 3. Trocar labels: "Mind" → "Item"
```

---

## 📝 Exemplo Completo: Sales Intelligence

### Estrutura

```
app/components/sales/
├── studio-tokens.ts           ← Copiar de minds, atualizar colors
├── SalesTopbar.tsx           ← Novo (padrão Minds Topbar)
├── ui/
│   ├── RadarChart.tsx         ← Copiar de minds
│   ├── SalesCard.tsx          ← Novo (baseado em MindCard)
│   └── SalesHeroSection.tsx   ← Novo (baseado em MindHeroSection)
├── templates/
│   ├── SalesOverview.tsx      ← Novo (domain-specific)
│   ├── MetricsTab.tsx         ← Novo (domain-specific)
│   └── OpportunitiesTab.tsx   ← Novo (domain-specific)
└── views/
    └── SalesPage.tsx          ← Novo (main page)
```

### studio-tokens.ts (Adaptado)

```typescript
export const STUDIO_PRIMARY = "#FF3B30";      // Sales Red
export const STUDIO_SECONDARY = "#FF6B6B";    // Coral
export const STUDIO_ACCENT = "#C9B298";       // Gold (cross-studio)

export const STUDIO_STATUS = {
  hot: {        // Em vez de "active"
    bg: "bg-red-500/20",
    text: "text-red-400",
    border: "border-red-500/30",
    dot: "bg-red-500",
  },
  cold: {       // Em vez de "inactive"
    bg: "bg-zinc-500/20",
    text: "text-zinc-400",
    border: "border-zinc-500/30",
    dot: "bg-zinc-500",
  },
  // ... others
};

export const SALES_STAGE_COLORS = {
  discovery: { bg: "bg-blue-500/20", text: "text-blue-400" },
  qualification: { bg: "bg-purple-500/20", text: "text-purple-400" },
  proposal: { bg: "bg-yellow-500/20", text: "text-yellow-400" },
  negotiation: { bg: "bg-orange-500/20", text: "text-orange-400" },
  closed_won: { bg: "bg-green-500/20", text: "text-green-400" },
};
```

### SalesCard.tsx (Novo, baseado em MindCard)

```typescript
import { STUDIO_MIND_CARD_CLASSES } from '../studio-tokens';

interface SalesCardProps {
  opportunity: OpportunityData;
  onClick?: () => void;
}

export const SalesCard: React.FC<SalesCardProps> = ({ opportunity, onClick }) => {
  return (
    <Card
      className="group relative overflow-hidden rounded-xl border border-white/5 bg-studio-card hover:border-studio-primary/30 transition-all"
      onClick={onClick}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-studio-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

      {/* Seu conteúdo Sales */}
      <h3 className="text-white group-hover:text-studio-primary">
        {opportunity.name}
      </h3>
      <p className="text-zinc-400">${opportunity.value}</p>
    </Card>
  );
};
```

---

## ⏱️ Tempo por Tarefa

| Tarefa | Tempo | Dependências |
|--------|-------|--------------|
| Copiar studio-tokens.ts | 5 min | Ter colors prontas |
| Atualizar colors | 10 min | Paleta definida |
| Criar primeira view | 15 min | studio-tokens pronto |
| Testar CSS variables | 10 min | View pronta |
| Copiar componentes genéricas | 10 min | Necessário? |
| Criar domain-specific templates | 30 min | Design definido |
| Testar tudo | 10 min | Tudo acima |

**TOTAL: 45-90 minutos** (dependendo de complexidade)

---

## 🐛 Troubleshooting

### CSS Variables não aplicam
```bash
# Verificar se App.tsx tem:
<div data-studio={currentStudio} className="...">
  {/* Conteúdo */}
</div>

# Verificar se index.css tem:
:root[data-studio="studio-name"] {
  --primary-color: 0 100% 50%;
  --studio-bg: 240 5% 4%;
}
```

### Cores não mudam ao trocar Studio
```bash
# Verificar se:
1. App.tsx atualiza data-studio
2. index.css tem CSS variables para este Studio
3. lib/tokens.ts tem este Studio registrado
```

### Classes não encontradas
```bash
# Verificar imports
import { STUDIO_CARD_CLASSES } from '../studio-tokens';
// Não de:
import { STUDIO_CARD_CLASSES } from '../minds/studio-tokens';
```

---

## 📚 Documentação Necessária

Para novo Studio, criar:

1. **studio-tokens.ts** - Colors e classes
2. **README.md** - Guia rápido
3. **REFACTORED.md** - Status de refatoração
4. **REUSABILITY_ANALYSIS.md** - (opcional) se fez customizações

---

## ✅ Validação Checklist

- [ ] studio-tokens.ts criado com colors corretos
- [ ] Primeira view renderiza
- [ ] bg-studio-card mostra cor correta
- [ ] text-studio-primary mostra cor correta
- [ ] Mudando Studio em App.tsx, cores mudam
- [ ] Nenhuma cor hardcoded [#XXX]
- [ ] Nenhuma referência hardcoded ao Studio name
- [ ] CSS variables aplicadas (DevTools)
- [ ] Components reutilizáveis copiados
- [ ] Documentação criada
- [ ] Tests passam (se houver)
- [ ] Lint passa
- [ ] Commit criado

---

## 🎓 Pattern Proof

### Reusado com Sucesso

✅ Course Creator (Indigo)
✅ Synthetic Minds (Teal)
⏳ Sales Intelligence (próximo)
⏳ PRD Studio (próximo)
⏳ Marketing (próximo)
⏳ Design System (próximo)

---

## 🤝 Questions?

Ref: `/Users/alan/Code/mmos/app/components/minds/REUSABILITY_ANALYSIS.md`


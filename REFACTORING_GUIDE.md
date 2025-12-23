# 🎨 Studio Colors Refactoring Guide

## Visão Geral

O sistema foi expandido para suportar **múltiplos Studios com consistência visual automática** via:

1. **`lib/tokens.ts`** - Master tokens para todos os Studios
2. **`index.css`** - Classes utilitárias dinâmicas (`bg-studio-primary`, etc)
3. **`tailwind.config.ts`** - Configuração centralizada do Tailwind
4. **`App.tsx`** - Já aplica variáveis CSS dinamicamente (sem mudanças necessárias)

## Como Funciona

### Fluxo Automático

```
App.tsx detects Studio
    ↓
Aplica variáveis CSS (--primary-color, --primary-dark, etc)
    ↓
Componentes usam classes dinâmicas (bg-studio-primary)
    ↓
Cores mudam automaticamente quando Studio muda
    ↓
Visual 100% consistente entre todos os Studios
```

### Exemplo: Design System → Sales Intelligence

| Propriedade | Design System | Sales Intelligence | Classe Dinâmica |
|-------------|---------------|-------------------|-----------------|
| Primary Color | #C9B298 (Gold) | #FF3B30 (Red) | `bg-studio-primary` |
| Dark Variant | #A2845E | #C41C1C | `bg-studio-primary-dark` |
| Light BG | #111116 | #111116 | `bg-studio-card` |

**Sem mudança no código!** As cores mudam automaticamente.

---

## Refactoring Strategy

### Passo 1: Mapear Cores Hardcoded

Use este comando para encontrar cores hardcoded:

```bash
# Encontrar cores hex em componentes
grep -r "bg-\[#\|text-\[#\|border-\[#" app/components/

# Resultado típico:
# components/design-system/LegendaryVsMediocreSection.tsx: bg-[#111116]
# components/minds/ui/MindCard.tsx: bg-[#111116]
# components/studio/CreatorTopbar.tsx: bg-[#538096]
```

### Passo 2: Identificar Padrão de Cor

Cada cor hardcoded cai em uma dessas categorias:

| Padrão | Hex | Novo | Por quê |
|--------|-----|------|--------|
| Card Background | #111116 | `bg-studio-card` | Muda com cada Studio |
| Primary Text | #538096 | `text-studio-primary` | Usa cor principal do Studio |
| Primary Hover | #4a7285 | `bg-studio-primary-dark` | Variante escura |
| Gold Accent | #C9B298 | `bg-studio-accent` | Accent do Studio |

### Passo 3: Refatorar Componente (Exemplo Real)

#### Antes (Hardcoded):
```tsx
// components/minds/ui/MindCard.tsx
export function MindCard({ mind }: Props) {
  return (
    <Card
      className={cn(
        "bg-[#111116] border-[#111116]/30 rounded-xl",
        isDraft && "opacity-60 grayscale-[0.8]"
      )}
    >
      <div className="bg-[#0A0A0F] p-4">
        {/* ... */}
      </div>
    </Card>
  );
}
```

#### Depois (Dinâmico):
```tsx
// components/minds/ui/MindCard.tsx
export function MindCard({ mind }: Props) {
  return (
    <Card
      className={cn(
        "bg-studio-card border-studio-primary/20 rounded-xl",
        isDraft && "opacity-60 grayscale-[0.8]"
      )}
    >
      <div className="bg-studio-bg p-4">
        {/* ... */}
      </div>
    </Card>
  );
}
```

**Mudanças:**
- `bg-[#111116]` → `bg-studio-card` ✅
- `border-[#111116]/30` → `border-studio-primary/20` ✅
- `bg-[#0A0A0F]` → `bg-studio-bg` ✅

**Resultado visual:** IDÊNTICO para Design System, automaticamente diferente para Sales Intelligence!

---

## Mapeamento de Cores

### Dark Mode Colors (Já Dinâmicas)

| Hex | Classe Dinâmica | Variáveis CSS |
|-----|-----------------|-----------------|
| #111116 (Card) | `bg-studio-card` | `--studio-card-bg` |
| #0A0A0F (BG) | `bg-studio-bg` | `--studio-bg` |
| #538096 (Primary) | `bg-studio-primary` | `--primary-color` |
| #3D5A6C (Primary Dark) | `bg-studio-primary-dark` | `--primary-dark` |
| #C9B298 (Gold/Accent) | `bg-studio-accent` | `--accent-color` |

### Padrões Comuns

```tsx
// Pattern 1: Card Container
❌ className="bg-[#111116] border-border/30"
✅ className="bg-studio-card border-studio-primary/20"

// Pattern 2: Primary Button
❌ className="bg-[#538096] hover:bg-[#4a7285]"
✅ className="bg-studio-primary hover:bg-studio-primary-dark"

// Pattern 3: Gold Accent
❌ className="bg-[#C9B298]"
✅ className="bg-studio-accent"

// Pattern 4: Muted Text
❌ className="text-muted-foreground"
✅ className="text-studio-text-muted"

// Pattern 5: Border
❌ className="border-[#538096]/30"
✅ className="border-studio-primary/20"
```

---

## Refactoring Checklist

### Componentes por Prioridade

#### 🔴 Críticos (15 componentes)
- [ ] `components/design-system/LegendaryVsMediocreSection.tsx`
- [ ] `components/design-system/DesignSystemTopbar.tsx`
- [ ] `components/studio/StudioLayout.tsx`
- [ ] `components/studio/StudioSidebar.tsx`
- [ ] `components/prd/PRDRouter.tsx`
- [ ] `components/creator/CreatorTopbar.tsx`
- [ ] `components/minds/ui/MindCard.tsx`
- [ ] `components/minds/templates/MindsGalleryTemplate.tsx`
- [ ] `components/minds/templates/ContentsTab.tsx`
- [ ] `components/ui/code-block.tsx`
- [ ] `components/design-system/DocsSection.tsx`
- [ ] `components/design-system/GraphSection.tsx`
- [ ] `components/design-system/ColorSection.tsx`
- [ ] `components/sales/templates/*` (todos)
- [ ] `components/marketing/templates/*` (todos)

#### 🟡 Importantes (20+ componentes)
- [ ] Remaining design-system sections
- [ ] Remaining minds components
- [ ] Remaining creator components

#### 🟢 Nice-to-have (120+ componentes)
- [ ] Utility UI components (button, card, etc)
- [ ] Shared components
- [ ] Business logic components

---

## Best Practices

### 1. Sempre Testar Visualmente
```bash
npm run dev
# Verificar em cada Studio:
# - Design System (Gold)
# - Course Creator (Indigo)
# - PRD Studio (Petróleo Blue)
# - Sales Intelligence (Red)
# - Synthetic Minds (Teal)
# - Marketing (Orange)
```

### 2. Use Classes Compostas
```tsx
// ✅ Bom - Refactoring seguro
const cardClass = cn(
  "bg-studio-card",
  "border-studio-primary/20",
  "rounded-xl",
  "p-4"
);

// ❌ Ruim - Tira valor dinâmico
const cardClass = `bg-studio-card border-[#111116]/20`; // Hardcoded!
```

### 3. Preserve Opacity
```tsx
// ✅ Mantém transparência
className="border-studio-primary/20"

// ❌ Perde o efeito dinâmico
className="border-[#538096]/20"
```

### 4. Status Colors
```tsx
// ✅ Dinâmico
className="bg-status-success text-status-success"

// ❌ Hardcoded
className="bg-emerald-500/20 text-emerald-400"
```

---

## Testing Strategy

### Visual Regression Testing

1. **Screenshot cada Studio após refactor:**
```bash
# Design System
npm run dev
# Captura screenshot em http://localhost:5173/design

# Sales Intelligence
# Captura screenshot em http://localhost:5173/sales

# Compare manualmente ou use Pixelmatch
```

2. **Checklist Visual:**
- [ ] Cores primárias corretas
- [ ] Hovers funcionam
- [ ] Texto legível
- [ ] Borders visíveis
- [ ] Status indicators corretos

### Automated Testing

```tsx
// Exemplo: Verificar que classes dinâmicas são aplicadas
test('MindCard uses studio-card class', () => {
  render(<MindCard mind={mockMind} />);
  const card = screen.getByRole('article');
  expect(card).toHaveClass('bg-studio-card');
});
```

---

## Variáveis CSS Disponíveis

Todas definidas automaticamente quando um Studio é ativado:

```css
/* Primary Color System */
--primary-color: hsl(...)
--primary-dark: hsl(...)
--primary-light: hsl(...)
--primary-lighter: hsl(...)

/* Secondary Color System */
--secondary-color: hsl(...)
--secondary-dark: hsl(...)
--secondary-light: hsl(...)

/* Accent */
--accent-color: hsl(...)
--accent-dark: hsl(...)

/* Backgrounds */
--studio-bg: hsl(...)
--studio-card-bg: hsl(...)
--studio-border: hsl(...)

/* Text */
--text-primary: hsl(...)
--text-secondary: hsl(...)
--text-muted: hsl(...)

/* Status */
--status-success: hsl(...)
--status-warning: hsl(...)
--status-error: hsl(...)
--status-info: hsl(...)
```

---

## FAQ

### P: Vai quebrar o visual?
R: **Não.** As classes dinâmicas usam as mesmas cores do App.tsx atualmente. Se o visual for idêntico agora, será idêntico depois.

### P: E se eu errar uma cor?
R: Use `npm run dev` e teste em todos os Studios. Se algo ficar estranho, volte para o hardcoded até verificar.

### P: Como adiciono um novo Studio?
R: 1. Adicione paleta em `lib/tokens.ts`
   2. Mapeie no `getStudioTokensForSection()`
   3. Pronto! Classes dinâmicas funcionam automaticamente.

### P: Preciso alterar o App.tsx?
R: **Não.** O App.tsx já aplica as variáveis CSS. Refatora apenas os componentes.

---

## Próximos Passos

1. ✅ Sistema de tokens criado (`lib/tokens.ts`)
2. ✅ Classes dinâmicas criadas (`index.css`)
3. ✅ Tailwind config atualizado (`tailwind.config.ts`)
4. **Refatorar 155+ cores hardcoded** (este guia)
5. Testar visualmente em todos os Studios
6. Documentar qualquer cor customizada que encontrar

---

**Última atualização:** 2025-12-23
**Status:** Pronto para refatoração

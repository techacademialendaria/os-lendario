# Luxo Minimalista - Design System Guide

> Academia Lendária Design System v2.1
> Última atualização: Janeiro 2026

Este guia documenta os padrões de transformação para converter interfaces padrão em experiências de **Luxo Minimalista**.

---

## Filosofia

1. **Menos é mais** - Remover elementos desnecessários
2. **Whitespace generoso** - Espaço é luxo
3. **Tipografia de alta costura** - Tracking espaçado, hierarquia clara
4. **Profundidade orgânica** - Sombras suaves, blur, levitação
5. **Micro-interações elegantes** - Transições lentas e suaves

---

## Tipografia

### Labels, Tags & Categorias

```tsx
// Padrão luxo
className="text-[9px] font-black uppercase tracking-[0.3em]"

// Ou mais espaçado
className="text-[10px] font-black uppercase tracking-[0.4em]"
```

### Títulos Principais (Hero)

```tsx
className="text-5xl font-black leading-[0.9] tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl"
```

### Subtítulos & Autores

```tsx
className="font-serif text-lg italic text-muted-foreground md:text-xl"
```

---

## Reading Modes (Paper/Night/Sepia)

### Configuração de Estado

```tsx
const [readingMode, setReadingMode] = useState<'paper' | 'night' | 'sepia'>(() => {
  const saved = localStorage.getItem('book-reader-mode');
  return saved === 'paper' || saved === 'night' || saved === 'sepia' ? saved : 'night';
});

useEffect(() => {
  localStorage.setItem('book-reader-mode', readingMode);
}, [readingMode]);
```

### Paletas de Cores (USAR INLINE STYLES)

```tsx
const readingModeConfig = {
  paper: {
    bg: '#FDFCFB',
    text: '#1A1A1A',
    textMuted: '#666666',
    border: '#E5E5E5',
    headerBg: 'rgba(253, 252, 251, 0.9)',
  },
  night: {
    bg: '#0A0A0A',
    text: '#FAFAFA',
    textMuted: '#888888',
    border: '#222222',
    headerBg: 'rgba(10, 10, 10, 0.8)',
  },
  sepia: {
    bg: '#F4ECD8',
    text: '#5B4636',
    textMuted: '#8B7355',
    border: '#D4C4A8',
    headerBg: 'rgba(244, 236, 216, 0.9)',
  },
};

const currentMode = readingModeConfig[readingMode];
```

### Aplicar com Inline Styles (NÃO CLASSES)

```tsx
// ❌ ERRADO - Classes Tailwind não sobrescrevem prose
<div className={readingModeStyles[mode].container}>

// ✅ CORRETO - Inline styles funcionam
<div style={{ backgroundColor: currentMode.bg, color: currentMode.text }}>
```

### MarkdownRenderer com inheritColors

**CRÍTICO:** Sem isso, o texto fica branco mesmo no modo paper/sepia.

```tsx
<MarkdownRenderer
  content={content}
  variant="article"
  inheritColors  // ← OBRIGATÓRIO para reading modes
/>
```

O prop `inheritColors` faz o MarkdownRenderer usar `text-inherit` em vez de `text-foreground`, permitindo herança de cores do parent.

### Mode Switcher UI

```tsx
<div
  className="flex items-center rounded-full p-1 backdrop-blur-sm"
  style={{
    backgroundColor: readingMode === 'night'
      ? 'rgba(255,255,255,0.1)'
      : 'rgba(0,0,0,0.1)'
  }}
>
  {(['paper', 'night', 'sepia'] as const).map((mode) => (
    <button
      key={mode}
      onClick={() => setReadingMode(mode)}
      className={cn(
        'h-7 w-7 rounded-full border-2 transition-all active:scale-90',
        readingMode === mode
          ? 'scale-110 border-primary shadow-lg'
          : 'border-transparent opacity-50 hover:opacity-100'
      )}
      style={{
        backgroundColor: mode === 'paper' ? '#FDFCFB' : mode === 'night' ? '#0A0A0A' : '#D2B48C',
      }}
    />
  ))}
</div>
```

---

## Smart Floating Header (Focus Mode)

### Lógica de Scroll

```tsx
const [isFocusMode, setIsFocusMode] = useState(false);
const lastScrollY = useRef(0);

const handleScroll = (e: React.UIEvent) => {
  const scrollTop = e.currentTarget.scrollTop;
  const scrollDelta = scrollTop - lastScrollY.current;

  if (scrollTop > 100 && scrollDelta > 0) {
    setIsFocusMode(true);
  } else if (scrollTop < 50 || scrollDelta < -50) {
    setIsFocusMode(false);
  }
  lastScrollY.current = scrollTop;
};
```

### Header Flutuante

```tsx
<header
  className={cn(
    'fixed left-1/2 top-6 z-50 w-[90%] max-w-4xl -translate-x-1/2 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]',
    isFocusMode
      ? 'opacity-0 -translate-y-12 pointer-events-none'
      : 'opacity-100 translate-y-0'
  )}
>
  <div
    className="flex h-16 items-center justify-between rounded-[2rem] px-6 shadow-2xl backdrop-blur-3xl"
    style={{
      backgroundColor: currentMode.headerBg,
      borderColor: currentMode.border,
      borderWidth: '1px',
    }}
  >
    {/* Conteúdo */}
  </div>
</header>
```

---

## Progress Bar com Glow

```tsx
<div className="pointer-events-none fixed left-0 right-0 top-0 z-[100] h-[2px] bg-border/10">
  <div
    className="h-full bg-primary shadow-[0_0_15px_rgba(var(--primary),0.6)] transition-all duration-300 ease-out"
    style={{ width: `${scrollProgress}%` }}
  />
</div>
```

---

## Selection Toolbar Premium

### Container Glass Morphism

```tsx
<div className="flex items-center rounded-2xl border border-white/10 bg-zinc-900/95 p-1 shadow-[0_30px_60px_rgba(0,0,0,0.6)] backdrop-blur-2xl">
  <ToolbarButton icon="pencil" label="Destacar" />
  <div className="h-10 w-px bg-white/5" /> {/* Separador */}
  <ToolbarButton icon="plus" label="Anotar" />
  <div className="h-10 w-px bg-white/5" />
  <ToolbarButton icon="copy" label="Copiar" />
</div>
```

### Toolbar Button

```tsx
<button
  className={cn(
    'group flex flex-col items-center gap-1.5 rounded-xl px-5 py-3 transition-all',
    'text-zinc-400 hover:bg-white/5 hover:text-white',
    'active:scale-95'
  )}
>
  <Icon name={icon} size="size-4" className="transition-colors group-hover:text-primary" />
  <span className="text-[8px] font-black uppercase tracking-[0.2em] text-zinc-500 group-hover:text-white transition-colors">
    {label}
  </span>
</button>
```

### Arrow Pointer

```tsx
<div
  className="absolute left-1/2 h-0 w-0 -translate-x-1/2"
  style={{
    bottom: '-7px',
    borderLeft: '8px solid transparent',
    borderRight: '8px solid transparent',
    borderTop: '8px solid rgba(24, 24, 27, 0.95)',
  }}
/>
```

---

## Sidebar Chapters

### Extração (Só ## e ###)

```tsx
const extractChapters = (content: string | null) => {
  if (!content) return [];

  const chapters = [];
  const lines = content.split('\n');
  let id = 1;

  for (const line of lines) {
    // Match ## (h2) and ### (h3), skip # (h1)
    const match = line.match(/^(#{2,3})\s+(.+)/);
    if (match) {
      const level = match[1].length; // 2 ou 3
      const title = match[2].trim();
      chapters.push({ id: id++, title, slug: slugify(title), level });
    }
  }

  return chapters;
};
```

### Renderização (Sem Números)

```tsx
{chapters.map((chapter, i) => {
  const isH3 = chapter.level === 3;
  return (
    <button
      key={chapter.id}
      onClick={() => scrollToChapter(chapter.slug)}
      className={cn(
        'flex w-full items-start border-b border-border/50 text-left transition-colors hover:bg-muted/30',
        isH3 ? 'py-2.5 pl-10 pr-6 text-xs' : 'px-6 py-4 text-sm',
        i === 0 ? 'border-l-4 border-l-primary bg-primary/5' : 'text-muted-foreground'
      )}
    >
      <span className={cn(
        'block leading-snug',
        i === 0 && 'font-bold text-foreground',
        isH3 && 'text-muted-foreground/80'
      )}>
        {isH3 && '› '}{chapter.title}
      </span>
    </button>
  );
})}
```

---

## Mobile Toolbar (4 Botões)

```tsx
<div className="flex items-center justify-around px-4 py-3">
  {/* 1. Font Size */}
  <button onClick={() => setShowFontPicker(!showFontPicker)}>
    <span className="font-serif text-2xl">A</span>
  </button>

  {/* 2. Chapters */}
  <button onClick={() => setSidebarOpen(true)}>
    <Icon name="list" size="size-6" />
  </button>

  {/* 3. Favorite */}
  <button onClick={handleToggleFavorite}>
    <Icon name={isFavorite ? 'star-solid' : 'star'} size="size-6" />
  </button>

  {/* 4. Reading Mode Cycle */}
  <button onClick={cycleReadingMode}>
    <div className="h-6 w-6 rounded-full border-2" style={{ backgroundColor: modeColor }} />
  </button>
</div>
```

---

## Background Effects

### Texture Overlay

```tsx
<div className={cn(
  "pointer-events-none fixed inset-0 z-0 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]",
  readingMode === 'paper' ? 'opacity-[0.03]' :
  readingMode === 'sepia' ? 'opacity-[0.05]' :
  'opacity-[0.02]'
)} />
```

### Vignette Adaptativa

```tsx
<div className={cn(
  "pointer-events-none fixed inset-0 z-0",
  readingMode === 'night'
    ? 'bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.5)_100%)]'
    : 'bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.1)_100%)]'
)} />
```

---

## Troubleshooting

### Cores não mudam no Reading Mode

1. Verificar se `inheritColors` está no `MarkdownRenderer`
2. Usar `style={{ color: ... }}` no container, não classes
3. Prose plugin sobrescreve classes - usar inline styles

### Capítulos demais na Sidebar

- Regex deve ser `^(#{2,3})` não `^#{1,3}`
- Ignorar `#` (título principal do livro)

### Header não adapta às cores

- Usar `style={{ backgroundColor: currentMode.headerBg }}` em vez de classes

---

## Checklist de Implementação

### Reading Experience
- [ ] Reading modes (paper/night/sepia) com persistência localStorage
- [ ] Inline styles para cores (não classes Tailwind)
- [ ] MarkdownRenderer com `inheritColors` prop
- [ ] Mode switcher com círculos coloridos
- [ ] Font size controls no header
- [ ] Progress bar com glow

### Navigation & Sidebar
- [ ] Capítulos só ## e ### (ignorar #)
- [ ] Sidebar sem números
- [ ] Hierarquia visual com indentação para ###
- [ ] Font controls APENAS no header/mobile bar

### Interatividade
- [ ] Smart floating header (focus mode)
- [ ] Selection toolbar premium glass
- [ ] Mobile toolbar 4 botões

### Removidos (por design)
- [x] ~~Bottom HUD desktop~~ (redundante com seleção de texto)
- [x] ~~Font controls na sidebar~~
- [x] ~~Números nos capítulos~~

---

## Arquivos de Referência

| Arquivo | Descrição |
|---------|-----------|
| `components/books/templates/BookReaderTemplate.tsx` | Template principal do reader |
| `components/books/ui/TextSelectionToolbar.tsx` | Toolbar de seleção premium |
| `components/shared/MarkdownRenderer.tsx` | Renderer com `inheritColors` |

---

*Academia Lendária - Design System v2.1*

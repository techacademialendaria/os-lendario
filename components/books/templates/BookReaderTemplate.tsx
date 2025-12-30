import React, { useState, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../../ui/button';
import { MarkdownRenderer } from '../../shared/MarkdownRenderer';
import { Icon } from '../../ui/icon';
import { Badge } from '../../ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../ui/tabs';
import { cn } from '../../../lib/utils';
import { Section } from '../../../types';
import { Card, CardContent } from '../../ui/card';
import { Skeleton } from '../../ui/skeleton';
import { useBook } from '../../../hooks/useBooks';
import { usePageTitle } from '../../../hooks/usePageTitle';

interface BookReaderTemplateProps {
  setSection: (section: Section) => void;
  setSidebarCollapsed?: (collapsed: boolean) => void;
  setSidebarHidden?: (hidden: boolean) => void;
}

// Generate slug from text for heading IDs
const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove accents
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
};

// Extract quotes from content (lines starting with > or containing "")
const extractQuotes = (content: string | null): string[] => {
  if (!content) return [];

  const quotes: string[] = [];
  const lines = content.split('\n');

  for (const line of lines) {
    // Markdown blockquote
    if (line.startsWith('>')) {
      quotes.push(line.replace(/^>\s*/, '').trim());
    }
    // Text in quotes
    const quoteMatch = line.match(/"([^"]{20,})"/);
    if (quoteMatch) {
      quotes.push(quoteMatch[1]);
    }
  }

  return quotes.slice(0, 5); // Max 5 quotes
};

// Extract sections/chapters from content (headings)
const extractChapters = (
  content: string | null
): Array<{ id: number; title: string; slug: string; completed: boolean }> => {
  if (!content) return [];

  const chapters: Array<{ id: number; title: string; slug: string; completed: boolean }> = [];
  const lines = content.split('\n');
  let id = 1;

  for (const line of lines) {
    const match = line.match(/^#{1,3}\s+(.+)/);
    if (match) {
      const title = match[1].trim();
      chapters.push({
        id: id++,
        title,
        slug: slugify(title),
        completed: false,
      });
    }
  }

  return chapters;
};

const BookReaderTemplate: React.FC<BookReaderTemplateProps> = ({
  setSection,
  setSidebarCollapsed,
  setSidebarHidden,
}) => {
  const { bookSlug } = useParams<{ bookSlug: string }>();
  const navigate = useNavigate();
  const { book, loading, error } = useBook(bookSlug || '');
  const contentRef = React.useRef<HTMLDivElement>(null);

  usePageTitle(book?.title ? `Lendo: ${book.title}` : 'Carregando...');

  const [fontSize, setFontSize] = useState<'sm' | 'md' | 'lg'>(() => {
    const saved = localStorage.getItem('book-reader-font-size');
    return saved === 'sm' || saved === 'md' || saved === 'lg' ? saved : 'md';
  });

  // Persist font size preference
  useEffect(() => {
    localStorage.setItem('book-reader-font-size', fontSize);
  }, [fontSize]);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Sidebar state - starts closed for distraction-free reading
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('chapters');

  // Extract key quotes for sidebar
  const keyQuotes = useMemo(() => {
    return extractQuotes(book?.content || null);
  }, [book?.content]);

  // Extract chapters from content
  const chapters = useMemo(() => {
    return extractChapters(book?.content || null);
  }, [book?.content]);

  // Scroll to chapter
  const scrollToChapter = (slug: string) => {
    const element = document.getElementById(slug);
    if (element && contentRef.current) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Get content to display
  const displayContent = book?.content || book?.summary || null;

  // Fallback gradient for cover
  const coverGradients = [
    'from-amber-600 to-orange-800',
    'from-blue-600 to-indigo-800',
    'from-emerald-600 to-teal-800',
    'from-purple-600 to-violet-800',
    'from-rose-600 to-pink-800',
  ];
  const gradientIndex = (bookSlug?.charCodeAt(0) || 0) % coverGradients.length;
  const fallbackGradient = coverGradients[gradientIndex];

  // Collapse app sidebar on mount, restore on unmount
  useEffect(() => {
    if (setSidebarCollapsed) {
      setSidebarCollapsed(true);
    }
    // Also ensure sidebar is not hidden
    if (setSidebarHidden) {
      setSidebarHidden(false);
    }

    // Prevent body scroll while in reader mode
    document.body.style.overflow = 'hidden';

    return () => {
      if (setSidebarCollapsed) {
        setSidebarCollapsed(false);
      }
      document.body.style.overflow = '';
    };
  }, [setSidebarCollapsed, setSidebarHidden]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    const progress = (scrollTop / (scrollHeight - clientHeight)) * 100;
    setScrollProgress(isNaN(progress) ? 0 : progress);
  };

  // Font size class mapping - using CSS custom property for precise control
  const fontSizeStyles = {
    sm: { fontSize: '1rem', lineHeight: '1.75' }, // 16px
    md: { fontSize: '1.125rem', lineHeight: '1.8' }, // 18px
    lg: { fontSize: '1.375rem', lineHeight: '1.85' }, // 22px
  };

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background p-6">
        <div className="space-y-4 text-center">
          <Icon name="exclamation-circle" className="mx-auto text-destructive" size="size-12" />
          <h2 className="text-xl font-bold">Livro não encontrado</h2>
          <p className="text-muted-foreground">{error.message}</p>
          <Button onClick={() => navigate('/books')}>Voltar à Biblioteca</Button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex h-screen bg-background text-foreground">
        <div className="flex-1 p-12">
          <div className="mx-auto max-w-3xl space-y-6">
            <Skeleton className="mx-auto h-6 w-24" />
            <Skeleton className="mx-auto h-12 w-3/4" />
            <Skeleton className="mx-auto h-1 w-16" />
            <Skeleton className="mt-12 h-64 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!book) return null;

  return (
    <div className="relative flex h-screen animate-fade-in overflow-hidden bg-background font-sans text-foreground">
      {/* Reading Progress Bar (Fixed at top, centered with content width) */}
      <div className="pointer-events-none fixed left-1/2 top-0 z-[100] w-full max-w-4xl -translate-x-1/2 px-6 md:px-16">
        <div
          className="h-0.5 bg-brand-gold transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* MAIN CONTENT AREA */}
      <div
        ref={contentRef}
        className="h-full flex-1 overflow-y-auto scroll-smooth bg-background"
        onScroll={handleScroll}
      >
        <div className="mx-auto max-w-4xl px-6 pb-12 pt-2 md:px-16">
          {/* Title Section */}
          <div className="mb-16 animate-fade-in space-y-6 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
              {book.category || 'Resumo do Livro'}
            </span>
            <h1 className="font-serif text-4xl font-bold leading-tight text-foreground md:text-6xl">
              {book.title}
            </h1>
            <p className="text-muted-foreground">por {book.author}</p>
            <div className="mx-auto h-1 w-12 rounded-full bg-border"></div>
          </div>

          {/* Article Body */}
          <article
            className={cn(
              'prose dark:prose-invert max-w-none animate-fade-in font-serif text-foreground/90 transition-all duration-300',
              'prose-headings:font-sans prose-headings:text-foreground',
              'prose-blockquote:border-l-4 prose-blockquote:border-brand-gold prose-blockquote:bg-muted/20 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-blockquote:not-italic prose-blockquote:text-foreground/80',
              'prose-strong:text-foreground prose-strong:font-bold',
              'prose-ul:list-disc prose-ol:list-decimal',
              'prose-li:marker:text-brand-gold'
            )}
            style={fontSizeStyles[fontSize]}
          >
            {displayContent ? (
              <MarkdownRenderer content={displayContent} variant="article" />
            ) : (
              <div className="py-12 text-center text-muted-foreground">
                <Icon name="document" className="mx-auto mb-4" size="size-12" />
                <p>O conteúdo deste livro ainda não foi gerado.</p>
                <Button className="mt-4" variant="outline">
                  <Icon name="sparkles" className="mr-2" /> Gerar Resumo com IA
                </Button>
              </div>
            )}
          </article>

          {/* Navigation Footer */}
          <div className="mt-24 flex animate-fade-in items-center justify-between border-t border-border pt-12">
            <Button
              variant="outline"
              className="gap-2"
              onClick={() => navigate(`/books/${bookSlug}`)}
            >
              <Icon name="arrow-left" /> Voltar aos Detalhes
            </Button>
            <Button className="h-12 gap-2 rounded-full bg-brand-gold px-8 text-black shadow-lg transition-all hover:bg-brand-gold/90 hover:shadow-xl">
              <Icon name="check" /> Marcar como Lido
            </Button>
          </div>
        </div>
      </div>

      {/* RIGHT SIDEBAR + FLOATING BUTTON - Portal to body for correct fixed positioning */}
      {createPortal(
        <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
          {/* RIGHT SIDEBAR (Collapsible) */}
          <div
            className={cn(
              'pointer-events-auto absolute right-0 top-0 flex h-full transform flex-col border-l border-border bg-card shadow-2xl transition-all duration-300 ease-in-out',
              sidebarOpen ? 'w-80 translate-x-0' : 'w-80 translate-x-full'
            )}
          >
            {/* Book Info Header + Font Controls */}
            <div className="relative shrink-0 border-b border-border bg-muted/10 p-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(false)}
                className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
              >
                <Icon name="arrow-right" size="size-4" />
              </Button>
              <div className="mb-3 flex items-start gap-3 pr-8">
                <div className="h-18 w-12 shrink-0 overflow-hidden rounded border border-white/10 shadow-md">
                  {book.coverUrl ? (
                    <img src={book.coverUrl} alt="Cover" className="h-full w-full object-cover" />
                  ) : (
                    <div
                      className={cn(
                        'flex h-full w-full items-center justify-center bg-gradient-to-br',
                        fallbackGradient
                      )}
                    >
                      <Icon name="book-open" className="text-white/50" size="size-4" />
                    </div>
                  )}
                </div>
                <div className="min-w-0">
                  <h2 className="mb-0.5 font-serif text-sm font-bold leading-tight">
                    {book.title}
                  </h2>
                  <p className="text-xs text-muted-foreground">{book.author}</p>
                </div>
              </div>
              {/* Font Size Controls */}
              <div className="flex items-center justify-between border-t border-border/50 pt-2">
                <span className="text-[10px] uppercase tracking-wide text-muted-foreground">
                  Fonte
                </span>
                <div className="flex items-center gap-0.5 rounded bg-muted/30 p-0.5">
                  <button
                    onClick={() => setFontSize('sm')}
                    className={cn(
                      'flex h-7 w-7 items-center justify-center rounded font-serif text-xs transition-colors',
                      fontSize === 'sm'
                        ? 'bg-background text-foreground shadow-sm'
                        : 'text-muted-foreground hover:text-foreground'
                    )}
                  >
                    A
                  </button>
                  <button
                    onClick={() => setFontSize('md')}
                    className={cn(
                      'flex h-7 w-7 items-center justify-center rounded font-serif text-sm transition-colors',
                      fontSize === 'md'
                        ? 'bg-background text-foreground shadow-sm'
                        : 'text-muted-foreground hover:text-foreground'
                    )}
                  >
                    A
                  </button>
                  <button
                    onClick={() => setFontSize('lg')}
                    className={cn(
                      'flex h-7 w-7 items-center justify-center rounded font-serif text-base transition-colors',
                      fontSize === 'lg'
                        ? 'bg-background text-foreground shadow-sm'
                        : 'text-muted-foreground hover:text-foreground'
                    )}
                  >
                    A
                  </button>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="flex min-h-0 flex-1 flex-col overflow-hidden"
            >
              <div className="shrink-0 border-b border-border px-4 pt-2">
                <TabsList className="h-auto w-full justify-start gap-6 bg-transparent p-0">
                  <TabsTrigger
                    value="chapters"
                    className="rounded-none border-b-2 border-transparent bg-transparent px-0 pb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground data-[state=active]:border-primary data-[state=active]:text-foreground"
                  >
                    Capítulos
                  </TabsTrigger>
                  <TabsTrigger
                    value="insights"
                    className="rounded-none border-b-2 border-transparent bg-transparent px-0 pb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground data-[state=active]:border-primary data-[state=active]:text-foreground"
                  >
                    Insights
                  </TabsTrigger>
                </TabsList>
              </div>

              <div className="h-0 flex-1 overflow-y-auto">
                <TabsContent value="chapters" className="m-0 p-0">
                  <div className="flex flex-col">
                    {chapters.length > 0 ? (
                      chapters.map((chapter, i) => (
                        <button
                          key={chapter.id}
                          onClick={() => scrollToChapter(chapter.slug)}
                          className={cn(
                            'flex w-full items-start gap-3 border-b border-border/50 px-6 py-4 text-left text-sm transition-colors hover:bg-muted/30',
                            i === 0
                              ? 'border-l-4 border-l-primary bg-primary/5'
                              : 'text-muted-foreground'
                          )}
                        >
                          <span
                            className={cn(
                              'mt-0.5 font-mono text-xs opacity-50',
                              i === 0 && 'font-bold text-primary opacity-100'
                            )}
                          >
                            {String(chapter.id).padStart(2, '0')}
                          </span>
                          <div className="flex-1">
                            <span
                              className={cn(
                                'block leading-snug',
                                i === 0 && 'font-bold text-foreground'
                              )}
                            >
                              {chapter.title}
                            </span>
                            {chapter.completed && (
                              <span className="mt-1 inline-block text-[10px] font-bold text-green-500">
                                Concluído
                              </span>
                            )}
                          </div>
                        </button>
                      ))
                    ) : (
                      <div className="p-6 text-center text-sm text-muted-foreground">
                        <Icon name="document" className="mx-auto mb-2" size="size-8" />
                        <p>Sem capítulos identificados</p>
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="insights" className="m-0 space-y-4 p-6">
                  {keyQuotes.length > 0 ? (
                    keyQuotes.map((quote, idx) => (
                      <Card key={idx} className="border-border bg-background shadow-sm">
                        <CardContent className="p-4">
                          <div className="mb-2 flex justify-between">
                            <span className="flex items-center gap-2 text-xs font-bold text-foreground">
                              <Icon name="quote-right" size="size-3" /> Citação
                            </span>
                            <div className="flex gap-2">
                              <Icon
                                name="copy"
                                size="size-3"
                                className="cursor-pointer text-muted-foreground hover:text-foreground"
                              />
                              <Icon
                                name="share"
                                size="size-3"
                                className="cursor-pointer text-muted-foreground hover:text-foreground"
                              />
                            </div>
                          </div>
                          <p className="font-serif text-sm italic text-foreground/80">"{quote}"</p>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <Card className="border-border bg-background shadow-sm">
                      <CardContent className="p-4">
                        <div className="mb-2 flex items-center gap-2">
                          <Icon
                            name="bookmark"
                            type="solid"
                            className="text-brand-gold"
                            size="size-3"
                          />
                          <span className="text-xs font-bold text-foreground">Sobre o Livro</span>
                        </div>
                        <p className="font-serif text-sm leading-relaxed text-muted-foreground">
                          {book.summary || `${book.title} por ${book.author}`}
                        </p>
                      </CardContent>
                    </Card>
                  )}

                  <div className="mt-4 rounded-xl border border-primary/20 bg-primary/5 p-4">
                    <h4 className="mb-2 text-sm font-bold text-primary">Plano de Ação</h4>
                    <p className="mb-4 text-xs leading-relaxed text-muted-foreground">
                      Anote as principais lições deste livro e como aplicá-las na sua vida.
                    </p>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 w-full border-primary/30 text-xs text-primary hover:bg-primary/10"
                    >
                      Criar Notas
                    </Button>
                  </div>

                  {book.tags.length > 0 && (
                    <div className="pt-4">
                      <p className="mb-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                        Tags
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {book.tags.map((tag) => (
                          <Badge
                            key={tag.slug}
                            variant="secondary"
                            className="cursor-pointer text-xs hover:bg-muted"
                            onClick={() => navigate(`/books?category=${tag.slug}`)}
                          >
                            {tag.name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </TabsContent>
              </div>
            </Tabs>

            {/* Sidebar Footer - Navigation */}
            <div className="shrink-0 border-t border-border bg-muted/10 p-4">
              <Button
                variant="outline"
                className="w-full gap-2 text-sm"
                onClick={() => navigate(`/books/${bookSlug}`)}
              >
                <Icon name="arrow-left" size="size-4" />
                Voltar aos Detalhes
              </Button>
            </div>
          </div>

          {/* FLOATING MENU BUTTON (Only visible when sidebar is closed) */}
          {!sidebarOpen && (
            <Button
              variant="outline"
              size="icon"
              className="pointer-events-auto absolute right-6 top-6 h-12 w-12 rounded-full border border-border bg-background text-foreground shadow-lg hover:bg-muted"
              onClick={() => setSidebarOpen(true)}
              title="Abrir menu"
            >
              <Icon name="menu-burger" size="size-5" />
            </Button>
          )}
        </div>,
        document.body
      )}
    </div>
  );
};

export default BookReaderTemplate;

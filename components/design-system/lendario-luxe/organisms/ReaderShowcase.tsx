/**
 * ReaderShowcase - ChapterSplash, TldrBox, ProgressOverlay, and EmptyState demos
 */

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ChapterSplash } from '@/components/books/book-reader/organisms/ChapterSplash';
import { TldrBox } from '@/components/books/book-reader/organisms/TldrBox';
import { EmptyState } from '@/components/books/book-list/organisms/EmptyState';
import type { BookData } from '@/hooks/useBooks';
import { MOCK_BOOK, READER_MODE } from '../data';

// Type assertion for mock data
const book = MOCK_BOOK as unknown as BookData;

// Night mode reader style (for dark backgrounds)
const NIGHT_READER_MODE = {
  bg: '#0A0A0A',
  text: '#D8D8D8',
  textMuted: 'rgba(216, 216, 216, 0.7)',
  textDimmed: 'rgba(255, 255, 255, 0.3)',
  border: 'rgba(255, 255, 255, 0.1)',
  selection: 'selection:bg-primary/20',
  headerBg: 'rgba(10, 10, 10, 0.9)',
  accent: '#C9B298',
  aside: { bg: '#18181B', text: '#FAFAFA' },
  button: { bg: '#FAFAFA', text: '#0A0A0A', hover: '#E4E4E7' },
  texture: 'opacity-[0.05] mix-blend-screen',
};

// Sepia mode reader style (warm tones)
const SEPIA_READER_MODE = {
  bg: '#F5F2E9',
  text: '#3E2C1C',
  textMuted: 'rgba(62, 44, 28, 0.7)',
  textDimmed: 'rgba(62, 44, 28, 0.4)',
  border: 'rgba(62, 44, 28, 0.1)',
  selection: 'selection:bg-[#AC8E68]/40',
  headerBg: 'rgba(232, 226, 210, 0.9)',
  accent: '#8D7556',
  aside: { bg: '#3E2C1C', text: '#F5F2E9' },
  button: { bg: '#3E2C1C', text: '#F5F2E9', hover: '#4A3828' },
  texture: 'opacity-[0.06] mix-blend-multiply',
};

export const ReaderShowcase: React.FC = () => {
  return (
    <>
      {/* ChapterSplash */}
      <section>
        <Card>
          <CardHeader>
            <CardTitle>ChapterSplash</CardTitle>
            <CardDescription>
              <code>components/books/book-reader/organisms/ChapterSplash.tsx</code> — Hero do reader
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <p className="mb-4 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                Night Mode (dark background)
              </p>
              <div className="rounded-2xl border border-border bg-[#0A0A0A] p-8">
                <ChapterSplash
                  book={book}
                  readingTime={{ minutes: 12, words: 2400 }}
                  readingMode="night"
                  currentMode={NIGHT_READER_MODE}
                  isFocusMode={false}
                />
              </div>
            </div>
            <div>
              <p className="mb-4 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                Sepia Mode (warm tones)
              </p>
              <div className="rounded-2xl border border-border bg-[#F5F2E9] p-8">
                <ChapterSplash
                  book={book}
                  readingTime={{ minutes: 12, words: 2400 }}
                  readingMode="sepia"
                  currentMode={SEPIA_READER_MODE}
                  isFocusMode={false}
                />
              </div>
            </div>
            <div>
              <p className="mb-4 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                Paper Mode (light background)
              </p>
              <div className="rounded-2xl border border-border bg-[#FDFCFB] p-8">
                <ChapterSplash
                  book={book}
                  readingTime={{ minutes: 12, words: 2400 }}
                  readingMode="paper"
                  currentMode={READER_MODE}
                  isFocusMode={false}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* TldrBox */}
      <section>
        <Card>
          <CardHeader>
            <CardTitle>TldrBox</CardTitle>
            <CardDescription>
              <code>components/books/book-reader/organisms/TldrBox.tsx</code> — Resumo rápido no reader
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-6 md:grid-cols-3">
              <div>
                <p className="mb-4 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                  Night Mode
                </p>
                <div className="rounded-2xl bg-[#0A0A0A] p-4">
                  <TldrBox
                    summary="Hábitos atômicos são pequenas mudanças que geram resultados extraordinários."
                    readingMode="night"
                    currentMode={NIGHT_READER_MODE}
                  />
                </div>
              </div>
              <div>
                <p className="mb-4 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                  Sepia Mode
                </p>
                <div className="rounded-2xl bg-[#F5F2E9] p-4">
                  <TldrBox
                    summary="Hábitos atômicos são pequenas mudanças que geram resultados extraordinários."
                    readingMode="sepia"
                    currentMode={SEPIA_READER_MODE}
                  />
                </div>
              </div>
              <div>
                <p className="mb-4 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                  Paper Mode
                </p>
                <div className="rounded-2xl bg-[#FDFCFB] p-4">
                  <TldrBox
                    summary="Hábitos atômicos são pequenas mudanças que geram resultados extraordinários."
                    readingMode="paper"
                    currentMode={READER_MODE}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* ProgressOverlay */}
      <section>
        <Card>
          <CardHeader>
            <CardTitle>ProgressOverlay</CardTitle>
            <CardDescription>
              <code>components/books/book-reader/organisms/ProgressOverlay.tsx</code> — Barra de progresso com glow
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative h-20 rounded-2xl border border-border bg-muted/20">
              <div className="absolute inset-x-0 top-0">
                <div className="h-[2px] bg-border/10">
                  <div
                    className="h-full bg-primary shadow-[0_0_15px_rgba(var(--primary),0.6)] transition-all duration-300"
                    style={{ width: '65%' }}
                  />
                </div>
              </div>
              <div className="absolute bottom-4 right-4 rounded-full bg-muted/50 px-3 py-1.5 backdrop-blur-xl">
                <span className="font-mono text-[10px] font-black tracking-wider text-muted-foreground">
                  65%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* EmptyState */}
      <section>
        <Card>
          <CardHeader>
            <CardTitle>EmptyState</CardTitle>
            <CardDescription>
              <code>components/books/book-list/organisms/EmptyState.tsx</code> — Estado vazio
            </CardDescription>
          </CardHeader>
          <CardContent>
            <EmptyState hasFilters={false} onCreate={() => {}} />
          </CardContent>
        </Card>
      </section>
    </>
  );
};

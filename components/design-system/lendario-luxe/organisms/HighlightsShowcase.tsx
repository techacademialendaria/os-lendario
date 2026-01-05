/**
 * HighlightsShowcase - HighlightCard, NoteEditor
 * Note: ShareImageModal requires html2canvas which may not work in showcase
 */

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import HighlightCard from '@/components/books/highlights/HighlightCard';
import NoteEditor from '@/components/books/highlights/NoteEditor';
import { MOCK_HIGHLIGHTS, MOCK_BOOK } from '../data';

export const HighlightsShowcase: React.FC = () => {
  const [noteValue, setNoteValue] = useState('');

  const handleSaveNote = async (note: string) => {
    setNoteValue(note);
    // In real app, this would save to DB
  };

  return (
    <>
      {/* HighlightCard */}
      <section>
        <Card>
          <CardHeader>
            <CardTitle>HighlightCard</CardTitle>
            <CardDescription>
              <code>components/books/highlights/HighlightCard.tsx</code> — Card de destaque com ações
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {MOCK_HIGHLIGHTS.map((highlight) => (
              <HighlightCard
                key={highlight.id}
                highlight={highlight}
                bookTitle={MOCK_BOOK.title}
                bookAuthor={MOCK_BOOK.author}
                bookCover={MOCK_BOOK.coverUrl || undefined}
                onCopy={() => {}}
                onDelete={() => {}}
                onUpdateNote={async () => {}}
              />
            ))}
          </CardContent>
        </Card>
      </section>

      {/* NoteEditor */}
      <section>
        <Card>
          <CardHeader>
            <CardTitle>NoteEditor</CardTitle>
            <CardDescription>
              <code>components/books/highlights/NoteEditor.tsx</code> — Editor inline de notas
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <p className="mb-4 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                Criando nova nota
              </p>
              <div className="max-w-md rounded-lg border border-border bg-muted/20 p-4">
                <NoteEditor
                  initialNote=""
                  onSave={handleSaveNote}
                  onCancel={() => {}}
                />
              </div>
            </div>
            <div>
              <p className="mb-4 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                Editando nota existente
              </p>
              <div className="max-w-md rounded-lg border border-border bg-muted/20 p-4">
                <NoteEditor
                  initialNote="Esta é uma reflexão importante sobre o conceito apresentado."
                  onSave={handleSaveNote}
                  onCancel={() => {}}
                />
              </div>
            </div>
            {noteValue && (
              <p className="text-sm text-muted-foreground">
                Última nota salva: <span className="font-medium text-foreground">{noteValue}</span>
              </p>
            )}
          </CardContent>
        </Card>
      </section>
    </>
  );
};


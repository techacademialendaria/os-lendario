import React, { useState } from 'react';
import { Icon } from '../../ui/icon';
import { Button } from '../../ui/button';
import { Card, CardContent } from '../../ui/card';
import { Highlight } from '../../../hooks/useHighlights';
import { formatHighlightDate } from '../utils';
import NoteEditor from './NoteEditor';
import ShareImageModal from './ShareImageModal';

/**
 * HighlightCard - Display a single highlight with actions
 *
 * Extracted from: BookHighlightsTemplate.tsx
 * Features:
 * - Edit notes inline
 * - Share as image
 * - Copy/Delete actions
 */

interface HighlightCardProps {
  highlight: Highlight;
  bookTitle: string;
  bookAuthor: string;
  bookCover?: string;
  onCopy: (text: string) => void;
  onDelete: (id: string) => void;
  onUpdateNote: (id: string, note: string) => Promise<void>;
}

const HighlightCard: React.FC<HighlightCardProps> = ({
  highlight,
  bookTitle,
  bookAuthor,
  bookCover,
  onCopy,
  onDelete,
  onUpdateNote,
}) => {
  const [isEditingNote, setIsEditingNote] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const handleSaveNote = async (note: string) => {
    await onUpdateNote(highlight.id, note);
    setIsEditingNote(false);
  };

  return (
    <>
      <Card className="group relative border-none bg-muted/20 shadow-none transition-colors hover:bg-muted/30">
        {/* Left Accent Bar */}
        <div className="absolute bottom-0 left-0 top-0 w-1 bg-border/40 transition-colors group-hover:bg-primary" />

        <CardContent className="p-6 pr-8">
          {/* Share Button - Always Visible */}
          <div className="mb-4 flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              Destaque
            </span>
            <Button
              variant="outline"
              size="sm"
              className="h-8 gap-2 rounded-full border-brand-gold/30 bg-brand-gold/10 px-4 text-xs font-bold text-brand-gold hover:bg-brand-gold/20 hover:text-brand-gold"
              onClick={() => setIsShareModalOpen(true)}
            >
              <Icon name="share" size="size-3" />
              Compartilhar
            </Button>
          </div>

          <p className="font-serif text-lg leading-relaxed text-foreground/80">
            "{highlight.text}"
          </p>

          {/* Note Display (when not editing) */}
          {highlight.note && !isEditingNote && (
            <p className="mt-4 border-l-2 border-primary/30 pl-4 font-serif text-sm italic text-muted-foreground">
              {highlight.note}
            </p>
          )}

          {/* Chapter & Date */}
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1">
            {highlight.chapter && (
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                — {highlight.chapter}
              </p>
            )}
            <p className="text-xs text-muted-foreground">
              Destacado em: {formatHighlightDate(highlight.createdAt)}
            </p>
          </div>

          {/* Notes Section */}
          <div className="mt-4 border-t border-border/20 pt-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-foreground">Suas Notas</span>
              {!isEditingNote && (
                <button
                  onClick={() => setIsEditingNote(true)}
                  className="text-sm font-medium italic text-primary hover:text-primary/80"
                >
                  {highlight.note ? 'Editar nota' : 'Adicionar nota'}
                </button>
              )}
            </div>

            {isEditingNote ? (
              <NoteEditor
                initialNote={highlight.note || ''}
                onSave={handleSaveNote}
                onCancel={() => setIsEditingNote(false)}
              />
            ) : highlight.note ? null : (
              <p className="mt-2 text-sm italic text-muted-foreground/60">
                Nenhuma nota adicionada
              </p>
            )}
          </div>

          {/* Secondary Actions - Hidden until hover */}
          <div className="mt-4 flex justify-end gap-2 opacity-100 sm:opacity-0 transition-opacity sm:group-hover:opacity-100">
            <button
              onClick={() => onCopy(highlight.text)}
              className="flex h-10 w-10 sm:h-8 sm:w-8 items-center justify-center rounded-full border border-transparent text-muted-foreground transition-all hover:border-border hover:bg-background hover:text-primary"
              title="Copiar texto"
            >
              <Icon name="copy" size="size-4" />
            </button>
            <button
              onClick={() => onDelete(highlight.id)}
              className="flex h-10 w-10 sm:h-8 sm:w-8 items-center justify-center rounded-full border border-transparent text-muted-foreground transition-all hover:border-destructive/30 hover:bg-destructive/10 hover:text-destructive"
              title="Remover destaque"
            >
              <Icon name="trash" size="size-4" />
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Share Modal */}
      <ShareImageModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        highlight={{ text: highlight.text, note: highlight.note }}
        bookTitle={bookTitle}
        bookAuthor={bookAuthor}
        bookCover={bookCover}
      />
    </>
  );
};

export default HighlightCard;

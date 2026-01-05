import React, { useState } from 'react';
import { Button } from '../../ui/button';

/**
 * NoteEditor - Inline editor for highlight notes
 *
 * Extracted from: BookHighlightsTemplate.tsx
 * Used by: HighlightCard
 */

interface NoteEditorProps {
  initialNote: string;
  onSave: (note: string) => Promise<void>;
  onCancel: () => void;
}

const NoteEditor: React.FC<NoteEditorProps> = ({ initialNote, onSave, onCancel }) => {
  const [note, setNote] = useState(initialNote);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSave(note);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="mt-4 space-y-3">
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Adicione sua nota sobre este trecho..."
        className="w-full resize-none rounded-lg border border-border/50 bg-background/50 p-3 font-serif text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        rows={3}
        autoFocus
      />
      <div className="flex justify-end gap-2">
        <Button variant="ghost" size="sm" onClick={onCancel} disabled={isSaving}>
          Cancelar
        </Button>
        <Button size="sm" onClick={handleSave} disabled={isSaving}>
          {isSaving ? 'Salvando...' : 'Salvar'}
        </Button>
      </div>
    </div>
  );
};

export default NoteEditor;

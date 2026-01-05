import React, { useRef, useEffect } from 'react';
import { Icon } from '../../ui/icon';
import { Button } from '../../ui/button';
import { cn } from '../../../lib/utils';

// ============================================================================
// Constants
// ============================================================================

export const HIGHLIGHT_COLORS = {
  gold: { bg: 'rgba(230, 179, 37, 0.4)', name: 'Dourado' },
  yellow: { bg: 'rgba(255, 235, 59, 0.4)', name: 'Amarelo' },
  green: { bg: 'rgba(129, 199, 132, 0.4)', name: 'Verde' },
  blue: { bg: 'rgba(100, 181, 246, 0.4)', name: 'Azul' },
  pink: { bg: 'rgba(240, 98, 146, 0.4)', name: 'Rosa' },
} as const;

export type HighlightColor = keyof typeof HIGHLIGHT_COLORS;
export const DEFAULT_HIGHLIGHT_COLOR: HighlightColor = 'gold';

export const getHighlightStyles = (color: HighlightColor = DEFAULT_HIGHLIGHT_COLOR): React.CSSProperties => ({
  backgroundColor: HIGHLIGHT_COLORS[color].bg,
  color: 'inherit',
  borderRadius: '2px',
});

// ============================================================================
// Types
// ============================================================================

type ActionMode = 'toolbar' | 'note' | 'colorPicker';

interface HighlightActionsProps {
  mode: ActionMode;
  selectedColor: HighlightColor;
  noteText: string;
  isSaving: boolean;
  onHighlight: () => void;
  onCopy: () => void;
  onOpenNote: () => void;
  onSaveNote: () => void;
  onCancelNote: () => void;
  onNoteChange: (text: string) => void;
  onColorSelect: (color: HighlightColor) => void;
  onShowColorPicker: () => void;
  onHideColorPicker: () => void;
}

// ============================================================================
// Main Component
// ============================================================================

/**
 * HighlightActions - Action buttons for text selection
 *
 * Modes:
 * - toolbar: Main action buttons (Destacar, Anotar, Copiar)
 * - note: Note input card with save/cancel
 * - colorPicker: Color selection grid
 */
export const HighlightActions: React.FC<HighlightActionsProps> = ({
  mode,
  selectedColor,
  noteText,
  isSaving,
  onHighlight,
  onCopy,
  onOpenNote,
  onSaveNote,
  onCancelNote,
  onNoteChange,
  onColorSelect,
  onShowColorPicker,
  onHideColorPicker,
}) => {
  const noteInputRef = useRef<HTMLTextAreaElement>(null);

  // Focus note input when shown
  useEffect(() => {
    if (mode === 'note' && noteInputRef.current) {
      setTimeout(() => {
        noteInputRef.current?.focus();
      }, 50);
    }
  }, [mode]);

  if (mode === 'note') {
    return (
      <NoteInputCard
        noteText={noteText}
        isSaving={isSaving}
        noteInputRef={noteInputRef}
        onNoteChange={onNoteChange}
        onSave={onSaveNote}
        onCancel={onCancelNote}
      />
    );
  }

  if (mode === 'colorPicker') {
    return (
      <ColorPicker
        selectedColor={selectedColor}
        onColorSelect={onColorSelect}
        onCancel={onHideColorPicker}
      />
    );
  }

  return (
    <MainToolbar
      selectedColor={selectedColor}
      isSaving={isSaving}
      onHighlight={onHighlight}
      onShowColorPicker={onShowColorPicker}
      onOpenNote={onOpenNote}
      onCopy={onCopy}
    />
  );
};

// ============================================================================
// Note Input Card
// ============================================================================

interface NoteInputCardProps {
  noteText: string;
  isSaving: boolean;
  noteInputRef: React.RefObject<HTMLTextAreaElement>;
  onNoteChange: (text: string) => void;
  onSave: () => void;
  onCancel: () => void;
}

const NoteInputCard: React.FC<NoteInputCardProps> = ({
  noteText,
  isSaving,
  noteInputRef,
  onNoteChange,
  onSave,
  onCancel,
}) => (
  <div className="w-80 rounded-2xl border border-white/10 bg-zinc-900/95 p-5 shadow-[0_30px_60px_rgba(0,0,0,0.6)] backdrop-blur-2xl">
    <textarea
      ref={noteInputRef}
      value={noteText}
      onChange={(e) => onNoteChange(e.target.value)}
      placeholder="Adicione uma nota..."
      className="min-h-[100px] w-full resize-none rounded-xl border-none bg-white/5 p-4 font-serif text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-1 focus:ring-primary/50"
      onKeyDown={(e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
          e.preventDefault();
          onSave();
        }
      }}
    />
    <div className="mt-4 flex justify-end gap-3">
      <Button
        size="sm"
        className="h-10 rounded-full bg-primary px-8 text-xs font-black uppercase tracking-widest text-primary-foreground hover:bg-primary/90"
        onClick={onSave}
        disabled={isSaving}
      >
        {isSaving ? 'Salvando...' : 'Salvar'}
      </Button>
      <Button
        size="sm"
        variant="ghost"
        className="h-10 rounded-full px-6 text-xs font-bold text-zinc-500 hover:text-white"
        onClick={onCancel}
        disabled={isSaving}
      >
        Cancelar
      </Button>
    </div>
  </div>
);

// ============================================================================
// Color Picker
// ============================================================================

interface ColorPickerProps {
  selectedColor: HighlightColor;
  onColorSelect: (color: HighlightColor) => void;
  onCancel: () => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({
  selectedColor,
  onColorSelect,
  onCancel,
}) => (
  <div className="rounded-2xl border border-white/10 bg-zinc-900/95 p-3 shadow-[0_30px_60px_rgba(0,0,0,0.6)] backdrop-blur-2xl">
    <div className="mb-2 text-center">
      <span className="text-[8px] font-black uppercase tracking-[0.2em] text-zinc-500">
        Escolha a Cor
      </span>
    </div>
    <div className="flex gap-2">
      {(Object.keys(HIGHLIGHT_COLORS) as HighlightColor[]).map((color) => (
        <button
          key={color}
          onClick={() => onColorSelect(color)}
          className={cn(
            'h-8 w-8 rounded-full border-2 transition-all active:scale-90',
            selectedColor === color
              ? 'border-white scale-110 shadow-lg'
              : 'border-transparent opacity-70 hover:opacity-100 hover:scale-105'
          )}
          style={{ backgroundColor: HIGHLIGHT_COLORS[color].bg.replace('0.4', '0.8') }}
          title={HIGHLIGHT_COLORS[color].name}
        />
      ))}
    </div>
    <button
      onClick={onCancel}
      className="mt-2 w-full text-center text-[8px] font-bold text-zinc-500 hover:text-white"
    >
      Cancelar
    </button>
  </div>
);

// ============================================================================
// Main Toolbar
// ============================================================================

interface MainToolbarProps {
  selectedColor: HighlightColor;
  isSaving: boolean;
  onHighlight: () => void;
  onShowColorPicker: () => void;
  onOpenNote: () => void;
  onCopy: () => void;
}

const MainToolbar: React.FC<MainToolbarProps> = ({
  selectedColor,
  isSaving,
  onHighlight,
  onShowColorPicker,
  onOpenNote,
  onCopy,
}) => (
  <div className="flex items-center rounded-2xl border border-white/10 bg-zinc-900/95 p-1 shadow-[0_30px_60px_rgba(0,0,0,0.6)] backdrop-blur-2xl">
    {/* Highlight with color indicator */}
    <button
      onClick={onHighlight}
      onContextMenu={(e) => {
        e.preventDefault();
        onShowColorPicker();
      }}
      disabled={isSaving}
      className={cn(
        'group flex flex-col items-center gap-1.5 rounded-xl px-5 py-3 transition-all',
        'text-zinc-400 hover:bg-white/5 hover:text-white',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        'active:scale-95'
      )}
      title="Clique para destacar, clique com botão direito para escolher cor"
    >
      <div className="relative">
        <Icon
          name="pencil"
          size="size-4"
          className="transition-colors group-hover:text-primary"
        />
        {/* Color indicator dot */}
        <div
          className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full border border-zinc-800"
          style={{ backgroundColor: HIGHLIGHT_COLORS[selectedColor].bg.replace('0.4', '0.9') }}
        />
      </div>
      <span className="text-[8px] font-black uppercase tracking-[0.2em] text-zinc-500 group-hover:text-white transition-colors">
        Destacar
      </span>
    </button>

    <div className="h-10 w-px bg-white/5" />

    <ToolbarButton
      icon="plus"
      label="Anotar"
      onClick={onOpenNote}
      disabled={isSaving}
    />

    <div className="h-10 w-px bg-white/5" />

    <ToolbarButton
      icon="copy"
      label="Copiar"
      onClick={onCopy}
      disabled={isSaving}
    />
  </div>
);

// ============================================================================
// Toolbar Button
// ============================================================================

interface ToolbarButtonProps {
  icon: string;
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

const ToolbarButton: React.FC<ToolbarButtonProps> = ({ icon, label, onClick, disabled }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={cn(
      'group flex flex-col items-center gap-1.5 rounded-xl px-5 py-3 transition-all',
      'text-zinc-400 hover:bg-white/5 hover:text-white',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      'active:scale-95'
    )}
  >
    <Icon
      name={icon}
      size="size-4"
      className="transition-colors group-hover:text-primary"
    />
    <span className="text-[8px] font-black uppercase tracking-[0.2em] text-zinc-500 group-hover:text-white transition-colors">
      {label}
    </span>
  </button>
);

export default HighlightActions;

import React, { useRef, useCallback } from 'react';
import { SelectionPopover } from '../SelectionPopover';
import { HighlightActions, type HighlightColor } from '../HighlightActions';
import { useTextSelection, useHighlightMark, useToolbarUI } from './hooks';
import type { TextSelectionToolbarProps } from './types';

/**
 * TextSelectionToolbar - Orchestrates text selection and highlight actions
 *
 * Responsibilities:
 * - Selection detection and validation (useTextSelection)
 * - Mark creation/conversion/removal (useHighlightMark)
 * - UI state coordination (useToolbarUI)
 *
 * Lines: ~80 (down from 363)
 */
export const TextSelectionToolbar: React.FC<TextSelectionToolbarProps> = ({
  containerRef,
  onHighlight,
  onCopy,
  disabled = false,
}) => {
  const toolbarRef = useRef<HTMLDivElement>(null);

  // Mark management
  const { highlightMarkRef, createMark, convertToSaved, removeMark } = useHighlightMark();

  // UI state
  const ui = useToolbarUI({
    isVisible: false, // Will be updated by selection
    isSaving: false,
    mode: 'toolbar',
    containerRef,
    toolbarRef,
    onReset: removeMark,
  });

  // Selection detection
  const selection = useTextSelection({
    containerRef,
    disabled,
    mode: ui.mode,
    toolbarRef,
    onReset: () => {
      removeMark();
      ui.resetUI();
    },
  });

  // Action handlers
  const handleHighlight = useCallback(async () => {
    if (!selection.state.selectedText || !selection.savedRangeRef.current) return;

    const markCreated = createMark(selection.savedRangeRef.current, ui.selectedColor);

    ui.setIsSaving(true);
    try {
      const highlightId = await onHighlight(selection.state.selectedText);
      if (highlightId) {
        if (markCreated) convertToSaved(highlightId);
        selection.resetKeepMark();
        ui.resetUI();
        highlightMarkRef.current = null;
      } else {
        removeMark();
        selection.reset();
      }
    } catch (error) {
      console.error('Failed to highlight:', error);
      removeMark();
      selection.reset();
    } finally {
      ui.setIsSaving(false);
    }
  }, [selection, ui, createMark, convertToSaved, removeMark, onHighlight, highlightMarkRef]);

  const handleCopy = useCallback(() => {
    if (!selection.state.selectedText) return;
    navigator.clipboard.writeText(selection.state.selectedText);
    onCopy?.(selection.state.selectedText);
    window.getSelection()?.removeAllRanges();
    selection.reset();
  }, [selection, onCopy]);

  const handleOpenNote = useCallback(() => {
    if (!selection.savedRangeRef.current) return;
    createMark(selection.savedRangeRef.current, ui.selectedColor);
    ui.setMode('note');
  }, [selection.savedRangeRef, createMark, ui]);

  const handleSaveNote = useCallback(async () => {
    if (!selection.state.selectedText) return;

    ui.setIsSaving(true);
    try {
      const highlightId = await onHighlight(selection.state.selectedText, ui.noteText || undefined);
      if (highlightId) {
        convertToSaved(highlightId);
        selection.resetKeepMark();
        ui.resetUI();
        highlightMarkRef.current = null;
      } else {
        removeMark();
        selection.reset();
      }
    } catch (error) {
      console.error('Failed to save note:', error);
      removeMark();
      selection.reset();
    } finally {
      ui.setIsSaving(false);
    }
  }, [selection, ui, onHighlight, convertToSaved, removeMark, highlightMarkRef]);

  const handleCancelNote = useCallback(() => {
    removeMark();
    ui.setMode('toolbar');
    ui.setNoteText('');
  }, [removeMark, ui]);

  const handleColorSelect = useCallback(
    (color: HighlightColor) => {
      ui.setSelectedColor(color);
      ui.setMode('toolbar');
      if (selection.savedRangeRef.current) {
        const markCreated = createMark(selection.savedRangeRef.current, color);
        if (markCreated) {
          handleHighlight();
        }
      }
    },
    [ui, selection.savedRangeRef, createMark, handleHighlight]
  );

  if (!selection.state.isVisible) return null;

  return (
    <div ref={toolbarRef}>
      <SelectionPopover position={selection.state.position} showArrow={ui.mode === 'toolbar'}>
        <HighlightActions
          mode={ui.mode}
          selectedColor={ui.selectedColor}
          noteText={ui.noteText}
          isSaving={ui.isSaving}
          onHighlight={handleHighlight}
          onCopy={handleCopy}
          onOpenNote={handleOpenNote}
          onSaveNote={handleSaveNote}
          onCancelNote={handleCancelNote}
          onNoteChange={ui.setNoteText}
          onColorSelect={handleColorSelect}
          onShowColorPicker={() => ui.setMode('colorPicker')}
          onHideColorPicker={() => ui.setMode('toolbar')}
        />
      </SelectionPopover>
    </div>
  );
};

export default TextSelectionToolbar;

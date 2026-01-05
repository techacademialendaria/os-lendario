import React from 'react';
import type { PainPointEditorProps } from './types';
import { usePainPointEditor } from './hooks';
import { EditorHeader, AiSuggestionPanel, PainPointsList } from './organisms';

export const PainPointEditor: React.FC<PainPointEditorProps> = ({
  personaId: _personaId,
  personaName = 'Persona',
  initialPainPoints = [],
  onBack,
  onSave,
}) => {
  const editor = usePainPointEditor({ initialPainPoints, onSave });

  return (
    <div className="flex h-full w-full flex-col">
      <EditorHeader
        personaName={personaName}
        isSaving={editor.isSaving}
        onBack={onBack}
        onSave={editor.handleSave}
        onAiSuggest={editor.handleAiSuggest}
      />

      <div className="relative flex-1 overflow-y-auto p-6 lg:p-8">
        <div className="mx-auto flex max-w-4xl flex-col gap-8 pb-32">
          {/* Title Section */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <div className="size-2 rounded-full bg-studio-accent shadow-[0_0_8px_rgba(242,208,13,0.8)]" />
              <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                Definicao de Dor e Necessidade
              </h2>
            </div>
            <p className="max-w-2xl pl-5 text-base text-muted-foreground">
              Ajuste os detalhes psicograficos do seu cliente ideal. Nossa IA analisa padroes de
              busca para sugerir melhorias em tempo real.
            </p>
          </div>

          {/* AI Suggestion Panel */}
          {editor.showAiSuggestion && (
            <AiSuggestionPanel
              onClose={() => editor.setShowAiSuggestion(false)}
              onAddSuggested={() => {
                editor.setIsAdding(true);
                editor.setShowAiSuggestion(false);
              }}
            />
          )}

          {/* Pain Points List */}
          <PainPointsList
            painPoints={editor.painPoints}
            editingId={editor.editingId}
            isAdding={editor.isAdding}
            onSetEditingId={editor.setEditingId}
            onUpdatePainPoint={editor.handleUpdatePainPoint}
            onDeletePainPoint={editor.handleDeletePainPoint}
            onSetIsAdding={editor.setIsAdding}
            newPainPoint={editor.newPainPoint}
            onNewPainPointChange={editor.setNewPainPoint}
            onAddPainPoint={editor.handleAddPainPoint}
          />
        </div>
      </div>
    </div>
  );
};

export default PainPointEditor;

// @ts-nocheck
import React from 'react';
import { Input } from '../../../../ui/input';
import { ScrollArea } from '../../../../ui/scroll-area';
import { TiptapEditor } from '../../../ui';
import LessonExercisesTab from '../../LessonExercisesTab';
import LessonMediaTab from '../../LessonMediaTab';
import LessonSettingsTab from '../../LessonSettingsTab';
import type { EditorTab } from '../types';
import type { Lesson } from '../../../../../hooks/useLesson';

interface LessonEditorContentProps {
  activeTab: EditorTab;
  title: string;
  onTitleChange: (title: string) => void;
  script: string;
  onScriptChange: (script: string) => void;
  videoUrl: string | null;
  onVideoUrlChange: (url: string | null) => void;
  lesson: Lesson;
}

export const LessonEditorContent: React.FC<LessonEditorContentProps> = ({
  activeTab,
  title,
  onTitleChange,
  script,
  onScriptChange,
  videoUrl,
  onVideoUrlChange,
  lesson,
}) => {
  return (
    <ScrollArea className="flex-1">
      <div className="mx-auto max-w-4xl p-8">
        {/* ROTEIRO TAB */}
        {activeTab === 'script' && (
          <div className="space-y-6">
            {/* Title */}
            <Input
              value={title}
              onChange={(e) => onTitleChange(e.target.value)}
              className="h-auto border-none bg-transparent px-0 text-3xl font-bold shadow-none placeholder:text-muted-foreground/40 focus-visible:ring-0"
              placeholder="Titulo da Aula"
            />

            {/* Main Editor */}
            <TiptapEditor
              content={script}
              onChange={onScriptChange}
              placeholder="Comece a escrever o roteiro da sua aula..."
            />
          </div>
        )}

        {/* MIDIA TAB */}
        {activeTab === 'media' && (
          <LessonMediaTab videoUrl={videoUrl} onVideoUrlChange={onVideoUrlChange} />
        )}

        {/* EXERCICIOS TAB */}
        {activeTab === 'exercises' && <LessonExercisesTab />}

        {/* CONFIGURACOES TAB */}
        {activeTab === 'settings' && <LessonSettingsTab lesson={lesson} />}
      </div>
    </ScrollArea>
  );
};

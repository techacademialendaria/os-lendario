/**
 * LessonEditorTemplate - Orchestrator Component
 *
 * Refactored from 566 lines to ~50 lines.
 * Following Atomic Design pattern with hooks for state management.
 */

import React from 'react';
import type { LessonEditorProps } from './types';

// Hooks
import { useLessonEditorState, useLessonContent } from './hooks';

// Organisms
import { EditorHeader, EditorSidebar, EditorContent } from './organisms';

// Data
import { MOCK_MODULES, MOCK_AI_AUDIT } from './data';

const LessonEditorTemplate: React.FC<LessonEditorProps> = ({
  onBack,
  courseSlug = 'curso-exemplo',
  lessonId = '1.1',
}) => {
  // UI state hook
  const {
    activeTab,
    setActiveTab,
    sidebarCollapsed,
    setSidebarCollapsed,
    sidebarTab,
    setSidebarTab,
  } = useLessonEditorState();

  // Content state hook
  const { title, setTitle, script, setScript, status, setStatus } = useLessonContent();

  return (
    <div className="flex h-screen animate-fade-in flex-col bg-background">
      <EditorHeader
        lessonId={lessonId}
        status={status}
        onBack={onBack}
        onStatusChange={setStatus}
      />

      <div className="flex flex-1 overflow-hidden">
        <EditorSidebar
          collapsed={sidebarCollapsed}
          activeTab={sidebarTab}
          modules={MOCK_MODULES}
          aiAudit={MOCK_AI_AUDIT}
          onCollapsedChange={setSidebarCollapsed}
          onTabChange={setSidebarTab}
        />

        <EditorContent
          title={title}
          script={script}
          activeTab={activeTab}
          onTitleChange={setTitle}
          onScriptChange={setScript}
          onActiveTabChange={setActiveTab}
        />
      </div>
    </div>
  );
};

export default LessonEditorTemplate;

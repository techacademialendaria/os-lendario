import { useState, useMemo } from 'react';
import type { Module, Lesson, LessonType, StatusIconInfo } from '../types';
import { initialModules } from '../data';

export function useCurriculumState() {
  const [modules, setModules] = useState<Module[]>(initialModules);
  const [isAddModuleOpen, setIsAddModuleOpen] = useState(false);
  const [isAddLessonOpen, setIsAddLessonOpen] = useState(false);
  const [selectedModuleId, setSelectedModuleId] = useState<number | null>(null);
  const [newModuleTitle, setNewModuleTitle] = useState('');
  const [newModuleDescription, setNewModuleDescription] = useState('');
  const [newLessonTitle, setNewLessonTitle] = useState('');
  const [newLessonDuration, setNewLessonDuration] = useState('');
  const [newLessonType, setNewLessonType] = useState<LessonType>('video');

  // Statistics
  const stats = useMemo(() => {
    const totalLessons = modules.reduce((acc, mod) => acc + mod.lessons.length, 0);
    const completedLessons = modules.reduce(
      (acc, mod) => acc + mod.lessons.filter((l) => l.status === 'completed').length,
      0
    );
    const totalDuration = modules.reduce((acc, mod) => {
      return (
        acc +
        mod.lessons.reduce((lacc, l) => {
          const mins = parseInt(l.duration) || 0;
          return lacc + mins;
        }, 0)
      );
    }, 0);

    return { totalLessons, completedLessons, totalDuration };
  }, [modules]);

  const toggleModule = (moduleId: number) => {
    setModules((prev) =>
      prev.map((mod) => (mod.id === moduleId ? { ...mod, isExpanded: !mod.isExpanded } : mod))
    );
  };

  const handleAddModule = () => {
    if (!newModuleTitle) return;
    const newModule: Module = {
      id: Date.now(),
      title: newModuleTitle,
      description: newModuleDescription,
      lessons: [],
      isExpanded: true,
    };
    setModules((prev) => [...prev, newModule]);
    setNewModuleTitle('');
    setNewModuleDescription('');
    setIsAddModuleOpen(false);
  };

  const handleAddLesson = () => {
    if (!newLessonTitle || !selectedModuleId) return;
    const moduleIndex = modules.findIndex((m) => m.id === selectedModuleId);
    if (moduleIndex === -1) return;

    const lessonCount = modules[moduleIndex].lessons.length;
    const newLesson: Lesson = {
      id: `${selectedModuleId}.${lessonCount + 1}`,
      title: newLessonTitle,
      duration: newLessonDuration || '10 min',
      type: newLessonType,
      status: 'draft',
    };

    setModules((prev) =>
      prev.map((mod) =>
        mod.id === selectedModuleId ? { ...mod, lessons: [...mod.lessons, newLesson] } : mod
      )
    );

    setNewLessonTitle('');
    setNewLessonDuration('');
    setNewLessonType('video');
    setIsAddLessonOpen(false);
    setSelectedModuleId(null);
  };

  const deleteModule = (moduleId: number) => {
    setModules((prev) => prev.filter((mod) => mod.id !== moduleId));
  };

  const deleteLesson = (moduleId: number, lessonId: string) => {
    setModules((prev) =>
      prev.map((mod) =>
        mod.id === moduleId
          ? { ...mod, lessons: mod.lessons.filter((l) => l.id !== lessonId) }
          : mod
      )
    );
  };

  const openAddLessonSheet = (moduleId: number) => {
    setSelectedModuleId(moduleId);
    setIsAddLessonOpen(true);
  };

  return {
    // State
    modules,
    stats,
    // Add Module State
    isAddModuleOpen,
    newModuleTitle,
    newModuleDescription,
    // Add Lesson State
    isAddLessonOpen,
    newLessonTitle,
    newLessonDuration,
    newLessonType,
    // Setters
    setIsAddModuleOpen,
    setNewModuleTitle,
    setNewModuleDescription,
    setIsAddLessonOpen,
    setNewLessonTitle,
    setNewLessonDuration,
    setNewLessonType,
    // Actions
    toggleModule,
    handleAddModule,
    handleAddLesson,
    deleteModule,
    deleteLesson,
    openAddLessonSheet,
  };
}

// Helper functions
export function getStatusIcon(status: Lesson['status']): StatusIconInfo {
  switch (status) {
    case 'completed':
      return { icon: 'check-circle', color: 'text-success' };
    case 'in_progress':
      return { icon: 'clock', color: 'text-brand-yellow' };
    default:
      return { icon: 'circle', color: 'text-muted-foreground/30' };
  }
}

export function getTypeIcon(type: Lesson['type']): string {
  switch (type) {
    case 'video':
      return 'video';
    case 'text':
      return 'document';
    case 'quiz':
      return 'question';
    case 'practice':
      return 'laptop-code';
    default:
      return 'document';
  }
}

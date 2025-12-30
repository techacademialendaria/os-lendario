import { Routes, Route, Navigate } from 'react-router-dom';
import LmsCourseGridTemplate from './templates/LmsCourseGridTemplate';
import LmsCourseDetailTemplate from './templates/LmsCourseDetailTemplate';
import LmsStudentTemplate from './templates/LmsStudentTemplate';

export default function LmsRouter() {
  return (
    <Routes>
      {/* Course Grid - Home */}
      <Route index element={<LmsCourseGridTemplate />} />

      {/* Course Detail */}
      <Route path="cursos/:slug" element={<LmsCourseDetailTemplate />} />

      {/* Lesson Player */}
      <Route path="cursos/:slug/aula/:lessonId" element={<LmsStudentTemplate />} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/lms" replace />} />
    </Routes>
  );
}

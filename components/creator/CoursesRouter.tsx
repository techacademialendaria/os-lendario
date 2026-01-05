import React from 'react';
import { Routes, Route, useNavigate, useParams, Navigate } from 'react-router-dom';
import { Section } from '../../types';

// Import course views
import { CoursesTemplate } from './courses';
import { CourseOverview } from './course-overview';
import CourseBrief from './views/CourseBrief';
import CourseResearch from './views/CourseResearch';
import CourseCurriculum from './course-curriculum';
import CourseLessons from './views/CourseLessons';
import CourseLesson from './views/course-lesson';
import CourseValidation from './views/CourseValidation';
import CourseNew from './views/CourseNew';

interface CoursesRouterProps {
  setSection: (s: Section) => void;
}

const CoursesRouter: React.FC<CoursesRouterProps> = ({ setSection }) => {
  return (
    <Routes>
      {/* List all courses */}
      <Route path="/" element={<CoursesTemplate setSection={setSection} />} />

      {/* Create new course */}
      <Route path="/novo" element={<CourseNew setSection={setSection} />} />

      {/* Course detail routes */}
      <Route path="/:slug" element={<CourseOverview setSection={setSection} />} />
      <Route path="/:slug/brief" element={<CourseBrief setSection={setSection} />} />
      <Route path="/:slug/research" element={<CourseResearch setSection={setSection} />} />
      <Route path="/:slug/curriculo" element={<CourseCurriculum setSection={setSection} />} />
      {/* CourseLessons mantido para busca flat - útil em cursos grandes */}
      <Route path="/:slug/licoes" element={<CourseLessons setSection={setSection} />} />
      <Route path="/:slug/licoes/:lessonId" element={<CourseLesson setSection={setSection} />} />
      <Route path="/:slug/validacao" element={<CourseValidation setSection={setSection} />} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/creator/cursos" replace />} />
    </Routes>
  );
};

export default CoursesRouter;

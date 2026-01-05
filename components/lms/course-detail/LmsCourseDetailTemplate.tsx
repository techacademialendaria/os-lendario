import { useNavigate, useParams } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { resources, studentsList } from './data';
import { useCourseData } from './hooks';
import {
  LoadingSkeleton,
  CourseHeader,
  CourseProgressCard,
  CourseContentTab,
  ResourcesTab,
  StudentsTab,
  CourseSidebar,
} from './organisms';
import type { LessonStatus } from './types';

const tabTriggerClass =
  'rounded-none border-b-2 border-transparent bg-transparent px-0 pb-3 text-base font-bold text-muted-foreground transition-all data-[state=active]:border-primary data-[state=active]:text-foreground';

export default function LmsCourseDetailTemplate() {
  const navigate = useNavigate();
  const { slug } = useParams();
  const { course, loading, firstAvailableLesson } = useCourseData(slug);

  const goToPlayer = (lessonId: string) => navigate(`/lms/cursos/${slug}/aula/${lessonId}`);
  const handleLessonClick = (lessonId: string, status: LessonStatus) => {
    if (status !== 'locked') goToPlayer(lessonId);
  };

  if (loading) return <LoadingSkeleton />;

  return (
    <div className="min-h-screen animate-fade-in bg-background pb-20 font-sans text-foreground">
      <CourseHeader course={course} onBack={() => navigate('/lms')} />
      <main className="container mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="space-y-8 lg:col-span-8">
            <CourseProgressCard
              course={course}
              onContinue={() => firstAvailableLesson && goToPlayer(firstAvailableLesson.id)}
              disabled={!firstAvailableLesson}
            />
            <Tabs defaultValue="content" className="mt-8 w-full">
              <TabsList className="mb-6 w-full justify-start gap-6 overflow-x-auto border-b border-border bg-transparent p-0">
                <TabsTrigger value="content" className={tabTriggerClass}>
                  Conteudo do Curso
                </TabsTrigger>
                <TabsTrigger value="resources" className={tabTriggerClass}>
                  Recursos ({resources.length})
                </TabsTrigger>
                <TabsTrigger value="students" className={tabTriggerClass}>
                  Alunos ({course.students})
                </TabsTrigger>
              </TabsList>
              <TabsContent value="content" className="animate-fade-in space-y-6">
                <CourseContentTab modules={course.modules} onLessonClick={handleLessonClick} />
              </TabsContent>
              <TabsContent value="resources" className="animate-fade-in space-y-6">
                <ResourcesTab resources={resources} />
              </TabsContent>
              <TabsContent value="students" className="animate-fade-in space-y-6">
                <StudentsTab students={studentsList} totalStudents={course.students} />
              </TabsContent>
            </Tabs>
          </div>
          <CourseSidebar
            course={course}
            onPlay={() => firstAvailableLesson && goToPlayer(firstAvailableLesson.id)}
          />
        </div>
      </main>
    </div>
  );
}

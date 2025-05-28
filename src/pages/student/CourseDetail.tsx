
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useStudent } from '@/context/StudentContext';
import { useStudentAuth } from '@/hooks/useStudentAuth';
import { 
  ChevronLeft, 
  Play, 
  Check, 
  Lock,
  BookOpen,
  Clock,
  User
} from 'lucide-react';
import StudentLayout from '@/components/student/StudentLayout';
import VideoPlayer from '@/components/student/VideoPlayer';

const CourseDetail = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const { state } = useStudent();
  const { markLessonCompleted } = useStudentAuth();
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null);

  const course = state.courses.find(c => c.id === courseId);
  const courseProgress = state.progress[courseId || ''];
  const completedLessons = courseProgress?.completedLessons || [];

  useEffect(() => {
    if (course && !selectedLesson) {
      // Start with the first lesson or last accessed lesson
      const lastAccessed = courseProgress?.lastAccessedLesson;
      if (lastAccessed) {
        setSelectedLesson(lastAccessed);
      } else {
        setSelectedLesson(course.modules[0]?.lessons[0]?.id);
      }
    }
  }, [course, courseProgress, selectedLesson]);

  if (!course) {
    return (
      <StudentLayout>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Curso não encontrado</h1>
          <Link to="/aluno/cursos">
            <Button>Voltar aos Cursos</Button>
          </Link>
        </div>
      </StudentLayout>
    );
  }

  const currentLesson = course.modules
    .flatMap(module => module.lessons)
    .find(lesson => lesson.id === selectedLesson);

  const allLessons = course.modules.flatMap(module => module.lessons);
  const currentLessonIndex = allLessons.findIndex(lesson => lesson.id === selectedLesson);
  const hasNext = currentLessonIndex < allLessons.length - 1;
  const hasPrevious = currentLessonIndex > 0;

  const handleMarkComplete = () => {
    if (courseId && selectedLesson) {
      markLessonCompleted(courseId, selectedLesson);
    }
  };

  const handleNext = () => {
    if (hasNext) {
      setSelectedLesson(allLessons[currentLessonIndex + 1].id);
    }
  };

  const handlePrevious = () => {
    if (hasPrevious) {
      setSelectedLesson(allLessons[currentLessonIndex - 1].id);
    }
  };

  const progressPercentage = courseProgress?.progressPercentage || 0;

  return (
    <StudentLayout>
      <div className="space-y-6">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Link to="/aluno/cursos" className="hover:text-blue-900">
            Meus Cursos
          </Link>
          <ChevronLeft className="h-4 w-4 rotate-180" />
          <span className="font-medium text-gray-900">{course.title}</span>
        </div>

        {/* Course Header */}
        <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white p-6 rounded-lg">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h1 className="text-2xl font-bold mb-2">{course.title}</h1>
              <p className="text-blue-100 mb-4">{course.description}</p>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-1">
                  <User className="h-4 w-4" />
                  <span>{course.instructor}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{course.duration}</span>
                </div>
                <Badge variant="secondary">{course.level}</Badge>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">{progressPercentage}%</div>
              <div className="text-blue-100">Concluído</div>
            </div>
          </div>
          <div className="mt-4">
            <Progress value={progressPercentage} className="h-2 bg-blue-800" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Course Content */}
          <div className="lg:col-span-3">
            {currentLesson ? (
              <VideoPlayer
                lesson={currentLesson}
                isCompleted={completedLessons.includes(currentLesson.id)}
                onMarkComplete={handleMarkComplete}
                onNext={hasNext ? handleNext : undefined}
                onPrevious={hasPrevious ? handlePrevious : undefined}
                hasNext={hasNext}
                hasPrevious={hasPrevious}
              />
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Selecione uma aula
                  </h3>
                  <p className="text-gray-600">
                    Escolha uma aula na lista ao lado para começar
                  </p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Course Modules Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Módulos do Curso</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {course.modules.map((module) => (
                  <div key={module.id} className="space-y-2">
                    <h4 className="font-semibold text-gray-900 text-sm">
                      {module.title}
                    </h4>
                    <div className="space-y-1">
                      {module.lessons.map((lesson) => {
                        const isCompleted = completedLessons.includes(lesson.id);
                        const isSelected = selectedLesson === lesson.id;
                        
                        return (
                          <button
                            key={lesson.id}
                            onClick={() => setSelectedLesson(lesson.id)}
                            className={`w-full text-left p-3 rounded-lg border transition-colors ${
                              isSelected
                                ? 'bg-blue-50 border-blue-200'
                                : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                            }`}
                          >
                            <div className="flex items-center space-x-2">
                              {isCompleted ? (
                                <Check className="h-4 w-4 text-green-600" />
                              ) : (
                                <Play className="h-4 w-4 text-gray-400" />
                              )}
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate">
                                  {lesson.title}
                                </p>
                                <p className="text-xs text-gray-600">
                                  {lesson.duration}
                                </p>
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </StudentLayout>
  );
};

export default CourseDetail;

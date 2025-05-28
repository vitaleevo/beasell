import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useStudent } from '@/context/StudentContext';
import StudentLayout from '@/components/student/StudentLayout';
import CourseSearch, { SearchFilters } from '@/components/student/CourseSearch';
import { 
  Play, 
  Clock, 
  BookOpen, 
  Award,
  User,
  BarChart3,
  Heart,
  Star,
  Filter,
  Grid,
  List
} from 'lucide-react';

const StudentCourses = () => {
  const { state } = useStudent();
  const { enrolledCourses, progress, courses } = state;
  const [filteredCourses, setFilteredCourses] = useState(enrolledCourses);
  const [viewMode, setViewMode<'grid' | 'list'>('grid');
  const [sortBy, setSortBy<'recent' | 'progress' | 'name'>('recent');

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Iniciante': return 'bg-green-100 text-green-800';
      case 'Intermediário': return 'bg-yellow-100 text-yellow-800';
      case 'Avançado': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleSearch = (filters: SearchFilters) => {
    let filtered = [...enrolledCourses];

    // Apply search query
    if (filters.query) {
      filtered = filtered.filter(course => 
        course.title.toLowerCase().includes(filters.query.toLowerCase()) ||
        course.description.toLowerCase().includes(filters.query.toLowerCase()) ||
        course.instructor.toLowerCase().includes(filters.query.toLowerCase())
      );
    }

    // Apply category filter
    if (filters.category) {
      filtered = filtered.filter(course => course.category === filters.category);
    }

    // Apply level filter
    if (filters.level) {
      filtered = filtered.filter(course => course.level === filters.level);
    }

    // Apply rating filter
    if (filters.rating > 0) {
      filtered = filtered.filter(course => course.rating >= filters.rating);
    }

    // Apply tags filter
    if (filters.tags.length > 0) {
      filtered = filtered.filter(course => 
        filters.tags.some(tag => course.tags.includes(tag))
      );
    }

    setFilteredCourses(filtered);
  };

  const handleClearSearch = () => {
    setFilteredCourses(enrolledCourses);
  };

  const sortCourses = (courses: any[]) => {
    return [...courses].sort((a, b) => {
      switch (sortBy) {
        case 'recent':
          const progressA = progress[a.id];
          const progressB = progress[b.id];
          if (!progressA && !progressB) return 0;
          if (!progressA) return 1;
          if (!progressB) return -1;
          return new Date(progressB.lastAccessedAt).getTime() - new Date(progressA.lastAccessedAt).getTime();
        case 'progress':
          const progressPercentageA = progress[a.id]?.progressPercentage || 0;
          const progressPercentageB = progress[b.id]?.progressPercentage || 0;
          return progressPercentageB - progressPercentageA;
        case 'name':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });
  };

  const sortedCourses = sortCourses(filteredCourses);

  return (
    <StudentLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Meus Cursos</h1>
            <p className="text-gray-600">
              Gerencie seu progresso e continue aprendendo
            </p>
          </div>
          <Link to="/servicos">
            <Button className="bg-blue-900 hover:bg-blue-800">
              <BookOpen className="h-4 w-4 mr-2" />
              Explorar Mais Cursos
            </Button>
          </Link>
        </div>

        {/* Search and Filters */}
        <CourseSearch onSearch={handleSearch} onClear={handleClearSearch} />

        {/* Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-gray-700">Ordenar por:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="border border-gray-300 rounded-md px-3 py-1 text-sm"
              >
                <option value="recent">Recentes</option>
                <option value="progress">Progresso</option>
                <option value="name">Nome</option>
              </select>
            </div>
            <Badge variant="outline">
              {sortedCourses.length} de {enrolledCourses.length} cursos
            </Badge>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {sortedCourses.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {enrolledCourses.length === 0 ? 'Nenhum curso inscrito' : 'Nenhum curso encontrado'}
              </h3>
              <p className="text-gray-600 mb-6">
                {enrolledCourses.length === 0 
                  ? 'Explore nosso catálogo e comece sua jornada de aprendizado'
                  : 'Tente ajustar os filtros de pesquisa'
                }
              </p>
              {enrolledCourses.length === 0 && (
                <Link to="/servicos">
                  <Button className="bg-blue-900 hover:bg-blue-800">
                    Ver Cursos Disponíveis
                  </Button>
                </Link>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className={viewMode === 'grid' 
            ? 'grid grid-cols-1 lg:grid-cols-2 gap-6' 
            : 'space-y-4'
          }>
            {sortedCourses.map((course) => {
              const courseProgress = progress[course.id];
              const progressPercentage = courseProgress?.progressPercentage || 0;
              const totalLessons = course.modules.reduce((total, module) => 
                total + module.lessons.length, 0
              );
              const completedLessons = courseProgress?.completedLessons.length || 0;

              if (viewMode === 'list') {
                return (
                  <Card key={course.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-4">
                        <img 
                          src={course.thumbnail} 
                          alt={course.title}
                          className="w-24 h-24 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900">{course.title}</h3>
                              <p className="text-gray-600 text-sm">{course.instructor}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge className={getLevelColor(course.level)}>
                                {course.level}
                              </Badge>
                              {progressPercentage === 100 && (
                                <Badge variant="default" className="bg-green-600">
                                  <Award className="h-3 w-3 mr-1" />
                                  Concluído
                                </Badge>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                            <div className="flex items-center space-x-1">
                              <Clock className="h-4 w-4" />
                              <span>{course.duration}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <BarChart3 className="h-4 w-4" />
                              <span>{completedLessons}/{totalLessons} aulas</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span>{course.rating}</span>
                            </div>
                          </div>

                          <div className="flex items-center space-x-4">
                            <div className="flex-1">
                              <Progress value={progressPercentage} className="h-2" />
                              <p className="text-sm text-gray-600 mt-1">
                                {progressPercentage}% concluído
                              </p>
                            </div>
                            <Link to={`/aluno/curso/${course.id}`}>
                              <Button className="bg-blue-900 hover:bg-blue-800">
                                <Play className="h-4 w-4 mr-2" />
                                {progressPercentage > 0 ? 'Continuar' : 'Começar'}
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              }

              // Grid view (existing card design)
              return (
                <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative h-48">
                    <img 
                      src={course.thumbnail} 
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <Badge className={getLevelColor(course.level)}>
                        {course.level}
                      </Badge>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <Progress 
                        value={progressPercentage} 
                        className="h-2 bg-white/30"
                      />
                      <p className="text-white text-sm mt-2">
                        {progressPercentage}% concluído
                      </p>
                    </div>
                  </div>

                  <CardHeader>
                    <CardTitle className="text-lg">{course.title}</CardTitle>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {course.description}
                    </p>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <User className="h-4 w-4" />
                        <span>{course.instructor}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{course.duration}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-1 text-gray-600">
                        <BarChart3 className="h-4 w-4" />
                        <span>{completedLessons} de {totalLessons} aulas</span>
                      </div>
                      {progressPercentage === 100 && (
                        <div className="flex items-center space-x-1 text-green-600">
                          <Award className="h-4 w-4" />
                          <span className="font-medium">Concluído</span>
                        </div>
                      )}
                    </div>

                    <div className="flex space-x-2">
                      <Link to={`/aluno/curso/${course.id}`} className="flex-1">
                        <Button className="w-full bg-blue-900 hover:bg-blue-800">
                          <Play className="h-4 w-4 mr-2" />
                          {progressPercentage > 0 ? 'Continuar' : 'Começar'}
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </StudentLayout>
  );
};

export default StudentCourses;

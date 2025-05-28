
import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  Plus, 
  Edit, 
  Eye, 
  EyeOff, 
  Trash2, 
  Search,
  Filter,
  BookOpen,
  Users,
  Clock,
  Star
} from 'lucide-react';

const CourseManager = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'published' | 'draft'>('all');

  // Mock data para cursos
  const [courses, setCourses] = useState([
    {
      id: '1',
      title: 'Técnicas Avançadas de Vendas',
      description: 'Aprenda as técnicas mais eficazes para aumentar suas vendas',
      thumbnail: '/lovable-uploads/503294f6-01e8-4bd8-86ac-2479dca24e4f.png',
      instructor: 'João Silva',
      duration: '8 horas',
      level: 'Avançado',
      category: 'Vendas',
      price: 250000,
      published: true,
      enrolledStudents: 156,
      rating: 4.8,
      createdAt: '2024-01-15',
      lastUpdated: '2024-01-20'
    },
    {
      id: '2',
      title: 'Atendimento ao Cliente Excelente',
      description: 'Desenvolva habilidades de atendimento excepcional',
      thumbnail: '/lovable-uploads/76d86aa0-dea3-4404-9025-5a39f1fba708.png',
      instructor: 'Maria Santos',
      duration: '6 horas',
      level: 'Intermediário',
      category: 'Atendimento',
      price: 180000,
      published: false,
      enrolledStudents: 0,
      rating: 0,
      createdAt: '2024-02-01',
      lastUpdated: '2024-02-01'
    }
  ]);

  const handlePublishToggle = (courseId: string) => {
    setCourses(prev => 
      prev.map(course => 
        course.id === courseId 
          ? { ...course, published: !course.published }
          : course
      )
    );
    
    const course = courses.find(c => c.id === courseId);
    toast({
      title: course?.published ? 'Curso despublicado' : 'Curso publicado',
      description: course?.published 
        ? 'O curso não está mais visível para os alunos'
        : 'O curso agora está disponível para os alunos',
    });
  };

  const handleDeleteCourse = (courseId: string) => {
    setCourses(prev => prev.filter(course => course.id !== courseId));
    toast({
      title: 'Curso removido',
      description: 'O curso foi removido com sucesso',
    });
  };

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' ||
                         (filterStatus === 'published' && course.published) ||
                         (filterStatus === 'draft' && !course.published);
    
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: courses.length,
    published: courses.filter(c => c.published).length,
    draft: courses.filter(c => !c.published).length,
    totalStudents: courses.reduce((sum, c) => sum + c.enrolledStudents, 0)
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Gestão de Cursos</h1>
            <p className="text-gray-600">Gerencie todos os cursos da plataforma</p>
          </div>
          <Button className="bg-blue-900 hover:bg-blue-800">
            <Plus className="h-4 w-4 mr-2" />
            Novo Curso
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <BookOpen className="h-8 w-8 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-600">Total de Cursos</p>
                  <p className="text-2xl font-bold">{stats.total}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Eye className="h-8 w-8 text-green-600" />
                <div>
                  <p className="text-sm text-gray-600">Publicados</p>
                  <p className="text-2xl font-bold">{stats.published}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <EyeOff className="h-8 w-8 text-yellow-600" />
                <div>
                  <p className="text-sm text-gray-600">Rascunhos</p>
                  <p className="text-2xl font-bold">{stats.draft}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Users className="h-8 w-8 text-purple-600" />
                <div>
                  <p className="text-sm text-gray-600">Alunos Inscritos</p>
                  <p className="text-2xl font-bold">{stats.totalStudents}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Buscar cursos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as any)}
            className="border border-gray-300 rounded-md px-3 py-2"
          >
            <option value="all">Todos os cursos</option>
            <option value="published">Publicados</option>
            <option value="draft">Rascunhos</option>
          </select>
        </div>

        {/* Courses Table */}
        <Card>
          <CardHeader>
            <CardTitle>Lista de Cursos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredCourses.map((course) => (
                <div key={course.id} className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-gray-50">
                  <img 
                    src={course.thumbnail} 
                    alt={course.title}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900">{course.title}</h3>
                        <p className="text-sm text-gray-600">{course.instructor}</p>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Badge variant={course.published ? "default" : "secondary"}>
                          {course.published ? 'Publicado' : 'Rascunho'}
                        </Badge>
                        
                        <Badge variant="outline" className="text-xs">
                          {course.level}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{course.duration}</span>
                      </div>
                      
                      <div className="flex items-center space-x-1">
                        <Users className="h-4 w-4" />
                        <span>{course.enrolledStudents} alunos</span>
                      </div>
                      
                      {course.rating > 0 && (
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span>{course.rating}</span>
                        </div>
                      )}
                      
                      <span>AOA {course.price.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handlePublishToggle(course.id)}
                    >
                      {course.published ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDeleteCourse(course.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default CourseManager;

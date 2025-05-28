
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useStudent } from '@/context/StudentContext';
import { useToast } from '@/hooks/use-toast';
import { 
  User, 
  Mail, 
  Calendar, 
  Award,
  BookOpen,
  Clock,
  Settings
} from 'lucide-react';
import StudentLayout from '@/components/student/StudentLayout';

const StudentProfile = () => {
  const { state } = useStudent();
  const { toast } = useToast();
  const { student, enrolledCourses, progress } = state;
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: student?.name || '',
    email: student?.email || ''
  });

  const completedCourses = Object.values(progress).filter(p => p.progressPercentage === 100).length;
  const totalStudyHours = enrolledCourses.reduce((acc, course) => {
    const hours = parseInt(course.duration.split(' ')[0]) || 0;
    return acc + hours;
  }, 0);

  const handleSave = () => {
    // In a real app, this would update the user in the database
    toast({
      title: "Perfil atualizado!",
      description: "Suas informações foram salvas com sucesso.",
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: student?.name || '',
      email: student?.email || ''
    });
    setIsEditing(false);
  };

  return (
    <StudentLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Meu Perfil</h1>
            <p className="text-gray-600">
              Gerencie suas informações pessoais e veja suas estatísticas
            </p>
          </div>
          <Button
            onClick={() => setIsEditing(!isEditing)}
            variant={isEditing ? "outline" : "default"}
            className={!isEditing ? "bg-blue-900 hover:bg-blue-800" : ""}
          >
            <Settings className="h-4 w-4 mr-2" />
            {isEditing ? 'Cancelar' : 'Editar Perfil'}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Information */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span>Informações Pessoais</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-6">
                  <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="h-10 w-10 text-blue-900" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {student?.name}
                    </h3>
                    <p className="text-gray-600">{student?.email}</p>
                    <p className="text-sm text-gray-500">
                      Membro desde {new Date(student?.createdAt || '').toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                </div>

                {isEditing ? (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Nome Completo</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="mt-1"
                      />
                    </div>
                    <div className="flex space-x-2">
                      <Button onClick={handleSave} className="bg-blue-900 hover:bg-blue-800">
                        Salvar Alterações
                      </Button>
                      <Button variant="outline" onClick={handleCancel}>
                        Cancelar
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <Mail className="h-4 w-4 text-gray-600" />
                        <span className="text-sm font-medium text-gray-600">Email</span>
                      </div>
                      <p className="text-gray-900">{student?.email}</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <Calendar className="h-4 w-4 text-gray-600" />
                        <span className="text-sm font-medium text-gray-600">Data de Cadastro</span>
                      </div>
                      <p className="text-gray-900">
                        {new Date(student?.createdAt || '').toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Statistics */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Estatísticas de Aprendizado</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <BookOpen className="h-4 w-4 text-blue-600" />
                    <span className="text-sm text-gray-600">Cursos Inscritos</span>
                  </div>
                  <span className="font-bold text-gray-900">{enrolledCourses.length}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Award className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-gray-600">Cursos Concluídos</span>
                  </div>
                  <span className="font-bold text-gray-900">{completedCourses}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-orange-600" />
                    <span className="text-sm text-gray-600">Horas de Estudo</span>
                  </div>
                  <span className="font-bold text-gray-900">{totalStudyHours}h</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Conquistas</CardTitle>
              </CardHeader>
              <CardContent>
                {completedCourses > 0 ? (
                  <div className="space-y-3">
                    {completedCourses >= 1 && (
                      <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                        <Award className="h-6 w-6 text-green-600" />
                        <div>
                          <p className="font-medium text-green-900">Primeiro Curso</p>
                          <p className="text-sm text-green-700">Parabéns pelo primeiro curso concluído!</p>
                        </div>
                      </div>
                    )}
                    {completedCourses >= 3 && (
                      <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                        <Award className="h-6 w-6 text-blue-600" />
                        <div>
                          <p className="font-medium text-blue-900">Estudante Dedicado</p>
                          <p className="text-sm text-blue-700">3 cursos concluídos com sucesso!</p>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-4">
                    Complete seu primeiro curso para desbloquear conquistas!
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </StudentLayout>
  );
};

export default StudentProfile;

import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import StudentForm from '@/components/admin/StudentForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { 
  Search, 
  UserCheck, 
  UserX, 
  Mail, 
  Phone,
  Calendar,
  TrendingUp,
  Users,
  UserPlus,
  AlertTriangle,
  Edit,
  Trash2
} from 'lucide-react';
import { Student } from '@/types/student';
import { StudentWithExtras } from '@/types/local';

const StudentManager = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'blocked' | 'expired'>('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);

  // Mock data para alunos with proper typing
  const [students, setStudents] = useState<StudentWithExtras[]>([
    {
      id: '1',
      name: 'Ana Silva',
      email: 'ana@exemplo.com',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5c5?w=400',
      enrolledCourses: ['1', '2', '3'],
      favoriteCourses: ['1'],
      wishlistCourses: [],
      progress: {},
      points: 100,
      badges: [],
      certificates: [],
      settings: {
        emailNotifications: true,
        pushNotifications: true,
        autoplay: true,
        playbackSpeed: 1,
        language: 'pt',
        theme: 'light',
        privacy: {
          showProgress: true,
          showCertificates: true,
          showBadges: true
        }
      },
      createdAt: '2024-01-01',
      lastLoginAt: '2024-01-20',
      phone: '+244 900 000 001',
      subscription: {
        plan: 'Premium',
        startDate: '2024-01-01',
        endDate: '2024-12-31',
        status: 'active'
      },
      completedCourses: 1,
      totalHours: 25,
      registrationDate: '2024-01-01'
    },
    {
      id: '2',
      name: 'Pedro Santos',
      email: 'pedro@exemplo.com',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
      enrolledCourses: ['1'],
      favoriteCourses: [],
      wishlistCourses: [],
      progress: {},
      points: 50,
      badges: [],
      certificates: [],
      settings: {
        emailNotifications: true,
        pushNotifications: false,
        autoplay: true,
        playbackSpeed: 1,
        language: 'pt',
        theme: 'light',
        privacy: {
          showProgress: true,
          showCertificates: true,
          showBadges: true
        }
      },
      createdAt: '2023-12-01',
      lastLoginAt: '2024-01-16',
      phone: '+244 900 000 002',
      subscription: {
        plan: 'Básico',
        startDate: '2023-12-01',
        endDate: '2024-01-15',
        status: 'expired'
      },
      completedCourses: 0,
      totalHours: 5,
      registrationDate: '2023-12-01'
    },
    {
      id: '3',
      name: 'Maria Costa',
      email: 'maria@exemplo.com',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
      enrolledCourses: ['1', '2'],
      favoriteCourses: [],
      wishlistCourses: [],
      progress: {},
      points: 20,
      badges: [],
      certificates: [],
      settings: {
        emailNotifications: false,
        pushNotifications: false,
        autoplay: true,
        playbackSpeed: 1,
        language: 'pt',
        theme: 'dark',
        privacy: {
          showProgress: false,
          showCertificates: false,
          showBadges: false
        }
      },
      createdAt: '2024-01-01',
      lastLoginAt: '2024-01-18',
      phone: '+244 900 000 003',
      subscription: {
        plan: 'Premium',
        startDate: '2024-01-01',
        endDate: '2024-12-31',
        status: 'blocked'
      },
      completedCourses: 0,
      totalHours: 2,
      registrationDate: '2024-01-01'
    }
  ]);

  const handleCreateStudent = (studentData: Student) => {
    const newStudent: StudentWithExtras = {
      ...studentData,
      id: Date.now().toString(),
      enrolledCourses: studentData.enrolledCourses || [],
      completedCourses: 0,
      totalHours: 0,
      lastLoginAt: new Date().toISOString(),
      registrationDate: new Date().toISOString(),
      subscription: {
        plan: 'Básico',
        startDate: new Date().toISOString().split('T')[0],
        endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        status: 'active'
      }
    };
    
    setStudents(prev => [...prev, newStudent]);
    setIsDialogOpen(false);
    setEditingStudent(null);
    toast({
      title: 'Aluno criado',
      description: 'O aluno foi criado com sucesso.',
    });
  };

  const handleUpdateStudent = (studentData: Student) => {
    const existingStudent = students.find(s => s.id === studentData.id);
    const updatedStudent: StudentWithExtras = {
      ...existingStudent,
      ...studentData,
      lastLoginAt: new Date().toISOString()
    };
    
    setStudents(prev =>
      prev.map(student =>
        student.id === studentData.id ? updatedStudent : student
      )
    );
    setIsDialogOpen(false);
    setEditingStudent(null);
    toast({
      title: 'Aluno atualizado',
      description: 'Os dados do aluno foram atualizados com sucesso.',
    });
  };

  const handleDeleteStudent = (studentId: string) => {
    if (window.confirm('Tem certeza que deseja excluir este aluno? Esta ação não pode ser desfeita.')) {
      setStudents(prev => prev.filter(student => student.id !== studentId));
      toast({
        title: 'Aluno removido',
        description: 'O aluno foi removido com sucesso.',
      });
    }
  };

  const handleBlockStudent = (studentId: string) => {
    setStudents(prev =>
      prev.map(student =>
        student.id === studentId
          ? {
              ...student,
              subscription: {
                ...student.subscription!,
                status: student.subscription?.status === 'blocked' ? 'active' : 'blocked'
              }
            }
          : student
      )
    );

    const student = students.find(s => s.id === studentId);
    toast({
      title: student?.subscription?.status === 'blocked' ? 'Aluno desbloqueado' : 'Aluno bloqueado',
      description: student?.subscription?.status === 'blocked'
        ? 'O aluno pode acessar a plataforma novamente'
        : 'O aluno foi bloqueado e não pode mais acessar',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'expired': return 'bg-yellow-100 text-yellow-800';
      case 'blocked': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Ativo';
      case 'expired': return 'Expirado';
      case 'blocked': return 'Bloqueado';
      default: return 'Desconhecido';
    }
  };

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' || student.subscription?.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: students.length,
    active: students.filter(s => s.subscription?.status === 'active').length,
    expired: students.filter(s => s.subscription?.status === 'expired').length,
    blocked: students.filter(s => s.subscription?.status === 'blocked').length
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Gestão de Alunos</h1>
            <p className="text-gray-600">Gerencie todos os alunos da plataforma</p>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button 
                className="bg-blue-900 hover:bg-blue-800"
                onClick={() => setEditingStudent(null)}
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Adicionar Aluno
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingStudent ? 'Editar Aluno' : 'Adicionar Novo Aluno'}
                </DialogTitle>
              </DialogHeader>
              <StudentForm
                student={editingStudent}
                onSave={editingStudent ? handleUpdateStudent : handleCreateStudent}
                onCancel={() => {
                  setIsDialogOpen(false);
                  setEditingStudent(null);
                }}
              />
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Users className="h-8 w-8 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-600">Total de Alunos</p>
                  <p className="text-2xl font-bold">{stats.total}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <UserCheck className="h-8 w-8 text-green-600" />
                <div>
                  <p className="text-sm text-gray-600">Ativos</p>
                  <p className="text-2xl font-bold">{stats.active}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-8 w-8 text-yellow-600" />
                <div>
                  <p className="text-sm text-gray-600">Expirados</p>
                  <p className="text-2xl font-bold">{stats.expired}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <UserX className="h-8 w-8 text-red-600" />
                <div>
                  <p className="text-sm text-gray-600">Bloqueados</p>
                  <p className="text-2xl font-bold">{stats.blocked}</p>
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
              placeholder="Buscar alunos..."
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
            <option value="all">Todos os alunos</option>
            <option value="active">Ativos</option>
            <option value="expired">Expirados</option>
            <option value="blocked">Bloqueados</option>
          </select>
        </div>

        {/* Students Table */}
        <Card>
          <CardHeader>
            <CardTitle>Lista de Alunos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredStudents.map((student) => (
                <div key={student.id} className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-gray-50">
                  <img 
                    src={student.avatar} 
                    alt={student.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900">{student.name}</h3>
                        <p className="text-sm text-gray-600">{student.email}</p>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Badge className={getStatusColor(student.subscription?.status || 'unknown')}>
                          {getStatusText(student.subscription?.status || 'unknown')}
                        </Badge>
                        
                        <Badge variant="outline" className="text-xs">
                          {student.subscription?.plan || 'N/A'}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <TrendingUp className="h-4 w-4" />
                        <span>{student.enrolledCourses?.length || 0} cursos</span>
                      </div>
                      
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>Exp: {student.subscription?.endDate ? new Date(student.subscription.endDate).toLocaleDateString() : 'N/A'}</span>
                      </div>
                      
                      <div className="flex items-center space-x-1">
                        <Phone className="h-4 w-4" />
                        <span>{student.phone || 'N/A'}</span>
                      </div>
                      
                      <div>
                        <span>Último login: {new Date(student.lastLoginAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        setEditingStudent(student);
                        setIsDialogOpen(true);
                      }}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    
                    <Button variant="outline" size="sm">
                      <Mail className="h-4 w-4" />
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleBlockStudent(student.id)}
                      className={student.subscription?.status === 'blocked' ? 'text-green-600 hover:text-green-700' : 'text-red-600 hover:text-red-700'}
                    >
                      {student.subscription?.status === 'blocked' ? <UserCheck className="h-4 w-4" /> : <UserX className="h-4 w-4" />}
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDeleteStudent(student.id)}
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

export default StudentManager;

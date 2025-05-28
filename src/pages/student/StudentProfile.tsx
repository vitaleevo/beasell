
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useStudent } from '@/context/StudentContext';
import { useToast } from '@/hooks/use-toast';
import StudentLayout from '@/components/student/StudentLayout';
import BadgesPanel from '@/components/student/BadgesPanel';
import CertificatesPanel from '@/components/student/CertificatesPanel';
import { 
  User, 
  Mail, 
  Calendar, 
  Award,
  BookOpen,
  Clock,
  Settings,
  Bell,
  Shield,
  Palette,
  Download,
  Share
} from 'lucide-react';

const StudentProfile = () => {
  const { state } = useStudent();
  const { toast } = useToast();
  const { student, enrolledCourses, progress } = state;
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: student?.name || '',
    email: student?.email || ''
  });

  const [settings, setSettings] = useState(student?.settings || {
    emailNotifications: true,
    pushNotifications: false,
    autoplay: true,
    playbackSpeed: 1.0,
    language: 'pt-BR',
    theme: 'light' as const,
    privacy: {
      showProgress: true,
      showCertificates: true,
      showBadges: true
    }
  });

  const completedCourses = Object.values(progress).filter(p => p.progressPercentage === 100).length;
  const totalStudyHours = enrolledCourses.reduce((acc, course) => {
    const hours = parseInt(course.duration.split(' ')[0]) || 0;
    return acc + hours;
  }, 0);

  const mockCertificates = [
    {
      id: '1',
      courseId: '1',
      studentId: student?.id || '',
      issuedAt: '2024-03-15',
      certificateUrl: '#',
      verificationCode: 'CERT-2024-001'
    }
  ];

  const handleSave = () => {
    toast({
      title: "Perfil atualizado!",
      description: "Suas informações foram salvas com sucesso.",
    });
    setIsEditing(false);
  };

  const handleSettingsSave = () => {
    toast({
      title: "Configurações salvas!",
      description: "Suas preferências foram atualizadas.",
    });
  };

  const handleDownloadCertificate = (certificateId: string) => {
    toast({
      title: "Download iniciado!",
      description: "O certificado será baixado em breve.",
    });
  };

  const handleShareCertificate = (certificateId: string) => {
    navigator.clipboard.writeText(`https://beasell.ao/certificado/${certificateId}`);
    toast({
      title: "Link copiado!",
      description: "O link do certificado foi copiado para a área de transferência.",
    });
  };

  return (
    <StudentLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Meu Perfil</h1>
            <p className="text-gray-600">
              Gerencie suas informações pessoais e preferências
            </p>
          </div>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="profile">Perfil</TabsTrigger>
            <TabsTrigger value="badges">Conquistas</TabsTrigger>
            <TabsTrigger value="certificates">Certificados</TabsTrigger>
            <TabsTrigger value="settings">Configurações</TabsTrigger>
            <TabsTrigger value="privacy">Privacidade</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Profile Information */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center space-x-2">
                        <User className="h-5 w-5" />
                        <span>Informações Pessoais</span>
                      </CardTitle>
                      <Button
                        onClick={() => setIsEditing(!isEditing)}
                        variant={isEditing ? "outline" : "default"}
                        className={!isEditing ? "bg-blue-900 hover:bg-blue-800" : ""}
                      >
                        <Settings className="h-4 w-4 mr-2" />
                        {isEditing ? 'Cancelar' : 'Editar'}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center space-x-6">
                      <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="h-12 w-12 text-blue-900" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900">
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
                          <Button variant="outline" onClick={() => setIsEditing(false)}>
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
                            <span className="text-sm font-medium text-gray-600">Último Acesso</span>
                          </div>
                          <p className="text-gray-900">
                            {new Date(student?.lastLoginAt || '').toLocaleDateString('pt-BR')}
                          </p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Statistics */}
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Estatísticas</CardTitle>
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
              </div>
            </div>
          </TabsContent>

          <TabsContent value="badges">
            <BadgesPanel 
              badges={student?.badges || []}
              totalPoints={student?.points || 0}
            />
          </TabsContent>

          <TabsContent value="certificates">
            <CertificatesPanel 
              certificates={mockCertificates}
              onDownload={handleDownloadCertificate}
              onShare={handleShareCertificate}
            />
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="h-5 w-5" />
                  <span>Preferências</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Reprodução Automática</h4>
                      <p className="text-sm text-gray-600">Reproduzir próximo vídeo automaticamente</p>
                    </div>
                    <Switch
                      checked={settings.autoplay}
                      onCheckedChange={(checked) => 
                        setSettings(prev => ({ ...prev, autoplay: checked }))
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Velocidade de Reprodução</Label>
                    <select
                      value={settings.playbackSpeed}
                      onChange={(e) => setSettings(prev => ({ 
                        ...prev, 
                        playbackSpeed: parseFloat(e.target.value) 
                      }))}
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                    >
                      <option value={0.5}>0.5x</option>
                      <option value={0.75}>0.75x</option>
                      <option value={1.0}>1x (Normal)</option>
                      <option value={1.25}>1.25x</option>
                      <option value={1.5}>1.5x</option>
                      <option value={2.0}>2x</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label>Tema</Label>
                    <select
                      value={settings.theme}
                      onChange={(e) => setSettings(prev => ({ 
                        ...prev, 
                        theme: e.target.value as 'light' | 'dark' | 'auto'
                      }))}
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                    >
                      <option value="light">Claro</option>
                      <option value="dark">Escuro</option>
                      <option value="auto">Automático</option>
                    </select>
                  </div>
                </div>

                <Button onClick={handleSettingsSave} className="bg-blue-900 hover:bg-blue-800">
                  Salvar Preferências
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bell className="h-5 w-5" />
                  <span>Notificações</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Email</h4>
                    <p className="text-sm text-gray-600">Receber notificações por email</p>
                  </div>
                  <Switch
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) => 
                      setSettings(prev => ({ ...prev, emailNotifications: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Push</h4>
                    <p className="text-sm text-gray-600">Notificações push no navegador</p>
                  </div>
                  <Switch
                    checked={settings.pushNotifications}
                    onCheckedChange={(checked) => 
                      setSettings(prev => ({ ...prev, pushNotifications: checked }))
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="privacy">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-5 w-5" />
                  <span>Configurações de Privacidade</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Mostrar Progresso</h4>
                      <p className="text-sm text-gray-600">Permitir que outros vejam seu progresso</p>
                    </div>
                    <Switch
                      checked={settings.privacy.showProgress}
                      onCheckedChange={(checked) => 
                        setSettings(prev => ({ 
                          ...prev, 
                          privacy: { ...prev.privacy, showProgress: checked }
                        }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Mostrar Certificados</h4>
                      <p className="text-sm text-gray-600">Exibir certificados no perfil público</p>
                    </div>
                    <Switch
                      checked={settings.privacy.showCertificates}
                      onCheckedChange={(checked) => 
                        setSettings(prev => ({ 
                          ...prev, 
                          privacy: { ...prev.privacy, showCertificates: checked }
                        }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Mostrar Conquistas</h4>
                      <p className="text-sm text-gray-600">Exibir badges e conquistas</p>
                    </div>
                    <Switch
                      checked={settings.privacy.showBadges}
                      onCheckedChange={(checked) => 
                        setSettings(prev => ({ 
                          ...prev, 
                          privacy: { ...prev.privacy, showBadges: checked }
                        }))
                      }
                    />
                  </div>
                </div>

                <Button onClick={handleSettingsSave} className="bg-blue-900 hover:bg-blue-800">
                  Salvar Configurações de Privacidade
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </StudentLayout>
  );
};

export default StudentProfile;

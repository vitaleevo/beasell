
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Student } from '@/types/student';
import { Upload } from 'lucide-react';

interface StudentFormProps {
  student?: Student | null;
  onSave: (student: any) => void;
  onCancel: () => void;
}

const StudentForm: React.FC<StudentFormProps> = ({ student, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: student?.name || '',
    email: student?.email || '',
    avatar: student?.avatar || '',
    phone: '',
    status: 'active',
    subscription: {
      plan: 'Básico',
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: 'active'
    },
    enrolledCourses: student?.enrolledCourses || [],
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
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const studentData = {
      ...formData,
      id: student?.id || Date.now().toString(),
      points: student?.points || 0,
      badges: student?.badges || [],
      certificates: student?.certificates || [],
      progress: student?.progress || {},
      favoriteCourses: student?.favoriteCourses || [],
      wishlistCourses: student?.wishlistCourses || [],
      createdAt: student?.createdAt || new Date().toISOString(),
      lastLoginAt: new Date().toISOString()
    };

    onSave(studentData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Informações Pessoais</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Nome Completo</label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Telefone</label>
              <Input
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+244 900 000 000"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full p-2 border rounded-md"
              >
                <option value="active">Ativo</option>
                <option value="blocked">Bloqueado</option>
                <option value="expired">Expirado</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Foto de Perfil</label>
            <div className="flex gap-2">
              <Input
                value={formData.avatar}
                onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                placeholder="https://..."
              />
              <Button type="button" variant="outline">
                <Upload className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Subscrição</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Plano</label>
              <select
                value={formData.subscription.plan}
                onChange={(e) => setFormData({
                  ...formData,
                  subscription: { ...formData.subscription, plan: e.target.value }
                })}
                className="w-full p-2 border rounded-md"
              >
                <option value="Básico">Básico</option>
                <option value="Premium">Premium</option>
                <option value="Empresarial">Empresarial</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Data de Início</label>
              <Input
                type="date"
                value={formData.subscription.startDate}
                onChange={(e) => setFormData({
                  ...formData,
                  subscription: { ...formData.subscription, startDate: e.target.value }
                })}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Data de Fim</label>
              <Input
                type="date"
                value={formData.subscription.endDate}
                onChange={(e) => setFormData({
                  ...formData,
                  subscription: { ...formData.subscription, endDate: e.target.value }
                })}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Configurações</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-medium">Notificações</h4>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.settings.emailNotifications}
                  onChange={(e) => setFormData({
                    ...formData,
                    settings: { ...formData.settings, emailNotifications: e.target.checked }
                  })}
                  className="mr-2"
                />
                Notificações por Email
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.settings.pushNotifications}
                  onChange={(e) => setFormData({
                    ...formData,
                    settings: { ...formData.settings, pushNotifications: e.target.checked }
                  })}
                  className="mr-2"
                />
                Notificações Push
              </label>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-medium">Privacidade</h4>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.settings.privacy.showProgress}
                  onChange={(e) => setFormData({
                    ...formData,
                    settings: {
                      ...formData.settings,
                      privacy: { ...formData.settings.privacy, showProgress: e.target.checked }
                    }
                  })}
                  className="mr-2"
                />
                Mostrar Progresso
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.settings.privacy.showCertificates}
                  onChange={(e) => setFormData({
                    ...formData,
                    settings: {
                      ...formData.settings,
                      privacy: { ...formData.settings.privacy, showCertificates: e.target.checked }
                    }
                  })}
                  className="mr-2"
                />
                Mostrar Certificados
              </label>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" className="bg-blue-900 hover:bg-blue-800">
          {student ? 'Atualizar' : 'Criar'} Aluno
        </Button>
      </div>
    </form>
  );
};

export default StudentForm;

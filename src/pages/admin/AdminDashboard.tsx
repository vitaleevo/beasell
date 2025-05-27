
import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, DollarSign, Users, Eye } from 'lucide-react';
import { useBlog } from '@/context/BlogContext';
import { useAdmin } from '@/context/AdminContext';

const AdminDashboard = () => {
  const { state: blogState } = useBlog();
  const { state: adminState } = useAdmin();

  const stats = [
    {
      title: 'Total de Artigos',
      value: blogState.posts.length,
      icon: FileText,
      color: 'bg-blue-500',
    },
    {
      title: 'Artigos Publicados',
      value: blogState.posts.filter(post => post.published).length,
      icon: Eye,
      color: 'bg-green-500',
    },
    {
      title: 'Serviços Ativos',
      value: adminState.services.length,
      icon: DollarSign,
      color: 'bg-orange-500',
    },
    {
      title: 'Visualizações do Mês',
      value: '2.4K',
      icon: Users,
      color: 'bg-purple-500',
    },
  ];

  const recentPosts = blogState.posts.slice(0, 5);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Visão geral do sistema administrativo</p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`${stat.color} p-3 rounded-full`}>
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Posts */}
        <Card>
          <CardHeader>
            <CardTitle>Artigos Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentPosts.map((post) => (
                <div key={post.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-semibold">{post.title}</h3>
                    <p className="text-sm text-gray-600">{post.date} • {post.category}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      post.published 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {post.published ? 'Publicado' : 'Rascunho'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Ações Rápidas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <button className="w-full p-3 text-left border rounded-lg hover:bg-gray-50 transition-colors">
                + Criar Novo Artigo
              </button>
              <button className="w-full p-3 text-left border rounded-lg hover:bg-gray-50 transition-colors">
                💰 Atualizar Preços
              </button>
              <button className="w-full p-3 text-left border rounded-lg hover:bg-gray-50 transition-colors">
                📊 Ver Relatórios
              </button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Atividade Recente</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>Artigo "Técnicas de Vendas" publicado</span>
                  <span className="text-gray-500">2h atrás</span>
                </div>
                <div className="flex justify-between">
                  <span>Preços dos pacotes atualizados</span>
                  <span className="text-gray-500">1 dia atrás</span>
                </div>
                <div className="flex justify-between">
                  <span>Novo testemunho adicionado</span>
                  <span className="text-gray-500">3 dias atrás</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;


import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  Search, 
  CreditCard, 
  Calendar, 
  TrendingUp,
  DollarSign,
  Users,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react';

const SubscriptionManager = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'expired' | 'cancelled'>('all');

  // Mock data para subscrições
  const [subscriptions, setSubscriptions] = useState([
    {
      id: 'sub_001',
      studentName: 'Ana Silva',
      studentEmail: 'ana@exemplo.com',
      planType: 'premium',
      status: 'active',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      amount: 25000,
      currency: 'AOA',
      paymentMethod: 'Cartão de Crédito',
      autoRenew: true,
      lastPayment: '2024-01-01',
      nextPayment: '2024-02-01'
    },
    {
      id: 'sub_002',
      studentName: 'Pedro Santos',
      studentEmail: 'pedro@exemplo.com',
      planType: 'basico',
      status: 'expired',
      startDate: '2023-12-01',
      endDate: '2024-01-15',
      amount: 15000,
      currency: 'AOA',
      paymentMethod: 'Transferência',
      autoRenew: false,
      lastPayment: '2023-12-01',
      nextPayment: null
    },
    {
      id: 'sub_003',
      studentName: 'Maria Costa',
      studentEmail: 'maria@exemplo.com',
      planType: 'empresarial',
      status: 'active',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      amount: 45000,
      currency: 'AOA',
      paymentMethod: 'Cartão de Crédito',
      autoRenew: true,
      lastPayment: '2024-01-01',
      nextPayment: '2024-02-01'
    }
  ]);

  const plans = [
    {
      id: 'basico',
      name: 'Plano Básico',
      price: 15000,
      features: ['2 cursos', 'Suporte básico', 'Certificados'],
      color: 'bg-gray-100 text-gray-800'
    },
    {
      id: 'premium',
      name: 'Plano Premium',
      price: 25000,
      features: ['5 cursos', 'Suporte prioritário', 'Certificados', 'Analytics'],
      color: 'bg-blue-100 text-blue-800'
    },
    {
      id: 'empresarial',
      name: 'Plano Empresarial',
      price: 45000,
      features: ['Cursos ilimitados', 'Suporte VIP', 'Certificados', 'Analytics', 'API'],
      color: 'bg-purple-100 text-purple-800'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'expired': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return CheckCircle;
      case 'expired': return Clock;
      case 'cancelled': return XCircle;
      default: return AlertTriangle;
    }
  };

  const filteredSubscriptions = subscriptions.filter(sub => {
    const matchesSearch = sub.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sub.studentEmail.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' || sub.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: subscriptions.length,
    active: subscriptions.filter(s => s.status === 'active').length,
    expired: subscriptions.filter(s => s.status === 'expired').length,
    revenue: subscriptions
      .filter(s => s.status === 'active')
      .reduce((sum, s) => sum + s.amount, 0)
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Gestão de Subscrições</h1>
            <p className="text-gray-600">Gerencie todos os planos e pagamentos</p>
          </div>
          <Button className="bg-blue-900 hover:bg-blue-800">
            <CreditCard className="h-4 w-4 mr-2" />
            Nova Subscrição
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Users className="h-8 w-8 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-600">Total de Subscrições</p>
                  <p className="text-2xl font-bold">{stats.total}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-8 w-8 text-green-600" />
                <div>
                  <p className="text-sm text-gray-600">Ativas</p>
                  <p className="text-2xl font-bold">{stats.active}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Clock className="h-8 w-8 text-yellow-600" />
                <div>
                  <p className="text-sm text-gray-600">Expiradas</p>
                  <p className="text-2xl font-bold">{stats.expired}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <DollarSign className="h-8 w-8 text-green-600" />
                <div>
                  <p className="text-sm text-gray-600">Receita Mensal</p>
                  <p className="text-2xl font-bold">AOA {stats.revenue.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Plans Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Planos Disponíveis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {plans.map((plan) => (
                <div key={plan.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold">{plan.name}</h3>
                    <Badge className={plan.color}>{plan.id}</Badge>
                  </div>
                  <p className="text-2xl font-bold mb-3">AOA {plan.price.toLocaleString()}/mês</p>
                  <ul className="space-y-1 text-sm">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Buscar subscrições..."
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
            <option value="all">Todas as subscrições</option>
            <option value="active">Ativas</option>
            <option value="expired">Expiradas</option>
            <option value="cancelled">Canceladas</option>
          </select>
        </div>

        {/* Subscriptions Table */}
        <Card>
          <CardHeader>
            <CardTitle>Lista de Subscrições</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredSubscriptions.map((subscription) => {
                const StatusIcon = getStatusIcon(subscription.status);
                const plan = plans.find(p => p.id === subscription.planType);
                
                return (
                  <div key={subscription.id} className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-gray-900">{subscription.studentName}</h3>
                          <p className="text-sm text-gray-600">{subscription.studentEmail}</p>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Badge className={getStatusColor(subscription.status)}>
                            <StatusIcon className="h-3 w-3 mr-1" />
                            {subscription.status}
                          </Badge>
                          
                          {plan && (
                            <Badge className={plan.color}>
                              {plan.name}
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <DollarSign className="h-4 w-4" />
                          <span>AOA {subscription.amount.toLocaleString()}</span>
                        </div>
                        
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>Exp: {new Date(subscription.endDate).toLocaleDateString()}</span>
                        </div>
                        
                        <div className="flex items-center space-x-1">
                          <CreditCard className="h-4 w-4" />
                          <span>{subscription.paymentMethod}</span>
                        </div>
                        
                        <div>
                          <span>Auto-renova: {subscription.autoRenew ? 'Sim' : 'Não'}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        Ver Detalhes
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default SubscriptionManager;

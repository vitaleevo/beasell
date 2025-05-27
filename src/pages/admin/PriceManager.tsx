
import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useAdmin } from '@/context/AdminContext';
import { ServicePackage } from '@/types/admin';
import { Plus, Edit, Trash2, DollarSign } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const PriceManager = () => {
  const { state, dispatch } = useAdmin();
  const { toast } = useToast();
  const [editingService, setEditingService] = useState<ServicePackage | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleUpdateService = (service: ServicePackage) => {
    dispatch({ type: 'UPDATE_SERVICE', payload: service });
    setIsDialogOpen(false);
    setEditingService(null);
    toast({
      title: 'Serviço atualizado',
      description: 'O serviço foi atualizado com sucesso.',
    });
  };

  const handleCreateService = (serviceData: Omit<ServicePackage, 'id'>) => {
    const newService: ServicePackage = {
      ...serviceData,
      id: Date.now().toString(),
    };
    
    dispatch({ type: 'SET_SERVICES', payload: [...state.services, newService] });
    setIsDialogOpen(false);
    setEditingService(null);
    toast({
      title: 'Serviço criado',
      description: 'O serviço foi criado com sucesso.',
    });
  };

  const categories = [
    { key: 'individual', label: 'Formação Individual', count: state.services.filter(s => s.category === 'individual').length },
    { key: 'empresarial', label: 'Formação Empresarial', count: state.services.filter(s => s.category === 'empresarial').length },
    { key: 'workshop', label: 'Workshops', count: state.services.filter(s => s.category === 'workshop').length },
    { key: 'consultoria', label: 'Consultoria', count: state.services.filter(s => s.category === 'consultoria').length },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Gestão de Preços</h1>
            <p className="text-gray-600">Gerencie serviços e seus preços</p>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button 
                className="bg-blue-900 hover:bg-blue-800"
                onClick={() => setEditingService(null)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Novo Serviço
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>
                  {editingService ? 'Editar Serviço' : 'Criar Novo Serviço'}
                </DialogTitle>
              </DialogHeader>
              <ServiceEditor
                service={editingService}
                onSave={editingService ? handleUpdateService : handleCreateService}
                onCancel={() => {
                  setIsDialogOpen(false);
                  setEditingService(null);
                }}
              />
            </DialogContent>
          </Dialog>
        </div>

        {/* Categories Overview */}
        <div className="grid md:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Card key={category.key}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{category.label}</p>
                    <p className="text-3xl font-bold text-gray-900">{category.count}</p>
                  </div>
                  <div className="bg-blue-500 p-3 rounded-full">
                    <DollarSign className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Services by Category */}
        {categories.map((category) => {
          const categoryServices = state.services.filter(s => s.category === category.key);
          
          if (categoryServices.length === 0) return null;
          
          return (
            <Card key={category.key}>
              <CardHeader>
                <CardTitle>{category.label}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {categoryServices.map((service) => (
                    <div key={service.id} className="border rounded-lg p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-semibold text-lg">{service.name}</h3>
                          {service.popular && (
                            <span className="inline-block bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full mt-1">
                              Popular
                            </span>
                          )}
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setEditingService(service);
                              setIsDialogOpen(true);
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Preço:</span>
                          <span className="font-semibold">
                            {service.price.toLocaleString('pt-AO')} {service.currency}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Duração:</span>
                          <span className="text-sm">{service.duration}</span>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-2">Características:</p>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {service.features.map((feature, index) => (
                            <li key={index} className="flex items-center">
                              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </AdminLayout>
  );
};

// Service Editor Component
const ServiceEditor: React.FC<{
  service?: ServicePackage | null;
  onSave: (service: any) => void;
  onCancel: () => void;
}> = ({ service, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: service?.name || '',
    description: service?.description || '',
    price: service?.price || 0,
    currency: service?.currency || 'AOA',
    duration: service?.duration || '',
    features: service?.features?.join('\n') || '',
    popular: service?.popular || false,
    category: service?.category || 'individual',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const serviceData = {
      ...formData,
      features: formData.features.split('\n').map(f => f.trim()).filter(Boolean),
    };

    onSave(service ? { ...service, ...serviceData } : serviceData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2">Nome do Serviço</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Descrição</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={3}
          required
        />
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Preço</label>
          <input
            type="number"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Moeda</label>
          <select
            value={formData.currency}
            onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="AOA">AOA</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Duração</label>
          <input
            type="text"
            value={formData.duration}
            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="2 semanas"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Categoria</label>
        <select
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="individual">Formação Individual</option>
          <option value="empresarial">Formação Empresarial</option>
          <option value="workshop">Workshops</option>
          <option value="consultoria">Consultoria</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Características (uma por linha)</label>
        <textarea
          value={formData.features}
          onChange={(e) => setFormData({ ...formData, features: e.target.value })}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={5}
          placeholder="Técnicas básicas&#10;Atendimento ao cliente&#10;Certificado"
          required
        />
      </div>

      <div className="flex items-center">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={formData.popular}
            onChange={(e) => setFormData({ ...formData, popular: e.target.checked })}
            className="mr-2"
          />
          Marcar como popular
        </label>
      </div>

      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" className="bg-blue-900 hover:bg-blue-800">
          {service ? 'Atualizar' : 'Criar'} Serviço
        </Button>
      </div>
    </form>
  );
};

export default PriceManager;

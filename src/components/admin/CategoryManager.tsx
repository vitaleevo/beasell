
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Tag } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  color: string;
  postCount: number;
  createdAt: string;
}

const CategoryManager = () => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<BlogCategory | null>(null);

  const [categories, setCategories] = useState<BlogCategory[]>([
    {
      id: '1',
      name: 'Técnicas de Vendas',
      slug: 'tecnicas-vendas',
      description: 'Estratégias e métodos para aumentar vendas',
      color: '#3B82F6',
      postCount: 15,
      createdAt: '2024-01-01'
    },
    {
      id: '2',
      name: 'Gestão de Objeções',
      slug: 'gestao-objecoes',
      description: 'Como lidar com objeções de clientes',
      color: '#EF4444',
      postCount: 8,
      createdAt: '2024-01-05'
    },
    {
      id: '3',
      name: 'Vendas Consultivas',
      slug: 'vendas-consultivas',
      description: 'Abordagem consultiva em vendas',
      color: '#10B981',
      postCount: 12,
      createdAt: '2024-01-10'
    },
    {
      id: '4',
      name: 'Liderança Comercial',
      slug: 'lideranca-comercial',
      description: 'Gestão e liderança de equipes comerciais',
      color: '#F59E0B',
      postCount: 6,
      createdAt: '2024-01-15'
    }
  ]);

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handleSaveCategory = (categoryData: Omit<BlogCategory, 'id' | 'postCount' | 'createdAt'>) => {
    if (editingCategory) {
      setCategories(prev =>
        prev.map(cat =>
          cat.id === editingCategory.id
            ? { ...editingCategory, ...categoryData }
            : cat
        )
      );
      toast({
        title: 'Categoria atualizada',
        description: 'A categoria foi atualizada com sucesso.',
      });
    } else {
      const newCategory: BlogCategory = {
        ...categoryData,
        id: Date.now().toString(),
        postCount: 0,
        createdAt: new Date().toISOString().split('T')[0]
      };
      setCategories(prev => [...prev, newCategory]);
      toast({
        title: 'Categoria criada',
        description: 'A categoria foi criada com sucesso.',
      });
    }
    
    setIsDialogOpen(false);
    setEditingCategory(null);
  };

  const handleDeleteCategory = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    
    if (category && category.postCount > 0) {
      toast({
        title: 'Não é possível excluir',
        description: 'Esta categoria possui artigos associados.',
        variant: 'destructive'
      });
      return;
    }

    if (window.confirm('Tem certeza que deseja excluir esta categoria?')) {
      setCategories(prev => prev.filter(cat => cat.id !== categoryId));
      toast({
        title: 'Categoria removida',
        description: 'A categoria foi removida com sucesso.',
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Categorias do Blog</h2>
          <p className="text-gray-600">Gerencie as categorias dos artigos</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              className="bg-blue-900 hover:bg-blue-800"
              onClick={() => setEditingCategory(null)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Nova Categoria
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingCategory ? 'Editar Categoria' : 'Nova Categoria'}
              </DialogTitle>
            </DialogHeader>
            <CategoryForm
              category={editingCategory}
              onSave={handleSaveCategory}
              onCancel={() => {
                setIsDialogOpen(false);
                setEditingCategory(null);
              }}
              generateSlug={generateSlug}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Tag className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Total de Categorias</p>
                <p className="text-2xl font-bold">{categories.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Tag className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Total de Posts</p>
                <p className="text-2xl font-bold">{categories.reduce((sum, cat) => sum + cat.postCount, 0)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Tag className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-sm text-gray-600">Categoria Popular</p>
                <p className="text-sm font-bold">
                  {categories.reduce((prev, current) => 
                    prev.postCount > current.postCount ? prev : current
                  ).name}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Tag className="h-8 w-8 text-orange-600" />
              <div>
                <p className="text-sm text-gray-600">Média Posts/Cat</p>
                <p className="text-2xl font-bold">
                  {Math.round(categories.reduce((sum, cat) => sum + cat.postCount, 0) / categories.length)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Categories List */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Categorias</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {categories.map((category) => (
              <div key={category.id} className="p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: category.color }}
                    />
                    <div>
                      <h3 className="font-semibold">{category.name}</h3>
                      <p className="text-sm text-gray-500">/{category.slug}</p>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setEditingCategory(category);
                        setIsDialogOpen(true);
                      }}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteCategory(category.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 mb-3">{category.description}</p>
                
                <div className="flex justify-between items-center text-xs text-gray-500">
                  <Badge variant="outline">
                    {category.postCount} posts
                  </Badge>
                  <span>Criada em {new Date(category.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Category Form Component
const CategoryForm: React.FC<{
  category?: BlogCategory | null;
  onSave: (category: any) => void;
  onCancel: () => void;
  generateSlug: (name: string) => string;
}> = ({ category, onSave, onCancel, generateSlug }) => {
  const [formData, setFormData] = useState({
    name: category?.name || '',
    slug: category?.slug || '',
    description: category?.description || '',
    color: category?.color || '#3B82F6'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleNameChange = (name: string) => {
    setFormData({
      ...formData,
      name,
      slug: formData.slug === generateSlug(formData.name) || !formData.slug 
        ? generateSlug(name) 
        : formData.slug
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Nome da Categoria</label>
        <Input
          value={formData.name}
          onChange={(e) => handleNameChange(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Slug (URL)</label>
        <Input
          value={formData.slug}
          onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Descrição</label>
        <Textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={3}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Cor</label>
        <div className="flex space-x-2">
          <Input
            type="color"
            value={formData.color}
            onChange={(e) => setFormData({ ...formData, color: e.target.value })}
            className="w-20"
          />
          <Input
            value={formData.color}
            onChange={(e) => setFormData({ ...formData, color: e.target.value })}
            placeholder="#3B82F6"
          />
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" className="bg-blue-900 hover:bg-blue-800">
          {category ? 'Atualizar' : 'Criar'} Categoria
        </Button>
      </div>
    </form>
  );
};

export default CategoryManager;


import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import CategoryManager from '@/components/admin/CategoryManager';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useBlogActions } from '@/hooks/useBlogActions';
import { BlogPost } from '@/types/blog';
import { Plus, Edit, Trash2, Eye, Search, FileText, Tag } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const BlogManager = () => {
  const { posts, createPost, updatePost, deletePost } = useBlogActions();
  const { toast } = useToast();
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreatePost = (postData: Omit<BlogPost, 'id'>) => {
    createPost(postData);
    setIsDialogOpen(false);
    setEditingPost(null);
  };

  const handleUpdatePost = (postData: BlogPost) => {
    updatePost(postData);
    setIsDialogOpen(false);
    setEditingPost(null);
  };

  const handleDeletePost = (postId: string) => {
    if (window.confirm('Tem certeza que deseja excluir este artigo?')) {
      deletePost(postId);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Gestão de Blog</h1>
            <p className="text-gray-600">Gerencie artigos, categorias e conteúdos do blog</p>
          </div>
        </div>

        <Tabs defaultValue="posts" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="posts" className="flex items-center space-x-2">
              <FileText className="h-4 w-4" />
              <span>Artigos</span>
            </TabsTrigger>
            <TabsTrigger value="categories" className="flex items-center space-x-2">
              <Tag className="h-4 w-4" />
              <span>Categorias</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="posts" className="space-y-6">
            <div className="flex justify-between items-center">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Buscar artigos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button 
                    className="bg-blue-900 hover:bg-blue-800"
                    onClick={() => setEditingPost(null)}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Novo Artigo
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>
                      {editingPost ? 'Editar Artigo' : 'Criar Novo Artigo'}
                    </DialogTitle>
                  </DialogHeader>
                  <BlogEditor
                    post={editingPost}
                    onSave={editingPost ? handleUpdatePost : handleCreatePost}
                    onCancel={() => {
                      setIsDialogOpen(false);
                      setEditingPost(null);
                    }}
                  />
                </DialogContent>
              </Dialog>
            </div>

            {/* Posts List */}
            <Card>
              <CardHeader>
                <CardTitle>Artigos ({filteredPosts.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredPosts.map((post) => (
                    <div key={post.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-semibold">{post.title}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            post.published 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {post.published ? 'Publicado' : 'Rascunho'}
                          </span>
                          {post.featured && (
                            <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                              Destaque
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{post.excerpt}</p>
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <span>{post.date}</span>
                          <span>{post.category}</span>
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.open(`/blog/${post.slug}`, '_blank')}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setEditingPost(post);
                            setIsDialogOpen(true);
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeletePost(post.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="categories">
            <CategoryManager />
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

// Blog Editor Component
const BlogEditor: React.FC<{
  post?: BlogPost | null;
  onSave: (post: any) => void;
  onCancel: () => void;
}> = ({ post, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: post?.title || '',
    slug: post?.slug || '',
    excerpt: post?.excerpt || '',
    content: post?.content || '',
    category: post?.category || '',
    tags: post?.tags?.join(', ') || '',
    image: post?.image || '',
    published: post?.published || false,
    featured: post?.featured || false,
    author: post?.author || 'Beatriz Chavier',
    readTime: post?.readTime || '5 min',
  });

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const postData = {
      ...formData,
      slug: formData.slug || generateSlug(formData.title),
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
      date: post?.date || new Date().toISOString().split('T')[0],
    };

    onSave(post ? { ...post, ...postData } : postData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Título</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => {
              setFormData({
                ...formData,
                title: e.target.value,
                slug: generateSlug(e.target.value)
              });
            }}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Slug (URL)</label>
          <input
            type="text"
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Resumo</label>
        <textarea
          value={formData.excerpt}
          onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={3}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Conteúdo</label>
        <textarea
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={10}
          required
        />
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Categoria</label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Selecione...</option>
            <option value="Técnicas de Vendas">Técnicas de Vendas</option>
            <option value="Gestão de Objeções">Gestão de Objeções</option>
            <option value="Vendas Consultivas">Vendas Consultivas</option>
            <option value="Liderança Comercial">Liderança Comercial</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Tags (separadas por vírgula)</label>
          <input
            type="text"
            value={formData.tags}
            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="vendas, angola, estratégias"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Tempo de Leitura</label>
          <input
            type="text"
            value={formData.readTime}
            onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="5 min"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">URL da Imagem</label>
        <input
          type="url"
          value={formData.image}
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="https://..."
        />
      </div>

      <div className="flex items-center space-x-6">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={formData.published}
            onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
            className="mr-2"
          />
          Publicado
        </label>
        
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={formData.featured}
            onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
            className="mr-2"
          />
          Artigo em Destaque
        </label>
      </div>

      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" className="bg-blue-900 hover:bg-blue-800">
          {post ? 'Atualizar' : 'Criar'} Artigo
        </Button>
      </div>
    </form>
  );
};

export default BlogManager;

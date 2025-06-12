
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useBlogActions } from '@/hooks/useBlogActions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  BookOpen, 
  TrendingUp, 
  Users, 
  Target, 
  ArrowRight,
  Folder,
  BarChart3
} from 'lucide-react';
import SEOHead from '@/components/ui/seo-head';

const BlogCategories = () => {
  const { categories, posts } = useBlogActions();
  
  const categoryIcons = {
    'Técnicas de Vendas': Target,
    'Gestão de Objeções': Users,
    'Vendas Consultivas': BookOpen,
    'Liderança Comercial': BarChart3,
  };

  const categoryColors = {
    'Técnicas de Vendas': 'from-blue-500 to-blue-700',
    'Gestão de Objeções': 'from-orange-500 to-orange-700',
    'Vendas Consultivas': 'from-green-500 to-green-700',
    'Liderança Comercial': 'from-purple-500 to-purple-700',
  };

  const getRecentPostsForCategory = (categoryName: string) => {
    return posts
      .filter(post => post.category === categoryName && post.published)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 3);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SEOHead 
        title="Categorias - Blog Beasell | Tópicos de Vendas"
        description="Explore todas as categorias do blog Beasell: técnicas de vendas, gestão de objeções, vendas consultivas e liderança comercial."
        keywords="categorias blog vendas, tópicos vendas angola, técnicas vendas, gestão objeções"
        url="https://beasell.ao/blog/categorias"
      />
      
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-blue-900 via-blue-800 to-orange-600">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 mb-6">
              <Folder className="h-5 w-5 text-white" />
              <span className="text-white font-medium">Explorar por Categoria</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Categorias do <span className="text-orange-400">Blog</span>
            </h1>
            
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed">
              Descubra conteúdo especializado organizado por temas. 
              Cada categoria oferece insights práticos para seu crescimento profissional.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/blog">
                <Button size="lg" className="bg-white text-blue-900 hover:bg-gray-100 px-8 py-3">
                  Ver Todos os Artigos
                </Button>
              </Link>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-blue-900 px-8 py-3"
              >
                Newsletter Gratuita
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Explore por <span className="text-orange-500">Categoria</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Cada categoria foi cuidadosamente estruturada para oferecer 
              conhecimento progressivo e prático.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {categories.map((category) => {
              const IconComponent = categoryIcons[category.name] || BookOpen;
              const gradientColor = categoryColors[category.name] || 'from-gray-500 to-gray-700';
              const recentPosts = getRecentPostsForCategory(category.name);
              
              return (
                <Card key={category.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 overflow-hidden">
                  {/* Category Header */}
                  <div className={`bg-gradient-to-r ${gradientColor} p-6 text-white relative overflow-hidden`}>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-4">
                        <IconComponent className="h-8 w-8" />
                        <Badge variant="secondary" className="bg-white/20 text-white border-0">
                          {category.count} artigos
                        </Badge>
                      </div>
                      <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                      <p className="text-white/90 text-sm">
                        {category.name === 'Técnicas de Vendas' && 'Estratégias práticas e métodos comprovados para aumentar suas vendas'}
                        {category.name === 'Gestão de Objeções' && 'Como superar resistências e transformar objeções em oportunidades'}
                        {category.name === 'Vendas Consultivas' && 'Abordagem consultiva para construir relacionamentos duradouros'}
                        {category.name === 'Liderança Comercial' && 'Desenvolvimento de líderes e gestão de equipas comerciais'}
                      </p>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    {/* Recent Posts Preview */}
                    {recentPosts.length > 0 && (
                      <div className="mb-6">
                        <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                          <TrendingUp className="h-4 w-4 mr-2 text-orange-500" />
                          Artigos Recentes
                        </h4>
                        <div className="space-y-3">
                          {recentPosts.map((post) => (
                            <Link 
                              key={post.id} 
                              to={`/blog/${post.slug}`}
                              className="block group/post"
                            >
                              <div className="flex items-start space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                                <div className="flex-1">
                                  <h5 className="text-sm font-medium text-gray-900 group-hover/post:text-blue-900 line-clamp-2 leading-relaxed">
                                    {post.title}
                                  </h5>
                                  <div className="flex items-center space-x-2 mt-1 text-xs text-gray-500">
                                    <span>{new Date(post.date).toLocaleDateString('pt-AO')}</span>
                                    <span>•</span>
                                    <span>{post.readTime}</span>
                                  </div>
                                </div>
                                <ArrowRight className="h-4 w-4 text-gray-400 group-hover/post:text-blue-900 transition-colors" />
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}

                    <Link to={`/blog/categoria/${category.slug}`}>
                      <Button className="w-full group bg-gray-900 hover:bg-blue-900">
                        Explorar {category.name}
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-900 to-orange-500">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Pronto para Acelerar suas Vendas?
          </h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Explore todo o nosso conteúdo ou comece com os artigos mais populares
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/blog">
              <Button size="lg" className="bg-white text-blue-900 hover:bg-gray-100">
                Ver Todos os Artigos
              </Button>
            </Link>
            <Link to="/contacto">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-900">
                Falar com Especialista
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BlogCategories;

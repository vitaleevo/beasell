
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, User, ArrowRight, Download, BookOpen } from 'lucide-react';
import { useBlogActions } from '@/hooks/useBlogActions';

const Blog = () => {
  const { posts, getFeaturedPosts } = useBlogActions();
  
  const featuredPosts = getFeaturedPosts().slice(0, 3);

  const resources = [
    {
      title: "Guia Completo de Vendas B2B",
      description: "Manual prático com todas as técnicas essenciais para vendas empresariais",
      type: "PDF",
      size: "2.5 MB"
    },
    {
      title: "Checklist do Vendedor de Sucesso",
      description: "Lista de verificação diária para maximizar sua performance comercial",
      type: "PDF",
      size: "1.2 MB"
    },
    {
      title: "Scripts de Abordagem Telefónica",
      description: "Modelos testados para primeiros contactos e follow-ups eficazes",
      type: "DOC",
      size: "800 KB"
    }
  ];

  return (
    <section id="blog" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Blog e <span className="text-brand-blue">Recursos</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Conteúdos exclusivos sobre vendas, estratégias comerciais e dicas práticas para o mercado angolano
          </p>
        </div>

        {/* Featured Articles */}
        <div className="grid lg:grid-cols-3 gap-6 mb-12">
          {featuredPosts.map((article, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="relative h-40 overflow-hidden rounded-t-lg">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute top-3 left-3 bg-brand-blue text-white px-2 py-1 rounded-full text-xs font-semibold">
                  {article.category}
                </div>
              </div>
              
              <CardHeader className="pb-2">
                <CardTitle className="text-base leading-tight hover:text-brand-blue transition-colors">
                  {article.title}
                </CardTitle>
                <p className="text-gray-600 text-xs line-clamp-3">{article.excerpt}</p>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {article.date}
                    </div>
                    <div className="flex items-center">
                      <User className="h-3 w-3 mr-1" />
                      {article.author}
                    </div>
                  </div>
                  <span>{article.readTime}</span>
                </div>
                
                <Button variant="outline" size="sm" className="w-full group">
                  Ler Artigo
                  <ArrowRight className="h-3 w-3 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Free Resources Section */}
        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Recursos Gratuitos</h3>
              <p className="text-base text-gray-600 mb-6">
                Materiais exclusivos para potencializar suas vendas. Downloads gratuitos 
                com conteúdo de qualidade profissional.
              </p>
              
              <div className="space-y-3">
                {resources.map((resource, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center">
                      <div className="bg-brand-orange p-2 rounded-lg mr-3">
                        <Download className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 text-sm">{resource.title}</h4>
                        <p className="text-xs text-gray-600">{resource.description}</p>
                        <span className="text-xs text-gray-500">{resource.type} • {resource.size}</span>
                      </div>
                    </div>
                    <Button size="sm" className="bg-brand-blue hover:bg-brand-blue-800 text-white text-xs px-3 py-1.5">
                      Download
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative flex justify-center">
              <img
                src="/lovable-uploads/bbac2429-c045-4267-9d9b-763feb318cf6.png"
                alt="Recursos de formação Beasell"
                className="w-full h-auto rounded-xl shadow-lg object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl"></div>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-12 bg-gradient-to-r from-brand-blue to-brand-orange rounded-2xl p-6 md:p-8 text-center">
          <BookOpen className="h-12 w-12 text-white mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-white mb-3">
            Mantenha-se Actualizado
          </h3>
          <p className="text-base text-blue-100 mb-6 max-w-2xl mx-auto">
            Receba semanalmente dicas exclusivas, estudos de caso e novidades do mundo das vendas
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Seu melhor email"
              className="flex-1 px-3 py-2 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white text-sm"
            />
            <Button className="bg-white text-brand-blue hover:bg-gray-100 px-6 py-2 text-sm">
              Subscrever
            </Button>
          </div>
          
          <p className="text-xs text-blue-200 mt-3">
            Sem spam. Cancele a qualquer momento.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Blog;

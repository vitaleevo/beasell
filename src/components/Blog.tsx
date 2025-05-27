
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, User, ArrowRight, Download, BookOpen } from 'lucide-react';

const Blog = () => {
  const articles = [
    {
      title: "5 Técnicas de Vendas que Funcionam no Mercado Angolano",
      excerpt: "Descubra as estratégias mais eficazes para vender no contexto empresarial angolano, considerando aspectos culturais e económicos únicos.",
      date: "15 Nov 2024",
      author: "Beatriz Chavier",
      category: "Técnicas de Vendas",
      readTime: "5 min",
      image: "/lovable-uploads/0f26bbc2-4602-4f2a-9463-fdbec24a219c.png"
    },
    {
      title: "Como Superar Objeções de Preço em Tempos Difíceis",
      excerpt: "Estratégias práticas para lidar com resistências de preço e demonstrar valor aos seus clientes, mesmo em períodos económicos desafiantes.",
      date: "10 Nov 2024",
      author: "Beatriz Chavier",
      category: "Gestão de Objeções",
      readTime: "7 min",
      image: "/lovable-uploads/edf977c0-1468-4d0e-8889-3ded3ae4f4fa.png"
    },
    {
      title: "Vendas Consultivas: O Futuro do Sector Comercial",
      excerpt: "Aprenda como a abordagem consultiva pode revolucionar seus resultados de vendas e criar relacionamentos duradouros com clientes.",
      date: "5 Nov 2024",
      author: "Beatriz Chavier",
      category: "Vendas Consultivas",
      readTime: "6 min",
      image: "/lovable-uploads/fefff98b-a12c-4507-aa3f-9771c4fdb416.png"
    }
  ];

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
    <section id="blog" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Blog e <span className="text-blue-900">Recursos</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Conteúdos exclusivos sobre vendas, estratégias comerciais e dicas práticas para o mercado angolano
          </p>
        </div>

        {/* Featured Articles */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {articles.map((article, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="relative h-48 overflow-hidden rounded-t-lg">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 bg-blue-900 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  {article.category}
                </div>
              </div>
              
              <CardHeader>
                <CardTitle className="text-lg leading-tight hover:text-blue-900 transition-colors">
                  {article.title}
                </CardTitle>
                <p className="text-gray-600 text-sm line-clamp-3">{article.excerpt}</p>
              </CardHeader>
              
              <CardContent>
                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <div className="flex items-center space-x-4">
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
                
                <Button variant="outline" className="w-full group">
                  Ler Artigo
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Free Resources Section */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">Recursos Gratuitos</h3>
              <p className="text-lg text-gray-600 mb-8">
                Materiais exclusivos para potencializar suas vendas. Downloads gratuitos 
                com conteúdo de qualidade profissional.
              </p>
              
              <div className="space-y-4">
                {resources.map((resource, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center">
                      <div className="bg-orange-500 p-2 rounded-lg mr-4">
                        <Download className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{resource.title}</h4>
                        <p className="text-sm text-gray-600">{resource.description}</p>
                        <span className="text-xs text-gray-500">{resource.type} • {resource.size}</span>
                      </div>
                    </div>
                    <Button size="sm" className="bg-blue-900 hover:bg-blue-800 text-white">
                      Download
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <img
                src="/lovable-uploads/bbac2429-c045-4267-9d9b-763feb318cf6.png"
                alt="Recursos de formação Beasell"
                className="w-full h-auto rounded-xl shadow-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl"></div>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-16 bg-gradient-to-r from-blue-900 to-orange-500 rounded-3xl p-8 md:p-12 text-center">
          <BookOpen className="h-16 w-16 text-white mx-auto mb-6" />
          <h3 className="text-3xl font-bold text-white mb-4">
            Mantenha-se Actualizado
          </h3>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Receba semanalmente dicas exclusivas, estudos de caso e novidades do mundo das vendas
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Seu melhor email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <Button className="bg-white text-blue-900 hover:bg-gray-100 px-8 py-3">
              Subscrever
            </Button>
          </div>
          
          <p className="text-sm text-blue-200 mt-4">
            Sem spam. Cancele a qualquer momento.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Blog;

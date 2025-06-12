import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useBlogActions } from '@/hooks/useBlogActions';
import { ArrowRight, TrendingUp, BookOpen, Users, ChevronLeft, ChevronRight, Calendar, Clock } from 'lucide-react';
const EnhancedBlogHero = () => {
  const {
    getFeaturedPosts
  } = useBlogActions();
  const [currentSlide, setCurrentSlide] = useState(0);
  const featuredPosts = getFeaturedPosts();
  useEffect(() => {
    if (featuredPosts.length > 1) {
      const timer = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % featuredPosts.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [featuredPosts.length]);
  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % featuredPosts.length);
  };
  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + featuredPosts.length) % featuredPosts.length);
  };
  const currentPost = featuredPosts[currentSlide];
  return <section className="pt-24 pb-16 bg-gradient-to-br from-blue-900 via-blue-800 to-orange-600 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-48 -translate-y-48"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-400 rounded-full translate-x-48 translate-y-48"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 py-[62px]">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 mb-6">
              <BookOpen className="h-5 w-5 text-white" />
              <span className="text-white font-medium">Blog Especializado</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Insights de <span className="text-orange-400">Vendas</span>
            </h1>
            
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              Conteúdo exclusivo, estratégias práticas e técnicas comprovadas 
              para acelerar seus resultados comerciais
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">50+</div>
                <div className="text-blue-200 text-sm">Artigos Publicados</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">10K+</div>
                <div className="text-blue-200 text-sm">Leitores Mensais</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">4</div>
                <div className="text-blue-200 text-sm">Categorias</div>
              </div>
            </div>
          </div>

          {/* Featured Article Carousel */}
          {currentPost && <div className="max-w-5xl mx-auto">
              <Card className="border-0 shadow-2xl overflow-hidden bg-white/95 backdrop-blur-sm">
                <div className="grid lg:grid-cols-2 gap-0">
                  {/* Image */}
                  <div className="relative h-64 lg:h-96 overflow-hidden">
                    <img src={currentPost.image} alt={currentPost.title} className="w-full h-full object-cover" />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-orange-500 text-white">
                        Em Destaque
                      </Badge>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent lg:hidden"></div>
                  </div>

                  {/* Content */}
                  <CardContent className="p-8 flex flex-col justify-center">
                    <Badge variant="outline" className="w-fit mb-4">
                      {currentPost.category}
                    </Badge>
                    
                    <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                      {currentPost.title}
                    </h2>
                    
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {currentPost.excerpt}
                    </p>

                    <div className="flex items-center space-x-4 text-sm text-gray-500 mb-6">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(currentPost.date).toLocaleDateString('pt-AO')}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {currentPost.readTime}
                      </div>
                    </div>
                    
                    <Link to={`/blog/${currentPost.slug}`}>
                      <Button size="lg" className="bg-blue-900 hover:bg-blue-800 group">
                        Ler Artigo Completo
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </CardContent>
                </div>

                {/* Carousel Controls */}
                {featuredPosts.length > 1 && <>
                    <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all z-10">
                      <ChevronLeft className="h-5 w-5 text-gray-700" />
                    </button>
                    <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all z-10">
                      <ChevronRight className="h-5 w-5 text-gray-700" />
                    </button>

                    {/* Dots Indicator */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                      {featuredPosts.map((_, index) => <button key={index} onClick={() => setCurrentSlide(index)} className={`w-2 h-2 rounded-full transition-all ${index === currentSlide ? 'bg-orange-500 w-6' : 'bg-white/50'}`} />)}
                    </div>
                  </>}
              </Card>
            </div>}

          {/* Quick Links */}
          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/blog/categorias">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-900 bg-white/10 backdrop-blur-sm">
                <TrendingUp className="mr-2 h-4 w-4" />
                Explorar Categorias
              </Button>
            </Link>
            <Link to="/contacto">
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600">
                <Users className="mr-2 h-4 w-4" />
                Falar com Especialista
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>;
};
export default EnhancedBlogHero;
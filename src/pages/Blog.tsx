
import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import EnhancedBlogHero from '../components/blog/EnhancedBlogHero';
import EnhancedPostCard from '@/components/blog/EnhancedPostCard';
import SearchBar from '@/components/blog/SearchBar';
import BlogFilters from '@/components/blog/BlogFilters';
import PopularPosts from '@/components/blog/PopularPosts';
import CategoriesWidget from '@/components/blog/CategoriesWidget';
import { useBlogActions } from '@/hooks/useBlogActions';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Archive, Rss, BookOpen, Download, TrendingUp, Grid, Layers } from 'lucide-react';
import SEOHead from '@/components/ui/seo-head';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const BlogPage = () => {
  const { posts, categories } = useBlogActions();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedReadTime, setSelectedReadTime] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  const publishedPosts = posts.filter(post => post.published);

  // Filter posts based on search and filters
  const filteredPosts = publishedPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === '' || 
                           categories.find(cat => cat.slug === selectedCategory)?.name === post.category;
    
    const matchesYear = selectedYear === '' || 
                       new Date(post.date).getFullYear().toString() === selectedYear;
    
    const matchesReadTime = selectedReadTime === '' || 
                           (selectedReadTime === 'quick' && parseInt(post.readTime) <= 3) ||
                           (selectedReadTime === 'medium' && parseInt(post.readTime) >= 4 && parseInt(post.readTime) <= 7) ||
                           (selectedReadTime === 'long' && parseInt(post.readTime) >= 8);

    return matchesSearch && matchesCategory && matchesYear && matchesReadTime;
  });

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const paginatedPosts = filteredPosts.slice(startIndex, startIndex + postsPerPage);

  const handleReset = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setSelectedYear('');
    setSelectedReadTime('');
    setCurrentPage(1);
  };

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
    <div className="min-h-screen bg-white">
      <SEOHead 
        title="Blog - Beasell | Dicas e Estratégias de Vendas"
        description="Acesse artigos especializados sobre vendas, técnicas comerciais e desenvolvimento profissional. Blog da Beasell com conteúdo exclusivo."
        keywords="blog vendas angola, dicas vendas, estratégias comerciais, artigos vendas, técnicas vendas luanda"
        url="https://beasell.ao/blog"
      />
      
      <Header />
      <EnhancedBlogHero />
      
      {/* Quick Navigation */}
      <section className="py-8 bg-gray-50 border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/blog/categorias">
              <Button variant="outline" className="group">
                <Grid className="h-4 w-4 mr-2" />
                Todas as Categorias
              </Button>
            </Link>
            <Link to="/blog/arquivo">
              <Button variant="outline" className="group">
                <Archive className="h-4 w-4 mr-2" />
                Arquivo do Blog
              </Button>
            </Link>
            <Button variant="outline" className="group">
              <Rss className="h-4 w-4 mr-2" />
              RSS Feed
            </Button>
            <Button variant="outline" className="group">
              <TrendingUp className="h-4 w-4 mr-2" />
              Trending
            </Button>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          {/* Main Content */}
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Main Content Area */}
            <div className="lg:col-span-3">
              {/* Search and Navigation */}
              <div className="mb-8">
                <div className="flex flex-wrap items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                      <Layers className="h-6 w-6 mr-2 text-orange-500" />
                      Todos os Artigos
                    </h2>
                    <p className="text-gray-600 mt-1">
                      {filteredPosts.length} {filteredPosts.length === 1 ? 'artigo encontrado' : 'artigos encontrados'}
                    </p>
                  </div>
                </div>
                
                <SearchBar onSearch={setSearchQuery} />
              </div>

              {/* Results */}
              {paginatedPosts.length > 0 ? (
                <>
                  <div className="grid md:grid-cols-2 gap-8 mb-12">
                    {paginatedPosts.map((post) => (
                      <EnhancedPostCard key={post.id} post={post} />
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <Pagination className="mt-12">
                      <PaginationContent>
                        {currentPage > 1 && (
                          <PaginationItem>
                            <PaginationPrevious 
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                setCurrentPage(currentPage - 1);
                              }}
                            />
                          </PaginationItem>
                        )}
                        
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                          <PaginationItem key={page}>
                            <PaginationLink
                              href="#"
                              isActive={page === currentPage}
                              onClick={(e) => {
                                e.preventDefault();
                                setCurrentPage(page);
                              }}
                            >
                              {page}
                            </PaginationLink>
                          </PaginationItem>
                        ))}
                        
                        {currentPage < totalPages && (
                          <PaginationItem>
                            <PaginationNext 
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                setCurrentPage(currentPage + 1);
                              }}
                            />
                          </PaginationItem>
                        )}
                      </PaginationContent>
                    </Pagination>
                  )}
                </>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-600 mb-4">
                    Nenhum artigo encontrado com os filtros aplicados.
                  </p>
                  <Button variant="outline" onClick={handleReset}>
                    Limpar Filtros
                  </Button>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-8">
                {/* Filters */}
                <BlogFilters
                  categories={categories}
                  selectedCategory={selectedCategory}
                  selectedYear={selectedYear}
                  selectedReadTime={selectedReadTime}
                  onCategoryChange={setSelectedCategory}
                  onYearChange={setSelectedYear}
                  onReadTimeChange={setSelectedReadTime}
                  onReset={handleReset}
                />

                {/* Popular Posts */}
                <PopularPosts posts={publishedPosts} />

                {/* Categories */}
                <CategoriesWidget categories={categories} />
              </div>
            </div>
          </div>

          {/* Free Resources Section */}
          <div className="mt-16 bg-white rounded-2xl p-6 md:p-8 shadow-lg">
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
                        <div className="bg-orange-500 p-2 rounded-lg mr-3">
                          <Download className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 text-sm">{resource.title}</h4>
                          <p className="text-xs text-gray-600">{resource.description}</p>
                          <span className="text-xs text-gray-500">{resource.type} • {resource.size}</span>
                        </div>
                      </div>
                      <Button size="sm" className="bg-blue-900 hover:bg-blue-800 text-white text-xs px-3 py-1.5">
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
          <div className="mt-12 bg-gradient-to-r from-blue-900 to-orange-500 rounded-2xl p-6 md:p-8 text-center">
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
              <Button className="bg-white text-blue-900 hover:bg-gray-100 px-6 py-2 text-sm">
                Subscrever
              </Button>
            </div>
            
            <p className="text-xs text-blue-200 mt-3">
              Sem spam. Cancele a qualquer momento.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BlogPage;

import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useBlogActions } from '@/hooks/useBlogActions';
import PostCard from '@/components/blog/PostCard';
import SearchBar from '@/components/blog/SearchBar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Folder } from 'lucide-react';
import SEOHead from '@/components/ui/seo-head';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const ContentCategory = () => {
  const { slug } = useParams<{ slug: string }>();
  const { getPostsByCategory, categories } = useBlogActions();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  const category = categories.find(cat => cat.slug === slug);
  const allCategoryPosts = slug ? getPostsByCategory(category?.name || '') : [];
  
  const filteredPosts = allCategoryPosts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const paginatedPosts = filteredPosts.slice(startIndex, startIndex + postsPerPage);

  if (!category) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="pt-24 pb-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Categoria não encontrada</h1>
            <p className="text-gray-600 mb-8">A categoria que procura não existe.</p>
            <Link to="/conteudos">
              <Button className="bg-blue-900 hover:bg-blue-800">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar aos Conteúdos
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SEOHead 
        title={`${category.name} - Conteúdos Beasell`}
        description={`Artigos sobre ${category.name.toLowerCase()} nos conteúdos da Beasell. Material especializado em vendas e estratégias comerciais.`}
        keywords={`${category.name.toLowerCase()}, vendas angola, conteúdos beasell`}
        url={`https://beasell.ao/conteudos/categoria/${slug}`}
      />
      
      <Header />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Breadcrumbs */}
          <nav className="mb-8">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Link to="/" className="hover:text-blue-900">Início</Link>
              <span>/</span>
              <Link to="/conteudos" className="hover:text-blue-900">Conteúdos</Link>
              <span>/</span>
              <span className="text-gray-900">{category.name}</span>
            </div>
          </nav>

          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-blue-900 p-3 rounded-lg">
                <Folder className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-gray-900">{category.name}</h1>
                <p className="text-gray-600 mt-2">
                  {category.count} {category.count === 1 ? 'artigo' : 'artigos'} nesta categoria
                </p>
              </div>
            </div>
          </div>

          {/* Search */}
          <div className="mb-8">
            <SearchBar 
              onSearch={setSearchQuery}
              placeholder={`Pesquisar em ${category.name}...`}
            />
          </div>

          {/* Results */}
          {filteredPosts.length > 0 ? (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {paginatedPosts.map((post) => (
                  <PostCard key={post.id} post={post} />
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
                {searchQuery ? 'Nenhum artigo encontrado para sua pesquisa.' : 'Nenhum artigo nesta categoria ainda.'}
              </p>
              <Link to="/conteudos">
                <Button variant="outline">Ver Todos os Artigos</Button>
              </Link>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ContentCategory;

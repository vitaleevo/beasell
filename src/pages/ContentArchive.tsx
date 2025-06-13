import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useBlogActions } from '@/hooks/useBlogActions';
import PostCard from '@/components/blog/PostCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Calendar, BarChart3 } from 'lucide-react';
import SEOHead from '@/components/ui/seo-head';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const ContentArchive = () => {
  const { posts } = useBlogActions();
  const [selectedYear, setSelectedYear] = useState('all');
  const [selectedMonth, setSelectedMonth] = useState('all');

  const publishedPosts = posts.filter(post => post.published);
  
  // Get available years and months
  const years = [...new Set(publishedPosts.map(post => new Date(post.date).getFullYear()))].sort((a, b) => b - a);
  const months = [
    { value: '0', label: 'Janeiro' },
    { value: '1', label: 'Fevereiro' },
    { value: '2', label: 'Março' },
    { value: '3', label: 'Abril' },
    { value: '4', label: 'Maio' },
    { value: '5', label: 'Junho' },
    { value: '6', label: 'Julho' },
    { value: '7', label: 'Agosto' },
    { value: '8', label: 'Setembro' },
    { value: '9', label: 'Outubro' },
    { value: '10', label: 'Novembro' },
    { value: '11', label: 'Dezembro' }
  ];

  // Filter posts by year and month
  const filteredPosts = publishedPosts.filter(post => {
    const postDate = new Date(post.date);
    const yearMatch = selectedYear === 'all' || postDate.getFullYear().toString() === selectedYear;
    const monthMatch = selectedMonth === 'all' || postDate.getMonth().toString() === selectedMonth;
    return yearMatch && monthMatch;
  });

  // Group posts by year and month
  const groupedPosts = filteredPosts.reduce((acc, post) => {
    const date = new Date(post.date);
    const year = date.getFullYear();
    const month = date.getMonth();
    const key = `${year}-${month}`;
    
    if (!acc[key]) {
      acc[key] = {
        year,
        month,
        posts: []
      };
    }
    acc[key].posts.push(post);
    return acc;
  }, {} as Record<string, { year: number; month: number; posts: any[] }>);

  const sortedGroups = Object.values(groupedPosts).sort((a, b) => {
    if (a.year !== b.year) return b.year - a.year;
    return b.month - a.month;
  });

  const totalPosts = publishedPosts.length;
  const totalCategories = [...new Set(publishedPosts.map(post => post.category))].length;

  return (
    <div className="min-h-screen bg-gray-50">
      <SEOHead 
        title="Arquivo - Conteúdos Beasell"
        description="Explore todos os artigos dos conteúdos da Beasell organizados por data. Acesse nosso arquivo completo de material sobre vendas."
        keywords="arquivo conteúdos, artigos vendas, histórico conteúdos beasell"
        url="https://beasell.ao/conteudos/arquivo"
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
              <span className="text-gray-900">Arquivo</span>
            </div>
          </nav>

          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-blue-900 p-3 rounded-lg">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-gray-900">Arquivo de Conteúdos</h1>
                <p className="text-gray-600 mt-2">
                  Explore todos os nossos artigos organizados por data
                </p>
              </div>
            </div>

            {/* Statistics */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center space-x-3">
                  <BarChart3 className="h-8 w-8 text-blue-900" />
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{totalPosts}</h3>
                    <p className="text-gray-600">Total de Artigos</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center space-x-3">
                  <Calendar className="h-8 w-8 text-orange-500" />
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{years.length}</h3>
                    <p className="text-gray-600">Anos de Conteúdo</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center space-x-3">
                  <BarChart3 className="h-8 w-8 text-green-500" />
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{totalCategories}</h3>
                    <p className="text-gray-600">Categorias</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white p-6 rounded-lg shadow-sm border mb-8">
            <h3 className="font-semibold mb-4">Filtrar por período</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger>
                  <SelectValue placeholder="Todos os anos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os anos</SelectItem>
                  {years.map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                <SelectTrigger>
                  <SelectValue placeholder="Todos os meses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os meses</SelectItem>
                  {months.map((month) => (
                    <SelectItem key={month.value} value={month.value}>
                      {month.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button 
                variant="outline" 
                onClick={() => {
                  setSelectedYear('all');
                  setSelectedMonth('all');
                }}
              >
                Limpar Filtros
              </Button>
            </div>
          </div>

          {/* Archive Content */}
          {filteredPosts.length > 0 ? (
            <div className="space-y-12">
              {sortedGroups.map((group) => (
                <div key={`${group.year}-${group.month}`}>
                  <div className="flex items-center space-x-3 mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">
                      {months[group.month].label} {group.year}
                    </h2>
                    <Badge variant="secondary">
                      {group.posts.length} {group.posts.length === 1 ? 'artigo' : 'artigos'}
                    </Badge>
                  </div>
                  
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {group.posts.map((post) => (
                      <PostCard key={post.id} post={post} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">
                Nenhum artigo encontrado para o período selecionado.
              </p>
              <Button 
                variant="outline"
                onClick={() => {
                  setSelectedYear('all');
                  setSelectedMonth('all');
                }}
              >
                Ver Todos os Artigos
              </Button>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ContentArchive;

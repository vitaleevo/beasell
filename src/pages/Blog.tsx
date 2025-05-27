
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Blog from '../components/Blog';
import BlogHero from '../components/heroes/BlogHero';
import SEOHead from '../components/ui/seo-head';

const BlogPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <SEOHead 
        title="Blog - Beasell | Dicas e Estratégias de Vendas"
        description="Acesse artigos especializados sobre vendas, técnicas comerciais e desenvolvimento profissional. Blog da Beasell com conteúdo exclusivo."
        keywords="blog vendas angola, dicas vendas, estratégias comerciais, artigos vendas, técnicas vendas luanda"
        url="https://beasell.ao/blog"
      />
      
      <Header />
      <BlogHero />
      <Blog />
      <Footer />
    </div>
  );
};

export default BlogPage;


import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Blog from '../components/Blog';
import BlogHero from '../components/heroes/BlogHero';

const BlogPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <BlogHero />
      <Blog />
      <Footer />
    </div>
  );
};

export default BlogPage;

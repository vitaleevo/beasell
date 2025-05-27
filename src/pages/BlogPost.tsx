
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useBlogActions } from '@/hooks/useBlogActions';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Calendar, User, Clock, Share2, Facebook, Twitter, Linkedin, Copy, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import PostCard from '@/components/blog/PostCard';

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const { getPostBySlug, posts } = useBlogActions();
  const { toast } = useToast();
  
  const post = slug ? getPostBySlug(slug) : null;
  const relatedPosts = posts
    .filter(p => p.id !== post?.id && p.category === post?.category && p.published)
    .slice(0, 3);

  // Navigation between posts
  const allPosts = posts.filter(p => p.published).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const currentIndex = allPosts.findIndex(p => p.id === post?.id);
  const previousPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

  if (!post) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="pt-24 pb-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Artigo não encontrado</h1>
            <p className="text-gray-600 mb-8">O artigo que procura não existe ou foi removido.</p>
            <Link to="/blog">
              <Button className="bg-blue-900 hover:bg-blue-800">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar ao Blog
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const shareUrl = window.location.href;
  const shareTitle = post.title;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    toast({
      title: 'Link copiado!',
      description: 'O link do artigo foi copiado para a área de transferência.',
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Breadcrumbs */}
      <div className="pt-24 pb-4 bg-gray-50">
        <div className="container mx-auto px-4">
          <nav className="text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <Link to="/" className="hover:text-blue-900">Início</Link>
              <span>/</span>
              <Link to="/blog" className="hover:text-blue-900">Blog</Link>
              <span>/</span>
              <Link to={`/blog/categoria/${post.category.toLowerCase().replace(/\s+/g, '-')}`} className="hover:text-blue-900">
                {post.category}
              </Link>
              <span>/</span>
              <span className="text-gray-900 truncate">{post.title}</span>
            </div>
          </nav>
        </div>
      </div>

      {/* Article Header */}
      <div className="pb-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Link to="/blog" className="inline-flex items-center text-blue-900 hover:text-blue-700 mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar ao Blog
            </Link>
            
            <Badge variant="secondary" className="bg-blue-100 text-blue-800 mb-4">
              {post.category}
            </Badge>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8">
              <div className="flex items-center">
                <User className="h-4 w-4 mr-2" />
                {post.author}
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                {new Date(post.date).toLocaleDateString('pt-AO')}
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                {post.readTime}
              </div>
            </div>

            {/* Share Buttons - Top */}
            <div className="flex flex-wrap gap-2 mb-8">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank')}
              >
                <Facebook className="h-4 w-4 mr-2" />
                Facebook
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`, '_blank')}
              >
                <Twitter className="h-4 w-4 mr-2" />
                Twitter
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank')}
              >
                <Linkedin className="h-4 w-4 mr-2" />
                LinkedIn
              </Button>
              <Button variant="outline" size="sm" onClick={copyToClipboard}>
                <Copy className="h-4 w-4 mr-2" />
                Copiar Link
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-4 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-3">
                {post.image && (
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-96 object-cover rounded-xl shadow-lg mb-8"
                  />
                )}
                
                <div className="prose prose-lg max-w-none">
                  <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                    {post.excerpt}
                  </p>
                  
                  <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">
                    {post.content}
                  </div>
                </div>

                {/* Tags */}
                {post.tags.length > 0 && (
                  <div className="mt-12 pt-8 border-t">
                    <h3 className="text-lg font-semibold mb-4">Tags:</h3>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="cursor-pointer hover:bg-gray-100">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Share Buttons - Bottom */}
                <div className="mt-8 pt-8 border-t">
                  <h3 className="text-lg font-semibold mb-4">Partilhar este artigo:</h3>
                  <div className="flex flex-wrap gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank')}
                    >
                      <Facebook className="h-4 w-4 mr-2" />
                      Facebook
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`, '_blank')}
                    >
                      <Twitter className="h-4 w-4 mr-2" />
                      Twitter
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank')}
                    >
                      <Linkedin className="h-4 w-4 mr-2" />
                      LinkedIn
                    </Button>
                    <Button variant="outline" size="sm" onClick={copyToClipboard}>
                      <Copy className="h-4 w-4 mr-2" />
                      Copiar Link
                    </Button>
                  </div>
                </div>

                {/* Post Navigation */}
                <div className="mt-12 pt-8 border-t">
                  <div className="grid md:grid-cols-2 gap-6">
                    {previousPost && (
                      <Link to={`/blog/${previousPost.slug}`} className="group">
                        <div className="flex items-center space-x-3 p-4 rounded-lg border hover:shadow-md transition-shadow">
                          <ChevronLeft className="h-5 w-5 text-gray-400 group-hover:text-blue-900" />
                          <div>
                            <p className="text-sm text-gray-500 mb-1">Artigo anterior</p>
                            <h4 className="font-medium text-gray-900 group-hover:text-blue-900 line-clamp-2">
                              {previousPost.title}
                            </h4>
                          </div>
                        </div>
                      </Link>
                    )}
                    
                    {nextPost && (
                      <Link to={`/blog/${nextPost.slug}`} className="group">
                        <div className="flex items-center space-x-3 p-4 rounded-lg border hover:shadow-md transition-shadow">
                          <div className="flex-1">
                            <p className="text-sm text-gray-500 mb-1">Próximo artigo</p>
                            <h4 className="font-medium text-gray-900 group-hover:text-blue-900 line-clamp-2">
                              {nextPost.title}
                            </h4>
                          </div>
                          <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-blue-900" />
                        </div>
                      </Link>
                    )}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-8">
                  {/* Author Info */}
                  <Card>
                    <CardContent className="p-6 text-center">
                      <img
                        src="/lovable-uploads/c6346064-d31c-4824-978e-ae38c45567d3.png"
                        alt="Beatriz Chavier"
                        className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                      />
                      <h3 className="font-semibold text-gray-900 mb-2">Beatriz Chavier</h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Especialista em formação de vendas com mais de 10 anos de experiência no mercado angolano.
                      </p>
                      <Link to="/sobre">
                        <Button variant="outline" size="sm" className="w-full">
                          Ver Perfil
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>

                  {/* Newsletter */}
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-gray-900 mb-4">Newsletter</h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Receba dicas semanais sobre vendas direto no seu email.
                      </p>
                      <div className="space-y-3">
                        <input
                          type="email"
                          placeholder="Seu email"
                          className="w-full p-2 border rounded-lg text-sm"
                        />
                        <Button className="w-full bg-orange-500 hover:bg-orange-600 text-sm">
                          Subscrever
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <div className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                Artigos Relacionados
              </h2>
              
              <div className="grid md:grid-cols-3 gap-8">
                {relatedPosts.map((relatedPost) => (
                  <PostCard key={relatedPost.id} post={relatedPost} variant="compact" />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default BlogPost;

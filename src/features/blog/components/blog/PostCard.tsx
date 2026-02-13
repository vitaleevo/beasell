
import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';
import { Badge } from '@/shared/components/ui/badge';
import { Calendar, User, Clock, ArrowRight, Eye } from 'lucide-react';
import { BlogPost } from '@/shared/types/blog';

interface PostCardProps {
  post: BlogPost;
  variant?: 'default' | 'featured' | 'compact';
}

const PostCard = ({ post, variant = 'default' }: PostCardProps) => {
  const isCompact = variant === 'compact';
  const isFeatured = variant === 'featured';

  return (
    <Card className={`border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${isFeatured ? 'border-2 border-orange-200' : ''}`}>
      {!isCompact && (
        <div className={`relative overflow-hidden rounded-t-lg ${isFeatured ? 'h-64' : 'h-48'}`}>
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute top-3 left-3">
            <Badge variant="secondary" className="bg-blue-900 text-white">
              {post.category}
            </Badge>
          </div>
          {isFeatured && (
            <div className="absolute top-3 right-3">
              <Badge variant="secondary" className="bg-orange-500 text-white">
                Em Destaque
              </Badge>
            </div>
          )}
        </div>
      )}

      <CardHeader className={isCompact ? 'pb-2' : 'pb-3'}>
        {isCompact && (
          <Badge variant="outline" className="w-fit mb-2">
            {post.category}
          </Badge>
        )}
        <CardTitle className={`leading-tight hover:text-blue-900 transition-colors ${isFeatured ? 'text-xl' : 'text-lg'}`}>
          <Link href={`/conteudos/${post.slug}`}>
            {post.title}
          </Link>
        </CardTitle>
        <p className={`text-gray-600 line-clamp-3 ${isCompact ? 'text-sm' : 'text-base'}`}>
          {post.excerpt}
        </p>
      </CardHeader>

      <CardContent className="pt-0">
        <div className={`flex items-center justify-between text-gray-500 mb-4 ${isCompact ? 'text-xs' : 'text-sm'}`}>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Calendar className="h-3 w-3 mr-1" />
              {new Date(post.publishedAt).toLocaleDateString('pt-AO')}
            </div>
            <div className="flex items-center">
              <User className="h-3 w-3 mr-1" />
              {post.author}
            </div>
            <div className="flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              {post.readTime}
            </div>
          </div>
          {!isCompact && (
            <div className="flex items-center">
              <Eye className="h-3 w-3 mr-1" />
              {Math.floor(Math.random() * 500) + 100}
            </div>
          )}
        </div>

        <Link href={`/blog/${post.slug}`}>
          <Button variant="outline" size={isCompact ? "sm" : "default"} className="w-full group">
            Ler Artigo
            <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default PostCard;

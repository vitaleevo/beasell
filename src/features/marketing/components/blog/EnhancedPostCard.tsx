
import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader } from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';
import { Badge } from '@/shared/components/ui/badge';
import { Calendar, User, Clock, ArrowRight, Eye, Bookmark } from 'lucide-react';
import { BlogPost } from '@/shared/types/blog';

interface EnhancedPostCardProps {
  post: BlogPost;
  variant?: 'default' | 'featured' | 'compact' | 'large';
  showExcerpt?: boolean;
}

const EnhancedPostCard = ({
  post,
  variant = 'default',
  showExcerpt = true
}: EnhancedPostCardProps) => {
  const isCompact = variant === 'compact';
  const isFeatured = variant === 'featured';
  const isLarge = variant === 'large';

  const cardHeight = isLarge ? 'h-96' : isFeatured ? 'h-72' : 'h-56';

  return (
    <Card className={`group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border-0 overflow-hidden bg-white ${isFeatured ? 'ring-2 ring-orange-200 shadow-lg' : 'shadow-md'
      }`}>
      {/* Image Section */}
      {!isCompact && (
        <div className={`relative overflow-hidden ${cardHeight}`}>
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300"></div>

          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <Badge
              variant="secondary"
              className="bg-white/90 text-gray-900 backdrop-blur-sm hover:bg-white transition-colors"
            >
              {post.category}
            </Badge>
          </div>

          {/* Featured Badge */}
          {isFeatured && (
            <div className="absolute top-4 right-4">
              <Badge className="bg-orange-500 text-white shadow-lg">
                Em Destaque
              </Badge>
            </div>
          )}

          {/* Reading Stats */}
          <div className="absolute bottom-4 right-4 flex items-center space-x-3">
            <div className="flex items-center bg-black/40 backdrop-blur-sm rounded-full px-3 py-1">
              <Eye className="h-3 w-3 text-white mr-1" />
              <span className="text-white text-xs font-medium">
                {Math.floor(Math.random() * 500) + 100}
              </span>
            </div>
            <button className="bg-black/40 backdrop-blur-sm p-2 rounded-full hover:bg-black/60 transition-colors">
              <Bookmark className="h-3 w-3 text-white" />
            </button>
          </div>

          {/* Content Overlay for Large Variant */}
          {isLarge && (
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h3 className="text-2xl font-bold mb-2 leading-tight group-hover:text-orange-300 transition-colors">
                <Link href={`/blog/${post.slug}`}>
                  {post.title}
                </Link>
              </h3>
              <div className="flex items-center space-x-4 text-sm text-white/80">
                <div className="flex items-center">
                  <Calendar className="h-3 w-3 mr-1" />
                  {new Date(post.publishedAt).toLocaleDateString('pt-AO')}
                </div>
                <div className="flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  {post.readTime}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Content Section */}
      {!isLarge && (
        <div className="p-6">
          {/* Compact variant category */}
          {isCompact && (
            <Badge variant="outline" className="mb-3">
              {post.category}
            </Badge>
          )}

          {/* Title */}
          <h3 className={`font-bold leading-tight mb-3 group-hover:text-blue-900 transition-colors ${isFeatured ? 'text-xl' : 'text-lg'
            }`}>
            <Link href={`/blog/${post.slug}`} className="hover:underline">
              {post.title}
            </Link>
          </h3>

          {/* Excerpt */}
          {showExcerpt && (
            <p className={`text-gray-600 mb-4 leading-relaxed ${isCompact ? 'text-sm line-clamp-2' : 'line-clamp-3'
              }`}>
              {post.excerpt}
            </p>
          )}

          {/* Meta Information */}
          <div className={`flex items-center justify-between mb-4 ${isCompact ? 'text-xs' : 'text-sm'
            } text-gray-500`}>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <User className="h-3 w-3 mr-1" />
                {post.author}
              </div>
              <div className="flex items-center">
                <Calendar className="h-3 w-3 mr-1" />
                {new Date(post.publishedAt).toLocaleDateString('pt-AO')}
              </div>
              <div className="flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                {post.readTime}
              </div>
            </div>
          </div>

          {/* Read More Button */}
          <Link href={`/blog/${post.slug}`}>
            <Button
              variant="outline"
              size={isCompact ? "sm" : "default"}
              className="w-full group/btn border-gray-200 hover:border-blue-900 hover:bg-blue-900 hover:text-white transition-all duration-300"
            >
              Ler Artigo
              <ArrowRight className="h-4 w-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      )}

      {/* Large variant button */}
      {isLarge && (
        <div className="absolute bottom-6 left-6">
          <Link href={`/blog/${post.slug}`}>
            <Button className="bg-white text-gray-900 hover:bg-orange-500 hover:text-white transition-all duration-300 shadow-lg">
              Ler Artigo
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>
      )}
    </Card>
  );
};

export default EnhancedPostCard;


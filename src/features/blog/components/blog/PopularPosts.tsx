
import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Badge } from '@/shared/components/ui/badge';
import { TrendingUp, Eye } from 'lucide-react';
import { BlogPost } from '@/shared/types/blog';

interface PopularPostsProps {
  posts: BlogPost[];
}

const PopularPosts = ({ posts }: PopularPostsProps) => {
  const popularPosts = posts.slice(0, 5);

  return (
    <Card className="border-none shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center text-lg">
          <TrendingUp className="h-5 w-5 mr-2 text-orange-500" />
          Posts Populares
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {popularPosts.map((post, index) => (
            <div key={post._id} className="flex items-start space-x-3 group">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-900 text-white rounded-full flex items-center justify-center text-sm font-bold">
                {index + 1}
              </div>
              <div className="flex-1 min-w-0">
                <Link
                  href={`/conteudos/${post.slug}`}
                  className="block hover:text-blue-900 transition-colors"
                >
                  <h4 className="text-sm font-medium line-clamp-2 group-hover:text-blue-900">
                    {post.title}
                  </h4>
                </Link>
                <div className="flex items-center space-x-2 mt-1">
                  <Badge variant="secondary" className="text-xs bg-gray-100 border-none">
                    {post.category}
                  </Badge>
                  <div className="flex items-center text-xs text-gray-500">
                    <Eye className="h-3 w-3 mr-1" />
                    {Math.floor(Math.random() * 1000) + 500}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PopularPosts;

import React from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { Calendar, User, Clock, ArrowRight, Eye } from "lucide-react";
import { BlogPost } from "@/shared/types/blog";
import { getStableViewCount } from "@/shared/lib/post-metrics";
import { RemoteImageFrame } from "@/shared/components/ui/remote-image-frame";

interface PostCardProps {
  post: BlogPost;
  variant?: "default" | "featured" | "compact";
}

const PostCard = ({ post, variant = "default" }: PostCardProps) => {
  const isCompact = variant === "compact";
  const isFeatured = variant === "featured";

  return (
    <Card
      className={`border-0 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${isFeatured ? "border-2 border-orange-200" : ""}`}
    >
      {!isCompact && (
        <div className={`relative overflow-hidden rounded-t-lg ${isFeatured ? "h-64" : "h-48"}`}>
          <RemoteImageFrame src={post.image} alt={post.title} className="h-full w-full" />
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

      <CardHeader className={isCompact ? "pb-2" : "pb-3"}>
        {isCompact && (
          <Badge variant="outline" className="mb-2 w-fit">
            {post.category}
          </Badge>
        )}
        <CardTitle
          className={`leading-tight transition-colors hover:text-blue-900 ${isFeatured ? "text-xl" : "text-lg"}`}
        >
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </CardTitle>
        <p className={`line-clamp-3 text-gray-600 ${isCompact ? "text-sm" : "text-base"}`}>
          {post.excerpt}
        </p>
      </CardHeader>

      <CardContent className="pt-0">
        <div
          className={`mb-4 flex items-center justify-between text-gray-500 ${isCompact ? "text-xs" : "text-sm"}`}
        >
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Calendar className="mr-1 h-3 w-3" />
              {new Date(post.publishedAt).toLocaleDateString("pt-AO")}
            </div>
            <div className="flex items-center">
              <User className="mr-1 h-3 w-3" />
              {post.author}
            </div>
            <div className="flex items-center">
              <Clock className="mr-1 h-3 w-3" />
              {post.readTime}
            </div>
          </div>
          {!isCompact && (
            <div className="flex items-center">
              <Eye className="mr-1 h-3 w-3" />
              {getStableViewCount(post._id)}
            </div>
          )}
        </div>

        <Link href={`/blog/${post.slug}`}>
          <Button variant="outline" size={isCompact ? "sm" : "default"} className="group w-full">
            Ler Artigo
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default PostCard;

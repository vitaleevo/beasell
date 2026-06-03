import React from "react";
import Link from "next/link";
import { Card } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { Calendar, User, Clock, ArrowRight, Eye, Bookmark } from "lucide-react";
import { BlogPost } from "@/shared/types/blog";
import { getStableViewCount } from "@/shared/lib/post-metrics";
import { RemoteImageFrame } from "@/shared/components/ui/remote-image-frame";

interface EnhancedPostCardProps {
  post: BlogPost;
  variant?: "default" | "featured" | "compact" | "large";
  showExcerpt?: boolean;
}

const EnhancedPostCard = ({
  post,
  variant = "default",
  showExcerpt = true,
}: EnhancedPostCardProps) => {
  const isCompact = variant === "compact";
  const isFeatured = variant === "featured";
  const isLarge = variant === "large";

  const cardHeight = isLarge ? "h-96" : isFeatured ? "h-72" : "h-56";

  return (
    <Card
      className={`group overflow-hidden border-0 bg-white transition-all duration-500 hover:-translate-y-2 hover:shadow-xl ${
        isFeatured ? "shadow-lg ring-2 ring-orange-200" : "shadow-md"
      }`}
    >
      {/* Image Section */}
      {!isCompact && (
        <div className={`relative overflow-hidden ${cardHeight}`}>
          <RemoteImageFrame
            src={post.image}
            alt={post.title}
            className="h-full w-full transition-transform duration-500 group-hover:scale-105"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-40"></div>

          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <Badge
              variant="secondary"
              className="bg-white/90 text-gray-900 backdrop-blur-sm transition-colors hover:bg-white"
            >
              {post.category}
            </Badge>
          </div>

          {/* Featured Badge */}
          {isFeatured && (
            <div className="absolute top-4 right-4">
              <Badge className="bg-orange-500 text-white shadow-lg">Em Destaque</Badge>
            </div>
          )}

          {/* Reading Stats */}
          <div className="absolute right-4 bottom-4 flex items-center space-x-3">
            <div className="flex items-center rounded-full bg-black/40 px-3 py-1 backdrop-blur-sm">
              <Eye className="mr-1 h-3 w-3 text-white" />
              <span className="text-xs font-medium text-white">{getStableViewCount(post._id)}</span>
            </div>
            <button className="rounded-full bg-black/40 p-2 backdrop-blur-sm transition-colors hover:bg-black/60">
              <Bookmark className="h-3 w-3 text-white" />
            </button>
          </div>

          {/* Content Overlay for Large Variant */}
          {isLarge && (
            <div className="absolute right-0 bottom-0 left-0 p-6 text-white">
              <h3 className="mb-2 text-2xl leading-tight font-bold transition-colors group-hover:text-orange-300">
                <Link href={`/conteudos/${post.slug}`}>{post.title}</Link>
              </h3>
              <div className="flex items-center space-x-4 text-sm text-white/80">
                <div className="flex items-center">
                  <Calendar className="mr-1 h-3 w-3" />
                  {new Date(post.publishedAt).toLocaleDateString("pt-AO")}
                </div>
                <div className="flex items-center">
                  <Clock className="mr-1 h-3 w-3" />
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
            <Badge variant="secondary" className="mb-3 border-none bg-blue-50 text-blue-700">
              {post.category}
            </Badge>
          )}

          {/* Title */}
          <h3
            className={`mb-3 leading-tight font-bold transition-colors group-hover:text-blue-900 ${
              isFeatured ? "text-xl" : "text-lg"
            }`}
          >
            <Link href={`/conteudos/${post.slug}`} className="hover:underline">
              {post.title}
            </Link>
          </h3>

          {/* Excerpt */}
          {showExcerpt && (
            <p
              className={`mb-4 leading-relaxed text-gray-600 ${
                isCompact ? "line-clamp-2 text-sm" : "line-clamp-3"
              }`}
            >
              {post.excerpt}
            </p>
          )}

          {/* Meta Information */}
          <div
            className={`mb-4 flex items-center justify-between ${
              isCompact ? "text-xs" : "text-sm"
            } text-gray-500`}
          >
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <User className="mr-1 h-3 w-3" />
                {post.author}
              </div>
              <div className="flex items-center">
                <Calendar className="mr-1 h-3 w-3" />
                {new Date(post.publishedAt).toLocaleDateString("pt-AO")}
              </div>
              <div className="flex items-center">
                <Clock className="mr-1 h-3 w-3" />
                {post.readTime}
              </div>
            </div>
          </div>

          {/* Read More Button */}
          <Link href={`/conteudos/${post.slug}`}>
            <Button
              variant="outline"
              size={isCompact ? "sm" : "default"}
              className="group/btn w-full border-none bg-gray-50 shadow-sm transition-all duration-300 hover:bg-blue-900 hover:text-white"
            >
              Ler Artigo
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
            </Button>
          </Link>
        </div>
      )}

      {/* Large variant button */}
      {isLarge && (
        <div className="absolute bottom-6 left-6">
          <Link href={`/conteudos/${post.slug}`}>
            <Button className="bg-white text-gray-900 shadow-lg transition-all duration-300 hover:bg-orange-500 hover:text-white">
              Ler Artigo
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      )}
    </Card>
  );
};

export default EnhancedPostCard;

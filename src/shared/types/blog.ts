
export interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  tags: string[];
  image: string;
  isPublished: boolean;
  publishedAt: number;
  isFeatured?: boolean;
  readTime?: string; // Not in schema but used in UI
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  count: number;
}

export interface BlogSearchFilters {
  query: string;
  category: string;
  tag: string;
}

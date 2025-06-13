export interface Author {
  id: string;
  name: string;
  avatar?: string;
  bio?: string;
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
}

export interface BlogTag {
  id: string;
  name: string;
  slug: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  author: Author;
  category: BlogCategory;
  tags: BlogTag[];
  publishedAt: string;
  updatedAt?: string;
  readingTime: number;
  metadata: {
    title: string;
    description: string;
    keywords: string[];
    ogImage?: string;
  };
}

export interface BlogListResponse {
  posts: BlogPost[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

export interface BlogFilters {
  category?: string;
  tag?: string;
  author?: string;
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: 'latest' | 'oldest' | 'popular';
}

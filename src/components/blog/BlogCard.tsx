import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../ui/Card';
import type { BlogPost } from '../../types/blog';

interface BlogCardProps {
  post: BlogPost;
  className?: string;
}

export const BlogCard: React.FC<BlogCardProps> = ({ post, className = '' }) => {
  const formattedDate = new Date(post.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <Link to={`/blog/${post.category.slug}/${post.slug}`}>
      <Card className={`group transition-transform duration-200 hover:scale-[1.02] ${className}`}>
        {post.coverImage && (
          <div className="relative h-48 mb-4 overflow-hidden rounded-t-lg">
            <img
              src={post.coverImage}
              alt={post.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
            />
          </div>
        )}
        <div className="p-6">
          <div className="flex items-center gap-2 mb-3">
            {post.tags.slice(0, 2).map(tag => (
              <span
                key={tag.id}
                className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full"
              >
                {tag.name}
              </span>
            ))}
          </div>
          <h2 className="text-2xl font-semibold mb-2 group-hover:text-blue-600 transition-colors">
            {post.title}
          </h2>
          <p className="text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center gap-2">
              {post.author.avatar && (
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-6 h-6 rounded-full"
                />
              )}
              <span>{post.author.name}</span>
            </div>
            <div className="flex items-center gap-4">
              <span>{formattedDate}</span>
              <span>{post.readingTime} min read</span>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
};

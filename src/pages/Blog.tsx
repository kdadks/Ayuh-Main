import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { BlogCard } from '../components/blog/BlogCard';
import { BlogFilters } from '../components/blog/BlogFilters';
import { BlogPagination } from '../components/blog/BlogPagination';
import { BlogCardLoading } from '../components/blog/BlogLoading';
import { getBlogPosts, getBlogCategories, getBlogTags } from '../services/blogService';
import type { BlogFilters as BlogFiltersType, BlogListResponse, BlogCategory, BlogTag } from '../types/blog';

const POSTS_PER_PAGE = 9;

const Blog = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [blogData, setBlogData] = useState<BlogListResponse | null>(null);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [tags, setTags] = useState<BlogTag[]>([]);
  const [filters, setFilters] = useState<BlogFiltersType>({
    page: 1,
    limit: POSTS_PER_PAGE,
    sortBy: 'latest'
  });

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const [categoriesData, tagsData] = await Promise.all([
          getBlogCategories(),
          getBlogTags()
        ]);
        setCategories(categoriesData);
        setTags(tagsData);
      } catch (error) {
        console.error('Failed to load categories and tags:', error);
      }
    };
    loadInitialData();
  }, []);

  useEffect(() => {
    const loadPosts = async () => {
      setIsLoading(true);
      try {
        const data = await getBlogPosts(filters);
        setBlogData(data);
      } catch (error) {
        console.error('Failed to load blog posts:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadPosts();
  }, [filters]);

  const handleFilterChange = (newFilters: BlogFiltersType) => {
    setFilters(newFilters);
  };

  const handlePageChange = (page: number) => {
    setFilters(prev => ({ ...prev, page }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const totalPages = blogData ? Math.ceil(blogData.total / POSTS_PER_PAGE) : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Blog - Ayuh Healthcare</title>
        <meta
          name="description"
          content="Explore articles about homecare, homeopathy, and healthcare insights from Ayuh Healthcare experts."
        />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-2 text-center">Our Blog</h1>
          <p className="text-gray-600 text-center mb-8">
            Discover insights and expertise in homecare and homeopathy
          </p>

          <BlogFilters
            filters={filters}
            categories={categories}
            tags={tags}
            onFilterChange={handleFilterChange}
          />

          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: POSTS_PER_PAGE }).map((_, index) => (
                <BlogCardLoading key={index} />
              ))}
            </div>
          ) : blogData?.posts.length === 0 ? (
            <div className="text-center py-12">
              <h2 className="text-2xl font-semibold mb-2">No Posts Found</h2>
              <p className="text-gray-600 mb-4">
                Try adjusting your filters or search terms
              </p>
              <button
                onClick={() => setFilters({ page: 1, limit: POSTS_PER_PAGE, sortBy: 'latest' })}
                className="text-blue-600 hover:text-blue-800"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogData?.posts.map(post => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>

              {totalPages > 1 && (
                <BlogPagination
                  currentPage={filters.page || 1}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Blog;

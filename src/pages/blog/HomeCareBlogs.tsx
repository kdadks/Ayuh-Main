import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { BlogCard } from '../../components/blog/BlogCard';
import { BlogFilters } from '../../components/blog/BlogFilters';
import { BlogPagination } from '../../components/blog/BlogPagination';
import { BlogCardLoading } from '../../components/blog/BlogLoading';
import { getBlogPosts, getBlogCategories, getBlogTags } from '../../services/blogService';
import type { BlogFilters as BlogFiltersType, BlogListResponse, BlogCategory, BlogTag } from '../../types/blog';

const POSTS_PER_PAGE = 6;

const HomeCareBlogs = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [blogData, setBlogData] = useState<BlogListResponse | null>(null);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [tags, setTags] = useState<BlogTag[]>([]);
  const [filters, setFilters] = useState<BlogFiltersType>({
    category: 'homecare',
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
    // Ensure category remains 'homecare' when filters change
    setFilters({ ...newFilters, category: 'homecare' });
  };

  const handlePageChange = (page: number) => {
    setFilters(prev => ({ ...prev, page }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const totalPages = blogData ? Math.ceil(blogData.total / POSTS_PER_PAGE) : 0;
  const category = categories.find(c => c.slug === 'homecare');

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Homecare Articles - Ayuh Healthcare</title>
        <meta
          name="description"
          content="Discover insights about homecare services, elderly care, and making informed decisions for your loved ones."
        />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Link to="/blog" className="text-blue-600 hover:text-blue-800">
              ← Back to Blog
            </Link>
          </div>

          <h1 className="text-4xl font-bold mb-2">Homecare Articles</h1>
          {category && (
            <p className="text-gray-600 mb-8">{category.description}</p>
          )}

          <BlogFilters
            filters={filters}
            categories={categories}
            tags={tags}
            onFilterChange={handleFilterChange}
            hideCategoryFilter={true}
          />

          {isLoading ? (
            <div className="grid md:grid-cols-2 gap-8">
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
                onClick={() =>
                  setFilters({
                    category: 'homecare',
                    page: 1,
                    limit: POSTS_PER_PAGE,
                    sortBy: 'latest'
                  })
                }
                className="text-blue-600 hover:text-blue-800"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 gap-8">
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

export default HomeCareBlogs;

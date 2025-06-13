import React from 'react';
import { BlogFilters as BlogFiltersType, BlogCategory, BlogTag } from '../../types/blog';

interface BlogFiltersProps {
  filters: BlogFiltersType;
  categories: BlogCategory[];
  tags: BlogTag[];
  onFilterChange: (newFilters: BlogFiltersType) => void;
  hideCategoryFilter?: boolean;
}

export const BlogFilters: React.FC<BlogFiltersProps> = ({
  filters,
  categories,
  tags,
  onFilterChange,
  hideCategoryFilter = false,
}) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ ...filters, search: e.target.value, page: 1 });
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({ ...filters, category: e.target.value || undefined, page: 1 });
  };

  const handleTagChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({ ...filters, tag: e.target.value || undefined, page: 1 });
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({
      ...filters,
      sortBy: e.target.value as BlogFiltersType['sortBy'],
      page: 1,
    });
  };

  return (
    <div className="space-y-4 mb-8">
      <div className="relative">
        <input
          type="text"
          placeholder="Search articles..."
          value={filters.search || ''}
          onChange={handleSearchChange}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
        />
        <svg
          className="absolute right-3 top-2.5 h-5 w-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      <div className={`grid gap-4 ${hideCategoryFilter ? 'md:grid-cols-2' : 'md:grid-cols-3'}`}>
        {!hideCategoryFilter && (
          <select
            value={filters.category || ''}
            onChange={handleCategoryChange}
            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category.id} value={category.slug}>
                {category.name}
              </option>
            ))}
          </select>
        )}

        <select
          value={filters.tag || ''}
          onChange={handleTagChange}
          className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
        >
          <option value="">All Tags</option>
          {tags.map(tag => (
            <option key={tag.id} value={tag.slug}>
              {tag.name}
            </option>
          ))}
        </select>

        <select
          value={filters.sortBy || 'latest'}
          onChange={handleSortChange}
          className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
        >
          <option value="latest">Latest First</option>
          <option value="oldest">Oldest First</option>
          <option value="popular">Most Popular</option>
        </select>
      </div>

      {/* Active filters */}
      <div className="flex flex-wrap gap-2">
        {filters.search && (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
            Search: {filters.search}
            <button
              onClick={() => onFilterChange({ ...filters, search: undefined, page: 1 })}
              className="hover:text-blue-600"
            >
              ×
            </button>
          </span>
        )}
        {filters.category && !hideCategoryFilter && (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
            Category: {categories.find(c => c.slug === filters.category)?.name}
            <button
              onClick={() => onFilterChange({ ...filters, category: undefined, page: 1 })}
              className="hover:text-blue-600"
            >
              ×
            </button>
          </span>
        )}
        {filters.tag && (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
            Tag: {tags.find(t => t.slug === filters.tag)?.name}
            <button
              onClick={() => onFilterChange({ ...filters, tag: undefined, page: 1 })}
              className="hover:text-blue-600"
            >
              ×
            </button>
          </span>
        )}
        {(filters.search || (!hideCategoryFilter && filters.category) || filters.tag) && (
          <button
            onClick={() =>
              onFilterChange({
                sortBy: filters.sortBy,
                page: 1,
                limit: filters.limit,
                ...(hideCategoryFilter && filters.category ? { category: filters.category } : {}),
              })
            }
            className="text-sm text-gray-600 hover:text-blue-600"
          >
            Clear all filters
          </button>
        )}
      </div>
    </div>
  );
};

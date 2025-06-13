import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BlogContent } from '../../../components/blog/BlogContent';
import { BlogLoading } from '../../../components/blog/BlogLoading';
import { getBlogPost } from '../../../services/blogService';
import type { BlogPost } from '../../../types/blog';

const ImportanceOfHomecareAssistance = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [post, setPost] = useState<BlogPost | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadPost = async () => {
      try {
        const data = await getBlogPost('importance-of-homecare-assistance');
        if (!data) {
          navigate('/blog/homecare', { replace: true });
          return;
        }
        setPost(data);
      } catch (error) {
        console.error('Failed to load blog post:', error);
        navigate('/blog/homecare', { replace: true });
      } finally {
        setIsLoading(false);
      }
    };
    loadPost();
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link to="/blog/homecare" className="text-blue-600 hover:text-blue-800">
            ← Back to Homecare Articles
          </Link>
        </div>
        <BlogLoading />
      </div>
    );
  }

  if (!post) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link to="/blog/homecare" className="text-blue-600 hover:text-blue-800">
            ← Back to Homecare Articles
          </Link>
        </div>
        <BlogContent post={post} />
      </div>
    </div>
  );
};

export default ImportanceOfHomecareAssistance;

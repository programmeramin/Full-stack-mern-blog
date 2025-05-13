import React from 'react';
import { Link } from 'react-router';
import OptimizedImage from './OptimizedImage';

const PostListItem = ({ post }) => {
  if (!post) return null;

  const imageUrl = post.image || '/default-placeholder.png';

  return (
    <div className="group bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
      <div className="flex flex-col md:flex-row">
        {/* Cover Image */}
        <div className="md:w-2/5 lg:w-1/3">
          <div className="relative h-48 sm:h-56 md:h-full overflow-hidden">
            <OptimizedImage
              src={imageUrl}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              alt={post.title || 'Blog Post Cover'}
              placeholder="empty" 
            />
            {post.category && (
              <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
                <Link
                  to={`/?cat=${post.category}`}
                  className="bg-blue-800/80 backdrop-blur-sm text-white text-xs font-medium px-2 py-0.5 sm:px-3 sm:py-1 rounded-full hover:bg-blue-900 transition-colors"
                >
                  {post.category}
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Post Details */}
        <div className="flex flex-col gap-2 sm:gap-3 md:gap-4 p-4 sm:p-5 md:p-6 md:w-3/5 lg:w-2/3">
          <Link
            to={`/posts/${post._id}`}
            className="text-xl sm:text-2xl md:text-3xl font-semibold hover:text-blue-800 transition-colors text-gray-900 line-clamp-2"
          >
            {post.title || 'Untitled Post'}
          </Link>

          <div className="flex flex-wrap items-center gap-1 sm:gap-2 text-gray-500 text-xs sm:text-sm">
            <span>By</span>
            <Link
              to={`/authors/${post.author?._id || ''}`}
              className="text-blue-800 hover:underline font-medium"
            >
              {post.author?.username || 'Unknown'}
            </Link>
            <span>•</span>
            <span>{new Date(post.createdAt).toLocaleDateString('en-US', {
              year: 'numeric', 
              month: 'short', 
              day: 'numeric'
            })}</span>
          </div>

          <p className="text-gray-600 text-sm sm:text-base line-clamp-2 sm:line-clamp-3">
            {post.summary ||
              post.description?.slice(0, 150) + '...' ||
              'No summary available.'}
          </p>

          <div className="mt-auto pt-2">
            <Link
              to={`/posts/${post._id}`}
              className="inline-flex items-center text-blue-800 font-medium hover:text-blue-900 transition-colors text-sm sm:text-base"
            >
              Read Article
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostListItem;

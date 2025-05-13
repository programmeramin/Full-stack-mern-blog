import React from 'react';
import { Link } from 'react-router';
import OptimizedImage from './OptimizedImage';
import { useGetAllPostsQuery } from '@/features/posts/postApi';

const FeaturePosts = () => {
  const { data: posts, isLoading, error } = useGetAllPostsQuery({ sort: 'newest' });
  
  // If loading, show skeleton UI
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <div className="bg-gray-100 rounded-xl sm:rounded-2xl h-60 sm:h-80 animate-pulse"></div>
        <div className="flex flex-col gap-4 sm:gap-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-gray-100 rounded-xl sm:rounded-2xl h-24 sm:h-32 animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }
  
  // If error, show error message
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-800 rounded-xl p-4 sm:p-6 text-center">
        <p className="font-medium">Failed to load featured posts</p>
        <p className="text-sm mt-2">Please try refreshing the page</p>
      </div>
    );
  }
  
  // If no posts, show message
  if (!posts || posts.length === 0) {
    return (
      <div className="bg-blue-50 border border-blue-200 text-blue-800 rounded-xl p-4 sm:p-6 md:p-8 text-center">
        <p className="font-medium">No posts available</p>
        <p className="text-sm mt-2">Create your first post to see it featured here</p>
      </div>
    );
  }
  
  // Get the first 4 posts (or all if less than 4)
  const featuredPosts = posts.slice(0, 4);
  const mainPost = featuredPosts[0];
  const secondaryPosts = featuredPosts.slice(1);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
      {/* Main Feature */}
      {mainPost && (
        <div className="group card overflow-hidden hover:shadow-md transition-all duration-300">
          <div className="relative">
            {/* Image wrapper with overlay */}
            <div className="relative h-60 sm:h-72 md:h-80 overflow-hidden">
              <OptimizedImage
                src={mainPost.image || '/default-placeholder.png'}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                alt={mainPost.title}
                priority={true}
                placeholder="empty"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
            </div>
            
            {/* Content positioned over image */}
            <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 md:p-6 text-white">
              <div className="flex items-center gap-2 sm:gap-4 mb-2 sm:mb-3">
                <span className="font-semibold text-blue-300 text-sm sm:text-base">01</span>
                <Link to={`/?cat=${mainPost.category}`} className="bg-blue-800/80 backdrop-blur-sm text-white text-xs font-medium px-2 sm:px-3 py-0.5 sm:py-1 rounded-full hover:bg-blue-900 transition-colors">
                  {mainPost.category || 'General'}
                </Link>
                <span className="text-gray-300 text-xs sm:text-sm">
                  {new Date(mainPost.createdAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric'
                  })}
                </span>
              </div>
              
              <Link to={`/posts/${mainPost._id}`} className="text-base sm:text-xl md:text-2xl lg:text-3xl font-semibold group-hover:text-blue-200 transition-colors line-clamp-2">
                {mainPost.title}
              </Link>
            </div>
          </div>
        </div>
      )}
      
      {/* Secondary Features */}
      <div className="flex flex-col gap-4 sm:gap-6">
        {secondaryPosts.map((post, index) => (
          <div key={post._id} className="group card overflow-hidden hover:shadow-md transition-all duration-300">
            <div className="flex flex-row items-center">
              <div className="w-1/3 h-24 sm:h-32 relative overflow-hidden">
                <OptimizedImage
                  src={post.image || '/default-placeholder.png'}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  alt={post.title}
                  placeholder="empty"
                />
              </div>
              
              <div className="w-2/3 p-3 sm:p-4">
                <div className="flex items-center flex-wrap gap-2 sm:gap-3 mb-1 sm:mb-2">
                  <span className="font-semibold text-blue-800 text-sm">0{index + 2}</span>
                  <Link to={`/?cat=${post.category}`} className="text-blue-800 text-xs">
                    {post.category || 'General'}
                  </Link>
                  <span className="text-gray-500 text-xs">
                    {new Date(post.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric'
                    })}
                  </span>
                </div>
                
                <Link to={`/posts/${post._id}`} className="text-base sm:text-lg font-medium group-hover:text-blue-800 transition-colors line-clamp-2">
                  {post.title}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturePosts;

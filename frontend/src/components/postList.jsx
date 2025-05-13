import React from 'react';
import PostListItem from './postListItem';
import { useGetAllPostsQuery } from '@/features/posts/postApi';

const PostList = ({ category, sort }) => {
  const {
    data: posts,
    isLoading,
    error,
  } = useGetAllPostsQuery({ cat: category, sort });

  if (isLoading) return (
    <div className="flex justify-center items-center py-12">
      <div className="animate-pulse flex flex-col gap-4 w-full">
        <div className="h-8 bg-gray-200 rounded w-1/3"></div>
        <div className="h-64 bg-gray-200 rounded"></div>
        <div className="h-64 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
  
  if (error) return (
    <div className="bg-red-50 border border-red-200 text-red-800 rounded-xl p-6 text-center">
      <p className="font-medium">Failed to load posts</p>
      <p className="text-sm mt-2">Please try refreshing the page</p>
    </div>
  );

  const filteredPosts = category
    ? posts.filter(post => post.category === category)
    : posts;

  return (
    <div className="flex flex-col gap-8">
      {filteredPosts.length > 0 ? (
        filteredPosts.map(post => <PostListItem key={post._id} post={post} />)
      ) : (
        <div className="bg-blue-50 border border-blue-200 text-blue-800 rounded-xl p-8 text-center">
          <p className="font-medium">No posts available in this category</p>
          <p className="text-sm mt-2">Check back later or explore other categories</p>
        </div>
      )}
    </div>
  );
};

export default PostList;

import React, { useEffect } from 'react';
import { ThumbsUp, ThumbsDown, Calendar, User, Bookmark } from 'lucide-react';
import { useParams, Link } from 'react-router'; 
import {
  useLikePostMutation,
  useDislikePostMutation,
  useGetPostByIdQuery,
} from '@/features/posts/postApi';
import Comments from '@/components/comments';
import PostMenuActions from '@/components/postMenuActions';
import { useSelector } from 'react-redux';
import { placeholderUserImage } from '@/constants';
import OptimizedImage from '@/components/OptimizedImage';
import parse from 'html-react-parser';


const SinglePost = () => {
  const { postId } = useParams();
  const { data: post, isLoading, isError } = useGetPostByIdQuery(postId);
  const [likePost] = useLikePostMutation();
  const [dislikePost] = useDislikePostMutation();

  const user = useSelector(state => state.auth.user);
  
  const canManagePost =
    user && (user._id === post?.author?._id || user.role === 'admin');

  useEffect(() => {
    if (post) {
      document.title = `${post.title} | Blog Application`;
      
      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.name = 'description';
        document.head.appendChild(metaDescription);
      }
      
      metaDescription.content = post.description || 'Read this interesting blog post';
    }
    
    return () => {
      document.title = 'Blog Application'; 
    };
  }, [post]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-pulse flex flex-col gap-4 w-full max-w-4xl">
          <div className="h-10 bg-gray-200 rounded-md w-3/4"></div>
          <div className="h-6 bg-gray-200 rounded-md w-1/2"></div>
          <div className="h-64 bg-gray-200 rounded-xl w-full"></div>
          <div className="grid grid-cols-1 gap-2">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-4 bg-gray-200 rounded-md w-full"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  
  if (isError || !post) return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Post not found</h2>
      <p className="text-gray-600 mb-6">The post you're looking for doesn't exist or has been removed.</p>
      <Link to="/blog" className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all">
        Return to Blog
      </Link>
    </div>
  );

  const handleLike = () => {
    likePost(postId);
  };

  const handleDislike = () => {
    dislikePost(postId);
  };

  const extractHeadings = (content) => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = content;
    
    const headings = Array.from(tempDiv.querySelectorAll('h1, h2, h3'));
    return headings.map((heading, index) => {
      const id = `heading-${index}`;
      heading.id = id;
      return {
        id,
        text: heading.textContent,
        level: parseInt(heading.tagName.substring(1)),
      };
    });
  };

  const headings = post?.content ? extractHeadings(post.content) : [];

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const renderContent = () => {
    if (!post?.content) return null;
    
    if (typeof parse !== 'undefined') {
      return parse(post.content);
    }
    
    return (
      <div 
        className="blog-content" 
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    );
  };

  return (
    <div className="flex flex-col gap-8 max-w-[1200px] mx-auto page-container">
      {/* Hero section with title and featured image */}
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-2 text-sm">
          <Link to={`/category/${post?.category}`} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-medium hover:bg-blue-100 transition-colors">
            {post?.category}
          </Link>
          <span className="text-gray-400 flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {formatDate(post?.createdAt)}
          </span>
        </div>
        
        <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900">
          {post?.title}
        </h1>
        
        <div className="flex items-center gap-3 my-3">
          <OptimizedImage
            src={post?.author?.image || placeholderUserImage}
            alt={post?.author?.username || 'Author'}
            className="w-10 h-10 rounded-full object-cover"
            width={40}
            height={40}
          />
          <div className="text-sm">
            <p className="text-gray-900 font-medium">{post?.author?.username}</p>
            <p className="text-gray-500">Author</p>
          </div>
        </div>
        
        <p className="text-gray-700 text-lg leading-relaxed font-medium max-w-3xl">
          {post?.description}
        </p>
      </div>

      {/* Featured image */}
      <div className="w-full aspect-[16/9] overflow-hidden rounded-2xl">
        <OptimizedImage
          src={post?.image || '/default-placeholder.png'}
          alt={post?.title || 'Blog post image'}
          className="w-full h-full object-cover"
          width={1200}
          height={675}
          priority={true}
        />
      </div>

      {/* Post content and sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-4">
        <article className="lg:col-span-2">
          {/* Content */}
          <div className="blog-content prose-like max-w-none">
            {renderContent()}
          </div>
          
          {/* Like/Dislike Buttons */}
          <div className="flex gap-6 mt-10 mb-6">
            <button
              onClick={handleLike}
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-tr from-green-500 to-emerald-600 text-white font-medium rounded-xl shadow hover:scale-105 hover:shadow-lg transition-all border border-green-600"
            >
              <ThumbsUp className="w-5 h-5" />
              <span>{post?.likes?.length || 0} Likes</span>
            </button>

            <button
              onClick={handleDislike}
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-tr from-red-500 to-rose-600 text-white font-medium rounded-xl shadow hover:scale-105 hover:shadow-lg transition-all border border-red-600"
            >
              <ThumbsDown className="w-5 h-5" />
              <span>{post?.dislikes?.length || 0} Dislikes</span>
            </button>
          </div>
        </article>
        
        {/* Sidebar */}
        <aside className="space-y-8">
          {/* Author card */}
          <div className="card p-6 sticky top-24">
            <h2 className="font-bold text-lg mb-4 text-gray-900">About the Author</h2>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <OptimizedImage
                  src={post?.author?.image || placeholderUserImage}
                  alt={post?.author?.username || 'Author'}
                  className="rounded-full w-16 h-16 object-cover"
                  width={64}
                  height={64}
                />
                <div>
                  <p className="font-medium text-gray-900">{post?.author?.username}</p>
                  <p className="text-gray-500 text-sm">{post?.author?.bio || 'Author at Blog Application'}</p>
                </div>
              </div>
              <div className="flex gap-2 mt-2">
                {canManagePost && <PostMenuActions postId={postId} />}
              </div>
            </div>
          </div>
          
          {/* Table of contents */}
          {headings.length > 0 && (
            <div className="bg-gray-50 rounded-2xl p-6 sticky top-80">
              <h2 className="font-bold text-lg mb-4 text-gray-900 flex items-center gap-2">
                <Bookmark className="w-5 h-5" />
                Table of Contents
              </h2>
              <nav className="space-y-2">
                {headings.map((heading) => (
                  <a
                    key={heading.id}
                    href={`#${heading.id}`}
                    className={`block text-gray-700 hover:text-blue-600 transition-colors ${
                      heading.level === 1 ? 'font-medium' : 
                      heading.level === 2 ? 'ml-4 text-sm' : 'ml-8 text-xs'
                    }`}
                  >
                    {heading.text}
                  </a>
                ))}
              </nav>
            </div>
          )}
        </aside>
      </div>
      
      {/* Comments */}
      <div className="mt-8 pt-8 border-t border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Comments</h2>
        <Comments postId={postId} />
      </div>
    </div>
  );
};

export default SinglePost;

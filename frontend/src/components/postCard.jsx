// src/components/PostCard.jsx
import React from 'react';

const PostCard = ({ post }) => {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-lg shadow p-5">
      <img
        src={post.image}
        alt={post.title}
        className="rounded-lg w-full h-48 object-cover mb-4"
      />
      <h2 className="text-xl font-bold mb-2">{post.title}</h2>
      <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
        By {post.author} · {new Date(post.createdAt).toLocaleDateString()}
      </p>
      <p className="text-gray-700 dark:text-gray-300">
        {post.content.substring(0, 100)}...
      </p>
    </div>
  );
};

export default PostCard;

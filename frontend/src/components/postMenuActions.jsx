import React from 'react';
import { useNavigate } from 'react-router';
import { useDeletePostMutation } from '@/features/posts/postApi';

const PostMenuActions = ({ postId }) => {
  const navigate = useNavigate();
  const [deletePost, { isLoading }] = useDeletePostMutation();

  const handleDelete = async () => {
    const confirm = window.confirm(
      'Are you sure you want to delete this post?'
    );
    if (confirm) {
      try {
        await deletePost(postId).unwrap();
        navigate('/'); 
      } catch (err) {
        console.error('Delete failed:', err);
        alert('Failed to delete post!');
      }
    }
  };

  const handleEdit = () => {
    navigate(`/posts/edit/${postId}`);
  };

  return (
    <div>
      <h1 className="mt-8 mb-4 text-sm font-medium">Actions</h1>

      {/* Delete Button */}
      <div
        onClick={isLoading ? null : handleDelete}
        className={`flex items-center gap-2 py-2 text-sm cursor-pointer ${
          isLoading ? 'text-gray-400' : 'text-red-500 hover:text-red-700'
        }`}
      >
        🗑️ <span>{isLoading ? 'Deleting...' : 'Delete this Post'}</span>
      </div>

      {/* Edit Button */}
      <div
        onClick={handleEdit}
        className="flex items-center gap-2 py-2 text-sm cursor-pointer text-blue-500 hover:text-blue-700"
      >
        ✏️ <span>Edit this Post</span>
      </div>

      {/* Save Button (placeholder) */}
      <div className="flex items-center gap-2 py-2 text-sm text-gray-500 cursor-not-allowed">
        💾 <span>Save this Post (coming soon)</span>
      </div>
    </div>
  );
};

export default PostMenuActions;

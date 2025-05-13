import { useParams, useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  useGetPostByIdQuery,
  useUpdatePostMutation,
} from '@/features/posts/postApi';
import Input from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

const EditPost = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth);

  const {
    data: post,
    isLoading: loadingPost,
    isError,
  } = useGetPostByIdQuery(postId);
  const [updatePost, { isLoading: isUpdating }] = useUpdatePostMutation();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setCategory(post.category);
      setDescription(post.description);
      setContent(post.content);
    }
  }, [post]);

  // Owner or Admin Check
  const isOwnerOrAdmin =
    user && post && (user._id === post.author._id || user.role === 'admin');

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await updatePost({
        id: postId,
        data: { title, category, description, content },
      }).unwrap();
      navigate(`/posts/${postId}`);
    } catch (err) {
      console.error('Failed to update post:', err);
      alert('Something went wrong!');
    }
  };

  // Quill modules & formats
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['blockquote', 'code-block'],
      ['link', 'image'],
      ['clean'],
    ],
  };

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'list',
    'bullet',
    'blockquote',
    'code-block',
    'link',
    'image',
  ];

  if (loadingPost) return <p>Loading post...</p>;
  if (isError) return <p>Error loading post.</p>;
  if (!isOwnerOrAdmin)
    return (
      <p className="text-red-500 font-semibold text-center mt-10">
        You’re not allowed to edit this post 🚫
      </p>
    );

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-6">Edit Your Post</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Cover Image (you can implement actual upload later) */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">Cover image</label>
          <div className="flex items-center justify-center w-full h-40 border-2 border-dashed rounded-lg bg-gray-50">
            <span className="text-gray-500">
              Current image (edit feature coming)
            </span>
          </div>
        </div>

        {/* Title */}
        <div className="space-y-2">
          <Input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="text-3xl font-bold border-none focus:ring-0 px-0 w-full"
          />
        </div>

        {/* Category */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">Category</label>
          <select
            value={category}
            onChange={e => setCategory(e.target.value)}
            className="block w-40 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="General">General</option>
            <option value="Technology">Technology</option>
            <option value="Travel">Travel</option>
            <option value="Lifestyle">Lifestyle</option>
          </select>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Input
            type="text"
            placeholder="Enter a short description"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </div>

        {/* Content */}
        <div className="space-y-2">
          <ReactQuill
            theme="snow"
            value={content}
            onChange={setContent}
            modules={modules}
            formats={formats}
            className="bg-white rounded-md h-60"
            placeholder="Update your content..."
          />
        </div>

        <Button type="submit" className="sm:w-auto mt-10">
          {isUpdating ? 'Updating...' : 'Update Post'}
        </Button>
      </form>
    </div>
  );
};

export default EditPost;

// src/pages/CreatePost.jsx
import { useState } from 'react';
import ReactQuill from 'react-quill-new';
import Input from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import 'react-quill-new/dist/quill.snow.css';
import { useCreatePostMutation } from '@/features/posts/postApi';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { uploadToCloudinary } from '@/lib/uploadToCloudinary';
import { ImagePlus, Check, X, Loader2 } from 'lucide-react';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('General');
  const [content, setContent] = useState('');
  const [coverImage, setCoverImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [description, setDescription] = useState('');
  const user = useSelector(state => state.auth.user);
  const navigate = useNavigate();

  const [createPost, { isLoading, isError }] = useCreatePostMutation();

  const handleSubmit = async e => {
    e.preventDefault();

    const postData = {
      title,
      category,
      description,
      content,
      author: user?._id,
      image: coverImage,
    };

    try {
      const res = await createPost(postData).unwrap();
      console.log('✅ Post created:', res);

      // Optionally reset form or redirect:
      setTitle('');
      setCategory('General');
      setDescription('');
      setContent('');
      setCoverImage(null);
      navigate('/'); 
    } catch (err) {
      console.error('❌ Failed to create post:', err);
    }
  };

  const handleImageChange = async e => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const url = await uploadToCloudinary(file);
    setCoverImage(url);
    setUploading(false);
  };

  // ReactQuill toolbar
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

  const categories = [
    { value: 'General', label: 'General' },
    { value: 'web-design', label: 'Web Design' },
    { value: 'development', label: 'Development' },
    { value: 'database', label: 'Database' },
    { value: 'seo', label: 'SEO' },
    { value: 'marketing', label: 'Marketing' },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Create a New Post</h1>
        <p className="text-gray-600 mb-8">Share your knowledge and insights with the world</p>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Cover Image */}
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">Cover Image</label>

            {coverImage ? (
              <div className="relative rounded-xl overflow-hidden border border-gray-200">
                <img
                  src={coverImage}
                  alt="Cover"
                  className="w-full h-[300px] object-cover"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="flex gap-2">
                    {/* Hidden file input for changing */}
                    <input
                      type="file"
                      id="cover-change"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                    <label
                      htmlFor="cover-change"
                      className="bg-white text-gray-800 rounded-full p-3 cursor-pointer hover:bg-gray-100 transition-colors"
                    >
                      <ImagePlus size={20} />
                    </label>
                    <button
                      type="button"
                      onClick={() => setCoverImage(null)}
                      className="bg-white text-red-500 rounded-full p-3 cursor-pointer hover:bg-gray-100 transition-colors"
                    >
                      <X size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center">
                {/* Hidden file input */}
                <input
                  type="file"
                  id="cover-upload"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />

                {uploading ? (
                  <div className="flex flex-col items-center justify-center">
                    <Loader2 className="h-10 w-10 text-blue-600 animate-spin mb-3" />
                    <p className="text-sm text-gray-600">Uploading your image...</p>
                  </div>
                ) : (
                  <label
                    htmlFor="cover-upload"
                    className="flex flex-col items-center justify-center cursor-pointer"
                  >
                    <ImagePlus className="h-12 w-12 text-gray-400 mb-3" />
                    <span className="text-gray-700 font-medium">Add a cover image</span>
                    <span className="text-sm text-gray-500 mt-1">
                      Drag and drop or click to upload
                    </span>
                  </label>
                )}
              </div>
            )}
          </div>

          {/* Title */}
          <div className="space-y-2">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <Input
              id="title"
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Enter an eye-catching title"
              className="text-2xl font-bold border-2 focus:ring-2 focus:ring-blue-500 p-3 w-full rounded-xl"
            />
          </div>

          {/* Category Selector */}
          <div className="space-y-2">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <div className="relative">
              <select
                id="category"
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="block w-60 p-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white pr-10"
              >
                {categories.map(cat => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 left-50 flex items-center px-3 pointer-events-none">
                <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Short Description */}
          <div className="space-y-2">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Short Description
            </label>
            <Input
              id="description"
              type="text"
              placeholder="Write a brief summary of your post"
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="p-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 w-full"
            />
            <p className="text-xs text-gray-500">
              This will appear in post previews and search results
            </p>
          </div>

          {/* Content Editor */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Content</label>
            <div className="border rounded-xl overflow-hidden">
              <ReactQuill
                theme="snow"
                value={content}
                onChange={setContent}
                modules={modules}
                formats={formats}
                className="bg-white h-80"
                placeholder="Write your post content here..."
              />
            </div>
          </div>

          {isError && (
            <div className="bg-red-50 border border-red-200 text-red-800 rounded-xl p-4 flex items-center gap-2">
              <X className="h-5 w-5 text-red-500" />
              <span>Something went wrong while creating the post. Please try again.</span>
            </div>
          )}

          <div className="flex justify-end pt-4">
            <Button 
              type="button" 
              className="mr-4 bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
              onClick={() => navigate(-1)}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="px-8 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl flex items-center gap-2" 
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Publishing...
                </>
              ) : (
                <>
                  <Check className="h-4 w-4" />
                  Publish Post
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;

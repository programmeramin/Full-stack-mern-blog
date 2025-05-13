import Post from '../models/postModels.js';
import errorHandler from '../middleware/errorHandler.js';
import mongoose from 'mongoose';

// Create a new blog post
export const createBlog = async (req, res, next) => {
  try {
    const { title, content, category, description, image } = req.body;
    const userId = req.user.id;
    const slug = title
      .split(' ')
      .join('-')
      .toLowerCase()
      .replace(/[^a-zA-Z0-9-]/g, '');

    const blog = new Post({
      author: userId,
      title,
      content,
      image,
      slug,
      category,
      description,
    });
    await blog.save();

    res.status(201).json(blog);
  } catch (err) {
    next(err);
  }
};

// Get all blog posts
export const getAllBlogs = async (req, res, next) => {
  try {
    const blogs = await Post.find().populate('author');
    console.log(blogs);

    res.json(blogs);
  } catch (err) {
    next(err);
  }
};

// Get single blog post by ID
export const getBlogById = async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid blog ID' });
  }

  try {
    const blog = await Post.findById(id).populate('author');
    console.log(blog);
    if (!blog) return res.status(404).json({ error: 'Blog not found' });
    res.json(blog);
  } catch (err) {
    next(err);
  }
};

// Update blog post
export const updateBlog = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    const updatedData = { title, content };

    if (req.file) {
      updatedData.image = req.file.path;
    }

    const blog = await Post.findByIdAndUpdate(req.params.userId, updatedData, {
      new: true,
    });
    if (!blog) return res.status(404).json({ error: 'Blog not found' });

    res.json(blog);
  } catch (err) {
    next(err);
  }
};

// Delete blog post
export const deleteBlog = async (req, res, next) => {
  try {
    const blog = await Post.findByIdAndDelete(req.params.userId);
    if (!blog) return res.status(404).json({ error: 'Blog not found' });

    res.json({ message: 'Blog deleted successfully' });
  } catch (err) {
    next(err);
  }
};

// Like a blog post
export const likeBlog = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid blog ID' });
    }

    const blog = await Post.findById(id);
    if (!blog) return res.status(404).json({ error: 'Blog not found' });

    if (blog.likes.includes(userId)) {
      return res.status(400).json({ error: 'You already liked this blog' });
    }

    blog.likes.push(userId);
    await blog.save();

    res.json(blog);
  } catch (err) {
    next(err);
  }
};

// Search blog posts by title or content
export const searchBlogs = async (req, res, next) => {
  try {
    const { query } = req.query;
    
    if (!query) {
      return res.status(400).json({ message: 'Search query is required' });
    }

    // Search in title, content, or description - case insensitive
    const blogs = await Post.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { content: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } }
      ]
    })
    .select('_id title description slug category createdAt') // Only select fields we need
    .limit(5) // Limit to 5 results for the popover
    .sort({ createdAt: -1 }) // Sort by newest first
    .populate('author', 'username');

    res.json(blogs);
  } catch (err) {
    next(err);
  }
};
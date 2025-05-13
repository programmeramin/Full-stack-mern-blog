import Comment from '../models/commentModels.js';

// POST /api/comments
export const addComment = async (req, res) => {
  const { postId, text } = req.body;

  if (!text) return res.status(400).json({ message: 'Comment is required' });

  const comment = await Comment.create({
    description: text,
    user: req.user.id,
    post: postId,
  });

  const populatedComment = await comment.populate('user', 'name image');

  res.status(201).json({
    ...populatedComment.toObject(),
    author: populatedComment.user, 
  });
};

// GET /api/comments/:postId
export const getCommentsByPost = async (req, res) => {
  const comments = await Comment.find({ post: req.params.postId })
    .populate('user', 'name avatar role')
    .sort({ createdAt: -1 });

  res.json(
    comments.map(comment => ({
      ...comment.toObject(),
      author: comment.user,
    }))
  );
};

// DELETE /api/comments/:id
export const deleteComment = async (req, res) => {
  const comment = await Comment.findById(req.params.id);

  if (!comment) return res.status(404).json({ message: 'Comment not found' });

  // Check ownership
  if (
    comment.user.toString() !== req.user.id.toString() &&
    req.user.role !== 'admin'
  ) {
    return res
      .status(403)
      .json({ message: 'Not authorized to delete this comment' });
  }

  await comment.deleteOne();
  res.status(200).json({ message: 'Comment deleted' });
};

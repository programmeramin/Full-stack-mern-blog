import express from 'express';

import { protect } from '../middleware/authMiddleware.js';
import {
  addComment,
  deleteComment,
  getCommentsByPost,
} from '../controller/commentController.js';

const router = express.Router();

router.post('/:postId', protect, addComment);
router.get('/:postId', getCommentsByPost);
router.delete('/:id', protect, deleteComment);

export default router;

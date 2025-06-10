import express from 'express';
import auth from '../middleware/auth.js';
import {
  createBlog,
  getBlogs,
  getBlog,
  updateBlog,
  deleteBlog
} from '../controllers/blogController.js';

const router = express.Router();

// Public routes
router.get('/', getBlogs);
router.get('/:id', getBlog);

// Protected routes
router.post('/', auth, createBlog);
router.put('/:id', auth, updateBlog);
router.delete('/:id', auth, deleteBlog);

export default router; 
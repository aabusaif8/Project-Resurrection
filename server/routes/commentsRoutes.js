// routes/commentsRoutes.js
import express from 'express';
import { getAllComments, getCommentsByMangaId, deleteComment, createComment, updateComment } from '../controllers/commentsController.js'; // Import the controller functions

const router = express.Router();

// Route to get all comments and create a new comment
router.get('/', getAllComments).post('/', createComment);

// Route to get comments by manga ID
router.get('/:manga_id', getCommentsByMangaId)

// Route to delete a comment by ID
router.delete('/:comment_id', deleteComment).put('/:comment_id', updateComment);

export default router
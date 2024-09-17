// routes/commentsRoutes.js
import express from 'express';
import { getAllComments, getCommentsByMangaId, deleteComment } from '../controllers/commentsController.js'; // Import the deleteComment function

const router = express.Router();

router.get('/', getAllComments);

router.get('/:manga_id', getCommentsByMangaId);

router.delete('/:comment_id', deleteComment); // Add the DELETE route for comments

export default router;
// routes/mangaRoutes.js
import express from 'express';
import { getMangaById } from '../controllers/mangaController.js';

const router = express.Router();

// Route to get manga details by ID
router.get('/:manga_id', getMangaById);


export default router;
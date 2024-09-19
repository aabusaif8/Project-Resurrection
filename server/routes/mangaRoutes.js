// routes/mangaRoutes.js
import express from 'express';
import { getMangaById, createManga } from '../controllers/mangaController.js';
import db from '../config/db.js';

const router = express.Router();

// Route to get manga details by ID
router.get('/:manga_id', getMangaById);

router.post('/', (req, res) => {
    const { title, author, description, imageUrl } = req.body;

    const sql = 'INSERT INTO manga (title, author, description, image_url) VALUES (?, ?, ?, ?)';
    db.query(sql, [title, author, description, imageUrl], (err, result) => {
        if (err) {
            console.error("Error adding manga:", err);
            return res.json({ Error: "Error adding manga" });
        }
        return res.json({ Status: "Success", Message: "Manga added successfully!" });
    });
});
export default router;
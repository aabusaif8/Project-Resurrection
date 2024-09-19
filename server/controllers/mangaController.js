// controllers/mangaController.js
import db from '../config/db.js'; // Adjust the import based on your database setup

export const getMangaById = (req, res) => {
    const mangaId = req.params.manga_id; // Use the correct parameter name
    const sql = `
        SELECT manga.*, comments.comment_id, comments.comment, comments.user_id
        FROM manga
        LEFT JOIN comments ON manga.id = comments.manga_id
        WHERE manga.id = ?`;

    //console.log('Manga ID:', mangaId); // Log the manga ID

    db.query(sql, [mangaId], (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ Error: "Error fetching manga details" });
        }
        if (results.length === 0) {
            return res.status(404).json({ Error: "Manga not found" });
        }

        // Separate manga data and comments
        const mangaData = results[0]; // The first result contains the manga data
        const comments = results.map(row => ({
            comment_id: row.comment_id,
            comment: row.comment,
            user_id: row.user_id
        })).filter(comment => comment.comment_id !== null); // Filter out null comments

        // Combine manga data and comments
        const mangaWithComments = {
            ...mangaData,
            comments: comments // Add comments to the manga object
        };
        //console.log(mangaWithComments)
        return res.status(200).json({ Status: "Success", data: mangaWithComments }); // Return the combined result
    });
};

export const createManga = (req, res) => {
    const { title, author, description, image_url, rating } = req.body; // Extract manga data from the request body

    // Validate the incoming data
    if (!title || !author || !description || !image_url || !rating) {
        return res.status(400).json({ Error: "All fields are required" });
    }

    const sql = 'INSERT INTO manga (title, author, description, image_url, rating) VALUES (?, ?, ?, ?, ?)';
    const values = [title, author, description, image_url, rating];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Error inserting manga:", err);
            return res.status(500).json({ Error: "An error occurred while creating the manga" });
        }

        // Respond with the created manga data
        return res.status(201).json({ data: { id: result.insertId, title, author, description, image_url, rating } });
    });
};
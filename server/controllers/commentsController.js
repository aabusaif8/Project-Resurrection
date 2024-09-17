// controllers/commentsController.js
import db from '../config/db.js'; // Adjust the import based on your database setup

// Controller function to get comments by manga ID
// controllers/commentsController.js

export const getCommentsByMangaId = (req, res) => {
    const { manga_id } = req.params; // Get mangaId from the request parameters
    console.log('Fetching comments for manga ID:', manga_id);

    // SQL query to fetch comments for the specified manga ID
    const sql = 'SELECT * FROM comments WHERE manga_id = ?'; // Adjust the column name based on your schema

    db.query(sql, [manga_id], (err, results) => {
        if (err) {
            console.error("Database query error:", err);
            return res.status(500).json({ message: "Error fetching comments" });
        }

        if (results.length > 0) {
            console.log('Fetched comments:', results);
            return res.status(200).json({ data: results }); // Return the results
        } else {
            return res.status(404).json({ message: "No comments found for this manga ID" });
        }
    });
};

export const getAllComments = (req, res) => {
    const sql = 'SELECT * FROM comments'; // Fetch all comments entries
    console.log('SQL Query:', sql);
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ message: 'Error fetching comments' });
        }
        console.log('Fetched comments:', results); // Log the results
        res.json({ data: results }); // Return the results
    });
};


export const deleteComment = (req, res) => {
    const { comment_id } = req.params; // Get comment_id from the request parameters
    console.log('Deleting comment ID:', comment_id); // Log the comment ID

    const sql = 'DELETE FROM comments WHERE comment_id = ?'; // SQL query to delete the comment

    db.query(sql, [comment_id], (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ message: "Error deleting comment" });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ message: "Comment not found" }); // Handle case where comment does not exist
        }

        return res.status(200).json({ message: "Comment deleted successfully" }); // Success response
    });
};
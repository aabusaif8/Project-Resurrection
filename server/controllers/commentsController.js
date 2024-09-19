import db from '../config/db.js'; // Adjust the import based on your database setup

// Controller function to get comments by manga ID
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

// Controller function to get all comments
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

// Controller function to create a new comment
export const createComment = (req, res) => {
    const commentData = req.body.data; // Extract the comment data from the request body

    // Validate the incoming data
    if (!commentData || !commentData.user_id || !commentData.manga_id || !commentData.comment) {
        return res.status(400).json({ Error: "Invalid comment data" });
    }

    const sql = 'INSERT INTO comments (user_id, manga_id, comment) VALUES (?, ?, ?)';
    const values = [commentData.user_id, commentData.manga_id, commentData.comment];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Error inserting comment:", err);
            return res.status(500).json({ Error: "An error occurred while creating the comment" });
        }

        // Attach the newly created comment ID to the comment object
        commentData.comment_id = result.insertId; // Get the ID of the newly created comment

        // Respond with the created comment
        return res.status(201).json({ data: commentData });
    });
};

// Controller function to update a comment
export const updateComment = (req, res) => {
    const { comment_id } = req.params; // Get comment ID from the URL parameters
    const { comment } = req.body.data; // Extract the new comment content from the request body

    // Validate incoming data
    if (!comment) {
        return res.status(400).json({ error: 'Comment text is required' });
    }

    const sql = 'UPDATE comments SET comment = ? WHERE comment_id = ?';
    const values = [comment, comment_id];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Error updating comment:", err);
            return res.status(500).json({ error: "Failed to update comment" });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Comment not found" });
        }

        return res.status(200).json({ message: "Comment updated successfully" });
    });
};

// Controller function to delete a comment
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

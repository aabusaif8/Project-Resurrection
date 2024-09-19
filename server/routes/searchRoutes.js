import express from 'express';
const router = express.Router();
import db from"../config/db.js";

router.get('/', (req, res) => {
    console.log('search route hit'); // Log to confirm the route is hit
    const { query } = req.query; // Get the search query from the request parameters

    if (!query) {
        return res.status(400).json({ Error: "Query parameter is required." });
    }

    const sql = 'SELECT * FROM manga WHERE title LIKE ?'; // Adjust the SQL query as needed
    const searchQuery = `%${query}%`; // Use wildcards for partial matches

    console.log("Executing SQL:", sql, "with searchQuery:", searchQuery); // Log the SQL execution

    db.query(sql, [searchQuery], (err, results) => {
        if (err) {
            console.error("Error searching manga:", err);
            return res.status(500).json({ Error: "Error searching manga" });
        }
        if (results.length === 0) {
            return res.status(404).json({ Error: "Manga not found" }); // Return 404 if no results
        }
        return res.json({ Status: "Success", data: results }); // Return the search results
    });
});

export default router;
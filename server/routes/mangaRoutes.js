import express from 'express';
import { getMangaById, createManga } from '../controllers/mangaController.js'; // Import your controller functions

const router = express.Router();

// Route to get manga details by ID
router.get('/:manga_id', getMangaById);

// Route to create a new manga
router.post('/', createManga);

// New route for searching manga by title
router.get('/search', (req, res) => {
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


// Route to get chapter details
router.get('/chapter/:chapterId', async (req, res) => {
    const { chapterId } = req.params;
    try {
        const response = await axios.get(`https://api.mangadex.org/chapter/${chapterId}`);
        const chapterData = response.data.data;

        // Format the response to only include necessary data
        const formattedData = {
            id: chapterData.id,
            title: chapterData.attributes.title,
            pages: chapterData.attributes.pages.map(page => 
                `https://uploads.mangadex.org/data/${chapterData.relationships.find(r => r.type === 'manga').id}/${page}`
            ),
            volume: chapterData.attributes.volume,
            chapter: chapterData.attributes.chapter,
        };

        res.status(200).json({ data: formattedData });
    } catch (error) {
        console.error('Error fetching chapter data:', error);
        res.status(500).json({ message: 'Error fetching chapter data' });
    }
});

export default router;
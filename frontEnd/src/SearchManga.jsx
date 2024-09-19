import React, { useState } from 'react';
import axios from 'axios';
import FormatManga from './FormatManga'; // Assuming you have this component to format manga display

function SearchManga() {
    const [query, setQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [error, setError] = useState('');

    const handleSearch = async (event) => {
        event.preventDefault();
        setError(''); // Clear previous errors

        try {
            const response = await axios.get(`http://localhost:8081/manga/search`, {
                params: { query } // Send the search query as a parameter
            });
            setSearchResults(response.data.data); // Assuming response.data.data contains the search results
        } catch (err) {
            console.error("Error fetching search results:", err);
            setError("An error occurred while searching for manga.");
        }
    };

    return (
        <div className="search-manga-container">
            <h2>Search Manga</h2>
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for manga..."
                    required
                />
                <button type="submit">Search</button>
            </form>

            {error && <p className="error-message">{error}</p>}

            <div className="search-results-container">
                {searchResults.length > 0 ? (
                    searchResults.map((manga) => (
                        <FormatManga key={manga.manga_id} manga={manga} />
                    ))
                ) : (
                    <p>No results found.</p>
                )}
            </div>
        </div>
    );
}

export default SearchManga;
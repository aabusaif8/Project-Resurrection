// src/pages/MangaDetail.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MangaInfo from '../components/MangaInfo';

function MangaDetail({ mangaId }) {
    const [manga, setManga] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchMangaData = async () => {
            try {
                const response = await axios.get(`http://localhost:8081/manga/${mangaId}`);
                console.log(response.data)
                setManga(response.data); // Assuming the response contains the manga data
            } catch (err) {
                setError('Failed to fetch manga details.');
            } finally {
                setLoading(false);
            }
        };

        fetchMangaData();
    }, [mangaId]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            {manga && (
                <MangaInfo
                    title={manga.title}
                    author={manga.author}
                    rating={manga.rating}
                    description={manga.description}
                />
            )}
        </div>
    );
}

export default MangaDetail;
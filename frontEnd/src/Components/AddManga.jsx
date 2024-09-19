// components/AddManga.jsx
import React, { useState } from 'react';
import axios from 'axios';

function AddManga() {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [rating, setRating] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        const mangaData = {
            title,
            author,
            description,
            image_url: imageUrl,
            rating
        };

        try {
            const response = await axios.post('http://localhost:8081/manga', mangaData); // Adjust the URL as necessary
            console.log('Manga created:', response.data);
            // Optionally, redirect or show a success message
        } catch (error) {
            console.error("Error creating manga:", error);
        }
    };

    return (
        <div>
            <h2>Add New Manga</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                <input type="text" placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)} required />
                <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
                <input type="text" placeholder="Image URL" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} required />
                <input type="number" placeholder="Rating" value={rating} onChange={(e) => setRating(e.target.value)} required />
                <button type="submit">Add Manga</button>
            </form>
        </div>
    );
}

export default AddManga;
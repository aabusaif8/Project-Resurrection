import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddManga() {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        const mangaData = {
            title,
            author,
            description,
            imageUrl,
        };

        axios.post('http://localhost:8081/manga', mangaData)
            .then(res => {
                if (res.data.Status === "Success") {
                    alert("Manga added successfully!");
                    navigate('/'); // Redirect to the manga list page or another page
                } else {
                    alert(res.data.Error); // Show error message
                }
            })
            .catch(err => {
                console.error("Error adding manga:", err);
                alert("An error occurred while adding manga.");
            });
    };

    return (
        <div className="add-manga-container">
            <h2>Add New Manga</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Author:</label>
                    <input
                        type="text"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Image URL:</label>
                    <input
                        type="text"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Add Manga</button>
            </form>
        </div>
    );
}

export default AddManga;
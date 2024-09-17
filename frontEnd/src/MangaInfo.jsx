import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useParams and useNavigate
import axios from 'axios'; // Import Axios
import './Components/CSS/MangaInfo.css'; // Import the CSS file

function MangaInfo() {
    const { id } = useParams(); // Get the manga_id from the URL
    const navigate = useNavigate(); // Initialize useNavigate
    const [manga, setManga] = useState(null); // State to hold manga data
    const [loading, setLoading] = useState(true); // Loading state
    const [userId, setUserId] = useState(null); // State to hold the logged-in user's ID
    const [userRole, setUserRole] = useState(null); // State to hold the logged-in user's role

    useEffect(() => {
        // Fetch user data to get user ID
        const fetchUserData = async () => {
            try {
                const response = await axios.get('/api/user'); // Adjust the endpoint to fetch user data
                setUserId(response.data.id); // Set user ID
            } catch (error) {
                console.error("Error fetching user data:", error);
                setUserId(null); // Set user to null if not logged in
            }
        };

        // Fetch user role
        const fetchUserRole = async () => {
            try {
                const response = await axios.get('/api/role'); // Fetch user role from existing route
                setUserRole(response.data.role); // Set user role
            } catch (error) {
                console.error("Error fetching user role:", error);
                setUserRole(null); // Set role to null if not logged in
            }
        };

        fetchUserData();
        fetchUserRole();
    }, []); // Fetch user data and role once on component mount

    useEffect(() => {
        const fetchMangaInfo = async () => {
            try {
                const response = await axios.get(`http://localhost:8081/manga/${id}`); // Fetch manga details
                console.log(response.data);
                setManga(response.data.data); // Set manga data
                setLoading(false); // Set loading to false
            } catch (error) {
                console.error("Error fetching manga info:", error);
                setLoading(false); // Set loading to false even on error
            }
        };

        fetchMangaInfo();
    }, [id]); // Fetch data when manga_id changes

    const handleDeleteComment = async (commentId) => {
        console.log("Deleting comment with ID:", commentId);
        try {
            await axios.delete(`http://localhost:8081/comments/${commentId}`); // Send delete request to backend
            setManga((prevManga) => ({
                ...prevManga,
                comments: prevManga.comments.filter(comment => comment.comment_id !== commentId) // Update state to remove deleted comment
            }));
        } catch (error) {
            console.error("Error deleting comment:", error);
        }
    };

    if (loading) {
        return <div>Loading...</div>; // Show loading message
    }

    if (!manga) {
        return <div>Manga not found.</div>; // Show message if manga not found
    }

    return (
        <div className="manga-info-container">
            <button className="back-button" onClick={() => navigate('/')}>
                Back to Home
            </button>

            <img src={manga.image_url} alt={manga.title} className="manga-image" />

            <h2 className="manga-title">{manga.title}</h2>
            <p className="manga-author"><strong>Author:</strong> {manga.author}</p>
            <p className="manga-rating"><strong>Rating:</strong> {manga.rating}</p>
            <p className="manga-description"><strong>Description:</strong> {manga.description}</p>

            <h3>Comments</h3>
            <div className="comments-container">
                {manga.comments && manga.comments.length > 0 ? (
                    manga.comments.map((comment) => (
                        <div key={comment.comment_id} className="comment-card">
                            <p><strong>User {comment.user_id}:</strong> {comment.comment}</p>
                            {(userId && (userId === comment.user_id || userRole === 'Admin')) && ( // Check if user is logged in and has permission
                                <button className="delete-button" onClick={() => handleDeleteComment(comment.comment_id)}>
                                    Delete
                                </button>
                            )}
                        </div>
                    ))
                ) : (
                    <p>No comments available.</p> // Message if no comments
                )}
            </div>
        </div>
    );
}

export default MangaInfo;
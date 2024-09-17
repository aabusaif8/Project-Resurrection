import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Comments() {
    const [comments, setComments] = useState([]); // State to hold comments data
    const [loading, setLoading] = useState(true); // Loading state

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axios.get('http://localhost:8081/comments'); // Adjust the endpoint as needed
                console.log(response)
                setComments(response.data.data); // Set comments data
            } catch (error) {
                console.error("Error fetching comments:", error);
            } finally {
                setLoading(false); // Set loading to false
            }
        };

        fetchComments(); // Fetch comments when component mounts
    }, []); // Empty dependency array to run only once

    if (loading) {
        return <div>Loading comments...</div>; // Show loading message
    }

    if (comments.length === 0) {
        return <div>No comments available.</div>; // Show message if no comments found
    }

    return (
        <div className="comments-container">
            <h3>Comments</h3>
            {comments.map((comment) => (
                <div key={comment.id} className="comment-card">
                    <p><strong>{comment.username}:</strong> {comment.text}</p>
                </div>
            ))}
        </div>
    );
}

export default Comments;
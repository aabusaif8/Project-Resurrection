import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import axios from 'axios';
import ListManga from './Components/ListManga';
import RevolvingCardBelt from './Components/RevolvingCards'; // Import the new component
import "./Components/CSS/Home.css";

function Home() {
    const [auth, setAuth] = useState(false);
    const [message, setMessage] = useState('');
    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate
    axios.defaults.withCredentials = true;

    useEffect(() => {
        // Check if the user is authenticated
        const token = localStorage.getItem('token');
        if (token) {
            setAuth(true);
            setName(localStorage.getItem('name')); // Retrieve the user name from localStorage
            setRole(localStorage.getItem('userRole')); // Retrieve the user role from localStorage
        } else {
            setAuth(false);
        }
    }, []);
    
    const handleLogout = () => {
        console.log("Logging out...");
        axios.get('http://localhost:8081/logout')
            .then(res => {
                console.log("Logout response:", res.data);
                localStorage.removeItem('token'); // Clear the token
                localStorage.removeItem('userId'); // Clear the user ID
                localStorage.removeItem('userRole'); // Clear the user role
                localStorage.removeItem('name'); // Clear the user name
                location.reload(true); // Reload the page
            })
            .catch(err => {
                console.error("Logout error:", err);
            });
    };

    const handleAddMangaClick = () => {
        navigate('/add-manga'); // Navigate to the AddManga page
    };

    return (
        <div className="page-container">
            <div className='container mt-4'>
                <div className="dashboard-header">
                    <nav className="dashboard-nav">
                        {auth ? (
                            <>
                                <Link to="/manga" className="dashboard-button">All Manga</Link>
                                <Link to="/search" className="dashboard-button">Search</Link>
                                <button className='btn btn-danger' onClick={handleLogout}>Logout</button>
                                {role === 'Admin' && ( // Show the Add Manga button only for Admins
                                    <button className="dashboard-button" onClick={handleAddMangaClick}>Add New Manga</button>
                                )}
                            </>
                        ) : (
                            <>
                                <Link to="/manga" className="dashboard-button">All Manga</Link>
                                <Link to="/search" className="dashboard-button">Search</Link>
                                <Link to="/login" className='dashboard-button'>Login</Link>
                            </>
                        )}
                    </nav>
                </div>

                {auth && <h3>Welcome {name} ({role})</h3>} {/* Display welcome message with role and name */}

                {/* Revolving Card Belt */}
                <RevolvingCardBelt />

                <div className="popular-manga-container">
                    <h2>Most Popular Manga</h2>
                    <main className="dashboard-content">
                        <ListManga /> {/* This component will fetch and display the top 10 manga data */}
                    </main>
                    <Link to="/manga" className="dashboard-button">View All Manga</Link> {/* Button to view all manga */}
                </div>
            </div>
        </div>
    );
}

export default Home;
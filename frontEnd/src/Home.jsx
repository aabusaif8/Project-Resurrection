import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ListManga from './Components/ListManga';
import RevolvingCardBelt from './Components/RevolvingCards'; // Import the new component
import "./Components/CSS/Home.css";

function Home() {
    const [auth, setAuth] = useState(false);
    const [message, setMessage] = useState('');
    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    axios.defaults.withCredentials = true;

    useEffect(() => {
        axios.get('http://localhost:8081')
            .then(res => {
                if (res.data.Status === "Success") {
                    setAuth(true);
                    setName(res.data.name);
                    return axios.get('http://localhost:8081/role');
                } else {
                    setAuth(false);
                    setMessage(res.data.Error);
                }
            })
            .then(res => {
                if (res && res.data.Status === "Success") {
                    setRole(res.data.role);
                }
            })
            .catch(err => console.log(err));
    }, []);

    const handleLogout = () => {
        axios.get('http://localhost:8081/logout')
            .then(res => {
                location.reload(true);
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="page-container">
            <div className='container mt-4'>
                <div className="dashboard-header">
                    <nav className="dashboard-nav">
                        {auth ? (
                            <>
                                <Link to="/createReview" className="dashboard-button">Write Reviews</Link>
                                <Link to="/allManga" className="dashboard-button">All Manga</Link>
                                <Link to="/search" className="dashboard-button">Search</Link>
                                <button className='btn btn-danger' onClick={handleLogout}>Logout</button>
                            </>
                        ) : (
                            <>
                                <Link to="/allManga" className="dashboard-button">All Manga</Link>
                                <Link to="/search" className="dashboard-button">Search</Link>
                                <Link to="/login" className='dashboard-button'>Login</Link>
                            </>
                        )}
                    </nav>
                </div>

                {auth && <h3>Welcome {role}: {name}</h3>} {/* Display welcome message with role and name */}

                {/* Revolving Card Belt */}
                <RevolvingCardBelt />

                <div className="popular-manga-container">
                    <h2>Most Popular Manga</h2>
                    <main className="dashboard-content">
                        <ListManga /> {/* This component will fetch and display manga data */}
                    </main>
                </div>
            </div>
        </div>
    );
}

export default Home;
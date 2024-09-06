// src/components/Dashboard.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ListManga from "./ListManga"; // Ensure this component fetches data from the new API

function Dashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if the user is authenticated by checking the cookie
    const token = document.cookie.split('; ').find(row => row.startsWith('token='));
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    // Clear the cookie on logout (you may need to set the cookie options to match your server settings)
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setIsAuthenticated(false);
    // Additional logic for redirecting or updating UI after logout
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <nav className="dashboard-nav">
          <Link to="/createReview" className="dashboard-button">Write Reviews</Link>
          <Link to="/allManga" className="dashboard-button">All Manga</Link>
          <Link to="/search" className="dashboard-button">Search</Link>
          {isAuthenticated ? (
            <button onClick={handleLogout} className="dashboard-button">Logout</button>
          ) : (
            <Link to="/login" className="dashboard-button">Sign In</Link>
          )}
        </nav>
      </div>
      <div className="popular-manga-container">
        <h2>Most Popular Manga</h2>
        <main className="dashboard-content">
          <ListManga /> {/* This component will fetch and display manga data */}
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
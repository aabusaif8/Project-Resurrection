import React from 'react';
import { useNavigate } from 'react-router-dom';

function NavBar({ onGenreSelect, onLetterSelect, onSortByPopularity, onSortByReleaseDate }) {
    const navigate = useNavigate();

    return (
        <div className="nav-bar">
            <button onClick={onGenreSelect}>Select Genre</button>
            <button onClick={onLetterSelect}>Select by Letter</button>
            <button onClick={onSortByPopularity}>Sort by Popularity</button>
            <button onClick={onSortByReleaseDate}>Sort by Release Date</button>
            <button onClick={() => navigate('/')}>Return Home</button> {/* Navigate to home */}
        </div>
    );
}

export default NavBar;
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Register from './Register';
import Login from './Login';
import AllManga from './AllManga'; // Assuming you have this component for listing all manga
import MangaInfo from './MangaInfo'; // Import the MangaInfo component
import AddManga from './AddManga'; // Import the AddManga component
import Comments from './Components/Comments';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/manga' element={<AllManga />} /> {/* This could be your list of all manga */}
                <Route path='/add-manga' element={<AddManga />} /> {/* Route for adding manga */}
                <Route path='/manga/:id' element={<MangaInfo />} /> {/* Route for manga info */}
                <Route path='/register' element={<Register />} />
                <Route path='/login' element={<Login />} />
                <Route path='/comments' element={<Comments />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
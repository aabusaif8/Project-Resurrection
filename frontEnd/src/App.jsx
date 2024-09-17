import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './Home'
import Register from './Register'
import Login from './Login'
import AllManga from './AllManga'
import MangaInfo from './MangaInfo'
import Comments from './Components/Comments'

function App(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/manga' element={<AllManga />}></Route>
        <Route path='/manga/:id' element={<MangaInfo />}></Route>
        <Route path='/comments' element={<Comments />}></Route>
      </Routes>
    </BrowserRouter>
    )
}

export default App
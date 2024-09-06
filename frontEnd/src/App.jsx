import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './Home'
import Register from './Register'
import Login from './Login'
import Dashboard from './Components/Dashboard'

function App(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/dashboard' element={<Dashboard />}></Route>
      </Routes>
    </BrowserRouter>
    )
}

export default App
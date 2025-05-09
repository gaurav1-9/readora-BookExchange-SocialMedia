import React, { useEffect, useState } from 'react'
import { useAuth } from './AuthContext'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Authentication from './pages/Authentication'
import Register from './pages/Register'
import Feed from './pages/Feed'
import Profile from './pages/Profile'
import Chats from './pages/Chats'
import axios from 'axios'

const App = () => {
  const { isLoggedIn, setIsLoggedIn, setUser, user } = useAuth()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get('http://localhost:5000/api/auth/session', { withCredentials: true })
      .then(res => {
        if (res.data?.err) {
          setIsLoggedIn(true)
          setUser(res.data.user)  // Set the entire user object
        } else {
          setIsLoggedIn(false)
          setUser(null)  // Clear user if not logged in
        }
        setLoading(false)
      })
      .catch(() => {
        setIsLoggedIn(false)
        setUser(null)  // Clear user if session check fails
        setLoading(false)
      })
  }, [setIsLoggedIn, setUser])
  console.log("Loading:", loading)
  console.log("Is Logged In:", isLoggedIn)
  console.log("user data:", user)

  return (
    <div className='bg-vanila h-screen w-full flex'>
      {
        (loading) ? "Loading"
          : <Routes>
            <Route path='/' element={(isLoggedIn) ? <Home /> : <Navigate to='/auth/login' replace />} >
              <Route index element={<Feed />} />
              <Route path="/account" element={<Profile />} />
              <Route path="/chats" element={<Chats />} />
            </Route>
            <Route path='/auth' element={(isLoggedIn) ? <Navigate to="/" replace /> : <Authentication />}>
              <Route index element={<Navigate to="login" replace />} />
              <Route path='login' element={<Login />} />
              <Route path='register' element={<Register />} />
            </Route>
          </Routes>
      }
    </div>
  )
}

export default App
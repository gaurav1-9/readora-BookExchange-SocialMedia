import React, { useEffect, useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './Components/HomepageComponents/HomePage'
import Auth from './Components/Authentication/Auth'
import axios from 'axios'
import { useAuth } from './AuthContext'
import Feed from './Components/Feed/Feed'
import Account from './Components/Account/Account'
import Chats from './Components/Chats/Chats'

const App = () => {
  const { isLoggedIn, setIsLoggedIn, setUser } = useAuth()  // Use setUser for the whole user object
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get('http://localhost:5000/api/auth/session', { withCredentials: true })
      .then(res => {
        if (res.data?.user) {
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

  if (loading) return <div>Loading...</div>

  return (
    <div className='bg-vanila min-h-screen w-full flex'>
      <Routes>
        <Route path="/" element={isLoggedIn ? <HomePage /> : <Navigate to="/login" />}>
          <Route index element={<Feed />} />
          <Route path="/account" element={<Account />} />
          <Route path="/chats" element={<Chats />} />
        </Route>

        <Route path="/*" element={isLoggedIn ? <Navigate to="/" /> : <Auth />} />
      </Routes>
    </div>
  )
}

export default App

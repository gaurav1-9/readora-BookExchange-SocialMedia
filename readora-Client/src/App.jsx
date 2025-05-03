import React, { useEffect, useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './Components/HomepageComponents/HomePage'
import Auth from './Components/Authentication/Auth'
import axios from 'axios'

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get('/auth/session', { withCredentials: true })
      .then(res => {
        if (res.data?.user) {
          setIsLoggedIn(true)
        } else {
          setIsLoggedIn(false)
        }
        setLoading(false)
      })
      .catch(() => {
        setIsLoggedIn(false)
        setLoading(false)
      })
  }, [])

  if (loading) return <div>Loading...</div>

  return (
    <div className='bg-vanila min-h-screen w-full flex'>
      <Routes>
        <Route path="/" element={isLoggedIn ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/*" element={isLoggedIn ? <Navigate to="/" /> : <Auth />} />
      </Routes>
    </div>
  )
}

export default App

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
import Following from './pages/Following'
import axios from 'axios'
import Followers from './pages/Followers'
import Search from './pages/Search'
import OtherProfiles from './pages/OtherProfiles'
import Messaging from './pages/Messaging'
import ProfileMessaging from './pages/Profilemessaging'

const App = () => {
  const { isLoggedIn, setIsLoggedIn, setUser } = useAuth()
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

  return (
    <div className='bg-vanila min-h-screen w-full flex'>
      {
        (loading) ? "Loading"
          : <Routes>
            <Route path='/' element={(isLoggedIn) ? <Home /> : <Navigate to='/auth/login' replace />} >
              <Route index element={<Feed />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/chats" element={<Chats />} />
              <Route path="/followings" element={<Following />} />
              <Route path="/followers" element={<Followers />} />
              <Route path="/search" element={<Search />} />
              <Route path="/user/:targetUser" element={<OtherProfiles />} />
              <Route path="/msg/:chatId/:targetUser" element={<Messaging />} />
              <Route path="/chat/:targetUser" element={<ProfileMessaging />} />
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
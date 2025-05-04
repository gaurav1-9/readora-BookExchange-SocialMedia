import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/auth/me', { withCredentials: true })
        setUser(res.data.user)
        setIsLoggedIn(true)
      } catch (err) {
        console.log("Not logged in or session expired")
        setUser(null)
        setIsLoggedIn(false)
      }
    }

    fetchUser()
  }, [])

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, user, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

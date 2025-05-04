import { createContext, useContext, useState } from 'react'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userID, setUserID] = useState(null)

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, userID, setUserID }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

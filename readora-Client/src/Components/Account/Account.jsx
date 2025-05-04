import React, { useEffect, useState } from 'react'
import { useAuth } from '../../AuthContext'
import axios from 'axios'
import Profile from './Profile'

const Account = () => {
  const { user } = useAuth()
  const [profile, setProfile] = useState({})

  useEffect(() => {
    if (user) {
      // Fetch the profile data only if the user is logged in
      axios.get(`http://localhost:5000/api/users/${user}`, { withCredentials: true })
        .then(res => {
          setProfile(res.data?.msg)
        })
        .catch(err => {
          console.error(err)
        })
    }
  }, [user])  // Run this effect whenever `user` changes

  return (
    <div>
      {
        profile ? <Profile profileDetails={profile} />
          : (
            <p>Loading...</p>  // Show loading if profile is still empty
          )
      }
    </div>
  )
}

export default Account

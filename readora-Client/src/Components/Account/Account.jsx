import React, { useEffect, useState } from 'react'
import { useAuth } from '../../AuthContext'
import axios from 'axios'
import Profile from './Profile'

const Account = () => {
  const { user } = useAuth()
  const [profile, setProfile] = useState({})

  useEffect(() => {
    if (user) {
      axios.get(`http://localhost:5000/api/users/${user}`, { withCredentials: true })
        .then(res => {
          setProfile(res.data?.msg)
        })
        .catch(err => {
          console.error(err)
        })
    }
  }, [user])

  return (
    <div className='mx-20 mt-10'>
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

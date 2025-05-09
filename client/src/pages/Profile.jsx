import React from 'react'
import { useAuth } from '../AuthContext'
import { ProfileUserDetails } from '../components/ProfileUserDetails'

const Profile = () => {
  const { user } = useAuth()
  return (
    <ProfileUserDetails user={user}/>
  )
}

export default Profile
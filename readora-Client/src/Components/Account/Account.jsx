import React, { useEffect, useState } from 'react'
import { useAuth } from '../../AuthContext'
import axios from 'axios'
import Profile from './Profile'
import UserPosts from './UserPosts'

const Account = () => {
  const { user } = useAuth()
  const [profile, setProfile] = useState(null)
  const [userPost, setUserPost] = useState([])
  const [loadingPosts, setLoadingPosts] = useState(false)

  useEffect(() => {
    const fetchProfileAndPosts = async () => {
      try {
        if (!user) return

        // Fetch user profile
        const userRes = await axios.get(`http://localhost:5000/api/users/${user}`, { withCredentials: true })
        const userData = userRes.data?.msg
        setProfile(userData)

        // Fetch user posts
        if (userData && userData._id) {
          setLoadingPosts(true)
          const postsRes = await axios.get(`http://localhost:5000/api/posts/${userData._id}/profilePost`, { withCredentials: true })
          setUserPost(postsRes.data?.msg || [])
        }
      } catch (err) {
        console.error('Error fetching user or posts:', err)
      } finally {
        setLoadingPosts(false)
      }
    }

    fetchProfileAndPosts()
  }, [user])

  return (
    <div className='mx-20 mt-10'>
      {profile ? (
        <>
          <Profile profileDetails={profile} />
          {loadingPosts ? (
            <p className="text-gunMetal mt-4">Loading posts...</p>
          ) : (
            <UserPosts posts={userPost} />
          )}
        </>
      ) : (
        <p className="text-gunMetal">Loading profile...</p>
      )}
    </div>
  )
}

export default Account

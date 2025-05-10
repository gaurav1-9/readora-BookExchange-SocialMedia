import React, { useEffect, useState } from 'react'
import { useAuth } from '../AuthContext'
import { ProfileUserDetails } from '../components/ProfileUserDetails'
import axios from 'axios'
import ProfilePosts from '../components/ProfilePosts'

const Profile = () => {
  const { user } = useAuth()
  const [posts, setPosts] = useState([])
  const [postLoader, setPostLoader] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      if (!user?._id) return;
      try {
        const res = await axios.get(`http://localhost:5000/api/posts/${user._id}/profilePost`, {
          withCredentials: true
        })
        setPosts(res.data.msg)
        setPostLoader(false)
      } catch (err) {
        console.error("Error fetching profile posts:", err.response?.data?.msg || err.message)
      }
    }

    fetchPosts()
  }, [user])

  return (
    <div>
      <ProfileUserDetails user={user} />
      {
        (postLoader)
          ? <p className='mt-10 text-center text-xl font-light text-gunMetal'>Loading...</p>
          : <ProfilePosts postList={posts} uploader={user}/>
          
      }
    </div>
  )
}

export default Profile
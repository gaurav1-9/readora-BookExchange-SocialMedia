import React, { useEffect, useState } from 'react'
import { useAuth } from '../AuthContext'
import axios from 'axios'
import Follower_FollowingList from '../components/Follower_FollowingList';

const Following = () => {
  const { user } = useAuth()
  const [followings, setFollowings] = useState([])
  const [loadingFollowings, setLoadingFollowings] = useState(true)

  useEffect(() => {
    if (!user.followers.length) {
      setLoadingFollowings(false);
      return;
    }

    axios.get(`http://localhost:5000/api/users/details/following?ids=${user.followings}`)
      .then(res => {
        setFollowings(res.data)
        setLoadingFollowings(false)
      })
      .catch(err => {
        console.error("Failed to fetch followings data", err)
        setLoadingFollowings(false)
      })
  }, [user])

  return (
    <Follower_FollowingList listType="Following" loading={loadingFollowings} list={followings}/>
  )
}

export default Following
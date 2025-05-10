import React, { useEffect, useState } from 'react'
import { useAuth } from '../AuthContext'
import axios from 'axios'
import Follower_FollowingList from '../components/Follower_FollowingList';

const Followers = () => {
  const { user } = useAuth()
  const [followers, setFollowers] = useState([])
  const [loadingFollowers, setLoadingFollowers] = useState(true)

  useEffect(() => {
    if (!user.followers.length) {
      setLoadingFollowers(false);
      return;
    }

    axios.get(`http://localhost:5000/api/users/details/following?ids=${user.followers}`)
      .then(res => {
        setFollowers(res.data)
        setLoadingFollowers(false)
      })
      .catch(err => {
        console.error("Failed to fetch followings data", err)
        setLoadingFollowers(false)
      })
  }, [user])

  return (
    <Follower_FollowingList listType="Followers" loading={loadingFollowers} list={followers}/>
  )
}

export default Followers
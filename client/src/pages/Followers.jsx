import React, { useEffect, useState } from 'react'
import { useAuth } from '../AuthContext'
import axios from 'axios'
import Follower_FollowingList from '../components/Follower_FollowingList';

const Followers = () => {
  const { user, setUser } = useAuth()
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
        console.error("Failed to fetch followers data", err)
        setLoadingFollowers(false)
      })
  }, [user])

  const handleToggleFollow = async (targetUserId) => {
    // 1. Optimistically update the UI
    let updatedFollowings = [];

    if (user.followings.includes(targetUserId)) {
      updatedFollowings = user.followings.filter(id => id !== targetUserId);
    } else {
      updatedFollowings = [...user.followings, targetUserId];
    }

    setUser({ ...user, followings: updatedFollowings });

    // 2. Update DB
    try {
      await axios.post(`http://localhost:5000/api/users/toggle-follow`, {
        userId: user._id,
        targetUserId,
      });
    } catch (error) {
      console.error("Failed to update follow status", error);
      // Optional: Revert UI if backend fails
    }
  };

  return (
    <Follower_FollowingList
      listType="Followers"
      loading={loadingFollowers}
      list={followers}
      userFollowings={user.followings}
      onToggleFollow={handleToggleFollow}
    />
  )
}


export default Followers
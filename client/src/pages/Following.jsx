import React, { useEffect, useState } from 'react'
import { useAuth } from '../AuthContext'
import axios from 'axios'
import Follower_FollowingList from '../components/Follower_FollowingList'

const Following = () => {
  const { user, setUser } = useAuth()
  const [followings, setFollowings] = useState([])
  const [loadingFollowings, setLoadingFollowings] = useState(true)

  useEffect(() => {
    if (!user.followings.length) {
      setLoadingFollowings(false)
      return
    }

    const idsString = user.followings.join(',')
    axios
      .get(`http://localhost:5000/api/users/details/following?ids=${idsString}`)
      .then(res => {
        setFollowings(res.data)
        setLoadingFollowings(false)
      })
      .catch(err => {
        console.error('Failed to fetch followings data', err)
        setLoadingFollowings(false)
      })
  }, [user])

  const handleToggleFollow = async (targetUserId) => {
    // Optimistically update UI
    let updatedFollowings = []

    if (user.followings.includes(targetUserId)) {
      updatedFollowings = user.followings.filter(id => id !== targetUserId)
    } else {
      updatedFollowings = [...user.followings, targetUserId]
    }

    setUser({ ...user, followings: updatedFollowings })

    // Update DB
    try {
      await axios.post(`http://localhost:5000/api/users/toggle-follow`, {
        userId: user._id,
        targetUserId,
      })
    } catch (error) {
      console.error('Failed to update follow status', error)
      // Optional: Revert UI if backend fails
    }
  }

  return (
    <Follower_FollowingList
      listType="Following"
      loading={loadingFollowings}
      list={followings}
      userFollowings={user.followings}
      onToggleFollow={handleToggleFollow}
    />
  )
}

export default Following

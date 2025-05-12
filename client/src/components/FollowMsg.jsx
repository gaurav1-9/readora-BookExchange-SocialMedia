import React, { useState } from 'react'
import { useAuth } from '../AuthContext'
import { HiUserAdd } from "react-icons/hi"
import { FaUserMinus } from "react-icons/fa6"
import { MdChat } from "react-icons/md"
import axios from 'axios'

const FollowMsg = ({ profileUser, refetchProfile }) => {
  const { user, setUser } = useAuth()
  const [loading, setLoading] = useState(false)

  const handleToggleFollow = async () => {
    setLoading(true)

    try {
      if (user.followings.includes(profileUser._id)) {
        // Unfollow
        await axios.put(`http://localhost:5000/api/users/${profileUser._id}/unfollow`, {
          id: user._id
        })
      } else {
        // Follow
        await axios.put(`http://localhost:5000/api/users/${profileUser._id}/follow`, {
          id: user._id
        })
      }

      // Refetch logged-in user data
      const response = await axios.get(`http://localhost:5000/api/users/${user._id}`)
      setUser(response.data.msg)

      // Refetch profile user's data to update follower count
      refetchProfile()

    } catch (error) {
      console.error('Failed to update follow status', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex mt-2">
      {
        user.followings.includes(profileUser._id)
          ? <button
              onClick={handleToggleFollow}
              disabled={loading}
              className={`flex items-center justify-center cursor-pointer gap-2 rounded-lg uppercase text-azul outline-none border-3 border-azul py-1 w-35 font-semibold hover:border-azul/80 hover:text-azul/90 ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <FaUserMinus className='text-xl' />
              {loading ? 'Processing...' : 'Unfollow'}
            </button>
          : <button
              onClick={handleToggleFollow}
              disabled={loading}
              className={`flex items-center justify-center cursor-pointer gap-2 rounded-lg uppercase text-babyPowder outline-none bg-azul py-1 w-35 font-semibold border-3 border-azul hover:border-azul/70 hover:bg-azul/87 ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <HiUserAdd className='text-xl' />
              {loading ? 'Processing...' : 'Follow'}
            </button>
      }
      <div className="p-3 rounded-full bg-azul ml-3 hover:bg-azul/87 cursor-pointer">
        <MdChat className='text-xl text-babyPowder' />
      </div>
    </div>
  )
}

export default FollowMsg

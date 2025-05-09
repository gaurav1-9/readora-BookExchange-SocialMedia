import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { FaUserFriends } from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";

const FriendList = ({ followingList }) => {
  const [loadingFriends, setLoadingFriends] = useState(true);
  const [followingData, setFollowingData] = useState([])

  useEffect(() => {
    if (!followingList.length) {
      setLoadingFriends(false);
      return;
    }

    const ids = followingList.join(',')
    axios.get(`http://localhost:5000/api/users/details/following/?ids=${ids}`)
      .then(res => {
        setFollowingData(res.data)
        setLoadingFriends(false)
      })
      .catch(err => {
        console.error("Failed to fetch followings data", err)
        setLoadingFriends(false)
      })
  }, [followingList])

  return (
    <div className='flex-1 h-screen sticky top-0 items-center pt-10'>
      <div className='w-8/9 mt-3 bg-gunMetal rounded-xl p-4 '>
        <div className='flex items-center gap-2 mb-4'>
          <FaUserFriends className='text-babyPowder text-2xl' />
          <p className='text-babyPowder font-semibold text-2xl'>Your Friends</p>
        </div>

        {/* 🟡 Show loading only in the list area */}
        {loadingFriends ? (
          <p className="text-babyPowder">Loading...</p>
        ) : followingData.length ? (
          followingData.map((item, index) => (
            <div key={index} className='flex p-2 rounded-xl justify-between items-center'>
              <div className='flex' onClick={() => console.log(item)}>
                <img src={item.profilePic || '/default-profile.png'} alt="Friend" className="w-10 h-10 rounded-full cursor-pointer" draggable='false' />
                <div className='flex flex-col pl-2'>
                  <p className='leading-4 font-semibold text-lg text-babyPowder cursor-pointer hover:text-tomato'>{item.username}</p>
                  <p className='text-sm text-babyPowder'>{item.name}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-babyPowder">Looks like you haven't connected with anyone yet!</p>
        )}

        {/* Footer link */}
        {
          !loadingFriends && followingData.length > 0 && (
            <div className='mt-5 flex justify-end'>
              <p className='text-right text-babyPowder hover:text-tomato flex items-center gap-2 cursor-pointer'>
                <FaArrowLeftLong />
                view entire friend list
              </p>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default FriendList
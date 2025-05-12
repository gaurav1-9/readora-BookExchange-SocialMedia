import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../AuthContext'
import FollowMsg from './FollowMsg'

export const ProfileUserDetails = ({ user: profileUser, refetchProfile }) => {
  const { user } = useAuth()

  return (
    <div className='pt-10 px-4 bg-vanila pb-2'>
      <div className="flex gap-3 items-center">
        <img src={profileUser.profilePicture || "/default-pic.png"} className='rounded-full w-40 border-8 border-azul' />
        <div className="flex flex-col">
          <div className="flex gap-4">
            <Link to={(profileUser._id===user._id)?"/followers":""} className="flex flex-col justify-center items-center bg-gunMetal text-babyPowder py-2 px-4 rounded-xl hover:bg-gunMetal/90">
              <p className='text-3xl font-semibold'>{profileUser.followers.length}</p>
              <p className='text-base pl-1'>Followers</p>
            </Link>
            <Link to={(profileUser._id===user._id)?"/followings":""} className="flex flex-col justify-center items-center bg-gunMetal text-babyPowder py-2 px-4 rounded-xl hover:bg-gunMetal/90">
              <p className='text-3xl font-semibold'>{profileUser.followings.length}</p>
              <p className='text-base pl-1'>Followings</p>
            </Link>
          </div>
          <div className="mt-2 flex flex-col">
            <p className='font-semibold text-4xl text-gunMetal'>{profileUser.name}</p>
            <p className='leading-3 text-2xl text-gunMetal'>{profileUser.username}</p>
          </div>
        </div>
      </div>
      {
        (profileUser._id === user._id)
          ? null
          : <FollowMsg profileUser={profileUser} refetchProfile={refetchProfile} />
      }
    </div>
  )
}

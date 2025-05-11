import React from 'react'
import { Link } from 'react-router-dom'

export const ProfileUserDetails = ({user}) => {
  return (
    <div className='pt-10 px-4 sticky top-0 bg-vanila pb-5'>
      <div className="flex gap-3 items-center">
        <img src={user.profilePicture || "/default-pic.png"} className='rounded-full w-40 border-8 border-azul' />
        <div className="flex flex-col">
          <div className="flex gap-4">
            <Link to="/followers" className="flex flex-col justify-center items-center bg-gunMetal text-babyPowder py-2 px-4 rounded-xl hover:bg-gunMetal/90">
              <p className='text-3xl font-semibold'>{user.followers.length}</p>
              <p className='text-base pl-1'>Followers</p>
            </Link>
            <Link to="/followings" className="flex flex-col justify-center items-center bg-gunMetal text-babyPowder py-2 px-4 rounded-xl hover:bg-gunMetal/90">
              <p className='text-3xl font-semibold'>{user.followings.length}</p>
              <p className='text-base pl-1'>Followings</p>
            </Link>
          </div>
          <div className="mt-2 flex flex-col">
            <p className='font-semibold text-4xl text-gunMetal'>{user.name}</p>
            <p className='leading-3 text-2xl text-gunMetal'>{user.username}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

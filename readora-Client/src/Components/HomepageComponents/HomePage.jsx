import React from 'react'
import Utilities from './Utilities'
import Feed from './Feed'
import FriendList from './FriendList'

const HomePage = () => {
  return (
    <div className='flex w-screen'>
      <Utilities />
      <Feed />
      <FriendList />
    </div>
  )
}

export default HomePage
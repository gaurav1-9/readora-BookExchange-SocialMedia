import React from 'react'
import Utilities from './Utilities'
import Feed from './Feed'
import FriendSection from '../FriendList/FriendSection'

const HomePage = () => {
  return (
    <div className='flex w-screen'>
      <Utilities />
      <Feed />
      <FriendSection />
    </div>
  )
}

export default HomePage
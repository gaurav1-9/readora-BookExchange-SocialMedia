import React from 'react'
import { Outlet } from 'react-router-dom'
import Utilities from './Utilities'
import FriendSection from '../FriendList/FriendSection'

const HomePage = () => {
  return (
    <div className='flex w-screen'>
      <Utilities />
      <div className='flex-2'>
        <Outlet /> {/* Renders Feed, Account, or Chats based on the route */}
      </div>
      <FriendSection />
    </div>
  )
}

export default HomePage

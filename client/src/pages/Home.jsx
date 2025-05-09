import React from 'react'
import PageList from '../components/PageList'
import FriendList from '../components/FriendList'
import { Outlet } from 'react-router-dom'

const Home = () => {
  return (
    <div className='flex w-screen'>
      <PageList />
      <div className='flex-2'>
        <Outlet /> {/* Renders Feed, Account, or Chats based on the route */}
      </div>
      <FriendList />
    </div>
  )
}

export default Home
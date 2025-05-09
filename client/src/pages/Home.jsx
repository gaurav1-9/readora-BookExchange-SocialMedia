import React from 'react'
import PageList from '../components/PageList'
import FriendList from '../components/FriendList'
import { Outlet } from 'react-router-dom'
import { useAuth } from '../AuthContext'

const Home = () => {
  const {user} = useAuth()
  console.log(user.followings)
  return (
    <div className='flex w-screen'>
      <PageList />
      <div className='flex-2'>
        <Outlet /> {/* Renders Feed, Account, or Chats based on the route */}
      </div>
      <FriendList followingList={user.followings}/>
    </div>
  )
}

export default Home
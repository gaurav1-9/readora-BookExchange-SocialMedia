import React from 'react'
import PageList from '../components/PageList'
import FriendList from '../components/FriendList'
import { Outlet } from 'react-router-dom'
import { useAuth } from '../AuthContext'

const Home = () => {
  const {user} = useAuth()
  return (
    <div className='flex w-screen'>
      <PageList />
      <div className='flex-2'>
        <Outlet />
      </div>
      <FriendList followingList={user.followings}/>
    </div>
  )
}

export default Home
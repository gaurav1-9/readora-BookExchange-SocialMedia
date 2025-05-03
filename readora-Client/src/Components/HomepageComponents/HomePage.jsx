import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Utilities from './Utilities'
import Feed from '../Feed/Feed'
import FriendSection from '../FriendList/FriendSection'
import Account from '../Account/Account'
import Chats from '../Chats/Chats'

const HomePage = () => {
  return (
    <div className='flex w-screen'>
      <Utilities />
      
      <div className='flex-2'>
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/account" element={<Account />} />
          <Route path="/chats" element={<Chats />} />
        </Routes>
      </div>

      <FriendSection />
    </div>
  )
}

export default HomePage
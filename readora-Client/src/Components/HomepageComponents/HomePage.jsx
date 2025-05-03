import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Utilities from './Utilities'
import Feed from '../Feed/Feed'
import FriendSection from '../FriendList/FriendSection'

const HomePage = () => {
  return (
    <div className='flex w-screen'>
      <Utilities />
      
      <div className='flex-2'>
        <Routes>
          <Route path="/" element={<Feed />} />

          {/* Add more routes for different sections */}
          {/* <Route path="/account" element={<Account />} /> */}
          {/* You can add other routes like /chat, /profile, etc. */}
        </Routes>
      </div>

      <FriendSection />
    </div>
  )
}

export default HomePage
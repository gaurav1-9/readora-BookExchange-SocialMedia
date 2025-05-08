import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Logo from '../components/Logo'
import Login from './Login'
import Register from './Register'

const Authentication = () => {
  return (
        <div className='flex w-screen h-screen justify-center items-center'>
            <div className="flex-2 flex justify-end items-centerh-full">
                <img src="/Fingerprint-cuate.png" alt="AuthImg" className='w-3/4'/>
            </div>
            <div className="h-3/4 flex flex-2 flex-col justify-center items-start">
                <div className="mb-4 ml-13">
                    <Logo />
                </div>
                <Login/>
                {/* <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes> */}
            </div>
        </div>
    )
}

export default Authentication
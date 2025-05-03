import React from 'react'
import Logo from '../Logo'
import { Routes, Route } from 'react-router-dom'
import Login from './Login'
import Register from './Register'

const Auth = () => {

    return (
        <div className='flex w-screen h-screen justify-center items-center'>
            <div className="flex-2 flex justify-end items-centerh-full">
                <img src="/Fingerprint-cuate.png" alt="AuthImg" className='w-3/4'/>
            </div>
            <div className="h-3/4 flex flex-2 flex-col justify-center items-start">
                <div className="mb-4">
                    <Logo />
                </div>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </div>
        </div>
    )
}

export default Auth

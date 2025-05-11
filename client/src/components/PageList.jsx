import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { HiUserCircle } from "react-icons/hi"
import { FaHome } from "react-icons/fa"
import { IoLogOut, IoSearch } from "react-icons/io5"
import { MdMessage } from "react-icons/md"
import axios from 'axios'
import { useAuth } from '../AuthContext'
import Logo from './Logo'

const PageList = () => {
    const navigate = useNavigate()
    const { setIsLoggedIn, setUser, user } = useAuth()
    const [color, setColor] = useState(false)

    const handleLogOut = async () => {
        try {
            await axios.post('http://localhost:5000/api/auth/logout', {}, { withCredentials: true })
            setIsLoggedIn(false)
            setUser(null)
            navigate('/login')
        } catch (err) {
            console.error('Logout failed', err)
        }
    }

    return (
        <div className="hidden flex-1 h-screen sticky top-0 items-center pt-10 lg:flex flex-col">
            <Logo />
            <div className="w-8/9 h-fit bg-gunMetal p-4 rounded-xl mt-6">
                <ul className='flex flex-col gap-3'>
                    <li className='p-2 text-2xl text-babyPowder font-semibold cursor-pointer rounded-md hover:bg-tomato hover:text-gunMetal -mb-2' onMouseEnter={()=>setColor(true)} onMouseLeave={()=>setColor(false)}>
                        <Link to="/profile" className="flex gap-2 items-center">
                            <HiUserCircle />
                            <div>
                                <p>Account</p>
                                <p className={`${(!color)?"text-babyPowder/40":"text-gunMetal/80"} text-sm leading-1.5 mb-2 font-light tracking-wider`}>{user.username}</p>
                            </div>
                        </Link>
                    </li>
                    <li className='p-2 text-2xl text-babyPowder font-semibold cursor-pointer rounded-md hover:bg-tomato hover:text-gunMetal'>
                        <Link to="/" className="flex gap-2 items-center">
                            <FaHome />
                            Home
                        </Link>
                    </li>
                    <li className='p-2 text-2xl text-babyPowder font-semibold cursor-pointer rounded-md hover:bg-tomato hover:text-gunMetal'>
                        <Link to="/search" className="flex gap-2 items-center">
                            <IoSearch />
                            Search
                        </Link>
                    </li>
                    <li className='p-2 text-2xl text-babyPowder font-semibold cursor-pointer rounded-md hover:bg-tomato hover:text-gunMetal'>
                        <Link to="/chats" className="flex gap-2 items-center">
                            <MdMessage />
                            Chats
                        </Link>
                    </li>
                    <li
                        className='flex gap-2 items-center p-2 text-2xl text-babyPowder font-semibold cursor-pointer rounded-md hover:bg-tomato hover:text-gunMetal'
                        onClick={handleLogOut}
                    >
                        <IoLogOut />
                        Log Out
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default PageList
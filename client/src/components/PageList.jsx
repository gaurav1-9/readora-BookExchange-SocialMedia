import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { HiUserCircle } from "react-icons/hi"
import { FaHome } from "react-icons/fa"
import { IoLogOut } from "react-icons/io5"
import { MdMessage } from "react-icons/md"
import axios from 'axios'
import { useAuth } from '../AuthContext'
import Logo from './Logo'

const PageList = () => {
    const navigate = useNavigate()
    const { setIsLoggedIn, setUser } = useAuth()

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
                    <li className='p-2 text-2xl text-babyPowder font-semibold cursor-pointer rounded-md hover:bg-tomato hover:text-gunMetal'>
                        <Link to="/account" className="flex gap-2 items-center">
                            <HiUserCircle />
                            Account
                        </Link>
                    </li>
                    <li className='p-2 text-2xl text-babyPowder font-semibold cursor-pointer rounded-md hover:bg-tomato hover:text-gunMetal'>
                        <Link to="/chats" className="flex gap-2 items-center">
                            <MdMessage />
                            Chats
                        </Link>
                    </li>
                    <li className='p-2 text-2xl text-babyPowder font-semibold cursor-pointer rounded-md hover:bg-tomato hover:text-gunMetal'>
                        <Link to="/" className="flex gap-2 items-center">
                            <FaHome />
                            Home
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
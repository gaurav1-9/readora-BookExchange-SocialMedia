import React from 'react'
import { HiUserCircle } from "react-icons/hi"
import { FaHome } from "react-icons/fa"
import { IoLogOut } from "react-icons/io5"
import { MdMessage } from "react-icons/md"
import Logo from './Logo'


const PageList = () => {
    const handleLogOut = () => {

    }

    return (
        <div className="hidden flex-1 h-screen sticky top-0 items-center pt-10 lg:flex flex-col">
            <Logo />
            <div className="w-8/9 h-fit bg-gunMetal p-4 rounded-xl mt-6">
                <ul className='flex flex-col gap-3'>
                    <li className='flex gap-2 items-center p-2 text-2xl text-babyPowder font-semibold cursor-pointer rounded-md hover:bg-tomato hover:text-gunMetal'>
                        <HiUserCircle />
                        Account
                    </li>
                    <li className='flex gap-2 items-center p-2 text-2xl text-babyPowder font-semibold cursor-pointer rounded-md hover:bg-tomato hover:text-gunMetal'>
                        <MdMessage />
                        Chats
                    </li>
                    <li className='flex gap-2 items-center p-2 text-2xl text-babyPowder font-semibold cursor-pointer rounded-md hover:bg-tomato hover:text-gunMetal'>
                        <FaHome />
                        Home
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
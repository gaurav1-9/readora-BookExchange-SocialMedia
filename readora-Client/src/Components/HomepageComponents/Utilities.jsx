import React from 'react'
import { HiUserCircle } from "react-icons/hi";
import { FaHome } from "react-icons/fa";
import { CgFeed } from "react-icons/cg";
import { IoLogOut } from "react-icons/io5";
import { MdMessage } from "react-icons/md";
import Logo from '../Logo';

const Utilities = () => {
    return (
        <div className="hidden flex-1 h-screen sticky top-0 items-center pt-10 lg:flex flex-col">
            <Logo />
            <div className="w-8/9 h-fit bg-gunMetal p-4 rounded-xl mt-6">
                <ul className='flex flex-col gap-3'>
                    <li className='p-2 text-2xl text-babyPowder font-semibold cursor-pointer rounded-md hover:bg-tomato hover:text-gunMetal' onClick={()=>console.log("account")}>
                        <div className='flex gap-2 items-center'>
                            <HiUserCircle />
                            Account
                        </div>
                    </li>
                    <li className='p-2 text-2xl text-babyPowder font-semibold cursor-pointer rounded-md hover:bg-tomato hover:text-gunMetal' onClick={()=>console.log("chat")}>
                        <div className='flex gap-2 items-center'>
                            <MdMessage />
                            Chats
                        </div>
                    </li>
                    <li className='p-2 text-2xl text-babyPowder font-semibold cursor-pointer rounded-md hover:bg-tomato hover:text-gunMetal' onClick={()=>console.log("home")}>
                        <div className='flex gap-2 items-center'>
                            <FaHome />
                            Home
                        </div>
                    </li>
                    <li className='p-2 text-2xl text-babyPowder font-semibold cursor-pointer rounded-md hover:bg-tomato hover:text-gunMetal' onClick={()=>console.log("feed")}>
                        <div className='flex gap-2 items-center'>
                            <CgFeed />
                            Feed
                        </div>
                    </li>
                    <li className='p-2 text-2xl text-babyPowder font-semibold cursor-pointer rounded-md hover:bg-tomato hover:text-gunMetal' onClick={()=>console.log("logout")}>
                        <div className='flex gap-2 items-center'>
                            <IoLogOut />
                            Log Out
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Utilities
import React from 'react'
import { HiUserCircle } from "react-icons/hi";
import { FaHome } from "react-icons/fa";
import { CgFeed } from "react-icons/cg";
import { IoLogOut } from "react-icons/io5";

const Utilities = () => {
    return (
        <div 
        className="hidden flex-1 h-full justify-center pt-10 lg:flex"
        >
            <div className="sticky w-5/6 h-fit bg-gunMetal p-4 rounded-xl">
                <ul className='flex flex-col gap-3'>
                    <li className='p-2 text-2xl text-babyPowder font-semibold cursor-pointer rounded-md hover:bg-zinc-700'>
                        <div className='flex gap-2 items-center'>
                            <HiUserCircle />
                            Account
                        </div>
                    </li>
                    <li className='p-2 text-2xl text-babyPowder font-semibold cursor-pointer rounded-md hover:bg-zinc-700'>
                        <div className='flex gap-2 items-center'>
                            <FaHome />
                            Home
                        </div>
                    </li>
                    <li className='p-2 text-2xl text-babyPowder font-semibold cursor-pointer rounded-md hover:bg-zinc-700'>
                        <div className='flex gap-2 items-center'>
                            <CgFeed />
                            Feed
                        </div>
                    </li>
                    <li className='p-2 text-2xl text-babyPowder font-semibold cursor-pointer rounded-md hover:bg-zinc-700'>
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
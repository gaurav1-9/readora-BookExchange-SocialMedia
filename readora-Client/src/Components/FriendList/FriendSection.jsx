import React from 'react'
import FriendList from './FriendList'
import { MdSearch } from "react-icons/md";

const FriendSection = () => {
    const friendList = []
    return (
        <div className="hidden flex-1 h-screen sticky top-0 items-center pt-10 lg:flex flex-col">
            <div className="relative w-8/9 mb-4">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-xl text-babyPowder">
                    <MdSearch />
                </span>
                <input 
                    type="text" 
                    placeholder="Search friends..."
                    className="w-full pl-10 pr-3 py-2 text-lg rounded-lg bg-gunMetal focus:outline-none text-babyPowder"
                />
            </div>
            <FriendList list={friendList}/>
        </div>
    )
}

export default FriendSection

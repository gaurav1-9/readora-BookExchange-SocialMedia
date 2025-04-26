import React from 'react'

const FriendList = () => {
    return (
        <div className="hidden flex-1 h-full items-center pt-10 lg:flex flex-col">
            <input 
                type="text" 
                placeholder="Search friends..." 
                className="w-8/9 p-2 text-lg rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-azul bg-white mt-4"
            />
        </div>
    )
}

export default FriendList

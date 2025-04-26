import React from 'react'
import { FaUserFriends } from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import { FaArrowLeftLong } from "react-icons/fa6";

const FriendList = ({ list }) => {
    return (
        <div className='w-8/9 mt-3 bg-gunMetal rounded-xl p-4 '>
            <div className='flex items-center gap-2 mb-4'>
                <FaUserFriends className='text-babyPowder text-2xl' />
                <p className='text-babyPowder font-semibold text-2xl'>Your Friends</p>
            </div>
            {
                list.map((item, index) => (
                    <div key={index} className='flex p-2 rounded-xl justify-between items-center'>
                        <div className='flex' onClick={() => console.log(item)}>
                            <img key={index} src={item.profilePic} alt="Friend" className="w-10 h-10 rounded-full cursor-pointer" />
                            <div className='flex flex-col pl-2'>
                                <p className='leading-4 font-semibold text-lg text-babyPowder cursor-pointer hover:text-tomato'>{item.username}</p>
                                <p className='text-sm text-babyPowder'>{item.name}</p>
                            </div>
                        </div>
                        <MdMessage className='text-2xl mt-2 text-babyPowder cursor-pointer hover:text-tomato' />
                    </div>
                ))
            }
            <div className='mt-5 flex justify-end'>
                    <p className='text-right text-babyPowder hover:text-tomato flex items-center gap-2 cursor-pointer'>
                        <FaArrowLeftLong />
                        view entire friend list
                    </p>
            </div>
        </div>
    )
}

export default FriendList

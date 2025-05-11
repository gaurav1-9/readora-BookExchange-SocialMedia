import React from 'react'
import { useAuth } from '../AuthContext'
import { HiUserAdd } from "react-icons/hi";
import { FaUserMinus } from "react-icons/fa6";
import { MdChat } from "react-icons/md";

const FollowMsg = ({profileUser}) => {
    const {user} = useAuth()
    return (
        <div className="flex mt-2">
            {
                (user.followings.includes(profileUser))
                    ? <button
                        className='flex items-center justify-center cursor-pointer gap-2 rounded-lg uppercase text-azul outline-none border-3 border-azul py-1 w-35 font-semibold hover:border-azul/80 hover:text-azul/90'
                    >
                        <FaUserMinus className='text-xl' />
                        unfollow
                    </button>
                    : <button
                        className='flex items-center justify-center cursor-pointer gap-2 rounded-lg uppercase text-babyPowder outline-none bg-azul py-1 w-35 font-semibold border-3 border-azul hover:border-azul/70 hover:bg-azul/87'
                    >
                        <HiUserAdd className='text-xl' />
                        follow
                    </button>
            }
            <div className="p-3 rounded-full bg-azul ml-3 hover:bg-azul/87 cursor-pointer">
                <MdChat className='text-xl text-babyPowder' />
            </div>
        </div>
    )
}

export default FollowMsg
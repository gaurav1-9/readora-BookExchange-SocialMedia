import React from 'react'
import { Link } from 'react-router-dom'

const MsgProfileDetails = ({ targetUser }) => {
    return (
        <div className='sticky top-0  pt-14 bg-vanila'>
            <div className="flex gap-2 items-center px-6">
                <img src="/default-pic.png" alt="" className='w-15 rounded-full' />
                <Link to={`/user/${targetUser._id}`} key={targetUser._id}>
                    <p className='text-2xl font-semibold text-gunMetal'>{targetUser.name}</p>
                    <p className='text-md leading-3 mb-3 text-gunMetal'>{targetUser.username}</p>
                </Link>
            </div>
            <div className="bg-gunMetal/20 w-full h-1 mt-2 rounded-md"></div>
        </div>
    )
}

export default MsgProfileDetails
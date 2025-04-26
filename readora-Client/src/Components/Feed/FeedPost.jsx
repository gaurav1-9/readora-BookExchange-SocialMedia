import React from 'react'

const FeedPost = ({ postList }) => {
    return (
        <div className='flex flex-col items-center p-4 gap-4'>
            {
                postList.map((item, index) => (
                    <div key={index} className='rounded-xl shadow-lg w-full h-fit'>
                        <div className='flex items-end gap-2 p-2'>
                            <img src={item.profilePic} alt="" className='w-16 h-16 rounded-full' />
                            <div className="flex flex-col">
                                <p className='leading-5 text-xl text-gunMetal font-semibold'>{item.username}</p>
                                <span className='text-sm font-normal'>{item.uploadTime}</span>
                            </div>
                        </div>
                        <img src={item.post} alt="" className='w-full h-60 lg:h-80 object-cover' />
                        <div className='flex flex-col p-2'>
                            <p className='flex gap2'>
                                <span className='font-semibold pr-2'>{item.username}: </span><span>{item.caption}</span>
                            </p>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default FeedPost
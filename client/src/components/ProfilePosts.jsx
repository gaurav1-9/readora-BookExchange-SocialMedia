import React from 'react'

const ProfilePosts = ({ postList }) => {
    return (
        <div className='mt-10'>
            {
                (postList.length)
                    ? <p>s</p>
                    : <div className='flex items-end justify-center gap-4'>
                        <img src="/noPost.png" alt="" className='w-80' />
                        <div className="flex flex-col justify-start mb-10">
                            <span className='text-tomato font-semibold text-5xl'>No Posts</span>
                            <span className='leading-7 text-gunMetal font-light text-4xl'>uploaded yet...</span>
                        </div>
                    </div>
            }
        </div>
    )
}

export default ProfilePosts
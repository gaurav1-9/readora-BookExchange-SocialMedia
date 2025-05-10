import React from 'react'
import UploadedPosts from './UploadedPosts'

const ProfilePosts = ({ postList, uploader, onPostUpdate }) => {
    return (
        <div>
            {
                (postList.length)
                    ? <UploadedPosts posts={postList} uploader={uploader} onPostUpdate={onPostUpdate}/>
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
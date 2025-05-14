import React from 'react'

const NoChats = () => {
    return (
        <div className='flex justify-center items-center'>
            <img src="Messaging-bro.png" alt="" className='w-90' />
            <p className='mb-20 text-4xl flex-col flex text-tomato font-semibold'>
                No conversations
                <span className='text-7xl font-normal text-gunMetal'>found...</span>
            </p>
        </div>
    )
}

export default NoChats
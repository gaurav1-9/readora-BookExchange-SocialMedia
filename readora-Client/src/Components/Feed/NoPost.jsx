import React from 'react'

const NoPost = () => {
    return (
        <div className='flex justify-center w-full flex-col items-center'>
            <img src="/Reading_glasses-rafiki.png" alt="Reading Glasses" className="lg:w-3/5" />
            <p className='font-semibold lg:text-xl'>Your friends have not posted anything yet</p>
        </div>
    )
}

export default NoPost
import React from 'react'

const NoPost = () => {
    return (
        <div className='flex justify-center w-full items-end'>
            <img src="/Reading_glasses-rafiki.png" alt="Reading Glasses" className="lg:w-3/5" />
            <p className='font-semibold text-3xl text-gunMetal mb-8'>
                Your friends have
                <span className='px-1 text-4xl text-tomato'>not posted anything</span>
                yet...
            </p>
        </div>
    )
}

export default NoPost
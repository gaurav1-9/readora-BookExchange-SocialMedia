import React from 'react'
import { GiSpellBook } from "react-icons/gi";

const Logo = () => {
    return (
        <div className='flex gap-2 items-center p-4'>
            <GiSpellBook className='text-6xl text-gunMetal'/>
            <div>
                <p className='font-bold text-5xl text-gunMetal'>READORA</p>
                <p className='font-normal leading-3 text-sm text-gunMetal'>Every Reader Adds a New Chapter</p>
            </div>
        </div>
    )
}

export default Logo
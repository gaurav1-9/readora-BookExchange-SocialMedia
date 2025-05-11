import React, { useState } from 'react'

const Search = () => {
    const [selected, setSelected] = useState(0)
    const handleSelection = (selectionId) => {
        setSelected(selectionId)
    }
    
    return (
        <div className='mt-15'>
            <div className="bg-gunMetal flex flex-col h-full w-full rounded-2xl">
                <div className="flex items-center gap-2 p-4">
                    <p className='text-babyPowder font-semibold'>Search for:</p>
                    <p
                        className={`rounded-3xl border-2 py-1 w-18 text-center ${(selected === 0) ? 'text-tomato font-semibold' : 'text-babyPowder/20'} font-extralight cursor-pointer`}
                        onClick={() => handleSelection(0)}
                    >
                        Users
                    </p>
                    <p
                        className={`rounded-3xl border-2 py-1 w-18 text-center ${(selected === 1) ? 'text-tomato font-semibold' : 'text-babyPowder/20'} font-extralight cursor-pointer`}
                        onClick={() => handleSelection(1)}
                    >
                        Post
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Search
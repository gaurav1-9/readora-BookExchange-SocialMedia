import React from 'react'

const SearchBar = ({ selected, handleSelection, onSearch, searchVal, setSearch }) => {
    return (
        <div className='sticky top-0 bg-vanila pt-14 rounded-b-2xl'>
            <div className="bg-gunMetal flex flex-col h-full w-full rounded-2xl">
            <div className="flex items-center gap-2 p-4">
                <p className='text-babyPowder font-semibold'>Search for:</p>
                <p
                    className={`rounded-3xl border-2 py-1 w-18 text-center ${(selected === 0) ? 'text-tomato font-semibold' : 'text-babyPowder/20 hover:text-babyPowder/25'} font-extralight cursor-pointer`}
                    onClick={() => handleSelection(0)}
                >
                    Users
                </p>
                <p
                    className={`rounded-3xl border-2 py-1 w-18 text-center ${(selected === 1) ? 'text-tomato font-semibold' : 'text-babyPowder/20 hover:text-babyPowder/25'} font-extralight cursor-pointer`}
                    onClick={() => handleSelection(1)}
                >
                    Post
                </p>
            </div>
            <form onSubmit={onSearch} className='px-4 pb-4 flex justify-between w-full gap-2'>
                <input
                    type="text"
                    placeholder={`Enter ${(selected === 0) ? 'username here' : 'search item here'}...`}
                    className='outline-none placeholder:text-babyPowder/30 text-babyPowder w-10/12'
                    value={searchVal}
                    onChange={e=>setSearch(e.target.value)}
                />
                <button className='w-2/12 text-babyPowder font-semibold bg-azul hover:bg-azul/90 rounded-lg cursor-pointer py-1'>Search</button>
            </form>
        </div>
        </div>
    )
}

export default SearchBar
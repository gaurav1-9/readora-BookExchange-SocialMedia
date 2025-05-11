import React from 'react';

const SearchResult = ({ hasSearched, res, searchType, searching }) => {
    console.log("from searchRes:", res)
    if (!hasSearched) {
        return (
            <div className='relative flex justify-center'>
                <img src="/File_searching-pana.png" alt="Search Illustration" className='w-5/7 absolute mt-17' />
            </div>
        );
    }

    if (searching) {
        return <p className='text-center mt-4'>Loading...</p>;
    }

    if (!res?.length) {
        return <div>
            <p className='text-center mt-4 text-2xl text-gunMetal'>No search result found</p>
            <p className='text-center mt-4 text-8xl leading-10 text-tomato/80 font-semibold'>:(</p>
        </div>;
    }

    return (
        <div className="mt-4 flex-wrap flex gap-2 justify-center">
            {
                (!searchType)
                    ? res.map((item) => (
                        <div key={item._id} className={`flex ${(res.length===1)?"w-full":"w-[47%]"} bg-gunMetal/10 rounded-xl p-4 justify-between hover:bg-gunMetal/16 cursor-pointer`}>
                            <div className="flex items-center gap-6">
                                <img src="/default-pic.png" alt="" className='w-16 rounded-full' />
                                <div className="flex flex-col">
                                    <p className='text-2xl font-semibold leading-5'>{item.username}</p>
                                    <p className='text-xl'>{item.name}</p>
                                </div>
                            </div>
                        </div>
                    ))
                    : ""
            }
        </div>
    );
};

export default SearchResult;

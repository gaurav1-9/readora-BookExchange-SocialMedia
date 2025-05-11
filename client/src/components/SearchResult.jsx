import React from 'react';
import { GoLinkExternal } from "react-icons/go";
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const SearchResult = ({ hasSearched, res, searchType, searching }) => {
    const {user} = useAuth()
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
                        <div key={item._id} className={`flex ${(res.length === 1) ? "w-full" : "w-[47%]"} bg-gunMetal/10 rounded-xl p-4 justify-between hover:bg-gunMetal/16 cursor-pointer`}>
                            <Link to={(item._id===user._id)?"/profile":`/user/${item._id}`} className="flex items-center gap-6">
                                <img src="/default-pic.png" alt="" className='w-16 rounded-full' />
                                <div className="flex flex-col">
                                    <p className='text-2xl font-semibold leading-5'>{item.username}</p>
                                    <p className='text-xl'>{item.name}</p>
                                </div>
                            </Link>
                        </div>
                    ))
                    : <div className='mb-8 w-full'>
                        {
                            res.map((item) => (
                                <div key={item._id} className='w-full rounded-xl bg-gunMetal/10 min-h-10 p-4 flex justify-between items-center mb-2'>
                                    <div className="flex flex-col">
                                        <p>{item.caption}</p>
                                        <div className="flex gap-2 flex-wrap">
                                            {item.tags.map((tag, i) => (
                                                <div key={i} className="text-sm px-2 py-1 bg-tomato/40 text-gunMetal rounded-4xl min-w-10">
                                                    <p>#{tag}</p>
                                                </div>
                                            ))}
                                        </div>
                                        <span className='mt-4 text-gunMetal/70 font-bold text-xs'>
                                            {new Date(item.createdAt).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </span>
                                    </div>
                                    <Link to={(item.userId===user._id)?"/profile":`/user/${item.userId}`}>
                                        <GoLinkExternal className='text-2xl text-gunMetal hover:text-gunMetal/70 cursor-pointer' onClick={() => console.log(item.userId)} />
                                    </Link>
                                </div>
                            ))
                        }
                    </div>

            }
        </div>
    );
};

export default SearchResult;

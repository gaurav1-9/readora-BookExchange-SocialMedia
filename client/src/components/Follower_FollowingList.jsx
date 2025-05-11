import React from 'react'
import { useAuth } from '../AuthContext'
import { FaUserMinus, FaUserPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Follower_FollowingList = ({ listType, loading, list, userFollowings, onToggleFollow }) => {
    const { user } = useAuth()
    return (
        <div className='mt-10 text-gunMetal flex flex-col items-center px-4'>
            <p className='text-2xl font-semibold'>{user.username}</p>
            <p className='leading-8 text-4xl'>{user.name.split(' ')[0]}'s {listType}</p>
            {
                loading
                    ? <p className='mt-10'>Loading...</p>
                    : <div className='mt-10 flex flex-col gap-4 w-full'>
                        {
                            (!list.length)
                                ? <div className='flex justify-center items-end'>
                                    <img src="/following0.png" alt="" className='w-80' />
                                    <div className="flex flex-col text-wrap mb-15">
                                        <span className='text-3xl text-gunMetal'>{listType} space</span>
                                        <span className='leading-6 text-5xl text-tomato font-semibold'>looks empty...</span>

                                    </div>
                                </div>
                                : (list.map((item) => {
                                    const isFollowing = userFollowings.includes(item._id);

                                    return (
                                        <div key={item._id} className="flex w-full bg-gunMetal/10 rounded-xl p-4 justify-between">
                                            <div className="flex items-center gap-6">
                                                <img src="/default-pic.png" alt="" className='w-16 rounded-full' />
                                                <div className="flex flex-col">
                                                    <Link to={`/user/${item._id}`} className='text-2xl font-semibold leading-5'>{item.username}</Link>
                                                    <p className='text-xl'>{item.name}</p>
                                                </div>
                                            </div>

                                            <button
                                                onClick={() => onToggleFollow(item._id)}
                                                className={`w-40 flex justify-center items-center gap-2 rounded-lg font-semibold text-gunMetal cursor-pointer text-xl active:scale-[1.04] ${isFollowing
                                                    ? 'bg-tomato hover:bg-tomato/85'
                                                    : 'bg-green-400 hover:bg-green-400/85'
                                                    }`}
                                            >
                                                {isFollowing ? <>Unfollow <FaUserMinus /></> : <>Follow <FaUserPlus /></>}
                                            </button>
                                        </div>
                                    )
                                })
                                )
                        }
                    </div>
            }
        </div>
    )
}

export default Follower_FollowingList
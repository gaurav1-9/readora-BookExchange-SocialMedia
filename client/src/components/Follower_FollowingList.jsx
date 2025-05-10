import React from 'react'
import { useAuth } from '../AuthContext'
import { FaUserMinus, FaUserPlus } from 'react-icons/fa';

const Follower_FollowingList = ({ listType, loading, list }) => {
    const { user } = useAuth();
    return (
        <div className='mt-10 text-gunMetal flex flex-col items-center px-4'>
            <p className='text-2xl font-semibold'>{user.username}</p>
            <p className='leading-8 text-4xl'>{user.name.split(' ')[0]}'s {listType}</p>
            {
                (loading)
                    ? <p className='mt-10'>Loading...</p>
                    : <div className='mt-10 flex flex-col gap-4 w-full'>
                        {
                            list.map((item) => (
                                <div key={item._id} className="flex w-full bg-gunMetal/10 rounded-xl p-4 justify-between">
                                    <div className="flex items-center gap-6">
                                        <img src="/default-pic.png" alt="" className='w-16 rounded-full' />
                                        <div className="flex flex-col">
                                            <p className='text-2xl font-semibold leading-5'>{item.username}</p>
                                            <p className='text-xl'>{item.name}</p>
                                        </div>
                                    </div>
                                    {
                                        (user.followings.includes(item._id))
                                            ? <button className='flex justify-center items-center gap-2 bg-tomato px-4 rounded-lg font-semibold text-gunMetal hover:bg-tomato/85 cursor-pointer text-xl active:scale-[1.04]'>
                                                Unfollow <FaUserMinus />
                                            </button>
                                            : <button className='flex justify-center items-center gap-2 bg-green-400 px-4 rounded-lg font-semibold text-gunMetal hover:bg-green-400/85 cursor-pointer text-xl active:scale-[1.04]'>
                                                Follow <FaUserPlus />
                                            </button>
                                    }
                                </div>
                            ))
                        }
                    </div>
            }
        </div>
    )
}

export default Follower_FollowingList
import React, { useState, useEffect } from 'react';
import { BiLike, BiSolidLike } from "react-icons/bi";
import { useAuth } from '../AuthContext';
import axios from 'axios';

const PostCard = ({ post }) => {
    const { user } = useAuth();
    const [localPost, setLocalPost] = useState(post);

    const handleLike = () => {
        const alreadyLiked = localPost.likes.includes(user._id);
        const updatedLikes = alreadyLiked
            ? localPost.likes.filter(id => id !== user._id)
            : [...localPost.likes, user._id];

        setLocalPost(prev => ({
            ...prev,
            likes: updatedLikes
        }));

        axios.put(`http://localhost:5000/api/posts/${localPost._id}/engage`, {
            userId: user._id
        }).catch(err => {
            console.error("❌ Error updating like:", err);
            // revert like on failure
            setLocalPost(prev => ({
                ...prev,
                likes: alreadyLiked
                    ? [...prev.likes, user._id]
                    : prev.likes.filter(id => id !== user._id)
            }));
        });
    };

    return (
        <div className='w-full rounded-xl bg-gunMetal/10 min-h-20 p-6'>
            <div className="flex flex-col">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <img src="/default-pic.png" alt="" className='w-10 rounded-full' />
                        <div className="flex flex-col justify-start">
                            <span className='leading-3 font-semibold text-gunMetal text-lg'>
                                {localPost.username || 'Unknown'}
                            </span>
                            <span className='mt-1 text-gunMetal/70 font-bold text-xs'>
                                {new Date(localPost.createdAt).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </span>
                        </div>
                    </div>
                </div>
                <div className='my-3'>
                    <p>{localPost.caption}</p>
                </div>
                <div className="flex gap-2 mb-6 flex-wrap">
                    {localPost.tags.map((tag, i) => (
                        <div key={i} className="text-sm px-2 py-1 bg-tomato/40 text-gunMetal rounded-4xl min-w-10">
                            <p>#{tag}</p>
                        </div>
                    ))}
                </div>
                <div className="flex gap-1 items-center">
                    <div onClick={handleLike} className="cursor-pointer">
                        {localPost.likes.includes(user._id)
                            ? <BiSolidLike className='text-azul text-xl' />
                            : <BiLike className='text-gunMetal text-xl' />
                        }
                    </div>
                    <span>{localPost.likes.length}</span>
                    <span>{localPost.likes.length === 1 ? "like" : "likes"}</span>
                </div>
            </div>
        </div>
        
    );
};

export default PostCard;
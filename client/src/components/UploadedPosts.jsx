import React, { useState, useEffect } from 'react';
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { BiLike, BiSolidLike } from "react-icons/bi";
import { useAuth } from '../AuthContext';
import axios from 'axios';

const UploadedPosts = ({ posts, uploader, onPostUpdate }) => {
    const { user } = useAuth();
    const [localPosts, setLocalPosts] = useState([]);
    const [editPostId, setEditPostId] = useState(null);
    const [deletePostId, setDeletePostId] = useState(null);
    const [editCaption, setEditCaption] = useState('');
    const [editTags, setEditTags] = useState('');

    useEffect(() => {
        setLocalPosts(posts);
    }, [posts]);

    useEffect(() => {
        if (editPostId) {
            setEditCaption(editPostId.caption || '');
            setEditTags(editPostId.tags.join(', ') || '');
        }
    }, [editPostId]);

    const handleLike = (postId) => {
        const alreadyLiked = localPosts.find(post => post._id === postId)?.likes.includes(user._id);

        setLocalPosts(prevPosts =>
            prevPosts.map(post => {
                if (post._id === postId) {
                    const updatedLikes = alreadyLiked
                        ? post.likes.filter(id => id !== user._id)
                        : [...post.likes, user._id];
                    return { ...post, likes: updatedLikes };
                }
                return post;
            })
        );

        axios.put(`http://localhost:5000/api/posts/${postId}/engage`, {
            userId: user._id
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).catch(err => {
            console.error("❌ Error updating like:", err);
            setLocalPosts(prevPosts =>
                prevPosts.map(post => {
                    if (post._id === postId) {
                        const revertedLikes = alreadyLiked
                            ? [...post.likes, user._id]
                            : post.likes.filter(id => id !== user._id);
                        return { ...post, likes: revertedLikes };
                    }
                    return post;
                })
            );
        });
    };

    const handleEditSave = () => {
        const updatedPost = {
            ...editPostId,
            caption: editCaption,
            tags: editTags.split(',').map(tag => tag.trim()).filter(tag => tag),
        };

        // Optimistically update UI
        setLocalPosts(prev =>
            prev.map(post => post._id === updatedPost._id ? updatedPost : post)
        );

        // Send to backend

        axios.put(`http://localhost:5000/api/posts/${updatedPost._id}/edit`, updatedPost, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                console.log("✅ Edited Post saved to server:", response.data);
                onPostUpdate()
            })
            .catch(error => {
                console.error("❌ Error saving edited post:", error);
                // Optional: revert the UI if you want to cancel the change
            });

        setEditPostId(null);
    };


    const handleDeleteConfirm = () => {
        axios.delete(`http://localhost:5000/api/posts/${deletePostId._id}/deletePost`, {
            data: { userId: user._id }, // body for the DELETE request
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                console.log("✅ Deleted Post from server:", response.data);
                // Optimistically update UI
                setLocalPosts(prev => prev.filter(post => post._id !== deletePostId._id));
                setDeletePostId(null);
                onPostUpdate();
            })
            .catch(error => {
                console.error("❌ Error deleting post:", error);
            });
    };


    return (
        <>
            {localPosts.map((item, idx) => (
                <div key={item._id}>
                    <div className='w-full rounded-xl bg-gunMetal/10 min-h-20 p-6'>
                        <div className="flex flex-col">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                    <img src="/default-pic.png" alt="" className='w-10 rounded-full' />
                                    <div className="flex flex-col justify-start">
                                        <span className='leading-3 font-semibold text-gunMetal text-lg'>{uploader.username}</span>
                                        <span className='mt-1 text-gunMetal/70 font-bold text-xs'>
                                            {new Date(item.createdAt).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </span>
                                    </div>
                                </div>
                                {
                                    (uploader._id === user._id)
                                        ? <div className="flex gap-6 text-xl text-gunMetal cursor-pointer">
                                            <FaRegEdit className='hover:text-azul' onClick={() => setEditPostId(item)} />
                                            <RiDeleteBin5Fill className='hover:text-[#c44141]' onClick={() => setDeletePostId(item)} />
                                        </div> : null
                                }
                            </div>
                            <div className='my-3'>
                                <p>{item.caption}</p>
                            </div>
                            <div className="flex gap-2 mb-6 flex-wrap">
                                {item.tags.map((tag, i) => (
                                    <div key={i} className="text-sm px-2 py-1 bg-tomato/40 text-gunMetal rounded-4xl min-w-10">
                                        <p>#{tag}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="flex gap-1 items-center">
                                <div onClick={() => handleLike(item._id)} className="cursor-pointer">
                                    {item.likes.includes(user._id)
                                        ? <BiSolidLike className='text-azul text-xl' />
                                        : <BiLike className='text-gunMetal text-xl' />
                                    }
                                </div>
                                <span>{item.likes.length}</span>
                                <span>{item.likes.length === 1 ? "like" : "likes"}</span>
                            </div>
                        </div>
                    </div>
                    {idx < localPosts.length - 1
                        ? <div className='w-full h-0.5 rounded-2xl bg-gunMetal/60 mt-2 mb-5'></div>
                        : <div className='mb-5'></div>
                    }
                </div>
            ))}

            {/* Edit Modal */}
            {editPostId && (
                <div className="fixed inset-0 bg-transparent backdrop-blur-md flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-xl w-[90%] max-w-md">
                        <h2 className="text-lg font-bold mb-4">Edit Post</h2>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Caption</label>
                            <input
                                type="text"
                                value={editCaption}
                                onChange={e => setEditCaption(e.target.value)}
                                placeholder="Enter caption..."
                                className="w-full border border-gray-300 rounded px-3 py-2"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Tags (comma-separated)</label>
                            <input
                                type="text"
                                value={editTags}
                                onChange={e => setEditTags(e.target.value)}
                                placeholder="e.g. reading, history, fiction"
                                className="w-full border border-gray-300 rounded px-3 py-2"
                            />
                        </div>

                        <div className="mt-4 flex justify-end gap-2">
                            <button onClick={() => setEditPostId(null)} className="px-4 py-2 rounded bg-gray-300">Cancel</button>
                            <button onClick={handleEditSave} className="px-4 py-2 rounded bg-azul text-white">Save</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Modal */}
            {deletePostId && (
                <div className="fixed inset-0 bg-transparent backdrop-blur-md flex items-center justify-center z-50">
                    <div className="bg-babyPowder p-6 rounded-xl w-[90%] max-w-md">
                        <h2 className="text-lg font-bold mb-4 text-tomato">Delete Post</h2>
                        <p>Are you sure you want to delete this post?</p>
                        <div className="mt-4 flex justify-end gap-2">
                            <button onClick={() => setDeletePostId(null)} className="px-4 py-2 rounded bg-gray-300">Cancel</button>
                            <button onClick={handleDeleteConfirm} className="px-4 py-2 rounded bg-tomato text-white">Delete</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default UploadedPosts;

import React from 'react'

const UserPosts = ({ posts }) => {
    if (posts !== undefined) {
        if (posts.length === 0) {
            return <p className="text-gunMetal mt-4">No posts yet.</p>
        }

        return (
            <div className="mt-6 w-full">
                <h2 className="text-2xl font-bold mb-4 text-gunMetal">Your Posts</h2>
                <div className="grid gap-4">
                    {posts.map((post) => (
                        <div key={post._id} className="bg-gunMetal p-4 rounded-xl shadow-md">
                            <p className="text-lg font-semibold text-babyPowder mb-2">{post.caption}</p>

                            {/* Conditional Image */}
                            {post.img && post.img.trim() !== '' && (
                                <img
                                    src={post.img}
                                    alt="Post"
                                    className="mt-2 rounded-lg w-full max-h-96 object-cover"
                                />
                            )}

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 mt-2">
                                {post.tags.map((tag, idx) => (
                                    <span
                                        key={idx}
                                        className="text-xs px-2 py-1 bg-outerSpace text-babyPowder rounded-full"
                                    >
                                        #{tag}
                                    </span>
                                ))}
                            </div>

                            {/* Likes and Date */}
                            <div className="mt-3 flex justify-between items-center text-babyPowder text-sm">
                                <span>❤️ {post.likes.length} {post.likes.length === 1 ? 'like' : 'likes'}</span>
                                <span>{new Date(post.createdAt).toLocaleString()}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}

export default UserPosts

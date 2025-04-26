import React from 'react'
import CreatePost from './CreatePost'
import NoPost from './NoPost'
import FeedPost from './FeedPost'

const Feed = () => {
    const post = []
    return (
        <div className="flex-2 p-2 lg:pt-10">
            <CreatePost />
            {
                (post.length === 0) ? <NoPost /> : <FeedPost postList={post}/>
            }
        </div>
    )
}

export default Feed
import React from 'react'
import CreatePost from './CreatePost'
import NoPost from './NoPost'
import FeedPost from './FeedPost'
import CaughtUp from './CaughtUp'

const Feed = () => {
    const post = [
        {
            post: 'https://cdn.magicdecor.in/com/2023/02/29234001/image-1682163782-1982.jpg',
            caption: 'post caption1',
            username: 'gaurav1_9',
            uploadTime: '1h ago',
            profilePic:'https://gimgs2.nohat.cc/thumb/f/350/cute-boy-cartoon-profile-picture-png-transparent--a8bd1f9386.jpg',
        },
        {
            post: 'https://images.prismic.io/garrix/64963df8-07e1-4406-94be-81bce19c81fc_AS9I8927+copy.jpg?auto=compress,format&rect=23,0,1453,1000&w=808&h=556',
            caption: 'also a post caption for the second post',
            username: 'gaurav1_9',
            uploadTime: '1h ago',
            profilePic:'https://gimgs2.nohat.cc/thumb/f/350/cute-boy-cartoon-profile-picture-png-transparent--a8bd1f9386.jpg',
        },
        {
            post: 'https://cdn.magicdecor.in/com/2023/02/29234001/image-1682163782-1982.jpg',
            caption: 'post caption1',
            username: 'gaurav1_9',
            uploadTime: '1h ago',
            profilePic:'https://gimgs2.nohat.cc/thumb/f/350/cute-boy-cartoon-profile-picture-png-transparent--a8bd1f9386.jpg',
        },
        {
            post: 'https://images.prismic.io/garrix/64963df8-07e1-4406-94be-81bce19c81fc_AS9I8927+copy.jpg?auto=compress,format&rect=23,0,1453,1000&w=808&h=556',
            caption: 'also a post caption for the second post',
            username: 'gaurav1_9',
            uploadTime: '1h ago',
            profilePic:'https://gimgs2.nohat.cc/thumb/f/350/cute-boy-cartoon-profile-picture-png-transparent--a8bd1f9386.jpg',
        },
    ]
    return (
        <div className="p-2 lg:pt-10">
            <CreatePost />
            {
                (post.length === 0) ? <NoPost /> : <><FeedPost postList={post} /><CaughtUp /></>
            }
            
        </div>
    )
}

export default Feed
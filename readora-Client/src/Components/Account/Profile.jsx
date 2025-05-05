import React from 'react'
import ProfileDetails from './ProfileDetails'
import UserPosts from './UserPosts'

const Profile = ({ profileDetails }) => {
    return (
        <div>
            <ProfileDetails profileDetails={profileDetails}/>
            <UserPosts/>
        </div>

    )
}

export default Profile
import React from 'react'
import ProfileDetails from './ProfileDetails'

const Profile = ({ profileDetails }) => {
    return (
        <div className="flex flex-col items-center bg-gunMetal text-babyPowder rounded-xl py-6 w-full shadow-lg">
            <ProfileDetails profileDetails={profileDetails}/>
        </div>
    )
}

export default Profile
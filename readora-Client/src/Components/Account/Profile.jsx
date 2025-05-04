import React from 'react'

const Profile = ({ profileDetails }) => {
    return (
        <div className="flex flex-col items-center bg-gunMetal text-babyPowder rounded-xl py-6 w-full shadow-lg">

            <div className="flex items-center justify-between mb-6 gap-20 w-3/5">
                <img
                    src={
                        (profileDetails.profilePic !== "" || profileDetails.profilePic !== " ")
                            ? "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                            : profileDetails.profilePic
                    }
                    alt="Profile"
                    className="w-20 h-20 rounded-full object-cover border-4 border-azul"
                />
                <div className='flex gap-10'>
                    <div className="flex flex-col items-center">
                        <p className="text-3xl font-semibold">
                            {profileDetails.followers ? profileDetails.followers.length : 0}
                        </p>
                        <p className="text-sm text-gray-400">Followers</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <p className="text-3xl font-semibold">
                            {profileDetails.followings ? profileDetails.followings.length : 0}
                        </p>
                        <p className="text-sm text-gray-400">Following</p>
                    </div>
                </div>
            </div>

            <div className="mb-2 pl-30 flex flex-col w-full">
                <p className="text-xl font-semibold">@{profileDetails.username}</p>
                <p className="text-lg text-gray-300">{profileDetails.name}</p>
            </div>
        </div>
    )
}

export default Profile
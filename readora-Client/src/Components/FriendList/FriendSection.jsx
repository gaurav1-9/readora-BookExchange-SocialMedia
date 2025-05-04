import React, { useEffect, useState } from 'react'
import FriendList from './FriendList'
import { MdSearch } from "react-icons/md";
import { useAuth } from '../../AuthContext';
import axios from 'axios';

const FriendSection = () => {
    const { user } = useAuth()
    const [friendList, setfriendList] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchFriendProfiles = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/users/${user}`, { withCredentials: true })
                const followingIDs = res.data?.msg.followings || []

                // Fetch profile for each follower ID
                const profilePromises = followingIDs.map(id =>
                    axios.get(`http://localhost:5000/api/users/${id}`, { withCredentials: true })
                )

                const profileResponses = await Promise.all(profilePromises)
                const followingProfiles = profileResponses.map(r => r.data.msg)

                setfriendList(followingProfiles)
                setLoading(false)
            } catch (err) {
                console.error(err)
            }
        }

        if (user) fetchFriendProfiles()
    }, [user])

    return (
        <div className="hidden flex-1 h-screen sticky top-0 items-center pt-10 lg:flex flex-col">
            <div className="relative w-8/9 mb-4">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-xl text-babyPowder">
                    <MdSearch />
                </span>
                <input
                    type="text"
                    placeholder="Search friends..."
                    className="w-full pl-10 pr-3 py-2 text-lg rounded-lg bg-gunMetal focus:outline-none text-babyPowder"
                />
            </div>
            <FriendList list={friendList} loading={loading} />
        </div>
    )
}

export default FriendSection

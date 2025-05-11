import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ProfileUserDetails } from '../components/ProfileUserDetails'
import axios from 'axios'
import ProfilePosts from '../components/ProfilePosts'

const OtherProfiles = () => {
    const { targetUser } = useParams()
    const [profile, setProfile] = useState({})
    const [profilePosts, setProfilePosts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/users/${targetUser}`, {
                    withCredentials: true
                })
                const resPost = await axios.get(`http://localhost:5000/api/posts/${targetUser}/profilePost`, {
                    withCredentials: true
                })

                setProfile(res.data.msg)
                setProfilePosts(resPost.data.msg)
                setLoading(false)
            } catch (e) {
                console.log("Error fetching other's account", e)
                setLoading(false)
            }
        }

        fetchUser()
    }, [targetUser])
console.log(profilePosts)
    return (
        <div>
            {
                (loading)
                    ? <p className='mt-14 text-center'>Loading...</p>
                    : <div>
                        <ProfileUserDetails user={profile}/>
                        <ProfilePosts postList={profilePosts} uploader={profile} onPostUpdate={()=>{}}/>
                    </div>
            }
        </div>
    )
}

export default OtherProfiles
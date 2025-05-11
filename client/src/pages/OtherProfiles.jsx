import React, { use, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ProfileUserDetails } from '../components/ProfileUserDetails'
import axios from 'axios'

const OtherProfiles = () => {
    const { targetUser } = useParams()
    const [profile, setProfile] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/users/${targetUser}`, {
                    withCredentials: true
                })
                console.log(res.data.msg)
                setProfile(res.data.msg)
                setLoading(false)
            } catch (e) {
                console.log("Error fetching other's account", e)
                setLoading(false)
            }
        }

        fetchUser()
    }, [targetUser])
    return (
        <div>
            {
                (loading)
                    ? <p className='mt-14 text-center'>Loading...</p>
                    : <ProfileUserDetails user={profile}/>
            }
        </div>
    )
}

export default OtherProfiles
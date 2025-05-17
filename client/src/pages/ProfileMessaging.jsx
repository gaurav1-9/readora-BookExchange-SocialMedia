import React, { useEffect } from 'react'
import { useAuth } from '../AuthContext'
import axios from 'axios'
import { useParams, useNavigate, replace } from 'react-router-dom'

const ProfileMessaging = () => {
    const { user } = useAuth()
    const { targetUser } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        const getOrCreateChat = async () => {
            try {
                const res = await axios.post("http://localhost:5000/api/chats/", {
                    myUserId: user._id,
                    userId: targetUser,
                })

                const chatId = res.data.msg._id;
                navigate(`/msg/${chatId}/${targetUser}`, { replace: true });
            } catch (e) {
                console.error("Failed to access/create chat:", e)
            }
        }

        getOrCreateChat();
    }, [user, targetUser, navigate])

    return (
        <div className='text-center pt-14'>Loading...</div>
    )
}

export default ProfileMessaging

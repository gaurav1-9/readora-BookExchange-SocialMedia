import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAuth } from '../AuthContext'
import MsgProfileDetails from '../components/MsgProfileDetails'
import MsgInput from '../components/MsgInput'

const Messaging = () => {
    const { chatId } = useParams()
    const { user } = useAuth()
    const [loading, setLoading] = useState(true)
    const [chats, setChats] = useState([])
    const [msgInput, setMsgInput] = useState('')

    const sendMsg = (e)=>{
        e.preventDefault()
        console.log(msgInput)
        setMsgInput('')
    }

    useEffect(() => {
        const fetchMsg = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/chats/message?chatId=${chatId}`);
                setChats(res.data.msg);
                setLoading(false)
            }
            catch (e) {
                console.log('Error fetching chats:', e);
                setLoading(false);
            }
        }

        fetchMsg();
    }, [chatId])
    console.log()

    return (
        <div className='min-h-screen flex flex-col'>
            {
                (loading)
                    ? <p className='text-center pt-14'>Loading...</p>
                    : <>
                        {/* Profile Section */}
                        {
                            chats[0].chat.users.map(targetUser => (
                                (targetUser._id === user._id)
                                    ? null
                                    : <MsgProfileDetails key={targetUser._id} targetUser={targetUser} />
                            ))
                        }

                        {/* Scrollable Message Section */}
                        <div className="flex-1 overflow-y-auto px-4">
                            <p className='text-center text-gunMetal/50 pt-10'>No messages yet.</p>
                        </div>

                        {/* Input Section */}
                        <div className='sticky bottom-0 bg-vanila z-10'>
                            <MsgInput sendMsg={sendMsg} msg={msgInput} setMsg={setMsgInput}/>
                        </div>
                    </>
            }
        </div>
    )

}

export default Messaging
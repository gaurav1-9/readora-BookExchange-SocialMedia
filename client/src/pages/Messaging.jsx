import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAuth } from '../AuthContext'
import MsgProfileDetails from '../components/MsgProfileDetails'
import MsgInput from '../components/MsgInput'
import MsgBubbles from '../components/MsgBubbles'

const Messaging = () => {
    const { chatId, targetUser } = useParams()
    const { user } = useAuth()
    const [loading, setLoading] = useState(true)
    const [chats, setChats] = useState([])
    const [msgInput, setMsgInput] = useState('')
    const scrollRef = useRef()
    const [otherUser, setOtherUser] = useState({})

    const scrollToBottom = () => {
        scrollRef.current?.scrollIntoView({ behavior: 'instant' });
    };


    const sendMsg = async (e) => {
        e.preventDefault();
        if (!msgInput.trim()) return;

        const newMsg = {
            _id: Date.now(), // Temporary ID for React rendering
            content: msgInput,
            sender: {
                _id: user._id,
            },
            createdAt: new Date().toISOString(),
        };

        // Optimistically update UI
        setChats(prev => [...prev, newMsg]);
        scrollToBottom()
        setMsgInput('');

        try {
            const res = await axios.post(`http://localhost:5000/api/chats/message`, {
                myUserId: user._id,
                chatId: chatId,
                content: msgInput,
            });
        } catch (err) {
            console.error("Message failed to send", err);
            // Optionally handle errors (like showing retry option)
        }
    };

    
    useEffect(() => {
        const fetchMsg = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/chats/message?chatId=${chatId}`);
                setChats(res.data.msg);
                const otherMember = await axios.get(`http://localhost:5000/api/users/details/following?ids=${targetUser}`)
                setOtherUser(otherMember.data[0])
                setLoading(false)
            }
            catch (e) {
                console.log('Error fetching chats:', e);
                setLoading(false);
            }
        }

        fetchMsg();
    }, [chatId])

    useEffect(() => {
        if (!loading) {
            scrollToBottom();
        }
    }, [chats, loading]);

    return (
        <div className='min-h-screen flex flex-col'>
            {
                (loading)
                    ? <p className='text-center pt-14'>Loading...</p>
                    : <>
                        {/* Profile Section */}
                        
                         <MsgProfileDetails targetUser={otherUser} />
                         

                        {/* Scrollable Message Section */}
                        <div className="flex-1 overflow-y-auto px-4">
                            <MsgBubbles chats={chats} scrollRef={scrollRef} />
                        </div>

                        {/* Input Section */}
                        <div className='sticky bottom-0 bg-vanila z-10'>
                            <MsgInput sendMsg={sendMsg} msg={msgInput} setMsg={setMsgInput} />
                        </div>
                    </>
            }
        </div>
    )

}

export default Messaging
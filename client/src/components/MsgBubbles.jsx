import React from 'react'
import { useAuth } from '../AuthContext'
import DateTime from '../components/DateTime'

const MsgBubbles = ({ chats }) => {
    const { user } = useAuth()
    return (
        <div>
            {
                (chats.length)
                    ? chats.map(item => (
                        <div
                            key={item._id}
                            className={`p-3 flex ${(item.sender._id === user._id) ? "justify-end" : "justify-start"} w-full`}
                        >
                            <div className={`flex flex-col gap-1 ${(item.sender._id === user._id) ? "justify-end" : "justify-start"}`}>
                                <div className={`${(item.sender._id === user._id) ? "justify-end" : "justify-start"} flex`}>
                                    <p className={`p-3 max-w-fit rounded-xl ${(item.sender._id === user._id) ? "bg-gunMetal/20 rounded-br-none text-right" : "bg-azul/60 rounded-bl-none"}`}>{item.content}</p>
                                </div>
                                <div className={`flex ${(item.sender._id === user._id) ? "justify-end" : "justify-start"}`}>
                                    <DateTime dateTime={item.createdAt} fontsize={'text-xs'} />
                                </div>
                            </div>
                        </div>
                    ))
                    : <p className='text-center text-gunMetal/50 pt-10'>No messages yet.</p>
            }
        </div>
    )
}

export default MsgBubbles
import React from 'react'
import { GoArrowDownLeft, GoArrowUpRight } from "react-icons/go";


const ChatList = ({ chats, user }) => {
    return (
        <ul>
            {
                chats.map(chat => (
                    <li key={chat._id} className='flex gap-2 items-center bg-gunMetal/10 rounded-lg px-4 py-2 cursor-pointer hover:bg-gunMetal/14 mb-2'>
                        <img src="/default-pic.png" alt="" className='w-15 rounded-full' />
                        <div className="flex flex-col w-full">
                            <div className="flex justify-between items-center">
                                {
                                    chat.users.map((chatUser) => (
                                        (chatUser._id.toString() === user._id)
                                            ? null
                                            : <p className='font-semibold text-xl text-gunMetal'>
                                                {chatUser.username}
                                            </p>
                                    ))
                                }
                                <div className='flex gap-2 font-semibold text-gunMetal/50 text-sm'>
                                    <span>
                                        {
                                            new Date(chat.createdAt).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                            })
                                        }
                                    </span>
                                    <span>|</span>
                                    <span>
                                        {
                                            new Date(chat.createdAt).toLocaleTimeString('en-US', {
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })
                                        }
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                {
                                    (chat.latestMessage)
                                        ? (chat.latestMessage.sender._id === user._id)
                                            ? <GoArrowUpRight className='rounded-full text-xs' />
                                            : <GoArrowDownLeft className='rounded-full text-xs' />
                                        : null
                                }
                                <p className='text-md text-gunMetal/90'>
                                    {
                                        (chat.latestMessage !== undefined)
                                            ? chat.latestMessage.content
                                            : <span className='invisible'>--</span>
                                    }
                                </p>
                            </div>

                        </div>
                    </li>
                ))
            }
        </ul>
    )
}

export default ChatList
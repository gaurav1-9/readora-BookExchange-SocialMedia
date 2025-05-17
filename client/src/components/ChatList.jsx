import React from 'react'
import { GoArrowDownLeft, GoArrowUpRight } from "react-icons/go"
import { Link } from 'react-router-dom'
import DateTime from './DateTime'

const ChatList = ({ chats, user }) => {
    return (
        <ul>
            {
                chats.map(chat => {
                    // Skip if there's no latest message
                    if (!chat.latestMessage) return null;

                    // Find the other participant in this chat
                    const targetUser = chat.users.find(u => u._id !== user._id);

                    return (
                        <Link key={chat._id} to={`/msg/${chat._id}/${targetUser._id}`}>
                            <li className='flex gap-2 items-center bg-gunMetal/10 rounded-lg px-4 py-2 cursor-pointer hover:bg-gunMetal/14 mb-2'>
                                <img src="/default-pic.png" alt="" className='w-15 rounded-full' />
                                <div className="flex flex-col w-full">
                                    <div className="flex justify-between items-center">
                                        <p className='font-semibold text-xl text-gunMetal'>
                                            {targetUser.username}
                                        </p>
                                        <DateTime dateTime={chat.createdAt} fontSize={'text-sm'} />
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {
                                            chat.latestMessage.sender._id === user._id
                                                ? <GoArrowUpRight className='rounded-full text-xs' />
                                                : <GoArrowDownLeft className='rounded-full text-xs' />
                                        }
                                        <p className='text-md text-gunMetal/90 truncate'>
                                            {chat.latestMessage.content}
                                        </p>
                                    </div>
                                </div>
                            </li>
                        </Link>
                    )
                })
            }
        </ul>
    )
}

export default ChatList

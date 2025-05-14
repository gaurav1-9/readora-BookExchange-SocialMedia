import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../AuthContext';
import { LuMessagesSquare } from "react-icons/lu";
import ChatList from '../components/ChatList';


const Chats = () => {
  const { user } = useAuth()
  const [chats, setChats] = useState([]); // State to store chats
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch the user's chats when the component mounts
  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/chats/all?myUserId=${user._id}`);
        setChats(response.data.msg); // Set the fetched chats to state
        setLoading(false); // Set loading to false after fetching
      } catch (error) {
        console.error('Error fetching chats:', error);
        setLoading(false); // Set loading to false even if there's an error
      }
    };

    fetchChats();
  }, [user]); // Re-run the effect when the userId changes

  if (loading) {
    return <div className='pt-14 text-center'>Loading chats...</div>;
  }

  return (
    <div className='pt-14'>
      <div className="flex gap-2 items-center justify-center mb-10">
        <LuMessagesSquare className='text-4xl text-gunMetal' />
        <span className='text-gunMetal text-4xl font-semibold'>Your Chats</span>
      </div>
      {
        chats.length === 0
          ? <p>No chats available</p>
          : <ChatList chats={chats} user={user}/>
      }
    </div>
  );
};

export default Chats;

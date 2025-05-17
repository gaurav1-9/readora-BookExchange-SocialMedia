import React from 'react'
import { RiSendPlane2Fill } from "react-icons/ri";

const MsgInput = ({ sendMsg, msg, setMsg }) => {
  return (
    <form onSubmit={sendMsg} className=' w-full pt-2 pb-20 h-4'>
      <div className='w-full bg-gunMetal py-2 px-4 flex gap-2 items-center justify-between rounded-lg'>
        <input
          type="text"
          value={msg}
          onChange={e => setMsg(e.target.value)}
          className='text-babyPowder w-full outline-none p-2 placeholder:text-babyPowder/50'
          placeholder='Enter your text here...'
        />
        <button>
          <RiSendPlane2Fill className='text-3xl text-tomato hover:text-tomato/90 cursor-pointer hover:-rotate-20 ease-in transition-transform' />
        </button>
      </div>
    </form>
  )
}

export default MsgInput
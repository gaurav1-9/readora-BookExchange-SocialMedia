import React from 'react'
import { GrAttachment } from "react-icons/gr";

const CreatePost = () => {
    return (
        <div className='flex items-start p-2 lg:p-4 sticky top-0 bg-transparent rounded-b-2xl shadow-lg backdrop-blur-lg h-30 lg:h-40 gap-2'>
            <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" className='w-20 rounded-full border-4 border-azul' />
            <div className='w-6/7 h-full'>
                <div className="bg-gunMetal rounded-lg p-2 lg:p-4 flex flex-col gap-2 h-8/9 lg:h-full">
                    <textarea
                        placeholder="Whats on your mind..."
                        className="w-full resize-none outline-none border-none  text-babyPowder placeholder-gray-400"
                        rows="5"
                    ></textarea>
                    <div className="flex justify-end items-center gap-2">
                        <GrAttachment className='text-sm lg:text-2xl text-gray-400 cursor-pointer hover:text-babyPowder' onClick={()=>console.log("Post attachment")}/>
                        <button className="bg-tomato hover:bg-tomato/90 cursor-pointer text-babyPowder text-sm font-semibold px-2 lg:py-2 lg:px-4 rounded-lg" onClick={()=>console.log("Post Btn")}>
                            Post
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreatePost
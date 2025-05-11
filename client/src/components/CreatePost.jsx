import React from 'react'
import { GrAttachment } from "react-icons/gr";

const CreatePost = ({ caption, setCaption, tags, setTags, onUpload, isUploading }) => {
    return (
        <div className='flex items-start p-2 lg:p-4 sticky top-0 bg-transparent rounded-b-2xl shadow-lg backdrop-blur-lg h-30 lg:h-40 gap-2'>
            <img src="/default-pic.png" className='w-20 rounded-full border-4 border-azul' />
            <div className='w-6/7 h-full'>
                <form onSubmit={onUpload} className="bg-gunMetal rounded-lg p-2 lg:p-4 flex flex-col gap-2 h-8/9 lg:h-full">
                    <textarea
                        placeholder="Whats on your mind..."
                        className="custom-scroll w-full resize-none outline-none border-none  text-babyPowder placeholder:text-babyPowder/60"
                        value={caption}
                        onChange={e => setCaption(e.target.value)}
                        rows="5"
                        required
                    ></textarea>
                    <div className="flex justify-end items-center gap-2">
                        <input
                            type="text"
                            className='w-full outline-none border-none  text-babyPowder placeholder:text-babyPowder/60'
                            placeholder='Enter your tags here'
                            value={tags}
                            onChange={e => setTags(e.target.value.split(/[\s,]+/))}
                            required
                        />
                        <div className="flex items-center gap-2">
                            <GrAttachment className='text-sm lg:text-2xl text-gray-400 cursor-pointer hover:text-babyPowder' />
                            {
                                (!isUploading)
                                    ? <button
                                        className="bg-azul hover:bg-azul/90 cursor-pointer text-babyPowder text-sm font-semibold px-2 lg:py-2 lg:px-4 rounded-lg active:scale-[1.03]"

                                    >
                                        Post
                                    </button>
                                    : <div
                                        className="bg-azul/60 cursor-not-allowed text-babyPowder/60 text-sm font-semibold px-2 lg:py-2 lg:px-4 rounded-lg"
                                    >
                                        Post
                                    </div>
                            }
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreatePost
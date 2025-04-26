import React from 'react'

const FeedPost = ({postList}) => {
    return (
        <div>
            {
                postList.map((item, index) => (
                    <div key={index} className='bg-azul w-8/9'>

                    </div>
                ))
            }
        </div>
    )
}

export default FeedPost
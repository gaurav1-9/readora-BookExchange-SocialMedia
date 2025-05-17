import React from 'react'

const DateTime = ({dateTime, fontsize}) => {
    return (
        <div className={`flex gap-2 font-semibold text-gunMetal/50 ${fontsize}`}>
            <span>
                {
                    new Date(dateTime).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                    })
                }
            </span>
            <span>|</span>
            <span>
                {
                    new Date(dateTime).toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit'
                    })
                }
            </span>
        </div>
    )
}

export default DateTime
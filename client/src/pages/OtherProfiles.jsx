import React from 'react'
import { useParams } from 'react-router-dom'

const OtherProfiles = () => {
    const { targetUser } = useParams()
    return (
        <div>OtherProfiles of {targetUser}</div>
    )
}

export default OtherProfiles
import React, { useState } from 'react'
import SearchBar from '../components/SearchBar'

const Search = () => {
    const [selected, setSelected] = useState(0)
    const handleSelection = (selectionId) => {
        setSelected(selectionId)
    }

    return (
        <div className='mt-14'>
            <SearchBar selected={selected} handleSelection={handleSelection}/>
        </div>
    )
}

export default Search
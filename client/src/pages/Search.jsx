import React, { useState } from 'react'
import SearchBar from '../components/SearchBar'

const Search = () => {
    const [selected, setSelected] = useState(0)
    const [search, setSearch] = useState('')

    const handleSelection = (selectionId) => {
        setSelected(selectionId)
    }
    
    const onSearch = (e)=>{
        e.preventDefault()
        console.log(search)
        setSearch('')
    }

    return (
        <div className='mt-14'>
            <SearchBar selected={selected} handleSelection={handleSelection} onSearch={onSearch} setSearch={setSearch} searchVal={search}/>
        </div>
    )
}

export default Search
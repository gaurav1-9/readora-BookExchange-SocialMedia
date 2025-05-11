import React, { useState } from 'react'
import SearchBar from '../components/SearchBar'
import SearchResult from '../components/SearchResult'
import axios from 'axios'

const Search = () => {
    const [selected, setSelected] = useState(0)
    const [search, setSearch] = useState('')
    const [result, setResult] = useState([])
    const [hasSearched, setHasSearched] = useState(false)
    const [searching, setSearching] = useState(false)

    const handleSelection = (selectionId) => {
        setHasSearched(false)
        setSelected(selectionId)
    }

    const onSearch = async (e) => {
        e.preventDefault()
        setHasSearched(true)
        setSearching(true)
        try {
            const res = await axios.get(`http://localhost:5000/api/search/${(selected) ? "post" : "users"}?searchText=${search}`)
            if (!res.data?.err) setResult(res.data.msg)
        } catch (e) {
            console.log(e)
        }
        setSearching(false)
        setSearch('')
    }
    return (
        <div className='mt-14'>
            <SearchBar selected={selected} handleSelection={handleSelection} onSearch={onSearch} setSearch={setSearch} searchVal={search} />
            <SearchResult hasSearched={hasSearched} res={result} searchType={selected} searching={searching} />
        </div>
    )
}

export default Search
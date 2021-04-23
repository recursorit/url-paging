import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Button } from 'react-bootstrap'
import Result from './Result'
const SearchTab = () => {
    const [posts, setPosts] = useState([])
    const [search, setSearch] = useState('')
    const [searchByButton, setsearchByButton] = useState('')

    const handleSearch = () => {
        setsearchByButton(search)
    }
    useEffect(() => {
        axios.get(`https://api.github.com/search/users?q=${searchByButton} in:login&per_page=10`)
            .then(res => {
                console.log(res)
                setPosts(res.data.items)
            })
            .catch(err => {
                console.log(err)

            })
    }, [searchByButton])

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-10 col-lg-10 mx-auto col-md-8 mt-4'>
                    <h2 className='text-center text-primary'>Search Here</h2>
                    <div className='input-group px-5'>
                        <input type='text' value={search} onChange={(e) => setSearch(e.target.value)} />
                        <Button onClick={handleSearch}>Search</Button>
                    </div>
                    <div>
                        <Result posts={posts} />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default SearchTab

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Button } from 'react-bootstrap'
import Result from './Result'
import { set } from 'lodash'


const SearchTab = () => {


    const [posts, setPosts] = useState([])
    const [search, setSearch] = useState('')
    const [searchByButton, setsearchByButton] = useState('')
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);
    const [sort, setSort] = useState('asc')
    const handleSearch = (e) => {

        setsearchByButton(search)
    }



    useEffect(() => {
        setLoading(true)

        axios.get(`https://api.github.com/search/users?q=${searchByButton}in:login&per_page=100`)
            .then(res => {
                console.log(res)
                setPosts(res.data.items)
                setLoading(false)
            })
            .catch(err => {
                console.log(err)
                setPosts(err)

            })
    }, [searchByButton])


    const indexOfLastPost = currentPage * postsPerPage
    const indexOfFirstPost = indexOfLastPost - postsPerPage
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost)


    const paginate = (pageNumbers) => {
        setCurrentPage(pageNumbers)

    }




    return (
        <div className='container'>
            <div className='row'>
                <div className='col-10 col-lg-10 mx-auto col-md-8 m-5'>
                    <div className='input-group px-5'>
                        <h2 className='text-center text-primary'>Search Here</h2>&nbsp;&nbsp;<input className='px-5' type='text' value={search} onChange={(e) => setSearch(e.target.value)} />
                        <Button onClick={handleSearch}><i className="fa fa-search"></i></Button>
                    </div>
                    <div>
                        <h2 className='text-center my-3'>Your result will display here...</h2>
                        {searchByButton === "" ? null : <Result posts={currentPosts} loading={loading} postsPerPage={postsPerPage} totalPosts={posts.length} paginate={paginate} />}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchTab


import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Button, Form } from 'react-bootstrap'
import Result from './Result'
import lodash from 'lodash'


const SearchTab = () => {


    const [posts, setPosts] = useState([])
    const [search, setSearch] = useState('')
    const [showSearch, setShowSearch] = useState(true)
    const [showTable, setShowTable] = useState(false)
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(10);

    const handleSearch = () => {

        setLoading(true)
        axios.get(`https://api.github.com/search/users?q=${search}in:login&per_page=100&sort=followers`)
            .then(res => {
                console.log(res)
                // let response = lodash.sortBy(res.data.items, ["login"])
                setPosts(res.data.items);
                setLoading(false)
                setShowTable(true)
                setShowSearch(false)
            })
            .catch(err => {
                console.log(err)
                setPosts('no record found')

            })

    }

    const avatarsort = () => {
        const asort = lodash.sortBy(posts, ['avatar_url'], ['asc', 'desc'])
        setPosts(asort)
    }

    const loginsort = () => {
        const lsort = lodash.sortBy(posts, ['login'], ['asc', 'desc'])
        setPosts(lsort)
    }

    const typesort = () => {
        const tsort = lodash.sortBy(posts, ['type'], ['asc', 'desc']).reverse()
    }
    const indexOfLastPost = currentPage * postsPerPage
    const indexOfFirstPost = indexOfLastPost - postsPerPage
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost)


    const paginate = (pageNumbers) => {
        setCurrentPage(pageNumbers)

    }




    return (
        <div>
            { showSearch ? <div className='container'>
                < div className='row' >
                    <div className='col-10 col-lg-10 mx-auto col-md-8 m-5'>
                        <div className='input-group px-5'>
                            <h2 className='text-center text-primary'>Search Here</h2>&nbsp;&nbsp;<input className='px-5' type='text' value={search} onChange={(e) => setSearch(e.target.value)} />
                            <Button onClick={handleSearch}><i className="fa fa-search"></i></Button>
                        </div>
                    </div>
                </ div>
            </div> : <div></div>}

            <div>
                <h2 className='text-center my-3'>Your result will display here...</h2>
                {showTable ? <Result posts={currentPosts} loading={loading} postsPerPage={postsPerPage} totalPosts={posts.length} paginate={paginate} avatarsort={avatarsort}
                    loginsort={loginsort} typesort={typesort} /> : <div></div>}
                <Form>
                    <Form.Group controlId='exampleForm.SelectCustom' onChange={(e) => setPostsPerPage(e.target.value)}>
                        <Form.Label>Select number of posts </Form.Label>
                        <Form.Control as='select' custom>
                            <option>9</option>
                            <option>5</option>
                            <option>10</option>
                            <option>20</option>
                        </Form.Control>

                    </Form.Group>
                </Form>
            </div >
        </div>

    )
}

export default SearchTab


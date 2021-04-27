import React, { useState} from 'react'
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
    const [avatarAsc, setAvatarAsc] = useState(false)
    const [loginAsc, setLoginAsc] = useState(true)
    const [typeAsc, setTypeAsc] = useState(false)


    const handleSearch = () => {

        setLoading(true)
        axios.get(`https://api.github.com/search/users?q=${search}in:login&per_page=100&sort=followers`)
            .then(res => {
                console.log(res)
                let response = lodash.orderBy(res.data.items, ["login"])
                setPosts(response);
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
        const asort = lodash.orderBy(posts, ['avatar_url'], ['asc', 'desc'])
        setPosts(asort)
        setAvatarAsc(true)
        setLoginAsc(true)
        setTypeAsc(false)
    }

    const loginsort = () => {
        const lsort = lodash.orderBy(posts, ['login'], ['asc', 'desc'])
        setPosts(lsort)
        setAvatarAsc(false)
        setLoginAsc(true)
        setTypeAsc(false)
    }

    const typesort = () => {
        const tsort = lodash.orderBy(posts, ['type'], ['asc', 'desc'])
        setPosts(tsort)
        setAvatarAsc(false)
        setLoginAsc(false)
        setTypeAsc(true)
    }
    const avatarSortD = () => {
        const asortD = lodash.orderBy(posts, ['avatar_url'], ['asc', 'desc']).reverse()
        setPosts(asortD)
        setAvatarAsc(false)
        setLoginAsc(false)
        setTypeAsc(false)
    }
    const loginSortD = () => {
        const lsortD = lodash.orderBy(posts, ['login'], ['asc', 'desc']).reverse()
        setPosts(lsortD)
        setAvatarAsc(false)
        setLoginAsc(false)
        setTypeAsc(false)
    }
    const typeSortD = () => {
        const tsortD = lodash.orderBy(posts, ['type'], ['asc', 'desc']).reverse()
        setPosts(tsortD)
        setAvatarAsc(false)
        setLoginAsc(false)
        setTypeAsc(false)
    }

    const indexOfLastPost = currentPage * postsPerPage
    const indexOfFirstPost = indexOfLastPost - postsPerPage
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost)


    const paginate = (pageNumbers) => {
        setCurrentPage(pageNumbers)

    }




    return (
        <div className='app'>
            { showSearch ? <div className='container '>
                < div className='row searchbar' >
                    <div className='col-10 col-lg-10 col-md-8 mt-5'>
                        <div className='input-group-append sh'>
                            <h2 className='text-center text-primary h2'>Search Here</h2>&nbsp;&nbsp;
                            <input autoFocus className='sb' type='text' value={search} onChange={(e) => setSearch(e.target.value)} placeholder='Enter text here to search*' />
                            <Button disabled={!search} onClick={handleSearch}>Search</Button>
                        </div>
                    </div>
                </ div>
            </div> : <div></div>}

            <div>
                <h2 className='text-center text-primary my-3 h2result'>Your result will display here...</h2>
                {showTable ? <Result posts={currentPosts} loading={loading} postsPerPage={postsPerPage} totalPosts={posts.length} paginate={paginate} avatarsort={avatarsort}
                    loginsort={loginsort}
                     typesort={typesort} 
                    loginAsc={loginAsc}
                    typeAsc={typeAsc} 
                    avatarAsc={avatarAsc}
                    typeSortD={typeSortD}
                    loginSortD={loginSortD}
                    avatarSortD={avatarSortD} /> : <div></div>}
                <Form>
                    <Form.Group controlId='exampleForm.SelectCustom' className='formgroup m-4' onChange={(e) => setPostsPerPage(e.target.value)}>
                        <Form.Label >Select number of posts:-&nbsp;</Form.Label>
                        <Form.Control className='postsselection' as='select' custom>
                            <option>12</option>
                            <option>15</option>
                            <option>20</option>
                            <option>25</option>
                        </Form.Control>

                    </Form.Group>
                </Form>
            </div >
        </div>

    )
}

export default SearchTab


import 'bootstrap/dist/css/bootstrap.min.css';
import SearchBar from './SearchBar';
import React, { useState } from 'react'
import MainTable from './MainTable'
import './CustomStyle.css';
import axios from 'axios'
import { Container } from 'react-bootstrap';
import PaginationPart from './PaginationPart';

function App() {
  const [posts, setPosts] = useState([])
  const [search, setSearch] = useState('')
  const [showSearch, setShowSearch] = useState(true)
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(5);
  const [loading, setLoading] = useState(false)

  const BASE_URL = 'https://api.github.com';

  const generateURL = () => {
    return `?q=${encodeURIComponent(`${search} in:login`)}&per_page=100`
  }
  const handleSearch = (searchTerm) => {
    setLoading(true)
    axios.get(`${BASE_URL}/search/users${generateURL(searchTerm)}`)
      .then(res => {
        console.log(res)
        setPosts(res.data.items)
        setLoading(false)
        setShowSearch(false)
      })
      .catch(err => {
        console.log(err)

      })

  }


  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost)


  const paginate = (pageNumbers) => {
    setCurrentPage(pageNumbers)

  }

  const goBack = () => {
    setShowSearch(true);
    setSearch('') 
    setPosts([])
    setCurrentPage(1)
    setPostsPerPage(5)
  }


  return (
    <div >
      <h1 className='text-center assign'>React JS Assignment</h1>
      <Container>
        {showSearch ? <SearchBar
          handleSearch={handleSearch}
          setSearch={setSearch}
          search={search}
          loading={loading}
        /> : <div>
          <MainTable
            posts={currentPosts}
            postsPerPage={postsPerPage}
            totalPosts={posts.length}
            setPostsPerPage={setPostsPerPage}
            paginate={paginate}
            goBack={goBack}
            setPosts={setPosts}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
          <PaginationPart posts={posts} postsPerPage={postsPerPage} paginate={paginate} currentPage={currentPage} setCurrentPage={setCurrentPage} /></div>}


      </Container>
    </div>
  );
}

export default App;

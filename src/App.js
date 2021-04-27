import 'bootstrap/dist/css/bootstrap.min.css';
import SearchBar from './SearchBar';
import React, { useState } from 'react'
import MainTable from './MainTable'
import './CustomStyle.css';
import axios from 'axios'
import { Container } from 'react-bootstrap';
import lodash from 'lodash'

function App() {
  const [posts, setPosts] = useState([])
  const [search, setSearch] = useState('')
  const [showSearch, setShowSearch] = useState(true)
  const [showTable, setShowTable] = useState(false)
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [avatarAsc, setAvatarAsc] = useState(false)
  const [loginAsc, setLoginAsc] = useState(true)
  const [typeAsc, setTypeAsc] = useState(false)


  const handleSearch = () => {
    axios.get(`https://api.github.com/search/users?q=${search}in:login&per_page=100&sort=followers`)
      .then(res => {
        console.log(res)
        let response = lodash.orderBy(res.data.items, ["login"])
        setPosts(response);
        setShowTable(true)
        setShowSearch(false)
        setShowTable(true)
      })
      .catch(err => {
        console.log(err)
        setPosts('no record found')

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
    setShowTable(false);
    setSearch('')
    setPosts([])
    setCurrentPage(1)
    setAvatarAsc(false)
    setLoginAsc(true)
    setTypeAsc(false)
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
  return (
    <div >
      <Container>
        <h1 className='text-center assign'>React JS Assignment</h1>
        {showSearch ? <SearchBar
          handleSearch={handleSearch}
          setSearch={setSearch}
          search={search}
        /> : <div></div>}

        {showTable ? <MainTable
          posts={currentPosts}
          postsPerPage={postsPerPage}
          totalPosts={posts.length}
          setPostsPerPage={setPostsPerPage}
          paginate={paginate}
          goBack={goBack}
          avatarsort={avatarsort}
          loginsort={loginsort}
          typesort={typesort}
          loginAsc={loginAsc}
          typeAsc={typeAsc}
          avatarAsc={avatarAsc}
          typeSortD={typeSortD}
          loginSortD={loginSortD}
          avatarSortD={avatarSortD} /> : <div></div>}
      </Container>
    </div>
  );
}

export default App;

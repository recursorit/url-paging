import 'bootstrap/dist/css/bootstrap.min.css';
import SearchBar from './SearchBar';
import React, { useState } from 'react'
import MainTable from './MainTable'
import './CustomStyle.css';
import axios from 'axios'
import { Container } from 'react-bootstrap';

let data;
function App() {

  const [search, setSearch] = useState('')
  const [showSearch, setShowSearch] = useState(true)
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
        data = res.data.items
        setLoading(false)
        setShowSearch(false)
      })
      .catch(err => {
        console.log(err)

      })

  }

  const reset = () => {
    setShowSearch(true);
    setSearch('')
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
        /> : <MainTable
          posts={data}
          reset={reset} />}
      </Container>
    </div>
  );
}

export default App;

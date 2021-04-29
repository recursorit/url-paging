import React, { useState } from 'react'
import { Row, Col, Table, Form, Button } from 'react-bootstrap'
import lodash from 'lodash'
import PaginationPart from './PaginationPart';

const MainTable = ({ posts, reset }) => {

    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(5);

    const [sort, setSort] = useState({ 'avatar_url': null, 'login': null, 'type': null })
    // const [orderBy, setOrderBy] = useState('asc')

    // const sorting=(e)=>{
    //     // const sortLodash =
    //     // // setPosts(sortLodash)
    //     // if(orderBy==='asc'){
    //     //     setOrderBy('desc')
    //     // }else{
    //     //     setOrderBy('asc')
    //     // }
    //     // setSort(true)
    //     console.log("sort")
    // }   
    const sorting = (name) => {

        let val = sort[name]
        if (val == null) {
            sort[name] = 'asc'

        }
        else if (val == 'asc') {
            sort[name] = 'desc'

        } else {
            sort[name] = 'asc'

        }
        console.log('inside sorting')
        setSort({ ...sort })
    }
    console.log(sort)
    // console.log(typeof(Object.keys(sort)))
    let cols = Object.keys(sort)
    let sortObj = { fields: [], order: [] }
    for (let col in cols) {
        // console.log(col)
        if (sort[cols[col]]) {
            console.log(cols[col])
            sortObj.fields.push(cols[col])
            sortObj.order.push(sort[cols[col]])
        }
    }
    console.log(sortObj)
    const sortedposts = lodash.orderBy(posts, sortObj.fields, sortObj.order)


    console.log("sort", sortedposts)
    const goBack = () => {
        // setPosts([])
        setCurrentPage(1)
        setPostsPerPage(5)
        reset()
    }
    const paginate = (pageNumbers) => {
        setCurrentPage(pageNumbers)

    }

    const indexOfLastPost = currentPage * postsPerPage
    const indexOfFirstPost = indexOfLastPost - postsPerPage
    const currentPosts = sortedposts.slice(indexOfFirstPost, indexOfLastPost)

    return (
        <div>
            <Row className='mt-2 text-center'>
                <Button variant="primary" onClick={goBack} className=" goback mx-3 px-3 m-2" >Go Back</Button>
                <Col xs={12} md={12} lg={12}>
                    < Table className='tabledata' striped bordered >
                        <thead>
                            <tr className='text-center hovereffect'>
                                <th> <a data-hover='down' onClick={() => sorting('avatar_url')}>Avatar</a></th>
                                <th> <a onClick={() => sorting('login')} >Login</a></th>
                                <th> <a onClick={() => sorting('type')} >Type</a></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                currentPosts.map(post => {
                                    return (<tr key={post.id} className='text-center'>
                                        <td><img src={post.avatar_url} alt='avtarimg' className='avatar' /></td>
                                        <td className='text-capitalize'>{post.login}</td>
                                        <td>{post.type}</td>
                                    </tr>
                                    )
                                })
                            }
                        </tbody>
                    </ Table>
                    <Form className='formgroup'>
                        <Form.Group controlId='exampleForm.SelectCustom' onChange={(e) => setPostsPerPage(e.target.value)}>
                            <Form.Label >Rows per page</Form.Label>
                            <Form.Control as='select' custom>
                                <option>5</option>
                                <option>9</option>
                                <option>15</option>
                                <option>20</option>
                            </Form.Control>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
            <PaginationPart posts={sortedposts} postsPerPage={postsPerPage} paginate={paginate} currentPage={currentPage} setCurrentPage={setCurrentPage} /></div>
    )
}

export default MainTable

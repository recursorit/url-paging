import React, { useState } from 'react'
import { Row, Col, Table, Form, Button } from 'react-bootstrap'
import lodash from 'lodash'
import PaginationPart from './PaginationPart';

const MainTable = ({ posts, reset, error }) => {

    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(5);
    const [sort, setSort] = useState({ 'avatar_url': null, 'login': null, 'type': null })
    const [arrow, setArrow] = useState("")
    const sorting = (name) => {

        const val = sort[name]
        // if (val == null) {
        //     sort[name] = ''
        //     setArrow("")
        // }
         if (val === 'asc') {
            sort[name] = 'desc'
            setArrow("↓")
        } else {
            sort[name] = 'asc'
            setArrow("↑")
        }
        console.log('inside sorting')
        setSort({ ...sort })
    }
    console.log(sort)
    let cols = Object.keys(sort)
    let sortObj = { fields: [], order: [] }
    for (let col in cols) {
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
        <Row className='mt-2 text-center'>
            <Button variant="primary" onClick={goBack} className=" goback m-3 px-3 " >Go Back</Button>
            {error ? <h5 className='text-center text-danger mt-3'>No records found. </h5> : <Col xs={9} md={12} lg={12}>
                < Table className='p-2' striped bordered >
                    <thead>
                        <tr className='text-center hovereffect'>
                            <th> <a href='!#' onClick={() => sorting('avatar_url')}>Avatar  {'avatar_url' ? arrow : null} </a></th>
                            <th> <a href='!#' onClick={() => sorting('login')} >Login  {'login '? arrow : null}</a></th>
                            <th> <a href='!#' onClick={() => sorting('type')} >Type{'type'? arrow : null}</a></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            currentPosts.map(posts => {
                                return (<tr key={posts.id} className='text-center'>
                                    <td><img src={posts.avatar_url} alt='avtarimg' className='avatar' /></td>
                                    <td className='text-capitalize'>{posts.login}</td>
                                    <td>{posts.type}</td>
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
                <PaginationPart  posts={sortedposts} postsPerPage={postsPerPage} paginate={paginate} currentPage={currentPage} setCurrentPage={setCurrentPage} />
            </Col>}
        </Row>
    )
}

export default MainTable

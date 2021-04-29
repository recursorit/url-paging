import React, { useState } from 'react'
import { Row, Col, Table, Form, Button } from 'react-bootstrap'
import lodash from 'lodash'
import PaginationPart from './PaginationPart';

const MainTable = ({ posts, reset, error }) => {

    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setpostsPerPage] = useState(5);
    const [sort, setSort] = useState({ 'login': null, 'avatar_url': null, 'type': null })

    const sorting = (name) => {

        const val = sort[name]
        if (val == null) {
            sort[name] = 'asc'

        }
        else if (val === 'asc') {
            sort[name] = 'desc'

        } else {
            sort[name] = 'asc'

        }
        setSort({ ...sort })
    }
    console.log(sort)
    let cols = Object.keys(sort)
    let sortObj = { fields: [], order: [] }
    for (let col in cols) {
        if (sort[cols[col]]) {
            sortObj.fields.push(cols[col])
            sortObj.order.push(sort[cols[col]])
        }
        console.log(sortObj)
    }
    console.log(sortObj)
    const sortedposts = lodash.orderBy(posts, sortObj.fields, sortObj.order)


    console.log("sort", sortedposts)
    const goBack = () => {
        setCurrentPage(1)
        setpostsPerPage(5)
        reset()
    }
    const paginate = (pageNumbers) => {
        setCurrentPage(pageNumbers)

    }
    const indexOfLastPost = currentPage * postsPerPage
    const indexOfFirstPost = indexOfLastPost - postsPerPage
    const currentposts = sortedposts.slice(indexOfFirstPost, indexOfLastPost)

    return (
        <Row className='mt-2 text-center'>
            <Button variant="primary" onClick={goBack} className=" goback m-3 px-3 " >Go Back</Button>
            {error ? <h5 className='text-center text-danger mt-3'>No records found. </h5> : <Col xs={12} md={12} lg={12}>
                < Table className='p-2' striped bordered >
                    <thead>
                        <tr className='text-center hovereffect'>
                            <th> <code onClick={() => sorting('avatar_url')}>Avatar  {sort['avatar_url'] === null ? '↑↓' : (sort['avatar_url'] === 'asc' ? '↑' : '↓')} </code></th>
                            <th> <code onClick={() => sorting('login')} >Login {sort['login'] === null ? '↑↓' : (sort['login'] === 'asc' ? '↑' : '↓')}</code></th>
                            <th> <code onClick={() => sorting('type')} >Type {sort['type'] === null ? '↑↓' : (sort['type'] === 'asc' ? '↑' : '↓')}</code></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            currentposts.map(posts => {
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
                    <Form.Group controlId='exampleForm.SelectCustom' onChange={(e) => setpostsPerPage(e.target.value)}>
                        <Form.Label >Rows per page</Form.Label>
                        <Form.Control as='select' custom>
                            <option>5</option>
                            <option>9</option>
                            <option>15</option>
                            <option>20</option>
                        </Form.Control>
                    </Form.Group>
                </Form>
                <PaginationPart posts={sortedposts} postsPerPage={postsPerPage} paginate={paginate} currentPage={currentPage} setCurrentPage={setCurrentPage} />
            </Col>}
        </Row>
    )
}

export default MainTable

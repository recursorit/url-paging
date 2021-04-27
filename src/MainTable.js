import React from 'react'
import { Container, Row, Col, Table, Form, Button } from 'react-bootstrap'

function MainTable({ posts, postsPerPage, totalPosts, paginate, setPostsPerPage, goBack, avatarsort, loginsort, typesort, avatartSortD, loginSortD, typeSortD, avatarAsc, loginAsc, typeAsc }) {
    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i)
    }
    console.log(pageNumbers)

    return (
        <div>
            <Container className=''>

                <Button variant="primary" onClick={goBack} className=" goback" >Go Back</Button>
                <Form className='formgroup'>
                    <Form.Group controlId='exampleForm.SelectCustom' onChange={(e) => setPostsPerPage(e.target.value)}>
                        <Form.Label >Rows per page&nbsp;</Form.Label>
                        <Form.Control as='select' custom>
                            <option>5</option>
                            <option>9</option>
                            <option>15</option>
                            <option>20</option>
                        </Form.Control>
                    </Form.Group>
                </Form>

                <Row className='mt-2 text-center'>
                    <Col xs={12} md={9} lg={12}>
                        < Table className='tabledata' striped bordered >
                            <thead>
                                <tr className='text-center'>
                                    <th > {avatarAsc ? <Button onClick={avatartSortD} className='btn btn-sm bfs'>Avatar↑ </Button> : <Button className='bfs btn btn-sm' variant="dark" onClick={avatarsort} >Avatar </Button>}</th>
                                    <th>{loginAsc ? <Button onClick={loginSortD} className='btn btn-sm bfs'>Login↑ </Button> : <Button variant="dark" className='bfs btn btn-sm' onClick={loginsort} >Login  </Button>}</th>
                                    <th>{typeAsc ? <Button onClick={typeSortD} className='bfs btn btn-sm'>Type↑  </Button> : <Button variant="dark" className='bfs btn btn-sm' onClick={typesort} >Type</Button>
                                    }</th>

                                </tr>
                            </thead>
                            <tbody>
                                {
                                    posts.map(post => {
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
                        <ul className='pagination'>
                            {pageNumbers.map(number => {
                                return (
                                    <li key={number} className='page-item'>
                                        <button onClick={() => paginate(number)} className='page-link'>
                                            {number}
                                        </button>
                                    </li>)
                            })}
                        </ul>
                    </Col>
                </Row>

            </Container>
        </div>
    )
}

export default MainTable

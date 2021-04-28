import React from 'react'
import { Container, Row, Col, Table, Form, Button } from 'react-bootstrap'

function MainTable({ posts, postsPerPage, totalPosts, paginate, setPostsPerPage, goBack, avatarsort, loginsort, typesort, avatartSortD, loginSortD, typeSortD, avatarAsc, loginAsc, typeAsc, minpageNumberLimit, maxpageNumberLimit, PageNumberLimit, setMaxPageNumberLimit, setMinPageNumberLimit, setPageNumberLimit, currentPage, setCurrentPage }) {
    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i)
    }
    console.log(pageNumbers)
    const handleNext = () => {
        setCurrentPage(currentPage + 1)
        if (currentPage + 1 > maxpageNumberLimit) {
            setMaxPageNumberLimit(maxpageNumberLimit + PageNumberLimit)
            setMinPageNumberLimit(minpageNumberLimit + PageNumberLimit)
        }
    }
    const handlePrev = () => {
        setCurrentPage(currentPage - 1)
        if ((currentPage - 1) % PageNumberLimit === 0) {
            setMaxPageNumberLimit(maxpageNumberLimit - PageNumberLimit)
            setMinPageNumberLimit(minpageNumberLimit - PageNumberLimit)
        }
    }
    let pageIncrement = null
    if (maxpageNumberLimit < Math.ceil(totalPosts/ postsPerPage)) {
        pageIncrement = <li><Button variant='outline' onClick={handleNext}>...</Button> </li>
    }
    let pageDecrement = null
    if (minpageNumberLimit > 1) {
        pageDecrement = <li><Button variant='' onClick={handlePrev}>...</Button> </li>
    }
    return (
        <div>
            <Container className=''>

                <Button variant="primary" onClick={goBack} className=" goback" >Go Back</Button>


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
                        <ul className='pagination'>
                            <li>
                                <Button onClick={handlePrev} className='btn btn-dark' disabled={currentPage === 1 ? true : false}>&lt;</Button>

                            </li>
                            {pageDecrement}
                            {pageNumbers.map(number => {
                                if (number < maxpageNumberLimit + 1 && number > minpageNumberLimit) {
                                    return (
                                        <li key={number} className='page-item'>
                                            <Button onClick={() => paginate(number)} variant=''
                                                className={currentPage === number ? "active" : null} >

                                                {number}

                                            </Button>

                                        </li>)
                                } else {
                                    return null
                                }

                            })}
                                {pageIncrement}
                            <li>
                                <Button onClick={handleNext} className='btn btn-dark' disabled={currentPage === Math.ceil(totalPosts/ postsPerPage) ? true : false}>&gt;</Button>
                            </li>
                            
                        </ul>
                    </Col>
                </Row>

            </Container>
        </div>
    )
}

export default MainTable

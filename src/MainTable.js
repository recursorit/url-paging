import React,{useState} from 'react'
import { Row, Col, Table, Form, Button } from 'react-bootstrap'
import lodash from 'lodash'

const MainTable = ({ posts, setPostsPerPage, goBack,setPosts }) => {
    const [sort, setSort] = useState(false)
    const [orderBy, setOrderBy] = useState('asc')

const sorting=(e)=>{
    const sortLodash =lodash.orderBy(posts,[e],[orderBy])
    setPosts(sortLodash)
    if(orderBy==='asc'){
        setOrderBy('desc')
    }else{
        setOrderBy('asc')
    }
    setSort(true)
} 

    return (
        <Row className='mt-2 text-center'>
            <Button variant="primary" onClick={goBack} className=" goback mx-3 px-3 m-2" >Go Back</Button>
            <Col xs={12} md={12} lg={12}>
                < Table className='tabledata' striped bordered >
                    <thead>
                        <tr className='text-center'>
                            <th> <Button variant="dark" onClick={()=>sorting(this,'avatar_url')} >up </Button>Avatar</th>
                            <th>  <Button variant="dark" onClick={()=>sorting('login')} >up  </Button>Login </th>
                            <th> <Button variant="dark" onClick={()=>sorting('type')} >up</Button>Type</th>
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
    )
}

export default MainTable

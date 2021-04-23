import React from 'react'
import { Table } from 'react-bootstrap'

const Result = ({ posts }) => {
    return (
        <div className='container'>
            <h2 className='text-center my-3'>Your result will display here...</h2>
            <Table striped bordered hover variant="dark">
                <thead >
                    <tr className='text-center'>
                        <th>Avatar</th>
                        <th>Login</th>
                        <th>Type</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        posts.map(post => {
                            return (<tr key={post.id} className='text-center'>
                                <td><img src={post.avatar_url} alt='avtarimg'/></td>
                                <td className='text-capitalize'>{post.login}</td>
                                <td>{post.type}</td>
                            </tr>)
                        })
                    }
                </tbody>
            </Table>
        </div>
    )
}

export default Result

import React from 'react'
import { Table,Button } from 'react-bootstrap'

const avatar = {
    width: '100px',
    height: '100px'
}

const pagination = {
    paddingLeft: '300px'
}

const Result = ({ posts, loading, postsPerPage, totalPosts, paginate,avatartsort,loginsort,typesort }) => {
    if (loading) {
        return <h2>Loading...</h2>
    }

    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i)
    }
    console.log(pageNumbers)


    return (
        <div className='container'>


            <ul className='pagination' style={pagination}>
                {pageNumbers.map(number => {
                    return (
                        <li key={number} className='page-item'>
                            <a onClick={() => paginate(number)} className='page-link'>
                                {number}
                            </a>
                        </li>)
                })}
            </ul>

            <Table striped bordered hover variant="dark" className='m-5'>
                <thead >
                    <tr className='text-center'>
                        <th><Button onClick={avatartsort}>Avatar</Button></th>
                        <th><Button onClick={loginsort}>Login</Button></th>
                        <th><Button onClick={typesort}>Type</Button></th>
                      
                    </tr>
                </thead>
                <tbody style={{ cursor: 'pointer' }}>
                    {
                        posts.map(post => {
                            return (<tr key={post.id} className='text-center'>
                                <td><img src={post.avatar_url} alt='avtarimg' style={avatar} /></td>
                                <td className='text-capitalize'>{post.login}</td>
                                <td>{post.type}</td>
                            </tr>
                            )

                        })
                    }
                </tbody>
            </Table>
           
            <a href='http://localhost:3000/'>
            <input type="button" value="Back"/>
            </a>


        </div>
    )
}

export default Result

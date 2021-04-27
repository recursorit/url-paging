import React from 'react'
import { Table, Button } from 'react-bootstrap'

const avatar = {
    width: '100px',
    height: '100px'
}



const Result = ({ posts, loading, postsPerPage, totalPosts, paginate, avatarsort, loginsort, typesort, avatartSortD, loginSortD, typeSortD, avatarAsc, loginAsc, typeAsc }) => {
    if (loading) {
        return <h2>Loading...</h2>
    }

    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i)
    }
    console.log(pageNumbers)


    return (
        <div className='container resultcontainer'>
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

            <Table striped bordered hover variant="" className='m-5 tablee  '>
                <thead >
                    <tr className='text-center'>
                        <th > {avatarAsc ? <Button onClick={avatartSortD} className='bfs'>Avatar ↑ </Button> : <Button className='bfs' variant="dark" onClick={avatarsort} >Avatar </Button>}</th>
                        <th>{loginAsc ? <Button onClick={loginSortD} className='bfs'>Login ↑ </Button> : <Button variant="dark" className='bfs' onClick={loginsort} >Login  </Button>}</th>
                        <th>{typeAsc ? <Button onClick={typeSortD} className='bfs'>Type ↑  </Button> : <Button variant="dark" className='bfs' onClick={typesort} >Type</Button>
                        }</th>

                    </tr>
                </thead>
                <tbody style={{ cursor: 'pointer' }}>
                    {
                        posts.map(post => {
                            return (<tr key={post.id} className='text-center'>
                                <td><img src={post.avatar_url} alt='avtarimg' className='avatar' style={avatar} /></td>
                                <td className='text-capitalize'>{post.login}</td>
                                <td>{post.type}</td>
                            </tr>
                            )

                        })
                    }
                </tbody>
            </Table>

            <a href='http://localhost:3000/'>
                <Button type="button" className='btn btn-md back' value="Back"> Go Back</Button>
            </a>


        </div>
    )
}

export default Result

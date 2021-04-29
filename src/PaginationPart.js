import React from 'react'
import Pagination from 'react-bootstrap/Pagination'

function PaginationPart({ posts, postsPerPage, paginate, currentPage, setCurrentPage }) {
    const pageNumbers = []
    const lastpage = Math.ceil(posts.length / postsPerPage)
    for (let i = 1; i <= lastpage; i++) {
        pageNumbers.push(i)
    }
    console.log(pageNumbers)

    const next = () => {
        setCurrentPage(currentPage + 1)
    }

    const prev = () => {
        setCurrentPage(currentPage - 1)
    }

    const first = () => {
        setCurrentPage(1)
    }
    const last = () => {
        setCurrentPage(lastpage)
    }
    return (
        <div>
            <Pagination>
                <Pagination.First onClick={first} />
                <Pagination.Prev onClick={prev} disabled={currentPage === 1 ? true : false} />
                <Pagination.Ellipsis />
                {pageNumbers.map(number => {
                    if (number < currentPage + 2 && number > currentPage - 2) {
                        return (
                            <Pagination.Item key={number} className='page-item' onClick={() => paginate(number)} active={number === currentPage ? true : false}>
                                {number}
                            </Pagination.Item>)
                    } else {
                        return null
                    }
                })}
                <Pagination.Ellipsis />
                <Pagination.Next onClick={next} disabled={currentPage === Math.ceil(posts.length / postsPerPage) ? true : false} />
                <Pagination.Last onClick={last} />
            </Pagination>
        </div>
    )
}

export default PaginationPart

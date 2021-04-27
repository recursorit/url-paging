import React from 'react'
import { Container, Row, Col, InputGroup, FormControl, Button,search } from 'react-bootstrap'


function SearchBar({ handleSearch, search, setSearch }) {
    return (
        <div>
            <Container>
                <Row className='m-3 input'>
                    <Col xs={12} md={8} lg={5}>
                        <InputGroup className="mt-3">
                            <FormControl
                                className='text-center '
                                placeholder="Search"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <InputGroup.Append>
                                <Button 
                                    onClick={handleSearch}
                                    disabled={!search}
                                >Button</Button>
                            </InputGroup.Append>
                        </InputGroup>

                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default SearchBar

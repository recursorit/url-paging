import React from 'react'
import { Row, Col, InputGroup, FormControl, Button ,Spinner} from 'react-bootstrap'

function SearchBar({ handleSearch, search, setSearch,loading}) {

    if (loading) {
        return <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
      </Spinner>
    }
    return (
        <Row className='m-3 d-flex justify-content-center'>
            <Col xs={12} md={8} lg={5}>
                <InputGroup className="mt-3">
                    <FormControl pattern="\d*" maxlength="8"
                        className='text-center '
                        placeholder="Search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)} />
                    <InputGroup.Append>
                        <Button    onClick={handleSearch}
                            disabled={!search}>
                            {/* <Spinner
                            as='span'
                            animation='border'
                            size='sm'
                            role='status'
                            aria-hidden='true'
                          /> */}
                        Submit</Button>
                    </InputGroup.Append>
                </InputGroup>

            </Col>
        </Row>
    )
}

export default SearchBar
// const [show, setShow] = useState(true);

//   if (show) {
//     return (
//       <Alert variant="danger" onClose={() => setShow(false)} dismissible>
//         <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
//         <p>
//           Change this and that and try again. Duis mollis, est non commodo
//           luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.
//           Cras mattis consectetur purus sit amet fermentum.
//         </p>
//       </Alert>
//     );
//   }
//   return <Button onClick={() => setShow(true)}>Show Alert</Button>;
// }
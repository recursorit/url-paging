import React from 'react'
import { Row, Col, InputGroup, FormControl, Button ,Spinner} from 'react-bootstrap'

function SearchBar({ handleSearch, search, setSearch,loading}) {

    return (
        <Row className='m-3 flex justify-content-center'>
            <Col xs={12} md={8} lg={5}>
                <InputGroup className="">
                    <FormControl pattern="\d*" maxLength="15"
                        className='text-center '
                        placeholder="Search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)} />
                    <InputGroup.Append>
                        <Button  onClick={handleSearch}
                            disabled={!search}>
                           {loading?<Spinner
                            as='span'
                            animation='border'
                            size='sm'
                            role='status'
                            aria-hidden='true'
                          />:null}
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
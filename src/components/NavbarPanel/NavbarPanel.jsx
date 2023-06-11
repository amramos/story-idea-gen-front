import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'

function NavbarPanel() {

    const cartProducts = useSelector(state => state.cart); 

    return (
        <Navbar bg="primary" variant="dark" expand="lg">
            <Container fluid>
                <Navbar.Brand href="#">My Brand</Navbar.Brand>
                    <Nav>
                        <Nav.Link to="/" as={Link}>Products</Nav.Link>
                    </Nav>
                    <Navbar.Toggle />
                    <Navbar.Collapse className='justify-content-end'>
                        <Navbar.Text>
                            <Nav.Link to="Cart" as={Link}>My cart <b>({cartProducts.length})</b></Nav.Link>
                        </Navbar.Text>
                    </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavbarPanel;
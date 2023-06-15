import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function NavbarPanel() {

    const cartProducts = useSelector(state => state.cart); 
    const { data: userMovies, loadingStatus } = useSelector(state => state.getUserMovies);
    
    return (
        <Navbar bg="primary" variant="dark" expand="lg">
            <Container fluid>
                <Navbar.Brand href="#"><img src="./png/logo-no-background.png" width="180px"/></Navbar.Brand>
                    <Nav>
                        <Nav.Link to="/story-search" as={Link}><b>Search</b></Nav.Link>
                    </Nav>

                    <Navbar.Toggle />
                    <Navbar.Collapse className='justify-content-end'>
                        <Navbar.Text>
                            <Nav.Link to="/my-stories" as={Link}>My stories <b>({userMovies.length})</b></Nav.Link>
                        </Navbar.Text>
                    </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavbarPanel;
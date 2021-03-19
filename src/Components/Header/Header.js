import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './Header.css'
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import firebase from 'firebase/app';
import "firebase/auth";
import { UserContext } from '../../App';

const Header = () => {
    const [user, setUser] = useContext(UserContext);
    
    // Sign out
    function signOut(){
        firebase.auth().signOut()
        .then(() => setUser({
                signed: false,
                name: '',
                email: '',
                password: '',
                message: ''
        }))
        .catch(error => console.log(error))   
    }
    return (
    <Navbar collapseOnSelect expand="lg" variant="dark" id="nav" fixed>
    <Container >
        <Link to="/">
            <Navbar.Brand>
            <h3>City Power Riders</h3>
            </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse  className="text-center">
            <Nav className="ml-auto">
                <Link to="/home">
                    <Button className="text-white" variant="success">Home</Button>   
                </Link>
                <Nav.Link className="text-white">Destination</Nav.Link>
                <Nav.Link className="text-white">Blog</Nav.Link>
                <Nav.Link className="text-white">Contact</Nav.Link>
                {
                user.signed ?
                <Button onClick={signOut} variant="danger" className="mx-4">Logout, {user.name}</Button> :
                <Link to="/login">
                    <Button variant="warning" className="mx-4">Login</Button>
                </Link>
                }
            </Nav>
        </Navbar.Collapse>
    </Container>
    </Navbar>
    );
};

export default Header;
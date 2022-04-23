import React from 'react'
import { Navbar, Container, Nav, Navlink } from 'react-bootstrap'
// import { LinkContainer } from "react-router-bootstrap";
const Header = () => {
  return (
    <>
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Starwish</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#wishlist">Wishlist</Nav.Link>
            <Nav.Link >Profile</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      {/* <div className="App container py-1">
      <Navbar collapseOnSelect bg="light" expand="md" className="mb-3">
        <Navbar.Brand className="font-weight-bold text-muted">
          Scratch
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar>
    </div> */}
    </>
  )
}

export default Header
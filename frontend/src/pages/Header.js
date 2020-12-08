import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import logo from "../kuepa-logo.png"

function Header() {
  return (
      <Navbar sticky="top" bg="card" variant="dark" expand="lg">
        <Navbar.Brand href="/home">
            <img
                alt="logo"
                src= {logo}
                width="100"
                height="30"
                className="d-inline-block align-top"
            />{'   '}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-3 mr-auto">
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/registro">Nuevo Usuario</Nav.Link>
            <Nav.Link href="/classRoom">Clases</Nav.Link>
          </Nav>
          <Nav className="justify-content-end">
                <Nav.Link href="/logout">Cerrar sesion</Nav.Link>
          </Nav>
        </Navbar.Collapse >
      </Navbar>
  );
}

export default Header;
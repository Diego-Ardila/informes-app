import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

//Componente que renderiza el header de la aplicacion con su respectivo menu de navegacion, presente en todas las vistas
function Header() {
  return (
    <Navbar sticky="top" bg="card" variant="dark" expand="lg">
      <Navbar.Brand href="/home">Classroom Chat{"   "}</Navbar.Brand>
      {/* Para el diseño responsive se acondiciona un toggle y collapse de Bootstrap para esconder los elementos
        en la vista de navegador movil */}
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
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;

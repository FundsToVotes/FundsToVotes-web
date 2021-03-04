import React from "react";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';



function Header() {
  return (

    //Navbar    
        <Navbar fixed="sticky" bg="light" expand="lg">
          <Navbar.Brand href="/home">Home</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="justify-content-around" style={{ width: "100%" }}>
              <Nav.Link href="/finance101">Campaign Finance 101</Nav.Link>
              <Nav.Link href="/takeaction">Take Action</Nav.Link>
              <Nav.Link href="/ourdata">Our Data</Nav.Link>
              <Nav.Link href="/about">About Us</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
     
  );
}
export default Header;
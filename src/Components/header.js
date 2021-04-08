import React from "react";
import { Link } from '@reach/router'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import "../index.css";

function Header() {
    return (
        <Navbar fixed="sticky" style={{ backgroundColor: '#689f38', paddingTop: "0px" }} expand="lg">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="justify-content-around" style={{ width: "100%" }}>
                    <Link to="/"><Navbar.Text>Home</Navbar.Text></Link>
                    <Link to="/finance-101"><Navbar.Text>Campaign Finance 101</Navbar.Text></Link>
                    <Link to="/take-action"><Navbar.Text>Take Action</Navbar.Text></Link>
                    <Link to="/our-data"><Navbar.Text>Our Data</Navbar.Text></Link>
                    <Link to="/about"><Navbar.Text>About</Navbar.Text></Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}
export default Header;
import React from "react";
import { Link } from '@reach/router'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import "../index.css";

function Header() {
    return (
        <div role="banner">
            <Navbar style={{ backgroundColor: '#689f38', paddingTop: "0px", paddingLeft: "20%", paddingRight: "20%", position: "sticky", top:"0", zIndex: "10000", fontFamily: "Comfortaa, sans-serif" }} expand="lg">
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="justify-content-around" style={{ width: "100%" }}>
                        <Link to="/"><Navbar.Text style={{ color: "black" }}>Home</Navbar.Text></Link>
                        <Link to="/finance-101"><Navbar.Text style={{ color: "black" }}>Campaign Finance 101</Navbar.Text></Link>
                        <Link to="/take-action"><Navbar.Text style={{ color: "black" }}>Take Action</Navbar.Text></Link>
                        <Link to="/our-data"><Navbar.Text style={{ color: "black" }}>Our Data</Navbar.Text></Link>
                        <Link to="/about"><Navbar.Text style={{ color: "black" }}>About</Navbar.Text></Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <div style={{ backgroundColor: "gold", display: "block", textAlign: "center", fontFamily: "Comfortaa, sans-serif" }} >This website is no longer being developed. Some features have been removed or may no longer work.</div>
        </div>
    );
}
export default Header;

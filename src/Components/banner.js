import React from "react";
import { MDBJumbotron, MDBContainer } from "mdbreact";
import "../index.css";

function Banner() {
    return (
        <MDBJumbotron fluid style={{ backgroundColor: '#8bc34a', marginBottom: "0px" }}>
            <MDBContainer>
                <h1 className="display-4 h2">Funds to Votes</h1>
                <p className="lead">Who funds your representatives?</p>
            </MDBContainer>
        </MDBJumbotron>
    );
}
export default Banner;
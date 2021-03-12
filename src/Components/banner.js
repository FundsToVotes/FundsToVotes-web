import React from "react";
import { MDBJumbotron, MDBContainer } from "mdbreact";


function Banner() {
  return (

    <MDBJumbotron fluid>
    <MDBContainer>
      <h1 className="display-4 h2">Funds to Votes</h1>
      <p className="lead">Who funds your representatives?</p>
    </MDBContainer>
  </MDBJumbotron>
     
  );
}
export default Banner;
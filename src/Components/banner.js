import React from "react";
import { MDBJumbotron, MDBContainer } from "mdbreact";


function Banner() {
  return (

    <MDBJumbotron fluid>
    <MDBContainer>
      <h2 className="display-4">Funds to Votes</h2>
      <p className="lead">Who funds your representatives?</p>
    </MDBContainer>
  </MDBJumbotron>
     
  );
}
export default Banner;
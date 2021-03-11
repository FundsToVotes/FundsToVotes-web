import React from "react";
import { MDBJumbotron, MDBContainer } from "mdbreact";
import "../index.css";




function Banner() {
  return (

    <MDBJumbotron fluid  style={{backgroundColor: '#8bc34a', marginBottom: "0px"}}>
    <MDBContainer>
      <h2 className="display-4">Funds to Votes</h2>
      <p className="lead">Who funds your representatives?</p>
    </MDBContainer>
  </MDBJumbotron>
     
  );
}
export default Banner;
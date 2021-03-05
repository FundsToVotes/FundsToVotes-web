import React from "react";
import { MDBFooter } from 'mdb-react-ui-kit';

function Footer() {
  return (
    <MDBFooter backgroundColor='light' className='text-center text-lg-left'  style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
      <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        &copy; {new Date().getFullYear()} Through {' '}
        <a className='text-dark' href='https://github.com/FundsToVotes/FundsToVotes-web/blob/main/LICENSE'>
          MIT License
        </a>
        <p>Funds to Votes recieves its data from publicly available sources, and makes no claims regarding the accuracy thereof.</p>
        <p> Funds To Votes is a nonpartisan organization, and doesn't work for the benefit or loss of any specific candidates</p>
        <p> Icon: Money by Max Hancock from the Noun Project</p>
        <hr></hr>
      <p> Check out our <a className='text-dark' href='https://github.com/FundsToVotes/FundsToVotes-web'> github </a></p>
       
      </div>
      
  </MDBFooter>
  );
}

export default Footer;
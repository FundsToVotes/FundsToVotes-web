import React from "react";
import { MDBFooter } from 'mdb-react-ui-kit';

function Footer() {
    return (
        <MDBFooter backgroundColor='light' className='text-center text-lg-left'  /*style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}*/>
            <div className='text-center p-3' /*style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}*/>
                <p style = {{ color: "black" }}>Developed by students at the <a href="https://ischool.uw.edu" style={{ color: "#212121" }}>University of Washington Information School</a>.</p>
                <p>
                    <a href='https://github.com/FundsToVotes/FundsToVotes-web/blob/main/LICENSE' style={{ color: "#212121" }}>MIT License</a> | <a href='https://github.com/FundsToVotes/FundsToVotes-web' style={{ color: "#212121" }}                     > GitHub</a>
                </p>
                {/* <p>Funds to Votes recieves its data from publicly available sources, and makes no claims regarding the accuracy thereof.</p>
                <p> Funds To Votes is a nonpartisan organization, and doesn't work for the benefit or loss of any specific candidates</p>
                <p> Icon: Money by Max Hancock from the Noun Project</p>
                <hr></hr> */}

            </div>

        </MDBFooter>
    );
}

export default Footer;
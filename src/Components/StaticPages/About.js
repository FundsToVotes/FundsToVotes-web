import React from "react";
// import Poster from "../../images/poster.svg";
import { MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import imgGrady from "../../images/Grady.jpg";
import imgJay from "../../images/Jay.jpg";
import imgHaykal from "../../images/Haykal.jpg";
import imgReyan from "../../images/Reyan.png";

function About() {
    return (
        <div style={{ display: "block", margin: "auto", width: '75%', paddingTop: '20px', backgroundColor: 'white', padding: '30px', marginTop: '30px' }}>
            <h2>About</h2>
            <br></br>

            {/* <img src={Poster} alt="Funds to Votes poster. An interactive platform informing voters on how their representatives are funded. Problem: How might American voters become more informed with regard to campaign finance so that they can choose candidates in line with their values? Solution: Funds to Votes uses comprehensive data sourced from reliable APIs to present visualizations that help voters get accurate information on who is funding their representatives and how that affects them. Screenshots of home page, top 10 industries, recently voted bills, independent expenditures. Team members are Reyan Haji, Haykal Mubin, Grady Thompson, and Jay Houppermans."/> */}

            <h3>Description</h3>
            <p>Since the Citizens United ruling which removed major campaign finance limitations, voters need insight into political candidate fundraising to inform their votes. Funds to Votes shares information about campaign finance records and recent votes of members of Congress in an easy-to-understand format and encourages users to learn more and take action. Research emphasized the needs of endorsement groups when evaluating candidates, and the resulting product serves NGOs and voters alike with a tool to evaluate elected members of Congress. Access to this information allows voters to select candidates in line with their values and hold them accountable once in office.</p>

            {/* <h3>Problem</h3>
            <p>How might American voters become more informed with regards to campaign finance so that they can choose candidates in line with their values?</p>

            <h3>Solution</h3>
            <p>Funds to Votes uses comprehensive data sourced from reliable APIs to present visualizations that help voters get accurate information on who is funding their representatives and how that affects them.</p> */}

            <h3>Team Members</h3>
            <MDBContainer>
                <MDBRow>
                    <MDBCol>
                        <img src={imgGrady} alt="Grady" />
                        <p style={{ marginBottom: "0" }}>Grady Thompson</p>
                        <p><a href="mailto:gradyat@uw.edu">gradyat@uw.edu</a></p>
                    </MDBCol>
                    <MDBCol>
                        <img src={imgJay} alt="Jay" />
                        <p style={{ marginBottom: "0" }}>Jay Houppermans</p>
                        <p><a href="mailto:jhoupps@uw.edu">jhoupps@uw.edu</a></p>
                    </MDBCol>
                    <MDBCol>
                        <img src={imgHaykal} alt="Haykal" />
                        <p style={{ marginBottom: "0" }}>Haykal Mubin</p>
                        <p><a href="mailto:haykal@uw.edu">haykal@uw.edu</a></p>
                    </MDBCol>
                    <MDBCol>
                        <img src={imgReyan} alt="Reyan" />
                        <p style={{ marginBottom: "0" }}>Reyan Haji</p>
                        <p><a href="mailto:reyanh@uw.edu">reyanh@uw.edu</a></p>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </div>
    );
}
export default About;

import React from "react";
import Poster from "../../images/poster.svg";

function About() {
    return (
        <div style={{ display: "block", margin: "auto", width: '75%', paddingTop: '20px', backgroundColor: 'white', padding: '30px', marginTop: '30px' }}>
            <h2>About</h2>
            <br></br>

            <img src={Poster} alt="Funds to Votes poster. An interactive platform informing voters on how their representatives are funded. Problem: How might American voters become more informed with regard to campaign finance so that they can choose candidates in line with their values? Solution: Funds to Votes uses comprehensive data sourced from reliable APIs to present visualizations that help voters get accurate information on who is funding their representatives and how that affects them. Screenshots of home page, top 10 industries, recently voted bills, independent expenditures. Team members are Reyan Haji, Haykal Mubin, Grady Thompson, and Jay Houppermans."/>

            <h3>Problem</h3>
            <p>How might American voters become more informed with regards to campaign finance so that they can choose candidates in line with their values?</p>

            <h3>Solution</h3>
            <p>Funds to Votes uses comprehensive data sourced from reliable APIs to present visualizations that help voters get accurate information on who is funding their representatives and how that affects them.</p>
        </div>
    );
}
export default About;

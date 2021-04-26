import React from "react";

function OurData() {
    return (
        <div style={{ display: "block", margin: "auto", width: '75%', padding: '110px' }}>
            <h2>Our Data</h2>
            <p>Funds to Votes relies on free, publicly-available APIs. We thank the sponsors and maintainers of these APIs for supporting civic techonology.</p>

            <h3>Google Civic Information</h3>
            <p>We use the Google Civic Information API to determine a user's U.S. Senators and U.S. Representatives based on their address. It also provides basic demographic and contact information.</p>

            <h3>ProPublica</h3>
            <p>ProPublica is an independent, nonprofit newsroom focused on investigative journalism. They also publish a lot of data in APIs. We use ProPublica's Congress API to obtain data on bills and votes in the U.S. Congress. We also use ProPublica's Campaign Finance API to get campaign finance data, specifically for independent expenditures.</p>

            <h3>OpenSecrets.org</h3>
            <p>The Center for Responsive Politics is a research group that tracks money in U.S. politics on its website OpenSecrets.org. We use the OpenSecrets API to obtain campaign finance data, specifically for the industries that support a U.S. Representative or U.S. Senator.</p>
        </div>
    );
}
export default OurData;

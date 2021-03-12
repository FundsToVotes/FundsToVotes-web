import { useEffect, useState } from "react";
import Dropdown from 'react-dropdown';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBBtn } from 'mdb-react-ui-kit';

// Finding the list of respresentatives for an address and showing a dropdown with a list of them
export function GoogleAPI(props) {
    const [officials, setOfficials] = useState([""]);
    let addressString = encodeURIComponent(props.address);
    useEffect(() => {
        fetch("https://civicinfo.googleapis.com/civicinfo/v2/representatives?address=" + addressString + "&key=AIzaSyCshtyTCb0erDxK5moA0nU3JT5crT5UWBQ", {
            method: "GET",
            'Content-Type': 'application/json',
        })
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                    let startIndexSen = result['offices'][2]['officialIndices'][0];
                    let endIndexSen = result['offices'][2]['officialIndices'][result['offices'][2]['officialIndices'].length - 1];
                    let indexRep = result['offices'][3]['officialIndices'][0];
                    let offNames = new Array(endIndexSen - startIndexSen + 2);
                    let tempIndex = 0;
                    for(let i = startIndexSen; i <= endIndexSen; i++) {
                        offNames[tempIndex] = result['officials'][i].name;
                        tempIndex++;
                    }
                    offNames[offNames.length - 1] = result['officials'][indexRep].name;
                    setOfficials(offNames);
                    console.log(offNames);
                }
            )
    }, [])

    return (
        <div>
            {officials.map(name => (
                <MDBCard>
                    <MDBCardBody>
                        <MDBCardTitle tag="h3" className="h5">{name}</MDBCardTitle>
                        <MDBCardText>U.S. Congress</MDBCardText>
                        <MDBBtn style={{backgroundColor: "#212121"}} onClick={() => { alert("Coming soon!") }}>Learn More</MDBBtn>
                    </MDBCardBody>
                </MDBCard>
            ))}
        </div>
    )
}


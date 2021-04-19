import { useEffect, useState } from "react";
import { navigate } from '@reach/router';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBBtn } from 'mdb-react-ui-kit';

export function GoogleAPI(props) {
    const [officials, setOfficials] = useState({ nameList:[""], offList:[""] });
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
                    let listOff = new Array(endIndexSen - startIndexSen + 2);
                    let tempIndex = 0;
                    for(let i = startIndexSen; i <= endIndexSen; i++) {
                        offNames[tempIndex] = result['officials'][i].name;
                        listOff[tempIndex] = result['officials'][i];
                        tempIndex++;
                    }
                    offNames[offNames.length - 1] = result['officials'][indexRep].name;
                    listOff[listOff.length - 1] = result['officials'][indexRep];
                    let officialPlural = {nameList:offNames, offList:listOff}
                    setOfficials(officialPlural);
                    console.log(officialPlural);
                }
            )
    }, [])

    return (
        <div>
            {officials['nameList'].map(name => (
                <MDBCard>
                    <MDBCardBody>
                        <MDBCardTitle tag="h3" className="h5">{name}</MDBCardTitle>
                        <MDBCardText>U.S. Congress</MDBCardText>
                        <MDBBtn style={{ backgroundColor: "#212121" }} onClick={() => { navigate("/representative-details", { state: { currName: name, off: officials } }) }}>Learn More</MDBBtn>
                    </MDBCardBody>
                </MDBCard>
            ))}
        </div>
    )
}

import { useEffect, useState } from "react";
import Dropdown from 'react-dropdown';

// Finding the list of respresentatives for an address and showing a dropdown with a list of them
export function GoogleAPI(props) {
    const [officials, setOfficials] = useState([""]);
    let addressString = encodeURIComponent(props.address);
    //let addressString = encodeURIComponent('15232 NE 3rd PL Bellevue WA 98007');
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
            <Dropdown options={officials} placeholder='Select a Candidate ..' onChange={e => oneRepVotes(e.value)}/>
        </div>
    )
}

// Taking the senator name from the dropdown selection and allowing the specific API calls to happen
function oneRepVotes(name) {
    let crpID = '';
    let offID = '';
    
    //useEffect(() => {
        fetch("https://api.propublica.org/congress/v1/116/senate/members.json", {
            method: "GET",
            headers: {
                "X-API-Key": "AYZVqN2QlJkxBhkzZ4JsFd9J3cZG1SuoWNee9QoS"
            }
        })
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(name);
                    console.log(result);
                    let nameArray = name.split(" ");
                    let offFName = nameArray[0];
                    let offLName = nameArray[nameArray.length - 1];
                    let indexOfOfficial = result['results'][0]['members'].findIndex(x => x.first_name === offFName & x.last_name === offLName);
                    offID = result['results'][0]['members'][indexOfOfficial]['id'];
                    crpID = result['results'][0]['members'][indexOfOfficial]['crp_id'];
                    console.log(offID);
                    console.log(crpID);
                    return fetch("https://api.propublica.org/congress/v1/members/" + offID + "/votes.json", {
                        method: "GET",
                        headers: {
                            "X-API-Key": "AYZVqN2QlJkxBhkzZ4JsFd9J3cZG1SuoWNee9QoS"
                        }
                    });
                }
            )
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                    return fetch("http://www.opensecrets.org/api/?method=candSector&cid=" + crpID + "&cycle=2020&apikey=" + "36b9f9c9066b76213e6f0c51dd12a605" + "&output=json", {
                        method: "GET"
                    })
                }
            )
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                }
            )
    //}, [])
    

    return (
        <p>{crpID}</p>
    );
}


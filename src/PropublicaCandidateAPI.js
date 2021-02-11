import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Link, useParams} from 'react-router-dom'

export function PropublicaCongress(props) {
    //const [candidateData, setCandidateData] = useState([]);
    let officials = props.officials;

    useEffect(() => {
        fetch("https://api.propublica.org/congress/v1/116/senate/members.json", {
            method: "GET",
            headers: {
                "X-API-Key": "AYZVqN2QlJkxBhkzZ4JsFd9J3cZG1SuoWNee9QoS"
            }
        })
            .then(res => res.json())
            .then(
                (result) => {
                    // let offID = new Array(officials.length);
                    // for(let i = 0; i < officials.length; i++) {
                    //     let nameArray = officials[i].split(" ");
                    //     let offFName = nameArray[0];
                    //     let offLName = nameArray[nameArray.length - 1];
                    //     let indexOfOfficial = result['results'][0]['members'].findIndex(x => x.first_name === offFName & x.last_name === offLName);
                    //     offID[i] = result['results'][0]['members'][indexOfOfficial]['id'];
                    // }
                    // setOfficialsID(offID);
                }
            )
    }, [])


    return (
        <div>
            <p>{}</p>
        </div>
    );
}

export function GoogleAPI() {
    const [officials, setOfficials] = useState([""]);
    useEffect(() => {
        fetch("https://civicinfo.googleapis.com/civicinfo/v2/representatives?address=15232%20NE%203rd%20Pl%20Bellevue%20Washington&key=AIzaSyCshtyTCb0erDxK5moA0nU3JT5crT5UWBQ", {
            method: "GET",
            'Content-Type': 'application/json',
        })
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                    let startIndexSen = result['offices'][2]['officialIndices'][0];
                    let endIndexSen = result['offices'][2]['officialIndices'][result['offices'][2]['officialIndices'].length - 1];
                    let offNames = new Array(result['officials'].length);
                    for(let i = startIndexSen; i <= endIndexSen; i++) {
                        offNames[i] = <li>{result['officials'][i].name}</li>;
                    }
                    setOfficials(offNames);
                    console.log(offNames);
                }
            )
    }, [])

    return (
        <div>
            <OfficialList officials={officials} />
        </div>
    )
}

function OfficialList(props) {
    let offItems = props.officials.map((officialName) => {
        return <OfficialItem name={officialName} />
    })
    return (
            <ul>
                {offItems}
            </ul>

    )
}

function OfficialItem(props) {
    return (
        <Link to={'/' + props.name} component={OneRepVotes}>{props.name}</Link>
    )
}



function OneRepVotes(props) {

    const name = useParams();
    
    useEffect(() => {
        fetch("https://api.propublica.org/congress/v1/116/senate/members.json", {
            method: "GET",
            headers: {
                "X-API-Key": "AYZVqN2QlJkxBhkzZ4JsFd9J3cZG1SuoWNee9QoS"
            }
        })
            .then(res => res.json())
            .then(
                (result) => {
                    if(typeof name === 'undefined') {
                        return '';
                    }
                    console.log(name);
                    console.log(result);
                    let nameArray = name.split(" ");
                    let offFName = nameArray[0];
                    let offLName = nameArray[nameArray.length - 1];
                    let indexOfOfficial = result['results'][0]['members'].findIndex(x => x.first_name === offFName & x.last_name === offLName);
                    let offID = result['results'][0]['members'][indexOfOfficial]['id'];
                    console.log(offID);
                    // return fetch("https://api.propublica.org/congress/v1/members/" + offID + "/votes.json", {
                    //     method: "GET",
                    //     headers: {
                    //         "X-API-Key": "AYZVqN2QlJkxBhkzZ4JsFd9J3cZG1SuoWNee9QoS"
                    //     }
                    // });
                }
            )
    }, [])
    

    return (
        <div>{}</div>
    );
}

export function SenatorInfo() {
    const [officials, setOfficials] = useState([" "]);
    const [officialsID, setOfficialsID] = useState([" "]);

    
    // Getting officials (senators rn) for address)
    useEffect(() => {
        fetch("https://civicinfo.googleapis.com/civicinfo/v2/representatives?address=15232%20NE%203rd%20Pl%20Bellevue%20Washington&key=AIzaSyCshtyTCb0erDxK5moA0nU3JT5crT5UWBQ", {
            method: "GET",
            'Content-Type': 'application/json',
        })
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                    let startIndexSen = result['offices'][2]['officialIndices'][0];
                    let endIndexSen = result['offices'][2]['officialIndices'][result['offices'][2]['officialIndices'].length - 1];
                    let offNames = new Array(result['officials'].length);
                    for(let i = startIndexSen; i <= endIndexSen; i++) {
                        offNames[i] = <li>{result['officials'][i].name}</li>;
                    }
                    setOfficials(offNames);
                }
            )
    }, [])
    
    // Seperate call of representative list

    // Getting from official name to ID (senate)
    useEffect(() => {
        fetch("https://api.propublica.org/congress/v1/116/senate/members.json", {
            method: "GET",
            headers: {
                "X-API-Key": "AYZVqN2QlJkxBhkzZ4JsFd9J3cZG1SuoWNee9QoS"
            }
        })
            .then(res => res.json())
            .then(
                (result) => {
                    let offID = new Array(officials.length);
                    for(let i = 0; i < officials.length; i++) {
                        let nameArray = officials[i].split(" ");
                        let offFName = nameArray[0];
                        let offLName = nameArray[nameArray.length - 1];
                        let indexOfOfficial = result['results'][0]['members'].findIndex(x => x.first_name === offFName & x.last_name === offLName);
                        offID[i] = result['results'][0]['members'][indexOfOfficial]['id'];
                    }
                    setOfficialsID(offID);
                    console.log(offID);
                }
            )
    }, [])

    // Getting votes of one member (senator)
    useEffect(() => {
        fetch("https://api.propublica.org/congress/v1/members/" + officialsID[0] + "/votes.json", {
            method: "GET",
            headers: {
                "X-API-Key": "AYZVqN2QlJkxBhkzZ4JsFd9J3cZG1SuoWNee9QoS"
            }
        })
            .then(res => res.json())
            .then(
                (result) => {
                    //setCandidateData(result['results'][0]['members']);
                    console.log(result);
                }
            )
    }, [])


    return (
        <div>
            <p>{}</p>
        </div>
    );
}




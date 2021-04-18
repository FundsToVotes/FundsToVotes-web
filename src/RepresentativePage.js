import { useEffect, useState } from "react";
import Plot from 'react-plotly.js';

export function RepresentativePage(props) {
    const [industries, setIndustries] = useState([]);
    let offName = props.location.state.currName;
    let officials = props.location.state.off.offList;
    let offObj = '';
    for(let i = 0; i < officials.length; i++) {
        if(officials[i].name === offName) {
            offObj = officials[i];
            break
        }
    }
    let arrToEncode = offName.split(" ", 2);
    console.log(arrToEncode);
    let encodedName= arrToEncode[1] + ',' + arrToEncode[0];
    useEffect(() => {
        fetch('https://api.fundstovotes.info/topten?name=' + encodedName)
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                    setIndustries(result.top10IndustriesResponse.industry);
                }
            )
    }, [])
    return(
        <div>
            <h2>{offName}</h2>
            <h3>Demographic Information</h3>
            <p>Party Affiliation: {offObj.party}</p>
            <p>Phone Number: {offObj.phones[0]}</p>
            <p>Website: <a href={offObj.urls[0]}>{offObj.urls[0]}</a></p>
            <img src={offObj.photoUrl} alt="A photograph of the representative"/>
            <IndustriesList ind={industries} />
        </div>
    );
}

function IndustriesList(props) {
    let industries = props.ind;
    let trace1 = {x:[], y:[], name:'Individual', type:'bar', marker:{color:'#90EE90'}}
    let trace2 = {x:[], y:[], name:'PACs', type:'bar', marker:{color:'#2E8B57'}}
    for(let i = 0; i < industries.length; i++) {
        trace1.x[i] = industries[i]['@attributes']['industry_name']
        trace2.x[i] = industries[i]['@attributes']['industry_name']
        trace1.y[i] = industries[i]['@attributes']['indivs']
        trace2.y[i] = industries[i]['@attributes']['pacs']
    }
    console.log(trace1);
    let data = [trace1, trace2];

    return(
        <div>
            <h3>Top 10 Industries Funding This Representative</h3>
            <Plot data={data} layout={{barmode:'stack', title:'Top 10 Industries'}}/>
        </div>        
    )
}




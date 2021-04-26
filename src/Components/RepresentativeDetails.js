import { useEffect, useState } from "react";
import Plot from 'react-plotly.js';

export default function RepresentativePage(props) {
    const [industries, setIndustries] = useState([]);
    const [bills, setBills] = useState([]);
    let offName = props.location.state.currName;
    let officials = props.location.state.off.offList;
    let offObj = '';
    for (let i = 0; i < officials.length; i++) {
        if (officials[i].name === offName) {
            offObj = officials[i];
            break
        }
    }
    let arrToEncode = offName.split(" ", 2);
    console.log(arrToEncode);
    let encodedName = arrToEncode[1] + ',' + arrToEncode[0];
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
    useEffect(() => {
        fetch('https://api.fundstovotes.info/bills?name=' + encodedName)
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                    setBills(result.top10IndustriesResponse.results[0]['votes']);
                }
            )
    }, [])
    return (
        <div style={{ display: "block", margin: "auto", width: '75%', paddingTop: '20px', backgroundColor: 'white', padding: '30px', marginTop: '30px'}}>
            <h1  >{offName}</h1>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly'}}>
                <p style={{ display: 'inline'}}>{offObj.party}</p>
                <p style={{ display: 'inline'}}>{offObj.phones[0]}</p>
                <p style={{ display: 'inline'}}><a href={offObj.urls[0]}>{offObj.urls[0]}</a></p>
            </div>
            <img src={offObj.photoUrl} alt="A photograph of the representative" style={{ display: 'none'}}/>
            <div style={{ marginBotton: '20px'}}>
                <h3>Top 10 Industries Funding This Representative</h3>
                <p>These industries are top contributors to {offName}'s campaign by individuals who work in those industries or Political Action Committees (PACs) in that industry.</p>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly'}}>
                    <IndustriesChart ind={industries} />
                    <IndustriesTextList ind={industries} />
                </div>
            </div>
            <div style={{ marginTop: '20px'}}>
                <h3>Bills Recently Voted on</h3>
                <p>These are the recent bills that {offName} has voted on. The industry that the bill relates to may correlate with an industry that supports {offName}.</p>
                <BillsList bil={bills}/>
            </div>
        </div>
    );
}

function IndustriesChart(props) {
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
            <Plot data={data} layout={{barmode:'stack'}}/>
        </div>        
    )

}

function IndustriesTextList(props) {
    let industries = props.ind;
    let industryElem = industries.map((item) => {
        let elem = <IndustryItem industryObj={item} />
        return elem;
    })
    return (
        <div>
            <p>Top 10 Industries List</p>
            <ol>{industryElem}</ol>
        </div>
    )
}

function IndustryItem(props) {
    let industry = props.industryObj;
    return (
        <div>
            <li>{industry['@attributes']['industry_name']}</li>
        </div>
    );
}

function BillsList(props) {
    let bills = props.bil;
    let billsElem = bills.map((item) => {
        let bill = <BillsItem billObj={item} />
        return bill;
    })
    return (
        <div>
            <table>
                <tbody>
                <tr style={{
                border: '3px solid #516F2A',
                padding: '8px',
                backgroundColor: 'white'
                }}>
                    <th style={{
                border: '3px solid #516F2A',
                padding: '8px'
                }}>Name</th>
                    <th style={{
                border: '3px solid #516F2A',
                padding: '8px'
                }}>Representative's Position</th>
                    <th style={{
                border: '3px solid #516F2A',
                padding: '8px'
                }}>Industry of Bill</th>
                </tr>
                {billsElem}
                </tbody>
            </table>
        </div>
    )
}

function BillsItem(props) {
    let bill = props.billObj;
    return (
        <tr style={{
            border: '3px solid #516F2A',
            padding: '8px',
            backgroundColor: 'white'
          }}>
            <td style={{
                border: '3px solid #516F2A',
                padding: '8px'
                }}>{bill.bill.short_title}</td>
            <td style={{
                border: '3px solid #516F2A',
                padding: '8px'
                }}>{bill.position}</td>
            <td style={{
                border: '3px solid #516F2A',
                padding: '8px'
                }}>{bill.bill.Opensecrets_Sector_Long}</td>
        </tr>
    );
}
